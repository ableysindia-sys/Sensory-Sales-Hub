import { leads, type Lead, type InsertLead } from "@shared/schema";
import { db } from "./db";
import { eq, desc, count, sql } from "drizzle-orm";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLead(id: number): Promise<Lead | undefined>;
  updateLeadStatus(id: number, status: string): Promise<Lead | undefined>;
  deleteLead(id: number): Promise<boolean>;
  getLeadStats(): Promise<{
    total: number;
    new: number;
    contacted: number;
    converted: number;
    closed: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db.insert(leads).values(lead).returning();
    return newLead;
  }

  async getLeads(): Promise<Lead[]> {
    return db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLead(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead;
  }

  async updateLeadStatus(id: number, status: string): Promise<Lead | undefined> {
    const [updated] = await db
      .update(leads)
      .set({ status })
      .where(eq(leads.id, id))
      .returning();
    return updated;
  }

  async deleteLead(id: number): Promise<boolean> {
    const result = await db.delete(leads).where(eq(leads.id, id)).returning();
    return result.length > 0;
  }

  async getLeadStats(): Promise<{
    total: number;
    new: number;
    contacted: number;
    converted: number;
    closed: number;
  }> {
    const results = await db
      .select({
        status: leads.status,
        count: count(),
      })
      .from(leads)
      .groupBy(leads.status);

    const stats = { total: 0, new: 0, contacted: 0, converted: 0, closed: 0 };
    for (const row of results) {
      const c = Number(row.count);
      stats.total += c;
      if (row.status === "new") stats.new = c;
      else if (row.status === "contacted") stats.contacted = c;
      else if (row.status === "converted") stats.converted = c;
      else if (row.status === "closed") stats.closed = c;
    }
    return stats;
  }
}

export const storage = new DatabaseStorage();
