import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Smartphone, Building2, CheckCircle2, Loader2, Shield, Lock } from "lucide-react";
import { useShoppingCart } from "@/lib/shopping-cart";
import { useLocation } from "wouter";

type PaymentTab = "upi" | "card" | "netbanking";

interface RazorpayModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RazorpayModal({ open, onOpenChange }: RazorpayModalProps) {
  const [activeTab, setActiveTab] = useState<PaymentTab>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { getTotal, getSubtotal, getTaxAmount, getItemCount, clearCart } = useShoppingCart();
  const [, navigate] = useLocation();

  const total = getTotal();
  const subtotal = getSubtotal();
  const tax = getTaxAmount();
  const itemCount = getItemCount();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        clearCart();
        setIsSuccess(false);
        onOpenChange(false);
        navigate("/order-confirmation");
      }, 1500);
    }, 2000);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (isProcessing) return;
    if (!newOpen) {
      setActiveTab("card");
      setIsProcessing(false);
      setIsSuccess(false);
    }
    onOpenChange(newOpen);
  };

  const tabs: { key: PaymentTab; label: string; icon: typeof CreditCard }[] = [
    { key: "upi", label: "UPI", icon: Smartphone },
    { key: "card", label: "Card", icon: CreditCard },
    { key: "netbanking", label: "Netbanking", icon: Building2 },
  ];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-visible" data-testid="modal-razorpay">
        <div className="bg-[#072654] dark:bg-[#0a1929] text-white p-4 rounded-t-lg">
          <DialogHeader>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <DialogTitle className="text-white text-base font-semibold">Razorpay</DialogTitle>
              </div>
              <div className="flex items-center gap-1 text-xs text-white/60">
                <Lock className="w-3 h-3" />
                <span>Secured</span>
              </div>
            </div>
          </DialogHeader>
          <div className="mt-3 flex items-baseline justify-between gap-2 flex-wrap">
            <div>
              <p className="text-xs text-white/60">Amount Payable</p>
              <p className="text-2xl font-bold" data-testid="text-payment-amount">
                ₹{formatPrice(total)}
              </p>
            </div>
            <div className="text-right text-xs text-white/50">
              <p>{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
              <p>incl. ₹{formatPrice(tax)} GST</p>
            </div>
          </div>
        </div>

        {isSuccess ? (
          <div className="p-8 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-lg font-semibold" data-testid="text-payment-success">Payment Successful</p>
            <p className="text-sm text-muted-foreground">Redirecting to order confirmation...</p>
          </div>
        ) : (
          <div className="p-4">
            <div className="flex gap-1 mb-4 rounded-md bg-muted p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  disabled={isProcessing}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                  data-testid={`tab-payment-${tab.key}`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {activeTab === "upi" && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">UPI ID</label>
                  <Input
                    placeholder="yourname@upi"
                    disabled={isProcessing}
                    data-testid="input-upi-id"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your UPI ID to receive a payment request
                  </p>
                </div>
              )}

              {activeTab === "card" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Card Number</label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      disabled={isProcessing}
                      maxLength={19}
                      data-testid="input-card-number"
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-sm font-medium">Expiry</label>
                      <Input
                        placeholder="MM/YY"
                        disabled={isProcessing}
                        maxLength={5}
                        data-testid="input-card-expiry"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium">CVV</label>
                      <Input
                        placeholder="123"
                        type="password"
                        disabled={isProcessing}
                        maxLength={4}
                        data-testid="input-card-cvv"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Name on Card</label>
                    <Input
                      placeholder="John Doe"
                      disabled={isProcessing}
                      data-testid="input-card-name"
                    />
                  </div>
                </div>
              )}

              {activeTab === "netbanking" && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">Select Bank</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB"].map((bank) => (
                      <button
                        key={bank}
                        disabled={isProcessing}
                        className="p-3 rounded-md border text-sm font-medium text-left hover-elevate"
                        data-testid={`button-bank-${bank.toLowerCase()}`}
                      >
                        {bank} Bank
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground flex-wrap">
                <span>Subtotal</span>
                <span>₹{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground flex-wrap">
                <span>GST (18%)</span>
                <span>₹{formatPrice(tax)}</span>
              </div>
              <div className="border-t pt-2 flex items-center justify-between gap-2 font-semibold flex-wrap">
                <span>Total</span>
                <span>₹{formatPrice(total)}</span>
              </div>
            </div>

            <Button
              className="w-full mt-4 bg-[#072654] dark:bg-[#1a3a6b] text-white border-[#0a3570]"
              onClick={handlePay}
              disabled={isProcessing}
              data-testid="button-pay"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Pay ₹{formatPrice(total)}</>
              )}
            </Button>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>Payments are secure and encrypted</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
