
    import React from 'react';
    import { motion } from 'framer-motion';
    import { CheckCircle, Zap, ShieldCheck, Layers, UploadCloud, Users } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Link } from 'react-router-dom';

    const features = [
      {
        icon: Layers,
        title: 'Wide Range of Formats',
        description: 'Support for hundreds of file formats across audio, video, document, image, ebook, and more categories.',
        color: 'text-blue-500',
      },
      {
        icon: Zap,
        title: 'Fast & Efficient Conversions',
        description: 'Our tools are optimized for speed, ensuring your files are converted quickly without compromising quality.',
        color: 'text-purple-500',
      },
      {
        icon: UploadCloud,
        title: 'Easy-to-Use Interface',
        description: 'A simple, intuitive drag-and-drop interface makes converting files a breeze for everyone.',
        color: 'text-amber-500',
      },
      {
        icon: ShieldCheck,
        title: 'Secure & Private',
        description: 'We prioritize your privacy. Files are processed securely and typically removed from our servers after conversion.',
        color: 'text-green-500',
      },
      {
        icon: Users,
        title: 'No Registration Required',
        description: 'Most of our tools are available for free without needing an account. Convert files hassle-free.',
        color: 'text-rose-500',
      },
      {
        icon: CheckCircle,
        title: 'High-Quality Output',
        description: 'Maintain the quality of your original files with our advanced conversion algorithms.',
        color: 'text-teal-500',
      },
    ];

    export function FeaturesPage() {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto py-12 px-4"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Why Choose ToolVerse?
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover the powerful features that make ToolVerse your go-to solution for all file conversion needs. We're dedicated to providing a seamless, secure, and comprehensive converting experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.2 }}
                className="bg-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center"
              >
                <feature.icon className={`h-16 w-16 mb-6 ${feature.color}`} />
                <h3 className="font-heading text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl font-bold mb-6">
              Ready to Experience the Difference?
            </h2>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform">
              <Link to="/tools">
                Explore All Tools <Layers className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      );
    }
  