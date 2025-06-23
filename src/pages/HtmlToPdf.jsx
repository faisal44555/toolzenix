import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Code, FileText, Download, Loader2, Upload } from 'lucide-react';
import jsPDF from 'jspdf';
import { Link } from "react-router-dom";

const HtmlToPdf = () => {
  const [htmlContent, setHtmlContent] = useState('<h1>Hello World!</h1><p>This is a sample HTML content to be converted to PDF.</p>');
  const [fileName, setFileName] = useState('converted-html');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const printRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'text/html') {
        setFileName(file.name.replace(/\.(html|htm)$/, ''));
        const reader = new FileReader();
        reader.onload = (e) => {
          setHtmlContent(e.target.result);
        };
        reader.readAsText(file);
      } else {
        toast({
          title: 'Invalid File Type',
          description: 'Please upload an HTML (.html, .htm) file.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleConvertToPdf = async () => {
    if (!htmlContent.trim()) {
      toast({ title: 'No HTML Content', description: 'Please provide HTML content or upload an HTML file.', variant: 'destructive' });
      return;
    }
    setLoading(true);

    toast({
      title: "Downloading file...",
      description: "See notification for download status.",
      duration: 3000,
    });

    try {
      const pdf = new jsPDF('p', 'pt', 'a4');
      
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.width = `${pdf.internal.pageSize.getWidth() - 80}pt`;
      tempContainer.innerHTML = htmlContent;
      document.body.appendChild(tempContainer);

      await pdf.html(tempContainer, {
        callback: function (doc) {
          doc.save(`${fileName}.pdf`);
          toast({ title: 'Conversion Successful', description: `HTML converted to ${fileName}.pdf` });
        },
        x: 40,
        y: 40,
        windowWidth: tempContainer.scrollWidth,
        html2canvas: {
            scale: 0.75,
            useCORS: true,
            logging: false,
        }
      });

      document.body.removeChild(tempContainer);

    } catch (error) {
      console.error("HTML to PDF conversion error:", error);
      toast({ title: 'Conversion Failed', description: 'An error occurred during PDF generation.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Helmet>
        <title>HTML to PDF Converter - Convert HTML to PDF Online | Toolzenix</title>
        <meta name="description" content="Easily convert HTML code or .html files to PDF documents online. Preserve layout and styles. Free, fast, and client-side conversion for privacy and security." />
        <link rel="canonical" href="https://toolzenix.com/html-to-pdf" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Code className="w-16 h-16 text-orange-500 dark:text-orange-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            HTML to PDF Converter
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Convert your HTML code or .html files into well-formatted PDF documents. Ideal for web page archiving, report generation, or sharing web content in a fixed layout.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <Label htmlFor="html-content" className="text-gray-700 dark:text-gray-300 flex items-center mb-1">
              <FileText size={16} className="mr-2 text-orange-500"/> HTML Content
            </Label>
            <textarea
              id="html-content"
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              placeholder="Paste your HTML code here..."
              className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500"
              aria-label="HTML content input"
            />
          </div>

          <div className="text-center my-2 text-gray-600 dark:text-gray-400">OR</div>

          <div>
            <Label htmlFor="html-file" className="text-gray-700 dark:text-gray-300 flex items-center mb-1">
              <Upload size={16} className="mr-2 text-orange-500"/> Upload HTML File
            </Label>
            <Input
              id="html-file"
              type="file"
              accept=".html,.htm"
              onChange={handleFileChange}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600 file:text-orange-500 file:dark:text-orange-400"
            />
          </div>
          
          <div>
            <Label htmlFor="file-name" className="text-gray-700 dark:text-gray-300 flex items-center mb-1">
              Output PDF Name
            </Label>
            <Input
              id="file-name"
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="e.g., my-document"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <Button onClick={handleConvertToPdf} className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white py-3 text-lg" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin"/> Converting...
              </>
            ) : (
              <>
                <Download size={20} className="mr-2"/> Convert & Download PDF
              </>
            )}
          </Button>
          
          <div ref={printRef} style={{ display: 'none' }}></div>

        </motion.div>

        <div className="mt-12 prose dark:prose-invert max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold mb-4">About Our HTML to PDF Converter</h2>
          <p>Our HTML to PDF Converter is a powerful tool that allows you to transform HTML code or complete .html files into high-quality PDF documents. This is particularly useful for archiving web pages, creating printable versions of online content, generating reports from dynamic HTML, or sharing web designs in a universally accessible format. The converter attempts to preserve the layout, styling (including CSS), and images from your HTML input.</p>
          <p>The conversion process utilizes jsPDF and html2canvas libraries to render the HTML content and then capture it into a PDF. All processing is done client-side in your browser, ensuring that your HTML data is not uploaded to any server, thus maintaining your privacy and security. If you need to convert plain text to PDF, our <Link to="/text-to-pdf">Text to PDF Converter</Link> might be more suitable. Explore other <Link to="/document-converters">Document Tools</Link> for more conversion options.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">How to Use This Tool:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Either paste your HTML code directly into the "HTML Content" text area, or click "Upload HTML File" to select an .html or .htm file from your device.</li>
            <li>Optionally, enter a desired name for your output PDF in the "Output PDF Name" field. If left blank, a default name will be used.</li>
            <li>Click the "Convert & Download PDF" button.</li>
            <li>The tool will process the HTML and generate a PDF. This may take a few moments, especially for complex HTML with many elements or large images.</li>
            <li>Once ready, the PDF file will be automatically downloaded to your device.</li>
          </ol>
          <p className="mt-4"><strong>Note:</strong> Complex JavaScript-driven dynamic content or very intricate CSS layouts might not always render perfectly. For best results, ensure your HTML is well-structured and uses standard CSS. External resources like images or stylesheets should be accessible (e.g., via CORS if hosted elsewhere) or embedded if possible. For simpler text conversion needs, see our <Link to="/text-to-pdf">Text to PDF tool</Link>. For a full range of utilities, visit our <Link to="/tools">All Tools</Link> page.</p>
        </div>
      </div>
    </>
  );
};

export default HtmlToPdf;