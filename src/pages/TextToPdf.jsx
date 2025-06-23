import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Download, Type as TypeIcon, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { jsPDF } from "jspdf";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const TextToPdf = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [textInput, setTextInput] = useState("");
  const { toast } = useToast();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "text/plain") {
        setFile(selectedFile);
        setFileName(selectedFile.name.replace(/\.txt$/, ''));
        const reader = new FileReader();
        reader.onload = (e) => setTextInput(e.target.result);
        reader.readAsText(selectedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select a .txt file.",
          variant: "destructive",
        });
        setFile(null);
        setFileName("");
        setTextInput("");
      }
    }
  };

  const convertToPdf = () => {
    if (!textInput.trim() && !file) {
      toast({
        title: "No text input",
        description: "Please enter some text or upload a .txt file.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'pt',
        format: 'a4'
      });
      pdf.setFont('Helvetica', 'normal'); 
      pdf.setFontSize(12); 

      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 40; 
      const usableWidth = pageWidth - 2 * margin;
      const usableHeight = pageHeight - 2 * margin;
      let yPosition = margin;

      const lines = pdf.splitTextToSize(textInput, usableWidth);
      
      lines.forEach(line => {
        if (yPosition + 12 > usableHeight + margin) { 
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += 15; 
      });
      
      pdf.save(`${fileName || 'text-document'}.pdf`);
      toast({
        title: "Conversion Successful!",
        description: `Your text has been converted to PDF and downloaded as '${fileName || 'text-document'}.pdf'.`,
      });
    } catch (error) {
      console.error("Text to PDF conversion error:", error);
      toast({
        title: "Conversion Error",
        description: "Could not convert text to PDF. Please try again or check your input.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Text to PDF Converter - Free Online Tool | Toolzenix</title>
        <meta name="description" content="Convert plain text or .txt files into professional PDF documents. Free, fast, and secure text to PDF conversion. Ideal for reports, notes, and sharing." />
        <link rel="canonical" href="https://toolzenix.com/text-to-pdf" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
         Text to PDF Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Easily turn your plain text or .txt files into universally accessible PDF documents. This tool is perfect for creating reports, saving notes, or sharing text in a fixed, professional format.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
      >
        <div className="flex flex-col items-center justify-center">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type or paste your text here... Your content will be formatted into a standard PDF document."
            className="w-full h-48 p-3 border border-gray-300 dark:border-gray-600 rounded-md mb-4 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500"
            aria-label="Text input for PDF conversion"
          />
          
          <div className="text-center my-4 text-gray-600 dark:text-gray-400">OR</div>

          <div className="w-full max-w-md">
            <label
              htmlFor="txt-upload"
              className="relative block w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              <input
                id="txt-upload"
                type="file"
                accept=".txt,text/plain"
                onChange={handleFileChange}
                className="sr-only"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {file ? (
                  <>
                    <TypeIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400 mb-2" />
                    <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                      {file.name}
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      Upload a .txt file
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>

          <div className="mt-8 w-full flex justify-center">
            <Button
              onClick={convertToPdf}
              disabled={loading || (!textInput.trim() && !file)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-base px-6"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Converting...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Convert & Download PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
      <div className="mt-12 prose dark:prose-invert max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-semibold mb-4">Why Use Our Text to PDF Converter?</h2>
        <p>Converting text to PDF offers several advantages. PDFs maintain formatting consistency across all devices and operating systems, ensuring your document looks the same everywhere. They are ideal for professional documents, archival, and print-ready outputs. Unlike plain text files, PDFs can be secured with passwords and are generally not as easily editable, offering a layer of content integrity. Our Text to PDF converter is a straightforward tool for quickly transforming your notes, articles, or any plain text into a shareable and printable PDF document. This is particularly useful when you need a simple way to package text without complex formatting, differing from tools like <Link to="/word-to-pdf">Word to PDF</Link> or <Link to="/html-to-pdf">HTML to PDF</Link> which handle richer content structures.</p>
        <p>This tool directly converts your raw text input or the content of an uploaded .txt file into a standard A4 PDF. It automatically handles line breaks and text flow within the PDF pages. For more advanced PDF manipulations, such as merging or splitting, explore our other <Link to="/document-converters">Document Tools</Link>.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">How to Use This Tool:</h3>
        <ul className="list-decimal pl-5 space-y-1">
          <li>Type or paste the text you want to convert into the provided text area.</li>
          <li>Alternatively, click the upload area to select a .txt file from your computer. The text from the file will populate the text area.</li>
          <li>Click the "Convert & Download PDF" button.</li>
          <li>The tool will process your text and a PDF file will be automatically downloaded to your device. The filename will be based on the uploaded file's name or default to 'text-document.pdf'.</li>
        </ul>
        <p className="mt-4">Whether you're a student saving lecture notes, a writer drafting articles, or anyone needing a quick way to make text universally viewable and printable, our Text to PDF converter is a simple and efficient solution. For extracting text from a PDF, try our <Link to="/pdf-to-text">PDF to Text</Link> tool. Discover more utilities on our <Link to="/tools">All Tools</Link> page.</p>
      </div>
    </div>
  );
};

export default TextToPdf;