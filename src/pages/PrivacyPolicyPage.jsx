
    import React from 'react';
    import { motion } from 'framer-motion';
    import { ShieldCheck, FileText, Mail } from 'lucide-react';

    export function PrivacyPolicyPage() {
      const policySections = [
        {
          title: "Information Collection",
          content: "We collect essential data like your IP address, browser type, and usage details of our Service. If you're using a mobile device, we may also collect related information."
        },
        {
          title: "Use of Cookies",
          content: "We use cookies and web beacons to store your preferences and gather usage data. You can disable cookies via your browser settings."
        },
        {
          title: "Use of Information",
          content: "We use your information to deliver services, manage your account, communicate with you, run promotions, and analyze usage."
        },
        {
          title: "Data Sharing",
          content: "Your information may be shared in specific cases—such as with service providers, business transfers, affiliates, or with your consent."
        },
        {
          title: "Data Security & Retention",
          content: "We strive to protect your data, though absolute security cannot be guaranteed. Data is retained only as long as necessary."
        },
        {
          title: "Your Rights",
          content: "You have the right to access, update, or delete your personal data. You can do this via your account or by contacting us."
        },
        {
          title: "Children’s Privacy",
          content: "Our Service is not intended for children under 13. If we unknowingly collect data from a child, we will delete it immediately."
        },
        {
          title: "Policy Updates",
          content: "This policy may be updated from time to time. Changes will be posted on our website."
        }
      ];

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
            <ShieldCheck className="h-16 w-16 mx-auto text-primary mb-4" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2 gradient-text">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">Last updated: May 14, 2025</p>
          </motion.div>

          <div className="max-w-3xl mx-auto bg-card p-8 md:p-10 rounded-xl shadow-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className="text-lg text-foreground mb-6">
                Toolzenix is committed to protecting your personal information and explaining how we use it.
              </p>
            </motion.div>

            {policySections.map((section, index) => (
              <motion.section
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="mb-6"
              >
                <h2 className="font-heading text-2xl font-semibold text-primary mb-3 flex items-center">
                  <FileText className="h-6 w-6 mr-2" /> {section.title}
                </h2>
                <p className="text-foreground/90 leading-relaxed">
                  {section.content}
                </p>
              </motion.section>
            ))}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + policySections.length * 0.1, duration: 0.5 }}
              className="mt-8 pt-6 border-t border-border"
            >
              <h2 className="font-heading text-2xl font-semibold text-primary mb-3 flex items-center">
                <Mail className="h-6 w-6 mr-2" /> Contact
              </h2>
              <p className="text-foreground/90 leading-relaxed">
                For any questions, contact us at: <a href="mailto:faisalmehmood0444@gmail.com" className="text-accent hover:underline">faisalmehmood0444@gmail.com</a>
              </p>
            </motion.section>
          </div>
        </motion.div>
      );
    }
  