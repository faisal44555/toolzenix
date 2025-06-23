import { lazy } from 'react';

const Mp3Tools = lazy(() => import('@/pages/Mp3Tools'));
const Mp3Renamer = lazy(() => import('@/pages/tools/mp3/Mp3Renamer'));
const Mp3Base64Converter = lazy(() => import('@/pages/tools/mp3/Mp3Base64Converter'));
const Mp3FileHelper = lazy(() => import('@/pages/tools/mp3/Mp3FileHelper'));
const Mp3MetadataViewer = lazy(() => import('@/pages/tools/mp3/Mp3MetadataViewer'));
const Mp3LoopPlayer = lazy(() => import('@/pages/tools/mp3/Mp3LoopPlayer'));
const Mp3InfoViewer = lazy(() => import('@/pages/tools/mp3/Mp3InfoViewer'));


export const mp3ToolRoutes = [
  { 
    path: '/mp3-tools', 
    component: Mp3Tools, 
    isToolPage: false, 
    title: "MP3 Tools",
    description: "A collection of online MP3 utilities for playing, viewing metadata, and managing audio files." 
  },
  { 
    path: '/mp3-renamer', 
    component: Mp3Renamer, 
    isToolPage: true, 
    title: "MP3 File Renamer",
    description: "Batch rename MP3 files based on their metadata (artist, title, album, etc.)."
  },
  {
    path: '/mp3-base64-converter',
    component: Mp3Base64Converter,
    isToolPage: true,
    title: "MP3 to Base64 Converter",
    description: "Convert MP3 audio files to Base64 strings or decode Base64 strings back to MP3 files."
  },
  {
    path: '/mp3-file-helper',
    component: Mp3FileHelper,
    isToolPage: true,
    title: "Upload MP3",
    description: "Upload and download MP3 files. A simple helper utility for MP3s."
  },
  {
    path: '/mp3-metadata-viewer',
    component: Mp3MetadataViewer,
    isToolPage: true,
    title: "MP3 Metadata Viewer",
    description: "View ID3 tags and metadata of your MP3 files."
  },
  {
    path: '/mp3-loop-player',
    component: Mp3LoopPlayer,
    isToolPage: true,
    title: "MP3 Loop Player",
    description: "Loop sections of your MP3 files. Select a region on the waveform and play it repeatedly."
  },
  {
    path: '/mp3-info-viewer',
    component: Mp3InfoViewer,
    isToolPage: true,
    title: "MP3 Info Viewer",
    description: "Quickly view basic information about an MP3 file like duration and size."
  }
];