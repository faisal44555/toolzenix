import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Instagram, Copy, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';

const bioTemplates = [
  "✨ {adjective} {noun} from {location} ✨\n{emoji} {passion1} | {passion2} | {passion3}\n👇 Check out my {call_to_action}! 👇\n{link_placeholder}",
  "📍 {location}\n{emoji} {profession} passionate about {passion1} & {passion2}.\nLet's connect! 🚀\n{link_placeholder}",
  "Just a {noun} sharing my love for {passion1}.\n{emoji} {hobby} enthusiast.\nDM for collabs 📩\n{link_placeholder}",
  "Helping {target_audience} {achieve_goal} through {method}.\n{emoji} {value_proposition}\nJoin my journey! ✨\n{link_placeholder}",
  "Official page of {brand_name}.\n{emoji} We offer {product_service}.\nShop now! 🛍️\n{link_placeholder}",
  "Creating {content_type} about {passion1} and {passion2}.\n{emoji} Follow for daily {value_proposition}!\n{link_placeholder}",
  "{emoji} {adjective} {noun}\nLover of {passion1}, {passion2}, and {passion3}.\n{call_to_action_phrase}\n{link_placeholder}",
  "Spreading positivity & {value_proposition}.\n{emoji} Join the community!\n{link_placeholder}",
  "Your go-to for {topic_expertise}.\n{emoji} {passion1} | {passion2}\n{call_to_action_phrase}\n{link_placeholder}",
  "Living life one {activity} at a time.\n{emoji} {passion1} | {passion2}\n{link_placeholder}"
];

const placeholdersContent = {
  adjective: ["Creative", "Passionate", "Dedicated", "Adventurous", "Curious", "Authentic"],
  noun: ["Creator", "Explorer", "Dreamer", "Thinker", "Entrepreneur", "Artist", "Storyteller"],
  location: ["Planet Earth", "The Internet", "My City", "Your Town", "The Universe"],
  emoji: ["🌟", "💖", "🚀", "💡", "🌿", "🎨", "📸", "💻", "🌍", "✨"],
  passion1: ["Travel", "Food", "Tech", "Art", "Music", "Fitness", "Books", "Nature", "Coding"],
  passion2: ["Photography", "Writing", "Design", "Yoga", "Gaming", "Cooking", "Learning"],
  passion3: ["Coffee", "Dogs", "Cats", "Movies", "Hiking", "Dancing", "Friends"],
  call_to_action: ["latest post", "new video", "website", "shop", "blog"],
  link_placeholder: ["yourlink.com", "linkin.bio/yourname"],
  profession: ["Marketer", "Developer", "Designer", "Writer", "Coach", "Consultant"],
  hobby: ["Gardening", "Painting", "Reading", "Gaming", "Sports"],
  target_audience: ["you", "entrepreneurs", "creators", "students", "busy moms"],
  achieve_goal: ["succeed", "grow", "learn", "thrive", "be happy"],
  method: ["creative content", "expert advice", "innovative solutions", "personal coaching"],
  value_proposition: ["inspiration", "tips & tricks", "valuable insights", "daily motivation"],
  brand_name: ["Your Brand", "My Awesome Shop"],
  product_service: ["the best widgets", "amazing services", "handmade crafts"],
  content_type: ["videos", "articles", "photos", "stories"],
  call_to_action_phrase: ["Click the link below!", "Let's connect!", "Follow my journey!"],
  topic_expertise: ["all things digital", "wellness tips", "financial advice"],
  activity: ["adventure", "cup of coffee", "good book"]
};

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const InstagramBioGenerator = () => {
  const [userInput, setUserInput] = useState({
    name: '',
    niche: '',
    callToActionText: '',
    link: ''
  });
  const [generatedBio, setGeneratedBio] = useState('');
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput(prev => ({ ...prev, [name]: value }));
  };

  const generateBio = () => {
    let template = getRandomElement(bioTemplates);
    let bio = template;

    Object.keys(placeholdersContent).forEach(placeholderKey => {
      const regex = new RegExp(`{${placeholderKey}}`, 'g');
      if (bio.match(regex)) {
        // Prioritize user input if available for certain placeholders
        if (placeholderKey === 'passion1' && userInput.niche) {
          bio = bio.replace(regex, userInput.niche);
        } else if (placeholderKey === 'call_to_action' && userInput.callToActionText) {
          bio = bio.replace(regex, userInput.callToActionText);
        } else if (placeholderKey === 'link_placeholder' && userInput.link) {
          bio = bio.replace(regex, userInput.link);
        } else if (placeholderKey === 'brand_name' && userInput.name) {
          bio = bio.replace(regex, userInput.name);
        } else {
          bio = bio.replace(regex, getRandomElement(placeholdersContent[placeholderKey]));
        }
      }
    });
    
    // If user provided name but it wasn't used in template, prepend it
    if (userInput.name && !bio.toLowerCase().includes(userInput.name.toLowerCase())) {
        bio = `${userInput.name}\n${bio}`;
    }


    setGeneratedBio(bio);
    toast({ title: 'Bio Generated!', description: 'A new Instagram bio is ready.', action: <CheckCircle2 className="text-green-500" /> });
  };

  const handleCopyToClipboard = () => {
    if (!generatedBio) {
      toast({ title: 'Nothing to Copy', description: 'Generate a bio first.', variant: 'destructive' });
      return;
    }
    navigator.clipboard.writeText(generatedBio)
      .then(() => toast({ title: 'Bio Copied!', description: 'Instagram bio copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  return (
    <>
      <Helmet>
        <title>Instagram Bio Generator | Toolzenix Social Media Tools</title>
        <meta name="description" content="Generate unique and stylish bios for your Instagram profile. Input your niche, call to action, and get creative bio ideas instantly." />
        <link rel="canonical" href="https://toolzenix.com/instagram-bio-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Instagram className="w-16 h-16 text-pink-500 dark:text-pink-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Instagram Bio Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
            Craft the perfect Instagram bio to make your profile stand out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Tell Us About Yourself</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-md font-medium text-gray-700 dark:text-gray-300">Your Name/Brand</Label>
                <Input id="name" name="name" value={userInput.name} onChange={handleInputChange} placeholder="e.g., John Doe or MyBrand" className="mt-1 p-2.5 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
              <div>
                <Label htmlFor="niche" className="text-md font-medium text-gray-700 dark:text-gray-300">Niche/Main Passion</Label>
                <Input id="niche" name="niche" value={userInput.niche} onChange={handleInputChange} placeholder="e.g., Travel, Fitness, Tech" className="mt-1 p-2.5 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
              <div>
                <Label htmlFor="callToActionText" className="text-md font-medium text-gray-700 dark:text-gray-300">Call to Action Text</Label>
                <Input id="callToActionText" name="callToActionText" value={userInput.callToActionText} onChange={handleInputChange} placeholder="e.g., My new blog post, Shop my presets" className="mt-1 p-2.5 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
              <div>
                <Label htmlFor="link" className="text-md font-medium text-gray-700 dark:text-gray-300">Link in Bio</Label>
                <Input id="link" name="link" value={userInput.link} onChange={handleInputChange} placeholder="e.g., yourwebsite.com" className="mt-1 p-2.5 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              </div>
            </div>
            <Button onClick={generateBio} className="w-full mt-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg py-3">
              <RefreshCw className="w-5 h-5 mr-2" /> Generate Bio
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Generated Bio Preview</h2>
            <div className="min-h-[200px] p-4 bg-gray-50 dark:bg-gray-700/50 rounded-md border border-dashed border-gray-300 dark:border-gray-600 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200">
              {generatedBio || "Your generated bio will appear here..."}
            </div>
            {generatedBio && (
              <Button onClick={handleCopyToClipboard} variant="outline" className="w-full mt-6 text-md py-3 border-pink-500 text-pink-500 hover:bg-pink-50 dark:border-pink-400 dark:text-pink-400 dark:hover:bg-pink-900/30">
                <Copy className="w-4 h-4 mr-2" /> Copy Bio
              </Button>
            )}
            <div className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
              Max 150 characters for Instagram bio. Check length after pasting.
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Tips for a Great Instagram Bio</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Be Clear & Concise:</strong> State who you are and what you do.</li>
            <li><strong>Use Keywords:</strong> Include terms relevant to your niche.</li>
            <li><strong>Show Personality:</strong> Let your unique voice shine through.</li>
            <li><strong>Add Emojis:</strong> They can add visual appeal and save space.</li>
            <li><strong>Include a Call to Action (CTA):</strong> Tell people what to do next (e.g., visit link, DM).</li>
            <li><strong>Use Line Breaks:</strong> Make your bio easy to read. (This tool adds them!)</li>
          </ul>
        </motion.div>
      </div>
    </>
  );
};

export default InstagramBioGenerator;