import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Edit3, Copy, RefreshCw, CheckCircle2 } from 'lucide-react';

const ideaTemplates = [
  "How to {verb} {topic} for {audience}",
  "The Ultimate Guide to {topic}",
  "{number} Common Mistakes to Avoid When {gerund} {topic}",
  "Why {topic} is Crucial for {audience_goal}",
  "A Beginner's Introduction to {topic}",
  "Expert Tips for Mastering {topic}",
  "{topic} vs. {related_topic}: Which is Better?",
  "The Future of {topic} in {year}",
  "Case Study: How We Achieved {result} with {topic}",
  "Top {number} Tools for {gerund} {topic}",
  "Interview with a {expert_type} about {topic}",
  "Exploring the Benefits of {topic}",
  "Debunking Myths About {topic}",
  "How {topic} Can Help You {achieve_goal}",
  "A Deep Dive into {specific_aspect_of_topic}",
  "The History of {topic} and Its Evolution",
  "Step-by-Step Tutorial: {gerund} {topic}",
  "Common Challenges in {topic} and How to Overcome Them",
  "The Impact of {external_factor} on {topic}",
  "Predicting Trends in {topic} for {future_period}"
];

const placeholders = {
  verb: ["Improve", "Create", "Optimize", "Understand", "Implement", "Start", "Grow"],
  topic: ["Your Niche", "Digital Marketing", "Content Creation", "SEO", "Social Media", "Email Campaigns", "Productivity"],
  audience: ["Beginners", "Experts", "Small Businesses", "Marketers", "Developers", "Students"],
  number: ["5", "7", "10", "3", "12"],
  gerund: ["Learning", "Using", "Building", "Managing", "Analyzing"],
  audience_goal: ["Success", "Growth", "Efficiency", "Engagement"],
  related_topic: ["Another Niche", "Traditional Marketing", "Video Content", "PPC", "Community Building"],
  year: [(new Date().getFullYear() + 1).toString(), (new Date().getFullYear() + 2).toString()],
  result: ["Better ROI", "Increased Traffic", "Higher Engagement", "More Sales"],
  expert_type: ["Industry Leader", "Successful Entrepreneur", "Academic Researcher"],
  achieve_goal: ["Succeed", "Save Time", "Make More Money", "Reach Your Goals"],
  specific_aspect_of_topic: ["Advanced Techniques", "The Core Principles", "The Ethical Implications"],
  external_factor: ["AI", "New Regulations", "Economic Changes", "Technological Advancements"],
  future_period: ["the Next Year", "the Next 5 Years", "the Coming Decade"]
};

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const ContentIdeaGenerator = () => {
  const [topicInput, setTopicInput] = useState('');
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const { toast } = useToast();

  const generateIdeas = (count = 5) => {
    if (!topicInput.trim()) {
      toast({ title: "Topic Needed", description: "Please enter a topic or keyword.", variant: "destructive" });
      return;
    }

    const ideas = [];
    const usedTemplates = new Set();

    for (let i = 0; i < count; i++) {
      let template;
      let attempts = 0;
      // Ensure unique templates if possible
      do {
        template = getRandomElement(ideaTemplates);
        attempts++;
      } while (usedTemplates.has(template) && attempts < ideaTemplates.length);
      
      usedTemplates.add(template);

      let idea = template;
      // Replace main topic first
      idea = idea.replace(/{topic}/g, topicInput.trim());

      // Replace other placeholders
      Object.keys(placeholders).forEach(placeholderKey => {
        const regex = new RegExp(`{${placeholderKey}}`, 'g');
        if (idea.match(regex)) {
          idea = idea.replace(regex, getRandomElement(placeholders[placeholderKey]));
        }
      });
      
      // Capitalize first letter
      idea = idea.charAt(0).toUpperCase() + idea.slice(1);
      ideas.push(idea);
    }
    setGeneratedIdeas(ideas);
    toast({ title: "Ideas Generated!", description: `${count} new content ideas ready.`, action: <CheckCircle2 className="text-green-500" /> });
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: "Copied!", description: "Idea copied to clipboard." }))
      .catch(() => toast({ title: "Copy Failed", variant: "destructive" }));
  };

  return (
    <>
      <Helmet>
        <title>Content Idea Generator | Toolzenix Marketing Tools</title>
        <meta name="description" content="Generate catchy blog post titles, video ideas, and content topics for your marketing campaigns. Enter a keyword to get started." />
        <link rel="canonical" href="https://toolzenix.com/content-idea-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Edit3 className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Content Idea Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
            Never run out of content ideas! Enter a topic or keyword to generate engaging titles and topics.
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
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="e.g., 'Artificial Intelligence', 'Healthy Recipes'"
              className="mt-2 text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <Button onClick={() => generateIdeas()} className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white text-lg py-3">
            <RefreshCw className="w-5 h-5 mr-2" /> Generate Ideas
          </Button>

          {generatedIdeas.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">Generated Ideas:</h2>
              <ul className="space-y-3">
                {generatedIdeas.map((idea, index) => (
                  <li key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-200 text-sm sm:text-base">{idea}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(idea)} className="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Spark Your Creativity</h2>
          <p>
            This tool helps you brainstorm compelling content ideas for blog posts, articles, videos, social media updates, and more. 
            Simply enter a general topic or keyword, and let the generator provide you with a list of potential titles and angles.
          </p>
          <p>
            The ideas are generated using a variety of common content structures and templates, infused with your chosen topic.
            Feel free to generate multiple times to get a wider range of suggestions!
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default ContentIdeaGenerator;