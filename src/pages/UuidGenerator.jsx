import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { Copy, Hash, RefreshCw, Settings } from 'lucide-react';
import { v4 as uuidv4, v1 as uuidv1 } from 'uuid';

const UuidGenerator = () => {
  const [uuids, setUuids] = useState([]);
  const [version, setVersion] = useState('v4');
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const { toast } = useToast();

  const generateUuids = () => {
    let newUuids = [];
    for (let i = 0; i < count; i++) {
      let id;
      if (version === 'v1') {
        id = uuidv1();
      } else {
        id = uuidv4();
      }
      
      if (uppercase) id = id.toUpperCase();
      if (!hyphens) id = id.replace(/-/g, '');
      
      newUuids.push(id);
    }
    setUuids(newUuids);
  };

  useEffect(() => {
    generateUuids();
  }, [version, count, uppercase, hyphens]); // Regenerate on option change

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: 'Copied!', description: 'UUID copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', description: 'Could not copy UUID.', variant: 'destructive' }));
  };
  
  const handleCopyAll = () => {
    if (uuids.length === 0) {
      toast({ title: 'Nothing to copy', description: 'No UUIDs generated yet.', variant: 'destructive' });
      return;
    }
    const allUuidsText = uuids.join('\n');
    navigator.clipboard.writeText(allUuidsText)
      .then(() => toast({ title: 'All Copied!', description: `${uuids.length} UUIDs copied to clipboard.` }))
      .catch(() => toast({ title: 'Copy Failed', description: 'Could not copy all UUIDs.', variant: 'destructive' }));
  };

  return (
    <>
      <Helmet>
        <title>UUID Generator (v1 & v4) | Toolzenix</title>
        <meta name="description" content="Generate universally unique identifiers (UUIDs) version 1 or version 4. Customize count, case, and hyphens. Copy single or multiple UUIDs." />
        <link rel="canonical" href="https://toolzenix.com/uuid-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            UUID Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Generate universally unique identifiers (UUIDs) version 1 or 4.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
              <Settings className="w-6 h-6 mr-2 text-blue-500" /> Options
            </h2>
            
            <div>
              <Label htmlFor="uuid-version" className="text-sm font-medium text-gray-700 dark:text-gray-300">UUID Version</Label>
              <Select value={version} onValueChange={setVersion}>
                <SelectTrigger id="uuid-version" className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v4">Version 4 (Random)</SelectItem>
                  <SelectItem value="v1">Version 1 (Timestamp)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="uuid-count" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Number of UUIDs: {count}
              </Label>
              <Slider
                id="uuid-count"
                min={1}
                max={50}
                step={1}
                value={[count]}
                onValueChange={(value) => setCount(value[0])}
                className="mt-2"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="uppercase" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <Label htmlFor="uppercase" className="text-sm font-medium text-gray-700 dark:text-gray-300">Uppercase</Label>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="hyphens" checked={hyphens} onChange={(e) => setHyphens(e.target.checked)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <Label htmlFor="hyphens" className="text-sm font-medium text-gray-700 dark:text-gray-300">Include Hyphens</Label>
            </div>
            
            <Button onClick={generateUuids} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <RefreshCw className="w-4 h-4 mr-2" /> Regenerate
            </Button>
            
             <Button onClick={handleCopyAll} variant="outline" className="w-full" disabled={uuids.length === 0}>
              <Copy className="w-4 h-4 mr-2" /> Copy All ({uuids.length})
            </Button>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <Hash className="w-6 h-6 mr-2 text-green-500" /> Generated UUIDs
            </h2>
            {uuids.length > 0 ? (
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {uuids.map((id, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                    <Input
                        type="text"
                        value={id}
                        readOnly
                        className="flex-grow text-sm font-mono border-0 bg-transparent focus:ring-0 dark:text-gray-200"
                        aria-label={`UUID ${index + 1}`}
                      />
                    <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(id)} className="ml-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No UUIDs generated yet. Adjust options and click Regenerate.</p>
            )}
          </motion.div>
        </div>

        <div className="mt-12 prose dark:prose-invert max-w-none mx-auto text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold">About UUIDs</h2>
          <p>
            A Universally Unique Identifier (UUID) is a 128-bit number used to identify information in computer systems. The term Globally Unique Identifier (GUID) is also used.
          </p>
          <ul>
            <li><strong>Version 4 (Random):</strong> Generated using random or pseudo-random numbers. This is the most common version.</li>
            <li><strong>Version 1 (Timestamp):</strong> Generated using a timestamp and the MAC address of the computer on which it was generated (or a random MAC if not available).</li>
          </ul>
          <h3 className="text-xl font-semibold">How to Use:</h3>
          <ol>
            <li>Select the desired UUID version (v1 or v4).</li>
            <li>Choose the number of UUIDs to generate using the slider.</li>
            <li>Toggle options for uppercase letters and inclusion of hyphens.</li>
            <li>The UUIDs will be generated automatically. Click "Regenerate" to get new ones.</li>
            <li>Click the copy icon next to any UUID to copy it individually, or use "Copy All" to copy all generated UUIDs.</li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default UuidGenerator;