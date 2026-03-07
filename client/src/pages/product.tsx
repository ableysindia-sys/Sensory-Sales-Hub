import { useState, useMemo } from "react";
import { useParams, Link } from "wouter";
import {
  getProductBySlug,
  getProductCategory,
  calculateProductPrice,
  formatPrice,
  type CatalogueProduct,
} from "@/lib/catalogue-data";
import { useEnquiryCart } from "@/lib/enquiry-cart";
import { useShoppingCart } from "@/lib/shopping-cart";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { RazorpayModal } from "@/components/razorpay-modal";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ShoppingCart,
  Package,
  CheckCircle2,
  Shield,
  Wrench,
  SprayCan,
  Building2,
  Zap,
  Heart,
  Layers,
  Send,
  Plus,
  Minus,
  Check,
} from "lucide-react";

const qualityBadges = [
  { icon: Shield, label: "Durable Construction" },
  { icon: Wrench, label: "Therapist Friendly" },
  { icon: SprayCan, label: "Easy Maintenance" },
  { icon: Building2, label: "Institutional Grade" },
];

const storyCards = [
  {
    icon: Heart,
    title: "Therapeutic Benefits",
    getDescription: (p: CatalogueProduct) =>
      `Designed to support ${p.applications.slice(0, 2).join(" and ").toLowerCase()}, the ${p.name} is built for measurable therapy outcomes.`,
  },
  {
    icon: Layers,
    title: "Material Engineering",
    getDescription: (p: CatalogueProduct) =>
      p.specifications.material
        ? `Crafted with ${p.specifications.material.toLowerCase()} for professional durability and client safety.`
        : "Engineered with professional-grade materials for lasting performance in clinical environments.",
  },
  {
    icon: Zap,
    title: "How It Helps",
    getDescription: (p: CatalogueProduct) =>
      p.specifications.useCase
        ? `Primary use: ${p.specifications.useCase}. Trusted by OTs and therapy centres across India.`
        : "Developed in collaboration with occupational therapists for real-world clinical impact.",
  },
];

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const product = getProductBySlug(params.slug);
  const { addItem, isInCart } = useEnquiryCart();
  const { addToCart } = useShoppingCart();

  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedMaterial, setSelectedMaterial] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const config = useMemo(
    () => ({ material: selectedMaterial, size: selectedSize, addons: selectedAddons }),
    [selectedMaterial, selectedSize, selectedAddons]
  );

  const computedPrice = product ? calculateProductPrice(product, config) : 0;

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
  const inEnquiryCart = isInCart(product.id);
  const hasConfig = !!(
    product.configOptions?.colors ||
    product.configOptions?.materials ||
    product.configOptions?.sizes ||
    product.configOptions?.addons
  );

  const toggleAddon = (addonName: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonName)
        ? prev.filter((a) => a !== addonName)
        : [...prev, addonName]
    );
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productName: product.name,
      category: category?.title || "",
      unitPrice: computedPrice,
      config: {
        color: selectedColor,
        material: selectedMaterial,
        size: selectedSize,
        addons: selectedAddons,
      },
      image: product.images?.[0],
    }, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setShowRazorpay(true);
  };

  const productImages = product.images || [];
  const imageDots = productImages.length > 0
    ? productImages.length
    : (product.configOptions?.colors?.length || 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-28 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="breadcrumb">
              <Link href="/" className="transition-colors hover:text-foreground" data-testid="breadcrumb-home">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href={`/category/${category?.slug}`} className="transition-colors hover:text-foreground" data-testid="breadcrumb-category">
                {category?.title}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground font-medium">{product.name}</span>
            </nav>
          </div>
        </section>

        <section className="py-8 lg:py-12" data-testid="section-product-detail">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              <div className="space-y-4">
                <div className="aspect-square bg-card rounded-3xl border border-border/50 flex items-center justify-center relative overflow-hidden" data-testid="container-product-image">
                  {productImages.length > 0 ? (
                    <img
                      src={productImages[activeImageIdx] || productImages[0]}
                      alt={`${product.name} - Image ${activeImageIdx + 1}`}
                      className="w-full h-full object-cover"
                      data-testid="img-product-main"
                    />
                  ) : (
                    <div className="text-center p-12">
                      <div className="w-28 h-28 mx-auto mb-6 rounded-3xl bg-primary/8 flex items-center justify-center">
                        <Package className="w-14 h-14 text-primary/30" />
                      </div>
                      <p className="text-sm text-muted-foreground/50 font-medium">Product Image</p>
                      <p className="text-xs text-muted-foreground/30 mt-1">{product.name}</p>
                    </div>
                  )}
                  {selectedColor && (
                    <div
                      className="absolute bottom-4 right-4 w-8 h-8 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: product.configOptions?.colors?.find(c => c.name === selectedColor)?.hex }}
                      data-testid="indicator-selected-color"
                    />
                  )}
                </div>
                {productImages.length > 1 ? (
                  <div className="flex items-center justify-center gap-2">
                    {productImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIdx(i)}
                        className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                          activeImageIdx === i
                            ? "border-primary ring-1 ring-primary/30"
                            : "border-border/50 hover:border-primary/30"
                        }`}
                        data-testid={`button-image-thumb-${i}`}
                      >
                        <img src={img} alt={`${product.name} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    {Array.from({ length: imageDots }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIdx(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          activeImageIdx === i
                            ? "bg-primary scale-110"
                            : "bg-border hover:bg-muted-foreground/40"
                        }`}
                        data-testid={`button-image-dot-${i}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
                <div>
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2" data-testid="text-product-category">
                    {category?.title}
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" data-testid="heading-product-name">
                    {product.name}
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-product-description">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-foreground tabular-nums" data-testid="text-product-price">
                    {formatPrice(computedPrice)}
                  </span>
                  {computedPrice !== product.basePrice && (
                    <span className="text-sm text-muted-foreground line-through tabular-nums" data-testid="text-base-price">
                      {formatPrice(product.basePrice)}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">excl. GST</span>
                </div>

                {hasConfig && (
                  <div className="space-y-5 py-4 border-t border-border/40" data-testid="section-configurator">
                    {product.configOptions?.colors && (
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 block">
                          Color {selectedColor && <span className="normal-case text-foreground">— {selectedColor}</span>}
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                          {product.configOptions.colors.map((color) => (
                            <button
                              key={color.name}
                              onClick={() => setSelectedColor(color.name)}
                              className={`w-9 h-9 rounded-full border-2 transition-all ${
                                selectedColor === color.name
                                  ? "border-primary scale-110 ring-2 ring-primary/20"
                                  : "border-border/60 hover:border-muted-foreground/40"
                              }`}
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                              data-testid={`swatch-color-${color.name.toLowerCase().replace(/\s+/g, "-")}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {product.configOptions?.materials && (
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 block">
                          Material
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {product.configOptions.materials.map((mat) => (
                            <button
                              key={mat.name}
                              onClick={() => setSelectedMaterial(mat.name)}
                              className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                                selectedMaterial === mat.name
                                  ? "border-primary bg-primary/5 text-foreground"
                                  : "border-border/50 bg-card hover:border-primary/20 text-muted-foreground"
                              }`}
                              data-testid={`option-material-${mat.name.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                              <span className="font-medium block">{mat.name}</span>
                              {mat.priceModifier !== 0 && (
                                <span className="text-xs text-primary">
                                  {mat.priceModifier > 0 ? "+" : ""}{formatPrice(mat.priceModifier)}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {product.configOptions?.sizes && (
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 block">
                          Size / Variant
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {product.configOptions.sizes.map((sz) => (
                            <button
                              key={sz.name}
                              onClick={() => setSelectedSize(sz.name)}
                              className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                                selectedSize === sz.name
                                  ? "border-primary bg-primary/5 text-foreground"
                                  : "border-border/50 bg-card hover:border-primary/20 text-muted-foreground"
                              }`}
                              data-testid={`option-size-${sz.name.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                              <span className="font-medium block">{sz.name}</span>
                              {sz.priceModifier !== 0 && (
                                <span className="text-xs text-primary">
                                  {sz.priceModifier > 0 ? "+" : ""}{formatPrice(sz.priceModifier)}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {product.configOptions?.addons && (
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 block">
                          Add-ons
                        </label>
                        <div className="space-y-2">
                          {product.configOptions.addons.map((addon) => (
                            <button
                              key={addon.name}
                              onClick={() => toggleAddon(addon.name)}
                              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all ${
                                selectedAddons.includes(addon.name)
                                  ? "border-primary bg-primary/5"
                                  : "border-border/50 bg-card hover:border-primary/20"
                              }`}
                              data-testid={`option-addon-${addon.name.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                  selectedAddons.includes(addon.name)
                                    ? "bg-primary border-primary"
                                    : "border-border"
                                }`}>
                                  {selectedAddons.includes(addon.name) && (
                                    <Check className="w-3 h-3 text-primary-foreground" />
                                  )}
                                </div>
                                <span className="font-medium text-foreground">{addon.name}</span>
                              </div>
                              <span className="text-primary font-medium">+{formatPrice(addon.price)}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-3 py-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Qty</label>
                  <div className="flex items-center gap-1 border border-border/50 rounded-full">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      data-testid="button-qty-decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </Button>
                    <span className="w-8 text-center text-sm font-semibold tabular-nums" data-testid="text-quantity">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8"
                      onClick={() => setQuantity(quantity + 1)}
                      data-testid="button-qty-increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-2">
                  {qualityBadges.map((badge) => (
                    <div key={badge.label} className="flex items-center gap-2 p-2.5 rounded-xl bg-card border border-border/50" data-testid={`badge-${badge.label.toLowerCase().replace(/\s+/g, "-")}`}>
                      <badge.icon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-xs font-medium text-foreground">{badge.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 pt-2 border-t border-border/40">
                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      className="flex-1 rounded-full gap-2 shadow-lg shadow-primary/20"
                      onClick={handleAddToCart}
                      data-testid="button-add-to-cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="flex-1 rounded-full gap-2 border-primary/20 hover:bg-primary/5"
                      onClick={handleBuyNow}
                      data-testid="button-buy-now"
                    >
                      <Zap className="w-4 h-4" />
                      Buy Now
                    </Button>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      variant="ghost"
                      className="flex-1 rounded-full gap-2 text-muted-foreground"
                      onClick={() => addItem(product.id, product.name, category?.title || "")}
                      data-testid="button-add-enquiry"
                    >
                      {inEnquiryCart ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          Added to Enquiry
                        </>
                      ) : (
                        <>
                          <Package className="w-4 h-4" />
                          Add to Enquiry
                        </>
                      )}
                    </Button>
                    <Link href="/#enquiry" className="flex-1">
                      <Button
                        size="lg"
                        variant="ghost"
                        className="w-full rounded-full gap-2 text-muted-foreground"
                        data-testid="button-bulk-quote"
                      >
                        <Send className="w-4 h-4" />
                        Bulk/Custom Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16" data-testid="section-storytelling">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              {storyCards.map((card) => (
                <div key={card.title} className="p-6 rounded-2xl bg-card border border-border/50" data-testid={`card-story-${card.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                    <card.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.getDescription(product)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12" data-testid="section-full-description">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground mb-4">About This Product</h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-card/50" data-testid="section-product-specs">
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
                    <span key={app} className="text-xs px-3 py-1.5 rounded-full bg-primary/8 text-primary font-medium" data-testid={`app-tag-${app.toLowerCase().replace(/\s+/g, "-")}`}>
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
      <RazorpayModal open={showRazorpay} onOpenChange={setShowRazorpay} />
    </div>
  );
}
