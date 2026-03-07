import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "wouter";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { useEnquiryCart } from "@/lib/enquiry-cart";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Trash2, Plus, Minus, ShoppingCart, Send, Loader2, ArrowLeft } from "lucide-react";
import type { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

type EnquiryFormValues = z.infer<typeof api.leads.create.input>;

export default function EnquiryCartPage() {
  const { items, removeItem, updateQuantity, updateNotes, clearCart, getItemCount } = useEnquiryCart();
  const { toast } = useToast();

  const createLead = useMutation({
    mutationFn: async (data: EnquiryFormValues) => {
      const res = await apiRequest("POST", api.leads.create.path, data);
      return res.json();
    },
  });

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(api.leads.create.input),
    defaultValues: {
      name: "",
      email: "",
      organisation: "",
      phone: "",
      city: "",
      category: "",
      requirementType: "",
      interest: "",
      message: "",
      cartItems: "",
    },
  });

  const onSubmit = async (data: EnquiryFormValues) => {
    const cartData = items.map((item) => ({
      product: item.productName,
      category: item.category,
      qty: item.quantity,
      notes: item.notes,
    }));

    try {
      await createLead.mutateAsync({
        ...data,
        cartItems: JSON.stringify(cartData),
        category: [...new Set(items.map((i) => i.category))].join(", "),
        requirementType: "Bulk Order",
      });
      toast({
        title: "Enquiry Submitted",
        description: "Our team will review your requirements and get back to you shortly.",
      });
      form.reset();
      clearCart();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-36 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-back">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground" data-testid="heading-enquiry-cart">
                Enquiry Cart
              </h1>
              <p className="text-muted-foreground mt-1">
                {getItemCount() > 0
                  ? `${getItemCount()} item${getItemCount() > 1 ? "s" : ""} in your enquiry`
                  : "Your enquiry cart is empty"}
              </p>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-2xl border border-border/50" data-testid="empty-cart">
              <ShoppingCart className="w-16 h-16 mx-auto mb-6 text-muted-foreground/30" />
              <h2 className="text-xl font-bold text-foreground mb-3">No items in your enquiry</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Browse our product catalogue and add items you're interested in to get a bulk quote.
              </p>
              <Link href="/#categories">
                <Button className="rounded-full" data-testid="button-browse-products">Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-4" data-testid="cart-items-list">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="bg-card rounded-2xl border border-border/50 p-5"
                    data-testid={`cart-item-${item.productId}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-xs font-medium text-primary uppercase tracking-wider">{item.category}</p>
                        <h3 className="font-bold text-foreground" data-testid={`cart-item-name-${item.productId}`}>
                          {item.productName}
                        </h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground"
                        onClick={() => removeItem(item.productId)}
                        data-testid={`button-remove-${item.productId}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-sm text-muted-foreground">Qty:</span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          data-testid={`button-qty-minus-${item.productId}`}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-10 text-center font-semibold text-foreground" data-testid={`text-qty-${item.productId}`}>
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          data-testid={`button-qty-plus-${item.productId}`}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <Input
                      placeholder="Add notes (optional)"
                      value={item.notes}
                      onChange={(e) => updateNotes(item.productId, e.target.value)}
                      className="text-sm"
                      data-testid={`input-notes-${item.productId}`}
                    />
                  </div>
                ))}

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive gap-1.5"
                  onClick={clearCart}
                  data-testid="button-clear-cart"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear All
                </Button>
              </div>

              <div className="lg:col-span-2" data-testid="enquiry-form-section">
                <div className="bg-card rounded-2xl border border-border/50 p-6 sticky top-36">
                  <h2 className="text-lg font-bold text-foreground mb-1">Submit Enquiry</h2>
                  <p className="text-sm text-muted-foreground mb-5">Fill in your details and we'll prepare a quote.</p>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Dr. Jane Smith" data-testid="input-cart-name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="organisation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organisation / Clinic</FormLabel>
                            <FormControl>
                              <Input placeholder="City Rehab Centre" data-testid="input-cart-org" {...field} value={field.value || ''} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="jane@clinic.com" data-testid="input-cart-email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+91 9876543210" data-testid="input-cart-phone" {...field} value={field.value || ''} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City / Country</FormLabel>
                            <FormControl>
                              <Input placeholder="Mumbai, India" data-testid="input-cart-city" {...field} value={field.value || ''} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Details</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your project, quantities, or special requirements..."
                                className="min-h-[80px] resize-none"
                                data-testid="textarea-cart-message"
                                {...field}
                                value={field.value || ''}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        disabled={createLead.isPending}
                        className="w-full rounded-full"
                        data-testid="button-submit-cart-enquiry"
                      >
                        {createLead.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Submit Bulk Enquiry
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
