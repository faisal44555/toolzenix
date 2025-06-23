import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { MessageCircle, Edit3, RefreshCw, Copy, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from "react-router-dom";


const captionTemplates = {
  general: [
    "Sharing a little bit of {topic} today! ✨ What do you think? #MyPost #{keyword}",
    "Just {verb} this amazing {noun} related to {topic}. Thoughts? 👇 #{keyword}",
    "Feeling inspired by {topic}. Hope this brightens your day! 😊 #{keyword} #Inspiration",
    "A quick update on my {topic} journey. Making progress! 🚀 #{keyword} #Goals",
    "Diving deep into {topic}. What are your favorite resources? 📚 #{keyword} #Learning"
  ],
  question: [
    "What's your take on {topic}? Let me know in the comments! 🤔 #{keyword} #Discussion",
    "Ever wondered about {topic}? I'm curious to hear your experiences! 👇 #{keyword}",
    "If you could {verb} one thing about {topic}, what would it be? 💡 #{keyword} #AskMeAnything",
    "How do you approach {topic} in your daily life/work? Share your tips! 🙏 #{keyword}",
    "Is {topic} the future? Or just a trend? What do you predict? 🔮 #{keyword} #Future"
  ],
  promotional: [
    "Excited to announce our new {product_type} related to {topic}! Learn more: [Link] 🎉 #{keyword} #NewProduct",
    "Don't miss out on our special offer for {topic}! Limited time only. Shop now: [Link] 🛍️ #{keyword} #Sale",
    "Check out our latest blog post about {topic}! Full of insights and tips. Read here: [Link] 📝 #{keyword} #Blog",
    "Join our webinar on {topic} this {day_of_week}! Register for free: [Link] 💻 #{keyword} #Webinar",
    "We're hiring! Looking for a {job_role} passionate about {topic}. Apply now: [Link] 💼 #{keyword} #Hiring"
  ],
  story: [
    "Let me tell you a story about {topic}... It all started when {event_start}. Now, {current_state}. What a journey! ✨ #{keyword}",
    "Throwback to when I first learned about {topic}. It changed everything! What's your 'aha!' moment? 💡 #{keyword} #TBT",
    "The biggest lesson I learned from {topic} is {lesson}. Hope this helps you too! 🙏 #{keyword} #LifeLesson",
    "Behind the scenes of my {topic} project. It's not always glamorous, but it's worth it! 😅 #{keyword} #BTS",
    "Celebrating a small win today with {topic}! Every step counts. 🎉 #{keyword} #Milestone"
  ]
};

const placeholders = {
  keyword: ["SocialMedia", "ContentCreation", "MarketingTips", "InstaGood", "DailyInspo"],
  verb: ["creating", "exploring", "discovering", "learning", "sharing"],
  noun: ["moment", "insight", "project", "idea", "resource"],
  product_type: ["service", "tool", "course", "eBook", "app"],
  day_of_week: ["Monday", "Wednesday", "Friday"],
  job_role: ["Marketer", "Developer", "Designer", "Manager"],
  event_start: ["I was struggling", "I had an idea", "I met someone amazing"],
  current_state: ["I'm so proud of the progress", "it's been an incredible ride", "I'm excited for what's next"],
  lesson: ["to never give up", "that consistency is key", "to always keep learning"]
};

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const CaptionGenerator = () => {
  const [topic, setTopic] = useState('');
  const [captionType, setCaptionType] = useState('general');
  const [generatedCaptions, setGeneratedCaptions] = useState([]);
  const { toast } = useToast();

  const generateCaptions = (count = 3) => {
    if (!topic.trim()) {
      toast({ title: "Topic Required", description: "Please enter a topic or keyword for your captions.", variant: "destructive", action: <AlertTriangle /> });
      return;
    }

    const newCaptions = [];
    const selectedTemplates = captionTemplates[captionType] || captionTemplates.general;
    const usedTemplates = new Set();

    for (let i = 0; i < count; i++) {
      let template;
      let attempts = 0;
      do {
        template = getRandomElement(selectedTemplates);
        attempts++;
      } while (usedTemplates.has(template) && attempts < selectedTemplates.length);
      usedTemplates.add(template);

      let caption = template.replace(/{topic}/g, topic.trim());
      Object.keys(placeholders).forEach(placeholderKey => {
        const regex = new RegExp(`{${placeholderKey}}`, 'g');
        if (caption.match(regex)) {
          caption = caption.replace(regex, getRandomElement(placeholders[placeholderKey]));
        }
      });
      
      newCaptions.push(caption);
    }
    setGeneratedCaptions(newCaptions);
    toast({ title: "Captions Generated!", description: `${count} new caption ideas ready.`, action: <CheckCircle2 className="text-green-500" /> });
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: "Copied!", description: "Caption copied to clipboard." }))
      .catch(() => toast({ title: "Copy Failed", variant: "destructive" }));
  };

  return (
    <>
      <Helmet>
        <title>Social Media Caption Generator - Free & Easy | Toolzenix</title>
        <meta name="description" content="Generate engaging captions for Instagram, Facebook, Twitter, and more. Enter a topic, choose a style (general, question, promotional, story), and get instant caption ideas to boost your social media presence." />
        <link rel="canonical" href="https://toolzenix.com/caption-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <MessageCircle className="w-16 h-16 text-pink-500 dark:text-pink-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Social Media Caption Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
            Craft compelling captions for your posts. Enter a topic, select a style, and get instant inspiration to engage your audience.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="topic-input" className="text-md font-medium text-gray-700 dark:text-gray-300">
                Topic / Keyword
              </Label>
              <Input
                id="topic-input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., 'Travel', 'Food', 'Fitness'"
                className="mt-1 text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <Label htmlFor="caption-type" className="text-md font-medium text-gray-700 dark:text-gray-300">
                Caption Style
              </Label>
              <Select value={captionType} onValueChange={setCaptionType}>
                <SelectTrigger id="caption-type" className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 text-lg p-3 h-auto">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-white">
                  {Object.keys(captionTemplates).map(type => (
                    <SelectItem key={type} value={type} className="capitalize text-md">{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={() => generateCaptions()} className="w-full bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white text-lg py-3">
            <RefreshCw className="w-5 h-5 mr-2" /> Generate Captions
          </Button>

          {generatedCaptions.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">Generated Captions:</h2>
              <div className="space-y-4">
                {generatedCaptions.map((caption, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Textarea
                      readOnly
                      value={caption}
                      className="w-full text-sm text-gray-700 dark:text-gray-200 bg-transparent border-0 focus:ring-0 resize-none min-h-[70px]"
                    />
                    <div className="text-right mt-2">
                        <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(caption)} className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300">
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
          <h2 className="text-2xl font-semibold">About Our Caption Generator</h2>
          <p>
            Struggling to find the right words for your social media posts? Our Caption Generator is here to help! This tool provides a variety of caption templates based on different styles: general, question-based, promotional, and story-telling. Simply enter your main topic or keyword, choose a style, and get instant caption ideas.
          </p>
          <p>
            Each generated caption is designed to be a starting point. We encourage you to customize them to fit your unique voice, brand, and the specific content of your post. Good captions can significantly increase engagement, encourage interaction, and help you connect with your audience more effectively. For more social media assistance, check out our <Link to="/hashtag-generator">Hashtag Generator</Link> or other <Link to="/social-media-tools">Social Media Tools</Link>.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2">Tips for Writing Captivating Captions:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Start with a Hook:</strong> Grab your audience's attention immediately with an interesting question, bold statement, or intriguing fact.</li>
            <li><strong>Tell a Story or Provide Value:</strong> Share a personal anecdote, offer useful tips, or provide insights related to your post.</li>
            <li><strong>Ask Questions:</strong> Encourage comments and interaction by posing questions to your followers.</li>
            <li><strong>Include a Clear Call-to-Action (CTA):</strong> If relevant, tell your audience what you want them to do next (e.g., "Visit the link in bio," "Share your thoughts," "Tag a friend").</li>
            <li><strong>Use Relevant Hashtags:</strong> Increase the discoverability of your post by using a mix of broad and niche-specific hashtags. Our <Link to="/hashtag-generator">Hashtag Generator</Link> can help with this.</li>
            <li><strong>Tailor to Your Audience and Platform:</strong> Understand what resonates with your followers and adapt your caption style to the specific social media platform you're using.</li>
            <li><strong>Keep it Authentic:</strong> Let your personality shine through. Authenticity builds trust and connection.</li>
          </ul>
          <p>Remember, the best captions are those that feel genuine and add value to your visual content. Use our generator as a springboard for your creativity! Explore all our <Link to="/tools">free online tools</Link> to enhance your digital presence.</p>
        </motion.div>
      </div>
    </>
  );
};

export default CaptionGenerator;