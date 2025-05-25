
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { ArrowRight, Zap } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { allToolsData } from '@/lib/toolsData.jsx';

    export const toolCategories = Object.entries(allToolsData).map(([id, data]) => ({
      id,
      name: data.name,
      icon: data.icon,
      description: `Explore ${data.tools.length} ${data.name.toLowerCase()}.`,
      href: `/tools/${id}`,
      color: data.color || 'bg-gray-500'
    }));

    export function HomePage() {
      return (
        <div className="flex flex-col items-center">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full py-20 md:py-32 bg-gradient-to-br from-background to-muted/30"
          >
            <div className="container mx-auto text-center px-4">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              >
                <span className="gradient-text">All-in-One</span> Online Converter Tools
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl"
              >
                Effortlessly convert files between various formats. Fast, secure, and user-friendly tools for all your conversion needs at Toolzenix.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-x-4"
              >
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <Link to="/tools">
                    Explore Tools <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <Link to="/features">
                    Learn More <Zap className="ml-2 h-5 w-5 text-accent" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="w-full py-16 md:py-24"
            id="categories"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-center font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Our Tool Categories
              </h2>
              <p className="mt-4 text-center text-lg text-muted-foreground max-w-xl mx-auto">
                Discover a wide range of converters organized for your convenience.
              </p>
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {toolCategories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index + 0.7, ease: "easeOut" }}
                  >
                    <Card className="h-full hover:shadow-xl transition-shadow duration-300 group overflow-hidden flex flex-col">
                      <CardHeader className="items-center text-center">
                        <div className={`p-3 rounded-full ${category.color} text-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
                          <category.icon className="h-8 w-8" />
                        </div>
                        <CardTitle className="font-heading text-xl">{category.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center flex-grow flex flex-col justify-between">
                        <CardDescription>{category.description}</CardDescription>
                        <Button asChild variant="link" className="mt-4 text-primary group-hover:underline">
                          <Link to={category.href}>
                            View Tools <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            className="w-full py-16 md:py-24 bg-muted/30"
          >
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                Join thousands of users who trust Toolzenix for their daily conversion tasks.
              </p>
              <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Link to="/tools">
                  Start Converting Now <Zap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.section>
        </div>
      );
    }
  