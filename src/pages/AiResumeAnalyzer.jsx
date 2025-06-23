import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FileText, Search, CheckSquare, AlertTriangle, Copy, Trash2 } from 'lucide-react';
import nlp from 'compromise';
// compromise-numbers and other plugins might be useful for more detailed analysis
// For now, core compromise for keyword extraction and basic checks.

const commonActionVerbs = [
  'achieved', 'administered', 'advised', 'advocated', 'analyzed', 'authored', 'budgeted', 'built', 'calculated', 'chaired',
  'coached', 'collaborated', 'communicated', 'compiled', 'completed', 'conceived', 'conducted', 'consolidated', 'constructed',
  'consulted', 'coordinated', 'counseled', 'created', 'critiqued', 'cultivated', 'decreased', 'defined', 'delegated',
  'delivered', 'demonstrated', 'designed', 'developed', 'devised', 'directed', 'documented', 'drove', 'edited', 'educated',
  'eliminated', 'enabled', 'encouraged', 'engineered', 'enhanced', 'ensured', 'established', 'evaluated', 'executed',
  'expanded', 'expedited', 'facilitated', 'fashioned', 'focused', 'forecasted', 'formulated', 'founded', 'generated',
  'guided', 'headed', 'identified', 'implemented', 'improved', 'increased', 'influenced', 'initiated', 'innovated',
  'inspected', 'inspired', 'installed', 'instituted', 'instructed', 'integrated', 'interpreted', 'interviewed', 'invented',
  'investigated', 'launched', 'led', 'lectured', 'lobbied', 'maintained', 'managed', 'marketed', 'mastered', 'mediated',
  'mentored', 'merged', 'modeled', 'moderated', 'monitored', 'motivated', 'negotiated', 'operated', 'orchestrated',
  'ordered', 'organized', 'overhauled', 'oversaw', 'participated', 'partnered', 'pioneered', 'planned', 'prepared',
  'presented', 'presided', 'prioritized', 'produced', 'programmed', 'projected', 'promoted', 'proofread', 'proposed',
  'provided', 'published', 'purchased', 'quantified', 'raised', 'ranked', 'rated', 'received', 'recommended', 'reconciled',
  'recorded', 'recruited', 'redesigned', 'reduced', 'refined', 'regulated', 'rehabilitated', 'remodeled', 'reorganized',
  'repaired', 'reported', 'represented', 'researched', 'resolved', 'restored', 'restructured', 'retrieved', 'revamped',
  'reviewed', 'revised', 'revitalized', 'saved', 'scheduled', 'screened', 'secured', 'selected', 'served', 'shaped',
  'simplified', 'sold', 'solved', 'spearheaded', 'specified', 'spoke', 'standardized', 'stimulated', 'streamlined',
  'strengthened', 'structured', 'studied', 'succeeded', 'summarized', 'supervised', 'supplied', 'supported', 'surveyed',
  'synthesized', 'systematized', 'taught', 'tested', 'trained', 'translated', 'traveled', 'treated', 'trimmed', 'tutored',
  'unified', 'updated', 'upgraded', 'utilized', 'validated', 'valued', 'visualized', 'won', 'wrote'
];


const AiResumeAnalyzer = () => {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setResumeText(e.target.value);
    setAnalysis(null);
  };

  const analyzeResume = () => {
    if (!resumeText.trim()) {
      toast({ title: 'Input Required', description: 'Please paste your resume text to analyze.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    setAnalysis(null);

    setTimeout(() => {
      try {
        const doc = nlp(resumeText);
        
        // Keyword Extraction (Nouns and Adjectives)
        const keywords = doc.nouns().out('array').concat(doc.adjectives().out('array'));
        const uniqueKeywords = [...new Set(keywords.map(k => k.toLowerCase()))].slice(0, 20); // Top 20

        // Action Verb Check
        const verbs = doc.verbs().out('array').map(v => v.toLowerCase());
        const foundActionVerbs = verbs.filter(v => commonActionVerbs.includes(v));
        const actionVerbPercentage = verbs.length > 0 ? (foundActionVerbs.length / verbs.length) * 100 : 0;

        // Sentence Length Analysis (Basic)
        const sentences = doc.sentences().out('array');
        const avgSentenceLength = sentences.length > 0 ? resumeText.split(/\s+/).length / sentences.length : 0;
        const longSentences = sentences.filter(s => s.split(/\s+/).length > 25).length;

        // Basic contact info check (presence of email/phone pattern)
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
        const phoneRegex = /(\+\d{1,3}[- ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})/;
        const hasEmail = emailRegex.test(resumeText);
        const hasPhone = phoneRegex.test(resumeText);

        setAnalysis({
          keywords: uniqueKeywords,
          actionVerbs: {
            found: [...new Set(foundActionVerbs)],
            percentage: actionVerbPercentage.toFixed(1),
            count: foundActionVerbs.length,
            totalVerbs: verbs.length,
          },
          sentenceStats: {
            count: sentences.length,
            avgLength: avgSentenceLength.toFixed(1),
            longSentencesCount: longSentences,
          },
          contactInfo: {
            hasEmail,
            hasPhone,
          }
        });
        toast({ title: 'Resume Analyzed!', description: 'Basic analysis complete. Review the suggestions.' });
      } catch (error) {
        console.error("Error analyzing resume:", error);
        toast({ title: 'Analysis Error', description: 'Could not analyze resume text.', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    }, 700);
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: 'Copied!', description: 'Text copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', description: 'Could not copy text.', variant: 'destructive' }));
  };

  const clearText = () => {
    setResumeText('');
    setAnalysis(null);
    toast({ title: 'Text Cleared', description: 'Input and analysis have been cleared.'});
  };


  return (
    <>
      <Helmet>
        <title>AI Resume Analyzer | Toolzenix</title>
        <meta name="description" content="Get instant feedback on your resume. Our AI tool analyzes keywords, action verbs, and more to help you improve your job application." />
        <link rel="canonical" href="https://toolzenix.com/ai-resume-analyzer" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <FileText className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">AI Resume Analyzer</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">Paste your resume text for a basic analysis and improvement suggestions.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6">
          <div>
            <label htmlFor="resumeInputText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Paste Resume Text Here</label>
            <Textarea
              id="resumeInputText"
              value={resumeText}
              onChange={handleInputChange}
              placeholder="Ensure your resume is in plain text format for best results..."
              className="min-h-[250px] dark:bg-gray-700 dark:text-white dark:border-gray-600"
              rows={12}
            />
            <div className="mt-2 flex justify-end space-x-2">
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(resumeText)} disabled={!resumeText} title="Copy resume text">
                    <Copy size={16} className="mr-1" /> Copy Input
                </Button>
                <Button variant="ghost" size="sm" onClick={clearText} disabled={!resumeText && !analysis} title="Clear input and analysis">
                    <Trash2 size={16} className="mr-1" /> Clear
                </Button>
            </div>
          </div>
          <Button onClick={analyzeResume} disabled={isLoading || !resumeText.trim()} className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 text-lg">
            {isLoading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Search size={22} className="mr-2" /></motion.div> : <Search size={22} className="mr-2" />}
            Analyze Resume
          </Button>

          {analysis && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Analysis Report:</h3>
              
              <AnalysisSection title="Keywords Extracted (Top 20)">
                {analysis.keywords.length > 0 ? 
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywords.map(kw => <span key={kw} className="bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-200 px-2 py-1 text-xs rounded-full">{kw}</span>)}
                  </div>
                  : <p className="text-sm text-gray-500 dark:text-gray-400">No significant keywords found.</p>}
              </AnalysisSection>

              <AnalysisSection title="Action Verbs">
                <p className="text-sm">Found {analysis.actionVerbs.count} action verbs out of {analysis.actionVerbs.totalVerbs} total verbs ({analysis.actionVerbs.percentage}%).</p>
                {analysis.actionVerbs.found.length > 0 ? 
                  <div className="flex flex-wrap gap-2 mt-2">
                    {analysis.actionVerbs.found.slice(0,15).map(v => <span key={v} className="bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-200 px-2 py-1 text-xs rounded-full">{v}</span>)}
                    {analysis.actionVerbs.found.length > 15 && <span className="text-xs text-gray-500 dark:text-gray-400">...and more.</span>}
                  </div>
                  : <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Consider adding more action verbs to describe accomplishments.</p>}
              </AnalysisSection>

              <AnalysisSection title="Sentence Structure">
                <p className="text-sm">Total Sentences: {analysis.sentenceStats.count}</p>
                <p className="text-sm">Average Words per Sentence: {analysis.sentenceStats.avgLength}</p>
                <p className="text-sm">Sentences with >25 words: {analysis.sentenceStats.longSentencesCount} (Aim for concise sentences)</p>
              </AnalysisSection>
              
              <AnalysisSection title="Contact Information">
                <div className="space-y-1">
                    <div className={`flex items-center text-sm ${analysis.contactInfo.hasEmail ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {analysis.contactInfo.hasEmail ? <CheckSquare size={16} className="mr-2"/> : <AlertTriangle size={16} className="mr-2"/>}
                        Email Address: {analysis.contactInfo.hasEmail ? "Detected" : "Not Detected (Recommended)"}
                    </div>
                    <div className={`flex items-center text-sm ${analysis.contactInfo.hasPhone ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {analysis.contactInfo.hasPhone ? <CheckSquare size={16} className="mr-2"/> : <AlertTriangle size={16} className="mr-2"/>}
                        Phone Number: {analysis.contactInfo.hasPhone ? "Detected" : "Not Detected (Recommended)"}
                    </div>
                </div>
              </AnalysisSection>

            </motion.div>
          )}
        </motion.div>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            Disclaimer: This tool provides a basic, automated analysis. It's not a substitute for professional resume advice or ATS compatibility checks.
        </p>
      </div>
    </>
  );
};

const AnalysisSection = ({ title, children }) => (
  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{title}</h4>
    {children}
  </div>
);

export default AiResumeAnalyzer;