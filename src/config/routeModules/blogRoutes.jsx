import React, { lazy } from 'react';
import ToolBlogPost from '@/components/blog/ToolBlogPost';
import { individualTools } from '@/config/navigation';

const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogPostToolzenixIntro = lazy(() => import('@/pages/BlogPostToolzenixIntro'));
const BlogPostAllCategories = lazy(() => import('@/pages/BlogPostAllCategories'));
const BlankBlogPage = lazy(() => import('@/pages/BlankBlogPage'));
const BlankBlogPageTwo = lazy(() => import('@/pages/BlankBlogPageTwo'));
const BlogPostOneStopShop = lazy(() => import('@/pages/BlogPostOneStopShop'));

const staticBlogPosts = [
  {
    path: '/blog/introducing-toolzenix-your-free-online-toolkit',
    component: BlogPostToolzenixIntro,
    title: 'Introducing Toolzenix: Your Ultimate Free Online Toolkit',
    description: 'Discover Toolzenix.com, the all-in-one platform offering a vast collection of 200+ free online tools across 23 powerful categories.',
    isToolPage: false, 
  },
  {
    path: '/blog/toolzenix-your-one-stop-shop-for-online-tools',
    component: BlogPostOneStopShop,
    title: 'Toolzenix: Your One-Stop Shop for Online Tools',
    description: 'Discover why Toolzenix is the ultimate one-stop shop for all your online tool needs. Explore over 200+ free tools across 23 categories.',
    isToolPage: false,
  },
  {
    path: '/blog/explore-all-tool-categories',
    component: BlogPostAllCategories,
    title: 'Explore 200+ Free Online Tools in 23 Powerful Categories | Toolzenix',
    description: 'Dive into Toolzenix.com\'s vast collection of over 200 free online tools, expertly organized into 23 categories.',
    isToolPage: false,
  },
  { 
    path: '/blog/my-first-post', 
    component: BlankBlogPage,
    title: 'My First Blog Post - Toolzenix',
    description: 'A new blog post on Toolzenix. Start writing your content here.',
    isToolPage: false,
  },
  {
    path: '/blog/another-great-article',
    component: BlankBlogPageTwo,
    title: 'Another Great Article - Toolzenix',
    description: 'The second blog post, ready for content.',
    isToolPage: false,
  }
];

export const blogRoutes = [
  {
    path: '/blog',
    component: BlogPage,
    title: 'Toolzenix Blog - Tips, Guides, and Updates',
    description: 'Explore articles, guides, and updates about Toolzenix tools and online productivity.',
    isToolPage: false,
  },
  ...staticBlogPosts,
  {
    path: '/blog/:slug',
    component: ToolBlogPost,
    isToolPage: false,
  }
];