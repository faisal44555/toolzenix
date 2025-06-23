import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertTriangle, Shield, KeyRound, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState({ score: 0, label: 'Too short', color: 'bg-gray-300 dark:bg-gray-600' });
  const [feedback, setFeedback] = useState([]);
  const { toast } = useToast();

  const checkPasswordStrength = (pass) => {
    let score = 0;
    let newFeedback = [];

    if (!pass || pass.length < 1) {
      setStrength({ score: 0, label: 'Too short', color: 'bg-gray-300 dark:bg-gray-600' });
      setFeedback([]);
      return;
    }
    
    if (pass.length < 8) {
      newFeedback.push({ text: "Password should be at least 8 characters long.", type: "error" });
    } else {
      score += 25;
      newFeedback.push({ text: "At least 8 characters long.", type: "success" });
    }

    if (/[A-Z]/.test(pass)) {
      score += 20;
      newFeedback.push({ text: "Contains uppercase letters.", type: "success" });
    } else {
      newFeedback.push({ text: "Missing uppercase letters (A-Z).", type: "error" });
    }

    if (/[a-z]/.test(pass)) {
      score += 20;
      newFeedback.push({ text: "Contains lowercase letters.", type: "success" });
    } else {
      newFeedback.push({ text: "Missing lowercase letters (a-z).", type: "error" });
    }

    if (/[0-9]/.test(pass)) {
      score += 20;
      newFeedback.push({ text: "Contains numbers (0-9).", type: "success" });
    } else {
      newFeedback.push({ text: "Missing numbers (0-9).", type: "error" });
    }

    if (/[^A-Za-z0-9]/.test(pass)) {
      score += 15;
      newFeedback.push({ text: "Contains special characters (!@#...).", type: "success" });
    } else {
      newFeedback.push({ text: "Missing special characters (!@#...).", type: "warning" });
    }
    
    // Bonus for length
    if (pass.length >= 12) score +=10;
    if (pass.length >= 16) score +=10;


    score = Math.min(100, score); // Cap score at 100

    let label = '';
    let color = '';

    if (score < 30) {
      label = 'Very Weak';
      color = 'bg-red-500 dark:bg-red-600';
    } else if (score < 50) {
      label = 'Weak';
      color = 'bg-orange-500 dark:bg-orange-600';
    } else if (score < 75) {
      label = 'Medium';
      color = 'bg-yellow-500 dark:bg-yellow-600';
    } else if (score < 90) {
      label = 'Strong';
      color = 'bg-lime-500 dark:bg-lime-600';
    } else {
      label = 'Very Strong';
      color = 'bg-green-500 dark:bg-green-600';
    }
    
    if (pass.length > 0 && pass.length < 4) {
        label = 'Too short';
        color = 'bg-gray-400 dark:bg-gray-500';
        score = Math.max(5, score); // Give a tiny bit for very short ones
    }


    setStrength({ score, label, color });
    setFeedback(newFeedback);
  };

  useEffect(() => {
    checkPasswordStrength(password);
  }, [password]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Password Strength Checker | Toolzenix</title>
        <meta name="description" content="Check the strength of your password and get tips to improve its security. Instant feedback on uppercase, lowercase, numbers, and special characters." />
        <link rel="canonical" href="https://toolzenix.com/password-strength-checker" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Password Strength Checker
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Assess how strong your password is and get tips for improvement.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <div className="space-y-6">
            <div>
              <Label htmlFor="password-input" className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center">
                <KeyRound className="w-5 h-5 mr-2 text-blue-500" /> Enter Password
              </Label>
              <Input
                id="password-input"
                type="text" 
                value={password}
                onChange={handlePasswordChange}
                placeholder="Type your password here..."
                className="mt-2 text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                autoComplete="new-password"
              />
            </div>

            {password.length > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Strength:</Label>
                    <span className={`text-sm font-semibold px-2 py-0.5 rounded-full text-white ${strength.color}`}>
                      {strength.label}
                    </span>
                  </div>
                  <Progress value={strength.score} className="h-3" indicatorClassName={strength.color} />
                </div>

                <div className="mt-6 space-y-2">
                  <h3 className="text-md font-semibold text-gray-700 dark:text-gray-200">Feedback:</h3>
                  {feedback.map((item, index) => (
                    <div key={index} className={`flex items-center text-sm ${
                      item.type === 'success' ? 'text-green-600 dark:text-green-400' : 
                      item.type === 'error' ? 'text-red-600 dark:text-red-400' : 
                      'text-yellow-600 dark:text-yellow-400'
                    }`}>
                      {item.type === 'success' && <CheckCircle className="w-4 h-4 mr-2 shrink-0" />}
                      {item.type === 'error' && <XCircle className="w-4 h-4 mr-2 shrink-0" />}
                      {item.type === 'warning' && <AlertTriangle className="w-4 h-4 mr-2 shrink-0" />}
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10 max-w-xl mx-auto bg-blue-50 dark:bg-gray-700/50 p-6 rounded-lg shadow"
        >
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 flex items-center mb-3">
                <Info className="w-5 h-5 mr-2"/> Password Security Tips
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-blue-700 dark:text-blue-200">
                <li>Use a mix of uppercase letters, lowercase letters, numbers, and symbols.</li>
                <li>Aim for a password length of at least 12 characters, preferably 16 or more.</li>
                <li>Avoid common words, phrases, or easily guessable information like birthdays.</li>
                <li>Don't reuse passwords across different accounts.</li>
                <li>Consider using a password manager to generate and store unique, complex passwords.</li>
            </ul>
        </motion.div>

        <div className="mt-12 prose dark:prose-invert max-w-xl mx-auto text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold">How Password Strength is Assessed</h2>
          <p>
            This tool evaluates password strength based on several criteria:
          </p>
          <ul>
            <li><strong>Length:</strong> Longer passwords are generally more secure.</li>
            <li><strong>Character Variety:</strong> Use of uppercase letters, lowercase letters, numbers, and special symbols increases complexity.</li>
          </ul>
          <p>
            The feedback provided helps you understand which areas of your password can be improved. Remember, this is a client-side estimation. For critical accounts, always follow best practices for password security.
          </p>
        </div>
      </div>
    </>
  );
};

export default PasswordStrengthChecker;