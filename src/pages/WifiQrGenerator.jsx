import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import QRCodeStyling from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download, Wifi as WifiIcon, Lock, Eye, EyeOff, Palette, Settings, Info, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const WifiQrGenerator = () => {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [encryption, setEncryption] = useState("WPA"); // WPA, WEP, nopass
  const [isHidden, setIsHidden] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrSize, setQrSize] = useState(256);
  const [level, setLevel] = useState("M");

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

  const generateWifiQrValue = () => {
    let value = `WIFI:S:${ssid};`;
    if (encryption !== "nopass") {
      value += `T:${encryption};P:${password};`;
    } else {
      value += `T:nopass;`;
    }
    value += `H:${isHidden.toString()};`;
    return value;
  };

  const handleDownload = () => {
    if (!ssid) {
      toast({
        title: "Cannot Download",
        description: "Please provide a Network Name (SSID) to generate a QR code.",
        variant: "destructive",
      });
      return;
    }
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "wifi_qrcode.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast({ title: "Downloaded!", description: "WiFi QR Code image downloaded." });
    } else {
      toast({ title: "Error", description: "Could not find the QR code to download. Please try again.", variant: "destructive" });
    }
  };

  return (
    <ToolPageLayout
      pageTitle="WiFi QR Code Generator"
      pageDescription="Generate a QR code for your WiFi network. Allow guests to connect easily by scanning. Supports WPA/WEP/Open networks and hidden SSIDs."
      canonicalPath="/wifi-qr-generator"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-6"
        >
          <div>
            <Label htmlFor="ssid" className="text-gray-700 dark:text-gray-300 mb-2 block">Network Name (SSID)</Label>
            <Input id="ssid" type="text" value={ssid} onChange={(e) => setSsid(e.target.value)} placeholder="MyWiFiNetwork" />
          </div>

          <div>
            <Label htmlFor="encryption" className="text-gray-700 dark:text-gray-300 mb-2 block">Encryption Type</Label>
            <Select value={encryption} onValueChange={setEncryption}>
              <SelectTrigger id="encryption"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="WPA">WPA/WPA2/WPA3</SelectItem>
                <SelectItem value="WEP">WEP</SelectItem>
                <SelectItem value="nopass">No Password (Open)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {encryption !== "nopass" && (
            <div>
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 mb-2 block">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Your WiFi Password" 
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-2 pt-2">
            <input type="checkbox" id="isHidden" checked={isHidden} onChange={(e) => setIsHidden(e.target.checked)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <Label htmlFor="isHidden" className="text-sm text-gray-700 dark:text-gray-300">Network is Hidden</Label>
          </div>

          <div className="space-y-3 pt-4 border-t dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center"><Palette className="w-5 h-5 mr-2 text-blue-500"/>Customize QR Code</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fgColor" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Foreground Color</Label>
                <Input id="fgColor" type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-full h-10 p-1" />
              </div>
              <div>
                <Label htmlFor="bgColor" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Background Color</Label>
                <Input id="bgColor" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 p-1" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="qrSize" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Size (px)</Label>
                <Input id="qrSize" type="number" value={qrSize} onChange={handleSizeChange} min="128" max="2048" />
              </div>
              <div>
                <Label htmlFor="errorLevelWifi" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Error Correction</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger id="errorLevelWifi"><SelectValue /></SelectTrigger>
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
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center"
        >
          <div ref={qrRef} className="p-4 bg-white inline-block rounded-md mb-6">
            {ssid ? (
              <QRCodeStyling
                value={generateWifiQrValue()}
                size={Math.max(128, Math.min(Number(qrSize) || 256, 2048))}
                fgColor={fgColor}
                bgColor={bgColor}
                level={level}
                renderAs="canvas"
              />
            ) : (
              <div className="w-[256px] h-[256px] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 rounded text-gray-500 dark:text-gray-400 text-center p-4">
                <WifiIcon className="w-16 h-16 mb-2" />
                <p>Enter WiFi details to generate QR</p>
              </div>
            )}
          </div>
          <Button onClick={handleDownload} className="w-full bg-green-500 hover:bg-green-600" disabled={!ssid}>
            <Download className="w-4 h-4 mr-2" /> Download WiFi QR Code
          </Button>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 prose dark:prose-invert max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-semibold">Seamless WiFi Sharing with QR Codes</h2>
        <p>Sharing your WiFi password can be cumbersome, especially with complex passwords. Our WiFi QR Code Generator simplifies this process immensely. By converting your network credentials into a scannable QR code, guests and new devices can connect to your WiFi in seconds without manual input.</p>
        <h3 className="text-xl font-semibold">How It Works</h3>
        <p>This tool encodes your WiFi network's SSID (name), password, and encryption type into a standard QR code format. When scanned by a compatible smartphone or tablet, the device automatically recognizes it as WiFi network information and prompts the user to connect. This is particularly useful for guest networks, cafes, offices, or even at home.</p>
        <h3 className="text-xl font-semibold">Key Features & Benefits:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Effortless Connection:</strong> No more typing long passwords. Just scan and connect.</li>
          <li><strong>Security:</strong> Supports WPA/WPA2/WPA3, WEP, and open network configurations.</li>
          <li><strong>Hidden Networks:</strong> Option to create QR codes for hidden SSIDs.</li>
          <li><strong>Customization:</strong> Change QR code colors, size, and error correction level to suit your needs or branding.</li>
          <li><strong>Privacy-Focused:</strong> All processing is done client-side in your browser. Your WiFi details are never sent to our servers.</li>
        </ul>
        <p>For quickly sharing contact details, check out our <Link to="/vcard-qr-generator" className="text-blue-600 dark:text-blue-400 hover:underline">vCard QR Generator</Link>. If you need to generate general purpose QR codes, try the main <Link to="/qr-code-generator" className="text-blue-600 dark:text-blue-400 hover:underline">QR Code Generator</Link>.</p>
      </motion.div>
    </ToolPageLayout>
  );
};

export default WifiQrGenerator;