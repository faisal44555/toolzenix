import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Twitter, MessageSquare, RefreshCw, Copy, CheckCircle2, AlertTriangle } from 'lucide-react';

const tweetTemplates = [
  "Just discovered {topic}! Mind blown. 🤯 #FutureTech #{keyword}",
  "Thinking about {topic}... What are your thoughts? 🤔 #{keyword} #Discussion",
  "Quick tip for anyone working with {topic}: {tip}. You're welcome! 😉 #{keyword} #ProTip",
  "Excited to share my latest project on {topic}! Check it out: [Link] 🚀 #{keyword} #Innovation",
  "Learning so much about {topic} today. It's fascinating! 📚 #{keyword} #EdTech",
  "Can't get enough of {topic}! What's your favorite part? 👇 #{keyword} #Community",
  "Hot take: {topic} is the next big thing. Agree or disagree? 🔥 #{keyword} #Debate",
  "My #MondayMotivation is all about {topic}! Let's crush this week. 💪 #{keyword}",
  "Deep dive into {topic} this weekend. Any recommendations? 🧐 #{keyword} #Research",
  "Sharing some insights on {topic}. Hope this helps someone! ✨ #{keyword} #KnowledgeSharing"
];

const placeholders = {
  tip: ["always double-check your sources", "start small and iterate", "focus on user experience", "don't forget to backup", "collaborate with others"],
  keyword: ["Tech", "Marketing", "Design", "WebDev", "AI", "Crypto", "SaaS", "Startup", "Productivity"]
};

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const TWITTER_MAX_CHARS = 280;

const TweetGenerator = () => {
  const [topic, setTopic] = useState('');
  const [generatedTweets, setGeneratedTweets] = useState([]);
  const { toast } = useToast();

  const generateTweets = (count = 3) => {
    if (!topic.trim()) {
      toast({ title: "Topic Required", description: "Please enter a topic or keyword for your tweets.", variant: "destructive", action: <AlertTriangle /> });
      return;
    }

    const newTweets = [];
    const usedTemplates = new Set();

    for (let i = 0; i < count; i++) {
      let template;
      let attempts = 0;
      do {
        template = getRandomElement(tweetTemplates);
        attempts++;
      } while (usedTemplates.has(template) && attempts < tweetTemplates.length);
      usedTemplates.add(template);

      let tweet = template.replace(/{topic}/g, topic.trim());
      Object.keys(placeholders).forEach(placeholderKey => {
        const regex = new RegExp(`{${placeholderKey}}`, 'g');
        if (tweet.match(regex)) {
          tweet = tweet.replace(regex, getRandomElement(placeholders[placeholderKey]));
        }
      });
      
      // Ensure tweet is within character limit (approximate, as links shorten)
      if (tweet.length > TWITTER_MAX_CHARS - 25) { // Leave room for a typical t.co link
        tweet = tweet.substring(0, TWITTER_MAX_CHARS - 28) + "..."; 
      }
      newTweets.push(tweet);
    }
    setGeneratedTweets(newTweets);
    toast({ title: "Tweets Generated!", description: `${count} new tweet ideas ready.`, action: <CheckCircle2 className="text-green-500" /> });
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: "Copied!", description: "Tweet copied to clipboard." }))
      .catch(() => toast({ title: "Copy Failed", variant: "destructive" }));
  };

  return (
    <>
      <Helmet>
        <title>Tweet Generator | Toolzenix Social Media Tools</title>
        <meta name="description" content="Generate engaging tweet ideas based on your topic or keyword. Get inspiration for your Twitter/X posts within character limits." />
        <link rel="canonical" href="https://toolzenix.com/tweet-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Twitter className="w-16 h-16 text-sky-500 dark:text-sky-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Tweet / X Post Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
            Get instant inspiration for your Twitter/X posts. Enter a topic to generate ideas.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <Label htmlFor="topic-input" className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Enter Your Topic or Keyword
            </Label>
            <Input
              id="topic-input"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., 'AI in Healthcare', 'Remote Work Tips'"
              className="mt-2 text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
          
          <Button onClick={() => generateTweets()} className="w-full bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white text-lg py-3">
            <RefreshCw className="w-5 h-5 mr-2" /> Generate Tweets
          </Button>

          {generatedTweets.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">Generated Tweets:</h2>
              <div className="space-y-4">
                {generatedTweets.map((tweet, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Textarea
                      readOnly
                      value={tweet}
                      className="w-full text-sm text-gray-700 dark:text-gray-200 bg-transparent border-0 focus:ring-0 resize-none min-h-[60px]"
                    />
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {tweet.length} / ~{TWITTER_MAX_CHARS} characters
                        </p>
                        <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(tweet)} className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300">
                            <Copy className="w-4 h-4 mr-1.5" /> Copy
                        </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Crafting Engaging Tweets</h2>
          <p>
            This tool helps you brainstorm tweet ideas that are concise and engaging. Remember these tips for effective tweeting:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Keep it short and to the point.</li>
            <li>Use relevant hashtags (#) to increase visibility.</li>
            <li>Ask questions to encourage interaction.</li>
            <li>Share valuable tips or insights.</li>
            <li>Use emojis to add personality (sparingly).</li>
            <li>Include a call-to-action if appropriate (e.g., link to your blog).</li>
          </ul>
          <p>The character counter is an estimate. Actual character count on Twitter/X may vary due to link shortening (t.co links).</p>
        </motion.div>
      </div>
    </>
  );
};

export default TweetGenerator;