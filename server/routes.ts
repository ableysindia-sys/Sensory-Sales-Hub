import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";
import crypto from "crypto";

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
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Failed to submit enquiry" });
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
      const stats = await storage.getLeadStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  app.get(api.admin.leads.list.path, requireAdmin, async (_req, res) => {
    try {
      const allLeads = await storage.getLeads();
      res.json(allLeads);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  app.get("/api/admin/leads/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
      const lead = await storage.getLead(id);
      if (!lead) return res.status(404).json({ message: "Lead not found" });
      res.json(lead);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch lead" });
    }
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
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Failed to update lead" });
    }
  });

  app.delete("/api/admin/leads/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
      const deleted = await storage.deleteLead(id);
      if (!deleted) return res.status(404).json({ message: "Lead not found" });
      res.json({ message: "Lead deleted" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete lead" });
    }
  });

  return httpServer;
}
