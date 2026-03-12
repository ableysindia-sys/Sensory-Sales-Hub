import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { EnquiryCartProvider } from "@/lib/enquiry-cart";
import { ProductsProvider } from "@/lib/product-provider";
import { AuthProvider } from "@/lib/auth-context";
import { AuthDrawer } from "@/components/auth-drawer";
import { CartDrawer } from "@/components/cart-drawer";
import { ChatWidget } from "@/components/chat-widget";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import NotFound from "@/pages/not-found";
import Home from "./pages/home";
import CategoryPage from "./pages/category";
import ProductPage from "./pages/product";
import EnquiryCartPage from "./pages/enquiry-cart";
import AllProducts from "./pages/all-products";
import ContactPage from "./pages/contact";
import AdminPage from "./pages/admin";
import DynamicPage from "./pages/dynamic-page";
import AboutPage from "./pages/about";
import B2BLandingPage from "./pages/b2b-landing";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={AllProducts} />
        <Route path="/category/:slug" component={CategoryPage} />
        <Route path="/product/:slug" component={ProductPage} />
        <Route path="/enquiry" component={EnquiryCartPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/lp" component={B2BLandingPage} />
        <Route path="/page/:slug" component={DynamicPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function GlobalOverlays() {
  const [location] = useLocation();
  const isStandalonePage = location === "/lp";
  return (
    <>
      {!isStandalonePage && <MobileBottomNav />}
      {!isStandalonePage && <ChatWidget />}
      {!isStandalonePage && <WhatsAppFab />}
      <CartDrawer />
      <AuthDrawer />
      <Toaster />
    </>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ableys-rehab-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <ProductsProvider>
              <EnquiryCartProvider>
                <Router />
                <GlobalOverlays />
              </EnquiryCartProvider>
            </ProductsProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
