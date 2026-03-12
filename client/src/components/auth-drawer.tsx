import { useState, useRef, useEffect } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  ConfirmationResult,
} from "firebase/auth";
import { useAuth } from "@/lib/auth-context";
import { auth as firebaseAuth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Phone, ArrowLeft, Loader2, CheckCircle2, X } from "lucide-react";
import { SiGoogle, SiFacebook } from "react-icons/si";
import logoPath from "@assets/ableys_rehab_logo.png";

type Step = "method" | "otp" | "success";

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
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handleChange = (i: number, raw: string) => {
    const d = raw.replace(/\D/g, "").slice(-1);
    const next = digits.map((v, idx) => (idx === i ? d : v)).join("").slice(0, 6);
    onChange(next);
    if (d && i < 5) {
      inputs.current[i + 1]?.focus();
    } else if (next.length === 6) {
      onComplete();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted);
    if (pasted.length === 6) {
      inputs.current[5]?.focus();
      onComplete();
    }
  };

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
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
          className="w-11 h-14 text-center text-xl font-bold rounded-xl border-2 bg-background focus:border-primary focus:outline-none transition-colors"
          style={{ borderColor: d ? "hsl(var(--primary))" : undefined }}
          data-testid={`otp-digit-${i}`}
          autoFocus={i === 0}
        />
      ))}
    </div>
  );
}

export function AuthDrawer() {
  const { isAuthDrawerOpen, setIsAuthDrawerOpen, authSuccessCallback } = useAuth();
  const [step, setStep] = useState<Step>("method");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmResult, setConfirmResult] = useState<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (!isAuthDrawerOpen) {
      setTimeout(() => {
        setStep("method");
        setPhone("");
        setOtp("");
        setError("");
        setConfirmResult(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.clear();
          recaptchaRef.current = null;
        }
      }, 400);
    }
  }, [isAuthDrawerOpen]);

  const sendOtp = async () => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length !== 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      if (recaptchaRef.current) {
        recaptchaRef.current.clear();
        recaptchaRef.current = null;
      }
      const container = document.getElementById("recaptcha-container");
      if (!container) throw new Error("reCAPTCHA container not found");
      const verifier = new RecaptchaVerifier(firebaseAuth, "recaptcha-container", {
        size: "invisible",
      });
      recaptchaRef.current = verifier;
      const result = await signInWithPhoneNumber(firebaseAuth, `+91${cleaned}`, verifier);
      setConfirmResult(result);
      setStep("otp");
    } catch (err: any) {
      console.error("Phone OTP error:", err);
      setError(err?.message?.includes("TOO_SHORT") || err?.message?.includes("INVALID")
        ? "Invalid phone number. Please check and try again."
        : err?.message?.includes("QUOTA_EXCEEDED")
        ? "Too many attempts. Please try again later."
        : "Failed to send OTP. Please try again.");
      if (recaptchaRef.current) {
        recaptchaRef.current.clear();
        recaptchaRef.current = null;
      }
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
      setTimeout(() => {
        setIsAuthDrawerOpen(false);
        authSuccessCallback?.();
      }, 1800);
    } catch (err: any) {
      setError("Incorrect OTP. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  const signInWithProvider = async (providerName: "google" | "facebook") => {
    setError("");
    setLoading(true);
    try {
      const provider = providerName === "google"
        ? new GoogleAuthProvider()
        : new FacebookAuthProvider();
      await signInWithPopup(firebaseAuth, provider);
      setStep("success");
      setTimeout(() => {
        setIsAuthDrawerOpen(false);
        authSuccessCallback?.();
      }, 1800);
    } catch (err: any) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="recaptcha-container" className="hidden" />

      <Sheet open={isAuthDrawerOpen} onOpenChange={setIsAuthDrawerOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl px-0 pb-0 max-h-[96dvh] sm:max-w-md sm:mx-auto sm:rounded-2xl sm:left-1/2 sm:-translate-x-1/2 sm:bottom-4">
          <SheetHeader className="px-6 pt-2 pb-4 border-b">
            <SheetTitle className="flex items-center gap-3">
              <img src={logoPath} alt="Abley's Rehab" className="h-7 object-contain" />
              <span className="text-base font-semibold">Sign in</span>
            </SheetTitle>
          </SheetHeader>

          <div className="px-6 py-6 overflow-y-auto">
            {step === "success" ? (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-950/30 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">You're signed in!</p>
                  <p className="text-sm text-muted-foreground mt-1">Your details will be saved for future visits.</p>
                </div>
              </div>
            ) : step === "otp" ? (
              <div className="space-y-5">
                <button
                  onClick={() => { setStep("method"); setOtp(""); setError(""); }}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="button-auth-back"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div className="text-center">
                  <p className="font-semibold text-foreground">Enter the code we sent to</p>
                  <p className="text-primary font-bold text-lg">+91 {phone.replace(/\D/g, "").replace(/(\d{5})(\d{5})/, "$1 $2")}</p>
                </div>
                <OtpInput value={otp} onChange={setOtp} onComplete={verifyOtp} />
                {error && <p className="text-sm text-destructive text-center">{error}</p>}
                <Button
                  className="w-full rounded-full h-12 text-base font-semibold"
                  onClick={verifyOtp}
                  disabled={otp.length !== 6 || loading}
                  data-testid="button-verify-otp"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify OTP"}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Didn't receive?{" "}
                  <button
                    className="text-primary underline"
                    onClick={() => { setStep("method"); setOtp(""); setError(""); }}
                  >
                    Try again
                  </button>
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-medium text-foreground mb-1.5">Mobile number</p>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 px-3 bg-muted rounded-lg border text-sm font-semibold text-foreground shrink-0">
                      🇮🇳 +91
                    </div>
                    <Input
                      type="tel"
                      inputMode="numeric"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="h-11 rounded-lg text-base tracking-wider"
                      data-testid="input-phone-number"
                      onKeyDown={(e) => e.key === "Enter" && sendOtp()}
                    />
                  </div>
                  {error && <p className="text-xs text-destructive mt-1.5">{error}</p>}
                </div>

                <Button
                  className="w-full rounded-full h-12 text-base font-semibold gap-2"
                  onClick={sendOtp}
                  disabled={phone.replace(/\D/g, "").length !== 10 || loading}
                  data-testid="button-send-otp"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <><Phone className="w-4 h-4" /> Send OTP</>
                  )}
                </Button>

                <div className="relative flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground font-medium">or continue with</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-11 gap-2 rounded-xl font-medium"
                    onClick={() => signInWithProvider("google")}
                    disabled={loading}
                    data-testid="button-google-signin"
                  >
                    <SiGoogle className="w-4 h-4 text-red-500" />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 gap-2 rounded-xl font-medium"
                    onClick={() => signInWithProvider("facebook")}
                    disabled={loading}
                    data-testid="button-facebook-signin"
                  >
                    <SiFacebook className="w-4 h-4 text-blue-600" />
                    Facebook
                  </Button>
                </div>

                <p className="text-center text-xs text-muted-foreground leading-relaxed">
                  By continuing, you agree to Abley's{" "}
                  <span className="text-primary underline cursor-pointer">Terms</span>{" "}
                  and{" "}
                  <span className="text-primary underline cursor-pointer">Privacy Policy</span>.
                </p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
