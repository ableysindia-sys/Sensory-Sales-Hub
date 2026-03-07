import { Switch, Route } from "wouter";
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
import OrderConfirmation from "./pages/order-confirmation";
import SensoryRoomBuilder from "./pages/sensory-room-builder";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/category/:slug" component={CategoryPage} />
      <Route path="/product/:slug" component={ProductPage} />
      <Route path="/enquiry" component={EnquiryCartPage} />
      <Route path="/order-confirmation" component={OrderConfirmation} />
      <Route path="/sensory-room-builder" component={SensoryRoomBuilder} />
      <Route component={NotFound} />
    </Switch>
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
