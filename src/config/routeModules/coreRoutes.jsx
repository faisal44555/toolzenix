import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Terms = lazy(() => import('@/pages/Terms'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const Disclaimer = lazy(() => import('@/pages/Disclaimer'));
const Sitemap = lazy(() => import('@/pages/Sitemap'));
const Features = lazy(() => import('@/pages/Features'));
const AllToolsPage = lazy(() => import('@/pages/AllToolsPage'));

const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlankBlogPage = lazy(() => import('@/pages/BlankBlogPage'));
const BlankBlogPageTwo = lazy(() => import('@/pages/BlankBlogPageTwo'));
const BlogPostToolzenixIntro = lazy(() => import('@/pages/BlogPostToolzenixIntro'));


export const coreRoutes = [
  { path: '/', component: Home, title: 'Toolzenix - 200+ Free Online Tools', description: 'Over 200 free online tools for images, videos, documents, text, math, and more. Secure, fast, and user-friendly.' },
  { path: '/about', component: About, title: 'About Toolzenix', description: 'Learn about Toolzenix and its mission to provide free online tools.' },
  { path: '/contact', component: Contact, title: 'Contact Us', description: 'Get in touch with the Toolzenix team.' },
  { path: '/terms', component: Terms, title: 'Terms of Service', description: 'Read the terms and conditions for using Toolzenix.' },
  { path: '/privacy-policy', component: PrivacyPolicy, title: 'Privacy Policy', description: 'Understand how Toolzenix handles your data.' },
  { path: "disclaimer", component: Disclaimer, title: "Disclaimer", description: "Read the disclaimer for Toolzenix.com." },
  { path: '/sitemap', component: Sitemap, title: 'Sitemap - All Tools', description: 'Explore all available tools on Toolzenix.' },
  { path: '/features', component: Features, title: 'Features - Why Choose Toolzenix', description: 'Discover the key features and benefits of using Toolzenix online tools.' },
  { path: '/tools', component: AllToolsPage, title: 'All Tools - Explore by Category', description: 'Browse all Toolzenix tools organized by category.' },

  { path: '/blog', component: BlogPage, title: 'Toolzenix Blog', description: 'Latest news, updates, and articles from Toolzenix.' },
  { path: '/blog/post-1', component: BlankBlogPage, title: 'Sample Blog Post 1', description: 'This is a sample blog post on Toolzenix.' },
  { path: '/blog/post-2', component: BlankBlogPageTwo, title: 'Sample Blog Post 2', description: 'This is another sample blog post on Toolzenix.' },
  { path: '/blog/introducing-toolzenix', component: BlogPostToolzenixIntro, title: 'Introducing Toolzenix: Your Ultimate Free Online Toolkit', description: 'Discover Toolzenix, a comprehensive suite of over 200 free, secure, and user-friendly online tools designed to simplify your digital life. Learn about our mission, features, and how Toolzenix can boost your productivity.' },
];