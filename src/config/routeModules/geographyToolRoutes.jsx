import { lazy } from 'react';

const GeographyTools = lazy(() => import('@/pages/GeographyTools'));
const LatLongFinder = lazy(() => import('@/pages/LatLongFinder'));
const GeographyTimeZoneConverter = lazy(() => import('@/pages/GeographyTimeZoneConverter'));
const CountryInfoFinder = lazy(() => import('@/pages/CountryInfoFinder'));
const IpGeolocationTool = lazy(() => import('@/pages/IpGeolocationTool'));
const DistanceCalculatorTool = lazy(() => import('@/pages/DistanceCalculatorTool'));
const GeographyWorldClock = lazy(() => import('@/pages/GeographyWorldClock'));
const CountryCurrencyInfo = lazy(() => import('@/pages/CountryCurrencyInfo'));
const CountryFlagsViewer = lazy(() => import('@/pages/CountryFlagsViewer'));

export const geographyToolRoutes = [
  { path: '/geography-tools', component: GeographyTools, isToolPage: false, title: "Geography Tools" },
  { path: '/lat-long-finder', component: LatLongFinder, isToolPage: true, title: "Latitude & Longitude Finder" },
  { path: '/geo-timezone-converter', component: GeographyTimeZoneConverter, isToolPage: true, title: "Time Zone Converter (Geography)" },
  { path: '/country-info-finder', component: CountryInfoFinder, isToolPage: true, title: "Country Information Finder" },
  { path: '/ip-geolocation', component: IpGeolocationTool, isToolPage: true, title: "IP Geolocation Tool" },
  { path: '/distance-calculator', component: DistanceCalculatorTool, isToolPage: true, title: "Geographic Distance Calculator" },
  { path: '/geo-world-clock', component: GeographyWorldClock, isToolPage: true, title: "World Clock (Geography)" },
  { path: '/country-currency-info', component: CountryCurrencyInfo, isToolPage: true, title: "Currency Info by Country" },
  { path: '/country-flags-viewer', component: CountryFlagsViewer, isToolPage: true, title: "Country Flags Viewer" },
];