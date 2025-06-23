import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save, Download, RefreshCw, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet-async";

const OnlineNotepad = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false); // For file operations
  const { toast } = useToast();

  useEffect(() => {
    const savedText = localStorage.getItem("onlineNotepadText");
    if (savedText) {
      setText(savedText);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("onlineNotepadText", text);
    toast({
      title: "Saved!",
      description: "Your text has been saved to browser storage.",
    });
  };

  const handleDownload = () => {
    if (!text.trim()) {
      toast({ title: "Nothing to download", description: "Notepad is empty.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "notepad_toolzenix.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Downloaded!",
        description: "Your text has been downloaded as a .txt file.",
      });
    } catch (error) {
      toast({ title: "Download Error", description: "Could not download the file.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "text/plain") {
        setLoading(true);
        const reader = new FileReader();
        reader.onload = (e) => {
          setText(e.target.result);
          toast({
            title: "Uploaded!",
            description: "File content has been loaded into the notepad.",
          });
          setLoading(false);
        };
        reader.onerror = () => {
          toast({ title: "Upload Error", description: "Could not read the file.", variant: "destructive" });
          setLoading(false);
        }
        reader.readAsText(file);
      } else {
        toast({ title: "Invalid File Type", description: "Please upload a .txt file.", variant: "destructive" });
      }
    }
  };

  const handleClear = () => {
    setText("");
    localStorage.removeItem("onlineNotepadText");
    toast({
      title: "Cleared!",
      description: "Notepad has been cleared.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Online Notepad - Quick & Secure Note Taking | Toolzenix</title>
        <meta name="description" content="A simple, fast, and secure online notepad. Write, edit, and save your notes directly in your browser. Works offline." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">📝 Online Notepad</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Write, edit, and save your notes directly in your browser.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing your notes here..."
            className="w-full h-96 p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base"
            aria-label="Notepad text area"
          />
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <Button
              onClick={handleSave}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              disabled={loading}
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            
            <Button
              onClick={handleDownload}
              variant="outline"
              className="w-full text-gray-700 dark:text-gray-300"
              disabled={loading || !text.trim()}
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {!loading && <Download className="w-4 h-4 mr-2" />}
              Download
            </Button>
            
            <label className="w-full cursor-pointer">
              <Button
                variant="outline"
                className="w-full text-gray-700 dark:text-gray-300"
                onClick={() => document.getElementById("file-upload-notepad").click()}
                disabled={loading}
                asChild
              >
                <div>
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {!loading && <Upload className="w-4 h-4 mr-2" />}
                  Upload .txt
                </div>
              </Button>
              <input
                type="file"
                id="file-upload-notepad"
                accept=".txt"
                className="hidden"
                onChange={handleUpload}
                disabled={loading}
              />
            </label>
            
            <Button
              onClick={handleClear}
              variant="destructive"
              className="w-full"
              disabled={loading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-50 dark:bg-gray-800/50 rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Features:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Auto-saves to browser storage (click "Save" button)</li>
            <li>Download notes as a .txt file</li>
            <li>Upload existing .txt files</li>
            <li>Works offline after initial load</li>
            <li>Your data stays in your browser - 100% private</li>
          </ul>
        </motion.div>
      </motion.div>

      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Start typing in the text area. Your notes are temporarily stored.</li>
          <li>Click "Save" to persist your notes in your browser's local storage.</li>
          <li>Click "Download" to save your notes as a .txt file.</li>
          <li>Click "Upload .txt" to load content from an existing text file.</li>
          <li>Click "Clear All" to erase all content and remove it from browser storage.</li>
        </ul>
      </div>
    </div>
  );
};

export default OnlineNotepad;