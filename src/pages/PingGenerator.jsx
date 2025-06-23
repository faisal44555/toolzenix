import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Activity, Server, Timer, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const PingGenerator = () => {
  const { toast } = useToast();
  const [targetHost, setTargetHost] = useState('toolzenix.com');
  const [pingResults, setPingResults] = useState([]);
  const [isPinging, setIsPinging] = useState(false);
  const [simulatedPingsSent, setSimulatedPingsSent] = useState(0);

  const simulatePing = () => {
    if (!targetHost) {
      toast({
        variant: "destructive",
        title: "Invalid Host",
        description: "Please enter a host to simulate ping.",
      });
      return;
    }

    setIsPinging(true);
    setPingResults([]);
    setSimulatedPingsSent(0);

    let pings = 0;
    const interval = setInterval(() => {
      if (pings >= 4) {
        clearInterval(interval);
        setIsPinging(false);
        toast({
          title: "Ping Simulation Complete",
          description: `Finished simulating pings to ${targetHost}. This is a visual demonstration.`,
        });
        return;
      }

      const time = Math.floor(Math.random() * 100) + 10; // Simulate 10-110ms
      const newResult = {
        id: Date.now() + Math.random(),
        host: targetHost,
        time: time,
        status: time < 100 ? 'Success' : 'High Latency',
        seq: pings + 1,
      };
      setPingResults(prev => [...prev, newResult]);
      setSimulatedPingsSent(prev => prev + 1);
      pings++;
    }, 1000);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const resultItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  return (
    <>
      <Helmet>
        <title>Ping Generator (Simulator) - Toolzenix</title>
        <meta name="description" content="Simulate network pings to a host. Visual demonstration only, does not send actual ICMP packets." />
        <link rel="canonical" href="https://toolzenix.com/ping-generator" />
      </Helmet>

      <motion.div
        className="max-w-lg mx-auto p-4"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="w-full bg-gradient-to-bl from-teal-500 via-cyan-500 to-sky-500 dark:from-teal-700 dark:via-cyan-700 dark:to-sky-700 shadow-xl">
          <CardHeader className="text-center text-white">
            <motion.div 
              className="mx-auto mb-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 130, delay: 0.1 }}
            >
              <Activity className="w-8 h-8" />
            </motion.div>
            <CardTitle className="text-3xl font-bold">Ping Simulator</CardTitle>
            <CardDescription className="text-teal-100 dark:text-teal-200">
              Visually simulate sending pings to a host.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 bg-white dark:bg-slate-800/80 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Input
                type="text"
                placeholder="e.g., toolzenix.com or 8.8.8.8"
                value={targetHost}
                onChange={(e) => setTargetHost(e.target.value)}
                className="flex-grow dark:bg-slate-700 dark:text-white dark:border-slate-600"
                aria-label="Target Host"
              />
              <Button onClick={simulatePing} disabled={isPinging} className="bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white">
                {isPinging ? 'Simulating...' : 'Simulate Ping'} <Server className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {isPinging && (
              <p className="text-sm text-center text-slate-600 dark:text-slate-300 mb-4">
                Simulating ping {simulatedPingsSent > 0 ? `${simulatedPingsSent}/4` : ''} to <strong>{targetHost}</strong>...
              </p>
            )}

            {pingResults.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Simulation Results:</h3>
                <ul className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-md shadow-inner max-h-60 overflow-y-auto">
                  {pingResults.map((result, index) => (
                    <motion.li
                      key={result.id}
                      custom={index}
                      variants={resultItemVariants}
                      initial="hidden"
                      animate="visible"
                      className={`p-2.5 border-b border-slate-200 dark:border-slate-700 last:border-b-0 text-sm flex justify-between items-center ${result.status === 'High Latency' ? 'text-orange-600 dark:text-orange-400' : 'text-slate-700 dark:text-slate-200'}`}
                    >
                      <span>
                        Reply from {result.host}: seq={result.seq}
                      </span>
                      <span className="font-medium">
                        time={result.time}ms
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
            
            <motion.div 
              className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-600 rounded-lg text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AlertTriangle className="w-5 h-5 mx-auto mb-1 text-yellow-600 dark:text-yellow-400" />
              <p className="text-xs text-yellow-700 dark:text-yellow-300">
                <strong>Disclaimer:</strong> This tool is a visual simulation. It does <strong className="text-red-500">not</strong> send actual network packets or measure real ping times. For educational and demonstrative purposes only.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default PingGenerator;