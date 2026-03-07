import { leads, type Lead, type InsertLead } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
}

export class DatabaseStorage implements IStorage {
  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db.insert(leads).values(lead).returning();
    return newLead;
  }
}

export const storage = new DatabaseStorage();
