import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Users, BarChart2, MousePointerClick, Clock, Globe, Smartphone, Laptop, Tablet, ArrowRight, TrendingUp, Download, Eye } from 'lucide-react';
import StatCard from '@/components/analytics/StatCard';
import DeviceDonutChart from '@/components/analytics/DeviceDonutChart';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const TrafficSourceChart = ({ data }) => {
  const maxSourceValue = Math.max(...data.map(d => d.value));

  return (
    <div className="space-y-4 pt-2">
      {data.map((source, index) => (
        <div key={source.name} className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground w-20 text-right">{source.name}</span>
          <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
            <motion.div
              className={source.color}
              initial={{ width: 0 }}
              animate={{ width: `${(source.value / maxSourceValue) * 100}%` }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
              style={{ height: '100%' }}
            />
          </div>
          <span className="text-sm font-semibold text-foreground w-12 text-left">{source.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

const TopContentTable = ({ title, data, icon }) => {
  const Icon = icon;
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-slate-800/50">
      <CardHeader>
        <CardTitle className="flex items-center text-lg"><Icon className="mr-2 h-5 w-5" /> {title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex justify-between items-center text-sm"
            >
              <span className="truncate text-muted-foreground pr-4">{item.name}</span>
              <span className="font-semibold text-foreground">{item.value.toLocaleString()}</span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


const AnalyticsDashboard = () => {
  const siteUrl = "https://toolzenix.com";

  const trafficSources = [
    { name: 'Direct', value: 12030, color: 'bg-blue-500' },
    { name: 'Google', value: 9840, color: 'bg-green-500' },
    { name: 'Facebook', value: 4520, color: 'bg-indigo-500' },
    { name: 'Instagram', value: 3120, color: 'bg-pink-500' },
    { name: 'Other', value: 1890, color: 'bg-gray-500' },
  ];
  
  const deviceData = [
    { label: 'Desktop', value: 65000, color: 'bg-blue-500', rawColor: '#3b82f6' },
    { label: 'Mobile', value: 28000, color: 'bg-green-500', rawColor: '#22c55e' },
    { label: 'Tablet', value: 7000, color: 'bg-yellow-500', rawColor: '#eab308' },
  ];

  const topTools = [
    { name: '/image-compressor', value: 15200 },
    { name: '/word-counter', value: 11800 },
    { name: '/pdf-to-word', value: 9500 },
    { name: '/qr-code-generator', value: 8700 },
    { name: '/json-formatter', value: 7100 },
  ];

  const topEvents = [
    { name: 'File Downloaded', value: 120540 },
    { name: 'Tool Used', value: 250123 },
    { name: 'Share Button Click', value: 5234 },
    { name: 'Contact Form Submit', value: 450 },
    { name: 'Blog Post Read', value: 75890 },
  ];

  return (
    <>
      <Helmet>
        <title>Analytics Dashboard - Toolzenix</title>
        <meta name="description" content="Live analytics and performance dashboard for Toolzenix.com." />
        <link rel="canonical" href={`${siteUrl}/analytics`} />
      </Helmet>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-green-500">Live</span>
          </div>
        </div>

        <Card className="dark:bg-slate-800/50 p-4">
          <CardContent className="p-0">
             <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 rounded-r-lg">
                <h3 className="font-bold text-yellow-800 dark:text-yellow-200">Note: Placeholder Data</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  This dashboard is currently showing mock data. To see live analytics, the Google Analytics Data API needs to be connected.
                </p>
              </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Users" value="100,000" change="+12.5%" icon={Users} changeType="positive" />
          <StatCard title="Sessions" value="125,430" change="-2.1%" icon={BarChart2} changeType="negative" />
          <StatCard title="Bounce Rate" value="40.5%" change="+5.2%" icon={MousePointerClick} changeType="negative" />
          <StatCard title="Avg. Session" value="2m 15s" change="+8.9%" icon={Clock} changeType="positive" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle className="flex items-center text-lg"><Globe className="mr-2 h-5 w-5" /> Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <TrafficSourceChart data={trafficSources} />
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle className="flex items-center text-lg"><Smartphone className="mr-2 h-5 w-5" /> Device Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <DeviceDonutChart data={deviceData} />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <TopContentTable title="Most Popular Tools" icon={TrendingUp} data={topTools} />
          <TopContentTable title="Top Events" icon={Download} data={topEvents} />
        </div>
      </motion.div>
    </>
  );
};

export default AnalyticsDashboard;