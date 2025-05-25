
    import React from 'react';
    import { FileImage as ImageIcon, Settings, Minimize2, Sparkles, Palette, RotateCcw, FlipHorizontal, EyeOff, Sun, Baseline, Eraser, Film, Scissors, VolumeX, FileAudio, Gift, FileText } from 'lucide-react';

    export const allToolsData = {
      image: {
        name: 'Image Tools',
        icon: ImageIcon,
        description: 'Convert, compress, enhance, and manipulate image formats like PNG, JPG, WEBP.',
        tools: [
          { 
            id: 'to-png', 
            name: 'Convert to PNG', 
            description: 'Convert various image formats to PNG.',
            icon: Settings,
            keywords: ['image', 'png', 'converter', 'graphics'] 
          },
          { 
            id: 'to-jpg', 
            name: 'Convert to JPG', 
            description: 'Convert various image formats to JPG/JPEG.',
            icon: Settings,
            keywords: ['image', 'jpg', 'jpeg', 'converter', 'graphics']
          },
          { 
            id: 'to-webp', 
            name: 'Convert to WEBP', 
            description: 'Convert various image formats to WEBP.',
            icon: Settings,
            keywords: ['image', 'webp', 'converter', 'graphics', 'web']
          },
          {
            id: 'compress-image',
            name: 'Compress Image',
            description: 'Reduce image file size by adjusting quality (outputs JPG).',
            icon: Minimize2,
            keywords: ['image', 'compress', 'reduce', 'optimizer', 'jpg', 'jpeg', 'quality']
          },
          {
            id: 'enhance-image',
            name: 'Enhance Image',
            description: 'Apply automatic enhancements (contrast, brightness) to images.',
            icon: Sparkles,
            keywords: ['image', 'enhance', 'filter', 'brightness', 'contrast', 'improve']
          },
          {
            id: 'grayscale-image',
            name: 'Grayscale Image',
            description: 'Convert an image to grayscale.',
            icon: Palette,
            keywords: ['image', 'grayscale', 'black and white', 'filter']
          },
          {
            id: 'rotate-image',
            name: 'Rotate Image 90°',
            description: 'Rotate an image by 90 degrees clockwise.',
            icon: RotateCcw,
            keywords: ['image', 'rotate', 'transform', 'orientation']
          },
          {
            id: 'flip-image-horizontal',
            name: 'Flip Image Horizontally',
            description: 'Flip an image horizontally.',
            icon: FlipHorizontal,
            keywords: ['image', 'flip', 'mirror', 'horizontal', 'transform']
          },
           {
            id: 'flip-image-vertical',
            name: 'Flip Image Vertically',
            description: 'Flip an image vertically.',
            icon: FlipHorizontal, 
            keywords: ['image', 'flip', 'mirror', 'vertical', 'transform']
          },
          {
            id: 'blur-image',
            name: 'Blur Image',
            description: 'Apply a blur effect to an image.',
            icon: EyeOff,
            keywords: ['image', 'blur', 'filter', 'effect', 'soften']
          },
          {
            id: 'brighten-image',
            name: 'Brighten Image',
            description: 'Increase the brightness of an image.',
            icon: Sun,
            keywords: ['image', 'brightness', 'filter', 'lighten', 'exposure']
          },
          {
            id: 'pixelate-image',
            name: 'Pixelate Image',
            description: 'Apply a pixelation effect to an image.',
            icon: ImageIcon, 
            keywords: ['image', 'pixelate', 'filter', 'effect', 'censor']
          },
          {
            id: 'image-to-base64',
            name: 'Image to Base64',
            description: 'Convert an image to a Base64 text string.',
            icon: Baseline,
            keywords: ['image', 'base64', 'text', 'developer', 'data uri']
          },
          {
            id: 'remove-white-background',
            name: 'Remove White Background',
            description: 'Make near-white areas of an image transparent (outputs PNG).',
            icon: Eraser,
            keywords: ['image', 'background remover', 'transparent', 'png', 'cutout', 'magic wand']
          }
        ],
        defaultMimeType: 'image',
      },
      video: {
        name: 'Video Tools',
        icon: Film,
        description: 'Trim, mute, extract audio, compress, convert videos to GIF, and convert to Base64.',
        tools: [
          {
            id: 'trim-video',
            name: 'Trim Video',
            description: 'Cut a portion of a video by specifying start and end times.',
            icon: Scissors,
            keywords: ['video', 'trim', 'cut', 'edit', 'slice', 'ffmpeg']
          },
          {
            id: 'mute-video',
            name: 'Mute Video',
            description: 'Remove audio from a video file.',
            icon: VolumeX,
            keywords: ['video', 'mute', 'remove audio', 'silent', 'ffmpeg']
          },
          {
            id: 'extract-audio',
            name: 'Extract Audio from Video',
            description: 'Convert video to an MP3 audio file.',
            icon: FileAudio,
            keywords: ['video', 'audio', 'extract', 'mp3', 'sound', 'ffmpeg']
          },
          {
            id: 'compress-video',
            name: 'Compress Video',
            description: 'Reduce video file size with minimal quality loss.',
            icon: Minimize2,
            keywords: ['video', 'compress', 'reduce size', 'optimizer', 'ffmpeg']
          },
          {
            id: 'video-to-gif',
            name: 'Video to GIF',
            description: 'Convert a short video clip into an animated GIF.',
            icon: Gift,
            keywords: ['video', 'gif', 'animation', 'convert', 'ffmpeg']
          },
          {
            id: 'video-to-base64',
            name: 'Video to Base64',
            description: 'Convert a video file to a Base64 text string (data URL).',
            icon: FileText,
            keywords: ['video', 'base64', 'text', 'developer', 'data uri', 'frontend']
          }
        ],
        defaultMimeType: 'video',
      }
    };
  