import { pgTable, text, serial, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  color: text("color").notNull(),
  image: text("image"),
  displayOrder: integer("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  categorySlug: text("category_slug").notNull(),
  shortDescription: text("short_description").notNull(),
  longDescription: text("long_description"),
  basePrice: integer("base_price").notNull(),
  comparePrice: integer("compare_price"),
  stock: integer("stock"),
  images: text("images"),
  specifications: text("specifications"),
  features: text("features"),
  applications: text("applications"),
  configOptions: text("config_options"),
  shopifyHandle: text("shopify_handle"),
  shopifyUrl: text("shopify_url"),
  shopifyVariants: text("shopify_variants"),
  defaultVariantId: text("default_variant_id"),
  productType: text("product_type"),
  vendor: text("vendor"),
  sku: text("sku"),
  isActive: boolean("is_active").notNull().default(true),
  b2bPinned: boolean("b2b_pinned").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().default("B2B Lead"),
  email: varchar("email", { length: 255 }),
  interest: text("interest"),
  organisation: text("organisation"),
  phone: text("phone"),
  city: text("city"),
  category: text("category"),
  requirementType: text("requirement_type"),
  message: text("message"),
  cartItems: text("cart_items"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull().default(""),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const sampleRequests = pgTable("sample_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  role: text("role").notNull(),
  institutionName: text("institution_name"),
  setupType: text("setup_type").notNull(),
  categories: text("categories").notNull(),
  depositAmount: integer("deposit_amount").notNull().default(1499),
  paymentStatus: text("payment_status").notNull().default("pending"),
  razorpayOrderId: text("razorpay_order_id"),
  razorpayPaymentId: text("razorpay_payment_id"),
  status: text("status").notNull().default("new"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true });
export const insertLeadSchema = createInsertSchema(leads).omit({ id: true, status: true, createdAt: true });
export const insertPageSchema = createInsertSchema(pages).omit({ id: true, createdAt: true, updatedAt: true });
export const insertSampleRequestSchema = createInsertSchema(sampleRequests).omit({
  id: true, paymentStatus: true, razorpayOrderId: true, razorpayPaymentId: true, status: true, createdAt: true,
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Page = typeof pages.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
export type SampleRequest = typeof sampleRequests.$inferSelect;
export type InsertSampleRequest = z.infer<typeof insertSampleRequestSchema>;
