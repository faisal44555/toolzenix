
    import React from 'react';
    import { useParams, Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { ArrowLeft, Search } from 'lucide-react';
    import { Input } from '@/components/ui/input';
    import { motion } from 'framer-motion';
    import { allToolsData } from '@/lib/toolsData.jsx';
    import { NotFoundPage } from '@/pages/NotFoundPage';

    export function ToolCategoryPage() {
      const { categoryId } = useParams();
      const category = allToolsData[categoryId];
      const [searchTerm, setSearchTerm] = React.useState('');

      if (!category) {
        return <NotFoundPage message={`Category "${categoryId}" not found.`} />;
      }

      const filteredTools = category.tools.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tool.description && tool.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto py-8 px-4 min-h-[calc(100vh-10rem)]"
        >
          <Button variant="outline" asChild className="mb-6 hover:bg-muted/50 transition-colors">
            <Link to="/tools"><ArrowLeft className="mr-2 h-4 w-4" /> Back to All Categories</Link>
          </Button>
          
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-10"
          >
            <div className={`inline-block p-4 rounded-full ${category.color || 'bg-primary'} text-white mb-4`}>
              {category.icon && <category.icon className="h-10 w-10" />}
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2 gradient-text">{category.name}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Browse and select from the available {category.name.toLowerCase()}. 
              Use the search below to quickly find a specific tool.
            </p>
          </motion.div>
          
          <div className="mb-8 flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <Input 
                type="search" 
                placeholder={`Search in ${category.name}...`} 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"/>
            </div>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card hover:bg-muted/20">
                    <CardHeader>
                      <CardTitle className="font-heading text-xl">{tool.name}</CardTitle>
                      <CardDescription className="text-sm h-10 overflow-hidden">
                        {tool.description || `Use the ${tool.name} tool for your conversion needs.`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <Button asChild className="w-full bg-primary hover:bg-primary/90">
                        <Link to={`/tool/${categoryId}/${tool.id}`}>Use Tool</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-center py-10 text-lg"
            >
              No tools found matching "{searchTerm}" in {category.name}.
            </motion.p>
          )}
        </motion.div>
      );
    }
  