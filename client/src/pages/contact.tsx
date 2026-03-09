import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Loader2,
  Send,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { SiFacebook, SiInstagram, SiYoutube, SiWhatsapp } from "react-icons/si";
import type { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { SITE_IMAGES } from "@/lib/catalogue-data";

type ContactFormValues = z.infer<typeof api.leads.create.input>;

const TOPICS = [
  "Product Enquiry",
  "Bulk / Custom Order",
  "Shipping & Delivery",
  "Returns & Exchanges",
  "Sensory Room Setup",
  "Other",
];

const CONTACT_INFO = {
  phone: "+91-704-218-0166",
  email: "info@ableys.in",
  address: "Khasra No. 227 PS Tower, Village Mamura, Sector 66, 201301 Noida, Uttar Pradesh, India",
  hours: "Mon – Sat: 10:00 AM – 7:00 PM",
  mapUrl: "https://www.google.com/maps?q=Khasra+No.+227+PS+Tower+Village+Mamura+Sector+66+Noida+Uttar+Pradesh+India",
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.123456789!2d77.37!3d28.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM0JzEyLjAiTiA3N8KwMjInMTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890",
  whatsapp: "https://wa.me/917042180166",
};

const socialLinks = [
  { name: "Facebook", icon: SiFacebook, url: "https://www.facebook.com/ableysrehab" },
  { name: "Instagram", icon: SiInstagram, url: "https://www.instagram.com/ableysrehab" },
  { name: "YouTube", icon: SiYoutube, url: "https://www.youtube.com/@ableysrehab" },
  { name: "WhatsApp", icon: SiWhatsapp, url: CONTACT_INFO.whatsapp },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const createLead = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const res = await apiRequest("POST", api.leads.create.path, data);
      return res.json();
    },
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(api.leads.create.input),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organisation: "",
      city: "",
      category: "",
      requirementType: "",
      interest: "",
      message: "",
      cartItems: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await createLead.mutateAsync({
        ...data,
        requirementType: "Contact Form",
      });
      setSubmitted(true);
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
      <main id="main-content">
        <div className="relative h-48 sm:h-56 lg:h-64 mt-[6.5rem] overflow-hidden" data-testid="section-contact-banner">
          <img
            src={SITE_IMAGES.workshop}
            alt="Abley's Rehab workshop"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 font-display" data-testid="heading-contact">
                Contact Us
              </h1>
              <p className="text-white/80 text-sm sm:text-base max-w-lg mx-auto">
                Reach out to Abley's for fast help — we'd love to hear from you
              </p>
            </motion.div>
          </div>
        </div>

        <section className="py-12 sm:py-16" data-testid="section-contact-info">
          <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-6 mb-12">
              <motion.a
                href={`tel:${CONTACT_INFO.phone.replace(/-/g, "")}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all group cursor-pointer"
                data-testid="card-phone"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Phone className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Call Us</p>
                  <p className="text-sm text-primary font-medium">{CONTACT_INFO.phone}</p>
                  <p className="text-xs text-muted-foreground mt-1">{CONTACT_INFO.hours}</p>
                </div>
              </motion.a>

              <motion.a
                href={`mailto:${CONTACT_INFO.email}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all group cursor-pointer"
                data-testid="card-email"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Email Us</p>
                  <p className="text-sm text-primary font-medium">{CONTACT_INFO.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">We reply within 24 hours</p>
                </div>
              </motion.a>

              <motion.a
                href={CONTACT_INFO.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all group cursor-pointer"
                data-testid="card-address"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MapPin className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Visit Us</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{CONTACT_INFO.address}</p>
                </div>
              </motion.a>
            </div>

            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-3"
              >
                {submitted && (
                  <div className="bg-card rounded-2xl border border-border/50 p-8 sm:p-10 text-center">
                    <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2" data-testid="heading-contact-success">
                      Message Sent!
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => { form.reset(); setSubmitted(false); }}
                      variant="outline"
                      className="rounded-full cursor-pointer touch-manipulation"
                      data-testid="button-send-another"
                    >
                      Send Another Message
                    </Button>
                  </div>
                )}
                {!submitted && (
                  <div className="bg-card rounded-2xl border border-border/50 p-6 sm:p-8" data-testid="contact-form-card">
                    <h2 className="text-xl font-bold text-foreground mb-1">Get in Touch</h2>
                    <p className="text-sm text-muted-foreground mb-6">
                      Fill in the form below and we'll respond as soon as possible.
                    </p>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" data-testid="contact-form">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" className="rounded-xl h-11" data-testid="input-contact-name" {...field} />
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
                                  <Input type="email" placeholder="you@example.com" className="rounded-xl h-11" data-testid="input-contact-email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="+91 9876543210" className="rounded-xl h-11" data-testid="input-contact-phone" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="interest"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Topic</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value || ""}>
                                  <FormControl>
                                    <SelectTrigger className="rounded-xl h-11" data-testid="select-contact-topic">
                                      <SelectValue placeholder="What's this about?" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {TOPICS.map((t) => (
                                      <SelectItem key={t} value={t}>{t}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us how we can help you..."
                                  className="min-h-[120px] resize-none rounded-xl"
                                  data-testid="textarea-contact-message"
                                  {...field}
                                  value={field.value || ""}
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
                          className="w-full sm:w-auto rounded-full h-12 px-8 shadow-lg shadow-primary/20 cursor-pointer touch-manipulation"
                          data-testid="button-submit-contact"
                        >
                          {createLead.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" /> Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2 space-y-6"
              >
                <div className="bg-card rounded-2xl border border-border/50 p-6" data-testid="section-hours">
                  <h3 className="text-base font-bold text-foreground mb-4">Business Hours</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Monday – Saturday</p>
                        <p className="text-xs text-muted-foreground">10:00 AM – 7:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Sunday</p>
                        <p className="text-xs text-muted-foreground">Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl border border-border/50 p-6" data-testid="section-quick-connect">
                  <h3 className="text-base font-bold text-foreground mb-4">Quick Connect</h3>
                  <div className="space-y-3">
                    <a
                      href={CONTACT_INFO.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors cursor-pointer group"
                      data-testid="link-whatsapp"
                    >
                      <SiWhatsapp className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Chat on WhatsApp</p>
                        <p className="text-xs text-muted-foreground">Fastest way to reach us</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                    </a>
                    <a
                      href={`tel:${CONTACT_INFO.phone.replace(/-/g, "")}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors cursor-pointer"
                      data-testid="link-call"
                    >
                      <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Call Now</p>
                        <p className="text-xs text-muted-foreground">{CONTACT_INFO.phone}</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="bg-card rounded-2xl border border-border/50 p-6" data-testid="section-social">
                  <h3 className="text-base font-bold text-foreground mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
                        aria-label={link.name}
                        data-testid={`social-${link.name.toLowerCase()}`}
                      >
                        <link.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-2xl border border-border/50 p-6" data-testid="section-bulk-cta">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-foreground mb-1">Need a bulk order?</h3>
                      <p className="text-xs text-muted-foreground mb-3">
                        For institutional, clinic, or large-scale orders use our guided bulk order form.
                      </p>
                      <Link href="/enquiry">
                        <Button variant="outline" size="sm" className="rounded-full text-xs cursor-pointer touch-manipulation" data-testid="link-bulk-orders">
                          Go to Bulk Orders
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="pb-12 sm:pb-16" data-testid="section-map">
          <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm">
              <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.5!2d77.37!3d28.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03b!2sSector%2066%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Abley's Rehab location"
                  data-testid="map-iframe"
                />
              </div>
              <div className="bg-card px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{CONTACT_INFO.address}</p>
                </div>
                <a
                  href={CONTACT_INFO.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline cursor-pointer flex-shrink-0"
                  data-testid="link-directions"
                >
                  Get Directions <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
