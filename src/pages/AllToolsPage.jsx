
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { ArrowRight } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { toolCategories } from '@/pages/HomePage'; 

    export function AllToolsPage() {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto py-12 px-4"
        >
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold mb-4 text-center gradient-text"
          >
            All Converter Tools
          </motion.h1>
          <motion.p 
             initial={{ y: -20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto"
          >
            Browse through our comprehensive collection of online converters. Find the perfect tool for your audio, video, document, image, and other conversion needs.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {toolCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 group overflow-hidden flex flex-col bg-card hover:bg-muted/20">
                  <CardHeader className="items-center text-center">
                    <div className={`p-4 rounded-full ${category.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="h-10 w-10" />
                    </div>
                    <CardTitle className="font-heading text-2xl">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center flex-grow flex flex-col justify-between">
                    <CardDescription className="text-base mb-6">{category.description}</CardDescription>
                    <Button asChild variant="default" className="mt-auto bg-primary hover:bg-primary/90 group-hover:bg-accent transition-colors">
                      <Link to={category.href}>
                        Go to {category.name.replace(' Converters', '')} <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    }
  