import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Settings2, Search, AlertTriangle, CheckCircle2, Eye } from 'lucide-react';

const MetaTagAnalyzer = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const { toast } = useToast();

  const analyzeMetaTags = () => {
    if (!htmlContent.trim()) {
      toast({ title: 'Input Empty', description: 'Please paste HTML content to analyze.', variant: 'destructive', action: <AlertTriangle /> });
      setAnalysis(null);
      return;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      
      const title = doc.querySelector('title')?.innerText || '';
      const metaDescriptionTag = doc.querySelector('meta[name="description"]');
      const description = metaDescriptionTag ? metaDescriptionTag.getAttribute('content') : '';
      
      const metaKeywordsTag = doc.querySelector('meta[name="keywords"]');
      const keywords = metaKeywordsTag ? metaKeywordsTag.getAttribute('content') : '';

      const openGraphTags = {};
      doc.querySelectorAll('meta[property^="og:"]').forEach(tag => {
        openGraphTags[tag.getAttribute('property')] = tag.getAttribute('content');
      });

      const twitterTags = {};
      doc.querySelectorAll('meta[name^="twitter:"]').forEach(tag => {
        twitterTags[tag.getAttribute('name')] = tag.getAttribute('content');
      });

      const canonicalTag = doc.querySelector('link[rel="canonical"]');
      const canonicalUrl = canonicalTag ? canonicalTag.getAttribute('href') : '';
      
      const robotsTag = doc.querySelector('meta[name="robots"]');
      const robotsContent = robotsTag ? robotsTag.getAttribute('content') : '';

      setAnalysis({
        title,
        description,
        keywords,
        openGraphTags,
        twitterTags,
        canonicalUrl,
        robotsContent,
      });
      toast({ title: 'Analysis Complete!', description: 'Meta tags extracted and displayed.', action: <CheckCircle2 className="text-green-500" /> });
    } catch (error) {
      toast({ title: 'Parsing Error', description: 'Could not parse the HTML content. Please ensure it is valid.', variant: 'destructive', action: <AlertTriangle /> });
      setAnalysis(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Meta Tag Analyzer | Toolzenix</title>
        <meta name="description" content="Analyze meta tags (title, description, keywords, Open Graph, Twitter Cards) by pasting HTML content. Preview how they might appear in search results." />
        <link rel="canonical" href="https://toolzenix.com/meta-tag-analyzer" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Settings2 className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Meta Tag Analyzer
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Paste your website's HTML content to analyze its meta tags and preview search appearance.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <Label htmlFor="html-input" className="text-lg font-medium text-gray-700 dark:text-gray-300">Paste HTML Content Here</Label>
            <Textarea
              id="html-input"
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              placeholder="<html><head><title>My Page</title>...</head><body>...</body></html>"
              className="mt-2 min-h-[200px] text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 font-mono"
              aria-label="HTML Content Input"
            />
          </div>
          
          <Button onClick={analyzeMetaTags} className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-lg py-3">
            <Search className="w-5 h-5 mr-2" /> Analyze Meta Tags
          </Button>

          {analysis && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6"
            >
              <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">Analysis Results</h2>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Search Engine Preview (Approximate)</h3>
                <div className="p-3 border border-gray-200 dark:border-gray-600 rounded">
                  <p className="text-blue-700 dark:text-blue-400 text-xl hover:underline truncate">{analysis.title || "No Title Found"}</p>
                  <p className="text-green-700 dark:text-green-400 text-sm truncate">{analysis.canonicalUrl || "No Canonical URL"}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {analysis.description ? (analysis.description.length > 160 ? analysis.description.substring(0, 157) + "..." : analysis.description) : "No meta description found."}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200">Title Tag:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 break-words">{analysis.title || "Not found"}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Length: {analysis.title.length} characters</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200">Meta Description:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 break-words">{analysis.description || "Not found"}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Length: {analysis.description.length} characters</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200">Meta Keywords:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 break-words">{analysis.keywords || "Not found"}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200">Canonical URL:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 break-words">{analysis.canonicalUrl || "Not found"}</p>
                </div>
                 <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200">Robots Meta Tag:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 break-words">{analysis.robotsContent || "Not found"}</p>
                </div>
              </div>

              {Object.keys(analysis.openGraphTags).length > 0 && (
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Open Graph Tags:</h4>
                  {Object.entries(analysis.openGraphTags).map(([key, value]) => (
                    <p key={key} className="text-xs text-gray-600 dark:text-gray-300 break-words"><strong>{key}:</strong> {value}</p>
                  ))}
                </div>
              )}
              {Object.keys(analysis.twitterTags).length > 0 && (
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Twitter Card Tags:</h4>
                  {Object.entries(analysis.twitterTags).map(([key, value]) => (
                    <p key={key} className="text-xs text-gray-600 dark:text-gray-300 break-words"><strong>{key}:</strong> {value}</p>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">About Meta Tag Analyzer</h2>
          <p>
            This tool helps you extract and review the key meta tags from a webpage's HTML. Meta tags provide information about your page to search engines and social media platforms.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Title Tag:</strong> Crucial for SEO, appears as the main headline in search results.</li>
            <li><strong>Meta Description:</strong> A brief summary of the page content, shown below the title in search results.</li>
            <li><strong>Meta Keywords:</strong> Less important for modern SEO, but sometimes still used.</li>
            <li><strong>Open Graph & Twitter Cards:</strong> Control how your content appears when shared on social media.</li>
            <li><strong>Canonical URL:</strong> Tells search engines the preferred version of a page if duplicate content exists.</li>
            <li><strong>Robots Meta Tag:</strong> Instructs search engine crawlers on how to index or treat a page.</li>
          </ul>
          <p><strong>Note:</strong> This tool analyzes pasted HTML content. It does not fetch content from a live URL due to browser security restrictions (CORS). For live URL analysis, server-side tools are typically required.</p>
        </motion.div>
      </div>
    </>
  );
};

export default MetaTagAnalyzer;