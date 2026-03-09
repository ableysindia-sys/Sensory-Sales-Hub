import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/lib/product-provider";
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
  Dumbbell,
  Sparkles,
  Package,
  Wrench,
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronRight,
  Loader2,
  Send,
  CheckCircle2,
  UserCircle,
  Clock,
  FileText,
  Phone,
} from "lucide-react";
import type { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

type EnquiryFormValues = z.infer<typeof api.leads.create.input>;

const SETUP_TYPES = [
  { id: "therapy-centre", label: "Therapy Centre / Clinic", icon: Hospital, desc: "OT clinics, rehab facilities" },
  { id: "school", label: "School / Institution", icon: GraduationCap, desc: "Special education schools" },
  { id: "sensory-room", label: "Sensory Room Setup", icon: Sparkles, desc: "Complete sensory room design" },
  { id: "home-setup", label: "Home Setup", icon: Home, desc: "Home-based therapy corner" },
  { id: "gym-fitness", label: "Gym / Fitness Centre", icon: Dumbbell, desc: "Rehab gyms, training centres" },
  { id: "other", label: "Other / Custom", icon: Building2, desc: "Something else entirely" },
];

const ORDER_TYPES = [
  { id: "bulk-order", label: "Bulk Order", icon: Package, desc: "Large quantities of specific products" },
  { id: "new-setup", label: "New Centre Setup", icon: Building2, desc: "Setting up a new facility" },
  { id: "customization", label: "Custom Equipment", icon: Wrench, desc: "Modified or custom-built tools" },
  { id: "replenish", label: "Replenish / Reorder", icon: ShoppingBag, desc: "Restocking existing equipment" },
];

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

const TOTAL_STEPS = 5;

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2" data-testid="home-step-indicator">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-1.5 sm:gap-2">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i < current
                ? "bg-primary text-primary-foreground"
                : i === current
                ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                : "bg-muted text-muted-foreground"
            }`}
            data-testid={`home-step-dot-${i}`}
          >
            {i < current ? <Check className="w-3.5 h-3.5" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`w-4 sm:w-8 h-0.5 rounded ${i < current ? "bg-primary" : "bg-muted"}`} />
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
      className={`w-full text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer touch-manipulation group ${
        selected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border/50 hover:border-primary/30 hover:bg-muted/30"
      }`}
      data-testid={testId}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
            selected ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
          }`}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-semibold ${selected ? "text-primary" : "text-foreground"}`}>{label}</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{desc}</p>
        </div>
        {selected && (
          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
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
      className={`px-3.5 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer touch-manipulation ${
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
      className="flex items-center gap-3 p-2.5 rounded-xl border border-border/50 cursor-pointer hover:bg-muted/30 transition-all touch-manipulation group"
      data-testid={testId}
    >
      <span
        className={`w-4.5 h-4.5 rounded border-[1.5px] flex items-center justify-center flex-shrink-0 transition-all ${
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

export function BulkEnquiryForm() {
  const { categories } = useProducts();
  const { toast } = useToast();
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
      name: "",
      email: "",
      organisation: "",
      phone: "",
      city: "",
      category: "",
      requirementType: "",
      interest: "",
      message: "",
      cartItems: "",
    },
  });

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const canProceed = useMemo(() => {
    switch (step) {
      case 0: return !!setupType;
      case 1: return !!orderType;
      case 2: return selectedCategories.length > 0;
      case 3: return !!budget && !!timeline;
      case 4: return true;
      default: return false;
    }
  }, [step, setupType, orderType, selectedCategories, budget, timeline]);

  const onSubmit = async (data: EnquiryFormValues) => {
    const setupLabel = SETUP_TYPES.find((s) => s.id === setupType)?.label || setupType;
    const orderLabel = ORDER_TYPES.find((o) => o.id === orderType)?.label || orderType;

    const fullMessage = [
      `Setup Type: ${setupLabel}`,
      `Order Type: ${orderLabel}`,
      `Categories: ${selectedCategories.join(", ")}`,
      `Budget: ${budget}`,
      `Timeline: ${timeline}`,
      data.message ? `\nAdditional Details:\n${data.message}` : "",
    ].filter(Boolean).join("\n");

    try {
      await createLead.mutateAsync({
        ...data,
        category: selectedCategories.join(", "),
        requirementType: orderLabel,
        interest: setupLabel,
        message: fullMessage,
        cartItems: "",
      });
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="enquiry" className="py-20 sm:py-28" data-testid="section-enquiry">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">For Clinics & Institutions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-5 font-display" data-testid="heading-enquiry">
              Bulk Orders & Custom Setups
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10" data-testid="text-enquiry-desc">
              Whether you're setting up a rehab centre, sensory gym, or institutional program — tell us your requirements and we'll prepare a custom quote.
            </p>

            <div className="space-y-5 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/[0.06] border border-primary/[0.1] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Response within 24 hours</p>
                  <p className="text-xs text-muted-foreground">Our team reviews every enquiry personally</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/[0.06] border border-primary/[0.1] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Custom quotes for institutions</p>
                  <p className="text-xs text-muted-foreground">Tailored pricing for your requirements</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/[0.06] border border-primary/[0.1] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Dedicated support</p>
                  <p className="text-xs text-muted-foreground">Speak directly with our product specialists</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="bg-card rounded-2xl border border-border/50 p-8 sm:p-10 shadow-sm text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-500/10 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground mb-2" data-testid="heading-enquiry-success">
                  Enquiry Submitted!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our team will review your requirements and respond within <strong className="text-foreground">24 hours</strong>.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/products">
                    <Button className="rounded-none gap-2" data-testid="button-browse-after-submit">
                      Browse Products <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 flex justify-center border-b border-border/30">
                  <StepIndicator current={step} total={TOTAL_STEPS} />
                </div>

                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="home-step-0"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.25 }}
                      className="p-6 sm:p-8"
                    >
                      <h3 className="text-base font-bold text-foreground mb-1" data-testid="home-heading-step-0">
                        What type of setup is this for?
                      </h3>
                      <p className="text-sm text-muted-foreground mb-5">
                        This helps us understand the scale and equipment you need.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {SETUP_TYPES.map((s) => (
                          <OptionCard
                            key={s.id}
                            selected={setupType === s.id}
                            onClick={() => setSetupType(s.id)}
                            icon={s.icon}
                            label={s.label}
                            desc={s.desc}
                            testId={`home-option-setup-${s.id}`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      key="home-step-1"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.25 }}
                      className="p-6 sm:p-8"
                    >
                      <h3 className="text-base font-bold text-foreground mb-1" data-testid="home-heading-step-1">
                        What do you need from us?
                      </h3>
                      <p className="text-sm text-muted-foreground mb-5">
                        Tell us the nature of your requirement.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {ORDER_TYPES.map((o) => (
                          <OptionCard
                            key={o.id}
                            selected={orderType === o.id}
                            onClick={() => setOrderType(o.id)}
                            icon={o.icon}
                            label={o.label}
                            desc={o.desc}
                            testId={`home-option-order-${o.id}`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="home-step-2"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.25 }}
                      className="p-6 sm:p-8"
                    >
                      <h3 className="text-base font-bold text-foreground mb-1" data-testid="home-heading-step-2">
                        Which product categories interest you?
                      </h3>
                      <p className="text-sm text-muted-foreground mb-5">
                        Select all that apply.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {categories.map((cat) => (
                          <CategoryCheckbox
                            key={cat.slug}
                            label={cat.title}
                            checked={selectedCategories.includes(cat.title)}
                            onChange={() => toggleCategory(cat.title)}
                            testId={`home-check-category-${cat.slug}`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="home-step-3"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.25 }}
                      className="p-6 sm:p-8"
                    >
                      <h3 className="text-base font-bold text-foreground mb-1" data-testid="home-heading-step-3">
                        Budget & Timeline
                      </h3>
                      <p className="text-sm text-muted-foreground mb-5">
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
                              testId={`home-pill-budget-${b.replace(/[^a-zA-Z0-9]/g, "-")}`}
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
                              testId={`home-pill-timeline-${t.replace(/[^a-zA-Z0-9]/g, "-")}`}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="home-step-4"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.25 }}
                      className="p-6 sm:p-8"
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <UserCircle className="w-5 h-5 text-primary" />
                        <h3 className="text-base font-bold text-foreground" data-testid="home-heading-step-4">
                          Almost done — your contact details
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-5">
                        We'll use this to send you a customised quote.
                      </p>

                      <div className="mb-5 p-3.5 rounded-xl bg-muted/30 border border-border/30">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Your selections</p>
                        <div className="grid grid-cols-2 gap-1.5 text-sm">
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
                        </div>
                      </div>

                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="home-contact-form">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Dr. Jane Smith" className="rounded-xl h-10" data-testid="home-input-name" {...field} />
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
                                    <Input placeholder="City Rehab Centre" className="rounded-xl h-10" data-testid="home-input-org" {...field} value={field.value || ""} />
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
                                    <Input type="email" placeholder="jane@clinic.com" className="rounded-xl h-10" data-testid="home-input-email" {...field} />
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
                                    <Input type="tel" placeholder="+91 9876543210" className="rounded-xl h-10" data-testid="home-input-phone" {...field} value={field.value || ""} />
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
                                  <Input placeholder="Mumbai, India" className="rounded-xl h-10" data-testid="home-input-city" {...field} value={field.value || ""} />
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
                                    placeholder="Any special requirements, room dimensions, or preferences..."
                                    className="min-h-[70px] resize-none rounded-xl"
                                    data-testid="home-textarea-message"
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
                            className="w-full rounded-none h-12 shadow-lg shadow-primary/20"
                            data-testid="home-button-submit-enquiry"
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
                      className="gap-2"
                      data-testid="home-button-prev-step"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </Button>
                    <Button
                      onClick={() => setStep(step + 1)}
                      disabled={!canProceed}
                      className="rounded-none gap-2 px-6"
                      data-testid="home-button-next-step"
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
                      className="gap-2"
                      data-testid="home-button-prev-step"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </Button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
