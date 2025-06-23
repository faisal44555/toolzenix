import React, { lazy } from 'react';

const AnalyticsDashboard = lazy(() => import('@/pages/AnalyticsDashboard'));

export const dashboardRoutes = [
  {
    path: '/analytics',
    component: AnalyticsDashboard,
    title: 'Analytics Dashboard - Toolzenix',
    description: 'Analytics dashboard for Toolzenix.com website traffic and usage.',
    isToolPage: false,
  }
];