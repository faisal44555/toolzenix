import { lazy } from 'react';

const SecurityTools = lazy(() => import('@/pages/SecurityTools'));
const PasswordGenerator = lazy(() => import('@/pages/PasswordGenerator'));
const PasswordStrengthChecker = lazy(() => import('@/pages/PasswordStrengthChecker'));
const Md5Generator = lazy(() => import('@/pages/Md5Generator'));
const Sha256Generator = lazy(() => import('@/pages/Sha256Generator'));
const SecureTextEncryptDecrypt = lazy(() => import('@/pages/SecureTextEncryptDecrypt'));
const RandomPinGenerator = lazy(() => import('@/pages/RandomPinGenerator'));

export const securityToolRoutes = [
  { path: '/security-tools', component: SecurityTools, isToolPage: false, title: "Security Tools" },
  { path: '/password-generator', component: PasswordGenerator, isToolPage: true, title: "Password Generator" },
  { path: '/password-strength-checker', component: PasswordStrengthChecker, isToolPage: true, title: "Password Strength Checker" },
  { path: '/md5-generator', component: Md5Generator, isToolPage: true, title: "MD5 Hash Generator" },
  { path: '/sha256-generator', component: Sha256Generator, isToolPage: true, title: "SHA256 Hash Generator" },
  { path: '/secure-text-encrypt-decrypt', component: SecureTextEncryptDecrypt, isToolPage: true, title: "Text Encryption/Decryption" },
  { path: '/random-pin-generator', component: RandomPinGenerator, isToolPage: true, title: "Random PIN Generator" },
];