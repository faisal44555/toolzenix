import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Mail, Globe } from "lucide-react";

const Terms = () => {
  const lastUpdatedDate = "June 16, 2025";
  const websiteUrl = "https://www.toolzenix.com";
  const contactEmail = "support@toolzenix.com";

  return (
    <>
      <Helmet>
        <title>Terms of Service - Toolzenix</title>
        <meta name="description" content={`Read the Terms of Service for using Toolzenix.com. Last updated: ${lastUpdatedDate}.`} />
        <link rel="canonical" href={`${websiteUrl}/terms-of-service`} />
        <meta property="og:title" content="Terms of Service - Toolzenix" />
        <meta property="og:description" content={`Our Terms of Service for Toolzenix.com. Ensure you understand your rights and obligations. Last updated: ${lastUpdatedDate}.`} />
        <meta property="og:url" content={`${websiteUrl}/terms-of-service`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto my-8 shadow-xl rounded-lg">
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">Terms of Service</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Last Updated: {lastUpdatedDate}
          </p>
        </header>

        <p className="mb-6 text-slate-600 dark:text-slate-300">
          Welcome to Toolzenix.com. By accessing or using our website, tools, or services, you agree to comply with and be bound by the following Terms of Service. Please read them carefully before using our platform.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-500 mb-3">1. Acceptance of Terms</h2>
          <p className="text-slate-600 dark:text-slate-300">
            By using Toolzenix.com, you agree to these Terms of Service and our <Link to="/privacy-policy" className="text-indigo-600 dark:text-indigo-400 hover:underline">Privacy Policy</Link>. If you do not agree with any part of these terms, please do not use the website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-500 mb-3">2. Use of Tools</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 pl-4">
            <li>All tools provided on Toolzenix are for informational, personal, and non-commercial use only.</li>
            <li>Tools are provided “as-is” and without warranties of any kind.</li>
            <li>You are responsible for ensuring the accuracy and legality of how you use the output generated.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-500 mb-3">3. No File Storage</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 pl-4">
            <li>Toolzenix.com is 100% frontend-based, meaning we do not store or collect any uploaded files (images, documents, audio, videos, etc.).</li>
            <li>All processing happens locally in your browser. Your data is not sent to any server.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-500 mb-3">4. User Responsibilities</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 pl-4">
            <li>You agree not to use our tools for any unlawful, harmful, or abusive purposes.</li>
            <li>You may not reverse engineer, copy, sell, or exploit any part of our website or services.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-500 mb-3">5. Intellectual Property</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 pl-4">
            <li>All content, logos, design, and tools on Toolzenix are the property of Toolzenix.com and protected by copyright laws.</li>
            <li>You may not duplicate or reproduce content without prior written permission.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-500 mb-3">6. Limitation of Liability</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 pl-4">
            <li>Toolzenix is not liable for any damages (direct, indirect, or consequential) that arise from the use or inability to use our website or tools.</li>
            <li>No guarantees are made regarding the accuracy, reliability, or availability of the services.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-500 mb-3">7. Third-Party Ads & Links</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 pl-4">
            <li>We use Google AdSense and other ad networks to display ads.</li>
            <li>Toolzenix is not responsible for the content, privacy, or practices of any third-party sites linked or advertised on our platform.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-500 mb-3">8. Modifications</h2>
          <p className="text-slate-600 dark:text-slate-300">
            Toolzenix reserves the right to modify these Terms at any time without prior notice. Any changes will be updated on this page, and continued use of the site signifies your acceptance of those changes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-500 mb-3">9. Termination</h2>
          <p className="text-slate-600 dark:text-slate-300">
            We reserve the right to suspend or terminate your access to the website if you violate any of these terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-500 mb-3">10. Contact Us</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-2">
            If you have any questions or concerns about these Terms of Service, you may contact us at:
          </p>
          <div className="flex items-center text-slate-600 dark:text-slate-300 mb-1">
            <Mail className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
            <span>Email:</span>
            <a href={`mailto:${contactEmail}`} className="ml-1 text-indigo-600 dark:text-indigo-400 hover:underline">
              {contactEmail}
            </a>
          </div>
          <div className="flex items-center text-slate-600 dark:text-slate-300">
            <Globe className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
            <span>Website:</span>
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="ml-1 text-indigo-600 dark:text-indigo-400 hover:underline">
              {websiteUrl}
            </a>
          </div>
        </section>

        <footer className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            ✅ By using this website, you agree to all the terms listed above.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Terms;