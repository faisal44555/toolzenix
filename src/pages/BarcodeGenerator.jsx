import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import JsBarcode from "jsbarcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download, Barcode as BarcodeIcon, Palette, Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const barcodeFormats = [
  { value: "CODE128", label: "CODE128", default: "Toolzenix" },
  { value: "EAN13", label: "EAN-13 (12 digits + checksum)", default: "123456789012" },
  { value: "UPCA", label: "UPC-A (11 digits + checksum)", default: "01234567890" },
  { value: "CODE39", label: "CODE39", default: "HELLO WORLD" },
  { value: "ITF14", label: "ITF-14 (13 digits + checksum)", default: "1234567890123" },
  { value: "MSI", label: "MSI", default: "12345678" },
  { value: "pharmacode", label: "Pharmacode", default: "12345" },
];

const BarcodeGenerator = () => {
  const [format, setFormat] = useState(barcodeFormats[0].value);
  const [value, setValue] = useState(barcodeFormats[0].default);
  const [lineColor, setLineColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(100);
  const [displayValue, setDisplayValue] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const barcodeRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    const selectedFormat = barcodeFormats.find(f => f.value === format);
    if (selectedFormat) {
      setValue(selectedFormat.default);
    }
  }, [format]);

  useEffect(() => {
    if (barcodeRef.current && value) {
      try {
        JsBarcode(barcodeRef.current, value, {
          format: format,
          lineColor: lineColor,
          background: bgColor,
          width: width,
          height: height,
          displayValue: displayValue,
          font: "monospace",
          textAlign: "center",
          textPosition: "bottom",
          textMargin: 2,
          fontSize: 20,
          margin: 10,
          valid: function (valid) {
            if (!valid) {
              setErrorMessage("Invalid input for selected barcode type.");
            } else {
              setErrorMessage("");
            }
          }
        });
      } catch (e) {
        setErrorMessage("Error generating barcode: " + e.message);
        if (barcodeRef.current) {
            const context = barcodeRef.current.getContext('2d');
            context.clearRect(0, 0, barcodeRef.current.width, barcodeRef.current.height);
        }
      }
    }
  }, [value, format, lineColor, bgColor, width, height, displayValue]);

  const handleDownload = () => {
    if (barcodeRef.current && !errorMessage) {
      const svgUrl = barcodeRef.current.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = svgUrl;
      downloadLink.download = `${format.toLowerCase()}_barcode.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast({ title: "Downloaded!", description: "Barcode image downloaded." });
    } else if (errorMessage) {
      toast({ title: "Error", description: `Cannot download: ${errorMessage}`, variant: "destructive" });
    } else {
      toast({ title: "Error", description: "Could not download barcode.", variant: "destructive" });
    }
  };

  return (
    <ToolPageLayout
      pageTitle="Barcode Generator"
      pageDescription="Easily generate various types of barcodes like CODE128, EAN-13, UPC-A, CODE39, and more. Customize colors, size, and download as PNG. Perfect for inventory, retail, or personal use."
      canonicalPath="/barcode-generator"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-6"
        >
          <div>
            <Label htmlFor="barcodeFormat" className="text-gray-700 dark:text-gray-300 mb-2 block">Barcode Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger id="barcodeFormat"><SelectValue /></SelectTrigger>
              <SelectContent>
                {barcodeFormats.map(f => (
                  <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="barcodeValue" className="text-gray-700 dark:text-gray-300 mb-2 block">Data / Value</Label>
            <Input
              id="barcodeValue"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter barcode data"
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center"><Palette className="w-5 h-5 mr-2 text-blue-500"/>Customize Appearance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lineColor" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Line Color</Label>
                <Input id="lineColor" type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} className="w-full h-10 p-1" />
              </div>
              <div>
                <Label htmlFor="bgColor" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Background Color</Label>
                <Input id="bgColor" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 p-1" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center"><Settings className="w-5 h-5 mr-2 text-green-500"/>Barcode Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="barWidth" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Bar Width (1-4)</Label>
                <Input id="barWidth" type="number" value={width} onChange={(e) => setWidth(Math.max(1, Math.min(4, parseInt(e.target.value,10))))} min="1" max="4" />
              </div>
              <div>
                <Label htmlFor="barHeight" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Bar Height (px)</Label>
                <Input id="barHeight" type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value,10))} min="20" max="300" />
              </div>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <input type="checkbox" id="displayValue" checked={displayValue} onChange={(e) => setDisplayValue(e.target.checked)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <Label htmlFor="displayValue" className="text-sm text-gray-700 dark:text-gray-300">Display Value</Label>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center"
        >
          <div className="p-4 bg-white inline-block rounded-md mb-6 min-h-[150px] flex items-center justify-center w-full">
            {errorMessage ? (
              <p className="text-red-500 text-center">{errorMessage}</p>
            ) : (
              <canvas ref={barcodeRef} className="max-w-full h-auto" />
            )}
          </div>
          <Button onClick={handleDownload} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-base" disabled={!!errorMessage}>
            <Download className="w-5 h-5 mr-2" /> Download Barcode
          </Button>
        </motion.div>
      </div>

      <div className="mt-12 prose dark:prose-invert max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-semibold mb-4">About Our Barcode Generator</h2>
        <p>Our Barcode Generator is a versatile tool designed to help you create a wide array of barcode types suitable for various applications. Whether you're managing inventory, setting up retail products, or organizing personal items, generating the right barcode is crucial. This tool supports popular formats like CODE128 for general use, EAN-13 and UPC-A for retail products, CODE39 for alphanumeric data, and more specialized types like ITF-14 and Pharmacode.</p>
        <p>You have full control over the appearance of your barcode. Adjust the line color, background color, bar width, and height to match your specific needs or branding. Additionally, you can choose whether to display the encoded value beneath the barcode for easy human readability. This feature is particularly useful for labels where both machine scanning and manual identification are required. The generator validates your input in real-time for certain barcode types, ensuring the data conforms to the standard and reducing errors. Once you're satisfied with the preview, you can download the barcode as a high-quality PNG image, ready for printing or digital use. Explore other <Link to="/qr-barcode-tools">QR & Barcode Tools</Link> or check out our <Link to="/qr-code-generator">QR Code Generator</Link> for different needs.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">How to Use This Tool:</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Select your desired "Barcode Format" from the dropdown menu. Each format has specific use cases and data requirements.</li>
          <li>Enter the data or value you want to encode into the "Data / Value" field. Ensure the data matches the selected format's rules (e.g., digit count for EAN-13).</li>
          <li>Customize the barcode's appearance using the "Line Color" and "Background Color" pickers.</li>
          <li>Fine-tune the "Barcode Settings" by adjusting "Bar Width" (typically between 1 and 4) and "Bar Height" in pixels.</li>
          <li>Decide if you want to "Display Value" (the encoded text) below the barcode by checking or unchecking the box.</li>
          <li>The barcode preview on the right will update instantly as you make changes. If there's an error with your input for the selected format, a message will appear.</li>
          <li>Once you're happy with the preview and there are no errors, click the "Download Barcode" button. The barcode will be saved as a PNG image file.</li>
        </ol>
        <p className="mt-4">This tool is perfect for small businesses needing product labels, individuals organizing their collections, or anyone requiring a quick and easy way to generate standard barcodes. For more advanced needs or different types of 2D codes, consider exploring our <Link to="/tools">full suite of tools</Link>.</p>
      </div>
    </ToolPageLayout>
  );
};

export default BarcodeGenerator;