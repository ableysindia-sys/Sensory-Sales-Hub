import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  interest: text("interest"),
  organisation: text("organisation"),
  phone: text("phone"),
  city: text("city"),
  category: text("category"),
  requirementType: text("requirement_type"),
  message: text("message"),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertLeadSchema = createInsertSchema(leads).omit({ id: true });

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
