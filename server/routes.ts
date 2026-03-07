import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api, errorSchemas } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  try {
    const existingProducts = await storage.getProducts();
    if (existingProducts.length === 0) {
      await storage.createProduct({
        name: "Calming Weighted Blanket",
        description: "A soft, premium weighted blanket designed to reduce anxiety and promote restful sleep.",
        price: 8999, // $89.99
        imageUrl: "https://images.unsplash.com/photo-1596431940989-408a183592bc?auto=format&fit=crop&q=80&w=800",
      });
      
      await storage.createProduct({
        name: "Textured Fidget Sphere",
        description: "A handheld sphere with various textures for sensory stimulation and stress relief.",
        price: 1499, // $14.99
        imageUrl: "https://images.unsplash.com/photo-1585868266228-5e4ec822bf68?auto=format&fit=crop&q=80&w=800",
      });
      
      await storage.createProduct({
        name: "Aromatherapy Diffuser",
        description: "Quiet essential oil diffuser with soothing color-changing lights for a calming atmosphere.",
        price: 3499, // $34.99
        imageUrl: "https://images.unsplash.com/photo-1608514107198-4b71391d4ff1?auto=format&fit=crop&q=80&w=800",
      });
    }
  } catch (error) {
    console.error("Failed to seed database:", error);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Try to seed database
  await seedDatabase();

  app.get(api.products.list.path, async (req, res) => {
    try {
      const allProducts = await storage.getProducts();
      res.json(allProducts);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.post(api.leads.create.path, async (req, res) => {
    try {
      const input = api.leads.create.input.parse(req.body);
      const lead = await storage.createLead(input);
      res.status(201).json(lead);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Failed to create lead" });
    }
  });

  return httpServer;
}
