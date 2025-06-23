import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Image, 
  FileImage, 
  ArrowRight, 
  Minimize2, 
  Maximize2, 
  Crop, 
  RotateCw, 
  FlipVertical as Flip, 
  Palette,
  Eye,
  Grid,
  Sun,
  Binary
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const converters = [
  {
    title: "JPG to PNG Converter",
    description: "Convert JPG images to PNG format with perfect quality",
    icon: <Image className="w-6 h-6" />,
    link: "/jpg-to-png",
    color: "bg-blue-500"
  },
  {
    title: "PNG to JPG Converter",
    description: "Convert PNG images to JPG format efficiently",
    icon: <FileImage className="w-6 h-6" />,
    link: "/png-to-jpg",
    color: "bg-green-500"
  },
  {
    title: "Image Compressor",
    description: "Compress images while maintaining quality",
    icon: <Minimize2 className="w-6 h-6" />,
    link: "/image-compressor",
    color: "bg-purple-500"
  },
  {
    title: "Image Resizer",
    description: "Resize images to any dimensions you need",
    icon: <Maximize2 className="w-6 h-6" />,
    link: "/image-resizer",
    color: "bg-orange-500"
  },
  {
    title: "Image Cropper",
    description: "Crop your images with precision and ease",
    icon: <Crop className="w-6 h-6" />,
    link: "/image-cropper",
    color: "bg-pink-500"
  },
  {
    title: "Image Rotator",
    description: "Rotate your images to any angle",
    icon: <RotateCw className="w-6 h-6" />,
    link: "/image-rotator",
    color: "bg-indigo-500"
  },
  {
    title: "Image Flipper",
    description: "Flip your images horizontally or vertically",
    icon: <Flip className="w-6 h-6" />,
    link: "/image-flipper",
    color: "bg-teal-500"
  },
  {
    title: "Grayscale Converter",
    description: "Convert your images to stunning grayscale",
    icon: <Palette className="w-6 h-6" />,
    link: "/image-grayscale",
    color: "bg-gray-500"
  },
  {
    title: "Image Blur",
    description: "Add beautiful blur effects to your images",
    icon: <Eye className="w-6 h-6" />,
    link: "/image-blur",
    color: "bg-cyan-500"
  },
  {
    title: "Image Pixelator",
    description: "Create awesome pixel art effects",
    icon: <Grid className="w-6 h-6" />,
    link: "/image-pixelator",
    color: "bg-amber-500"
  },
  {
    title: "Image Brightness",
    description: "Adjust image brightness with precision",
    icon: <Sun className="w-6 h-6" />,
    link: "/image-brightness",
    color: "bg-yellow-500"
  },
  {
    title: "Image to Base64",
    description: "Convert images to Base64 string format",
    icon: <Binary className="w-6 h-6" />,
    link: "/image-to-base64",
    color: "bg-rose-500"
  }
];

const ImageConverters = () => {
  return (
    <>
      <Helmet>
        <title>Image Converters & Editing Tools | Toolzenix</title>
        <meta name="description" content="Free online image tools: JPG to PNG, PNG to JPG, image compressor, resizer, cropper, rotator, flipper, grayscale, blur, pixelator, brightness, and image to Base64 converter." />
        <link rel="canonical" href="https://toolzenix.com/image-tools" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Image Tools
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Convert, compress, resize, and edit your images with perfect quality preservation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {converters.map((converter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to={converter.link} className="block group">
                <div className="flex items-start space-x-4">
                  <div className={`${converter.color} p-3 rounded-lg text-white`}>
                    {converter.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-500">
                      {converter.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {converter.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Why Choose Our Image Tools?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Fast & Free</h3>
              <p className="text-blue-100">Process your images instantly without any cost</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">High Quality</h3>
              <p className="text-blue-100">Maintain optimal image quality after processing</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Secure</h3>
              <p className="text-blue-100">Your files are processed locally in your browser</p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ImageConverters;