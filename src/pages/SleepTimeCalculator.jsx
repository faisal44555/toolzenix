import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { BedDouble, Sunrise, Clock, AlertCircle } from 'lucide-react';

const SleepTimeCalculator = () => {
  const [calculationMode, setCalculationMode] = useState('wakeUp'); // 'wakeUp' or 'goToBed'
  const [targetTime, setTargetTime] = useState('07:00');
  const [sleepCycleResults, setSleepCycleResults] = useState([]);
  const { toast } = useToast();

  const AVERAGE_TIME_TO_FALL_ASLEEP = 15; // minutes
  const SLEEP_CYCLE_DURATION = 90; // minutes

  const calculateSleepTimes = () => {
    if (!targetTime) {
      toast({ title: 'Missing Time', description: 'Please enter your target time.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }

    const [hours, minutes] = targetTime.split(':').map(Number);
    const targetDate = new Date();
    targetDate.setHours(hours, minutes, 0, 0);

    let results = [];

    if (calculationMode === 'wakeUp') {
      // Calculate bedtimes if I want to wake up at targetTime
      // Subtract 15 mins to fall asleep, then subtract sleep cycles
      let bedtime = new Date(targetDate.getTime() - AVERAGE_TIME_TO_FALL_ASLEEP * 60000);
      for (let i = 6; i >= 3; i--) { // Aim for 4-6 sleep cycles (6 to 9 hours)
        let currentBedtime = new Date(bedtime.getTime() - (i * SLEEP_CYCLE_DURATION * 60000));
        results.push({
          time: currentBedtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cycles: i,
          duration: `${Math.floor((i * SLEEP_CYCLE_DURATION) / 60)}h ${ (i * SLEEP_CYCLE_DURATION) % 60}m`
        });
      }
    } else { // calculationMode === 'goToBed'
      // Calculate wake up times if I go to bed at targetTime
      // Add 15 mins to fall asleep, then add sleep cycles
      let wakeUpTimeBase = new Date(targetDate.getTime() + AVERAGE_TIME_TO_FALL_ASLEEP * 60000);
      for (let i = 3; i <= 6; i++) { // Aim for 4-6 sleep cycles
        let currentWakeUpTime = new Date(wakeUpTimeBase.getTime() + (i * SLEEP_CYCLE_DURATION * 60000));
        results.push({
          time: currentWakeUpTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cycles: i,
          duration: `${Math.floor((i * SLEEP_CYCLE_DURATION) / 60)}h ${ (i * SLEEP_CYCLE_DURATION) % 60}m`
        });
      }
    }
    setSleepCycleResults(results);
    toast({ title: 'Sleep Times Calculated!', description: `Here are some optimal times based on sleep cycles.` });
  };

  return (
    <>
      <Helmet>
        <title>Sleep Cycle Calculator - Best Bedtime & Wake Up Time | Toolzenix</title>
        <meta name="description" content="Calculate the best time to go to bed or wake up based on natural sleep cycles. Optimize your sleep for better rest and energy." />
        <link rel="canonical" href="https://toolzenix.com/sleep-time-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <BedDouble className="w-16 h-16 text-indigo-500 dark:text-indigo-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">Sleep Cycle Calculator</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Find the best times to sleep and wake up based on natural sleep cycles.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 space-y-6"
        >
          <div>
            <Label className="text-gray-700 dark:text-gray-300 mb-2 block">I want to:</Label>
            <RadioGroup defaultValue="wakeUp" onValueChange={setCalculationMode} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="wakeUp" id="r-wakeUp" className="text-indigo-600 border-indigo-300 dark:text-indigo-400 dark:border-indigo-500"/>
                <Label htmlFor="r-wakeUp" className="text-gray-700 dark:text-gray-300">Calculate Bedtime</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="goToBed" id="r-goToBed" className="text-indigo-600 border-indigo-300 dark:text-indigo-400 dark:border-indigo-500"/>
                <Label htmlFor="r-goToBed" className="text-gray-700 dark:text-gray-300">Calculate Wake Up Time</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="target-time" className="text-gray-700 dark:text-gray-300">
              {calculationMode === 'wakeUp' ? 'Desired Wake Up Time:' : 'Planned Bedtime:'}
            </Label>
            <Input id="target-time" type="time" value={targetTime} onChange={e => setTargetTime(e.target.value)} className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>

          <Button onClick={calculateSleepTimes} className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-3 text-lg font-semibold">
            <Clock className="mr-2 h-5 w-5" /> Calculate Optimal Times
          </Button>

          {sleepCycleResults.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-white">
                {calculationMode === 'wakeUp' ? 'Optimal Bedtimes:' : 'Optimal Wake Up Times:'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {sleepCycleResults.map((result, index) => (
                  <div key={index} className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{result.time}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{result.cycles} cycles ({result.duration})</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center mt-4 text-gray-500 dark:text-gray-400">
                Assumes it takes about {AVERAGE_TIME_TO_FALL_ASLEEP} minutes to fall asleep. Each sleep cycle is ~{SLEEP_CYCLE_DURATION} minutes.
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Understanding Sleep Cycles</h2>
          <p>
            Our sleep is structured in cycles, typically lasting about 90 minutes each. Waking up at the end of a sleep cycle, rather than in the middle of one, can help you feel more refreshed and less groggy.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Choose whether you want to calculate your ideal bedtime or wake-up time.</li>
            <li>Enter your desired wake-up time or planned bedtime.</li>
            <li>The calculator will suggest several optimal times based on 4 to 6 full sleep cycles.</li>
            <li>It accounts for an average of 15 minutes to fall asleep.</li>
          </ul>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center"><AlertCircle size={16} className="mr-2"/> Individual sleep needs and the time it takes to fall asleep can vary. Use these suggestions as a guideline and adjust based on your personal experience.</p>
        </motion.div>
      </div>
    </>
  );
};

export default SleepTimeCalculator;