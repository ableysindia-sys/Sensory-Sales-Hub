import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";
import crypto from "crypto";
import { syncShopifyProducts, startPeriodicSync } from "./shopify-sync";
import { generateCatalogPDF } from "./catalog-pdf";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const DEPOSIT_AMOUNT_PAISE = 149900; // ₹1,499 in paise

const SYSTEM_PROMPT = `You are a friendly, knowledgeable assistant for Abley's Rehab — a professional therapy equipment company based in India. You help occupational therapists, physiotherapists, special educators, parents, and clinic owners find the right rehabilitation and sensory integration equipment.

Key facts about Abley's Rehab:
- Sells OT/rehabilitation tools across 9 categories: Swings, Ballpool, Mats, Movement & Balance, Climbing, ADL Kit, Therapy Balls, Deep Pressure, and Visual
- 40+ professional-grade products
- Made in India with quality manufacturing
- Serves both individual buyers (B2C) and clinics/therapy centres (B2B with bulk pricing)
- GST rate: 18% on all products
- Features a 3D "Build Your Sensory Room" tool on the website
- Website: ableys.in

Your personality:
- Warm, professional, and genuinely helpful
- You understand therapy contexts (sensory integration, proprioceptive input, vestibular stimulation, etc.)
- You can recommend products based on therapy goals
- Keep responses concise (2-4 sentences for simple questions, more for detailed recommendations)
- Use ₹ for currency
- If asked about something unrelated to therapy equipment or Abley's, politely redirect
- Never make up product prices or specifications you don't know — suggest the user browse the catalogue or contact the team`;

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_LENGTH = 20;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 15;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: Request): string {
  return (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD) {
  console.warn("ADMIN_PASSWORD is not set — admin panel login will be disabled");
}

const adminTokens = new Set<string>();

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token || !adminTokens.has(token)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY is not set — chat endpoint will be disabled");
  }

  const genAI = process.env.GEMINI_API_KEY
    ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    : null;

  app.post(api.chat.send.path, async (req, res) => {
    if (!genAI) {
      return res.status(503).json({ message: "Chat assistant is not configured." });
    }

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return res.status(429).json({ message: "Too many requests. Please wait a moment before trying again." });
    }

    try {
      const parsed = api.chat.send.input.parse(req.body);
      const message = parsed.message.slice(0, MAX_MESSAGE_LENGTH);
      const history = (parsed.history || []).slice(-MAX_HISTORY_LENGTH);

      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: SYSTEM_PROMPT,
      });
      const chat = model.startChat({
        history: [
          { role: "user", parts: [{ text: "Hello, I need help with therapy equipment." }] },
          { role: "model", parts: [{ text: "Hi there! Welcome to Abley's Rehab. I'd be happy to help you find the right therapy equipment. We offer a wide range of professional-grade OT and rehabilitation tools across 9 categories. What are you looking for?" }] },
          ...history.map((msg) => ({
            role: msg.role === "assistant" ? "model" as const : "user" as const,
            parts: [{ text: msg.content.slice(0, MAX_MESSAGE_LENGTH) }],
          })),
        ],
      });
      const result = await chat.sendMessage(message);
      const response = result.response.text();
      res.json({ response });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      console.error("Gemini chat error:", err);
      res.status(500).json({ message: "Failed to get AI response. Please try again." });
    }
  });

  app.post(api.leads.create.path, async (req, res) => {
    try {
      const input = api.leads.create.input.parse(req.body);
      const lead = await storage.createLead(input);
      res.status(201).json({ id: lead.id, message: "Enquiry submitted successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join('.') });
      }
      res.status(500).json({ message: "Failed to submit enquiry" });
    }
  });

  app.get("/api/catalog", (_req, res) => {
    try {
      generateCatalogPDF(res);
    } catch (err) {
      res.status(500).json({ message: "Failed to generate catalogue PDF" });
    }
  });

  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getActiveProducts();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product || !product.isActive) return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/categories", async (_req, res) => {
    try {
      const cats = await storage.getCategories();
      res.json(cats.filter(c => c.isActive));
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/pages/:slug", async (req, res) => {
    try {
      const page = await storage.getPageBySlug(req.params.slug);
      if (!page || !page.isPublished) return res.status(404).json({ message: "Page not found" });
      res.json(page);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch page" });
    }
  });

  app.post(api.admin.login.path, (req, res) => {
    try {
      if (!ADMIN_PASSWORD) {
        return res.status(503).json({ message: "Admin panel is not configured" });
      }
      const { password } = api.admin.login.input.parse(req.body);
      if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const token = generateToken();
      adminTokens.add(token);
      res.json({ token });
    } catch (err) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  app.get(api.admin.stats.path, requireAdmin, async (_req, res) => {
    try {
      const leadStats = await storage.getLeadStats();
      const allProducts = await storage.getProducts();
      const cats = await storage.getCategories();
      const activeProducts = allProducts.filter(p => p.isActive).length;
      const outOfStock = allProducts.filter(p => p.stock !== null && p.stock <= 0).length;
      const lowStock = allProducts.filter(p => p.stock !== null && p.stock > 0 && p.stock <= 5).length;
      res.json({
        ...leadStats,
        totalProducts: allProducts.length,
        activeProducts,
        totalCategories: cats.length,
        outOfStock,
        lowStock,
      });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  app.get(api.admin.leads.list.path, requireAdmin, async (_req, res) => {
    try { res.json(await storage.getLeads()); } catch { res.status(500).json({ message: "Failed" }); }
  });

  app.get("/api/admin/leads/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
      const lead = await storage.getLead(id);
      if (!lead) return res.status(404).json({ message: "Lead not found" });
      res.json(lead);
    } catch { res.status(500).json({ message: "Failed" }); }
  });

  app.patch("/api/admin/leads/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
      const { status } = api.admin.leads.updateStatus.input.parse(req.body);
      const lead = await storage.updateLeadStatus(id, status);
      if (!lead) return res.status(404).json({ message: "Lead not found" });
      res.json(lead);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      res.status(500).json({ message: "Failed" });
    }
  });

  app.delete("/api/admin/leads/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
      const deleted = await storage.deleteLead(id);
      if (!deleted) return res.status(404).json({ message: "Lead not found" });
      res.json({ message: "Lead deleted" });
    } catch { res.status(500).json({ message: "Failed" }); }
  });

  app.get("/api/admin/products", requireAdmin, async (_req, res) => {
    try { res.json(await storage.getProducts()); } catch { res.status(500).json({ message: "Failed" }); }
  });

  const productBodySchema = z.object({
    slug: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    categorySlug: z.string().min(1).optional(),
    shortDescription: z.string().min(1).optional(),
    longDescription: z.string().nullable().optional(),
    basePrice: z.number().int().min(0).optional(),
    comparePrice: z.number().int().nullable().optional(),
    stock: z.number().int().nullable().optional(),
    images: z.string().nullable().optional(),
    specifications: z.string().nullable().optional(),
    features: z.string().nullable().optional(),
    applications: z.string().nullable().optional(),
    configOptions: z.string().nullable().optional(),
    shopifyHandle: z.string().nullable().optional(),
    shopifyUrl: z.string().nullable().optional(),
    isActive: z.boolean().optional(),
  });

  app.post("/api/admin/products", requireAdmin, async (req, res) => {
    try {
      const data = productBodySchema.parse(req.body);
      if (!data.name || !data.slug || !data.categorySlug || !data.shortDescription || data.basePrice === undefined) {
        return res.status(400).json({ message: "Name, slug, category, short description, and base price are required" });
      }
      const product = await storage.createProduct(data as any);
      res.status(201).json(product);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.patch("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
      const data = productBodySchema.parse(req.body);
      const product = await storage.updateProduct(id, data);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      res.status(500).json({ message: "Failed" });
    }
  });

  app.delete("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
      const deleted = await storage.deleteProduct(id);
      if (!deleted) return res.status(404).json({ message: "Product not found" });
      res.json({ message: "Product deleted" });
    } catch { res.status(500).json({ message: "Failed" }); }
  });

  app.get("/api/admin/categories", requireAdmin, async (_req, res) => {
    try { res.json(await storage.getCategories()); } catch { res.status(500).json({ message: "Failed" }); }
  });

  const categoryBodySchema = z.object({
    slug: z.string().min(1).optional(),
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    color: z.string().min(1).optional(),
    image: z.string().nullable().optional(),
    displayOrder: z.number().int().optional(),
    isActive: z.boolean().optional(),
  });

  app.post("/api/admin/categories", requireAdmin, async (req, res) => {
    try {
      const data = categoryBodySchema.parse(req.body);
      const cat = await storage.createCategory(data as any);
      res.status(201).json(cat);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      res.status(500).json({ message: "Failed" });
    }
  });

  app.patch("/api/admin/categories/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
      const data = categoryBodySchema.parse(req.body);
      const cat = await storage.updateCategory(id, data);
      if (!cat) return res.status(404).json({ message: "Category not found" });
      res.json(cat);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      res.status(500).json({ message: "Failed" });
    }
  });

  app.delete("/api/admin/categories/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
      const deleted = await storage.deleteCategory(id);
      if (!deleted) return res.status(404).json({ message: "Category not found" });
      res.json({ message: "Category deleted" });
    } catch { res.status(500).json({ message: "Failed" }); }
  });

  app.get("/api/admin/pages", requireAdmin, async (_req, res) => {
    try { res.json(await storage.getPages()); } catch { res.status(500).json({ message: "Failed" }); }
  });

  const pageBodySchema = z.object({
    slug: z.string().min(1).optional(),
    title: z.string().min(1).optional(),
    content: z.string().optional(),
    isPublished: z.boolean().optional(),
  });

  app.post("/api/admin/pages", requireAdmin, async (req, res) => {
    try {
      const data = pageBodySchema.parse(req.body);
      const page = await storage.createPage(data as any);
      res.status(201).json(page);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      res.status(500).json({ message: "Failed" });
    }
  });

  app.patch("/api/admin/pages/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
      const data = pageBodySchema.parse(req.body);
      const page = await storage.updatePage(id, data);
      if (!page) return res.status(404).json({ message: "Page not found" });
      res.json(page);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      res.status(500).json({ message: "Failed" });
    }
  });

  async function getAllowedShopifyHandles(): Promise<Set<string>> {
    const allProducts = await storage.getActiveProducts();
    const handles = new Set<string>();
    for (const p of allProducts) {
      if (p.shopifyHandle) handles.add(p.shopifyHandle);
    }
    return handles;
  }

  const shopifyCheckoutSchema = z.object({
    items: z.array(z.object({
      handle: z.string().min(1).max(300),
      quantity: z.number().int().min(1).max(10).default(1),
      variantId: z.string().optional(),
    })).min(1).max(20),
  });

  const checkoutRateLimit = new Map<string, number[]>();

  function applyCheckoutRateLimit(ip: string): boolean {
    const now = Date.now();
    const windowMs = 60_000;
    const maxRequests = 10;
    const timestamps = (checkoutRateLimit.get(ip) || []).filter(t => now - t < windowMs);
    if (timestamps.length >= maxRequests) return false;
    timestamps.push(now);
    checkoutRateLimit.set(ip, timestamps);
    return true;
  }

  async function resolveVariantIds(
    storeDomain: string,
    storefrontToken: string,
    handles: string[]
  ): Promise<Map<string, string>> {
    const results = new Map<string, string>();
    for (const handle of handles) {
      const resp = await fetch(
        `https://${storeDomain}/api/2024-10/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": storefrontToken,
          },
          body: JSON.stringify({
            query: `query getProduct($handle: String!) {
              product(handle: $handle) {
                variants(first: 1) {
                  edges { node { id } }
                }
              }
            }`,
            variables: { handle },
          }),
        }
      );
      if (!resp.ok) continue;
      const data = await resp.json() as any;
      const variantId = data?.data?.product?.variants?.edges?.[0]?.node?.id;
      if (variantId) results.set(handle, variantId);
    }
    return results;
  }

  app.post("/api/shopify/checkout", async (req, res) => {
    try {
      const ip = req.ip || "unknown";
      if (!applyCheckoutRateLimit(ip)) {
        return res.status(429).json({ message: "Too many checkout requests, please try again later" });
      }

      const parsed = shopifyCheckoutSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid request: " + parsed.error.issues[0]?.message });
      }
      const { items } = parsed.data;

      const allowedHandles = await getAllowedShopifyHandles();
      for (const item of items) {
        if (!allowedHandles.has(item.handle)) {
          return res.status(400).json({ message: `Product not available for checkout: ${item.handle}` });
        }
      }

      const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
      const storefrontToken = process.env.SHOPIFY_STOREFRONT_TOKEN;
      if (!storeDomain || !storefrontToken) {
        return res.status(500).json({ message: "Shopify not configured" });
      }

      const handlesToResolve = [...new Set(
        items.filter(i => !i.variantId).map(i => i.handle)
      )];
      const variantMap = handlesToResolve.length > 0
        ? await resolveVariantIds(storeDomain, storefrontToken, handlesToResolve)
        : new Map<string, string>();

      const missingHandles = handlesToResolve.filter(h => !variantMap.has(h));
      if (missingHandles.length > 0) {
        return res.status(404).json({ message: "Products not found on Shopify", missing: missingHandles });
      }

      const lines = items.map(item => ({
        merchandiseId: item.variantId || variantMap.get(item.handle)!,
        quantity: item.quantity,
      }));

      const cartResp = await fetch(
        `https://${storeDomain}/api/2024-10/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": storefrontToken,
          },
          body: JSON.stringify({
            query: `mutation cartCreate($input: CartInput!) {
              cartCreate(input: $input) {
                cart {
                  checkoutUrl
                }
                userErrors {
                  field
                  message
                }
              }
            }`,
            variables: { input: { lines } },
          }),
        }
      );

      if (!cartResp.ok) {
        return res.status(502).json({ message: "Failed to create Shopify cart" });
      }
      const cartData = await cartResp.json() as any;
      const checkoutUrl = cartData?.data?.cartCreate?.cart?.checkoutUrl;
      if (!checkoutUrl) {
        const errors = cartData?.data?.cartCreate?.userErrors;
        return res.status(400).json({ message: errors?.[0]?.message || "Failed to create cart" });
      }

      res.json({ checkoutUrl });
    } catch (err) {
      console.error("Shopify checkout error:", err instanceof Error ? err.message : err);
      res.status(500).json({ message: "Checkout failed" });
    }
  });

  app.delete("/api/admin/pages/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
      const deleted = await storage.deletePage(id);
      if (!deleted) return res.status(404).json({ message: "Page not found" });
      res.json({ message: "Page deleted" });
    } catch { res.status(500).json({ message: "Failed" }); }
  });

  app.post("/api/admin/shopify-sync", requireAdmin, async (_req, res) => {
    try {
      const result = await syncShopifyProducts();
      res.json(result);
    } catch (err) {
      console.error("Shopify sync error:", err);
      res.status(500).json({ message: "Sync failed" });
    }
  });

  // ── Sample Request routes ──────────────────────────────────────────────
  const sampleRequestSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    city: z.string().min(2),
    role: z.string().min(2),
    institutionName: z.string().optional(),
    setupType: z.string().min(2),
    categories: z.string().min(1),
    depositAmount: z.number().default(1499),
    notes: z.string().optional(),
  });

  app.post("/api/sample-requests", async (req, res) => {
    try {
      const data = sampleRequestSchema.parse(req.body);
      const sampleReq = await storage.createSampleRequest(data);
      res.json({ id: sampleReq.id, success: true });
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: "Invalid data", errors: err.errors });
      res.status(500).json({ message: "Failed to submit request" });
    }
  });

  app.get("/api/admin/sample-requests", requireAdmin, async (_req, res) => {
    try {
      const requests = await storage.getSampleRequests();
      res.json(requests);
    } catch { res.status(500).json({ message: "Failed" }); }
  });

  app.patch("/api/admin/sample-requests/:id/status", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      const { status } = req.body as { status: string };
      const updated = await storage.updateSampleRequestStatus(id, status);
      if (!updated) return res.status(404).json({ message: "Not found" });
      res.json(updated);
    } catch { res.status(500).json({ message: "Failed" }); }
  });

  // ── Razorpay deposit order ──────────────────────────────────────────────
  app.post("/api/razorpay/create-order", async (req, res) => {
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return res.json({ manual: true, message: "Payment gateway not configured — we'll send a WhatsApp payment link within 2 hours." });
    }
    try {
      const { sampleRequestId } = req.body as { sampleRequestId: number };
      const Razorpay = (await import("razorpay")).default;
      const rzp = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
      const order = await rzp.orders.create({
        amount: DEPOSIT_AMOUNT_PAISE,
        currency: "INR",
        receipt: `sample_${sampleRequestId}`,
        notes: { sampleRequestId: String(sampleRequestId) },
      });
      await storage.updateSampleRequestPayment(sampleRequestId, "order_created", order.id as string);
      res.json({ orderId: order.id, amount: DEPOSIT_AMOUNT_PAISE, currency: "INR", keyId: RAZORPAY_KEY_ID });
    } catch (err) {
      console.error("Razorpay order error:", err);
      res.status(500).json({ message: "Failed to create payment order" });
    }
  });

  app.post("/api/razorpay/verify", async (req, res) => {
    if (!RAZORPAY_KEY_SECRET) return res.status(400).json({ message: "Payment gateway not configured" });
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, sampleRequestId } = req.body as {
        razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string; sampleRequestId: number;
      };
      const generated = crypto
        .createHmac("sha256", RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");
      if (generated !== razorpay_signature) {
        return res.status(400).json({ message: "Payment verification failed" });
      }
      await storage.updateSampleRequestPayment(sampleRequestId, "paid", razorpay_order_id, razorpay_payment_id);
      res.json({ success: true });
    } catch (err) {
      console.error("Razorpay verify error:", err);
      res.status(500).json({ message: "Verification failed" });
    }
  });

  startPeriodicSync();

  return httpServer;
}
