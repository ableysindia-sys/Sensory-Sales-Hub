import { useParams, Link } from "wouter";
import { getProductBySlug, getProductCategory } from "@/lib/catalogue-data";
import { useEnquiryCart } from "@/lib/enquiry-cart";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingCart, Package, Settings, CheckCircle2, Shield, Wrench, SprayCan, Building2 } from "lucide-react";

const qualityBadges = [
  { icon: Shield, label: "Durable Construction" },
  { icon: Wrench, label: "Therapist Friendly" },
  { icon: SprayCan, label: "Easy Maintenance" },
  { icon: Building2, label: "Institutional Grade" },
];

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const product = getProductBySlug(params.slug);
  const { addItem, isInCart } = useEnquiryCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 text-center max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/">
            <Button className="rounded-full" data-testid="button-back-home">Back to Home</Button>
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const category = getProductCategory(product);
  const inCart = isInCart(product.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-28 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" data-testid="breadcrumb">
              <Link href="/" className="transition-colors" data-testid="breadcrumb-home">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href={`/category/${category?.slug}`} className="transition-colors" data-testid="breadcrumb-category">
                {category?.title}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground font-medium">{product.name}</span>
            </nav>
          </div>
        </section>

        <section className="pb-16" data-testid="section-product-detail">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="aspect-square bg-card rounded-3xl border border-border/50 flex items-center justify-center" data-testid="container-product-image">
                <div className="text-center p-12">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-primary/8 flex items-center justify-center">
                    <Package className="w-12 h-12 text-primary/30" />
                  </div>
                  <p className="text-sm text-muted-foreground/40 font-medium">Product Image</p>
                  <p className="text-xs text-muted-foreground/30 mt-1">{product.name}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{category?.title}</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="heading-product-name">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8" data-testid="text-product-description">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {qualityBadges.map((badge) => (
                    <div key={badge.label} className="flex items-center gap-2.5 p-3 rounded-xl bg-card border border-border/50" data-testid={`badge-${badge.label.toLowerCase().replace(/\s+/g, '-')}`}>
                      <badge.icon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-xs font-medium text-foreground">{badge.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Button
                    size="lg"
                    className="rounded-full flex-1 gap-2"
                    onClick={() => addItem(product.id, product.name, category?.title || "")}
                    data-testid="button-add-to-cart"
                  >
                    {inCart ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Added to Enquiry
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Add to Enquiry Cart
                      </>
                    )}
                  </Button>
                  <Link href="/enquiry">
                    <Button size="lg" variant="outline" className="rounded-full w-full gap-2" data-testid="button-bulk-enquiry">
                      <Package className="w-4 h-4" />
                      Bulk Order Enquiry
                    </Button>
                  </Link>
                </div>

                <Link href="/enquiry">
                  <Button variant="ghost" className="gap-2 text-primary rounded-full" data-testid="button-customisation">
                    <Settings className="w-4 h-4" />
                    Request Customisation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-card/50" data-testid="section-product-specs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">Specifications</h3>
                <div className="space-y-3">
                  {product.specifications.dimensions && (
                    <div data-testid="spec-dimensions">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Dimensions</p>
                      <p className="text-sm text-foreground">{product.specifications.dimensions}</p>
                    </div>
                  )}
                  {product.specifications.material && (
                    <div data-testid="spec-material">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Material</p>
                      <p className="text-sm text-foreground">{product.specifications.material}</p>
                    </div>
                  )}
                  {product.specifications.weightCapacity && (
                    <div data-testid="spec-weight">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Weight Capacity</p>
                      <p className="text-sm text-foreground">{product.specifications.weightCapacity}</p>
                    </div>
                  )}
                  {product.specifications.useCase && (
                    <div data-testid="spec-usecase">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Use Case</p>
                      <p className="text-sm text-foreground">{product.specifications.useCase}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-lg font-bold text-foreground mb-4">Applications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app) => (
                    <span key={app} className="text-xs px-3 py-1.5 rounded-full bg-primary/8 text-primary font-medium" data-testid={`app-tag-${app.toLowerCase().replace(/\s+/g, '-')}`}>
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
