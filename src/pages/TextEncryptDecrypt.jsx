import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clipboard, RefreshCw, Lock, Unlock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const TextEncryptDecrypt = () => {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState("encrypt"); // 'encrypt' or 'decrypt'
  const { toast } = useToast();

  const simpleCipher = (str, key, encrypt = true) => {
    if (!key) return "Password cannot be empty.";
    let result = "";
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      const keyCode = key.charCodeAt(i % key.length);
      if (encrypt) {
        result += String.fromCharCode(charCode + keyCode);
      } else {
        result += String.fromCharCode(charCode - keyCode);
      }
    }
    return result;
  };
  
  const base64Cipher = (str, key, encrypt = true) => {
    if (!key) return "Password cannot be empty.";
    try {
      if (encrypt) {
        const saltedText = key + str + key.split("").reverse().join("");
        return btoa(encodeURIComponent(saltedText));
      } else {
        const decodedText = decodeURIComponent(atob(str));
        if (decodedText.startsWith(key) && decodedText.endsWith(key.split("").reverse().join(""))) {
          return decodedText.substring(key.length, decodedText.length - key.length);
        }
        return "Decryption failed: Invalid password or corrupted data.";
      }
    } catch (e) {
      return "Operation failed. Ensure data is valid for decryption or password is correct.";
    }
  };


  const handleProcess = () => {
    if (!password) {
      toast({
        title: "Error",
        description: "Please enter a password.",
        variant: "destructive",
      });
      return;
    }
    const result = base64Cipher(text, password, mode === "encrypt");
    setOutputText(result);
    toast({
      title: mode === "encrypt" ? "Encrypted!" : "Decrypted!",
      description: `Text has been ${mode}ed.`,
    });
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied!",
      description: "Output text copied to clipboard.",
    });
  };

  const handleClear = () => {
    setText("");
    setPassword("");
    setOutputText("");
    toast({
      title: "Cleared!",
      description: "All fields have been cleared.",
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
          Text Encrypt/Decrypt
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Secure your text with a simple password-based encryption.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              onClick={() => setMode("encrypt")}
              variant={mode === "encrypt" ? "default" : "outline"}
              className={mode === "encrypt" ? "bg-blue-500 hover:bg-blue-600" : "text-gray-700 dark:text-gray-300"}
            >
              <Lock className="w-4 h-4 mr-2" /> Encrypt
            </Button>
            <Button
              onClick={() => setMode("decrypt")}
              variant={mode === "decrypt" ? "default" : "outline"}
              className={mode === "decrypt" ? "bg-green-500 hover:bg-green-600" : "text-gray-700 dark:text-gray-300"}
            >
              <Unlock className="w-4 h-4 mr-2" /> Decrypt
            </Button>
          </div>

          <div className="mb-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Input Text</h2>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={mode === "encrypt" ? "Text to encrypt..." : "Encrypted text to decrypt..."}
                className="w-full h-64 p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Output Text</h2>
              <textarea
                value={outputText}
                readOnly
                placeholder="Result will appear here..."
                className="w-full h-64 p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
          
          <div className="flex justify-center space-x-4 mt-6">
            <Button
              onClick={handleProcess}
              className="bg-purple-500 hover:bg-purple-600"
            >
              {mode === "encrypt" ? "Encrypt Text" : "Decrypt Text"}
            </Button>
            <Button
              onClick={handleCopyOutput}
              variant="outline"
              className="text-gray-700 dark:text-gray-300"
            >
              <Clipboard className="w-4 h-4 mr-2" />
              Copy Output
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="text-gray-700 dark:text-gray-300"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>
        <div className="bg-yellow-50 dark:bg-gray-800/50 rounded-xl p-4 text-sm text-yellow-700 dark:text-yellow-300">
          <strong>Disclaimer:</strong> This tool uses a simple Base64-based cipher for basic obfuscation, not strong encryption. Do not use it for sensitive data.
        </div>
      </motion.div>
    </div>
  );
};

export default TextEncryptDecrypt;