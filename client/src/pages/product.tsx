import { useState, useMemo } from "react";
import { useParams, Link } from "wouter";
import type { CatalogueProduct, ShopifyVariant } from "@/lib/catalogue-data";
import { useProducts, calculateProductPrice, formatPrice } from "@/lib/product-provider";
import { generatedProductImages } from "@/lib/product-images";
import { useEnquiryCart } from "@/lib/enquiry-cart";
import { useShoppingCart } from "@/lib/shopping-cart";
import { createShopifyCheckout } from "@/lib/shopify";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
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
  Tag,
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

function findVariantByOptions(
  variants: ShopifyVariant[],
  selectedOptions: Record<string, string>
): ShopifyVariant | null {
  return variants.find(v =>
    v.options.every(opt => selectedOptions[opt.name] === opt.value)
  ) || null;
}

function getOptionGroups(variants: ShopifyVariant[]): Array<{ name: string; values: string[] }> {
  const groups: Map<string, Set<string>> = new Map();
  for (const v of variants) {
    for (const opt of v.options) {
      if (!groups.has(opt.name)) groups.set(opt.name, new Set());
      groups.get(opt.name)!.add(opt.value);
    }
  }
  return Array.from(groups.entries()).map(([name, values]) => ({ name, values: Array.from(values) }));
}

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const { getProductBySlug, getProductCategory, isLoading } = useProducts();
  const product = getProductBySlug(params.slug);
  const { addItem, isInCart } = useEnquiryCart();
  const { addToCart } = useShoppingCart();

  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedMaterial, setSelectedMaterial] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const hasShopifyVariants = !!(product?.shopifyVariants && product.shopifyVariants.length > 0);
  const optionGroups = useMemo(() => {
    if (!product?.shopifyVariants) return [];
    return getOptionGroups(product.shopifyVariants);
  }, [product?.shopifyVariants]);

  const selectedVariant = useMemo((): ShopifyVariant | null => {
    if (!product?.shopifyVariants || !hasShopifyVariants) return null;
    if (Object.keys(selectedOptions).length === 0) return product.shopifyVariants[0];
    return findVariantByOptions(product.shopifyVariants, selectedOptions);
  }, [product?.shopifyVariants, selectedOptions, hasShopifyVariants]);

  const handleOptionSelect = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
    setActiveImageIdx(0);
  };

  const config = useMemo(
    () => ({ material: selectedMaterial, size: selectedSize, addons: selectedAddons }),
    [selectedMaterial, selectedSize, selectedAddons]
  );

  const computedPrice = useMemo(() => {
    if (selectedVariant) return selectedVariant.price;
    if (product) return calculateProductPrice(product, config);
    return 0;
  }, [selectedVariant, product, config]);

  const computedComparePrice = useMemo(() => {
    if (selectedVariant) return selectedVariant.compareAtPrice;
    return product?.comparePrice || null;
  }, [selectedVariant, product]);

  const currentSku = useMemo(() => {
    return selectedVariant?.sku || product?.sku || null;
  }, [selectedVariant, product]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 pb-20 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 pb-20 text-center max-w-page mx-auto px-4">
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
  const hasLegacyConfig = !!(
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

  const fallbackImg = generatedProductImages[product.id];
  const productImages = product.images && product.images.length > 0
    ? product.images
    : (fallbackImg ? [fallbackImg] : []);

  const variantImage = selectedVariant?.image;
  const activeImage = variantImage || productImages[activeImageIdx] || productImages[0];

  const variantTitle = selectedVariant && selectedVariant.title !== "Default Title"
    ? selectedVariant.title
    : null;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productName: product.name,
      category: category?.title || "",
      unitPrice: computedPrice,
      shopifyHandle: product.shopifyHandle,
      shopifyVariantId: selectedVariant?.id,
      variantTitle: variantTitle || undefined,
      config: {
        color: selectedColor,
        material: selectedMaterial,
        size: selectedSize,
        addons: selectedAddons,
      },
      image: variantImage || product.images?.[0] || generatedProductImages[product.id],
    }, quantity);
  };

  const handleBuyNow = async () => {
    const shopifyHandle = product?.shopifyHandle;
    if (shopifyHandle) {
      const newTab = window.open("", "_blank");
      setCheckoutLoading(true);
      const checkoutUrl = await createShopifyCheckout(shopifyHandle, quantity, selectedVariant?.id);
      setCheckoutLoading(false);
      if (checkoutUrl && newTab) {
        newTab.location.href = checkoutUrl;
        return;
      }
      if (newTab) newTab.close();
      if (product?.shopifyUrl) {
        window.location.href = product.shopifyUrl;
        return;
      }
    }
    handleAddToCart();
  };

  const imageDots = productImages.length > 0
    ? productImages.length
    : (product.configOptions?.colors?.length || 3);

  const discountPct = computedComparePrice && computedComparePrice > computedPrice
    ? Math.round(((computedComparePrice - computedPrice) / computedComparePrice) * 100)
    : null;

  const isHtmlDescription = product.description.trim().startsWith("<");

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main id="main-content">
        <section className="pt-36 pb-4">
          <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap min-w-0" data-testid="breadcrumb">
              <Link href="/" className="transition-colors hover:text-foreground flex-shrink-0" data-testid="breadcrumb-home">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              <Link href={`/category/${category?.slug}`} className="transition-colors hover:text-foreground truncate max-w-[120px] sm:max-w-none" data-testid="breadcrumb-category">
                {category?.title}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-foreground font-medium truncate min-w-0">{product.name}</span>
            </nav>
          </div>
        </section>

        <section className="py-8 lg:py-12" data-testid="section-product-detail">
          <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-square bg-card rounded-3xl border border-border/50 flex items-center justify-center relative overflow-hidden" data-testid="container-product-image">
                  {activeImage ? (
                    <img
                      src={activeImage}
                      alt={`${product.name}${variantTitle ? ` - ${variantTitle}` : ""}`}
                      className="w-full h-full object-cover max-w-full"
                      data-testid="img-product-main"
                    />
                  ) : (
                    <div className="text-center p-12">
                      <div className="w-28 h-28 mx-auto mb-6 rounded-3xl bg-primary/8 flex items-center justify-center">
                        <Package className="w-14 h-14 text-primary/30" />
                      </div>
                      <p className="text-sm text-muted-foreground/50 font-medium">Product Image</p>
                    </div>
                  )}
                  {discountPct && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      -{discountPct}%
                    </div>
                  )}
                </div>
                {productImages.length > 1 ? (
                  <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1">
                    {productImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => { setActiveImageIdx(i); }}
                        className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                          !variantImage && activeImageIdx === i
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
                  productImages.length === 0 && (
                    <div className="flex items-center justify-center gap-2">
                      {Array.from({ length: imageDots }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImageIdx(i)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            activeImageIdx === i ? "bg-primary scale-110" : "bg-border hover:bg-muted-foreground/40"
                          }`}
                          data-testid={`button-image-dot-${i}`}
                        />
                      ))}
                    </div>
                  )
                )}
              </div>

              {/* Product Info */}
              <div className="lg:sticky lg:top-32 lg:self-start space-y-6">
                <div>
                  {product.productType && (
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1" data-testid="text-product-type">
                      <Tag className="w-3 h-3" />
                      {product.productType}
                    </p>
                  )}
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2" data-testid="text-product-category">
                    {category?.title}
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" data-testid="heading-product-name">
                    {product.name}
                  </h1>
                  {product.vendor && (
                    <p className="text-sm text-muted-foreground mb-2" data-testid="text-product-vendor">
                      By <span className="font-medium text-foreground">{product.vendor}</span>
                    </p>
                  )}
                  {currentSku && (
                    <p className="text-xs text-muted-foreground mb-3" data-testid="text-product-sku">
                      SKU: <span className="font-mono">{currentSku}</span>
                    </p>
                  )}
                  <p className="text-base text-muted-foreground leading-relaxed" data-testid="text-product-description">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-foreground tabular-nums" data-testid="text-product-price">
                    {formatPrice(computedPrice)}
                  </span>
                  {computedComparePrice && computedComparePrice > computedPrice && (
                    <span className="text-sm text-muted-foreground line-through tabular-nums" data-testid="text-compare-price">
                      {formatPrice(computedComparePrice)}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">excl. GST</span>
                </div>

                {/* Shopify Variant Selectors */}
                {hasShopifyVariants && optionGroups.length > 0 && (
                  <div className="space-y-5 py-4 border-t border-border/40" data-testid="section-variant-selector">
                    {optionGroups.map((group) => (
                      <div key={group.name}>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 block">
                          {group.name}
                          {selectedOptions[group.name] && (
                            <span className="normal-case text-foreground ml-1">— {selectedOptions[group.name]}</span>
                          )}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {group.values.map((value) => {
                            const testOptions = { ...selectedOptions, [group.name]: value };
                            const testVariant = findVariantByOptions(product.shopifyVariants!, testOptions);
                            const isSelected = (selectedOptions[group.name] || product.shopifyVariants![0]?.options.find(o => o.name === group.name)?.value) === value;
                            const isUnavailable = testVariant && !testVariant.availableForSale;
                            return (
                              <button
                                key={value}
                                onClick={() => handleOptionSelect(group.name, value)}
                                disabled={isUnavailable || false}
                                className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                                  isSelected
                                    ? "border-primary bg-primary/8 text-primary"
                                    : isUnavailable
                                    ? "border-border/30 bg-muted/30 text-muted-foreground/50 line-through cursor-not-allowed"
                                    : "border-border/50 bg-card hover:border-primary/30 text-foreground"
                                }`}
                                data-testid={`option-${group.name.toLowerCase().replace(/\s+/g, "-")}-${value.toLowerCase().replace(/\s+/g, "-")}`}
                              >
                                {value}
                                {testVariant && testVariant.price !== product.shopifyVariants![0]?.price && (
                                  <span className="ml-1 text-xs text-muted-foreground">
                                    {formatPrice(testVariant.price)}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    {selectedVariant && !selectedVariant.availableForSale && (
                      <p className="text-sm text-amber-600 font-medium">This variant is currently out of stock.</p>
                    )}
                  </div>
                )}

                {/* Legacy Config Options (seeded products) */}
                {!hasShopifyVariants && hasLegacyConfig && (
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
                              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 transition-all ${
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
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 block">Material</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {product.configOptions.materials.map((mat) => (
                            <button key={mat.name} onClick={() => setSelectedMaterial(mat.name)}
                              className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${selectedMaterial === mat.name ? "border-primary bg-primary/5 text-foreground" : "border-border/50 bg-card hover:border-primary/20 text-muted-foreground"}`}
                              data-testid={`option-material-${mat.name.toLowerCase().replace(/\s+/g, "-")}`}>
                              <span className="font-medium block">{mat.name}</span>
                              {mat.priceModifier !== 0 && <span className="text-xs text-primary">{mat.priceModifier > 0 ? "+" : ""}{formatPrice(mat.priceModifier)}</span>}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {product.configOptions?.sizes && (
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 block">Size / Variant</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {product.configOptions.sizes.map((sz) => (
                            <button key={sz.name} onClick={() => setSelectedSize(sz.name)}
                              className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${selectedSize === sz.name ? "border-primary bg-primary/5 text-foreground" : "border-border/50 bg-card hover:border-primary/20 text-muted-foreground"}`}
                              data-testid={`option-size-${sz.name.toLowerCase().replace(/\s+/g, "-")}`}>
                              <span className="font-medium block">{sz.name}</span>
                              {sz.priceModifier !== 0 && <span className="text-xs text-primary">{sz.priceModifier > 0 ? "+" : ""}{formatPrice(sz.priceModifier)}</span>}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {product.configOptions?.addons && (
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 block">Add-ons</label>
                        <div className="space-y-2">
                          {product.configOptions.addons.map((addon) => (
                            <button key={addon.name} onClick={() => toggleAddon(addon.name)}
                              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all ${selectedAddons.includes(addon.name) ? "border-primary bg-primary/5" : "border-border/50 bg-card hover:border-primary/20"}`}
                              data-testid={`option-addon-${addon.name.toLowerCase().replace(/\s+/g, "-")}`}>
                              <div className="flex items-center gap-2.5">
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${selectedAddons.includes(addon.name) ? "bg-primary border-primary" : "border-border"}`}>
                                  {selectedAddons.includes(addon.name) && <Check className="w-3 h-3 text-primary-foreground" />}
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

                {/* Quantity */}
                <div className="flex items-center gap-3 py-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Qty</label>
                  <div className="flex items-center gap-1 border border-border/50 rounded-full">
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1} data-testid="button-qty-decrease">
                      <Minus className="w-3.5 h-3.5" />
                    </Button>
                    <span className="w-8 text-center text-sm font-semibold tabular-nums" data-testid="text-quantity">{quantity}</span>
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8"
                      onClick={() => setQuantity(quantity + 1)} data-testid="button-qty-increase">
                      <Plus className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Quality Badges */}
                <div className="grid grid-cols-2 gap-3 mb-2">
                  {qualityBadges.map((badge) => (
                    <div key={badge.label} className="flex items-center gap-2 p-2.5 rounded-xl bg-card border border-border/50" data-testid={`badge-${badge.label.toLowerCase().replace(/\s+/g, "-")}`}>
                      <badge.icon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-xs font-medium text-foreground">{badge.label}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-2 border-t border-border/40">
                  <div className="flex gap-3">
                    <Button size="lg" className="flex-1 rounded-full gap-2 shadow-lg shadow-primary/20"
                      onClick={handleAddToCart} data-testid="button-add-to-cart">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </Button>
                    <Button size="lg" variant="outline" className="flex-1 rounded-full gap-2 border-primary/20 hover:bg-primary/5"
                      onClick={handleBuyNow} disabled={checkoutLoading} data-testid="button-buy-now">
                      {checkoutLoading ? (
                        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      ) : (
                        <Zap className="w-4 h-4" />
                      )}
                      {checkoutLoading ? "Redirecting..." : product.shopifyHandle ? "Buy on Shopify" : "Buy Now"}
                    </Button>
                  </div>
                  <div className="flex gap-3">
                    <Button size="lg" variant="ghost" className="flex-1 rounded-full gap-2 text-muted-foreground"
                      onClick={() => addItem(product.id, product.name, category?.title || "")} data-testid="button-add-enquiry">
                      {inEnquiryCart ? (
                        <><CheckCircle2 className="w-4 h-4 text-primary" />Added to Enquiry</>
                      ) : (
                        <><Package className="w-4 h-4" />Add to Enquiry</>
                      )}
                    </Button>
                    <Link href="/enquiry" className="flex-1">
                      <Button size="lg" variant="ghost" className="w-full rounded-full gap-2 text-muted-foreground" data-testid="button-bulk-quote">
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

        {/* Story Cards */}
        <section className="py-16" data-testid="section-storytelling">
          <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Full Description */}
        <section className="py-12" data-testid="section-full-description">
          <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">About This Product</h2>
              {isHtmlDescription ? (
                <div
                  className="prose prose-sm sm:prose-base max-w-none text-muted-foreground leading-relaxed
                    [&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_h4]:text-foreground
                    [&_strong]:text-foreground [&_b]:text-foreground
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
                    [&_li]:mb-1 [&_p]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3
                    [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2
                    [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2
                    [&_th]:border [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:bg-muted [&_th]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  data-testid="html-product-description"
                />
              ) : (
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  {product.description.split('\n').filter(l => l.trim()).map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Specs, Features, Applications */}
        <section className="py-12 bg-card/50" data-testid="section-product-specs">
          <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
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
                  {!product.specifications.dimensions && !product.specifications.material && !product.specifications.weightCapacity && !product.specifications.useCase && (
                    <p className="text-sm text-muted-foreground">See description for full specifications.</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">Features</h3>
                {product.features.length > 0 ? (
                  <ul className="space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">See product description for features.</p>
                )}
              </div>

              <div className="md:col-span-2">
                <h3 className="text-lg font-bold text-foreground mb-4">Applications</h3>
                {product.applications.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app) => (
                      <span key={app} className="text-xs px-3 py-1.5 rounded-full bg-primary/8 text-primary font-medium capitalize" data-testid={`app-tag-${app.toLowerCase().replace(/\s+/g, "-")}`}>
                        {app.replace(/-/g, " ")}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">See product description for applications.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
