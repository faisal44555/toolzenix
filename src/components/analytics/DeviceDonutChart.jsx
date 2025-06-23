import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const DeviceDonutChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  let accumulatedPercentage = 0;
  const segments = data.map(item => {
    const percentage = (item.value / total) * 100;
    const toReturn = {
      ...item,
      percentage,
      offset: accumulatedPercentage,
    };
    accumulatedPercentage += percentage;
    return toReturn;
  });

  const conicGradient = segments.map(s => `${s.color} ${s.offset}% ${s.offset + s.percentage}%`).join(', ');

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 h-full w-full">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-40 h-40 md:w-48 md:h-48"
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: `conic-gradient(${conicGradient})` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[65%] h-[65%] bg-card rounded-full shadow-inner" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-2xl md:text-3xl font-bold text-foreground">{total.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">Total Users</span>
        </div>
      </motion.div>
      <div className="flex flex-col gap-3">
        {segments.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className="flex items-center"
          >
            <span className={cn('w-3 h-3 rounded-full mr-3', item.color.replace('bg-',''))} style={{ backgroundColor: item.rawColor }} />
            <span className="text-sm text-muted-foreground mr-2">{item.label}:</span>
            <span className="font-semibold text-foreground">{item.value.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground ml-1.5">({item.percentage.toFixed(1)}%)</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DeviceDonutChart;