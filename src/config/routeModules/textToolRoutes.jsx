import { lazy } from 'react';

const TextTools = lazy(() => import('@/pages/TextTools'));
const WordCounter = lazy(() => import('@/pages/WordCounter'));
const CharacterCounter = lazy(() => import('@/pages/CharacterCounter'));
const SentenceCounter = lazy(() => import('@/pages/SentenceCounter'));
const ParagraphCounter = lazy(() => import('@/pages/ParagraphCounter'));
const RemoveDuplicateLines = lazy(() => import('@/pages/RemoveDuplicateLines'));
const RemoveLineBreaks = lazy(() => import('@/pages/LineBreakRemover'));
const TextToUppercase = lazy(() => import('@/pages/TextToUppercase'));
const TextToLowercase = lazy(() => import('@/pages/TextToLowercase'));
const TitleCaseConverter = lazy(() => import('@/pages/TitleCaseConverter'));
const ReverseText = lazy(() => import('@/pages/ReverseText'));
const TextToBinary = lazy(() => import('@/pages/TextToBinary'));
const BinaryToText = lazy(() => import('@/pages/BinaryToText'));
const TextToSpeech = lazy(() => import('@/pages/TextToSpeech'));
const FindAndReplace = lazy(() => import('@/pages/FindAndReplace'));
const OnlineNotepad = lazy(() => import('@/pages/OnlineNotepad'));
const RemoveExtraSpaces = lazy(() => import('@/pages/RemoveExtraSpaces'));
const WordOccurrenceCounter = lazy(() => import('@/pages/WordOccurrenceCounter'));
const WordFrequencyAnalyzer = lazy(() => import('@/pages/WordFrequencyAnalyzer'));
const RemoveEmptyLines = lazy(() => import('@/pages/RemoveEmptyLines'));
const TextEncryptDecrypt = lazy(() => import('@/pages/TextEncryptDecrypt'));

export const textToolRoutes = [
  { path: '/text-tools', component: TextTools, isToolPage: false, title: "Text Tools" },
  { path: '/word-counter', component: WordCounter, isToolPage: true, title: "Word Counter" },
  { path: '/character-counter', component: CharacterCounter, isToolPage: true, title: "Character Counter" },
  { path: '/sentence-counter', component: SentenceCounter, isToolPage: true, title: "Sentence Counter" },
  { path: '/paragraph-counter', component: ParagraphCounter, isToolPage: true, title: "Paragraph Counter" },
  { path: '/remove-duplicate-lines', component: RemoveDuplicateLines, isToolPage: true, title: "Remove Duplicate Lines" },
  { path: '/remove-line-breaks', component: RemoveLineBreaks, isToolPage: true, title: "Remove Line Breaks" },
  { path: '/text-to-uppercase', component: TextToUppercase, isToolPage: true, title: "Text to Uppercase Converter" },
  { path: '/text-to-lowercase', component: TextToLowercase, isToolPage: true, title: "Text to Lowercase Converter" },
  { path: '/title-case-converter', component: TitleCaseConverter, isToolPage: true, title: "Title Case Converter" },
  { path: '/reverse-text', component: ReverseText, isToolPage: true, title: "Reverse Text Tool" },
  { path: '/text-to-binary', component: TextToBinary, isToolPage: true, title: "Text to Binary Converter" },
  { path: '/binary-to-text', component: BinaryToText, isToolPage: true, title: "Binary to Text Converter" },
  { path: '/text-to-speech', component: TextToSpeech, isToolPage: true, title: "Text to Speech Converter" },
  { path: '/find-and-replace', component: FindAndReplace, isToolPage: true, title: "Find and Replace Text" },
  { path: '/online-notepad', component: OnlineNotepad, isToolPage: true, title: "Online Notepad" },
  { path: '/remove-extra-spaces', component: RemoveExtraSpaces, isToolPage: true, title: "Remove Extra Spaces" },
  { path: '/word-occurrence-counter', component: WordOccurrenceCounter, isToolPage: true, title: "Word Occurrence Counter" },
  { path: '/word-frequency-analyzer', component: WordFrequencyAnalyzer, isToolPage: true, title: "Word Frequency Analyzer" },
  { path: '/remove-empty-lines', component: RemoveEmptyLines, isToolPage: true, title: "Remove Empty Lines" },
  { path: '/text-encrypt-decrypt', component: TextEncryptDecrypt, isToolPage: true, title: "Text Encrypt/Decrypt (Old)" },
];