import { useRef, useState } from 'react';
import { useInView, AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, MessageSquare, Mail, Check, Loader2, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { BlurFade } from '@/components/ui/BlurFade';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: 'Name must be at least 2 characters' }).max(100),
  email: z.string().trim().email({ message: 'Please enter a valid email' }).max(255),
  phone: z.string().trim().optional(),
  service: z.string().min(1, { message: 'Please select a service' }),
  message: z.string().trim().min(10, { message: 'Message must be at least 10 characters' }).max(1000),
});

const newsletterSchema = z.object({
  email: z.string().trim().email({ message: 'Please enter a valid email' }).max(255),
});

type ContactFormData = z.infer<typeof contactSchema>;
type NewsletterFormData = z.infer<typeof newsletterSchema>;

const services = [
  'Digital Branding',
  'Operations Digitalization',
  'AI Document Archives',
  'Custom Software Development',
  'General Inquiry',
];

const WHATSAPP_NUMBER = '8667331224';
const EMAIL_ADDRESS = 'astutecomputer.contact@gmail.com';

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    },
  });

  const newsletterForm = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          service: data.service,
          message: data.message,
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      
      setTimeout(() => {
        setIsSubmitted(false);
        form.reset();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onNewsletterSubmit = async (data: NewsletterFormData) => {
    setIsNewsletterSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: data.email,
        });

      if (error) {
        if (error.code === '23505') {
          toast.info('You\'re already subscribed!');
          setIsNewsletterSubmitted(true);
        } else {
          throw error;
        }
      } else {
        setIsNewsletterSubmitted(true);
        toast.success('Thanks for subscribing!');
      }
      
      setTimeout(() => {
        setIsNewsletterSubmitted(false);
        newsletterForm.reset();
      }, 3000);
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent('Hello! I\'m interested in learning more about Astute Computer\'s services.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const openEmail = () => {
    const subject = encodeURIComponent('Inquiry from Website');
    const body = encodeURIComponent('Hello Astute Computer,\n\nI would like to learn more about your services.\n\n');
    window.open(`mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-24 md:py-32">
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div ref={ref} className="container-custom relative z-10 px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <BlurFade>
            <span className="inline-block text-xs sm:text-sm uppercase tracking-widest text-primary mb-3 sm:mb-4">
              Get In Touch
            </span>
          </BlurFade>
          <BlurFade delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 sm:mb-6 leading-[1.15]">
              Let's Build Something
              <br />
              <span className="text-gradient-purple">Amazing Together</span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your business? Coffee's on us. Let's discuss how we can help you achieve your goals.
            </p>
          </BlurFade>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Methods */}
          <BlurFade delay={0.2}>
            <div className="space-y-6 sm:space-y-8">
              {/* Quick Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={openWhatsApp}
                  className="flex items-center gap-3 px-5 sm:px-6 py-4 bg-card border border-border rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all group"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs sm:text-sm text-muted-foreground">WhatsApp</span>
                    <span className="font-medium text-foreground text-sm sm:text-base">{WHATSAPP_NUMBER}</span>
                  </div>
                </button>

                <button
                  onClick={openEmail}
                  className="flex items-center gap-3 px-5 sm:px-6 py-4 bg-card border border-border rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all group"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs sm:text-sm text-muted-foreground">Email</span>
                    <span className="font-medium text-foreground text-xs sm:text-sm">{EMAIL_ADDRESS}</span>
                  </div>
                </button>
              </div>

              {/* Newsletter */}
              <div className="pt-6 sm:pt-8 border-t border-border/50">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
                  Stay Updated
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  Subscribe to our newsletter for insights on digital transformation and technology trends.
                </p>
                <Form {...newsletterForm}>
                  <form
                    onSubmit={newsletterForm.handleSubmit(onNewsletterSubmit)}
                    className="flex gap-2 sm:gap-3"
                  >
                    <FormField
                      control={newsletterForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="Enter your email"
                              className="bg-card border-border h-11 sm:h-12 rounded-full px-4 sm:px-5 focus:border-primary focus:ring-primary text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <button
                      type="submit"
                      disabled={isNewsletterSubmitting || isNewsletterSubmitted}
                      className="px-5 sm:px-6 h-11 sm:h-12 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2 button-glow"
                    >
                      <AnimatePresence mode="wait">
                        {isNewsletterSubmitted ? (
                          <motion.span key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Check size={16} />
                          </motion.span>
                        ) : isNewsletterSubmitting ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <ArrowRight size={16} />
                        )}
                      </AnimatePresence>
                    </button>
                  </form>
                </Form>
              </div>
            </div>
          </BlurFade>

          {/* Contact Form */}
          <BlurFade delay={0.3}>
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-primary/20 transition-colors">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-5 sm:mb-6">
                Send us a message
              </h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground text-sm">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              className="bg-background border-border rounded-lg focus:border-primary focus:ring-primary text-sm"
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
                          <FormLabel className="text-foreground text-sm">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your@email.com"
                              type="email"
                              className="bg-background border-border rounded-lg focus:border-primary focus:ring-primary text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground text-sm">Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your phone number"
                              className="bg-background border-border rounded-lg focus:border-primary focus:ring-primary text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground text-sm">Service Interest</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background border-border rounded-lg text-sm">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service} value={service}>
                                  {service}
                                </SelectItem>
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
                        <FormLabel className="text-foreground text-sm">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project..."
                            className="bg-background border-border min-h-[100px] sm:min-h-[120px] resize-none rounded-lg focus:border-primary focus:ring-primary text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full h-11 sm:h-12 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 button-glow text-sm sm:text-base"
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitted ? (
                        <motion.div key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                          <Check size={16} />
                          <span>Message Sent!</span>
                        </motion.div>
                      ) : isSubmitting ? (
                        <motion.div key="loading" className="flex items-center gap-2">
                          <Loader2 size={16} className="animate-spin" />
                          <span>Sending...</span>
                        </motion.div>
                      ) : (
                        <motion.div key="default" className="flex items-center gap-2">
                          <Send size={16} />
                          <span>Send Message</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </form>
              </Form>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
