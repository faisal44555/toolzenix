import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Dna, Copy, Trash2, CheckCircle2, Percent, Shuffle, Replace } from 'lucide-react';

const DnaSequenceAnalyzer = () => {
  const [dnaSequence, setDnaSequence] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const { toast } = useToast();

  const isValidDna = (seq) => /^[ATGCatgc]*$/.test(seq);

  const analyzeSequence = () => {
    const sequence = dnaSequence.toUpperCase();
    if (!sequence.trim()) {
      toast({ title: 'Input Empty', description: 'Please enter a DNA sequence.', variant: 'destructive' });
      setAnalysisResult(null);
      return;
    }
    if (!isValidDna(sequence)) {
      toast({ title: 'Invalid Sequence', description: 'DNA sequence can only contain A, T, G, C.', variant: 'destructive' });
      setAnalysisResult(null);
      return;
    }

    const length = sequence.length;
    const gcCount = (sequence.match(/[GC]/g) || []).length;
    const gcContent = length > 0 ? ((gcCount / length) * 100).toFixed(2) : 0;
    
    const counts = { A: 0, T: 0, G: 0, C: 0 };
    for (const base of sequence) {
      counts[base]++;
    }

    setAnalysisResult({
      length,
      gcContent,
      counts,
      rnaTranscript: '',
      reverseComplement: ''
    });
    toast({ title: 'Analysis Complete!', action: <CheckCircle2 className="text-green-500" /> });
  };

  const transcribeToRna = () => {
    if (!analysisResult) {
      analyzeSequence(); // Analyze first if not done
      if (!dnaSequence.toUpperCase().trim() || !isValidDna(dnaSequence.toUpperCase())) return;
    }
    const rna = dnaSequence.toUpperCase().replace(/T/g, 'U');
    setAnalysisResult(prev => ({ ...prev, rnaTranscript: rna }));
    toast({ title: 'Transcribed to RNA!', action: <CheckCircle2 className="text-green-500" /> });
  };

  const getReverseComplement = () => {
     if (!analysisResult) {
      analyzeSequence(); // Analyze first if not done
       if (!dnaSequence.toUpperCase().trim() || !isValidDna(dnaSequence.toUpperCase())) return;
    }
    const complementMap = { 'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G' };
    const complement = dnaSequence.toUpperCase().split('').map(base => complementMap[base]).join('');
    const reverseComplement = complement.split('').reverse().join('');
    setAnalysisResult(prev => ({ ...prev, reverseComplement }));
    toast({ title: 'Reverse Complement Generated!', action: <CheckCircle2 className="text-green-500" /> });
  };

  const handleCopyToClipboard = (textToCopy, type) => {
    if (!textToCopy) {
      toast({ title: 'Nothing to Copy', description: `No ${type} available.`, variant: 'destructive' });
      return;
    }
    navigator.clipboard.writeText(textToCopy)
      .then(() => toast({ title: 'Copied!', description: `${type} copied to clipboard.` }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  const handleClear = () => {
    setDnaSequence('');
    setAnalysisResult(null);
    toast({ title: 'Cleared!', description: 'Input and results cleared.' });
  };

  return (
    <>
      <Helmet>
        <title>DNA Sequence Analyzer | Toolzenix</title>
        <meta name="description" content="Analyze DNA sequences: calculate GC content, transcribe to RNA, and find the reverse complement. Enter A, T, G, C sequences." />
        <link rel="canonical" href="https://toolzenix.com/dna-sequence-analyzer" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Dna className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            DNA Sequence Analyzer
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Analyze DNA sequences for GC content, transcription, and reverse complement.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="mb-6">
            <Label htmlFor="dna-sequence-input" className="text-lg font-medium text-gray-700 dark:text-gray-300">Enter DNA Sequence (A, T, G, C)</Label>
            <Textarea
              id="dna-sequence-input"
              value={dnaSequence}
              onChange={(e) => setDnaSequence(e.target.value)}
              placeholder="e.g., ATGCGTAGCATCGATCG"
              className="mt-2 min-h-[120px] text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 font-mono tracking-wider"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Button onClick={analyzeSequence} className="bg-purple-600 hover:bg-purple-700 text-white">
              <Percent className="w-4 h-4 mr-2" /> Analyze GC & Length
            </Button>
            <Button onClick={transcribeToRna} variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white dark:hover:bg-purple-600">
              <Replace className="w-4 h-4 mr-2" /> Transcribe to RNA
            </Button>
            <Button onClick={getReverseComplement} variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white dark:hover:bg-purple-600">
              <Shuffle className="w-4 h-4 mr-2" /> Reverse Complement
            </Button>
          </div>
          
          <Button onClick={handleClear} variant="ghost" className="w-full text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
            <Trash2 className="w-4 h-4 mr-2" /> Clear Input & Results
          </Button>

          {analysisResult && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4"
            >
              <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">Analysis Results</h2>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p><strong>Length:</strong> {analysisResult.length} bp</p>
                <p><strong>GC Content:</strong> {analysisResult.gcContent}%</p>
                <p><strong>Base Counts:</strong> 
                    A: {analysisResult.counts.A}, 
                    T: {analysisResult.counts.T}, 
                    G: {analysisResult.counts.G}, 
                    C: {analysisResult.counts.C}
                </p>
              </div>

              {analysisResult.rnaTranscript && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <Label className="text-md font-medium">RNA Transcript:</Label>
                  <Textarea value={analysisResult.rnaTranscript} readOnly className="mt-1 font-mono tracking-wider text-sm min-h-[80px] dark:bg-gray-600 dark:text-gray-200"/>
                  <Button size="sm" variant="outline" onClick={() => handleCopyToClipboard(analysisResult.rnaTranscript, 'RNA Transcript')} className="mt-2">
                    <Copy className="w-3 h-3 mr-1.5" /> Copy RNA
                  </Button>
                </div>
              )}

              {analysisResult.reverseComplement && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <Label className="text-md font-medium">5'-3' Reverse Complement:</Label>
                  <Textarea value={analysisResult.reverseComplement} readOnly className="mt-1 font-mono tracking-wider text-sm min-h-[80px] dark:bg-gray-600 dark:text-gray-200"/>
                  <Button size="sm" variant="outline" onClick={() => handleCopyToClipboard(analysisResult.reverseComplement, 'Reverse Complement')} className="mt-2">
                    <Copy className="w-3 h-3 mr-1.5" /> Copy Rev. Comp.
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Understanding DNA Sequences</h2>
          <p>
            This tool allows for basic analysis of DNA sequences. Input your sequence (composed of A, T, G, C characters) to:
          </p>
          <ul>
            <li><strong>Analyze GC & Length:</strong> Calculate the total length of the sequence and the percentage of Guanine (G) and Cytosine (C) bases (GC content). Also shows counts of each base.</li>
            <li><strong>Transcribe to RNA:</strong> Convert the DNA sequence into its corresponding RNA sequence by replacing Thymine (T) with Uracil (U).</li>
            <li><strong>Reverse Complement:</strong> Generate the reverse complement of the DNA sequence. This is important for finding binding sites, primer design, and understanding gene orientation.</li>
          </ul>
          <p>All calculations are performed client-side in your browser.</p>
        </motion.div>
      </div>
    </>
  );
};

export default DnaSequenceAnalyzer;