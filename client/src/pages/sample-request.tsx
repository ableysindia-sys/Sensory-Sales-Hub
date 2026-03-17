import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Stethoscope, GraduationCap, Building2, Home, Hospital, Users,
  ArrowRight, ArrowLeft, CheckCircle2, Package, Loader2,
  CreditCard, MessageCircle, ShieldCheck, RotateCcw, Gift,
  Sparkles, Dumbbell, Eye, Hand, Brain, Clock, Send, FileText, Star,
  Smartphone, Phone,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { PhoneSignupInline } from "@/components/phone-signup-inline";

const DEPOSIT_AMOUNT = 1499;
const TOTAL_STEPS = 6;

const ROLES = [
  { id: "ot-therapist", label: "Occupational Therapist", icon: Stethoscope, desc: "Practising OT in a clinic or hospital" },
  { id: "school-staff", label: "School / SPED Educator", icon: GraduationCap, desc: "Special educator, school OT, or counsellor" },
  { id: "clinic-owner", label: "Clinic / Centre Owner", icon: Building2, desc: "Running or setting up a therapy centre" },
  { id: "hospital-staff", label: "Hospital / Rehab Staff", icon: Hospital, desc: "Rehabilitation or paediatric department" },
  { id: "parent", label: "Parent / Caregiver", icon: Home, desc: "Home-based therapy for a family member" },
  { id: "other", label: "Other Professional", icon: Users, desc: "NGO, researcher, wellness centre, etc." },
];

const SETUP_TYPES = [
  { id: "therapy-centre", label: "OT / Therapy Clinic" },
  { id: "school", label: "School / Institution" },
  { id: "hospital", label: "Hospital / Rehab Centre" },
  { id: "sensory-room", label: "Sensory Room Setup" },
  { id: "home", label: "Home Setup" },
  { id: "other", label: "Other" },
];

const CATEGORIES = [
  { id: "swings", label: "Therapy Swings", icon: Sparkles, desc: "Vestibular & suspension swings" },
  { id: "deep-pressure", label: "Deep Pressure", icon: Hand, desc: "Weighted items, lap pads, blankets" },
  { id: "movement-balance", label: "Movement & Balance", icon: Dumbbell, desc: "Balance boards, wobble cushions" },
  { id: "visual", label: "Visual / Sensory", icon: Eye, desc: "Visual aids and light-up tools" },
  { id: "adl-kit", label: "ADL & Fine Motor", icon: Brain, desc: "Daily living skills, fidgets" },
  { id: "therapy-balls", label: "Therapy Balls", icon: Dumbbell, desc: "Swiss balls, peanut balls" },
  { id: "mats", label: "Mats & Safety", icon: ShieldCheck, desc: "Crash mats, therapy mats" },
  { id: "ballpool", label: "Ball Pool", icon: Sparkles, desc: "Ball pools and sensory bins" },
  { id: "climbing", label: "Climbing", icon: Building2, desc: "Climbing structures and frames" },
];

const SAMPLE_KITS: Record<string, { title: string; items: string[]; image: string }> = {
  "ot-therapist": {
    title: "OT Clinic Starter Kit",
    items: ["Wilbarger Sensory Brush", "Fidget String Set (6 pcs)", "Weighted Lap Pad (3 lbs)", "Therapy Putty (2 colours)", "Tactile Ball Set"],
    image: "🧰",
  },
  "school-staff": {
    title: "Classroom Sensory Kit",
    items: ["Fidget Kit (assorted 4 pcs)", "Weighted Lap Pad (3 lbs)", "Stretchy Sensory Band", "Visual Fidget Cube", "Tactile Finger Massage Rings"],
    image: "🎒",
  },
  "clinic-owner": {
    title: "Centre Assessment Kit",
    items: ["Sensory Brush Set", "Weighted Lap Pad (3 lbs)", "Therapy Putty (3 colours)", "Vestibular Wobble Cushion (mini)", "Fidget Assorted Pack"],
    image: "🏥",
  },
  "hospital-staff": {
    title: "Rehab Assessment Kit",
    items: ["Resistance Band Set (3 levels)", "Sensory Brush", "Therapy Putty (3 colours)", "Grip Strengthener", "Tactile Sensation Tools"],
    image: "💊",
  },
  "parent": {
    title: "Home Therapy Starter",
    items: ["Sensory Brush", "Weighted Lap Pad (3 lbs)", "Fidget String Set", "Chew Tube (safe, BPA-free)", "Visual Sensory Toy"],
    image: "🏠",
  },
  "other": {
    title: "Best-Seller Sampler",
    items: ["Wilbarger Sensory Brush", "Weighted Lap Pad (3 lbs)", "Fidget Kit (4 pcs)", "Therapy Putty (2 colours)", "Tactile Ball Set"],
    image: "⭐",
  },
};

function StepDots({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 justify-center" data-testid="step-dots">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "rounded-full transition-all duration-300",
            i === current ? "w-6 h-2 bg-primary" : i < current ? "w-2 h-2 bg-primary/50" : "w-2 h-2 bg-border"
          )}
        />
      ))}
    </div>
  );
}

function OptionCard({
  selected, onClick, icon: Icon, label, desc, testId,
}: {
  selected: boolean; onClick: () => void; icon: React.ElementType; label: string; desc?: string; testId?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl border text-left w-full transition-all duration-150",
        selected
          ? "border-primary bg-primary/6 ring-2 ring-primary/25 shadow-sm"
          : "border-border bg-card hover:border-primary/40 hover:bg-muted/30"
      )}
    >
      <div className={cn("p-2 rounded-lg shrink-0 mt-0.5", selected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground")}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className={cn("font-semibold text-sm leading-tight", selected ? "text-primary" : "text-foreground")}>{label}</p>
        {desc && <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{desc}</p>}
      </div>
    </button>
  );
}

function CategoryChip({
  selected, onClick, icon: Icon, label, testId,
}: {
  selected: boolean; onClick: () => void; icon: React.ElementType; label: string; testId?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      className={cn(
        "flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150",
        selected
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted/30"
      )}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      {label}
    </button>
  );
}

declare global {
  interface Window {
    Razorpay: new (opts: object) => { open: () => void };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function SampleRequestPage() {
  const { user, openAuthDrawer } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState(0);
  const [role, setRole] = useState("");
  const [setupType, setSetupType] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [city, setCity] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [name, setName] = useState(user?.displayName || "");
  const [phone, setPhone] = useState(
    user?.phoneNumber ? user.phoneNumber.replace(/^\+91/, "") : ""
  );
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [manualPayment, setManualPayment] = useState(false);
  const [sampleRequestId, setSampleRequestId] = useState<number | null>(null);

  const kit = SAMPLE_KITS[role] || SAMPLE_KITS["other"];

  function toggleCategory(id: string) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  useEffect(() => {
    if (user && step === 0) setStep(1);
  }, [user]);

  useEffect(() => {
    if (user) {
      if (user.displayName && !name) setName(user.displayName);
      if (user.email && !email) setEmail(user.email);
      if (user.phoneNumber) {
        const digits = user.phoneNumber.replace(/^\+91/, "").replace(/\D/g, "");
        if (digits.length === 10) setPhone(digits);
      }
    }
  }, [user]);

  function canNext() {
    if (step === 0) return !!user;
    if (step === 1) return !!role;
    if (step === 2) return !!setupType && !!city;
    if (step === 3) return selectedCategories.length > 0;
    if (step === 4) return name.length >= 2 && email.includes("@") && phone.replace(/\D/g, "").length === 10;
    return false;
  }

  async function submitAndPay() {
    setLoading(true);
    try {
      // Step 1: Create sample request record
      const submitRes = await apiRequest("POST", "/api/sample-requests", {
        name,
        email,
        phone: `+91${phone.replace(/\D/g, "")}`,
        city,
        role,
        institutionName: institutionName || undefined,
        setupType,
        categories: selectedCategories.join(","),
        depositAmount: DEPOSIT_AMOUNT,
      });
      const { id } = await submitRes.json() as { id: number };
      setSampleRequestId(id);

      // Step 2: Create Razorpay order
      const orderRes = await apiRequest("POST", "/api/razorpay/create-order", { sampleRequestId: id });
      const orderData = await orderRes.json() as {
        manual?: boolean; message?: string;
        orderId?: string; amount?: number; currency?: string; keyId?: string;
      };

      if (orderData.manual) {
        setManualPayment(true);
        setDone(true);
        return;
      }

      // Step 3: Open Razorpay modal
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Could not load payment gateway");

      await new Promise<void>((resolve, reject) => {
        const rzp = new window.Razorpay({
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Abley's Rehab",
          description: `OT Trial Kit Deposit — Refundable ₹${DEPOSIT_AMOUNT.toLocaleString("en-IN")}`,
          order_id: orderData.orderId,
          prefill: { name, email, contact: `+91${phone.replace(/\D/g, "")}` },
          theme: { color: "#4A53A0" },
          handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
            try {
              await apiRequest("POST", "/api/razorpay/verify", {
                ...response,
                sampleRequestId: id,
              });
              setDone(true);
              resolve();
            } catch {
              reject(new Error("Payment verification failed"));
            }
          },
          modal: {
            ondismiss: () => reject(new Error("Payment cancelled")),
          },
        });
        rzp.open();
      });

    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      if (msg !== "Payment cancelled") {
        toast({ title: "Error", description: msg, variant: "destructive" });
      }
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center"
          >
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3 font-display">
              {manualPayment ? "Kit Requested!" : "Deposit Confirmed!"}
            </h1>
            <p className="text-muted-foreground mb-2 leading-relaxed">
              {manualPayment
                ? `Your OT Trial Kit has been requested. We'll send a ₹${DEPOSIT_AMOUNT.toLocaleString("en-IN")} payment link to your WhatsApp within 2 hours.`
                : `Your ₹${DEPOSIT_AMOUNT.toLocaleString("en-IN")} refundable deposit is confirmed. We'll dispatch your ${kit.title} within 48 hours.`}
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Our OT specialist will reach out on <strong>WhatsApp</strong> to confirm your kit and delivery details.
            </p>

            <div className="bg-muted/40 rounded-2xl border border-border/50 p-5 mb-6 text-left space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Your Kit — {kit.title}</p>
              {kit.items.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </div>
              ))}
              <div className="pt-2 border-t border-border/50">
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <RotateCcw className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary" />
                  Deposit is fully refundable from your first order with Abley's Rehab
                </div>
              </div>
            </div>

            {/* What happens next timeline */}
            <div className="bg-muted/30 rounded-2xl border border-border/50 p-5 mb-6 text-left">
              <p className="text-xs font-bold text-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-primary" /> What Happens Next
              </p>
              <div className="space-y-3">
                {[
                  { day: "Now", icon: CheckCircle2, text: "Your request is confirmed. Our OT specialist has been notified.", color: "text-green-500" },
                  { day: "Day 1", icon: Send, text: "We send a WhatsApp video showing your kit items being used in a real clinic.", color: "text-primary" },
                  { day: "Day 3", icon: MessageCircle, text: "Our OT specialist checks in — answers your questions, explains each item.", color: "text-primary" },
                  { day: "Day 14", icon: FileText, text: "Your personalised bulk quote PDF is ready — valid for 7 days.", color: "text-primary" },
                  { day: "Day 21", icon: Star, text: "Final nudge: reserve your institution's allocation at the quoted price.", color: "text-amber-500" },
                ].map(({ day, icon: Icon, text, color }) => (
                  <div key={day} className="flex items-start gap-3">
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`w-7 h-7 rounded-full bg-muted flex items-center justify-center`}>
                        <Icon className={`w-3.5 h-3.5 ${color}`} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">{day}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/917042180166?text=Hi%2C%20I%20just%20requested%20a%20sample%20kit%20from%20Abley's%20Rehab%21"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow hover:bg-[#22c15e] transition-colors"
                data-testid="link-whatsapp-success"
              >
                <MessageCircle className="w-4 h-4" /> Chat with our OT Specialist
              </a>
              <a
                href="/api/catalog"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-primary/40 text-primary bg-primary/5 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/10 transition-colors"
                data-testid="link-download-catalogue-success"
              >
                <FileText className="w-4 h-4" /> Download Catalogue PDF
              </a>
              <Link
                href="/products"
                className="flex items-center justify-center gap-2 border border-border px-5 py-2.5 rounded-full text-sm font-medium hover:bg-muted/40 transition-colors"
                data-testid="link-browse-products-success"
              >
                Browse Products <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary via-primary/90 to-[#3a4280] text-white pt-24 pb-10 px-4 sm:px-6 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/15 text-xs font-semibold tracking-widest uppercase">
            <Gift className="w-3.5 h-3.5" /> OT Trial Kit Programme
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-xs font-semibold text-amber-300">
            <Clock className="w-3 h-3" /> Q2 2026 — 43 of 50 kits remaining
          </div>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-display mb-3">
          Try Before You Buy — ₹{DEPOSIT_AMOUNT.toLocaleString("en-IN")} Deposit
        </h1>
        <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          We curate a personalised 5-item sample kit for your clinic or school.
          Pay a fully refundable deposit — credited back on your first order.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 mt-5 text-xs text-white/60">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-white/40" /> OT-curated items</span>
          <span className="flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5 text-white/40" /> 100% refundable</span>
          <span className="flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5 text-white/40" /> Dispatched in 48 hrs</span>
        </div>
        <div className="mt-5">
          <a
            href="/api/catalog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/25 text-white/80 hover:bg-white/20 hover:text-white text-xs font-semibold transition-colors"
            data-testid="link-download-catalogue-hero"
          >
            <FileText className="w-3.5 h-3.5" /> Download Full Product Catalogue (PDF)
          </a>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full py-10">

        {/* Step dots */}
        <div className="mb-8">
          <StepDots current={step} />
          <p className="text-center text-xs text-muted-foreground mt-2">
            Step {step + 1} of {TOTAL_STEPS}
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
          <AnimatePresence mode="wait">

            {/* ── Step 0: Sign In ── */}
            {step === 0 && (
              <motion.div key="s-signin" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.22 }} className="p-6 sm:p-8 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Smartphone className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-lg font-bold mb-1" data-testid="heading-step-signin">Verify your mobile number</h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                  We'll send a one-time OTP to your phone. Your verified number is used to dispatch the kit and for WhatsApp follow-up.
                </p>
                <div className="w-full max-w-sm">
                  <PhoneSignupInline
                    variant="light"
                    label=""
                    sublabel=""
                    containerId="recaptcha-sample"
                  />
                </div>
              </motion.div>
            )}

            {/* ── Step 1: Role ── */}
            {step === 1 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.22 }} className="p-6 sm:p-8">
                <h2 className="text-lg font-bold mb-1" data-testid="heading-step-0">What best describes you?</h2>
                <p className="text-sm text-muted-foreground mb-6">We'll tailor your sample kit to your setting.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {ROLES.map((r) => (
                    <OptionCard key={r.id} selected={role === r.id} onClick={() => setRole(r.id)} icon={r.icon} label={r.label} desc={r.desc} testId={`option-role-${r.id}`} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Setup + City ── */}
            {step === 2 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.22 }} className="p-6 sm:p-8">
                <h2 className="text-lg font-bold mb-1" data-testid="heading-step-1">Tell us about your setup</h2>
                <p className="text-sm text-muted-foreground mb-6">Helps us choose equipment matched to your environment.</p>

                <div className="grid sm:grid-cols-2 gap-2 mb-6">
                  {SETUP_TYPES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSetupType(s.id)}
                      data-testid={`option-setup-${s.id}`}
                      className={cn(
                        "text-sm px-4 py-3 rounded-xl border font-medium text-left transition-all duration-150",
                        setupType === s.id
                          ? "border-primary bg-primary/6 text-primary ring-2 ring-primary/25"
                          : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted/30"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="institution">Institution / Clinic name (optional)</Label>
                    <Input id="institution" placeholder="City Rehab Centre" value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} className="mt-1.5" data-testid="input-institution" />
                  </div>
                  <div>
                    <Label htmlFor="city">City <span className="text-destructive">*</span></Label>
                    <Input id="city" placeholder="Mumbai, India" value={city} onChange={(e) => setCity(e.target.value)} className="mt-1.5" data-testid="input-city" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Categories ── */}
            {step === 3 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.22 }} className="p-6 sm:p-8">
                <h2 className="text-lg font-bold mb-1" data-testid="heading-step-2">Which categories interest you?</h2>
                <p className="text-sm text-muted-foreground mb-6">Select all that apply — we'll include relevant samples.</p>
                <div className="flex flex-wrap gap-2.5">
                  {CATEGORIES.map((c) => (
                    <CategoryChip
                      key={c.id}
                      selected={selectedCategories.includes(c.id)}
                      onClick={() => toggleCategory(c.id)}
                      icon={c.icon}
                      label={c.label}
                      testId={`chip-cat-${c.id}`}
                    />
                  ))}
                </div>
                {selectedCategories.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-4">
                    {selectedCategories.length} selected — we'll try to include items from each category where possible.
                  </p>
                )}
              </motion.div>
            )}

            {/* ── Step 3: Phone verification + Contact details ── */}
            {step === 4 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.22 }} className="p-6 sm:p-8">
                <h2 className="text-lg font-bold mb-1" data-testid="heading-step-3">Your contact details</h2>
                <p className="text-sm text-muted-foreground mb-5">We'll use these to dispatch your kit and follow up on WhatsApp.</p>
                {user?.phoneNumber && (
                  <div className="flex items-center gap-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3 mb-5" data-testid="badge-phone-verified">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-green-700 dark:text-green-400">Mobile number verified</p>
                      <p className="text-xs text-green-600 dark:text-green-500">{user.phoneNumber}</p>
                    </div>
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full name <span className="text-destructive">*</span></Label>
                    <Input id="name" placeholder="Dr. Priya Sharma" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" data-testid="input-name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email address <span className="text-destructive">*</span></Label>
                    <Input id="email" type="email" placeholder="priya@clinic.co.in" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" data-testid="input-email" />
                  </div>
                  <div>
                    <Label htmlFor="phone">
                      WhatsApp / Mobile number <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex mt-1.5">
                      <span className="flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm text-muted-foreground select-none">+91</span>
                      <Input
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        placeholder="98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className="rounded-l-none"
                        maxLength={10}
                        data-testid="input-phone"
                      />
                    </div>
                    {phone.replace(/\D/g, "").length > 0 && phone.replace(/\D/g, "").length !== 10 && (
                      <p className="text-xs text-destructive mt-1">Please enter a valid 10-digit mobile number</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Step 4: Kit preview + Pay ── */}
            {step === 5 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.22 }} className="p-6 sm:p-8">
                <h2 className="text-lg font-bold mb-1" data-testid="heading-step-4">Your personalised sample kit</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Based on your role and interests, we've curated the following kit for you.
                </p>

                {/* Kit card */}
                <div className="bg-gradient-to-br from-primary/6 to-primary/2 border border-primary/20 rounded-2xl p-5 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{kit.image}</div>
                    <div>
                      <p className="font-bold text-foreground">{kit.title}</p>
                      <p className="text-xs text-muted-foreground">5-item curated sample</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {kit.items.map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deposit section */}
                <div className="bg-card border border-border rounded-2xl p-5 mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold text-foreground text-lg">₹{DEPOSIT_AMOUNT.toLocaleString("en-IN")}</p>
                      <p className="text-xs text-muted-foreground">Refundable deposit</p>
                    </div>
                    <Package className="w-8 h-8 text-primary/60" />
                  </div>
                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2"><RotateCcw className="w-3.5 h-3.5 text-primary shrink-0" /> 100% refundable — deducted from your first order</div>
                    <div className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" /> Secure payment via Razorpay</div>
                    <div className="flex items-center gap-2"><MessageCircle className="w-3.5 h-3.5 text-primary shrink-0" /> Kit dispatched within 48 hours of payment</div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-muted/30 rounded-xl p-4 text-xs text-muted-foreground space-y-1 mb-5">
                  <p><span className="font-medium text-foreground">Role:</span> {ROLES.find((r) => r.id === role)?.label}</p>
                  <p><span className="font-medium text-foreground">Setup:</span> {SETUP_TYPES.find((s) => s.id === setupType)?.label}{institutionName ? ` — ${institutionName}` : ""}</p>
                  <p><span className="font-medium text-foreground">City:</span> {city}</p>
                  <p><span className="font-medium text-foreground">Interests:</span> {selectedCategories.map((id) => CATEGORIES.find((c) => c.id === id)?.label).join(", ")}</p>
                  <p><span className="font-medium text-foreground">Deliver to:</span> {name} · +91{phone} · {email}</p>
                </div>

                <Button
                  size="lg"
                  className="w-full h-12 rounded-xl text-base font-semibold gap-2"
                  onClick={submitAndPay}
                  disabled={loading}
                  data-testid="button-pay-deposit"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                  ) : (
                    <><CreditCard className="w-4 h-4" /> Pay ₹{DEPOSIT_AMOUNT.toLocaleString("en-IN")} Deposit</>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  By proceeding you agree to our refund policy. Deposit is credited from your first Abley's order.
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Nav buttons */}
        {step < TOTAL_STEPS - 1 && (
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="gap-1.5"
              data-testid="button-prev-step"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext()}
              className="gap-1.5 px-6"
              data-testid="button-next-step"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
        {step === TOTAL_STEPS - 1 && (
          <div className="flex items-center justify-start mt-6">
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)} className="gap-1.5" data-testid="button-back-to-contact">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          </div>
        )}

      </div>

      <SiteFooter />
    </div>
  );
}
