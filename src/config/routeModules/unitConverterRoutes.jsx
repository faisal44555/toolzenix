import { lazy } from 'react';

const UnitConverters = lazy(() => import('@/pages/UnitConverters'));
const LengthConverter = lazy(() => import('@/pages/LengthConverter'));
const WeightConverter = lazy(() => import('@/pages/WeightConverter'));
const TemperatureConverter = lazy(() => import('@/pages/TemperatureConverter'));
const SpeedConverter = lazy(() => import('@/pages/SpeedConverter'));
const AreaConverter = lazy(() => import('@/pages/AreaConverter'));
const VolumeConverter = lazy(() => import('@/pages/VolumeConverter'));
const TimeConverter = lazy(() => import('@/pages/TimeConverter'));
const PressureConverter = lazy(() => import('@/pages/PressureConverter'));
const EnergyConverter = lazy(() => import('@/pages/EnergyConverter'));
const DataConverter = lazy(() => import('@/pages/DataConverter'));

export const unitConverterRoutes = [
  { path: '/unit-converters', component: UnitConverters, isToolPage: false, title: "Unit Converters" },
  { path: '/length-converter', component: LengthConverter, isToolPage: true, title: "Length Converter" },
  { path: '/weight-converter', component: WeightConverter, isToolPage: true, title: "Weight Converter" },
  { path: '/temperature-converter', component: TemperatureConverter, isToolPage: true, title: "Temperature Converter" },
  { path: '/speed-converter', component: SpeedConverter, isToolPage: true, title: "Speed Converter" },
  { path: '/area-converter', component: AreaConverter, isToolPage: true, title: "Area Converter" },
  { path: '/volume-converter', component: VolumeConverter, isToolPage: true, title: "Volume Converter" },
  { path: '/time-converter', component: TimeConverter, isToolPage: true, title: "Time Converter" },
  { path: '/pressure-converter', component: PressureConverter, isToolPage: true, title: "Pressure Converter" },
  { path: '/energy-converter', component: EnergyConverter, isToolPage: true, title: "Energy Converter" },
  { path: '/data-converter', component: DataConverter, isToolPage: true, title: "Data Storage Converter" },
];