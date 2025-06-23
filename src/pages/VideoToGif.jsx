import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Download, Video, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import GIF from "gif.js";
import { Helmet } from "react-helmet-async";

const VideoToGif = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gifOutput, setGifOutput] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { toast } = useToast();
  const [fileName, setFileName] = useState("converted-gif");

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.includes('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please select a video file (MP4, WebM).",
        variant: "destructive"
      });
      return;
    }
    setFileName(file.name.split('.')[0] || "converted-gif");
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setGifOutput(null); // Reset previous GIF
  };

  const convertToGIF = async () => {
    if (!videoRef.current) {
      toast({ title: "No Video", description: "Please upload a video first.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setGifOutput(null);

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Ensure video metadata is loaded
      await new Promise(resolve => {
        if (video.readyState >= 2) { // HAVE_CURRENT_DATA or more
          resolve();
        } else {
          video.onloadedmetadata = resolve;
        }
      });
      
      // Set canvas dimensions based on video, maintaining aspect ratio for a max width/height
      const maxDim = 320;
      let targetWidth = video.videoWidth;
      let targetHeight = video.videoHeight;

      if (targetWidth > maxDim || targetHeight > maxDim) {
        if (targetWidth > targetHeight) {
          targetHeight = Math.round(maxDim * (targetHeight / targetWidth));
          targetWidth = maxDim;
        } else {
          targetWidth = Math.round(maxDim * (targetWidth / targetHeight));
          targetHeight = maxDim;
        }
      }
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const gif = new GIF({
        workers: 2,
        quality: 10, // Lower quality for faster processing and smaller file size
        width: canvas.width,
        height: canvas.height,
        workerScript: new URL('gif.js/dist/gif.worker.js', import.meta.url).toString()
      });

      const frameCount = Math.min(30, Math.floor(video.duration * 5)); // Max 30 frames or 5fps
      const frameInterval = video.duration / frameCount;

      for (let i = 0; i < frameCount; i++) {
        video.currentTime = i * frameInterval;
        await new Promise(resolve => {
          video.onseeked = () => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            gif.addFrame(canvas, { copy: true, delay: 200 }); // 200ms delay per frame (5fps)
            resolve();
          };
        });
      }

      gif.on('finished', (blob) => {
        const gifUrl = URL.createObjectURL(blob);
        setGifOutput(gifUrl);
        setLoading(false);
        
        toast({
          title: "Success!",
          description: "Your GIF has been created. Click Download GIF."
        });
      });

      gif.render();
    } catch (error) {
      console.error("GIF Conversion Error:", error);
      toast({
        title: "Error",
        description: "Failed to convert video to GIF. Please try a shorter video or a different format.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const downloadGif = () => {
    if (!gifOutput) {
      toast({ title: "No GIF", description: "Please convert a video first.", variant: "destructive" });
      return;
    }
    const link = document.createElement('a');
    link.href = gifOutput;
    link.download = `${fileName}.gif`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(gifOutput); // Clean up blob URL after download
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Video to GIF Converter - Create Animated GIFs | Toolzenix</title>
        <meta name="description" content="Convert your videos (MP4, WebM) to animated GIFs online. Free, fast, and easy to use video to GIF maker." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Video to GIF Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Convert your videos to animated GIF format
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <label 
              htmlFor="video-upload"
              className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
            >
              <input
                id="video-upload"
                type="file"
                accept="video/mp4,video/webm"
                onChange={handleVideoUpload}
                className="sr-only"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Drag and drop your video here, or click to select
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Supports MP4 and WebM formats
                </p>
              </div>
            </label>
          </div>

          {videoUrl && (
            <div className="mt-8 w-full">
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                className="max-w-full rounded-lg mx-auto mb-6 shadow-md"
                onLoadedMetadata={() => videoRef.current && videoRef.current.play().catch(() => {})} // Autoplay muted for browsers
                muted
              />
              <canvas ref={canvasRef} className="hidden" /> {/* Hidden canvas for processing */}
              
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={convertToGIF}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-3 text-base px-6"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Video className="w-5 h-5 mr-2" />
                      Convert to GIF
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {gifOutput && !loading && (
            <motion.div 
              initial={{ opacity: 0, y:10 }}
              animate={{ opacity: 1, y:0 }}
              className="mt-8 w-full max-w-md"
            >
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">
                Generated GIF Preview
              </h3>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
                <img-replace 
                  src={gifOutput} 
                  alt="Converted GIF"
                  className="max-w-full rounded-lg mx-auto border border-gray-300 dark:border-gray-600" 
                />
              </div>
              <Button
                onClick={downloadGif}
                className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 text-base"
              >
                <Download className="w-5 h-5 mr-2" />
                Download GIF
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Upload your video file (MP4 or WebM).</li>
          <li>Click the "Convert to GIF" button.</li>
          <li>Wait for the conversion to complete. The GIF will be generated and a preview shown.</li>
          <li>Click "Download GIF" to save your animated GIF.</li>
        </ul>
      </div>
    </div>
  );
};

export default VideoToGif;