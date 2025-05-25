
    import React from 'react';
    import { motion } from 'framer-motion';
    import { CalendarDays, User, Tag } from 'lucide-react';

    export function BlogPage() {
      const blogTitle = "Toolzenix.com – Your Ultimate Online File Converter Hub";
      const blogContent = [
        "In today’s fast-paced digital world, efficiency matters. Whether you're a student, a professional, or a casual user, converting files from one format to another can be a daily necessity. That's where Toolzenix.com comes in — your one-stop destination for quick, reliable, and free file conversions.",
        "What is Toolzenix?",
        "Toolzenix.com is an all-in-one online tool that allows you to convert a wide variety of file formats easily and securely. Whether you need to convert an audio file, a video, an image, or even a document, Toolzenix has got you covered with a powerful suite of online converters — no software installation required.",
        "Key Features",
        "Audio Converters: Convert MP3, WAV, AAC, and other audio formats in seconds.",
        "Video Converters: Change video formats like MP4, AVI, MOV, and more with just a few clicks.",
        "Image Converters: Convert JPEG, PNG, SVG, and other image formats while preserving quality.",
        "Document Converters: Turn DOCX into PDF, Excel into CSV, and handle dozens of document formats with ease.",
        "More Tools Coming Soon: Toolzenix is constantly evolving, with more tools being added regularly for maximum versatility.",
        "Why Choose Toolzenix?",
        "Free & Fast: All tools are completely free and optimized for speed.",
        "User-Friendly: Clean, intuitive interface designed for all users.",
        "No Signup Required: Start converting right away — no account needed.",
        "Safe & Secure: Your data is handled with utmost privacy and automatically deleted after processing.",
        "How It Works",
        "1. Choose the type of conversion you need.",
        "2. Upload your file.",
        "3. Click “Convert” and download the result.",
        "It’s that simple!",
        "Conclusion",
        "Toolzenix.com is designed to make file conversion as simple and hassle-free as possible. Whether you're working from a PC, tablet, or mobile device, Toolzenix gives you the tools you need to convert files quickly, accurately, and safely — anytime, anywhere."
      ];

      const subheadings = [
        "What is Toolzenix?",
        "Key Features",
        "Why Choose Toolzenix?",
        "How It Works",
        "Conclusion"
      ];

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto py-12 px-4 min-h-[calc(100vh-10rem)]"
        >
          <article className="max-w-3xl mx-auto bg-card p-8 md:p-12 rounded-xl shadow-2xl">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 gradient-text">
                {blogTitle}
              </h1>
              <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-8 gap-x-4 gap-y-2">
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1.5" />
                  <span>Published: May 14, 2025</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1.5" />
                  <span>By: Toolzenix Team</span>
                </div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1.5" />
                  <span>Category: Announcements</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="aspect-video rounded-lg overflow-hidden mb-8 shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <img  class="w-full h-full object-cover" alt="Abstract representation of file conversion or digital tools" src="https://images.unsplash.com/photo-1657885428182-32c8f28fb3e3" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 leading-relaxed"
            >
              {blogContent.map((paragraph, index) => {
                if (subheadings.includes(paragraph)) {
                  return <h2 key={index} className="font-heading text-2xl font-semibold text-primary mt-8 mb-3">{paragraph}</h2>;
                }
                if (paragraph.match(/^\d+\./)) { // Numbered list for "How It Works"
                  return <p key={index} className="ml-4 mb-1">{paragraph}</p>;
                }
                return <p key={index} className="mb-4">{paragraph}</p>;
              })}
            </motion.div>
          </article>
        </motion.div>
      );
    }
  