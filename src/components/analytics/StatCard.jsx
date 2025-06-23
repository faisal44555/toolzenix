import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const StatCard = ({ title, value, change, icon, changeType }) => {
  const IconComponent = icon;
  const isPositive = changeType === 'positive' || parseFloat(change) >= 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };
  
  return (
    <motion.div variants={cardVariants}>
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-slate-800/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {IconComponent && <IconComponent className="h-5 w-5 text-muted-foreground" />}
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{value}</div>
          {change && (
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className={cn(
                "flex items-center gap-1 font-semibold",
                isPositive ? 'text-green-500' : 'text-red-500'
              )}>
                {isPositive ? 
                  <ArrowUpRight className="h-4 w-4" /> : 
                  <ArrowDownRight className="h-4 w-4" />}
                {change}
              </span>
              <span className="ml-2">from last month</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;