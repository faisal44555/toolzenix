import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileImage, Image as ImageIcon, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import { Helmet } from "react-helmet-async";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.js', import.meta.url).toString();

const PdfToImage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const { toast } = useToast();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setFileName(selectedFile.name.replace(/\.pdf$/, ''));
        setImageUrls([]); 
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select a .pdf file.",
          variant: "destructive",
        });
        setFile(null);
        setFileName("");
        setImageUrls([]);
      }
    }
  };

  const convertToImages = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to convert.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setImageUrls([]);

    toast({
      title: "Downloading file...",
      description: "See notification for download status.",
      duration: 3000,
    });

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const pdfData = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        const numPages = pdf.numPages;
        const urls = [];

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 2.0 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport: viewport }).promise;
          
          const imageUrl = canvas.toDataURL("image/jpeg", 0.9);
          urls.push({ url: imageUrl, name: `${fileName || 'page'}-${pageNum}.jpg` });
        }
        setImageUrls(urls);
        toast({
          title: "Conversion Successful!",
          description: `PDF converted to ${urls.length} image(s). Click download for each page.`,
        });

      } catch (error) {
        console.error("PDF to Image conversion error:", error);
        toast({
          title: "Conversion Error",
          description: `Could not convert the PDF file to images. Error: ${error.message || 'Unknown error'}`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const downloadImage = (url, name) => {
    toast({
      title: "Downloading file...",
      description: "See notification for download status.",
      duration: 3000,
    });

    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>PDF to Image Converter - Convert PDF Pages to JPG | Toolzenix</title>
        <meta name="description" content="Convert each page of your PDF file to high-quality JPG images. Free, secure, and easy to use online PDF to image converter." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">📄➡️🖼️ PDF to Image Converter</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Convert each page of your PDF file to JPG images.
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
              htmlFor="pdf-upload"
              className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-red-500 dark:hover:border-red-400 transition-colors"
            >
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="sr-only"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {file ? (
                  <>
                    <FileImage className="w-12 h-12 text-red-500 dark:text-red-400 mb-4" />
                    <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                      {file.name}
                    </p>
                     <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Click to change file
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      Drag and drop your PDF file here, or click to select
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      Supports .pdf format
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>

          {file && (
            <div className="mt-8 w-full flex justify-center">
              <Button
                onClick={convertToImages}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <ImageIcon className="w-5 h-5 mr-2" />
                )}
                Convert to Images
              </Button>
            </div>
          )}

          {imageUrls.length > 0 && (
            <div className="mt-12 w-full">
              <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">Generated Images</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {imageUrls.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-md flex flex-col items-center"
                  >
                    <img-replace
                      src={img.url}
                      alt={`Page ${index + 1}`}
                      className="max-w-full h-auto rounded mb-4 border border-gray-300 dark:border-gray-600"
                    />
                    <Button
                      onClick={() => downloadImage(img.url, img.name)}
                      variant="outline"
                      size="sm"
                      className="dark:text-white dark:border-gray-500 hover:dark:bg-gray-600 w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Page {index + 1}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Upload the PDF file you want to convert.</li>
          <li>Click "Convert to Images". The tool will process each page.</li>
          <li>Previews of the generated images will appear.</li>
          <li>Click "Download Page X" for each image you want to save.</li>
        </ul>
      </div>
    </div>
  );
};

export default PdfToImage;