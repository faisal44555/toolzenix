import { lazy } from 'react';

const ColorTools = lazy(() => import('@/pages/ColorTools'));
const ColorPickerTool = lazy(() => import('@/pages/ColorPickerTool'));
const HexToRgbConverter = lazy(() => import('@/pages/HexToRgbConverter'));
const RgbToHexConverter = lazy(() => import('@/pages/RgbToHexConverter'));
const ColorPaletteGenerator = lazy(() => import('@/pages/ColorPaletteGenerator'));
const ContrastChecker = lazy(() => import('@/pages/ContrastChecker'));
const GradientGenerator = lazy(() => import('@/pages/GradientGenerator'));
const ImageColorExtractor = lazy(() => import('@/pages/ImageColorExtractor'));
const ColorBlindnessSimulator = lazy(() => import('@/pages/ColorBlindnessSimulator'));
const CssColorCodeGenerator = lazy(() => import('@/pages/CssColorCodeGenerator'));
const DarkLightColorPreview = lazy(() => import('@/pages/DarkLightColorPreview'));


export const colorToolRoutes = [
  { path: '/color-tools', component: ColorTools, isToolPage: false, title: "Color Tools" },
  { path: '/color-picker', component: ColorPickerTool, isToolPage: true, title: "Color Picker" },
  { path: '/hex-to-rgb-converter', component: HexToRgbConverter, isToolPage: true, title: "HEX to RGB Converter" },
  { path: '/rgb-to-hex-converter', component: RgbToHexConverter, isToolPage: true, title: "RGB to HEX Converter" },
  { path: '/color-palette-generator', component: ColorPaletteGenerator, isToolPage: true, title: "Color Palette Generator" },
  { path: '/contrast-checker', component: ContrastChecker, isToolPage: true, title: "Color Contrast Checker" },
  { path: '/gradient-generator', component: GradientGenerator, isToolPage: true, title: "CSS Gradient Generator" },
  { path: '/image-color-extractor', component: ImageColorExtractor, isToolPage: true, title: "Image Color Extractor" },
  { path: '/color-blindness-simulator', component: ColorBlindnessSimulator, isToolPage: true, title: "Color Blindness Simulator" },
  { path: '/css-color-code-generator', component: CssColorCodeGenerator, isToolPage: true, title: "CSS Color Code Generator" },
  { path: '/dark-light-color-preview', component: DarkLightColorPreview, isToolPage: true, title: "Dark/Light Theme Color Preview" },
];