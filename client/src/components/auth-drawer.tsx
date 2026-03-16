import { useState, useRef, useEffect } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  ConfirmationResult,
} from "firebase/auth";
import { useAuth } from "@/lib/auth-context";
import { auth as firebaseAuth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Phone,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  ShoppingCart,
  Building2,
  Package,
} from "lucide-react";
import { SiGoogle, SiApple } from "react-icons/si";
import logoPath from "@assets/ableys_rehab_logo.png";

type Step = "method" | "otp" | "success";

const BENEFITS = [
  { icon: ShoppingCart, label: "Saved Cart" },
  { icon: Building2,    label: "B2B Pricing" },
  { icon: Package,      label: "Order History" },
];

/* ─── 6-digit OTP input ─────────────────────────────────────────────────── */
function OtpInput({
  value,
  onChange,
  onComplete,
}: {
  value: string;
  onChange: (v: string) => void;
  onComplete: () => void;
}) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.split("").concat(Array(6).fill("")).slice(0, 6);

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const handleChange = (i: number, raw: string) => {
    const d = raw.replace(/\D/g, "").slice(-1);
    const next = digits.map((v, idx) => (idx === i ? d : v)).join("").slice(0, 6);
    onChange(next);
    if (d && i < 5) inputs.current[i + 1]?.focus();
    else if (next.length === 6) onComplete();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted);
    if (pasted.length === 6) { inputs.current[5]?.focus(); onComplete(); }
  };

  return (
    <div className="flex gap-2.5 justify-center" onPaste={handlePaste}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => { inputs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          className="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 bg-background transition-all focus:outline-none"
          style={{
            borderColor: d ? "hsl(var(--primary))" : "hsl(var(--border))",
            boxShadow: d ? "0 0 0 3px hsl(var(--primary) / 0.12)" : undefined,
          }}
          data-testid={`otp-digit-${i}`}
          autoFocus={i === 0}
        />
      ))}
    </div>
  );
}

/* ─── Auth Drawer ────────────────────────────────────────────────────────── */
export function AuthDrawer() {
  const {
    isAuthDrawerOpen,
    setIsAuthDrawerOpen,
    authSuccessCallback,
    pendingConfirmation,
    setPendingConfirmation,
    pendingPhone,
    setPendingPhone,
  } = useAuth();

  const [step, setStep]             = useState<Step>("method");
  const [phone, setPhone]           = useState("");
  const [otp, setOtp]               = useState("");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [confirmResult, setConfirmResult] = useState<ConfirmationResult | null>(null);
  const [resendTimer, setResendTimer]     = useState(0);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  /* ── Countdown for resend OTP ── */
  useEffect(() => {
    if (step === "otp") setResendTimer(30);
  }, [step]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  /* ── Resume from pending confirmation ── */
  useEffect(() => {
    if (isAuthDrawerOpen && pendingConfirmation) {
      setConfirmResult(pendingConfirmation);
      setPhone(pendingPhone);
      setStep("otp");
      setPendingConfirmation(null);
      setPendingPhone("");
    }
  }, [isAuthDrawerOpen, pendingConfirmation]);

  /* ── Reset on close ── */
  useEffect(() => {
    if (!isAuthDrawerOpen) {
      setTimeout(() => {
        setStep("method");
        setPhone("");
        setOtp("");
        setError("");
        setConfirmResult(null);
        setResendTimer(0);
        if (recaptchaRef.current) {
          recaptchaRef.current.clear();
          recaptchaRef.current = null;
        }
      }, 400);
    }
  }, [isAuthDrawerOpen]);

  /* ── Handlers ── */
  const sendOtp = async () => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length !== 10) { setError("Enter a valid 10-digit mobile number."); return; }
    setError("");
    setLoading(true);
    try {
      if (recaptchaRef.current) { recaptchaRef.current.clear(); recaptchaRef.current = null; }
      const container = document.getElementById("recaptcha-container");
      if (!container) throw new Error("reCAPTCHA container not found");
      const verifier = new RecaptchaVerifier(firebaseAuth, "recaptcha-container", { size: "invisible" });
      recaptchaRef.current = verifier;
      const result = await signInWithPhoneNumber(firebaseAuth, `+91${cleaned}`, verifier);
      setConfirmResult(result);
      setStep("otp");
    } catch (err: any) {
      setError(
        err?.message?.includes("TOO_SHORT") || err?.message?.includes("INVALID")
          ? "Invalid phone number. Please check and try again."
          : err?.message?.includes("QUOTA_EXCEEDED")
          ? "Too many attempts. Please try again later."
          : "Failed to send OTP. Please try again."
      );
      if (recaptchaRef.current) { recaptchaRef.current.clear(); recaptchaRef.current = null; }
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6 || !confirmResult) return;
    setError("");
    setLoading(true);
    try {
      await confirmResult.confirm(otp);
      setStep("success");
      setTimeout(() => { setIsAuthDrawerOpen(false); authSuccessCallback?.(); }, 2000);
    } catch {
      setError("Incorrect OTP. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  const signInWithProvider = async (providerName: "google" | "apple") => {
    setError("");
    setLoading(true);
    try {
      const provider = providerName === "google"
        ? new GoogleAuthProvider()
        : new OAuthProvider("apple.com");
      await signInWithPopup(firebaseAuth, provider);
      setStep("success");
      setTimeout(() => { setIsAuthDrawerOpen(false); authSuccessCallback?.(); }, 2000);
    } catch (err: any) {
      if (err.code !== "auth/popup-closed-by-user") setError("Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => { setStep("method"); setOtp(""); setError(""); };

  const formattedPhone = phone.replace(/\D/g, "").replace(/(\d{5})(\d{5})/, "$1 $2");

  /* ── Render ── */
  return (
    <>
      <div id="recaptcha-container" className="hidden" />

      <Sheet open={isAuthDrawerOpen} onOpenChange={setIsAuthDrawerOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-3xl px-0 pb-0 max-h-[96dvh] sm:max-w-md sm:mx-auto sm:rounded-3xl sm:left-1/2 sm:-translate-x-1/2 sm:bottom-4 overflow-hidden"
        >
          {/* Accessibility labels (visually hidden) */}
          <SheetTitle className="sr-only">Sign in to Abley's Rehab</SheetTitle>
          <SheetDescription className="sr-only">Sign in with your mobile number, Google, or Apple to access your account.</SheetDescription>

          <div className="overflow-y-auto max-h-[96dvh]">

            {/* ── Success step ──────────────────────────────────── */}
            {step === "success" && (
              <div className="flex flex-col items-center gap-5 px-8 py-16 text-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-200 dark:border-emerald-800 animate-ping opacity-30" />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-foreground">You're signed in!</p>
                  <p className="text-sm text-muted-foreground">
                    Your details are saved for future orders.
                  </p>
                </div>
              </div>
            )}

            {/* ── OTP step ─────────────────────────────────────── */}
            {step === "otp" && (
              <div className="px-6 pt-5 pb-8 space-y-6">
                <button
                  onClick={goBack}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="button-auth-back"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <div className="text-center space-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-lg font-bold text-foreground">Enter verification code</p>
                  <p className="text-sm text-muted-foreground">
                    We sent a 6-digit code to{" "}
                    <span className="font-semibold text-primary">+91 {formattedPhone}</span>
                  </p>
                </div>

                <OtpInput value={otp} onChange={setOtp} onComplete={verifyOtp} />

                {error && (
                  <p className="text-sm text-destructive text-center font-medium">{error}</p>
                )}

                <Button
                  className="w-full rounded-full h-12 text-base font-semibold gap-2"
                  onClick={verifyOtp}
                  disabled={otp.length !== 6 || loading}
                  data-testid="button-verify-otp"
                >
                  {loading
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : "Verify & Sign In"
                  }
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  {resendTimer > 0 ? (
                    <>Resend code in <span className="font-semibold text-foreground tabular-nums">{resendTimer}s</span></>
                  ) : (
                    <>
                      Didn't receive it?{" "}
                      <button
                        className="text-primary font-semibold hover:underline"
                        onClick={() => { setOtp(""); setError(""); setStep("method"); }}
                      >
                        Resend OTP
                      </button>
                    </>
                  )}
                </p>
              </div>
            )}

            {/* ── Method step ───────────────────────────────────── */}
            {step === "method" && (
              <div className="px-6 pt-8 pb-8 space-y-5">

                {/* Logo + headline */}
                <div className="text-center space-y-2">
                  <img
                    src={logoPath}
                    alt="Abley's Rehab"
                    className="h-8 object-contain mx-auto mb-3"
                  />
                  <h2 className="text-xl font-bold text-foreground">Welcome to Abley's Rehab</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Sign in to manage your orders, access B2B pricing, and save your cart.
                  </p>
                </div>

                {/* Benefit chips */}
                <div className="flex gap-2 justify-center flex-wrap">
                  {BENEFITS.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15"
                    >
                      <Icon className="w-3 h-3 text-primary" />
                      <span className="text-xs font-semibold text-primary">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Phone input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Mobile Number
                  </label>
                  <div className="flex items-center border border-input rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-0 bg-background transition-shadow">
                    <div className="flex items-center gap-1.5 px-3 py-3 bg-muted text-sm font-semibold text-foreground border-r border-input shrink-0 select-none">
                      🇮🇳 <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="flex-1 px-3 py-3 text-base tracking-wider bg-transparent outline-none placeholder:text-muted-foreground"
                      data-testid="input-phone-number"
                      onKeyDown={(e) => e.key === "Enter" && sendOtp()}
                    />
                  </div>
                  {error && (
                    <p className="text-xs text-destructive font-medium">{error}</p>
                  )}
                </div>

                {/* Primary CTA */}
                <Button
                  className="w-full rounded-full h-12 text-base font-semibold gap-2"
                  onClick={sendOtp}
                  disabled={phone.replace(/\D/g, "").length !== 10 || loading}
                  data-testid="button-send-otp"
                >
                  {loading
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <><Phone className="w-4 h-4" /> Send OTP</>
                  }
                </Button>

                {/* Divider */}
                <div className="relative flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground font-medium">or continue with</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Social buttons — full width stacked */}
                <div className="space-y-2.5">
                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-full font-medium text-sm gap-3 border-border/60 hover:border-border"
                    onClick={() => signInWithProvider("google")}
                    disabled={loading}
                    data-testid="button-google-signin"
                  >
                    <SiGoogle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className="flex-1 text-center">Continue with Google</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-full font-medium text-sm gap-3 border-border/60 hover:border-border"
                    onClick={() => signInWithProvider("apple")}
                    disabled={loading}
                    data-testid="button-apple-signin"
                  >
                    <SiApple className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1 text-center">Continue with Apple</span>
                  </Button>
                </div>

                {/* T&C */}
                <p className="text-center text-xs text-muted-foreground leading-relaxed">
                  By continuing, you agree to Abley's{" "}
                  <span className="text-primary font-medium underline cursor-pointer">Terms of Service</span>
                  {" "}and{" "}
                  <span className="text-primary font-medium underline cursor-pointer">Privacy Policy</span>.
                </p>

              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
