import { lazy } from 'react';

const HealthFitnessTools = lazy(() => import('@/pages/HealthFitnessTools'));
const HealthBmiCalculator = lazy(() => import('@/pages/HealthBmiCalculator'));
const CalorieNeedsCalculator = lazy(() => import('@/pages/CalorieNeedsCalculator'));
const ManualHeartRateChecker = lazy(() => import('@/pages/ManualHeartRateChecker'));
const IdealWeightCalculator = lazy(() => import('@/pages/IdealWeightCalculator'));
const WaterIntakeCalculator = lazy(() => import('@/pages/WaterIntakeCalculator'));
const StepsToCaloriesConverter = lazy(() => import('@/pages/StepsToCaloriesConverter'));
const SleepTimeCalculator = lazy(() => import('@/pages/SleepTimeCalculator'));
const BmrCalculator = lazy(() => import('@/pages/BmrCalculator'));

export const healthFitnessToolRoutes = [
  { path: '/health-fitness-tools', component: HealthFitnessTools, isToolPage: false, title: "Health & Fitness Tools" },
  { path: '/health-bmi-calculator', component: HealthBmiCalculator, isToolPage: true, title: "BMI Calculator (Health)" },
  { path: '/calorie-needs-calculator', component: CalorieNeedsCalculator, isToolPage: true, title: "Calorie Needs Calculator" },
  { path: '/manual-heart-rate-checker', component: ManualHeartRateChecker, isToolPage: true, title: "Manual Heart Rate Checker" },
  { path: '/ideal-weight-calculator', component: IdealWeightCalculator, isToolPage: true, title: "Ideal Weight Calculator" },
  { path: '/water-intake-calculator', component: WaterIntakeCalculator, isToolPage: true, title: "Water Intake Calculator" },
  { path: '/steps-to-calories-converter', component: StepsToCaloriesConverter, isToolPage: true, title: "Steps to Calories Converter" },
  { path: '/sleep-time-calculator', component: SleepTimeCalculator, isToolPage: true, title: "Sleep Time Calculator" },
  { path: '/bmr-calculator', component: BmrCalculator, isToolPage: true, title: "BMR Calculator" },
];