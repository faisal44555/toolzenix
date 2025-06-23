import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import QRCodeStyling from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, User, Phone, Mail, Briefcase, Globe, Home, Palette, Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const VCardQrGenerator = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneType, setPhoneType] = useState("CELL"); // CELL, HOME, WORK
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [title, setTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressRegion, setAddressRegion] = useState("");
  const [addressZip, setAddressZip] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [addressType, setAddressType] = useState("HOME"); // HOME, WORK

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

  const generateVCardValue = () => {
    let vCard = "BEGIN:VCARD\nVERSION:3.0\n";
    vCard += `N:${lastName};${firstName}\n`;
    vCard += `FN:${firstName} ${lastName}\n`;
    if (organization) vCard += `ORG:${organization}\n`;
    if (title) vCard += `TITLE:${title}\n`;
    if (phoneNumber) vCard += `TEL;TYPE=${phoneType},VOICE:${phoneNumber}\n`;
    if (email) vCard += `EMAIL:${email}\n`;
    if (website) vCard += `URL:${website}\n`;
    if (addressStreet || addressCity || addressRegion || addressZip || addressCountry) {
      vCard += `ADR;TYPE=${addressType}:;;${addressStreet};${addressCity};${addressRegion};${addressZip};${addressCountry}\n`;
    }
    vCard += "END:VCARD";
    return vCard;
  };

  const handleDownload = () => {
    if (!firstName && !lastName) {
      toast({
        title: "Cannot Download",
        description: "Please provide at least a first or last name to generate a QR code.",
        variant: "destructive",
      });
      return;
    }
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "vcard_qrcode.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast({ title: "Downloaded!", description: "vCard QR Code image downloaded." });
    } else {
      toast({ title: "Error", description: "Could not find the QR code to download. Please try again.", variant: "destructive" });
    }
  };

  return (
    <ToolPageLayout
      pageTitle="vCard QR Code Generator"
      pageDescription="Easily generate vCard QR codes to share your contact information (name, phone, email, address, website, etc.). Customize the QR code and download it instantly. Perfect for business cards and networking."
      canonicalPath="/vcard-qr-generator"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label htmlFor="firstName" className="mb-2 block">First Name</Label><Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" /></div>
            <div><Label htmlFor="lastName" className="mb-2 block">Last Name</Label><Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" /></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phoneNumber" className="mb-2 block">Phone Number</Label>
              <Input id="phoneNumber" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+1234567890" />
            </div>
            <div>
              <Label htmlFor="phoneType" className="mb-2 block">Phone Type</Label>
              <Select value={phoneType} onValueChange={setPhoneType}>
                <SelectTrigger id="phoneType"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="CELL">Mobile</SelectItem>
                  <SelectItem value="HOME">Home</SelectItem>
                  <SelectItem value="WORK">Work</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div><Label htmlFor="email" className="mb-2 block">Email</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john.doe@example.com" /></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label htmlFor="organization" className="mb-2 block">Organization</Label><Input id="organization" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Company Inc." /></div>
            <div><Label htmlFor="title" className="mb-2 block">Job Title</Label><Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Developer" /></div>
          </div>
          
          <div><Label htmlFor="website" className="mb-2 block">Website</Label><Input id="website" type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://example.com" /></div>

          <fieldset className="border p-4 rounded-md dark:border-gray-700">
            <legend className="text-lg font-semibold px-2 text-gray-900 dark:text-white">Address</legend>
            <div className="space-y-4 mt-2">
              <div>
                <Label htmlFor="addressType" className="mb-2 block">Address Type</Label>
                <Select value={addressType} onValueChange={setAddressType}>
                  <SelectTrigger id="addressType"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HOME">Home</SelectItem>
                    <SelectItem value="WORK">Work</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label htmlFor="addressStreet" className="mb-2 block">Street</Label><Input id="addressStreet" value={addressStreet} onChange={(e) => setAddressStreet(e.target.value)} placeholder="123 Main St" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label htmlFor="addressCity" className="mb-2 block">City</Label><Input id="addressCity" value={addressCity} onChange={(e) => setAddressCity(e.target.value)} placeholder="Anytown" /></div>
                <div><Label htmlFor="addressRegion" className="mb-2 block">State/Region</Label><Input id="addressRegion" value={addressRegion} onChange={(e) => setAddressRegion(e.target.value)} placeholder="CA" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label htmlFor="addressZip" className="mb-2 block">ZIP/Postal Code</Label><Input id="addressZip" value={addressZip} onChange={(e) => setAddressZip(e.target.value)} placeholder="90210" /></div>
                <div><Label htmlFor="addressCountry" className="mb-2 block">Country</Label><Input id="addressCountry" value={addressCountry} onChange={(e) => setAddressCountry(e.target.value)} placeholder="USA" /></div>
              </div>
            </div>
          </fieldset>
          
          <div className="space-y-3 pt-4 border-t dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center"><Palette className="w-5 h-5 mr-2 text-blue-500"/>Customize QR Code</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fgColorVcard" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Foreground Color</Label>
                <Input id="fgColorVcard" type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-full h-10 p-1" />
              </div>
              <div>
                <Label htmlFor="bgColorVcard" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Background Color</Label>
                <Input id="bgColorVcard" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 p-1" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="qrSizeVcard" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Size (px)</Label>
                <Input id="qrSizeVcard" type="number" value={qrSize} onChange={handleSizeChange} min="128" max="2048" />
              </div>
              <div>
                <Label htmlFor="errorLevelVcard" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Error Correction</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger id="errorLevelVcard"><SelectValue /></SelectTrigger>
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
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center md:sticky top-24"
        >
          <div ref={qrRef} className="p-4 bg-white inline-block rounded-md mb-6">
            {(firstName || lastName) ? (
              <QRCodeStyling
                value={generateVCardValue()}
                size={Math.max(128, Math.min(Number(qrSize) || 256, 2048))}
                fgColor={fgColor}
                bgColor={bgColor}
                level={level}
                renderAs="canvas"
              />
            ) : (
              <div className="w-full max-w-[256px] aspect-square flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 rounded text-gray-500 dark:text-gray-400 p-4 text-center">
                <User className="w-16 h-16 mb-2" />
                <p>Enter contact details to generate vCard QR</p>
              </div>
            )}
          </div>
          <Button onClick={handleDownload} className="w-full bg-green-500 hover:bg-green-600" disabled={!(firstName || lastName)}>
            <Download className="w-4 h-4 mr-2" /> Download vCard QR
          </Button>
        </motion.div>
      </div>

      <div className="mt-12 prose dark:prose-invert max-w-5xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-semibold mb-4">About Our vCard QR Code Generator</h2>
        <p>The vCard QR Code Generator is a specialized tool for creating QR codes that store contact information in the vCard format. A vCard is like a digital business card; when someone scans your vCard QR code with their smartphone, they can instantly save your contact details (name, phone number, email, address, website, etc.) to their address book. This is an incredibly efficient way to share your contact information at networking events, on business cards, or in presentations.</p>
        <p>Our generator allows you to input various pieces of contact information, including multiple phone types and address types. You can also customize the appearance of your QR code, such as its colors and size, and choose an error correction level for better scannability. The generated QR code is then available for download as a PNG image. For other types of QR codes, like those for URLs or Wi-Fi access, check out our general <Link to="/qr-code-generator">QR Code Generator</Link> or the <Link to="/wifi-qr-generator">Wi-Fi QR Generator</Link>.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">How to Use This Tool:</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Fill in the contact information fields on the left. At a minimum, provide a First Name or Last Name. Other fields like Phone Number, Email, Organization, Website, and Address are optional but recommended for a complete vCard.</li>
          <li>Select the appropriate "Phone Type" (Mobile, Home, Work) and "Address Type" (Home, Work) if you provide those details.</li>
          <li>Customize the QR code's appearance using the "Foreground Color," "Background Color," "Size," and "Error Correction" level options.</li>
          <li>The QR code preview on the right will update in real-time as you enter information and adjust settings.</li>
          <li>Once you are satisfied with the vCard details and the QR code preview, click the "Download vCard QR" button. The QR code will be saved as a PNG image file.</li>
        </ol>
        <p className="mt-4">This tool is perfect for professionals, business owners, and anyone looking for a modern and convenient way to share contact information. Explore more <Link to="/qr-barcode-tools">QR & Barcode Tools</Link> or browse <Link to="/tools">all available tools</Link> on Toolzenix.</p>
      </div>
    </ToolPageLayout>
  );
};

export default VCardQrGenerator;