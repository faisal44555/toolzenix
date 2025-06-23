import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Link2, Copy, Settings, AlertTriangle, CheckCircle2 } from 'lucide-react';

const UtmLinkGenerator = () => {
  const [baseUrl, setBaseUrl] = useState('');
  const [campaignSource, setCampaignSource] = useState('');
  const [campaignMedium, setCampaignMedium] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [campaignTerm, setCampaignTerm] = useState('');
  const [campaignContent, setCampaignContent] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (!baseUrl) {
      setGeneratedUrl('');
      return;
    }

    try {
      const url = new URL(baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`);
      
      if (campaignSource) url.searchParams.set('utm_source', campaignSource);
      if (campaignMedium) url.searchParams.set('utm_medium', campaignMedium);
      if (campaignName) url.searchParams.set('utm_campaign', campaignName);
      if (campaignTerm) url.searchParams.set('utm_term', campaignTerm);
      if (campaignContent) url.searchParams.set('utm_content', campaignContent);
      
      setGeneratedUrl(url.toString());
    } catch (error) {
      // Silently fail or show a small indicator, main validation on generate button
      setGeneratedUrl('Invalid base URL');
    }
  }, [baseUrl, campaignSource, campaignMedium, campaignName, campaignTerm, campaignContent]);

  const handleGenerateAndCopy = () => {
    if (!baseUrl.trim()) {
      toast({ title: 'Base URL Required', description: 'Please enter a valid website URL.', variant: 'destructive', action: <AlertTriangle /> });
      return;
    }
    if (!campaignSource.trim() && !campaignMedium.trim() && !campaignName.trim()) {
        toast({ title: 'Campaign Info Missing', description: 'At least one of utm_source, utm_medium, or utm_campaign is recommended.', variant: 'default' });
    }

    try {
      new URL(baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`); // Validate base URL
      if (generatedUrl && generatedUrl !== 'Invalid base URL') {
        navigator.clipboard.writeText(generatedUrl)
          .then(() => toast({ title: 'URL Copied!', description: 'UTM link copied to clipboard.', action: <CheckCircle2 className="text-green-500" /> }))
          .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
      } else {
        toast({ title: 'Generation Failed', description: 'Could not generate URL. Check base URL.', variant: 'destructive', action: <AlertTriangle /> });
      }
    } catch (error) {
       toast({ title: 'Invalid Base URL', description: 'Please enter a valid website URL (e.g., https://example.com).', variant: 'destructive', action: <AlertTriangle /> });
    }
  };

  return (
    <>
      <Helmet>
        <title>UTM Link Generator | Toolzenix</title>
        <meta name="description" content="Easily create UTM-tagged URLs for your marketing campaigns to track their performance in Google Analytics and other analytics platforms." />
        <link rel="canonical" href="https://toolzenix.com/utm-link-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link2 className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            UTM Link Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Create custom campaign URLs with UTM parameters for precise tracking.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            <div>
              <Label htmlFor="base-url" className="text-md font-medium text-gray-700 dark:text-gray-300">Website URL (Required)</Label>
              <Input id="base-url" type="url" value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} placeholder="https://www.example.com" className="mt-1 text-lg p-3 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="campaign-source" className="text-md font-medium text-gray-700 dark:text-gray-300">Campaign Source (utm_source)</Label>
                <Input id="campaign-source" value={campaignSource} onChange={(e) => setCampaignSource(e.target.value)} placeholder="e.g., google, newsletter" className="mt-1 p-2.5 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
              <div>
                <Label htmlFor="campaign-medium" className="text-md font-medium text-gray-700 dark:text-gray-300">Campaign Medium (utm_medium)</Label>
                <Input id="campaign-medium" value={campaignMedium} onChange={(e) => setCampaignMedium(e.target.value)} placeholder="e.g., cpc, email" className="mt-1 p-2.5 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
              <div>
                <Label htmlFor="campaign-name" className="text-md font-medium text-gray-700 dark:text-gray-300">Campaign Name (utm_campaign)</Label>
                <Input id="campaign-name" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} placeholder="e.g., spring_sale" className="mt-1 p-2.5 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
              <div>
                <Label htmlFor="campaign-term" className="text-md font-medium text-gray-700 dark:text-gray-300">Campaign Term (utm_term)</Label>
                <Input id="campaign-term" value={campaignTerm} onChange={(e) => setCampaignTerm(e.target.value)} placeholder="e.g., running+shoes (for paid keywords)" className="mt-1 p-2.5 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="campaign-content" className="text-md font-medium text-gray-700 dark:text-gray-300">Campaign Content (utm_content)</Label>
                <Input id="campaign-content" value={campaignContent} onChange={(e) => setCampaignContent(e.target.value)} placeholder="e.g., logolink, textlink (A/B testing)" className="mt-1 p-2.5 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
            </div>
            
            {generatedUrl && (
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Label className="text-md font-medium text-gray-700 dark:text-gray-300">Generated UTM Link:</Label>
                <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md text-sm text-gray-800 dark:text-gray-200 break-all">
                  {generatedUrl === 'Invalid base URL' ? <span className="text-red-500">{generatedUrl}</span> : generatedUrl}
                </div>
              </div>
            )}

            <Button onClick={handleGenerateAndCopy} className="w-full mt-6 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white text-lg py-3">
              <Copy className="w-5 h-5 mr-2" /> Generate & Copy Link
            </Button>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">What are UTM Parameters?</h2>
          <p>
            UTM (Urchin Tracking Module) parameters are short text codes added to URLs to help track the effectiveness of online marketing campaigns. They allow analytics tools like Google Analytics to identify where your traffic is coming from.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>utm_source:</strong> Identifies the advertiser, site, publication, etc. (e.g., google, facebook).</li>
            <li><strong>utm_medium:</strong> The advertising or marketing medium (e.g., cpc, banner, email).</li>
            <li><strong>utm_campaign:</strong> The specific product promotion or strategic campaign (e.g., summer_sale).</li>
            <li><strong>utm_term:</strong> Identify paid search keywords.</li>
            <li><strong>utm_content:</strong> Used to differentiate similar content, or links within the same ad. For example, if you have two call-to-action links within the same email message.</li>
          </ul>
          <p>Using UTM parameters consistently helps you understand which campaigns drive the most traffic and conversions.</p>
        </motion.div>
      </div>
    </>
  );
};

export default UtmLinkGenerator;