import { products, leads, type Product, type InsertProduct, type Lead, type InsertLead } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  createLead(lead: InsertLead): Promise<Lead>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db.insert(leads).values(lead).returning();
    return newLead;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }
}

export const storage = new DatabaseStorage();
