import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Copy, Image as ImageIcon, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet-async";
import { loadImageFromFile } from "@/utils/imageUtils";

const ImageBase64 = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [base64String, setBase64String] = useState("");
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProcessing(true);
    setImageUrl(null);
    setBase64String("");

    try {
      const { dataUrl } = await loadImageFromFile(file);
      setImageUrl(dataUrl);
      setBase64String(dataUrl);
      toast({ title: "Image Loaded", description: "Base64 string generated successfully." });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error.message || "Invalid image file. Please try a different file.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const copyToClipboard = () => {
    if (!base64String) {
      toast({
        title: "Nothing to Copy",
        description: "Please upload an image to generate a Base64 string.",
        variant: "destructive"
      });
      return;
    }

    navigator.clipboard.writeText(base64String).then(() => {
      toast({
        title: "Copied to Clipboard!",
        description: "The Base64 string has been copied."
      });
    }).catch(() => {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard. Please try again.",
        variant: "destructive"
      });
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Image to Base64 Converter | Toolzenix</title>
        <meta name="description" content="Convert your images to Base64 string format. Free, secure, and easy-to-use online image to Base64 converter." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">🖼️➡️📜 Image to Base64 Converter</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Convert your images to Base64 string format for easy embedding.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg"
      >
        <div className="flex flex-col items-center justify-center">
          {imageUrl && (
            <div className="w-full text-center mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Image Preview:</h3>
              <img src={imageUrl} alt="Preview" className="max-w-full max-h-72 mx-auto rounded-lg shadow-lg border dark:border-gray-700" />
            </div>
          )}
          
          <div className="w-full max-w-lg">
            <label 
              htmlFor="file-upload-base64"
              className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-rose-500 dark:hover:border-rose-400 transition-colors"
            >
              <input
                id="file-upload-base64"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="sr-only"
                disabled={processing}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {processing ? (
                  <Loader2 className="w-12 h-12 text-rose-500 animate-spin" />
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      Drag and drop your image here, or click to select
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      Supports JPG, PNG, GIF, WEBP, etc. Up to 10MB.
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>

          {base64String && !processing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 w-full max-w-lg"
            >
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                <label htmlFor="base64Output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Base64 String:</label>
                <Textarea
                  id="base64Output"
                  value={base64String}
                  readOnly
                  className="w-full h-40 p-2 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-700 dark:text-gray-300"
                  aria-label="Generated Base64 string"
                />
              </div>

              <Button
                onClick={copyToClipboard}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <Copy className="w-5 h-5 mr-2" />
                Copy Base64 String
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white text-center">
          What is Base64 Encoding for Images?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <ImageIcon className="w-8 h-8 text-rose-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white text-center">
              Text Representation
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm text-center">
              Converts binary image data into a string of ASCII characters.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <ImageIcon className="w-8 h-8 text-rose-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white text-center">
              Easy Embedding
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm text-center">
              Allows images to be embedded directly in HTML (img src), CSS (background-image), or JSON.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <ImageIcon className="w-8 h-8 text-rose-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white text-center">
              Data URLs
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm text-center">
              Often used in data URLs (e.g., `data:image/png;base64,...`) to include images inline.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Upload the image file you want to convert to Base64.</li>
          <li>The tool will process the image and display the Base64 encoded string.</li>
          <li>Click "Copy Base64 String" to copy the result to your clipboard.</li>
          <li>You can then use this string in your HTML, CSS, or other applications.</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageBase64;