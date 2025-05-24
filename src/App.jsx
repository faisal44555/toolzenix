
    import React from 'react';
    import { Routes, Route } from 'react-router-dom';
    import { Layout } from '@/components/Layout';
    import { HomePage } from '@/pages/HomePage';
    import { ToolCategoryPage } from '@/pages/ToolCategoryPage';
    import { ToolDetailPage } from '@/pages/ToolDetailPage';
    import { NotFoundPage } from '@/pages/NotFoundPage';
    import { AllToolsPage } from '@/pages/AllToolsPage';
    import { FeaturesPage } from '@/pages/FeaturesPage';
    import { SearchResultsPage } from '@/pages/SearchResultsPage';
    import { AboutPage } from '@/pages/AboutPage';
    import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
    import { ContactPage } from '@/pages/ContactPage';
    import { BlogPage } from '@/pages/BlogPage';


    function App() {
      return (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="tools" element={<AllToolsPage />} />
            <Route path="tools/:categoryId" element={<ToolCategoryPage />} />
            <Route path="tool/:categoryId/:toolId" element={<ToolDetailPage />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="search" element={<SearchResultsPage />} />
            <Route path="about" element={<AboutPage />} /> 
            <Route path="privacy" element={<PrivacyPolicyPage />} />
            <Route path="contact" element={<ContactPage />} /> 
            <Route path="blog" element={<BlogPage />} /> 
            
            {/* Placeholder routes for other pages mentioned in footer/header */}
            <Route path="terms" element={<NotFoundPage />} /> 
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      );
    }

    export default App;
  