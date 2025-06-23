import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Download, Unlock as UnlockIcon, FileText, Loader2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Helmet } from "react-helmet-async";

const UnlockPdf = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setFileName(selectedFile.name.replace(/\.pdf$/, ''));
        setPassword("");
      } else {
        toast({ title: "Invalid file type", description: "Please select a .pdf file.", variant: "destructive" });
        setFile(null); setFileName("");
      }
    }
  };

  const unlockPdf = async () => {
    if (!file) {
      toast({ title: "No file selected", description: "Please select a PDF file.", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { 
        ownerPassword: password, 
        userPassword: password,
        ignoreEncryption: !password // If no password provided, try to load ignoring encryption (for restricted but not open-encrypted PDFs)
      }); 
      
      const pdfBytes = await pdfDoc.save();
      saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `${fileName}_unlocked.pdf`);
      toast({ title: "Unlock Successful!", description: `PDF unlocked and downloaded.` });
      setFile(null); setFileName(""); setPassword("");
    } catch (error) {
      console.error("PDF Unlock error:", error);
      let errorMsg = "Could not unlock PDF. Ensure the PDF is valid.";
      if (error.message && error.message.toLowerCase().includes('password')) {
        errorMsg = "Incorrect password or the PDF's encryption cannot be removed with the provided password. Some PDFs may require the owner password to remove restrictions.";
      } else if (error.message) {
        errorMsg = error.message;
      }
      toast({ title: "Unlock Error", description: errorMsg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Unlock PDF - Remove Password & Restrictions | Toolzenix</title>
        <meta name="description" content="Remove password protection and restrictions from PDF files you have access to. Free and secure online PDF unlocker." />
      </Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">🔓📄 Unlock PDF</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">Remove passwords from locked PDFs that you have access to.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <label htmlFor="pdf-upload" className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-red-500 dark:hover:border-red-400 transition-colors">
              <input id="pdf-upload" type="file" accept="application/pdf" onChange={handleFileChange} className="sr-only" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {file ? (
                  <>
                    <FileText className="w-12 h-12 text-red-500 dark:text-red-400 mb-4" />
                    <p className="text-sm text-gray-700 dark:text-gray-300 text-center">{file.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Click to change file</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Drag & drop PDF or click to select</p>
                  </>
                )}
              </div>
            </label>
          </div>

          {file && (
            <div className="mt-8 w-full max-w-md space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password (if known/required to open)
                </label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter current password (optional)" 
                    className="dark:bg-gray-700 dark:text-white pr-10" 
                  />
                   <Button 
                    variant="ghost" 
                    size="icon" 
                    type="button"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="pt-2 flex justify-center">
                <Button 
                  onClick={unlockPdf} 
                  disabled={loading} 
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <UnlockIcon className="w-5 h-5 mr-2" />}
                  Unlock & Download PDF
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Upload the PDF file you want to unlock.</li>
          <li>If the PDF is password-protected for opening, enter the password. If it's only restricted (e.g., no printing), you might not need a password.</li>
          <li>Click "Unlock & Download PDF". The unlocked file will be downloaded.</li>
          <li><strong>Note:</strong> This tool cannot bypass strong encryption without the correct password. It's intended for PDFs you own or have permission to modify.</li>
        </ul>
      </div>
    </div>
  );
};

export default UnlockPdf;