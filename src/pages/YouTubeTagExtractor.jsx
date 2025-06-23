import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Youtube, Tags, Copy, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';

const YouTubeTagExtractor = () => {
  const [videoInfo, setVideoInfo] = useState(''); // User pastes video title, description, or existing tags
  const [extractedTags, setExtractedTags] = useState([]);
  const { toast } = useToast();

  // Basic stop words list, can be expanded
  const stopWords = new Set([
    "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "he", "in", "is", "it", "its", "of", "on", "that", "the", "to", "was", "were", "will", "with",
    "how", "to", "tutorial", "guide", "video", "watch", "new", "best", "top", "review", "channel", "subscribe", "like", "comment", "share", "playlist", "episode", "series",
    "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "this", "these", "those", "what", "which", "who", "whom"
  ]);

  const extractTags = () => {
    if (!videoInfo.trim()) {
      toast({ title: "No Content", description: "Please paste video title, description, or existing tags.", variant: "destructive", action: <AlertTriangle /> });
      return;
    }

    // Combine title, description, and any comma/newline separated tags
    const combinedText = videoInfo
      .toLowerCase()
      .replace(/<[^>]+>/g, ' ') // Remove HTML tags if any
      .replace(/[^\w\s'-]|_/g, " ") // Remove punctuation except apostrophes and hyphens
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .replace(/,/g, ' '); // Replace commas with spaces

    const words = combinedText.split(/\s+/);
    const potentialTags = new Set();
    const wordFrequencies = {};

    // Single and two-word phrases
    for (let i = 0; i < words.length; i++) {
      const word1 = words[i].replace(/^['-]|['-]$/g, "");
      if (word1.length > 2 && !stopWords.has(word1) && isNaN(word1)) {
        potentialTags.add(word1);
        wordFrequencies[word1] = (wordFrequencies[word1] || 0) + 1;
      }
      if (i + 1 < words.length) {
        const word2 = words[i+1].replace(/^['-]|['-]$/g, "");
        if (word1.length > 1 && word2.length > 1 && !stopWords.has(word1) && !stopWords.has(word2) && (isNaN(word1) || isNaN(word2))) {
          const twoWordPhrase = `${word1} ${word2}`;
          if (twoWordPhrase.length < 50) { // YouTube tag length limit
             potentialTags.add(twoWordPhrase);
             wordFrequencies[twoWordPhrase] = (wordFrequencies[twoWordPhrase] || 0) + 1;
          }
        }
      }
    }
    
    // Add existing comma/newline separated tags directly if they were part of input
    videoInfo.split(/[\n,]+/).forEach(tag => {
        const cleanTag = tag.trim().toLowerCase();
        if (cleanTag.length > 1 && cleanTag.length < 50 && !potentialTags.has(cleanTag)) {
            potentialTags.add(cleanTag);
            wordFrequencies[cleanTag] = (wordFrequencies[cleanTag] || 0) + 1; // Give them a base frequency
        }
    });


    const sortedTags = Array.from(potentialTags)
      .map(tag => ({ tag, count: wordFrequencies[tag] || 1 }))
      .sort((a, b) => b.count - a.count) // Sort by frequency
      .slice(0, 25) // Suggest up to 25 tags
      .map(item => item.tag);

    setExtractedTags(sortedTags);
    if (sortedTags.length > 0) {
      toast({ title: "Tags Extracted!", description: `${sortedTags.length} potential tags found.`, action: <CheckCircle2 className="text-green-500" /> });
    } else {
      toast({ title: "No Significant Tags", description: "Try adding more descriptive content.", variant: "default" });
    }
  };

  const handleCopyToClipboard = () => {
    const tagsText = extractedTags.join(', ');
    if (!tagsText) {
      toast({ title: "Nothing to Copy", variant: "destructive" });
      return;
    }
    navigator.clipboard.writeText(tagsText)
      .then(() => toast({ title: "Copied!", description: "Tags copied to clipboard (comma-separated)." }))
      .catch(() => toast({ title: "Copy Failed", variant: "destructive" }));
  };
  
  const handleClear = () => {
    setVideoInfo('');
    setExtractedTags([]);
    toast({ title: 'Cleared!', description: 'Input and results cleared.' });
  };

  return (
    <>
      <Helmet>
        <title>YouTube Tag Extractor | Toolzenix Social Media Tools</title>
        <meta name="description" content="Extract relevant YouTube video tags by pasting video title, description, or existing tags. Get suggestions to improve video discoverability." />
        <link rel="canonical" href="https://toolzenix.com/youtube-tag-extractor" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Youtube className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            YouTube Tag Extractor
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
            Paste video title, description, or current tags to get tag suggestions.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <Label htmlFor="video-info-input" className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Paste Video Info (Title, Description, Existing Tags)
            </Label>
            <Textarea
              id="video-info-input"
              value={videoInfo}
              onChange={(e) => setVideoInfo(e.target.value)}
              placeholder="e.g., My Awesome Video Title\nThis video is about awesome things...\nTags: awesome, video, cool"
              className="mt-2 min-h-[150px] text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={extractTags} className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white text-lg py-3">
              <Tags className="w-5 h-5 mr-2" /> Extract Tags
            </Button>
             <Button onClick={handleClear} variant="outline" className="flex-1 text-lg py-3 border-gray-300 dark:border-gray-500 dark:text-gray-300">
              <Trash2 className="w-4 h-4 mr-2" /> Clear
            </Button>
          </div>

          {extractedTags.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Suggested Tags:</h2>
                <Button variant="ghost" size="sm" onClick={handleCopyToClipboard} className="text-red-600 dark:text-red-400">
                  <Copy className="w-4 h-4 mr-1.5" /> Copy All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {extractedTags.map((tag, index) => (
                  <span key={index} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 rounded-full shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">How This Tool Works</h2>
          <p>
            This tool helps you identify potential tags for your YouTube videos based on the text content you provide (like title, description, or even a list of competitor tags). It analyzes word and phrase frequencies to suggest relevant terms.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>It does NOT fetch data directly from YouTube URLs due to browser security restrictions (CORS).</li>
            <li>The quality of suggestions depends on the richness of the text you input.</li>
            <li>It filters out common "stop words" and prioritizes more unique terms and phrases.</li>
            <li>Aim for a mix of broad and specific tags for best discoverability.</li>
          </ul>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center"><AlertTriangle size={16} className="mr-2"/> This tool is for idea generation. Always review and refine tags to ensure they accurately represent your video content and comply with YouTube's policies.</p>
        </motion.div>
      </div>
    </>
  );
};

export default YouTubeTagExtractor;