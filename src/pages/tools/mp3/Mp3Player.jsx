import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import WaveSurfer from 'wavesurfer.js';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { UploadCloud, Play, Pause, Volume2, VolumeX, RotateCcw, Info, AlertTriangle, Music } from 'lucide-react';
import ToolPageLayout from '@/components/layout/ToolPageLayout';

const Mp3Player = () => {
  const { toast } = useToast();
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWaveformReady, setIsWaveformReady] = useState(false);

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'rgb(59, 130, 246)',
      progressColor: 'rgb(30, 64, 175)',
      cursorColor: 'rgb(34, 197, 94)',
      barWidth: 3,
      barRadius: 3,
      responsive: true,
      height: 128,
      normalize: true,
    });

    wavesurferRef.current.on('ready', () => {
      setDuration(wavesurferRef.current.getDuration());
      setVolume(wavesurferRef.current.getVolume());
      setIsLoading(false);
      setIsWaveformReady(true);
      toast({ title: "MP3 Loaded", description: `${fileName} is ready to play.` });
    });

    wavesurferRef.current.on('audioprocess', () => {
      setCurrentTime(wavesurferRef.current.getCurrentTime());
    });

    wavesurferRef.current.on('play', () => setIsPlaying(true));
    wavesurferRef.current.on('pause', () => setIsPlaying(false));
    wavesurferRef.current.on('finish', () => {
      setIsPlaying(false);
      wavesurferRef.current.seekTo(0);
      setCurrentTime(0);
    });
    
    wavesurferRef.current.on('error', (err) => {
      console.error('Wavesurfer error:', err);
      const description = typeof err === 'string' ? err : "Could not load or process the MP3 file. The file might be corrupted or in an unsupported format.";
      toast({
        title: 'Error Loading MP3',
        description: description,
        variant: 'destructive',
      });
      setIsLoading(false);
      setIsWaveformReady(false);
      setFileName('');
    });

    return () => {
      wavesurferRef.current.destroy();
    };
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'audio/mpeg') {
      setFileName(file.name);
      setIsLoading(true);
      setIsWaveformReady(false);
      setCurrentTime(0);
      setDuration(0);
      
      const objectURL = URL.createObjectURL(file);
      wavesurferRef.current.load(objectURL);
      // It's good practice to revoke object URLs when no longer needed,
      // but wavesurfer might hold onto it. Revoking can be done in the 'destroy' or when loading a new file.
      // For simplicity, relying on browser's garbage collection of blob URLs, or wavesurfer's internal handling.
    } else {
      toast({ title: "Invalid File", description: "Please upload an MP3 file.", variant: "destructive" });
      setFileName('');
    }
  };

  const togglePlayPause = () => {
    if (!isWaveformReady && !isLoading) {
       toast({ title: "No File", description: "Please upload an MP3 file first.", variant: "default" });
       return;
    }
    wavesurferRef.current.playPause();
  };

  const handleVolumeChange = (value) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(newVolume);
    }
  };

  const handleSeek = (value) => {
    if (!isWaveformReady) return;
    const newTime = value[0];
    setCurrentTime(newTime);
    wavesurferRef.current.seekTo(newTime / duration);
  };
  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <ToolPageLayout
      pageTitle="MP3 Player & Waveform Visualizer"
      pageDescription="Play your MP3 files with a dynamic waveform visualizer. Control playback, volume, and see the audio structure. All client-side."
      canonicalPath="/mp3-player"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-3xl mx-auto"
      >
        <div className="flex flex-col items-center mb-6">
          <Music className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-3" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">MP3 Player & Waveform Visualizer</h2>
        </div>

        <div className="mb-6">
          <Label htmlFor="mp3FilePlayer" className="sr-only">Upload MP3</Label>
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
            id="mp3FilePlayer"
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
            <p className="text-gray-600 dark:text-gray-300">Loading waveform...</p>
          </div>
        )}

        <div ref={waveformRef} className={`w-full h-32 rounded-md bg-gray-100 dark:bg-slate-700 ${!isWaveformReady && !isLoading ? 'flex items-center justify-center' : ''}`}>
          {!isWaveformReady && !isLoading && <Music className="w-16 h-16 text-gray-300 dark:text-slate-600" />}
        </div>

        {isWaveformReady && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <Slider
              value={[currentTime]}
              max={duration}
              step={0.1}
              onValueChange={handleSeek}
              className="w-full"
              aria-label="Seek slider"
              disabled={!isWaveformReady}
            />
            <div className="flex items-center justify-center space-x-4">
              <Button onClick={togglePlayPause} variant="outline" size="icon" className="rounded-full w-12 h-12">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>
              <div className="flex items-center space-x-2 w-32">
                {volume > 0 ? <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <VolumeX className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
                <Slider
                  value={[volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="w-full"
                  aria-label="Volume slider"
                  disabled={!isWaveformReady}
                />
              </div>
            </div>
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
            Upload an MP3 file to play it and see its waveform. Controls include play/pause, volume adjustment, and seeking through the track.
          </p>
           <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
            Note: This tool works best with standard MP3 files. Corrupted files or MP3s with very unusual encoding might not load or play correctly.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            <AlertTriangle className="w-3 h-3 inline mr-1"/> All processing happens in your browser. Your MP3 file is not uploaded to any server.
          </p>
        </motion.div>

      </motion.div>
    </ToolPageLayout>
  );
};

export default Mp3Player;