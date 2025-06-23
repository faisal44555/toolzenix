import { lazy } from 'react';

const FinanceTools = lazy(() => import('@/pages/FinanceTools'));
const EmiCalculator = lazy(() => import('@/pages/EmiCalculator'));
const LoanInterestCalculator = lazy(() => import('@/pages/LoanInterestCalculator'));
const CreditCardPayoffCalculator = lazy(() => import('@/pages/CreditCardPayoffCalculator'));
const FinanceSimpleInterestCalculator = lazy(() => import('@/pages/FinanceSimpleInterestCalculator'));
const FinanceCompoundInterestCalculator = lazy(() => import('@/pages/FinanceCompoundInterestCalculator'));
const GstCalculator = lazy(() => import('@/pages/GstCalculator'));
const SipCalculator = lazy(() => import('@/pages/SipCalculator'));
const StaticCurrencyConverter = lazy(() => import('@/pages/StaticCurrencyConverter'));

export const financeToolRoutes = [
  { path: '/finance-tools', component: FinanceTools, isToolPage: false, title: "Finance Tools" },
  { path: '/emi-calculator', component: EmiCalculator, isToolPage: true, title: "EMI Calculator" },
  { path: '/loan-interest-calculator', component: LoanInterestCalculator, isToolPage: true, title: "Loan Interest Calculator" },
  { path: '/credit-card-payoff-calculator', component: CreditCardPayoffCalculator, isToolPage: true, title: "Credit Card Payoff Calculator" },
  { path: '/finance-simple-interest-calculator', component: FinanceSimpleInterestCalculator, isToolPage: true, title: "Simple Interest Calculator (Finance)" },
  { path: '/finance-compound-interest-calculator', component: FinanceCompoundInterestCalculator, isToolPage: true, title: "Compound Interest Calculator (Finance)" },
  { path: '/gst-calculator', component: GstCalculator, isToolPage: true, title: "GST Calculator" },
  { path: '/sip-calculator', component: SipCalculator, isToolPage: true, title: "SIP Calculator" },
  { path: '/static-currency-converter', component: StaticCurrencyConverter, isToolPage: true, title: "Static Currency Converter" },
];