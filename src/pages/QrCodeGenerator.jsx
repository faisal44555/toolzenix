import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import QRCodeStyling from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download, Link as LinkIcon, Mail, Phone, Type as TypeIcon, Palette, Settings, QrCode } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import { Textarea } from "@/components/ui/textarea";

const QrCodeGenerator = () => {
  const [qrType, setQrType] = useState("url");
  const [qrValue, setQrValue] = useState("https://toolzenix.com");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [text, setText] = useState("");

  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrSize, setQrSize] = useState(256);
  const [level, setLevel] = useState("M"); // L, M, Q, H

  const [generatedQrValue, setGeneratedQrValue] = useState("https://toolzenix.com");
  const qrRef = useRef(null);
  const { toast } = useToast();

  const handleSizeChange = (e) => {
    const value = e.target.value;
    if (value === "") {
        setQrSize("");
        return;
    }
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
        setQrSize(numValue);
    }
  };

  const generateQrValueFromInputs = () => {
    switch (qrType) {
      case "url": return qrValue;
      case "email": return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      case "phone": return `tel:${phoneNumber}`;
      case "text": return text;
      default: return qrValue;
    }
  };

  const handleGenerate = () => {
    const finalQrValue = generateQrValueFromInputs();
    if (!finalQrValue.trim()) {
      toast({ title: "Input Required", description: "Please enter data for the QR code.", variant: "destructive" });
      setGeneratedQrValue("");
      return;
    }
    setGeneratedQrValue(finalQrValue);
    toast({ title: "QR Code Generated", description: "Your QR code is ready in the preview area." });
  };

  const handleDownload = () => {
    if (!generatedQrValue) {
      toast({
        title: "No QR Code Generated",
        description: "Please generate a QR code first before downloading.",
        variant: "destructive",
      });
      return;
    }
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qrcode_${qrType}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast({ title: "Downloaded!", description: "QR Code image downloaded." });
    } else {
      toast({ title: "Error", description: "Could not find the QR code to download. Please try generating it again.", variant: "destructive" });
    }
  };
  
  const renderInputs = () => {
    switch (qrType) {
      case "url":
        return <Input type="url" value={qrValue} onChange={(e) => setQrValue(e.target.value)} placeholder="https://example.com" className="dark:bg-gray-700 dark:text-white"/>;
      case "email":
        return (
          <div className="space-y-3">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="recipient@example.com" className="dark:bg-gray-700 dark:text-white"/>
            <Input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Email Subject" className="dark:bg-gray-700 dark:text-white"/>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Email Body" className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
        );
      case "phone":
        return <Input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+1234567890" className="dark:bg-gray-700 dark:text-white"/>;
      case "text":
        return <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your text here" className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white h-24" />;
      default:
        return null;
    }
  };

  return (
    <ToolPageLayout
      pageTitle="QR Code Generator"
      pageDescription="Generate custom QR codes online for URLs, text, email, phone numbers, Wi-Fi, vCards, and more. Customize colors, size, and error correction level. Download your QR code instantly as a PNG."
      canonicalPath="/qr-code-generator"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-6"
        >
          <div>
            <Label htmlFor="qrType" className="text-gray-700 dark:text-gray-300 mb-2 block">QR Code Type</Label>
            <Select value={qrType} onValueChange={setQrType}>
              <SelectTrigger id="qrType" className="dark:bg-gray-700 dark:text-white dark:border-gray-600"><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="url"><LinkIcon className="inline-block w-4 h-4 mr-2" />URL</SelectItem>
                <SelectItem value="email"><Mail className="inline-block w-4 h-4 mr-2" />Email</SelectItem>
                <SelectItem value="phone"><Phone className="inline-block w-4 h-4 mr-2" />Phone Number</SelectItem>
                <SelectItem value="text"><TypeIcon className="inline-block w-4 h-4 mr-2" />Plain Text</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="qrData" className="text-gray-700 dark:text-gray-300 mb-2 block">Data</Label>
            {renderInputs()}
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center"><Palette className="w-5 h-5 mr-2 text-blue-500"/>Customize Appearance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fgColor" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Foreground Color</Label>
                <Input id="fgColor" type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-full h-10 p-1 dark:bg-gray-700" />
              </div>
              <div>
                <Label htmlFor="bgColor" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Background Color</Label>
                <Input id="bgColor" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 p-1 dark:bg-gray-700" />
              </div>
            </div>
          </div>

           <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center"><Settings className="w-5 h-5 mr-2 text-green-500"/>Advanced Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="qrSize" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Size (px)</Label>
                <Input id="qrSize" type="number" value={qrSize} onChange={handleSizeChange} min="128" max="2048" className="dark:bg-gray-700 dark:text-white"/>
              </div>
              <div>
                <Label htmlFor="errorLevel" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Error Correction</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger id="errorLevel" className="dark:bg-gray-700 dark:text-white dark:border-gray-600"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Low (L)</SelectItem>
                    <SelectItem value="M">Medium (M) - Recommended</SelectItem>
                    <SelectItem value="Q">Quartile (Q)</SelectItem>
                    <SelectItem value="H">High (H)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Button onClick={handleGenerate} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base">
            <QrCode className="w-5 h-5 mr-2" /> Generate QR Code
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center"
        >
          <div ref={qrRef} className="p-4 bg-white inline-block rounded-md mb-6">
            {generatedQrValue ? (
              <QRCodeStyling
                value={generatedQrValue}
                size={Math.max(128, Math.min(Number(qrSize) || 256, 2048))}
                fgColor={fgColor}
                bgColor={bgColor}
                level={level}
                renderAs="canvas"
              />
            ) : (
              <div className="w-[256px] h-[256px] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 rounded text-gray-500 dark:text-gray-400 p-4 text-center">
                <QrCode className="w-16 h-16 mb-2" />
                <p>Enter data and click Generate</p>
              </div>
            )}
          </div>
          <Button onClick={handleDownload} disabled={!generatedQrValue} className="w-full bg-green-500 hover:bg-green-600 text-white">
            <Download className="w-4 h-4 mr-2" /> Download QR Code
          </Button>
        </motion.div>
      </div>
    </ToolPageLayout>
  );
};

export default QrCodeGenerator;