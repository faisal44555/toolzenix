import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileSpreadsheet, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ExcelJS from 'exceljs';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Helmet } from "react-helmet-async";

const ExcelToPdf = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const { toast } = useToast();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith(".xls") || selectedFile.name.endsWith(".xlsx")) {
        setFile(selectedFile);
        setFileName(selectedFile.name.replace(/\.(xlsx?)$/, ''));
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an .xls or .xlsx file.",
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
        description: "Please select an Excel file to convert.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    toast({
      title: "Downloading file...",
      description: "See notification for download status.",
      duration: 3000,
    });

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const buffer = e.target.result;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);
        
        const pdf = new jsPDF({ orientation: 'l', unit: 'pt', format: 'a4' });
        let firstSheet = true;

        workbook.eachSheet((worksheet, sheetId) => {
          if (!firstSheet) {
            pdf.addPage('a4', 'l');
          }
          firstSheet = false;

          pdf.setFontSize(16);
          pdf.text(worksheet.name, 40, 40);
          
          const head = [];
          const body = [];
          
          worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            const rowValues = [];
            row.eachCell({ includeEmpty: true }, (cell) => {
              rowValues.push(cell.value ? cell.value.toString() : '');
            });
            if (rowNumber === 1 && head.length === 0) { 
              head.push(rowValues);
            } else {
              body.push(rowValues);
            }
          });

          pdf.autoTable({
            head: head,
            body: body,
            startY: 60,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
            headStyles: { fillColor: [22, 160, 133], textColor: 255, fontStyle: 'bold' },
            margin: { top: 60, right: 40, bottom: 40, left: 40 },
            tableWidth: 'auto',
          });
        });
        
        pdf.save(`${fileName || 'converted'}.pdf`);
        toast({
          title: "Conversion Successful!",
          description: `${file.name} has been converted to PDF and downloaded.`,
        });
      };
      reader.readAsArrayBuffer(file);

    } catch (error) {
      console.error("Excel to PDF conversion error:", error);
      toast({
        title: "Conversion Error",
        description: "Could not convert the Excel file to PDF. Please ensure it's a valid .xls or .xlsx file.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Excel to PDF Converter - Free Online Tool | Toolzenix</title>
        <meta name="description" content="Convert .xls or .xlsx spreadsheets into clean, printable PDF documents. Free, fast, and secure Excel to PDF conversion." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          📊➡️📄 Excel to PDF Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Convert .xls or .xlsx spreadsheets into clean, printable PDF documents.
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
              htmlFor="excel-upload"
              className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-teal-500 dark:hover:border-teal-400 transition-colors"
            >
              <input
                id="excel-upload"
                type="file"
                accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleFileChange}
                className="sr-only"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {file ? (
                  <>
                    <FileSpreadsheet className="w-12 h-12 text-teal-500 dark:text-teal-400 mb-4" />
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
                      Drag and drop your Excel file here, or click to select
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      Supports .xls and .xlsx formats
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
                className="bg-teal-600 hover:bg-teal-700 text-white py-3 text-base px-6"
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
          )}
        </div>
      </motion.div>
      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Upload your Excel file (.xls or .xlsx).</li>
          <li>Click the "Convert & Download PDF" button.</li>
          <li>Your file will be processed in your browser and the PDF will be downloaded automatically.</li>
          <li>Each sheet in the Excel file will be converted to a new page in the PDF.</li>
        </ul>
      </div>
    </div>
  );
};

export default ExcelToPdf;