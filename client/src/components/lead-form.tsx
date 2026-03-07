import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { api } from "@shared/routes";
import { useCreateLead } from "@/hooks/use-leads";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HeartHandshake, Loader2, Sparkles } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { z } from "zod";

type LeadFormValues = z.infer<typeof api.leads.create.input>;

export function LeadForm() {
  const { toast } = useToast();
  const createLead = useCreateLead();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(api.leads.create.input),
    defaultValues: {
      name: "",
      email: "",
      interest: "",
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    try {
      await createLead.mutateAsync(data);
      setIsSuccess(true);
      toast({
        title: "Thank you for connecting!",
        description: "We've added you to our serene community.",
      });
      form.reset();
      
      // Reset success state after a few seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-[3rem] -z-10" />
      
      <div className="glass-panel rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-foreground/5 relative overflow-hidden border border-border">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <HeartHandshake className="w-32 h-32 text-primary" />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-4" data-testid="heading-lead-form">
              Join Our Calm Community
            </h2>
            <p className="text-muted-foreground text-lg" data-testid="text-lead-form-desc">
              Get early access to our newest sensory products and exclusive mindfulness tips.
            </p>
          </div>

          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center"
              data-testid="state-success"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-10 h-10 text-primary" data-testid="icon-success" />
              </div>
              <h3 className="font-display text-2xl font-medium text-foreground mb-2" data-testid="heading-success">
                You're on the list!
              </h3>
              <p className="text-muted-foreground" data-testid="text-success-desc">
                We'll be in touch with a gentle reminder when new products arrive.
              </p>
            </motion.div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Jane Doe" 
                            className="bg-background/50 border-border focus-visible:ring-primary/30 rounded-xl transition-all"
                            data-testid="input-lead-name"
                            {...field} 
                          />
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
                        <FormLabel className="text-foreground/80">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="jane@example.com" 
                            className="bg-background/50 border-border focus-visible:ring-primary/30 rounded-xl transition-all"
                            data-testid="input-lead-email"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80">What brings you peace?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="I'm looking for weighted blankets, fidget tools, or soothing lighting..." 
                          className="bg-background/50 border-border focus-visible:ring-primary/30 min-h-[100px] resize-none rounded-xl transition-all"
                          data-testid="textarea-lead-interest"
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
                  className="w-full rounded-xl text-lg"
                  data-testid="button-lead-submit"
                >
                  {createLead.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    "Stay Connected"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
