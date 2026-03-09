import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { EnquiryCartProvider } from "@/lib/enquiry-cart";
import { CartDrawer } from "@/components/cart-drawer";
import { ChatWidget } from "@/components/chat-widget";
import NotFound from "@/pages/not-found";
import Home from "./pages/home";
import CategoryPage from "./pages/category";
import ProductPage from "./pages/product";
import EnquiryCartPage from "./pages/enquiry-cart";
import AllProducts from "./pages/all-products";
import OrderConfirmation from "./pages/order-confirmation";
import SensoryRoomBuilder from "./pages/sensory-room-builder";
import ContactPage from "./pages/contact";
import AdminPage from "./pages/admin";

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
        <Route path="/order-confirmation" component={OrderConfirmation} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/sensory-room-builder" component={SensoryRoomBuilder} />
        <Route path="/admin" component={AdminPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ableys-rehab-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <EnquiryCartProvider>
            <Router />
            <CartDrawer />
            <ChatWidget />
            <Toaster />
          </EnquiryCartProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
