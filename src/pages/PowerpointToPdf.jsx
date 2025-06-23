import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Download, Presentation as PresentationIcon, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { jsPDF } from "jspdf";
import { Helmet } from "react-helmet-async";

const PowerpointToPdf = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const { toast } = useToast();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith(".ppt") || selectedFile.name.endsWith(".pptx")) {
        setFile(selectedFile);
        setFileName(selectedFile.name.replace(/\.(pptx?)$/, ''));
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select a .ppt or .pptx file.",
          variant: "destructive",
        });
        setFile(null);
        setFileName("");
      }
    }
  };

  const convertToPdf = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PowerPoint file to convert.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'letter' });
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          // This is a placeholder conversion. True PPT/PPTX to PDF conversion is complex.
          // We'll create a simple PDF with file info as a placeholder.
          const div = document.createElement('div');
          div.style.width = `${pdf.internal.pageSize.getWidth()}px`;
          div.style.height = `${pdf.internal.pageSize.getHeight()}px`;
          div.style.padding = '40pt';
          div.style.boxSizing = 'border-box';
          div.style.backgroundColor = 'white';
          div.style.color = 'black';
          div.style.fontFamily = 'Arial, sans-serif';
          div.style.fontSize = '14pt';
          div.style.lineHeight = '1.5';
          div.innerHTML = `
            <h1 style="text-align: center; color: #333; font-size: 24pt; margin-bottom: 30pt;">PowerPoint File Information</h1>
            <p style="font-size: 16pt; margin-bottom: 15pt;">File Name: ${file.name}</p>
            <p style="font-size: 16pt; margin-bottom: 15pt;">Size: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
            <hr style="margin: 30pt 0; border-top: 1pt solid #ccc;"/>
            <p style="text-align: center; font-size: 12pt; color: #666;">
              This is a basic PDF representation. Full conversion of PowerPoint slides to PDF with preserved formatting requires specialized software.
              <br/>Consider using Microsoft PowerPoint or Google Slides for accurate conversion.
            </p>
          `;

          document.body.appendChild(div);
          await pdf.html(div, {
            callback: function(doc) {
              doc.save(`${fileName || 'converted'}.pdf`);
              document.body.removeChild(div);
              toast({
                title: "PDF Information Generated!",
                description: "A PDF with file information has been created. For full conversion, please use dedicated PowerPoint software.",
              });
            },
            x: 0,
            y: 0,
            html2canvas: { scale: 0.75, useCORS: true },
            margin: [40, 40, 40, 40]
          });
        } catch (error) {
          console.error("PDF generation error:", error);
          toast({
            title: "Conversion Error",
            description: "Could not generate PDF information. Please try a different file or use Microsoft PowerPoint.",
            variant: "destructive",
          });
        }
      };
      // Reading as text is not ideal for binary PPT files, but for this placeholder it's okay.
      // For a real conversion, you'd need a library that parses PPT/PPTX.
      reader.readAsArrayBuffer(file); // Changed to ArrayBuffer for potential future library use
    } catch (error) {
      console.error("PowerPoint to PDF conversion error:", error);
      toast({
        title: "Conversion Error",
        description: "Could not process the PowerPoint file. Please ensure it's a valid .ppt or .pptx file.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>PowerPoint to PDF Converter - Free Online Tool | Toolzenix</title>
        <meta name="description" content="Convert .ppt or .pptx presentations to PDF format. Free, fast, and secure PowerPoint to PDF conversion." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          📽️➡️📄 PowerPoint to PDF Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Export PowerPoint presentations (.ppt, .pptx) to shareable PDFs.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <label
              htmlFor="ppt-upload"
              className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-cyan-500 dark:hover:border-cyan-400 transition-colors"
            >
              <input
                id="ppt-upload"
                type="file"
                accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                onChange={handleFileChange}
                className="sr-only"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {file ? (
                  <>
                    <PresentationIcon className="w-12 h-12 text-cyan-500 dark:text-cyan-400 mb-4" />
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
                      Drag and drop your PowerPoint file here, or click to select
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      Supports .ppt and .pptx formats
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>

          {file && (
            <div className="mt-8 w-full flex justify-center">
              <Button
                onClick={convertToPdf}
                disabled={loading}
                className="bg-cyan-600 hover:bg-cyan-700 text-white py-3 text-base px-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Generate PDF Information
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </motion.div>
      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Upload your PowerPoint file (.ppt or .pptx).</li>
          <li>Click the "Generate PDF Information" button.</li>
          <li>A PDF containing information about your file will be downloaded.</li>
          <li>Note: This tool provides basic file information in PDF format. For full slide-to-PDF conversion with preserved formatting, please use dedicated software like Microsoft PowerPoint or Google Slides.</li>
        </ul>
      </div>
    </div>
  );
};

export default PowerpointToPdf;