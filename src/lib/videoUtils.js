
    import React from 'react';
    import * as FFmpeg from '@ffmpeg/ffmpeg';

    let ffmpegInstance = null;
    let ffmpegLoadingPromise = null;

    const FFMPEG_CORE_PATH = new URL('/node_modules/@ffmpeg/core/dist/ffmpeg-core.js', import.meta.url).href;
    const FFMPEG_CORE_WASM_PATH = new URL('/node_modules/@ffmpeg/core/dist/ffmpeg-core.wasm', import.meta.url).href;
    const FFMPEG_CORE_WORKER_PATH = new URL('/node_modules/@ffmpeg/core/dist/ffmpeg-core.worker.js', import.meta.url).href;


    export const loadFFmpeg = async (progressCallback) => {
      if (ffmpegInstance && ffmpegInstance.isLoaded()) {
        return ffmpegInstance;
      }
      if (ffmpegLoadingPromise) {
        return ffmpegLoadingPromise;
      }

      ffmpegLoadingPromise = (async () => {
        try {
          if (!ffmpegInstance) {
             ffmpegInstance = FFmpeg.createFFmpeg({
              corePath: FFMPEG_CORE_PATH,
              wasmPath: FFMPEG_CORE_WASM_PATH,
              workerPath: FFMPEG_CORE_WORKER_PATH,
              log: true,
              progress: progressCallback ? (p) => progressCallback(p.ratio) : undefined,
            });
          }
          if (!ffmpegInstance.isLoaded()) {
            await ffmpegInstance.load();
          }
          return ffmpegInstance;
        } catch (error) {
          console.error("FFmpeg loading failed:", error);
          ffmpegLoadingPromise = null; 
          ffmpegInstance = null;
          throw error; 
        }
      })();
      return ffmpegLoadingPromise;
    };

    export const runFFmpegCommand = async (ffmpeg, inputFile, commandArgs, outputFilename, outputMimeType) => {
      try {
        const inputFilename = inputFile.name;
        ffmpeg.FS('writeFile', inputFilename, await FFmpeg.fetchFile(inputFile));
        
        await ffmpeg.run(...commandArgs);
        
        const data = ffmpeg.FS('readFile', outputFilename);
        ffmpeg.FS('unlink', inputFilename);
        ffmpeg.FS('unlink', outputFilename);
        
        const blob = new Blob([data.buffer], { type: outputMimeType });
        return { blob, name: outputFilename, type: outputMimeType, size: blob.size };
      } catch (error) {
        console.error(`FFmpeg command failed for ${outputFilename}:`, error);
        throw error;
      }
    };

    export const trimVideo = async (ffmpeg, file, startTime, duration) => {
      const outputFilename = `${file.name.split('.')[0]}_trimmed.mp4`;
      const commandArgs = ['-i', file.name, '-ss', startTime, '-t', duration, '-c', 'copy', outputFilename];
      return runFFmpegCommand(ffmpeg, file, commandArgs, outputFilename, 'video/mp4');
    };

    export const muteVideo = async (ffmpeg, file) => {
      const outputFilename = `${file.name.split('.')[0]}_muted.mp4`;
      const commandArgs = ['-i', file.name, '-c', 'copy', '-an', outputFilename];
      return runFFmpegCommand(ffmpeg, file, commandArgs, outputFilename, 'video/mp4');
    };

    export const extractAudio = async (ffmpeg, file) => {
      const outputFilename = `${file.name.split('.')[0]}_audio.mp3`;
      const commandArgs = ['-i', file.name, '-q:a', '0', '-map', 'a', outputFilename];
      return runFFmpegCommand(ffmpeg, file, commandArgs, outputFilename, 'audio/mpeg');
    };

    export const compressVideo = async (ffmpeg, file) => {
      const outputFilename = `${file.name.split('.')[0]}_compressed.mp4`;
      const commandArgs = ['-i', file.name, '-vcodec', 'libx264', '-crf', '28', outputFilename];
      return runFFmpegCommand(ffmpeg, file, commandArgs, outputFilename, 'video/mp4');
    };

    export const videoToGif = async (ffmpeg, file, duration = '5', fps = '10', scale = '320') => {
      const outputFilename = `${file.name.split('.')[0]}_output.gif`;
      const commandArgs = ['-i', file.name, '-vf', `fps=${fps},scale=${scale}:-1:flags=lanczos`, '-t', duration, outputFilename];
      return runFFmpegCommand(ffmpeg, file, commandArgs, outputFilename, 'image/gif');
    };

    export const videoToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64String = event.target.result;
          const outputFilename = `${file.name.split('.')[0]}_base64.txt`;
          resolve({ base64String, name: outputFilename, type: 'text/plain', size: base64String.length });
        };
        reader.onerror = (error) => {
          console.error('Error reading file for Base64 conversion:', error);
          reject(new Error('Failed to read file for Base64 conversion.'));
        };
        reader.readAsDataURL(file);
      });
    };
  