import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Gift, CalendarDays, PartyPopper, AlertTriangle } from 'lucide-react';

const BirthdayCountdown = () => {
  const [birthDate, setBirthDate] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [nextBirthdayDate, setNextBirthdayDate] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    let timer;
    if (birthDate) {
      const calculateCountdown = () => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);

        if (isNaN(birthDateObj.getTime())) {
          setCountdown(null);
          setNextBirthdayDate(null);
          return;
        }

        let nextBirthdayYear = today.getFullYear();
        let nextBday = new Date(nextBirthdayYear, birthDateObj.getMonth(), birthDateObj.getDate());

        if (nextBday < today) {
          nextBirthdayYear++;
          nextBday.setFullYear(nextBirthdayYear);
        }
        setNextBirthdayDate(nextBday);

        const diff = nextBday.getTime() - today.getTime();

        if (diff <= 0) { // It's today!
          setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      };

      calculateCountdown();
      timer = setInterval(calculateCountdown, 1000);
    } else {
      setCountdown(null);
      setNextBirthdayDate(null);
    }

    return () => clearInterval(timer);
  }, [birthDate]);

  const handleDateChange = (e) => {
    setBirthDate(e.target.value);
  };

  const handleSubmit = () => {
    if (!birthDate) {
      toast({
        title: 'No Date Selected',
        description: 'Please select your birth date.',
        variant: 'destructive',
        action: <AlertTriangle className="text-red-500" />,
      });
      return;
    }
    // Trigger re-calculation by effect
    toast({
      title: 'Birthday Set!',
      description: `Counting down to your next birthday.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Birthday Countdown | Toolzenix</title>
        <meta name="description" content="Count down the days, hours, minutes, and seconds to your next birthday. Enter your birth date and see how long until your special day!" />
        <link rel="canonical" href="https://toolzenix.com/birthday-countdown" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <PartyPopper className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Birthday Countdown
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            How long until your next birthday? Let's find out!
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="space-y-6">
            <div>
              <Label htmlFor="birthdate-input" className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center">
                <CalendarDays className="w-5 h-5 mr-2 text-pink-500" /> Your Birth Date
              </Label>
              <Input
                id="birthdate-input"
                type="date"
                value={birthDate}
                onChange={handleDateChange}
                className="mt-2 text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-pink-500 focus:border-pink-500"
                max={new Date().toISOString().split("T")[0]} 
              />
            </div>
            <Button onClick={handleSubmit} className="w-full bg-pink-500 hover:bg-pink-600 text-white">
              <Gift className="w-5 h-5 mr-2" /> Start Countdown
            </Button>
          </div>

          {countdown && nextBirthdayDate && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <p className="text-center text-md text-gray-600 dark:text-gray-300 mb-4">
                Your next birthday is on: <strong className="text-pink-500">{nextBirthdayDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
              </p>
              {countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0 ? (
                <div className="text-center py-6">
                  <PartyPopper className="w-20 h-20 text-yellow-400 mx-auto mb-4 animate-bounce" />
                  <p className="text-3xl font-bold text-yellow-500 dark:text-yellow-300">Happy Birthday!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="bg-pink-50 dark:bg-pink-900/30 p-4 rounded-lg shadow">
                    <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">{String(countdown.days).padStart(2, '0')}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Days</div>
                  </div>
                  <div className="bg-pink-50 dark:bg-pink-900/30 p-4 rounded-lg shadow">
                    <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">{String(countdown.hours).padStart(2, '0')}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Hours</div>
                  </div>
                  <div className="bg-pink-50 dark:bg-pink-900/30 p-4 rounded-lg shadow">
                    <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">{String(countdown.minutes).padStart(2, '0')}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
                  </div>
                  <div className="bg-pink-50 dark:bg-pink-900/30 p-4 rounded-lg shadow">
                    <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">{String(countdown.seconds).padStart(2, '0')}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Seconds</div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
           {!birthDate && (
             <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                Enter your birth date to see the countdown to your next celebration!
            </p>
           )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-lg mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Never Miss a Birthday!</h2>
          <p>
            Use this tool to count down to your special day. Enter your date of birth, and we'll show you exactly how many days, hours, minutes, and seconds are left until your next birthday.
          </p>
          <h3 className="text-xl font-semibold">How It Works:</h3>
          <ol>
            <li>Select your birth date using the date picker.</li>
            <li>Click "Start Countdown".</li>
            <li>Watch the timer count down to your next birthday celebration!</li>
          </ol>
          <p>
            It's a fun way to anticipate your birthday and share the excitement with friends and family.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default BirthdayCountdown;