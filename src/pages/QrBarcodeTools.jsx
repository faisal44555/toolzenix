import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, QrCode, Barcode, Wifi, Contact, UploadCloud, ScanLine, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

const tools = [
  {
    title: "QR Code Generator",
    description: "Create QR codes for URLs, text, email, phone.",
    icon: <QrCode className="w-6 h-6" />,
    link: "/qr-code-generator",
    color: "bg-green-500"
  },
  {
    title: "QR Code Scanner (Webcam)",
    description: "Scan QR codes using your device's camera.",
    icon: <ScanLine className="w-6 h-6" />,
    link: "/qr-code-scanner",
    color: "bg-blue-500"
  },
  {
    title: "Barcode Generator",
    description: "Generate various barcode types (EAN-13, Code128).",
    icon: <Barcode className="w-6 h-6" />,
    link: "/barcode-generator",
    color: "bg-purple-500"
  },
  {
    title: "Barcode Scanner (Webcam/Upload)",
    description: "Scan barcodes using camera or by uploading an image.",
    icon: <ScanLine className="w-6 h-6" />,
    link: "/barcode-scanner",
    color: "bg-yellow-500 text-gray-800"
  },
  {
    title: "WiFi QR Generator",
    description: "Create QR codes for easy WiFi network sharing.",
    icon: <Wifi className="w-6 h-6" />,
    link: "/wifi-qr-generator",
    color: "bg-red-500"
  },
  {
    title: "vCard QR Generator",
    description: "Generate QR codes for contact cards (vCard).",
    icon: <Contact className="w-6 h-6" />,
    link: "/vcard-qr-generator",
    color: "bg-indigo-500"
  },
  {
    title: "QR Image Decoder",
    description: "Upload and decode QR codes from images.",
    icon: <UploadCloud className="w-6 h-6" />,
    link: "/qr-image-decoder",
    color: "bg-teal-500"
  }
];

const QrBarcodeTools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Helmet>
        <title>QR & Barcode Tools - Free Online Generators & Scanners | Toolzenix</title>
        <meta name="description" content="A complete suite of free online QR and Barcode tools. Generate, scan, and decode various types of QR codes and barcodes securely in your browser." />
        <link rel="canonical" href="https://toolzenix.com/qr-barcode-tools" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          QR & Barcode Tools
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Generate, scan, and decode QR codes and barcodes with ease. All tools are frontend-only and secure.
        </p>
      </motion.div>

      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search QR/Barcode tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex"
          >
            <Link to={tool.link} className="block group w-full">
              <div className="flex items-start space-x-3 sm:space-x-4 h-full">
                <div className={`${tool.color} p-2 sm:p-3 rounded-lg text-white mt-1`}>
                  {tool.icon}
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-500">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 flex-grow">
                    {tool.description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    <span>Use Tool</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-8 text-white text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Secure & Private</h2>
        <p className="text-indigo-100">
          Your data never leaves your browser. All QR and barcode processing is done client-side for maximum privacy and speed.
        </p>
      </motion.div>
    </div>
  );
};

export default QrBarcodeTools;