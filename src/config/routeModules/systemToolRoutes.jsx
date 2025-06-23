import { lazy } from 'react';

const SystemTools = lazy(() => import('@/pages/SystemTools'));
const WhatIsMyIp = lazy(() => import('@/pages/WhatIsMyIp')); // Ensure this path is correct
const ScreenResolutionChecker = lazy(() => import('@/pages/ScreenResolutionChecker'));
const BatteryStatusChecker = lazy(() => import('@/pages/BatteryStatusChecker'));
const BrowserInfoViewer = lazy(() => import('@/pages/BrowserInfoViewer'));
const DeviceOrientationTester = lazy(() => import('@/pages/DeviceOrientationTester'));
const KeyboardTester = lazy(() => import('@/pages/KeyboardTester'));
const MousePositionTracker = lazy(() => import('@/pages/MousePositionTracker'));
const InternetSpeedSimulator = lazy(() => import('@/pages/InternetSpeedSimulator'));
const PingGenerator = lazy(() => import('@/pages/PingGenerator'));
const OnlineOfflineStatusChecker = lazy(() => import('@/pages/OnlineOfflineStatusChecker'));


export const systemToolRoutes = [
  { 
    path: '/system-tools', 
    component: SystemTools, 
    isToolPage: false, 
    title: "System Utilities",
    description: "Explore client-side system tools for IP checks, screen resolution, battery status, and more." 
  },
  { 
    path: '/what-is-my-ip', 
    component: WhatIsMyIp, 
    isToolPage: true, 
    title: "What Is My IP Address?",
    description: "Quickly find your public IP address. Secure and client-side processing."
  },
  { 
    path: '/screen-resolution-checker', 
    component: ScreenResolutionChecker, 
    isToolPage: true, 
    title: "Screen Resolution Checker",
    description: "Check your current screen resolution and display information."
  },
  { 
    path: '/battery-status-checker', 
    component: BatteryStatusChecker, 
    isToolPage: true, 
    title: "Battery Status Checker",
    description: "View your device's battery status, level, and charging information."
  },
  { 
    path: '/browser-info-viewer', 
    component: BrowserInfoViewer, 
    isToolPage: true, 
    title: "Browser Information Viewer",
    description: "See detailed information about your web browser and user agent."
  },
  { 
    path: '/device-orientation-tester', 
    component: DeviceOrientationTester, 
    isToolPage: true, 
    title: "Device Orientation Tester",
    description: "Test your device's orientation sensors (alpha, beta, gamma values)."
  },
  { 
    path: '/keyboard-tester', 
    component: KeyboardTester, 
    isToolPage: true, 
    title: "Keyboard Tester",
    description: "Test your keyboard keys to ensure they are working correctly."
  },
  { 
    path: '/mouse-position-tracker', 
    component: MousePositionTracker, 
    isToolPage: true, 
    title: "Mouse Position Tracker",
    description: "Track and display your mouse cursor's X and Y coordinates in real-time."
  },
  { 
    path: '/internet-speed-simulator', 
    component: InternetSpeedSimulator, 
    isToolPage: true, 
    title: "Internet Speed Simulator (Visual)",
    description: "A visual simulation of internet speed. Does not measure actual speed."
  },
  { 
    path: '/ping-generator', 
    component: PingGenerator, 
    isToolPage: true, 
    title: "Ping Generator (Visual)",
    description: "A visual simulation of network ping. Does not send actual ICMP packets."
  },
  { 
    path: '/online-offline-status-checker', 
    component: OnlineOfflineStatusChecker, 
    isToolPage: true, 
    title: "Online/Offline Status Checker",
    description: "Check your browser's current online or offline connection status."
  },
];