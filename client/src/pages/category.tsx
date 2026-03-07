import { useParams, Link } from "wouter";
import { getCategoryBySlug, categories } from "@/lib/catalogue-data";
import { ProductCard } from "@/components/product-card";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { TrustStrip } from "@/components/trust-strip";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 text-center max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist.</p>
          <Link href="/">
            <Button className="rounded-full" data-testid="button-back-home">Back to Home</Button>
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {category.image && (
          <div className="relative h-48 sm:h-56 lg:h-64 mt-16 overflow-hidden" data-testid="section-category-banner">
            <img
              src={category.image.replace('width=600', 'width=1920')}
              alt={category.title}
              className="w-full h-full object-cover"
              loading="eager"
              data-testid="img-category-banner"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          </div>
        )}

        <section className={category.image ? "pb-16 -mt-16 relative z-10" : "pt-28 pb-16"} data-testid="section-category-header">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" data-testid="breadcrumb">
              <Link href="/" className="transition-colors" data-testid="breadcrumb-home">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/#categories" className="transition-colors" data-testid="breadcrumb-products">Products</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground font-medium">{category.title}</span>
            </nav>

            <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Category</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4" data-testid="heading-category">
                  {category.title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl" data-testid="text-category-desc">
                  {category.description}
                </p>
              </div>
              <span className="text-sm font-semibold text-primary bg-primary/8 px-4 py-2 rounded-full" data-testid="text-product-count">
                {category.products.length} Products
              </span>
            </div>
          </div>
        </section>

        <section className="pb-20" data-testid="section-product-grid">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-bold text-foreground mb-6">Browse Other Categories</h3>
            <div className="flex flex-wrap gap-3">
              {categories.filter((c) => c.slug !== category.slug).map((c) => (
                <Link key={c.slug} href={`/category/${c.slug}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    data-testid={`button-other-category-${c.slug}`}
                  >
                    {c.title}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <TrustStrip />
      </main>
      <SiteFooter />
    </div>
  );
}
