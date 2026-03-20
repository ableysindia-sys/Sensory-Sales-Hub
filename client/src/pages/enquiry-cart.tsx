import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { useEnquiryCart } from "@/lib/enquiry-cart";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Building2,
  GraduationCap,
  Home,
  Hospital,
  ShoppingBag,
  Sparkles,
  Package,
  Wrench,
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronRight,
  FileDown,
  Loader2,
  Phone,
  Send,
  CheckCircle2,
  Smartphone,
  Trash2,
  Plus,
  Minus,
  UserCircle,
} from "lucide-react";
import type { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { SITE_IMAGES } from "@/lib/catalogue-data";
import { useProducts } from "@/lib/product-provider";
import { PhoneSignupInline } from "@/components/phone-signup-inline";

type EnquiryFormValues = z.infer<typeof api.leads.create.input>;

const SETUP_TYPES = [
  { id: "therapy-centre", label: "Therapy Centre / Clinic", icon: Hospital, desc: "OT clinics, rehab facilities, physiotherapy centres" },
  { id: "school", label: "School / Institution", icon: GraduationCap, desc: "Special education schools, inclusive classrooms" },
  { id: "sensory-room", label: "Sensory Room Setup", icon: Sparkles, desc: "Complete sensory integration room design" },
  { id: "home-setup", label: "Home Setup", icon: Home, desc: "Home-based therapy or sensory corner" },
  { id: "other", label: "Other / Custom", icon: Building2, desc: "Something else entirely" },
];

const ORDER_TYPES = [
  { id: "bulk-order", label: "Bulk Order", icon: Package, desc: "Large quantities of specific products" },
  { id: "new-setup", label: "New Centre Setup", icon: Building2, desc: "Setting up a new facility from scratch" },
  { id: "customization", label: "Custom Equipment", icon: Wrench, desc: "Modified or custom-built therapy tools" },
  { id: "replenish", label: "Replenish / Reorder", icon: ShoppingBag, desc: "Restocking existing equipment" },
];

const SETUP_CATEGORY_MAP: Record<string, string[]> = {
  "therapy-centre":   ["swings", "therapy-balls", "deep-pressure", "movement-balance", "mats"],
  "school":           ["deep-pressure", "visual", "movement-balance", "therapy-balls", "adl-kit"],
  "sensory-room":     ["swings", "ballpool", "visual", "deep-pressure", "mats", "climbing"],
  "home-setup":       ["swings", "deep-pressure", "therapy-balls", "visual"],
  "other":            [],
};

const SETUP_KIT_INFO: Record<string, { title: string; description: string; highlight: string }> = {
  "therapy-centre": {
    title: "Therapy Centre Essentials",
    description: "Vestibular swings, therapy balls, deep-pressure tools, balance boards and safety mats — the core equipment for an OT or physiotherapy clinic.",
    highlight: "Recommended for OT, PT & Rehab clinics",
  },
  "school": {
    title: "School Sensory Kit",
    description: "Sensory tools for inclusive classrooms — weighted items, visual aids, movement equipment and ADL kits to support children with special needs.",
    highlight: "Recommended for SPED, inclusive & mainstream schools",
  },
  "sensory-room": {
    title: "Full Sensory Room Setup",
    description: "Everything for a complete sensory integration room: platform swings, ball pools, visual panels, deep-pressure items, soft mats and climbing structures.",
    highlight: "Recommended for sensory integration rooms",
  },
  "home-setup": {
    title: "Home Therapy Corner",
    description: "Compact, safe equipment for home-based sensory therapy — a therapy swing, calming weighted tools, therapy balls and visual stimulation items.",
    highlight: "Recommended for home-based therapy",
  },
  "other": {
    title: "Custom Selection",
    description: "Not sure where to start? Browse all our product categories below and pick what you need. Our team will help you finalise the right combination.",
    highlight: "All categories available",
  },
};

const BUDGET_RANGES = [
  "Under ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹3,00,000",
  "₹3,00,000 – ₹5,00,000",
  "₹5,00,000+",
  "Not sure yet",
];

const TIMELINE_OPTIONS = [
  "Within 2 weeks",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "Just exploring",
];

const TOTAL_STEPS = 6;

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2" data-testid="step-indicator">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i < current
                ? "bg-primary text-primary-foreground"
                : i === current
                ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                : "bg-muted text-muted-foreground"
            }`}
            data-testid={`step-dot-${i}`}
          >
            {i < current ? <Check className="w-3.5 h-3.5" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`w-6 sm:w-10 h-0.5 rounded ${i < current ? "bg-primary" : "bg-muted"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  icon: Icon,
  label,
  desc,
  testId,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
  desc: string;
  testId: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer touch-manipulation group ${
        selected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border/50 hover:border-primary/30 hover:bg-muted/30"
      }`}
      data-testid={testId}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
            selected ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className={`text-sm font-semibold ${selected ? "text-primary" : "text-foreground"}`}>{label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
        </div>
        {selected && (
          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 ml-auto" />
        )}
      </div>
    </button>
  );
}

function PillOption({
  selected,
  onClick,
  label,
  testId,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  testId: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-all cursor-pointer touch-manipulation ${
        selected
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border/50 text-foreground hover:border-primary/30 hover:bg-muted/30"
      }`}
      data-testid={testId}
    >
      {label}
    </button>
  );
}

function CategoryCheckbox({
  label,
  checked,
  onChange,
  testId,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  testId: string;
}) {
  return (
    <label
      className="flex items-center gap-3 p-3 rounded-xl border border-border/50 cursor-pointer hover:bg-muted/30 transition-all touch-manipulation group"
      data-testid={testId}
    >
      <span
        className={`w-5 h-5 rounded border-[1.5px] flex items-center justify-center flex-shrink-0 transition-all ${
          checked ? "bg-primary border-primary" : "border-muted-foreground/40 group-hover:border-primary/50"
        }`}
      >
        {checked && <Check className="w-3 h-3 text-primary-foreground" />}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </label>
  );
}

export default function EnquiryCartPage() {
  const { items, removeItem, updateQuantity, updateNotes, clearCart, getItemCount } = useEnquiryCart();
  const { categories } = useProducts();
  const { toast } = useToast();
  const { user, openAuthDrawer } = useAuth();
  const [step, setStep] = useState(0);
  const [setupType, setSetupType] = useState<string>("");
  const [orderType, setOrderType] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [timeline, setTimeline] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const createLead = useMutation({
    mutationFn: async (data: EnquiryFormValues) => {
      const res = await apiRequest("POST", api.leads.create.path, data);
      return res.json();
    },
  });

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(api.leads.create.input),
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      organisation: "",
      phone: user?.phoneNumber || "",
      city: "",
      category: "",
      requirementType: "",
      interest: "",
      message: "",
      cartItems: "",
    },
  });

  useEffect(() => {
    if (!setupType || categories.length === 0) return;
    const recommendedSlugs = SETUP_CATEGORY_MAP[setupType] || [];
    const recommended = categories
      .filter((c) => recommendedSlugs.includes(c.slug))
      .map((c) => c.title);
    setSelectedCategories(recommended);
  }, [setupType, categories]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Prefill form when user signs in mid-flow; auto-advance from sign-in step
  useEffect(() => {
    if (user) {
      if (user.phoneNumber) form.setValue("phone", user.phoneNumber);
      if (user.displayName) form.setValue("name", user.displayName);
      if (user.email) form.setValue("email", user.email);
      if (step === 0) setStep(1);
    }
  }, [user, form]);

  const canProceed = useMemo(() => {
    switch (step) {
      case 0: return true;
      case 1: return !!setupType;
      case 2: return !!orderType;
      case 3: return selectedCategories.length > 0;
      case 4: return !!budget && !!timeline;
      case 5: return true;
      default: return false;
    }
  }, [step, setupType, orderType, selectedCategories, budget, timeline]);

  const onSubmit = async (data: EnquiryFormValues) => {
    const cartData = items.map((item) => ({
      product: item.productName,
      category: item.category,
      qty: item.quantity,
      notes: item.notes,
    }));

    const setupLabel = SETUP_TYPES.find((s) => s.id === setupType)?.label || setupType;
    const orderLabel = ORDER_TYPES.find((o) => o.id === orderType)?.label || orderType;

    const fullMessage = [
      `Setup Type: ${setupLabel}`,
      `Order Type: ${orderLabel}`,
      `Categories: ${selectedCategories.join(", ")}`,
      `Budget: ${budget}`,
      `Timeline: ${timeline}`,
      data.message ? `\nAdditional Details:\n${data.message}` : "",
      items.length > 0 ? `\nEnquiry Cart: ${JSON.stringify(cartData)}` : "",
    ].filter(Boolean).join("\n");

    try {
      await createLead.mutateAsync({
        ...data,
        category: selectedCategories.join(", "),
        requirementType: orderLabel,
        interest: setupLabel,
        message: fullMessage,
        cartItems: items.length > 0 ? JSON.stringify(cartData) : "",
      });
      setSubmitted(true);
      clearCart();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main id="main-content" className="pt-36 pb-20">
          <div className="max-w-xl mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center"
            >
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h1 className="text-3xl font-bold text-foreground mb-3" data-testid="heading-success">
                Enquiry Submitted!
              </h1>
              <p className="text-muted-foreground mb-2">
                Thank you for your interest in Abley's Rehab equipment.
              </p>
              <p className="text-muted-foreground mb-8">
                Our team will review your requirements and get back to you within <strong className="text-foreground">24 hours</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/">
                  <Button variant="outline" className="rounded-full gap-2 cursor-pointer touch-manipulation" data-testid="button-back-home">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                  </Button>
                </Link>
                <Link href="/products">
                  <Button className="rounded-full gap-2 cursor-pointer touch-manipulation" data-testid="button-browse-products">
                    Browse Products <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content">
        <div className="relative h-56 sm:h-64 lg:h-80 mt-[6.5rem] overflow-hidden" data-testid="section-bulk-banner">
          <img
            src={SITE_IMAGES.shopBanner}
            alt="Abley's Rehab workshop and manufacturing"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-2">
                For Clinics, Schools & Institutions
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 font-display" data-testid="heading-bulk-orders">
                Bulk Orders & Custom Setups
              </h1>
              <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-4">
                Professional therapy equipment tailored to your facility's needs — tell us your requirements and we'll prepare a custom quote
              </p>
              <a
                href="/api/catalog"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors backdrop-blur-sm"
                data-testid="link-enquiry-catalogue-pdf"
              >
                <FileDown className="w-3.5 h-3.5" />
                Download Product Catalogue PDF
              </a>
            </motion.div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

          <div className="flex justify-center mb-8">
            <StepIndicator current={step} total={TOTAL_STEPS} />
          </div>

          <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step-signin"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 sm:p-8 flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Smartphone className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground mb-1" data-testid="heading-step-signin">
                    Verify your number to receive your quote
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                    A one-time OTP will be sent to your phone. Your verified number is used to send the customised quote and for WhatsApp follow-up.
                  </p>
                  <div className="w-full max-w-sm">
                    <PhoneSignupInline
                      variant="light"
                      label=""
                      sublabel=""
                      containerId="recaptcha-enquiry"
                    />
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 sm:p-8"
                >
                  <h2 className="text-lg font-bold text-foreground mb-1" data-testid="heading-step-0">
                    What type of setup is this for?
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    This helps us understand the scale and type of equipment you need.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {SETUP_TYPES.map((s) => (
                      <OptionCard
                        key={s.id}
                        selected={setupType === s.id}
                        onClick={() => setSetupType(s.id)}
                        icon={s.icon}
                        label={s.label}
                        desc={s.desc}
                        testId={`option-setup-${s.id}`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 sm:p-8"
                >
                  <h2 className="text-lg font-bold text-foreground mb-1" data-testid="heading-step-1">
                    What do you need from us?
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Tell us the nature of your requirement.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {ORDER_TYPES.map((o) => (
                      <OptionCard
                        key={o.id}
                        selected={orderType === o.id}
                        onClick={() => setOrderType(o.id)}
                        icon={o.icon}
                        label={o.label}
                        desc={o.desc}
                        testId={`option-order-${o.id}`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 sm:p-8"
                >
                  <h2 className="text-lg font-bold text-foreground mb-1" data-testid="heading-step-2">
                    Products for your {SETUP_TYPES.find((s) => s.id === setupType)?.label || "setup"}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-5">
                    We've pre-selected the categories best suited to your needs. Adjust as required.
                  </p>

                  {setupType && SETUP_KIT_INFO[setupType] && (
                    <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20" data-testid="recommended-kit-banner">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          {(() => {
                            const S = SETUP_TYPES.find((s) => s.id === setupType);
                            return S ? <S.icon className="w-4.5 h-4.5 text-primary" /> : null;
                          })()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-primary mb-0.5">{SETUP_KIT_INFO[setupType].title}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{SETUP_KIT_INFO[setupType].description}</p>
                          <p className="text-xs font-medium text-primary/70 mt-1.5">✓ {SETUP_KIT_INFO[setupType].highlight}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {(() => {
                    const recommendedSlugs = SETUP_CATEGORY_MAP[setupType] || [];
                    const recommended = categories.filter((c) => recommendedSlugs.includes(c.slug));
                    const additional = categories.filter((c) => !recommendedSlugs.includes(c.slug));
                    return (
                      <>
                        {recommended.length > 0 && (
                          <div className="mb-5">
                            <div className="flex items-center justify-between mb-2.5">
                              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Recommended for you</p>
                              <button
                                type="button"
                                className="text-xs text-primary hover:underline cursor-pointer touch-manipulation"
                                onClick={() => {
                                  const allRec = recommended.map((c) => c.title);
                                  const allSelected = allRec.every((t) => selectedCategories.includes(t));
                                  if (allSelected) {
                                    setSelectedCategories((prev) => prev.filter((t) => !allRec.includes(t)));
                                  } else {
                                    setSelectedCategories((prev) => [...new Set([...prev, ...allRec])]);
                                  }
                                }}
                                data-testid="button-toggle-recommended"
                              >
                                {recommended.map((c) => c.title).every((t) => selectedCategories.includes(t)) ? "Deselect all" : "Select all"}
                              </button>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-2">
                              {recommended.map((cat) => (
                                <label
                                  key={cat.slug}
                                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all touch-manipulation group ${
                                    selectedCategories.includes(cat.title)
                                      ? "border-primary/40 bg-primary/5"
                                      : "border-border/50 hover:bg-muted/30"
                                  }`}
                                  data-testid={`check-category-${cat.slug}`}
                                >
                                  <span
                                    className={`w-5 h-5 rounded border-[1.5px] flex items-center justify-center flex-shrink-0 transition-all ${
                                      selectedCategories.includes(cat.title)
                                        ? "bg-primary border-primary"
                                        : "border-muted-foreground/40 group-hover:border-primary/50"
                                    }`}
                                  >
                                    {selectedCategories.includes(cat.title) && <Check className="w-3 h-3 text-primary-foreground" />}
                                  </span>
                                  <input type="checkbox" checked={selectedCategories.includes(cat.title)} onChange={() => toggleCategory(cat.title)} className="sr-only" />
                                  <span className="text-sm font-medium text-foreground flex-1">{cat.title}</span>
                                  <span className="text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full whitespace-nowrap">Recommended</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}

                        {additional.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                              {recommended.length > 0 ? "Additional options" : "All categories"}
                            </p>
                            <div className="grid sm:grid-cols-2 gap-2">
                              {additional.map((cat) => (
                                <CategoryCheckbox
                                  key={cat.slug}
                                  label={cat.title}
                                  checked={selectedCategories.includes(cat.title)}
                                  onChange={() => toggleCategory(cat.title)}
                                  testId={`check-category-${cat.slug}`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}

                  {items.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-border/40">
                      <div className="flex items-center gap-2 mb-3">
                        <ShoppingBag className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-semibold text-foreground">
                          Products from your enquiry cart ({getItemCount()})
                        </h3>
                      </div>
                      <div className="space-y-2.5">
                        {items.map((item) => (
                          <div
                            key={item.productId}
                            className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/50"
                            data-testid={`cart-item-${item.productId}`}
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{item.productName}</p>
                              <p className="text-xs text-muted-foreground">{item.category}</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="w-7 h-7 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40 cursor-pointer touch-manipulation"
                                data-testid={`button-qty-minus-${item.productId}`}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-semibold" data-testid={`text-qty-${item.productId}`}>
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="w-7 h-7 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer touch-manipulation"
                                data-testid={`button-qty-plus-${item.productId}`}
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.productId)}
                              className="p-1.5 text-muted-foreground hover:text-destructive transition-colors cursor-pointer touch-manipulation"
                              aria-label={`Remove ${item.productName}`}
                              data-testid={`button-remove-${item.productId}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 sm:p-8"
                >
                  <h2 className="text-lg font-bold text-foreground mb-1" data-testid="heading-step-3">
                    Budget & Timeline
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Give us a rough idea so we can tailor our quote.
                  </p>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-foreground mb-3">Estimated Budget</p>
                    <div className="flex flex-wrap gap-2">
                      {BUDGET_RANGES.map((b) => (
                        <PillOption
                          key={b}
                          selected={budget === b}
                          onClick={() => setBudget(b)}
                          label={b}
                          testId={`pill-budget-${b.replace(/[^a-zA-Z0-9]/g, "-")}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground mb-3">When do you need this?</p>
                    <div className="flex flex-wrap gap-2">
                      {TIMELINE_OPTIONS.map((t) => (
                        <PillOption
                          key={t}
                          selected={timeline === t}
                          onClick={() => setTimeline(t)}
                          label={t}
                          testId={`pill-timeline-${t.replace(/[^a-zA-Z0-9]/g, "-")}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <UserCircle className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-bold text-foreground" data-testid="heading-step-4">
                      Almost done — your contact details
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    We'll use this to send you a customised quote.
                  </p>
                  {user && (
                  <div className="flex items-center gap-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3 mb-5" data-testid="badge-phone-verified-enquiry">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-green-700 dark:text-green-400">Phone verified</p>
                      <p className="text-xs text-green-600 dark:text-green-500">{user.phoneNumber || user.email}</p>
                    </div>
                  </div>
                  )}

                  <div className="mb-6 p-4 rounded-xl bg-muted/30 border border-border/30">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Your selections</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Setup: </span>
                        <span className="font-medium text-foreground">{SETUP_TYPES.find((s) => s.id === setupType)?.label}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Need: </span>
                        <span className="font-medium text-foreground">{ORDER_TYPES.find((o) => o.id === orderType)?.label}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Budget: </span>
                        <span className="font-medium text-foreground">{budget}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timeline: </span>
                        <span className="font-medium text-foreground">{timeline}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Categories: </span>
                        <span className="font-medium text-foreground">{selectedCategories.join(", ")}</span>
                      </div>
                      {items.length > 0 && (
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Cart items: </span>
                          <span className="font-medium text-foreground">{getItemCount()} product{getItemCount() > 1 ? "s" : ""}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="contact-form">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Dr. Jane Smith" className="rounded-xl h-11" data-testid="input-name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="organisation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Organisation / Clinic</FormLabel>
                              <FormControl>
                                <Input placeholder="City Rehab Centre" className="rounded-xl h-11" data-testid="input-org" {...field} value={field.value || ""} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="jane@clinic.com" className="rounded-xl h-11" data-testid="input-email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+91 9876543210" className="rounded-xl h-11" data-testid="input-phone" {...field} value={field.value || ""} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City / Location</FormLabel>
                            <FormControl>
                              <Input placeholder="Mumbai, India" className="rounded-xl h-11" data-testid="input-city" {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Details (optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any special requirements, customisations, room dimensions, or specific product preferences..."
                                className="min-h-[80px] resize-none rounded-xl"
                                data-testid="textarea-message"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        size="lg"
                        disabled={createLead.isPending}
                        className="w-full rounded-full h-12 shadow-lg shadow-primary/20 cursor-pointer touch-manipulation"
                        data-testid="button-submit-enquiry"
                      >
                        {createLead.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" /> Submit Enquiry
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>

            {step < TOTAL_STEPS - 1 && (
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 0}
                  className="gap-2 cursor-pointer touch-manipulation"
                  data-testid="button-prev-step"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed}
                  className="rounded-full gap-2 px-6 cursor-pointer touch-manipulation"
                  data-testid="button-next-step"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {step === TOTAL_STEPS - 1 && (
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <Button
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                  className="gap-2 cursor-pointer touch-manipulation"
                  data-testid="button-prev-step"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
