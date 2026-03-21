import { createContext, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Product as DbProduct, Category as DbCategory } from "@shared/schema";
import { generatedProductImages, generatedCategoryImages } from "./product-images";
import type { CatalogueProduct, Category, ProductSpec, ConfigOptions, ShopifyVariant } from "./catalogue-data";

function parseJson<T>(val: string | null, fallback: T): T {
  if (!val) return fallback;
  try { return JSON.parse(val); } catch { return fallback; }
}

export function dbProductToCatalogue(p: DbProduct): CatalogueProduct {
  let images = parseJson<string[]>(p.images, []);
  images = images.map(img => {
    if (img.startsWith("__generated__:")) {
      const slug = img.replace("__generated__:", "");
      return generatedProductImages[slug] || "";
    }
    return img;
  }).filter(Boolean);

  return {
    id: p.slug,
    shopifyHandle: p.shopifyHandle || undefined,
    name: p.name,
    categorySlug: p.categorySlug,
    shortDescription: p.shortDescription,
    description: p.longDescription || p.shortDescription,
    specifications: parseJson<ProductSpec>(p.specifications, {}),
    features: parseJson<string[]>(p.features, []),
    applications: parseJson<string[]>(p.applications, []),
    basePrice: p.basePrice,
    comparePrice: p.comparePrice,
    configOptions: parseJson<ConfigOptions | undefined>(p.configOptions, undefined),
    images,
    shopifyUrl: p.shopifyUrl || undefined,
    shopifyVariants: parseJson<ShopifyVariant[] | undefined>(p.shopifyVariants ?? null, undefined),
    productType: p.productType || undefined,
    vendor: p.vendor || undefined,
    sku: p.sku || undefined,
    stock: p.stock ?? null,
  };
}

function resolveCategoryImage(image: string | null): string | undefined {
  if (!image) return undefined;
  if (image.startsWith("__generated_category__:")) {
    const slug = image.replace("__generated_category__:", "");
    return generatedCategoryImages[slug] || undefined;
  }
  return image;
}

export function dbCategoryToCatalogue(c: DbCategory, products: CatalogueProduct[]): Category {
  return {
    slug: c.slug,
    title: c.title,
    description: c.description,
    color: c.color,
    image: resolveCategoryImage(c.image),
    products: products.filter(p => p.categorySlug === c.slug),
  };
}

interface ProductContextValue {
  products: CatalogueProduct[];
  categories: Category[];
  dbProducts: DbProduct[];
  dbCategories: DbCategory[];
  isLoading: boolean;
  getProductBySlug: (slug: string) => CatalogueProduct | undefined;
  getCategoryBySlug: (slug: string) => Category | undefined;
  getProductCategory: (product: CatalogueProduct) => Category | undefined;
  getProductsByCategory: (categorySlug: string) => CatalogueProduct[];
  getAllProducts: () => CatalogueProduct[];
  getNewArrivals: () => CatalogueProduct[];
  getBestSellers: () => CatalogueProduct[];
}

const ProductContext = createContext<ProductContextValue | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const { data: dbProducts = [], isLoading: productsLoading } = useQuery<DbProduct[]>({
    queryKey: ["/api/products"],
    staleTime: 60000,
  });

  const { data: dbCategories = [], isLoading: catsLoading } = useQuery<DbCategory[]>({
    queryKey: ["/api/categories"],
    staleTime: 60000,
  });

  const products = useMemo(() => dbProducts.map(dbProductToCatalogue), [dbProducts]);

  const categories = useMemo(
    () => dbCategories.map(c => dbCategoryToCatalogue(c, products)),
    [dbCategories, products]
  );

  const value = useMemo<ProductContextValue>(() => ({
    products,
    categories,
    dbProducts,
    dbCategories,
    isLoading: productsLoading || catsLoading,
    getProductBySlug: (slug: string) => products.find(p => p.id === slug),
    getCategoryBySlug: (slug: string) => categories.find(c => c.slug === slug),
    getProductCategory: (product: CatalogueProduct) => categories.find(c => c.slug === product.categorySlug),
    getProductsByCategory: (categorySlug: string) => products.filter(p => p.categorySlug === categorySlug),
    getAllProducts: () => products,
    getNewArrivals: () => {
      return products.filter(p => p.comparePrice && p.comparePrice > p.basePrice).slice(0, 8);
    },
    getBestSellers: () => {
      const withDiscount = products.filter(p => p.comparePrice && p.comparePrice > p.basePrice);
      return withDiscount.sort((a, b) => {
        const dA = a.comparePrice ? Math.round(((a.comparePrice - a.basePrice) / a.comparePrice) * 100) : 0;
        const dB = b.comparePrice ? Math.round(((b.comparePrice - b.basePrice) / b.comparePrice) * 100) : 0;
        return dB - dA;
      }).slice(0, 8);
    },
  }), [products, categories, dbProducts, dbCategories, productsLoading, catsLoading]);

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function calculateProductPrice(
  product: CatalogueProduct,
  config?: { material?: string; size?: string; addons?: string[] }
): number {
  let price = product.basePrice;
  if (config && product.configOptions) {
    if (config.material && product.configOptions.materials) {
      const mat = product.configOptions.materials.find(m => m.name === config.material);
      if (mat) price += mat.priceModifier;
    }
    if (config.size && product.configOptions.sizes) {
      const sz = product.configOptions.sizes.find(s => s.name === config.size);
      if (sz) price += sz.priceModifier;
    }
    if (config.addons && product.configOptions.addons) {
      for (const addon of config.addons) {
        const ao = product.configOptions.addons.find(a => a.name === addon);
        if (ao) price += ao.price;
      }
    }
  }
  return price;
}

export function getDiscountPercent(product: CatalogueProduct): number | null {
  if (!product.comparePrice || product.comparePrice <= product.basePrice) return null;
  return Math.round(((product.comparePrice - product.basePrice) / product.comparePrice) * 100);
}
