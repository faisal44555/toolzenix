
    import React from 'react';
    import { motion } from 'framer-motion';
    import { UserCircle, Youtube, Rss } from 'lucide-react';

    export function AboutPage() {
      const articleContent = `Faisal Mehmood is a 32-year-old passionate blogger and YouTuber dedicated to creating engaging and informative content. With a knack for storytelling and a love for sharing knowledge, he connects with his audience through insightful blogs and captivating videos. Whether exploring new trends, offering practical tips, or diving into personal experiences, Faisal’s work reflects his creativity and commitment to inspiring others. Follow his journey as he continues to grow his digital presence and make an impact in the online world.`;

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
              About Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn more about the people and passion behind Toolzenix.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto bg-card p-8 md:p-12 rounded-xl shadow-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8"
            >
              <div className="flex-shrink-0">
                <img  
                  class="rounded-full h-40 w-40 md:h-48 md:w-48 object-cover border-4 border-primary shadow-lg" 
                  alt="Faisal Mehmood"
                 src="https://images.unsplash.com/photo-1505761809615-0e2a532be598" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="font-heading text-3xl font-semibold text-primary mb-2">
                  Faisal Mehmood
                </h2>
                <p className="text-muted-foreground text-lg mb-3">Passionate Blogger & YouTuber</p>
                <div className="flex justify-center md:justify-start space-x-3">
                  <a href="#" className="text-muted-foreground hover:text-red-600 transition-colors" aria-label="YouTube">
                    <Youtube className="h-7 w-7" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-orange-500 transition-colors" aria-label="Blog">
                    <Rss className="h-7 w-7" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-blue-500 transition-colors" aria-label="Personal Profile">
                    <UserCircle className="h-7 w-7" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 leading-relaxed"
            >
              {articleContent.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </motion.article>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10 pt-8 border-t border-border"
            >
              <h3 className="font-heading text-2xl font-semibold text-center mb-6">Our Mission at Toolzenix</h3>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto">
                At Toolzenix, we believe in simplifying technology. Our goal is to provide easy-to-use, reliable, and fast online converter tools for everyone. We're constantly working to expand our offerings and improve your experience. Thank you for choosing Toolzenix!
              </p>
            </motion.div>
          </div>
        </motion.div>
      );
    }
  