import {
  leads, categories as categoriesTable, products as productsTable, pages as pagesTable,
  sampleRequests as sampleRequestsTable,
  type Lead, type InsertLead,
  type Category, type InsertCategory,
  type Product, type InsertProduct,
  type Page, type InsertPage,
  type SampleRequest, type InsertSampleRequest,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, count, asc } from "drizzle-orm";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLead(id: number): Promise<Lead | undefined>;
  updateLeadStatus(id: number, status: string): Promise<Lead | undefined>;
  deleteLead(id: number): Promise<boolean>;
  getLeadStats(): Promise<{ total: number; new: number; contacted: number; converted: number; closed: number }>;

  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(cat: InsertCategory): Promise<Category>;
  updateCategory(id: number, data: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;

  getProducts(): Promise<Product[]>;
  getActiveProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(categorySlug: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  updateProductStock(id: number, stock: number | null): Promise<Product | undefined>;

  getPages(): Promise<Page[]>;
  getPublishedPages(): Promise<Page[]>;
  getPage(id: number): Promise<Page | undefined>;
  getPageBySlug(slug: string): Promise<Page | undefined>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: number, data: Partial<InsertPage>): Promise<Page | undefined>;
  deletePage(id: number): Promise<boolean>;

  createSampleRequest(req: InsertSampleRequest): Promise<SampleRequest>;
  getSampleRequests(): Promise<SampleRequest[]>;
  getSampleRequest(id: number): Promise<SampleRequest | undefined>;
  updateSampleRequestPayment(id: number, paymentStatus: string, razorpayOrderId?: string, razorpayPaymentId?: string): Promise<SampleRequest | undefined>;
  updateSampleRequestStatus(id: number, status: string): Promise<SampleRequest | undefined>;
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
    const [updated] = await db.update(leads).set({ status }).where(eq(leads.id, id)).returning();
    return updated;
  }
  async deleteLead(id: number): Promise<boolean> {
    const result = await db.delete(leads).where(eq(leads.id, id)).returning();
    return result.length > 0;
  }
  async getLeadStats() {
    const results = await db.select({ status: leads.status, count: count() }).from(leads).groupBy(leads.status);
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

  async getCategories(): Promise<Category[]> {
    return db.select().from(categoriesTable).orderBy(asc(categoriesTable.displayOrder));
  }
  async getCategory(id: number): Promise<Category | undefined> {
    const [cat] = await db.select().from(categoriesTable).where(eq(categoriesTable.id, id));
    return cat;
  }
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [cat] = await db.select().from(categoriesTable).where(eq(categoriesTable.slug, slug));
    return cat;
  }
  async createCategory(cat: InsertCategory): Promise<Category> {
    const [created] = await db.insert(categoriesTable).values(cat).returning();
    return created;
  }
  async updateCategory(id: number, data: Partial<InsertCategory>): Promise<Category | undefined> {
    const [updated] = await db.update(categoriesTable).set(data).where(eq(categoriesTable.id, id)).returning();
    return updated;
  }
  async deleteCategory(id: number): Promise<boolean> {
    const result = await db.delete(categoriesTable).where(eq(categoriesTable.id, id)).returning();
    return result.length > 0;
  }

  async getProducts(): Promise<Product[]> {
    return db.select().from(productsTable).orderBy(desc(productsTable.createdAt));
  }
  async getActiveProducts(): Promise<Product[]> {
    return db.select().from(productsTable).where(eq(productsTable.isActive, true)).orderBy(desc(productsTable.createdAt));
  }
  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, id));
    return product;
  }
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(productsTable).where(eq(productsTable.slug, slug));
    return product;
  }
  async getProductsByCategory(categorySlug: string): Promise<Product[]> {
    return db.select().from(productsTable)
      .where(eq(productsTable.categorySlug, categorySlug))
      .orderBy(desc(productsTable.createdAt));
  }
  async createProduct(product: InsertProduct): Promise<Product> {
    const [created] = await db.insert(productsTable).values(product).returning();
    return created;
  }
  async updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updated] = await db.update(productsTable).set(data).where(eq(productsTable.id, id)).returning();
    return updated;
  }
  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(productsTable).where(eq(productsTable.id, id)).returning();
    return result.length > 0;
  }
  async updateProductStock(id: number, stock: number | null): Promise<Product | undefined> {
    const [updated] = await db.update(productsTable).set({ stock }).where(eq(productsTable.id, id)).returning();
    return updated;
  }

  async getPages(): Promise<Page[]> {
    return db.select().from(pagesTable).orderBy(desc(pagesTable.updatedAt));
  }
  async getPublishedPages(): Promise<Page[]> {
    return db.select().from(pagesTable).where(eq(pagesTable.isPublished, true)).orderBy(asc(pagesTable.title));
  }
  async getPage(id: number): Promise<Page | undefined> {
    const [page] = await db.select().from(pagesTable).where(eq(pagesTable.id, id));
    return page;
  }
  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pagesTable).where(eq(pagesTable.slug, slug));
    return page;
  }
  async createPage(page: InsertPage): Promise<Page> {
    const [created] = await db.insert(pagesTable).values(page).returning();
    return created;
  }
  async updatePage(id: number, data: Partial<InsertPage>): Promise<Page | undefined> {
    const updateData = { ...data, updatedAt: new Date() };
    const [updated] = await db.update(pagesTable).set(updateData).where(eq(pagesTable.id, id)).returning();
    return updated;
  }
  async deletePage(id: number): Promise<boolean> {
    const result = await db.delete(pagesTable).where(eq(pagesTable.id, id)).returning();
    return result.length > 0;
  }

  async createSampleRequest(req: InsertSampleRequest): Promise<SampleRequest> {
    const [created] = await db.insert(sampleRequestsTable).values(req).returning();
    return created;
  }
  async getSampleRequests(): Promise<SampleRequest[]> {
    return db.select().from(sampleRequestsTable).orderBy(desc(sampleRequestsTable.createdAt));
  }
  async getSampleRequest(id: number): Promise<SampleRequest | undefined> {
    const [req] = await db.select().from(sampleRequestsTable).where(eq(sampleRequestsTable.id, id));
    return req;
  }
  async updateSampleRequestPayment(id: number, paymentStatus: string, razorpayOrderId?: string, razorpayPaymentId?: string): Promise<SampleRequest | undefined> {
    const data: Partial<SampleRequest> = { paymentStatus };
    if (razorpayOrderId) data.razorpayOrderId = razorpayOrderId;
    if (razorpayPaymentId) data.razorpayPaymentId = razorpayPaymentId;
    const [updated] = await db.update(sampleRequestsTable).set(data).where(eq(sampleRequestsTable.id, id)).returning();
    return updated;
  }
  async updateSampleRequestStatus(id: number, status: string): Promise<SampleRequest | undefined> {
    const [updated] = await db.update(sampleRequestsTable).set({ status }).where(eq(sampleRequestsTable.id, id)).returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
