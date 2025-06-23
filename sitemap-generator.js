import { writeFileSync } from 'fs';
import { mainNavLinks, allToolCategories, individualTools } from './src/config/navigation.js';

const BASE_URL = 'https://toolzenix.com';

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const urls = new Set();

  // --- Core Pages ---
  urls.add('/');
  urls.add('/sitemap');
  urls.add('/privacy-policy');
  urls.add('/contact');
  urls.add('/terms');
  urls.add('/tools');
  urls.add('/blog');
  urls.add('/about');
  urls.add('/disclaimer');
  urls.add('/features');

  // --- Main Navigation Links (for safety, though most are covered above) ---
  mainNavLinks.forEach(link => {
    if (link.to) urls.add(link.to);
  });

  // --- Tool Category Pages ---
  allToolCategories.forEach(category => {
    if (category.path) urls.add(category.path);
  });

  // --- Individual Tool Pages ---
  individualTools.forEach(tool => {
    if (tool.path) urls.add(tool.path);
  });

  // --- Static Blog Posts ---
  const staticBlogPosts = [
    '/blog/introducing-toolzenix-your-free-online-toolkit',
    '/blog/toolzenix-your-one-stop-shop-for-online-tools',
    '/blog/explore-all-tool-categories',
    '/blog/my-first-post',
    '/blog/another-great-article',
  ];
  staticBlogPosts.forEach(url => urls.add(url));

  // --- Dynamically Generated Tool-Guide Blog Posts ---
  individualTools.forEach(tool => {
    if (tool.path) {
      urls.add(`/blog${tool.path}`);
    }
  });

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${[...urls].filter(Boolean).map(path => {
    let priority = '0.7';
    if (path === '/') {
      priority = '1.0';
    } else if (['/blog', '/tools', '/about', '/contact'].includes(path)) {
      priority = '0.9';
    } else if (allToolCategories.some(c => c.path === path)) {
      priority = '0.85';
    } else if (path.startsWith('/blog/')) {
        priority = '0.8';
    } else if (individualTools.some(t => t.path === path)) {
        priority = '0.75';
    }
    
    return `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n')}
</urlset>
`;

  try {
    writeFileSync('public/sitemap.xml', sitemapContent.trim());
    console.log('✅ sitemap.xml generated successfully with all tools, categories, and blog posts!');
  } catch (e) {
    console.error('❌ Could not generate sitemap:', e);
  }
}

generateSitemap();