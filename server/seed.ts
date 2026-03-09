import { db } from "./db";
import { categories as categoriesTable, products as productsTable } from "@shared/schema";
import { count } from "drizzle-orm";

const GENERATED_IMAGE_SLUGS = [
  "platform-swing", "lycra-swing", "acrobat-swing",
  "ballpool-4x4", "ballpool-6x4",
  "crash-mat", "therapy-mat", "floormat", "interlocking-mat", "foldable-mat",
  "kidlite-barrel", "balance-beam", "wedges", "jumping-stool",
  "ramp-and-stairs", "climb-board", "wall-bar-ladder", "spider-climb-net",
  "adl-kit-4-page", "adl-kit-5-page", "adl-kit-6-page",
  "bosu-ball", "hexwall-touch-light", "glitter-pad", "glitter-capillary",
];

export async function seedDatabase(catalogueCategories: any[]) {
  const [{ value: productCount }] = await db.select({ value: count() }).from(productsTable);
  if (productCount > 0) {
    return;
  }

  console.log("Seeding database with catalogue data...");

  for (let i = 0; i < catalogueCategories.length; i++) {
    const cat = catalogueCategories[i];
    await db.insert(categoriesTable).values({
      slug: cat.slug,
      title: cat.title,
      description: cat.description,
      color: cat.color,
      image: cat.image || null,
      displayOrder: i,
      isActive: true,
    }).onConflictDoNothing();

    for (const product of cat.products) {
      let images = product.images || [];
      if (images.length === 0 && GENERATED_IMAGE_SLUGS.includes(product.id)) {
        images = [`__generated__:${product.id}`];
      }

      await db.insert(productsTable).values({
        slug: product.id,
        name: product.name,
        categorySlug: product.categorySlug,
        shortDescription: product.shortDescription,
        longDescription: product.description,
        basePrice: product.basePrice,
        comparePrice: product.comparePrice ?? null,
        stock: null,
        images: JSON.stringify(images),
        specifications: JSON.stringify(product.specifications || {}),
        features: JSON.stringify(product.features || []),
        applications: JSON.stringify(product.applications || []),
        configOptions: JSON.stringify(product.configOptions || null),
        shopifyHandle: product.shopifyHandle || null,
        shopifyUrl: product.shopifyUrl || null,
        isActive: true,
      }).onConflictDoNothing();
    }
  }

  const [{ value: finalCount }] = await db.select({ value: count() }).from(productsTable);
  console.log(`Seeded ${finalCount} products across ${catalogueCategories.length} categories.`);
}
