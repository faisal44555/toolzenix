import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import * as LucideIcons from "lucide-react";
import { Search, FolderKanban, FileArchive, FileCog, FileText, FileKey, FileInput, FileOutput, ArrowRight } from 'lucide-react';
import { Helmet } from "react-helmet-async";
import { allToolCategories } from "@/config/navigation";
import { cn } from "@/lib/utils";

const tools = [
  {
    title: "File Compressor",
    description: "Compress files into ZIP format client-side.",
    icon: <FileArchive className="w-6 h-6" />,
    link: "/file-compressor",
    color: "bg-blue-500"
  },
  {
    title: "File Merger (Text/PDF)",
    description: "Merge multiple text or PDF files in-browser.",
    icon: <FileCog className="w-6 h-6" />,
    link: "/file-merger",
    color: "bg-green-500"
  },
  {
    title: "File Splitter",
    description: "Split files into smaller parts (text files).",
    icon: <FileOutput className="w-6 h-6" />,
    link: "/file-splitter",
    color: "bg-yellow-500 text-gray-800"
  },
  {
    title: "Rename Multiple Files Tool",
    description: "Batch rename files using patterns (download renamed).",
    icon: <FileCog className="w-6 h-6" />,
    link: "/rename-multiple-files",
    color: "bg-purple-500"
  },
  {
    title: "TXT to CSV Converter",
    description: "Convert text files between TXT and CSV formats.",
    icon: <FileText className="w-6 h-6" />,
    link: "/txt-csv-converter",
    color: "bg-teal-500"
  },
  {
    title: "Encrypt/Decrypt File Tool",
    description: "Basic client-side file encryption/decryption.",
    icon: <FileKey className="w-6 h-6" />,
    link: "/encrypt-decrypt-file",
    color: "bg-red-500"
  },
  {
    title: "Text File Viewer",
    description: "View and read .txt files directly in your browser.",
    icon: <FileInput className="w-6 h-6" />,
    link: "/text-file-viewer",
    color: "bg-indigo-500"
  }
];

const FileTools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const relatedCategoriesList = ["Document Tools", "Security Tools", "Developer Tools"];
  const relatedCategories = allToolCategories.filter(cat => relatedCategoriesList.includes(cat.name));

  return (
    <>
      <Helmet>
        <title>File Tools – Compress, Merge, Split, Convert Files | Toolzenix</title>
        <meta 
          name="description" 
          content="Free browser-based File Tools on Toolzenix.com: File Compressor, File Merger (Text/PDF), File Splitter, Rename Multiple Files, TXT/CSV Converter, File Encryptor/Decryptor, Text File Viewer. No uploads required."
        />
        <link rel="canonical" href="https://toolzenix.com/file-tools" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div
          className="text-center mb-12"
        >
          <FolderKanban className="w-16 h-16 text-blue-600 dark:text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            File Tools
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your files directly in your browser. Compress, merge, split, convert, and more – no uploads required.
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search file tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search file tools"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to={tool.link} className="block group">
                <div className="flex items-start space-x-4">
                  <div className={`${tool.color} p-3 rounded-lg text-white`}>
                    {React.cloneElement(tool.icon, { "aria-hidden": true })}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500">
                      {tool.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {tool.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors" aria-hidden="true" />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <p
            className="text-center text-gray-500 dark:text-gray-400 mt-8"
          >
            No tools found for your search. Try a different keyword!
          </p>
        )}

        <div className="mt-16 w-full max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Explore Related Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedCategories.map(cat => {
                const Icon = LucideIcons[cat.icon] || LucideIcons.Folder;
                return (
                  <div
                    key={cat.path}
                    className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl shadow-lg transition-all hover:-translate-y-1 hover:scale-103"
                  >
                    <Link to={cat.path} className="group">
                      <div className="flex items-center mb-3">
                        <Icon className={cn("w-8 h-8 mr-4", cat.color)} />
                        <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cat.name}</h4>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{cat.description}</p>
                    </Link>
                  </div>
                )
              })}
            </div>
        </div>

        <div
          className="mt-12 bg-gradient-to-r from-gray-700 via-gray-800 to-black rounded-xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Secure & Private File Operations</h2>
          <p className="text-gray-300">
            All file processing happens directly in your browser. Your files are never uploaded to any server, ensuring your data remains private and secure on your device.
          </p>
        </div>
      </div>
    </>
  );
};

export default FileTools;