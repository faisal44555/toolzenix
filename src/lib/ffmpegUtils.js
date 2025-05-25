
    import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

    let ffmpeg;

    export const getFFmpeg = async (progressCallback) => {
      if (!ffmpeg) {
        ffmpeg = createFFmpeg({ 
          log: true,
          corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
        });
      }
      if (!ffmpeg.isLoaded()) {
        if (progressCallback) progressCallback({ type: 'ffmpeg_load_start' });
        await ffmpeg.load();
        if (progressCallback) progressCallback({ type: 'ffmpeg_load_end' });
      }
      ffmpeg.setProgress(({ ratio, time }) => {
        if (progressCallback) progressCallback({ type: 'conversion_progress', ratio, time });
      });
      return ffmpeg;
    };

    export const convertVideoToMP3WithFFmpeg = async (file, progressCallback) => {
      const ffmpegInstance = await getFFmpeg(progressCallback);
      const inputName = `input-${file.name}`;
      const outputName = `${file.name.replace(/\.[^/.]+$/, "")}.mp3`;

      ffmpegInstance.FS('writeFile', inputName, await fetchFile(file));
      
      try {
        await ffmpegInstance.run('-i', inputName, '-vn', '-ar', '44100', '-ac', '2', '-b:a', '192k', outputName);
        const data = ffmpegInstance.FS('readFile', outputName);
        ffmpegInstance.FS('unlink', inputName);
        ffmpegInstance.FS('unlink', outputName);
        return { blob: new Blob([data.buffer], { type: 'audio/mp3' }), name: outputName, type: 'audio/mp3' };
      } catch (error) {
        console.error("FFmpeg conversion error:", error);
        ffmpegInstance.FS('unlink', inputName);
        if (ffmpegInstance.FS('readdir', '/').includes(outputName)) {
            ffmpegInstance.FS('unlink', outputName);
        }
        throw new Error(`Video to MP3 conversion failed: ${error.message || 'Unknown FFmpeg error'}`);
      }
    };
  