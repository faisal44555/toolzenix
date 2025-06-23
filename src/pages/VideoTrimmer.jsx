import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Download, Scissors } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";

const VideoTrimmer = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [duration, setDuration] = useState(0);
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
    setStartTime(0);
    setEndTime(0);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration;
      setDuration(videoDuration);
      setEndTime(videoDuration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      if (currentTime < startTime) {
        videoRef.current.currentTime = startTime;
      }
      if (currentTime > endTime) {
        videoRef.current.currentTime = startTime;
      }
    }
  };

  const handleTrimChange = (values) => {
    setStartTime(values[0]);
    setEndTime(values[1]);
    if (videoRef.current) {
      videoRef.current.currentTime = values[0];
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const trimAndDownloadVideo = async () => {
    if (!videoRef.current) return;
    setLoading(true);

    try {
      const video = videoRef.current;
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
        link.download = `trimmed-${fileName || 'video.webm'}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast({
          title: "Success!",
          description: "Your trimmed video has been downloaded."
        });
        setLoading(false);
      };

      video.currentTime = startTime;
      video.play();
      mediaRecorder.start();

      const drawVideo = () => {
        if (video.currentTime >= endTime) {
          mediaRecorder.stop();
          video.pause();
          return;
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(drawVideo);
      };

      video.onplay = () => {
        drawVideo();
      };
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to trim the video.",
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
          Video Trimmer
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Trim and cut your videos to the perfect length
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
              className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-green-500 dark:hover:border-green-400 transition-colors"
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
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                className="max-w-full rounded-lg mx-auto"
              />
              
              <div className="mt-8 px-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Start: {formatTime(startTime)}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    End: {formatTime(endTime)}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, duration]}
                  min={0}
                  max={duration}
                  step={0.1}
                  value={[startTime, endTime]}
                  onValueChange={handleTrimChange}
                  className="my-4"
                />
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={trimAndDownloadVideo}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <>
                      <Scissors className="w-5 h-5 mr-2" />
                      Trim & Download
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

export default VideoTrimmer;