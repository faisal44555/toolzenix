import { lazy } from 'react';

const AiTools = lazy(() => import('@/pages/AiTools'));
const AiTextSummarizer = lazy(() => import('@/pages/AiTextSummarizer'));
const AiParaphraser = lazy(() => import('@/pages/AiParaphraser'));
const AiSentimentAnalyzer = lazy(() => import('@/pages/AiSentimentAnalyzer'));
const AiGrammarChecker = lazy(() => import('@/pages/AiGrammarChecker'));
const AiResumeAnalyzer = lazy(() => import('@/pages/AiResumeAnalyzer'));
const AiImageCaptionGenerator = lazy(() => import('@/pages/AiImageCaptionGenerator'));
const AiKeywordExtractor = lazy(() => import('@/pages/AiKeywordExtractor'));
const AiCodeExplainer = lazy(() => import('@/pages/AiCodeExplainer'));
const AiImageEnhancer = lazy(() => import('@/pages/AiImageEnhancer'));
const AiFaceSwap = lazy(() => import('@/pages/AiFaceSwap'));

export const aiToolRoutes = [
  { path: '/ai-tools', component: AiTools, isToolPage: false, title: "AI Tools" },
  { path: '/ai-text-summarizer', component: AiTextSummarizer, isToolPage: true, title: "AI Text Summarizer" },
  { path: '/ai-paraphraser', component: AiParaphraser, isToolPage: true, title: "AI Paraphraser" },
  { path: '/ai-sentiment-analyzer', component: AiSentimentAnalyzer, isToolPage: true, title: "AI Sentiment Analyzer" },
  { path: '/ai-grammar-checker', component: AiGrammarChecker, isToolPage: true, title: "AI Grammar Checker" },
  { path: '/ai-resume-analyzer', component: AiResumeAnalyzer, isToolPage: true, title: "AI Resume Analyzer" },
  { path: '/ai-image-caption-generator', component: AiImageCaptionGenerator, isToolPage: true, title: "AI Image Caption Generator" },
  { path: '/ai-keyword-extractor', component: AiKeywordExtractor, isToolPage: true, title: "AI Keyword Extractor" },
  { path: '/ai-code-explainer', component: AiCodeExplainer, isToolPage: true, title: "AI Code Explainer" },
  { path: '/ai-image-enhancer', component: AiImageEnhancer, isToolPage: true, title: "AI Image Enhancer" },
  { path: '/ai-face-swap', component: AiFaceSwap, isToolPage: true, title: "AI Face Swap" },
];