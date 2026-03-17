import { useRef, useState } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth as firebaseAuth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { Loader2, Phone, CheckCircle2, Bell } from "lucide-react";
import { SiGoogle, SiApple } from "react-icons/si";
import { cn } from "@/lib/utils";

interface PhoneSignupInlineProps {
  variant?: "dark" | "light";
  label?: string;
  sublabel?: string;
  className?: string;
  containerId?: string;
}

export function PhoneSignupInline({
  variant = "light",
  label = "Register with your mobile number",
  sublabel = "Get exclusive pricing, order updates & offers",
  className,
  containerId = "recaptcha-inline",
}: PhoneSignupInlineProps) {
  const { user, setIsAuthDrawerOpen, setPendingConfirmation, setPendingPhone } = useAuth();
  const [phone, setPhone]               = useState("");
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [socialLoading, setSocialLoading] = useState<"google" | "apple" | null>(null);
  const [done, setDone]                 = useState(false);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  const isDark = variant === "dark";

  /* ── Signed-in / done state ── */
  if (user || done) {
    const name = user?.displayName ?? user?.phoneNumber ?? user?.email ?? "User";
    return (
      <div className={cn("flex items-center gap-2.5", className)}>
        <div className={cn(
          "w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium",
          isDark
            ? "bg-white/10 text-white border border-white/20"
            : "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50"
        )}>
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{user ? `Signed in as ${name}` : "You're registered! Check your phone for the OTP."}</span>
        </div>
      </div>
    );
  }

  /* ── Handlers ── */
  const sendOtp = async () => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length !== 10) { setError("Enter a valid 10-digit mobile number."); return; }
    setError("");
    setLoading(true);
    try {
      if (recaptchaRef.current) { try { recaptchaRef.current.clear(); } catch {} recaptchaRef.current = null; }
      const container = document.getElementById(containerId);
      if (!container) throw new Error("reCAPTCHA container not ready");
      const verifier = new RecaptchaVerifier(firebaseAuth, containerId, { size: "invisible" });
      recaptchaRef.current = verifier;
      const result = await signInWithPhoneNumber(firebaseAuth, `+91${cleaned}`, verifier);
      setPendingPhone(cleaned);
      setPendingConfirmation(result);
      setIsAuthDrawerOpen(true);
    } catch (err: any) {
      setError(
        err?.code === "auth/too-many-requests"      ? "Too many attempts. Please try again later."
        : err?.code === "auth/invalid-phone-number" ? "Invalid phone number. Please check and try again."
        : "Couldn't send OTP. Please try again."
      );
      if (recaptchaRef.current) { try { recaptchaRef.current.clear(); } catch {} recaptchaRef.current = null; }
    } finally {
      setLoading(false);
    }
  };

  const signInWithProvider = async (providerName: "google" | "apple") => {
    setSocialLoading(providerName);
    try {
      const provider = providerName === "google" ? new GoogleAuthProvider() : new OAuthProvider("apple.com");
      await signInWithPopup(firebaseAuth, provider);
      setDone(true);
    } catch (err: any) {
      if (err.code !== "auth/popup-closed-by-user") setError("Sign-in failed. Please try again.");
    } finally {
      setSocialLoading(null);
    }
  };

  /* ── Render ── */
  return (
    <div className={cn("w-full", className)}>
      <div id={containerId} className="hidden" />

      {/* ── Zone 1: Header ── */}
      {(label || sublabel) && (
        <div className={cn(
          "flex items-center gap-3 pb-4 mb-4 border-b",
          isDark ? "border-white/10" : "border-border/50"
        )}>
          <div className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
            isDark ? "bg-white/15" : "bg-primary/10"
          )}>
            <Bell className={cn("w-4 h-4", isDark ? "text-white" : "text-primary")} />
          </div>
          <div className="min-w-0 flex-1">
            {label && (
              <p className={cn("text-sm font-bold leading-snug", isDark ? "text-white" : "text-foreground")}>
                {label}
              </p>
            )}
            {sublabel && (
              <p className={cn("text-xs mt-0.5", isDark ? "text-white/50" : "text-muted-foreground")}>
                {sublabel}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Zone 2: Form ── */}
      <div className="space-y-2.5">
        {/* Unified phone input — always full width */}
        <div className={cn(
          "flex items-center rounded-xl overflow-hidden border transition-shadow focus-within:ring-2",
          isDark
            ? "bg-white/10 border-white/20 focus-within:ring-white/30"
            : "bg-background border-input focus-within:ring-ring"
        )}>
          <div className={cn(
            "flex items-center gap-1 px-3 py-2.5 text-sm font-semibold shrink-0 border-r select-none",
            isDark ? "text-white/80 border-white/20" : "text-foreground border-input bg-muted"
          )}>
            🇮🇳 <span>+91</span>
          </div>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            onKeyDown={(e) => e.key === "Enter" && sendOtp()}
            className={cn(
              "flex-1 px-3 py-2.5 text-sm tracking-wider bg-transparent outline-none min-w-0",
              isDark
                ? "text-white placeholder:text-white/30"
                : "text-foreground placeholder:text-muted-foreground"
            )}
            data-testid="input-inline-phone"
          />
        </div>

        {/* CTA — always full width */}
        <button
          onClick={sendOtp}
          disabled={phone.replace(/\D/g, "").length !== 10 || loading}
          className={cn(
            "w-full h-11 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
            isDark
              ? "bg-white text-gray-900 hover:bg-white/90 shadow-md shadow-black/20"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
          data-testid="button-inline-send-otp"
        >
          {loading
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <><Phone className="w-3.5 h-3.5" /> Get OTP</>
          }
        </button>

        {error && (
          <p className={cn("text-xs", isDark ? "text-red-300" : "text-destructive")}>
            {error}
          </p>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 pt-0.5">
          <div className={cn("flex-1 h-px", isDark ? "bg-white/10" : "bg-border")} />
          <span className={cn("text-[11px] font-medium", isDark ? "text-white/40" : "text-muted-foreground")}>
            or continue with
          </span>
          <div className={cn("flex-1 h-px", isDark ? "bg-white/10" : "bg-border")} />
        </div>

        {/* Social buttons — compact equal pair */}
        <div className="flex gap-2">
          {(["google", "apple"] as const).map((p) => (
            <button
              key={p}
              onClick={() => signInWithProvider(p)}
              disabled={!!socialLoading || loading}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 h-9 rounded-xl text-xs font-medium border transition-all disabled:opacity-50",
                isDark
                  ? "bg-white/10 border-white/10 text-white hover:bg-white/20"
                  : "bg-background border-border/60 text-foreground hover:bg-muted hover:border-border"
              )}
              data-testid={`button-inline-${p}`}
            >
              {socialLoading === p ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : p === "google" ? (
                <SiGoogle className="w-3.5 h-3.5 text-red-500" />
              ) : (
                <SiApple className="w-3.5 h-3.5" />
              )}
              {p === "google" ? "Google" : "Apple"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
