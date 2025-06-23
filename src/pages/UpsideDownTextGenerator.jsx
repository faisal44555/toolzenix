import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { RotateCcw, Copy, Trash2, ArrowLeft, Sparkles, Shield, Zap, Info } from 'lucide-react';
import { useToolAnalytics } from '@/hooks/useAnalytics';
import SocialShareButtons from '@/components/common/SocialShareButtons';

const upsideDownChars = {
  'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
  'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
  'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
  'y': 'ʎ', 'z': 'z',
  'A': '∀', 'B': 'ꓭ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': 'פ', 'H': 'H',
  'I': 'I', 'J': 'ſ', 'K': 'ꓘ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ',
  'Q': 'Ꝺ', 'R': 'ꓤ', 'S': 'S', 'T': '┴', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X',
  'Y': '⅄', 'Z': 'Z',
  '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ',
  '8': '8', '9': '6',
  '.': '˙', ',': "'", '?': '¿', '!': '¡', "'": ',', '"': ',,', '(': ')', ')': '(',
  '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '_': '‾',
  '&': '⅋', ';': '؛', ' ': ' '
};

const UpsideDownTextGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const { toast } = useToast();
  const { trackToolUsage, trackFileDownload } = useToolAnalytics('Upside Down Text Generator', 'Text Tools');

  const convertToUpsideDown = () => {
    if (!inputText.trim()) {
      setOutputText('');
      toast({ 
        title: 'Input Required', 
        description: 'Please enter some text to flip upside down.', 
        variant: 'destructive' 
      });
      return;
    }

    try {
      const flippedText = inputText
        .split('')
        .reverse()
        .map(char => upsideDownChars[char] || char)
        .join('');
      
      setOutputText(flippedText);
      trackToolUsage('text_flipped', { 
        inputLength: inputText.length,
        outputLength: flippedText.length 
      });
      
      toast({ 
        title: 'Text Flipped Successfully!', 
        description: 'Your text has been converted to upside down format.' 
      });
    } catch (error) {
      toast({ 
        title: 'Conversion Error', 
        description: 'Failed to flip the text. Please try again.', 
        variant: 'destructive' 
      });
    }
  };
  
  const copyToClipboard = async (text, type) => {
    if (!text) {
      toast({ 
        title: 'Nothing to Copy', 
        description: `No ${type.toLowerCase()} text available to copy.`, 
        variant: 'destructive' 
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      trackFileDownload(`${type.toLowerCase()}_text.txt`, text.length);
      toast({ 
        title: 'Copied Successfully!', 
        description: `${type} text copied to clipboard.` 
      });
    } catch (error) {
      toast({ 
        title: 'Copy Failed', 
        description: 'Unable to copy text. Please try selecting and copying manually.', 
        variant: 'destructive' 
      });
    }
  };

  const clearFields = () => {
    setInputText('');
    setOutputText('');
    toast({ 
      title: 'Fields Cleared!', 
      description: 'Input and output fields have been cleared.' 
    });
  };

  const toolFeatures = [
    { icon: <Zap className="w-4 h-4 text-yellow-500" />, text: "Instant text flipping" },
    { icon: <Shield className="w-4 h-4 text-green-500" />, text: "100% private & secure" },
    { icon: <Sparkles className="w-4 h-4 text-blue-500" />, text: "No registration needed" }
  ];

  return (
    <>
      <Helmet>
        <title>Upside Down Text Generator – Flip Your Text Easily | Toolzenix</title>
        <meta name="description" content="Create upside down text instantly with our free online generator. Perfect for social media posts, messages, and creative content. Fast, secure, and easy to use." />
        <meta name="keywords" content="upside down text generator, flip text, inverted text, text flipper, social media text, creative text effects" />
        <link rel="canonical" href="https://toolzenix.com/upside-down-text-generator" />
        <meta property="og:title" content="Upside Down Text Generator – Flip Your Text Easily | Toolzenix" />
        <meta property="og:description" content="Transform your text into upside down format instantly. Perfect for social media, messages, and creative content." />
        <meta property="og:url" content="https://toolzenix.com/upside-down-text-generator" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://toolzenix.com/og-upside-down-text.jpg" />
      </Helmet>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <nav className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/text-tools" className="hover:text-blue-600 dark:hover:text-blue-400">Text Tools</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-gray-100">Upside Down Text Generator</span>
          </nav>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <RotateCcw className="w-16 h-16 text-purple-500 dark:text-purple-400 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Upside Down Text Generator – Flip Your Text Easily
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
              Transform your regular text into upside down format instantly. Perfect for creating unique social media posts, 
              fun messages, and eye-catching content that stands out from the crowd.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {toolFeatures.map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  {feature.icon}
                  <span className="ml-1">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 mb-8"
        >
          <div className="space-y-6">
            <div>
              <Label htmlFor="inputTextFlip" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter Your Text
              </Label>
              <Textarea 
                id="inputTextFlip" 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)} 
                placeholder="Type or paste your text here to flip it upside down..." 
                className="min-h-[120px] text-base border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400" 
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Character count: {inputText.length}
              </p>
            </div>

            <div className="text-center">
              <Button 
                onClick={convertToUpsideDown} 
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                disabled={!inputText.trim()}
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Flip Text
              </Button>
            </div>

            <div>
              <Label htmlFor="outputTextFlip" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upside Down Text Result
              </Label>
              <motion.div key={outputText} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}>
                <Textarea 
                  id="outputTextFlip" 
                  value={outputText} 
                  readOnly 
                  placeholder="˙˙˙ǝɹǝɥ ɹɐǝddɐ llıʍ ʇxǝʇ pǝddılℲ" 
                  className="min-h-[120px] text-base bg-gray-50 dark:bg-slate-700/50 border-gray-300 dark:border-gray-600" 
                />
              </motion.div>
              <AnimatePresence>
                {outputText && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xs text-gray-500 dark:text-gray-400 mt-1"
                  >
                    Result length: {outputText.length} characters
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <Button 
                variant="outline" 
                onClick={() => copyToClipboard(outputText, 'Flipped')} 
                disabled={!outputText}
                className="border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/20"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Flipped Text
              </Button>
              <Button 
                variant="ghost" 
                onClick={clearFields} 
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">How to Use This Tool</h3>
                <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                  <li><strong>1. Enter Text:</strong> Type or paste your text in the input field above</li>
                  <li><strong>2. Click "Flip Text":</strong> Press the flip button to convert your text</li>
                  <li><strong>3. Copy Result:</strong> Use the copy button to save your upside down text</li>
                  <li><strong>4. Use Anywhere:</strong> Paste your flipped text in social media, messages, or documents</li>
                </ol>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-3">
                  ✨ All processing happens in your browser - your text never leaves your device!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Easy to Use</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Simple interface that anyone can use instantly</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">One-Click Copy</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Copy your flipped text with a single click</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Mobile-Friendly</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Works perfectly on all devices and screen sizes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Instant Results</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get your upside down text immediately</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Perfect for Creative Content</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Social Media</h3>
                <p className="text-purple-100">Make your posts stand out on Facebook, Twitter, Instagram, and more</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Messages & Chats</h3>
                <p className="text-purple-100">Add fun and creativity to your text messages and online conversations</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Creative Projects</h3>
                <p className="text-purple-100">Use in presentations, designs, or any creative content that needs a unique touch</p>
              </div>
            </div>
          </div>

          <SocialShareButtons
            url={typeof window !== 'undefined' ? window.location.href : ''}
            title="Check out this Upside Down Text Generator on Toolzenix!"
            description="Transform your text into upside down format instantly with this free online tool"
            className="mb-8"
          />

          <div className="text-center">
            <Link 
              to="/text-tools"
              className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Text Tools
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default UpsideDownTextGenerator;