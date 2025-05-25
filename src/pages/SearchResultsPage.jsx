
    import React, { useMemo } from 'react';
    import { Link, useSearchParams } from 'react-router-dom';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { ArrowRight, SearchX } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { toolCategories } from '@/pages/HomePage'; 
    import { allToolsData } from '@/lib/toolsData.jsx'; 

    export function SearchResultsPage() {
      const [searchParams] = useSearchParams();
      const query = searchParams.get('q')?.toLowerCase() || '';

      const searchResults = useMemo(() => {
        if (!query) return [];
        
        const results = [];
        
        toolCategories.forEach(category => {
          if (category.name.toLowerCase().includes(query) || category.description.toLowerCase().includes(query)) {
            results.push({ type: 'category', ...category });
          }
        });

        Object.entries(allToolsData).forEach(([categoryKey, categoryDetails]) => {
          categoryDetails.tools.forEach(tool => {
            const fullToolName = tool.name.toLowerCase();
            if (fullToolName.includes(query) || tool.description.toLowerCase().includes(query) || categoryDetails.name.toLowerCase().includes(query)) {
              // Avoid duplicate tools if category also matched
              if (!results.find(r => r.type === 'tool' && r.id === tool.id && r.categoryKey === categoryKey)) {
                results.push({ 
                  type: 'tool', 
                  ...tool, 
                  categoryKey, 
                  categoryName: categoryDetails.name, 
                  categoryHref: `/tools/${categoryKey}`,
                  toolHref: `/tool/${categoryKey}/${tool.id}`,
                  Icon: toolCategories.find(c => c.id === categoryKey)?.icon || SearchX // Fallback icon
                });
              }
            }
          });
        });
        
        const uniqueResults = [];
        const seenHrefs = new Set();
        for (const res of results) {
            const key = res.type === 'category' ? res.href : res.toolHref;
            if (!seenHrefs.has(key)) {
                uniqueResults.push(res);
                seenHrefs.add(key);
            }
        }
        return uniqueResults;

      }, [query]);

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto py-12 px-4 min-h-[calc(100vh-16rem)]"
        >
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center"
          >
            Search Results for: "<span className="gradient-text">{query}</span>"
          </motion.h1>
          
          {searchResults.length > 0 ? (
            <>
            <p className="text-lg text-muted-foreground mb-10 text-center">
              Found {searchResults.length} matching {searchResults.length === 1 ? 'tool or category' : 'tools and categories'}.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((item, index) => (
                <motion.div
                  key={item.type === 'category' ? item.href : item.toolHref}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 * index + 0.2 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300 group overflow-hidden flex flex-col bg-card hover:bg-muted/20">
                    <CardHeader>
                      {item.type === 'category' ? (
                        <>
                         <div className={`mx-auto p-3 rounded-full ${item.color || 'bg-primary'} text-white mb-3 group-hover:scale-110 transition-transform duration-300 w-fit`}>
                            <item.icon className="h-8 w-8" />
                          </div>
                          <CardTitle className="font-heading text-xl text-center">{item.name}</CardTitle>
                        </>
                      ) : (
                        <>
                          <div className={`mx-auto p-3 rounded-full ${toolCategories.find(c => c.id === item.categoryKey)?.color || 'bg-primary'} text-white mb-3 group-hover:scale-110 transition-transform duration-300 w-fit`}>
                            <item.Icon className="h-8 w-8" />
                          </div>
                          <CardTitle className="font-heading text-xl text-center">{item.name}</CardTitle>
                          <CardDescription className="text-center text-sm">In: {item.categoryName}</CardDescription>
                        </>
                      )}
                    </CardHeader>
                    <CardContent className="text-center flex-grow flex flex-col justify-between">
                      <CardDescription className="mb-4">{item.description}</CardDescription>
                      <Button asChild variant="link" className="mt-auto text-primary group-hover:underline">
                        <Link to={item.type === 'category' ? item.href : item.toolHref}>
                          {item.type === 'category' ? 'View Category' : 'Go to Tool'} <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y:20 }}
              animate={{ opacity: 1, y:0 }}
              transition={{ delay: 0.2 }}
              className="text-center py-10"
            >
              <SearchX className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
              <h2 className="text-2xl font-semibold mb-2">No Results Found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find any tools or categories matching your search for "{query}".
              </p>
              <div className="space-x-4">
                <Button asChild variant="default">
                  <Link to="/tools">Browse All Tools</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/">Back to Home</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      );
    }
  