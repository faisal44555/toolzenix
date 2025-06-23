import { lazy } from 'react';

const LanguageTools = lazy(() => import('@/pages/LanguageTools'));
const SimpleTextTranslator = lazy(() => import('@/pages/SimpleTextTranslator'));
const LanguageDetector = lazy(() => import('@/pages/LanguageDetector'));
const MorseCodeConverter = lazy(() => import('@/pages/MorseCodeConverter'));
const UpsideDownTextGenerator = lazy(() => import('@/pages/UpsideDownTextGenerator'));
const ZalgoTextGenerator = lazy(() => import('@/pages/ZalgoTextGenerator'));
const BrailleTranslator = lazy(() => import('@/pages/BrailleTranslator'));

export const languageToolRoutes = [
  { path: '/language-tools', component: LanguageTools, isToolPage: false, title: "Language Tools" },
  { path: '/simple-text-translator', component: SimpleTextTranslator, isToolPage: true, title: "Simple Text Translator" },
  { path: '/language-detector', component: LanguageDetector, isToolPage: true, title: "Language Detector" },
  { path: '/morse-code-converter', component: MorseCodeConverter, isToolPage: true, title: "Morse Code Converter" },
  { path: '/upside-down-text-generator', component: UpsideDownTextGenerator, isToolPage: true, title: "Upside Down Text Generator" },
  { path: '/zalgo-text-generator', component: ZalgoTextGenerator, isToolPage: true, title: "Zalgo Text Generator" },
  { path: '/braille-translator', component: BrailleTranslator, isToolPage: true, title: "Braille Translator" },
];