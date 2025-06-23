import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Download, Volume2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const MuteVideo = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const videoRef = useRef(null);
  const { toast } = useToast();

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.includes('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please select a video file.",
        variant: "destructive"
      });
      return;
    }

    setFileName(file.name);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  const muteAndDownloadVideo = async () => {
    if (!videoRef.current || !videoUrl) return;
    setLoading(true);

    try {
      const video = videoRef.current;
      video.muted = true;

      // Create a MediaRecorder to capture the video stream
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const stream = canvas.captureStream();
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm'
      });

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `muted-${fileName || 'video.webm'}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast({
          title: "Success!",
          description: "Your muted video has been downloaded."
        });
        setLoading(false);
      };

      video.currentTime = 0;
      video.play();
      mediaRecorder.start();

      const drawVideo = () => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        if (!video.ended) {
          requestAnimationFrame(drawVideo);
        } else {
          mediaRecorder.stop();
        }
      };

      video.onplay = () => {
        drawVideo();
      };
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process the video.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Video Muter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Remove audio from your videos easily
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
              className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
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
                className="max-w-full rounded-lg mx-auto"
              />
              
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={muteAndDownloadVideo}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <>
                      <Volume2 className="w-5 h-5 mr-2" />
                      Mute & Download
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MuteVideo;