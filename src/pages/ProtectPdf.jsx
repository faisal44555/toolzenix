import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Download, Lock, FileText, Loader2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Helmet } from "react-helmet-async";

const ProtectPdf = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setFileName(selectedFile.name.replace(/\.pdf$/, ''));
        setPassword("");
        setConfirmPassword("");
      } else {
        toast({ title: "Invalid file type", description: "Please select a .pdf file.", variant: "destructive" });
        setFile(null); setFileName("");
      }
    }
  };

  const protectPdf = async () => {
    if (!file) {
      toast({ title: "No file selected", description: "Please select a PDF file.", variant: "destructive" });
      return;
    }
    if (!password) {
      toast({ title: "Password required", description: "Please enter a password.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Password too short", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Passwords do not match", description: "Please ensure passwords match.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      pdfDoc.encrypt({
        userPassword: password,
        ownerPassword: password, // You can set a different owner password for more control
        permissions: {
          printing: 'highResolution', // Allowed
          modifying: true,          // Allowed
          copying: true,            // Allowed
          annotating: true,         // Allowed
          fillingForms: true,       // Allowed (optional)
          contentAccessibility: true, // Allowed (optional, for screen readers)
          documentAssembly: true,   // Allowed
        }
      });

      const pdfBytes = await pdfDoc.save();
      saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `${fileName}_protected.pdf`);
      toast({ title: "Protection Successful!", description: `PDF protected with password and downloaded.` });
      setFile(null); setFileName(""); setPassword(""); setConfirmPassword("");
    } catch (error) {
      console.error("PDF Protection error:", error);
      toast({ title: "Protection Error", description: error.message || "Could not protect PDF. The PDF might already be encrypted or corrupted.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Protect PDF with Password - Secure Your PDFs | Toolzenix</title>
        <meta name="description" content="Add password encryption to any PDF for safety and privacy. Free and secure online PDF protection tool." />
      </Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">🔐📄 Protect PDF with Password</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">Add password encryption to any PDF for safety and privacy.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
        <div className="flex flexcol items-center justify-center">
          <div className="w-full max-w-md">
            <label htmlFor="pdf-upload" className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-rose-500 dark:hover:border-rose-400 transition-colors">
              <input id="pdf-upload" type="file" accept="application/pdf" onChange={handleFileChange} className="sr-only" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {file ? (
                  <>
                    <FileText className="w-12 h-12 text-rose-500 dark:text-rose-400 mb-4" />
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password (min. 6 characters)</label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter password" 
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
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                <Input id="confirmPassword" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" className="dark:bg-gray-700 dark:text-white" />
              </div>
              <div className="pt-2 flex justify-center">
                <Button 
                  onClick={protectPdf} 
                  disabled={loading || !password || password !== confirmPassword || password.length < 6} 
                  className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Lock className="w-5 h-5 mr-2" />}
                  Protect & Download PDF
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Upload the PDF file you want to protect.</li>
          <li>Enter a strong password (at least 6 characters).</li>
          <li>Confirm the password.</li>
          <li>Click "Protect & Download PDF". Your encrypted file will be downloaded.</li>
        </ul>
      </div>
    </div>
  );
};

export default ProtectPdf;