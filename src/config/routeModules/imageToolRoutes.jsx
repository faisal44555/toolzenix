import { lazy } from 'react';

const ImageConverters = lazy(() => import('@/pages/ImageConverters'));
const JpgToPng = lazy(() => import('@/pages/JpgToPng'));
const PngToJpg = lazy(() => import('@/pages/PngToJpg'));
const ImageCompressor = lazy(() => import('@/pages/ImageCompressor'));
const ImageResizer = lazy(() => import('@/pages/ImageResizer'));
const ImageCropper = lazy(() => import('@/pages/ImageCropper'));
const ImageRotator = lazy(() => import('@/pages/ImageRotator'));
const ImageFlipper = lazy(() => import('@/pages/ImageFlipper'));
const ImageGrayscale = lazy(() => import('@/pages/ImageGrayscale'));
const ImageBlur = lazy(() => import('@/pages/ImageBlur'));
const ImagePixelator = lazy(() => import('@/pages/ImagePixelator'));
const ImageBrightness = lazy(() => import('@/pages/ImageBrightness'));
const ImageToB64 = lazy(() => import('@/pages/ImageBase64'));
const AiImageEnhancer = lazy(() => import('@/pages/AiImageEnhancer'));

export const imageToolRoutes = [
  { path: '/image-tools', component: ImageConverters, isToolPage: false, title: "Image Tools" },
  { path: '/jpg-to-png', component: JpgToPng, isToolPage: true, title: "JPG to PNG Converter" },
  { path: '/png-to-jpg', component: PngToJpg, isToolPage: true, title: "PNG to JPG Converter" },
  { path: '/image-compressor', component: ImageCompressor, isToolPage: true, title: "Image Compressor" },
  { path: '/image-resizer', component: ImageResizer, isToolPage: true, title: "Image Resizer" },
  { path: '/image-cropper', component: ImageCropper, isToolPage: true, title: "Image Cropper" },
  { path: '/image-rotator', component: ImageRotator, isToolPage: true, title: "Image Rotator" },
  { path: '/image-flipper', component: ImageFlipper, isToolPage: true, title: "Image Flipper" },
  { path: '/image-grayscale', component: ImageGrayscale, isToolPage: true, title: "Image to Grayscale" },
  { path: '/image-blur', component: ImageBlur, isToolPage: true, title: "Image Blur Tool" },
  { path: '/image-pixelator', component: ImagePixelator, isToolPage: true, title: "Image Pixelator" },
  { path: '/image-brightness', component: ImageBrightness, isToolPage: true, title: "Image Brightness Adjuster" },
  { path: '/image-to-base64', component: ImageToB64, isToolPage: true, title: "Image to Base64 Converter" },
  { path: '/ai-image-enhancer', component: AiImageEnhancer, isToolPage: true, title: "AI Image Enhancer" },
];