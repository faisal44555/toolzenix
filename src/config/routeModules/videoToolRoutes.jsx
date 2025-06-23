import { lazy } from 'react';

const VideoConverters = lazy(() => import('@/pages/VideoConverters'));
const VideoToGif = lazy(() => import('@/pages/VideoToGif'));
const MuteVideo = lazy(() => import('@/pages/MuteVideo'));
const VideoTrimmer = lazy(() => import('@/pages/VideoTrimmer'));


export const videoToolRoutes = [
  { path: '/video-tools', component: VideoConverters, isToolPage: false, title: "Video Tools" },
  { path: '/video-to-gif', component: VideoToGif, isToolPage: true, title: "Video to GIF Converter" },
  { path: '/mute-video', component: MuteVideo, isToolPage: true, title: "Mute Video Tool" },
  { path: '/video-trimmer', component: VideoTrimmer, isToolPage: true, title: "Video Trimmer" },
];