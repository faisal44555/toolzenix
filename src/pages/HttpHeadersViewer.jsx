import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ListOrdered, FileText, Copy, Trash2, Info } from 'lucide-react';

const HttpHeadersViewer = () => {
  const [rawHeaders, setRawHeaders] = useState('');
  const [parsedHeaders, setParsedHeaders] = useState([]);
  const { toast } = useToast();

  const parseHeaders = () => {
    if (!rawHeaders.trim()) {
      setParsedHeaders([]);
      toast({ title: 'Input Empty', description: 'Please paste raw HTTP headers.', variant: 'destructive' });
      return;
    }

    const lines = rawHeaders.split('\n');
    const headers = [];
    // First line might be HTTP status line (e.g., GET / HTTP/1.1) or just headers
    let startIndex = 0;
    if (lines[0] && (lines[0].startsWith('HTTP/') || lines[0].match(/^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS) /i))) {
        headers.push({ name: 'Status Line / Request Line', value: lines[0].trim() });
        startIndex = 1;
    }

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === '') continue; // Skip empty lines

      const separatorIndex = line.indexOf(':');
      if (separatorIndex > 0) {
        const name = line.substring(0, separatorIndex).trim();
        const value = line.substring(separatorIndex + 1).trim();
        headers.push({ name, value });
      } else {
        // Could be a malformed header or part of a multi-line value (not handled simply here)
        headers.push({ name: 'Malformed Header or Line', value: line });
      }
    }
    setParsedHeaders(headers);
    if(headers.length > 0) {
        toast({ title: 'Headers Parsed!', description: `${headers.length - (startIndex > 0 ? 1 : 0)} headers found.`});
    } else {
        toast({ title: 'No Headers Found', description: 'Could not parse any valid headers.'});
    }
  };

  const handleCopyParsed = () => {
    if (parsedHeaders.length === 0) {
      toast({ title: 'Nothing to Copy', description: 'No parsed headers available.', variant: 'destructive' });
      return;
    }
    const textToCopy = parsedHeaders.map(h => `${h.name}: ${h.value}`).join('\n');
    navigator.clipboard.writeText(textToCopy)
      .then(() => toast({ title: 'Copied!', description: 'Parsed headers copied.' }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  const handleClear = () => {
    setRawHeaders('');
    setParsedHeaders([]);
    toast({ title: 'Cleared!', description: 'Input and output cleared.' });
  };

  return (
    <>
      <Helmet>
        <title>HTTP Headers Viewer | Toolzenix</title>
        <meta name="description" content="Paste raw HTTP request or response headers to view them in a structured, easy-to-read format. Useful for debugging and analysis." />
        <link rel="canonical" href="https://toolzenix.com/http-headers-viewer" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            HTTP Headers Viewer
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Paste raw HTTP headers to view them in a structured format.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <Label htmlFor="raw-headers-input" className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 block">Raw HTTP Headers</Label>
            <Textarea
              id="raw-headers-input"
              value={rawHeaders}
              onChange={(e) => setRawHeaders(e.target.value)}
              placeholder="Paste raw HTTP request or response headers here... Example:\nUser-Agent: Mozilla/5.0\nContent-Type: application/json"
              className="min-h-[300px] text-sm font-mono border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            />
            <div className="mt-4 flex space-x-2">
              <Button onClick={parseHeaders} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                <ListOrdered className="w-4 h-4 mr-2" /> Parse Headers
              </Button>
              <Button onClick={handleClear} variant="destructive" size="sm" className="flex-1">
                <Trash2 className="w-4 h-4 mr-2" /> Clear Input
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <Label className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 block">Parsed Headers</Label>
            {parsedHeaders.length > 0 ? (
              <div className="min-h-[300px] max-h-[500px] overflow-y-auto space-y-2 border border-gray-200 dark:border-gray-700 rounded-md p-3 bg-gray-50 dark:bg-gray-900">
                {parsedHeaders.map((header, index) => (
                  <div key={index} className="text-sm p-2 rounded bg-gray-100 dark:bg-gray-700/50">
                    <strong className="text-blue-600 dark:text-blue-400 break-all">{header.name}:</strong>
                    <span className="text-gray-700 dark:text-gray-300 ml-2 break-all">{header.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="min-h-[300px] flex items-center justify-center text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 rounded-md p-3 bg-gray-50 dark:bg-gray-900">
                Parsed headers will appear here.
              </div>
            )}
             <div className="mt-4">
                <Button onClick={handleCopyParsed} variant="outline" size="sm" className="w-full" disabled={parsedHeaders.length === 0}>
                    <Copy className="w-4 h-4 mr-2" /> Copy Parsed Headers
                </Button>
             </div>
          </motion.div>
        </div>
        
        <div className="mt-12 prose dark:prose-invert max-w-none mx-auto text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-semibold">About HTTP Headers</h2>
            <p>
                HTTP headers are key-value pairs that are exchanged between a client (e.g., your browser) and a server when you access a web page or make an API call. They carry additional information about the request or the response.
            </p>
            <ul>
                <li><strong>Request Headers:</strong> Sent by the client to the server. Examples include <code>User-Agent</code> (identifies the client), <code>Accept-Language</code> (preferred language), <code>Cookie</code> (stored cookies).</li>
                <li><strong>Response Headers:</strong> Sent by the server back to the client. Examples include <code>Content-Type</code> (type of content, e.g., text/html), <code>Set-Cookie</code> (instructs client to store a cookie), <code>Cache-Control</code> (caching directives).</li>
            </ul>
            <p>
                This tool helps you visualize these headers in a more readable format. Note: This tool only parses text you provide; it does not make live HTTP requests or capture your browser's headers.
            </p>
            <h3 className="text-xl font-semibold">How to Use:</h3>
            <ol>
                <li>Copy the raw HTTP headers (either from a request or a response) from your browser's developer tools, cURL output, or any other source.</li>
                <li>Paste the copied headers into the "Raw HTTP Headers" text area.</li>
                <li>Click the "Parse Headers" button.</li>
                <li>The headers will be displayed in a structured list in the "Parsed Headers" section.</li>
                <li>You can copy the parsed headers or clear the input.</li>
            </ol>
        </div>
      </div>
    </>
  );
};

export default HttpHeadersViewer;