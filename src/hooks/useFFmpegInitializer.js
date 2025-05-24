
    import React from 'react';
    import { useState, useCallback, useEffect, useRef } from 'react';
    import { useToast } from '@/components/ui/use-toast.js';
    import { loadFFmpeg } from '@/lib/videoUtils.js';

    export function useFFmpegInitializer(requiresFFmpeg) {
      const { toast } = useToast();
      const ffmpegRef = useRef(null);
      const [isFFmpegLoading, setIsFFmpegLoading] = useState(false);
      const [ffmpegLoaded, setFFmpegLoaded] = useState(false);
      const [ffmpegProgress, setFFmpegProgress] = useState(0);
      const [ffmpegError, setFFmpegError] = useState(null);

      const initializeFFmpeg = useCallback(async () => {
        if (!requiresFFmpeg || ffmpegLoaded || isFFmpegLoading) return;
        
        setIsFFmpegLoading(true);
        setFFmpegProgress(0);
        setFFmpegError(null);
        try {
          const ffmpeg = await loadFFmpeg((progress) => {
            setFFmpegProgress(progress * 100);
          });
          ffmpegRef.current = ffmpeg;
          setFFmpegLoaded(true);
          toast({ title: "Video Engine Ready", description: "FFmpeg loaded successfully.", duration: 3000 });
        } catch (err) {
          console.error("FFmpeg init error:", err);
          const errorMsg = "Failed to load video processing engine. Please try refreshing the page.";
          setFFmpegError(errorMsg);
          toast({ title: "Video Engine Error", description: "Could not load FFmpeg.", variant: "destructive", duration: 5000 });
        } finally {
          setIsFFmpegLoading(false);
        }
      }, [requiresFFmpeg, ffmpegLoaded, isFFmpegLoading, toast]);

      useEffect(() => {
        if (requiresFFmpeg && !ffmpegLoaded && !isFFmpegLoading) {
          initializeFFmpeg();
        }
      }, [requiresFFmpeg, ffmpegLoaded, isFFmpegLoading, initializeFFmpeg]);
      
      const resetFFmpegProgress = useCallback(() => {
        if (requiresFFmpeg) setFFmpegProgress(0);
      }, [requiresFFmpeg]);

      return {
        ffmpegRef,
        isFFmpegLoading,
        ffmpegLoaded,
        ffmpegProgress,
        ffmpegError,
        initializeFFmpeg,
        resetFFmpegProgress,
      };
    }
  