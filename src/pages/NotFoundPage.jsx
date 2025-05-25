
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { AlertTriangle } from 'lucide-react';
    import { motion } from 'framer-motion';

    export function NotFoundPage() {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4"
        >
          <AlertTriangle className="h-24 w-24 text-destructive mb-6" />
          <h1 className="font-heading text-5xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't seem to exist.
          </p>
          <Button asChild size="lg">
            <Link to="/">Go Back to Homepage</Link>
          </Button>
        </motion.div>
      );
    }
  