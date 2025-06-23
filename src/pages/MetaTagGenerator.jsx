import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tag, FileCode, Copy } from 'lucide-react';

const MetaTagGenerator = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [viewport, setViewport] = useState('width=device-width, initial-scale=1.0');
  const [charset, setCharset] = useState('UTF-8');
  const [generatedTags, setGeneratedTags] = useState('');
  const { toast } = useToast();

  const generateMetaTags = () => {
    if (!title || !description) {
      toast({
        title: 'Missing Information',
        description: 'Title and Description are required to generate meta tags.',
        variant: 'destructive',
      });
      return;
    }

    let tags = `<meta charset="${charset}">\n`;
    tags += `<meta name="viewport" content="${viewport}">\n`;
    tags += `<title>${title}</title>\n`;
    tags += `<meta name="description" content="${description}">\n`;
    if (keywords) {
      tags += `<meta name="keywords" content="${keywords}">\n`;
    }
    if (author) {
      tags += `<meta name="author" content="${author}">\n`;
    }
    // Basic Open Graph tags
    tags += `<meta property="og:title" content="${title}">\n`;
    tags += `<meta property="og:description" content="${description}">\n`;
    tags += `<meta property="og:type" content="website">\n`;
    // Basic Twitter Card tags
    tags += `<meta name="twitter:card" content="summary_large_image">\n`; // or summary
    tags += `<meta name="twitter:title" content="${title}">\n`;
    tags += `<meta name="twitter:description" content="${description}">\n`;

    setGeneratedTags(tags);
    toast({ title: 'Meta Tags Generated!', description: 'Copy the tags to your website\'s <head> section.' });
  };

  const copyToClipboard = () => {
    if (!generatedTags) {
      toast({ title: 'Nothing to Copy', description: 'Generate meta tags first.', variant: 'destructive' });
      return;
    }
    navigator.clipboard.writeText(generatedTags)
      .then(() => toast({ title: 'Copied to Clipboard!', description: 'Meta tags are ready to be pasted.' }))
      .catch(() => toast({ title: 'Copy Failed', description: 'Could not copy tags. Please try manually.', variant: 'destructive' }));
  };

  return (
    <>
      <Helmet>
        <title>Meta Tag Generator - SEO Meta Tags | Toolzenix</title>
        <meta name="description" content="Generate essential HTML meta tags (title, description, keywords, Open Graph, Twitter Cards) for your website to improve SEO and social sharing." />
        <link rel="canonical" href="https://toolzenix.com/meta-tag-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Tag className="w-16 h-16 text-cyan-500 dark:text-cyan-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Meta Tag Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Create essential meta tags for better SEO and social media presence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <Label htmlFor="title-mtg" className="text-gray-700 dark:text-gray-300">Website Title (Required)</Label>
            <Input id="title-mtg" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your Awesome Website Title" className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Optimal length: 50-60 characters.</p>
          </div>
          <div>
            <Label htmlFor="description-mtg" className="text-gray-700 dark:text-gray-300">Meta Description (Required)</Label>
            <Textarea id="description-mtg" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A concise and compelling description of your website." className="dark:bg-gray-700 dark:text-white dark:border-gray-600" rows={3}/>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Optimal length: 150-160 characters.</p>
          </div>
          <div>
            <Label htmlFor="keywords-mtg" className="text-gray-700 dark:text-gray-300">Meta Keywords (Comma-separated)</Label>
            <Input id="keywords-mtg" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="keyword1, keyword2, keyword3" className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="author-mtg" className="text-gray-700 dark:text-gray-300">Author</Label>
              <Input id="author-mtg" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your Name or Company" className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
            <div>
              <Label htmlFor="charset-mtg" className="text-gray-700 dark:text-gray-300">Charset</Label>
              <Input id="charset-mtg" value={charset} onChange={(e) => setCharset(e.target.value)} className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
          </div>
          <div>
            <Label htmlFor="viewport-mtg" className="text-gray-700 dark:text-gray-300">Viewport</Label>
            <Input id="viewport-mtg" value={viewport} onChange={(e) => setViewport(e.target.value)} className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
          
          <Button onClick={generateMetaTags} className="w-full bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white py-3 text-lg flex items-center justify-center">
            <FileCode className="w-5 h-5 mr-2" /> Generate Meta Tags
          </Button>

          {generatedTags && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Generated HTML Meta Tags</h3>
                <Button variant="outline" size="sm" onClick={copyToClipboard} className="dark:text-cyan-400 dark:border-cyan-400 dark:hover:bg-cyan-400/10">
                  <Copy className="w-4 h-4 mr-2" /> Copy Tags
                </Button>
              </div>
              <Textarea
                readOnly
                value={generatedTags}
                className="w-full h-52 font-mono text-sm bg-gray-50 dark:bg-gray-900 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                aria-label="Generated meta tags"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Copy these tags and paste them into the <code>&lt;head&gt;</code> section of your HTML document.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default MetaTagGenerator;