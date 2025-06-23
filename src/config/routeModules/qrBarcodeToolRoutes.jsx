import { lazy } from 'react';

const QrBarcodeTools = lazy(() => import('@/pages/QrBarcodeTools'));
const QrCodeGenerator = lazy(() => import('@/pages/QrCodeGenerator'));
const QrCodeScanner = lazy(() => import('@/pages/QrCodeScanner'));
const BarcodeGenerator = lazy(() => import('@/pages/BarcodeGenerator'));
const BarcodeScanner = lazy(() => import('@/pages/BarcodeScanner'));
const WifiQrGenerator = lazy(() => import('@/pages/WifiQrGenerator'));
const VCardQrGenerator = lazy(() => import('@/pages/VCardQrGenerator'));
const QrImageDecoder = lazy(() => import('@/pages/QrImageDecoder'));

export const qrBarcodeToolRoutes = [
  { path: '/qr-barcode-tools', component: QrBarcodeTools, isToolPage: false, title: "QR & Barcode Tools" },
  { path: '/qr-code-generator', component: QrCodeGenerator, isToolPage: true, title: "QR Code Generator" },
  { path: '/qr-code-scanner', component: QrCodeScanner, isToolPage: true, title: "QR Code Scanner" },
  { path: '/barcode-generator', component: BarcodeGenerator, isToolPage: true, title: "Barcode Generator" },
  { path: '/barcode-scanner', component: BarcodeScanner, isToolPage: true, title: "Barcode Scanner" },
  { path: '/wifi-qr-generator', component: WifiQrGenerator, isToolPage: true, title: "WiFi QR Code Generator" },
  { path: '/vcard-qr-generator', component: VCardQrGenerator, isToolPage: true, title: "vCard QR Code Generator" },
  { path: '/qr-image-decoder', component: QrImageDecoder, isToolPage: true, title: "QR Code Image Decoder" },
];