import { lazy } from 'react';

const CalendarTimeTools = lazy(() => import('@/pages/CalendarTimeTools'));
const StopwatchTool = lazy(() => import('@/pages/StopwatchTool'));
const DateTimeCountdownTimer = lazy(() => import('@/pages/DateTimeCountdownTimer'));
const CalendarGeneratorTool = lazy(() => import('@/pages/CalendarGeneratorTool'));
const WorldClockTool = lazy(() => import('@/pages/WorldClockTool'));
const DateCalculatorTool = lazy(() => import('@/pages/DateCalculatorTool'));
const TimeZoneConverterTool = lazy(() => import('@/pages/TimeZoneConverterTool'));
const DateTimeAgeCalculator = lazy(() => import('@/pages/DateTimeAgeCalculator'));
const LocalReminderTool = lazy(() => import('@/pages/LocalReminderTool'));

export const calendarTimeToolRoutes = [
  { path: '/calendar-time-tools', component: CalendarTimeTools, isToolPage: false, title: "Calendar & Time Tools" },
  { path: '/stopwatch', component: StopwatchTool, isToolPage: true, title: "Stopwatch" },
  { path: '/date-time-countdown-timer', component: DateTimeCountdownTimer, isToolPage: true, title: "Countdown Timer (Date/Time)" },
  { path: '/calendar-generator', component: CalendarGeneratorTool, isToolPage: true, title: "Calendar Generator" },
  { path: '/world-clock', component: WorldClockTool, isToolPage: true, title: "World Clock" },
  { path: '/date-calculator', component: DateCalculatorTool, isToolPage: true, title: "Date Calculator" },
  { path: '/time-zone-converter', component: TimeZoneConverterTool, isToolPage: true, title: "Time Zone Converter" },
  { path: '/datetime-age-calculator', component: DateTimeAgeCalculator, isToolPage: true, title: "Age Calculator (Date/Time)" },
  { path: '/local-reminder-tool', component: LocalReminderTool, isToolPage: true, title: "Local Reminder Tool" },
];