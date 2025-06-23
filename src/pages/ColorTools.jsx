import React from "react";
import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { Palette, Hexagon, Droplets, Contrast, Paintbrush, Aperture, Eye, Code, Layers } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { allToolCategories } from "@/config/navigation";
import { cn } from "@/lib/utils";

const colorTools = [
  { name: "Color Picker Tool", path: "/color-picker", icon: Palette, description: "Pick colors from a visual selector." },
  { name: "HEX to RGB Converter", path: "/hex-to-rgb-converter", icon: Hexagon, description: "Convert HEX color codes to RGB." },
  { name: "RGB to HEX Converter", path: "/rgb-to-hex-converter", icon: Droplets, description: "Convert RGB color values to HEX." },
  { name: "Color Palette Generator", path: "/color-palette-generator", icon: Paintbrush, description: "Create beautiful color palettes." },
  { name: "Contrast Checker", path: "/contrast-checker", icon: Contrast, description: "Check color contrast for accessibility." },
  { name: "Gradient Generator", path: "/gradient-generator", icon: Layers, description: "Create stunning CSS gradients." },
  { name: "Image Color Extractor", path: "/image-color-extractor", icon: Aperture, description: "Extract colors from an image." },
  { name: "Color Blindness Simulator", path: "/color-blindness-simulator", icon: Eye, description: "Simulate color vision deficiencies." },
  { name: "CSS Color Code Generator", path: "/css-color-code-generator", icon: Code, description: "Generate CSS color codes easily." },
  { name: "Dark/Light Theme Preview", path: "/dark-light-color-preview", icon: Layers, description: "Preview colors in dark/light themes." },
];

const ColorTools = () => {
  const relatedCategoriesList = ["Image Tools", "Developer Tools", "Social Media Tools"];
  const relatedCategories = allToolCategories.filter(cat => relatedCategoriesList.includes(cat.name));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>Color Picker, Converters & More | Toolzenix.com</title>
        <meta name="description" content="Explore Toolzenix’s free color tools like color picker, HEX to RGB converter, gradient generator, and more. 100% online and easy to use." />
        <link rel="canonical" href="https://toolzenix.com/color-tools" />
      </Helmet>

      <div
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white gradient-text">
          All-in-One Free Color Tools
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          For Designers & Developers. Explore a vibrant suite of tools to pick, convert, generate, and manage colors for your projects.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {colorTools.map((tool, index) => (
          <div
            key={tool.name}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
          >
            <Link to={tool.path} className="block p-6 group h-full flex flex-col">
              <div className="flex items-center justify-center mb-4">
                <tool.icon className="w-12 h-12 text-pink-500 group-hover:text-pink-600 transition-colors duration-300" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center group-hover:gradient-text transition-colors duration-300">
                {tool.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed flex-grow">
                {tool.description}
              </p>
               <div className="h-1 bg-gradient-to-r from-pink-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-4"></div>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-16 w-full max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Explore Related Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedCategories.map(cat => {
            const Icon = LucideIcons[cat.icon] || LucideIcons.Folder;
            return (
              <div
                key={cat.path}
                className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl shadow-lg transition-all hover:scale-103 hover:-translate-y-1"
              >
                <Link to={cat.path} className="group">
                  <div className="flex items-center mb-3">
                    <Icon className={cn("w-8 h-8 mr-4", cat.color)} />
                    <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-100 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">{cat.name}</h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{cat.description}</p>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default ColorTools;