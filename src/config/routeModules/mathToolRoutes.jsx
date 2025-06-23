import { lazy } from 'react';

const MathTools = lazy(() => import('@/pages/MathTools'));
const PercentageCalculator = lazy(() => import('@/pages/PercentageCalculator'));
const ScientificCalculator = lazy(() => import('@/pages/ScientificCalculator'));
const AverageCalculator = lazy(() => import('@/pages/AverageCalculator'));
const AgeCalculator = lazy(() => import('@/pages/AgeCalculator'));
const SimpleInterestCalculator = lazy(() => import('@/pages/SimpleInterestCalculator'));
const CompoundInterestCalculator = lazy(() => import('@/pages/CompoundInterestCalculator'));
const BmiCalculator = lazy(() => import('@/pages/BmiCalculator'));
const FractionToDecimal = lazy(() => import('@/pages/FractionToDecimal'));
const NumberToWords = lazy(() => import('@/pages/NumberToWords'));
const LcmHcfCalculator = lazy(() => import('@/pages/LcmHcfCalculator'));
const FactorialCalculator = lazy(() => import('@/pages/FactorialCalculator'));

export const mathToolRoutes = [
  { path: '/math-tools', component: MathTools, isToolPage: false, title: "Math Tools" },
  { path: '/percentage-calculator', component: PercentageCalculator, isToolPage: true, title: "Percentage Calculator" },
  { path: '/scientific-calculator', component: ScientificCalculator, isToolPage: true, title: "Scientific Calculator" },
  { path: '/average-calculator', component: AverageCalculator, isToolPage: true, title: "Average Calculator" },
  { path: '/age-calculator', component: AgeCalculator, isToolPage: true, title: "Age Calculator (Math)" },
  { path: '/simple-interest-calculator', component: SimpleInterestCalculator, isToolPage: true, title: "Simple Interest Calculator" },
  { path: '/compound-interest-calculator', component: CompoundInterestCalculator, isToolPage: true, title: "Compound Interest Calculator" },
  { path: '/bmi-calculator', component: BmiCalculator, isToolPage: true, title: "BMI Calculator (Math)" },
  { path: '/fraction-to-decimal', component: FractionToDecimal, isToolPage: true, title: "Fraction to Decimal Converter" },
  { path: '/number-to-words', component: NumberToWords, isToolPage: true, title: "Number to Words Converter" },
  { path: '/lcm-hcf-calculator', component: LcmHcfCalculator, isToolPage: true, title: "LCM & HCF Calculator" },
  { path: '/factorial-calculator', component: FactorialCalculator, isToolPage: true, title: "Factorial Calculator" },
];