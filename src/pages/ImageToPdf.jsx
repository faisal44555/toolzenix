import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileImage, X, Loader2, RefreshCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { jsPDF } from "jspdf";
import { Helmet } from "react-helmet-async";
import { loadImageFromFile } from "@/utils/imageUtils";

const ImageToPdf = () => {
  const [files, setFiles] = useState([]);
  const [converting, setConverting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    const imageFiles = selectedFiles.filter(file => file.type.startsWith("image/"));
    
    if (imageFiles.length !== selectedFiles.length) {
      toast({
        title: "Invalid file type",
        description: "Some files were not images and were ignored.",
        variant: "destructive",
      });
    }

    if(imageFiles.length === 0) return;

    setUploading(true);
    try {
      const loadedImagesData = await Promise.all(
        imageFiles.map(file => loadImageFromFile(file))
      );
      
      const newFiles = loadedImagesData.map(data => ({
        id: Date.now() + Math.random(),
        file: data.file,
        img: data.img,
        dataUrl: data.dataUrl
      }));
      
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    } catch (error) {
      toast({
        title: "Error Loading Images",
        description: error.message || "One or more images could not be loaded.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const convertToPdf = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select one or more image files to convert.",
        variant: "destructive",
      });
      return;
    }

    setConverting(true);

    try {
      const pdf = new jsPDF({ orientation: "p", unit: "px", format: "a4" });
      
      for (let i = 0; i < files.length; i++) {
        const { img, dataUrl } = files[i];
        
        const imgWidth = img.width;
        const imgHeight = img.height;
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        if (i > 0) {
           pdf.addPage();
        }
        
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const newWidth = imgWidth * ratio;
        const newHeight = imgHeight * ratio;
        
        const x = (pdfWidth - newWidth) / 2;
        const y = (pdfHeight - newHeight) / 2;

        pdf.addImage(dataUrl, 'JPEG', x, y, newWidth, newHeight);
      }
      
      pdf.save("images-to-pdf.pdf");
      toast({
        title: "Conversion Successful!",
        description: `${files.length} image(s) have been converted to PDF and downloaded.`,
      });
      handleReset();

    } catch (error) {
      console.error("Image to PDF conversion error:", error);
      toast({
        title: "Conversion Error",
        description: "Could not convert images to PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConverting(false);
    }
  };
  
  const removeFile = (idToRemove) => {
    setFiles(files.filter(item => item.id !== idToRemove));
  };

  const handleReset = () => {
    setFiles([]);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Image to PDF Converter - Combine JPG, PNG to PDF | Toolzenix</title>
        <meta name="description" content="Combine multiple images (JPG, PNG, GIF, WEBP) into a single PDF file. Free, secure, and easy to use online image to PDF converter." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">🖼️➡️📄 Image to PDF Converter</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Combine multiple images (JPG, PNG, etc.) into a single compact PDF file. Ideal for sharing scans or photos.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-lg">
            <label
              htmlFor="image-upload"
              className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors"
            >
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="sr-only"
                disabled={uploading || converting}
                ref={fileInputRef}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {uploading ? (
                  <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      Drag and drop your image files here, or click to select
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      Supports JPG, PNG, GIF, WEBP, etc. Up to 10MB.
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>

          {files.length > 0 && (
            <div className="mt-8 w-full">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Selected Images ({files.length}):</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6 max-h-80 overflow-y-auto p-3 border rounded-md dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                {files.map((item) => (
                  <div key={item.id} className="relative group p-2 border dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700">
                    <img src={item.dataUrl} alt={item.file.name} className="w-full h-24 object-contain rounded-md" />
                    <button 
                      onClick={() => removeFile(item.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                      title="Remove image"
                      aria-label="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <p className="text-xs text-gray-700 dark:text-gray-300 truncate mt-1" title={item.file.name}>{item.file.name}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <Button
                    onClick={handleReset}
                    variant="outline"
                    disabled={converting || uploading}
                  >
                   <RefreshCcw className="w-5 h-5 mr-2" /> Try Again
                </Button>
                <Button
                  onClick={convertToPdf}
                  disabled={converting || uploading}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {converting ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Download className="w-5 h-5 mr-2" />
                  )}
                  Convert & Download PDF
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Upload one or more image files (JPG, PNG, etc.).</li>
          <li>The images will be listed. You can remove any unwanted images.</li>
          <li>Click "Convert & Download PDF". The images will be combined into a single PDF.</li>
          <li>Each image will typically be placed on a new page in the PDF.</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageToPdf;