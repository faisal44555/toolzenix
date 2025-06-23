import { lazy } from 'react';

const MarketingTools = lazy(() => import('@/pages/MarketingTools'));
const MetaTagAnalyzer = lazy(() => import('@/pages/MetaTagAnalyzer'));
const UtmLinkGenerator = lazy(() => import('@/pages/UtmLinkGenerator'));
const KeywordDensityChecker = lazy(() => import('@/pages/KeywordDensityChecker'));
const EmailSubjectLineTester = lazy(() => import('@/pages/EmailSubjectLineTester'));
const SloganGenerator = lazy(() => import('@/pages/SloganGenerator'));
const RoiCalculator = lazy(() => import('@/pages/RoiCalculator'));
const ContentIdeaGenerator = lazy(() => import('@/pages/ContentIdeaGenerator'));
const AdImageSizeChecker = lazy(() => import('@/pages/AdImageSizeChecker'));
const CompetitorKeywordExtractor = lazy(() => import('@/pages/CompetitorKeywordExtractor'));
const HeadlineAnalyzer = lazy(() => import('@/pages/HeadlineAnalyzer'));
const MetaTagGenerator = lazy(() => import('@/pages/MetaTagGenerator'));
const BlogTitleGenerator = lazy(() => import('@/pages/BlogTitleGenerator'));
const AdCopyGenerator = lazy(() => import('@/pages/AdCopyGenerator'));
const AdCharacterCounter = lazy(() => import('@/pages/AdCharacterCounter'));

export const marketingToolRoutes = [
  { path: '/marketing-tools', component: MarketingTools, isToolPage: false, title: "Marketing Tools" },
  { path: '/meta-tag-analyzer', component: MetaTagAnalyzer, isToolPage: true, title: "Meta Tag Analyzer" },
  { path: '/utm-link-generator', component: UtmLinkGenerator, isToolPage: true, title: "UTM Link Generator" },
  { path: '/keyword-density-checker', component: KeywordDensityChecker, isToolPage: true, title: "Keyword Density Checker" },
  { path: '/email-subject-line-tester', component: EmailSubjectLineTester, isToolPage: true, title: "Email Subject Line Tester" },
  { path: '/slogan-generator', component: SloganGenerator, isToolPage: true, title: "Slogan Generator" },
  { path: '/roi-calculator', component: RoiCalculator, isToolPage: true, title: "ROI Calculator" },
  { path: '/content-idea-generator', component: ContentIdeaGenerator, isToolPage: true, title: "Content Idea Generator" },
  { path: '/ad-image-size-checker', component: AdImageSizeChecker, isToolPage: true, title: "Ad Image Size Checker" },
  { path: '/competitor-keyword-extractor', component: CompetitorKeywordExtractor, isToolPage: true, title: "Competitor Keyword Extractor" },
  { path: '/headline-analyzer', component: HeadlineAnalyzer, isToolPage: true, title: "Headline Analyzer" },
  { path: '/meta-tag-generator', component: MetaTagGenerator, isToolPage: true, title: "Meta Tag Generator" },
  { path: '/blog-title-generator', component: BlogTitleGenerator, isToolPage: true, title: "Blog Title Generator" },
  { path: '/ad-copy-generator', component: AdCopyGenerator, isToolPage: true, title: "Ad Copy Generator" },
  { path: '/ad-character-counter', component: AdCharacterCounter, isToolPage: true, title: "Ad Character Counter" },
];