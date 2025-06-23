import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Volume2, Pause, Play, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      setSelectedVoice(availableVoices[0]);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to speak.",
        variant: "destructive",
      });
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => {
      setSpeaking(false);
      toast({
        title: "Error",
        description: "An error occurred while speaking.",
        variant: "destructive",
      });
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const handleClear = () => {
    setText("");
    stop();
    toast({
      title: "Cleared!",
      description: "Text has been cleared.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Text to Speech
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Convert your text into natural-sounding speech.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Voice
            </label>
            <select
              value={selectedVoice?.name || ""}
              onChange={(e) => setSelectedVoice(voices.find(v => v.name === e.target.value))}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-64 p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          
          <div className="flex justify-between mt-4">
            <Button
              onClick={speaking ? stop : speak}
              variant="outline"
              className="text-gray-700 dark:text-gray-300"
            >
              {speaking ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Stop Speaking
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Speaking
                </>
              )}
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="text-gray-700 dark:text-gray-300"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear Text
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-gray-800/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Tips</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Use punctuation marks for natural pauses</li>
            <li>Try different voices for variety</li>
            <li>Keep paragraphs short for better results</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default TextToSpeech;