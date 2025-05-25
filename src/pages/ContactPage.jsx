
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Mail, Phone, MapPin } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea'; 
    
    export function ContactPage() {
      const contactEmail = "faisalmehmood0544@gmail.com";
      const contactPhone = "03111889013";

      const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for form submission logic
        alert("Form submitted (not really, this is a placeholder). We'll get back to you soon!");
        e.target.reset();
      };

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto py-12 px-4 min-h-[calc(100vh-10rem)]"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-card p-8 rounded-xl shadow-xl"
            >
              <h2 className="font-heading text-2xl font-semibold text-primary mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Mail className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href={`mailto:${contactEmail}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {contactEmail}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <a href={`tel:${contactPhone}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {contactPhone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold">Our Office (Example)</h3>
                    <p className="text-muted-foreground">123 Converter Lane, Tech City, TX 75001</p>
                    <p className="text-xs text-muted-foreground/70">(Please note: This is a placeholder address.)</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-card p-8 rounded-xl shadow-xl"
            >
              <h2 className="font-heading text-2xl font-semibold text-primary mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <Input type="text" id="name" name="name" required className="mt-1" placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input type="email" id="email" name="email" required className="mt-1" placeholder="you@example.com" />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                  <Input type="text" id="subject" name="subject" required className="mt-1" placeholder="Regarding..." />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                  <Textarea id="message" name="message" rows="4" required className="mt-1" placeholder="Your message here..." />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      );
    }
  