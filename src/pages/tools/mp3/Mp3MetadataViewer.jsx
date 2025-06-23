import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import jsmediatags from 'jsmediatags/dist/jsmediatags.min.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { UploadCloud, FileAudio, Tag, User, Album, Disc, Calendar, Music, Image as ImageIcon, Info, AlertTriangle } from 'lucide-react';
import ToolPageLayout from '@/components/layout/ToolPageLayout';

const Mp3MetadataViewer = () => {
  const { toast } = useToast();
  const [metadata, setMetadata] = useState(null);
  const [coverArt, setCoverArt] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'audio/mpeg') {
      setFileName(file.name);
      setMetadata(null);
      setCoverArt(null);
      setIsLoading(true);

      jsmediatags.read(file, {
        onSuccess: (tag) => {
          setMetadata(tag.tags);
          if (tag.tags.picture) {
            const { data, format } = tag.tags.picture;
            let base64String = "";
            for (let i = 0; i < data.length; i++) {
              base64String += String.fromCharCode(data[i]);
            }
            setCoverArt(`data:${format};base64,${window.btoa(base64String)}`);
          }
          setIsLoading(false);
          toast({ title: "Metadata Loaded", description: `Successfully read metadata for ${file.name}.` });
        },
        onError: (error) => {
          console.error('Error reading MP3 tags:', error);
          setIsLoading(false);
          setCoverArt(null);
          if (error.type === 'tagFormat') {
              setMetadata({});
              toast({
                  title: "No Metadata Found",
                  description: "This MP3 file does not contain standard ID3 tags.",
              });
          } else {
              const description = "An error occurred while reading the file's metadata.";
              setMetadata({ error: description });
              toast({
                  title: "Metadata Read Error",
                  description,
                  variant: "destructive"
              });
          }
        }
      });
    } else {
      toast({ title: "Invalid File", description: "Please upload an MP3 file.", variant: "destructive" });
      setFileName('');
      setMetadata(null);
      setCoverArt(null);
    }
  };

  const renderMetadataItem = (icon, label, value) => {
    if (!value) return null;
    const IconComponent = icon;
    return (
      <div className="flex items-start py-2 border-b border-gray-200 dark:border-slate-700 last:border-b-0">
        <IconComponent className="w-5 h-5 mr-3 mt-1 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-slate-400">{label}</p>
          <p className="text-md text-gray-800 dark:text-slate-100 break-all">{String(value)}</p>
        </div>
      </div>
    );
  };

  return (
    <ToolPageLayout
      pageTitle="MP3 Metadata Viewer"
      pageDescription="View ID3 tags and metadata of your MP3 files. Artist, album, title, cover art, and more, all processed client-side."
      canonicalPath="/mp3-metadata-viewer"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-2xl mx-auto"
      >
        <div className="flex flex-col items-center mb-6">
          <FileAudio className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-3" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">MP3 Metadata Viewer</h2>
        </div>

        <div className="mb-6">
          <Label htmlFor="mp3FileMeta" className="sr-only">Upload MP3</Label>
           <div
            className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            onClick={() => fileInputRef.current?.click()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileChange({ target: { files: e.dataTransfer.files }});
              }
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="text-center">
              <UploadCloud className="mx-auto h-10 w-10 text-gray-400 dark:text-gray-500" />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">MP3 files only</p>
              {fileName && <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 truncate max-w-xs mx-auto">{fileName}</p>}
            </div>
          </div>
          <Input
            id="mp3FileMeta"
            type="file"
            accept="audio/mpeg"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>

        {isLoading && (
          <div className="flex items-center justify-center my-4">
             <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mr-2"
            />
            <p className="text-gray-600 dark:text-gray-300">Reading metadata...</p>
          </div>
        )}

        {metadata && !isLoading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 bg-gray-50 dark:bg-slate-700 p-4 sm:p-6 rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold text-gray-700 dark:text-slate-100 mb-4 border-b pb-2 border-gray-300 dark:border-slate-600">
              Metadata for: <span className="text-indigo-600 dark:text-indigo-400">{fileName}</span>
            </h3>
            {metadata.error && <p className="text-red-500 dark:text-red-400">{metadata.error}</p>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              {coverArt && (
                <div className="md:col-span-2 mb-4 flex justify-center">
                  <img src={coverArt} alt="Album Cover Art" className="max-w-xs max-h-64 rounded-md shadow-md object-contain" />
                </div>
              )}
              {renderMetadataItem(Tag, "Title", metadata.title)}
              {renderMetadataItem(User, "Artist", metadata.artist)}
              {renderMetadataItem(Album, "Album", metadata.album)}
              {renderMetadataItem(Calendar, "Year", metadata.year)}
              {renderMetadataItem(Music, "Genre", metadata.genre)}
              {renderMetadataItem(Disc, "Track Number", metadata.track)}
              {renderMetadataItem(Info, "Comment", metadata.comment?.text)}
            </div>
            
            {Object.keys(metadata).filter(k => k !== 'error').length === 0 && !metadata.error && !coverArt && (
                 <p className="text-center text-gray-500 dark:text-slate-400 py-4">No metadata tags found in this file.</p>
            )}

          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 p-4 bg-indigo-50 dark:bg-slate-700/50 rounded-lg"
        >
          <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-2 flex items-center">
            <Info className="w-5 h-5 mr-2" /> About This Tool
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            This tool reads and displays ID3 tags (metadata) from MP3 files. Common tags include title, artist, album, year, genre, track number, and cover art. 
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
            Note: If the MP3 file is corrupted, or its tags are in a non-standard format, the tool might not be able to read the metadata correctly.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            <AlertTriangle className="w-3 h-3 inline mr-1"/> All processing happens in your browser. Your MP3 file is not uploaded to any server.
          </p>
        </motion.div>

      </motion.div>
    </ToolPageLayout>
  );
};

export default Mp3MetadataViewer;