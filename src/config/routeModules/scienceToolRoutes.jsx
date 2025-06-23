import { lazy } from 'react';

const ScienceTools = lazy(() => import('@/pages/ScienceTools'));
const PeriodicTableExplorer = lazy(() => import('@/pages/PeriodicTableExplorer'));
const MolarMassCalculator = lazy(() => import('@/pages/MolarMassCalculator'));
const DnaSequenceAnalyzer = lazy(() => import('@/pages/DnaSequenceAnalyzer'));
const PhCalculator = lazy(() => import('@/pages/PhCalculator'));
const PhysicsFormulaCalculator = lazy(() => import('@/pages/PhysicsFormulaCalculator'));
const PlanetWeightCalculator = lazy(() => import('@/pages/PlanetWeightCalculator'));
const AstronomicalUnitConverter = lazy(() => import('@/pages/AstronomicalUnitConverter'));
const DensityCalculator = lazy(() => import('@/pages/DensityCalculator'));
const CalorimetryCalculator = lazy(() => import('@/pages/CalorimetryCalculator'));
const BodyTemperatureConverter = lazy(() => import('@/pages/BodyTemperatureConverter'));

export const scienceToolRoutes = [
  { path: '/science-tools', component: ScienceTools, isToolPage: false, title: "Science Tools" },
  { path: '/periodic-table-explorer', component: PeriodicTableExplorer, isToolPage: true, title: "Periodic Table Explorer" },
  { path: '/molar-mass-calculator', component: MolarMassCalculator, isToolPage: true, title: "Molar Mass Calculator" },
  { path: '/dna-sequence-analyzer', component: DnaSequenceAnalyzer, isToolPage: true, title: "DNA Sequence Analyzer" },
  { path: '/ph-calculator', component: PhCalculator, isToolPage: true, title: "pH Calculator" },
  { path: '/physics-formula-calculator', component: PhysicsFormulaCalculator, isToolPage: true, title: "Physics Formula Calculator" },
  { path: '/planet-weight-calculator', component: PlanetWeightCalculator, isToolPage: true, title: "Planet Weight Calculator" },
  { path: '/astronomical-unit-converter', component: AstronomicalUnitConverter, isToolPage: true, title: "Astronomical Unit Converter" },
  { path: '/density-calculator', component: DensityCalculator, isToolPage: true, title: "Density Calculator" },
  { path: '/calorimetry-calculator', component: CalorimetryCalculator, isToolPage: true, title: "Calorimetry Calculator" },
  { path: '/body-temperature-converter', component: BodyTemperatureConverter, isToolPage: true, title: "Human Body Temperature Converter" },
];