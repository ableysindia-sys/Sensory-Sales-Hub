import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Package, Truck, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

function generateOrderId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "ABL-";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function getEstimatedDelivery() {
  const now = new Date();
  const minDays = 5;
  const maxDays = 10;
  const minDate = new Date(now.getTime() + minDays * 24 * 60 * 60 * 1000);
  const maxDate = new Date(now.getTime() + maxDays * 24 * 60 * 60 * 1000);
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
  return `${minDate.toLocaleDateString("en-IN", options)} - ${maxDate.toLocaleDateString("en-IN", options)}`;
}

export default function OrderConfirmation() {
  const [orderId] = useState(generateOrderId);
  const [showCheck, setShowCheck] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowCheck(true), 200);
    const t2 = setTimeout(() => setShowContent(true), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">
          <div className="flex flex-col items-center text-center mb-8">
            <div
              className={`w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center transition-all duration-500 ${
                showCheck ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <CheckCircle2
                className={`w-10 h-10 text-green-600 dark:text-green-400 transition-all duration-500 delay-200 ${
                  showCheck ? "scale-100" : "scale-0"
                }`}
              />
            </div>
            <h1
              className={`mt-6 text-3xl font-bold transition-all duration-500 ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              data-testid="text-order-confirmed"
            >
              Order Confirmed
            </h1>
            <p
              className={`mt-2 text-muted-foreground transition-all duration-500 delay-100 ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Thank you for your purchase. Your order has been placed successfully.
            </p>
          </div>

          <div
            className={`transition-all duration-500 delay-200 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground">Order ID</span>
                  <span className="font-mono font-semibold text-sm" data-testid="text-order-id">{orderId}</span>
                </div>

                <div className="border-t" />

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Order Processing</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Your order is being prepared for shipment
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Estimated Delivery</p>
                    <p className="text-xs text-muted-foreground mt-0.5" data-testid="text-delivery-estimate">
                      {getEstimatedDelivery()}
                    </p>
                  </div>
                </div>

                <div className="border-t" />

                <p className="text-xs text-muted-foreground text-center">
                  A confirmation email with tracking details will be sent to your registered email address.
                </p>
              </CardContent>
            </Card>
          </div>

          <div
            className={`mt-6 flex flex-col gap-3 transition-all duration-500 delay-300 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link href="/">
              <Button className="w-full" data-testid="button-continue-shopping">
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
