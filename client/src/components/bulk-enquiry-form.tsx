import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Send, Phone } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

type EnquiryFormValues = z.infer<typeof api.leads.create.input>;

const categoryOptions = [
  "Swings", "Ballpool", "Mats", "Movement & Balance", "Climbing",
  "ADL Kit", "Therapy Balls", "Deep Pressure", "Visual", "Multiple Categories",
];

const requirementTypes = [
  "Bulk Order", "Customization", "New Centre Setup",
];

export function BulkEnquiryForm() {
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
    },
  });

  const onSubmit = async (data: EnquiryFormValues) => {
    try {
      await createLead.mutateAsync(data);
      toast({
        title: "Enquiry Submitted",
        description: "Our team will get back to you shortly.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="enquiry" className="py-24 sm:py-32" data-testid="section-enquiry">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Get in Touch</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6" data-testid="heading-enquiry">
              Bulk Orders & Custom Therapy Setups
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8" data-testid="text-enquiry-desc">
              Whether you're setting up a rehab centre, sensory gym, therapy room, or institutional program, our team can help with bulk requirements and customized tools.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span>Quick response within 24 hours</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <Send className="w-4 h-4 text-primary" />
                </div>
                <span>Custom quotes for institutional orders</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-card rounded-2xl border border-border/50 p-6 sm:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Dr. Jane Smith" data-testid="input-name" {...field} />
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
                            <Input placeholder="City Rehab Centre" data-testid="input-org" {...field} value={field.value || ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="jane@clinic.com" data-testid="input-email" {...field} />
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
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+91 9876543210" data-testid="input-phone" {...field} value={field.value || ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City / Country</FormLabel>
                          <FormControl>
                            <Input placeholder="Mumbai, India" data-testid="input-city" {...field} value={field.value || ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category Interested In</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || ''}>
                            <FormControl>
                              <SelectTrigger data-testid="select-category">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categoryOptions.map((opt) => (
                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
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
                    name="requirementType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requirement Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ''}>
                          <FormControl>
                            <SelectTrigger data-testid="select-requirement">
                              <SelectValue placeholder="Select requirement type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {requirementTypes.map((opt) => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your requirements, quantities, or any customization needs..."
                            className="min-h-[100px] resize-none"
                            data-testid="textarea-message"
                            {...field}
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={createLead.isPending}
                      className="rounded-full flex-1"
                      data-testid="button-submit-enquiry"
                    >
                      {createLead.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Enquiry
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="rounded-full"
                      data-testid="button-talk-team"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Talk to Our Team
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
