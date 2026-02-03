import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, MessageSquare, Mail, Check, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
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
        // Check if it's a duplicate email error
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
    <section id="contact" className="snap-section section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-foreground/5 to-transparent rounded-full blur-3xl" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm uppercase tracking-widest text-muted-foreground mb-4"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            Let's Build Something
            <br />
            <span className="text-muted-foreground">Amazing Together</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-lg text-muted-foreground">
              Ready to transform your business? Reach out and let's discuss how we can help you achieve your goals.
            </p>

            {/* Quick Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openWhatsApp}
                className="flex items-center gap-3 px-6 py-4 bg-card border border-border rounded-xl hover:border-foreground/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-left">
                  <span className="block text-sm text-muted-foreground">WhatsApp</span>
                  <span className="font-medium text-foreground">{WHATSAPP_NUMBER}</span>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openEmail}
                className="flex items-center gap-3 px-6 py-4 bg-card border border-border rounded-xl hover:border-foreground/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-foreground" />
                </div>
                <div className="text-left">
                  <span className="block text-sm text-muted-foreground">Email</span>
                  <span className="font-medium text-foreground text-sm">{EMAIL_ADDRESS}</span>
                </div>
              </motion.button>
            </div>

            {/* Newsletter */}
            <div className="pt-8 border-t border-border/50">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Stay Updated
              </h3>
              <p className="text-muted-foreground mb-4">
                Subscribe to our newsletter for insights on digital transformation and technology trends.
              </p>
              <Form {...newsletterForm}>
                <form
                  onSubmit={newsletterForm.handleSubmit(onNewsletterSubmit)}
                  className="flex gap-3"
                >
                  <FormField
                    control={newsletterForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            className="bg-card border-border h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <motion.button
                    type="submit"
                    disabled={isNewsletterSubmitting || isNewsletterSubmitted}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 h-12 bg-foreground text-background rounded-md font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    <AnimatePresence mode="wait">
                      {isNewsletterSubmitted ? (
                        <motion.span
                          key="success"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Check size={18} />
                        </motion.span>
                      ) : isNewsletterSubmitting ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <span>Subscribe</span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>
              </Form>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Send us a message
            </h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className="bg-background border-border"
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
                        <FormLabel className="text-foreground">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your@email.com"
                            type="email"
                            className="bg-background border-border"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your phone number"
                            className="bg-background border-border"
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
                        <FormLabel className="text-foreground">Service Interest</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background border-border">
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
                      <FormLabel className="text-foreground">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project..."
                          className="bg-background border-border min-h-[120px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-12 bg-foreground text-background rounded-md font-medium hover:bg-foreground/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 button-glow"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Check size={18} />
                        <span>Message Sent!</span>
                      </motion.div>
                    ) : isSubmitting ? (
                      <motion.div
                        key="loading"
                        className="flex items-center gap-2"
                      >
                        <Loader2 size={18} className="animate-spin" />
                        <span>Sending...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        className="flex items-center gap-2"
                      >
                        <Send size={18} />
                        <span>Send Message</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
