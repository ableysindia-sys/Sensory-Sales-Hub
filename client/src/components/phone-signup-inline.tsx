import { useRef, useState } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth as firebaseAuth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { Loader2, Phone, CheckCircle2 } from "lucide-react";
import { SiGoogle, SiFacebook } from "react-icons/si";
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
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [socialLoading, setSocialLoading] = useState<"google" | "facebook" | null>(null);
  const [done, setDone] = useState(false);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  const isDark = variant === "dark";

  if (user || done) {
    return (
      <div className={cn("flex items-center gap-2.5", className)}>
        <div className={cn(
          "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium",
          isDark ? "bg-white/10 text-white border border-white/20" : "bg-green-50 text-green-700 border border-green-200"
        )}>
          <CheckCircle2 className="w-4 h-4" />
          {user
            ? `Signed in as ${user.displayName ?? user.phoneNumber ?? user.email ?? "User"}`
            : "You're registered! Check your phone for the OTP."}
        </div>
      </div>
    );
  }

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
        try { recaptchaRef.current.clear(); } catch {}
        recaptchaRef.current = null;
      }
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
        err?.code === "auth/too-many-requests"
          ? "Too many attempts. Please try again later."
          : err?.code === "auth/invalid-phone-number"
          ? "Invalid phone number. Please check and try again."
          : "Couldn't send OTP. Please try again."
      );
      if (recaptchaRef.current) {
        try { recaptchaRef.current.clear(); } catch {}
        recaptchaRef.current = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWithProvider = async (providerName: "google" | "facebook") => {
    setSocialLoading(providerName);
    try {
      const provider = providerName === "google" ? new GoogleAuthProvider() : new FacebookAuthProvider();
      await signInWithPopup(firebaseAuth, provider);
      setDone(true);
    } catch (err: any) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Sign-in failed. Please try again.");
      }
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div id={containerId} className="hidden" />

      {label && (
        <p className={cn("text-sm font-semibold mb-1", isDark ? "text-white" : "text-foreground")}>
          {label}
        </p>
      )}
      {sublabel && (
        <p className={cn("text-xs mb-3", isDark ? "text-white/55" : "text-muted-foreground")}>
          {sublabel}
        </p>
      )}

      {/* Phone row */}
      <div className="flex gap-2">
        <div className={cn(
          "flex items-center gap-1.5 px-3 rounded-xl text-sm font-semibold shrink-0 border",
          isDark
            ? "bg-white/10 text-white border-white/15 backdrop-blur-sm"
            : "bg-muted border-border text-foreground"
        )}>
          🇮🇳 +91
        </div>
        <input
          type="tel"
          inputMode="numeric"
          placeholder="98765 43210"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          onKeyDown={(e) => e.key === "Enter" && sendOtp()}
          className={cn(
            "flex-1 h-11 px-3.5 rounded-xl text-sm border outline-none transition-all tracking-wider min-w-0",
            isDark
              ? "bg-white/10 border-white/15 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/15 backdrop-blur-sm"
              : "bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
          )}
          data-testid="input-inline-phone"
        />
        <button
          onClick={sendOtp}
          disabled={phone.replace(/\D/g, "").length !== 10 || loading}
          className={cn(
            "h-11 px-4 rounded-xl text-sm font-semibold flex items-center gap-1.5 shrink-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
            isDark
              ? "bg-white text-gray-900 hover:bg-white/90 shadow-lg shadow-black/30"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
          data-testid="button-inline-send-otp"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <><Phone className="w-3.5 h-3.5" /> Get OTP</>
          )}
        </button>
      </div>

      {error && (
        <p className={cn("text-xs mt-1.5", isDark ? "text-red-300" : "text-destructive")}>
          {error}
        </p>
      )}

      {/* Social row */}
      <div className="flex items-center gap-3 mt-3">
        <div className={cn("flex-1 h-px", isDark ? "bg-white/15" : "bg-border")} />
        <span className={cn("text-[11px] font-medium", isDark ? "text-white/45" : "text-muted-foreground")}>
          or sign in with
        </span>
        <div className={cn("flex-1 h-px", isDark ? "bg-white/15" : "bg-border")} />
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => signInWithProvider("google")}
          disabled={!!socialLoading || loading}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-medium border transition-all disabled:opacity-50",
            isDark
              ? "bg-white/10 border-white/15 text-white hover:bg-white/20 backdrop-blur-sm"
              : "bg-background border-border text-foreground hover:bg-muted"
          )}
          data-testid="button-inline-google"
        >
          {socialLoading === "google" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <SiGoogle className="w-4 h-4 text-red-500" />
          )}
          Google
        </button>
        <button
          onClick={() => signInWithProvider("facebook")}
          disabled={!!socialLoading || loading}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-medium border transition-all disabled:opacity-50",
            isDark
              ? "bg-white/10 border-white/15 text-white hover:bg-white/20 backdrop-blur-sm"
              : "bg-background border-border text-foreground hover:bg-muted"
          )}
          data-testid="button-inline-facebook"
        >
          {socialLoading === "facebook" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <SiFacebook className="w-4 h-4 text-blue-600" />
          )}
          Facebook
        </button>
      </div>
    </div>
  );
}
