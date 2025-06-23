import React, { lazy } from 'react';
import ToolPageLayout from '@/components/layout/ToolPageLayout';

import { coreRoutes } from '@/config/routeModules/coreRoutes';
import { imageToolRoutes } from '@/config/routeModules/imageToolRoutes';
import { videoToolRoutes } from '@/config/routeModules/videoToolRoutes';
import { documentToolRoutes } from '@/config/routeModules/documentToolRoutes';
import { textToolRoutes } from '@/config/routeModules/textToolRoutes';
import { qrBarcodeToolRoutes } from '@/config/routeModules/qrBarcodeToolRoutes';
import { unitConverterRoutes } from '@/config/routeModules/unitConverterRoutes';
import { mathToolRoutes } from '@/config/routeModules/mathToolRoutes';
import { colorToolRoutes } from '@/config/routeModules/colorToolRoutes';
import { developerToolRoutes } from '@/config/routeModules/developerToolRoutes';
import { securityToolRoutes } from '@/config/routeModules/securityToolRoutes';
import { miscellaneousToolRoutes } from '@/config/routeModules/miscellaneousToolRoutes';
import { scienceToolRoutes } from '@/config/routeModules/scienceToolRoutes';
import { marketingToolRoutes } from '@/config/routeModules/marketingToolRoutes';
import { socialMediaToolRoutes } from '@/config/routeModules/socialMediaToolRoutes';
import { fileToolRoutes } from '@/config/routeModules/fileToolRoutes';
import { healthFitnessToolRoutes } from '@/config/routeModules/healthFitnessToolRoutes';
import { calendarTimeToolRoutes } from '@/config/routeModules/calendarTimeToolRoutes';
import { financeToolRoutes } from '@/config/routeModules/financeToolRoutes';
import { geographyToolRoutes } from '@/config/routeModules/geographyToolRoutes';
import { aiToolRoutes } from '@/config/routeModules/aiToolRoutes';
import { languageToolRoutes } from '@/config/routeModules/languageToolRoutes';
import { gameToolRoutes } from '@/config/routeModules/gameToolRoutes';
import { systemToolRoutes } from '@/config/routeModules/systemToolRoutes';
import { mp3ToolRoutes } from '@/config/routeModules/mp3ToolRoutes';
import { blogRoutes } from '@/config/routeModules/blogRoutes';
import { dashboardRoutes } from '@/config/routeModules/dashboardRoutes';

const NotFound = lazy(() => import('@/pages/NotFound'));

const allRouteModules = [
  ...coreRoutes,
  ...imageToolRoutes,
  ...videoToolRoutes,
  ...documentToolRoutes,
  ...textToolRoutes,
  ...qrBarcodeToolRoutes,
  ...unitConverterRoutes,
  ...mathToolRoutes,
  ...colorToolRoutes,
  ...developerToolRoutes,
  ...securityToolRoutes,
  ...miscellaneousToolRoutes,
  ...scienceToolRoutes,
  ...marketingToolRoutes,
  ...socialMediaToolRoutes,
  ...fileToolRoutes,
  ...healthFitnessToolRoutes,
  ...calendarTimeToolRoutes,
  ...financeToolRoutes,
  ...geographyToolRoutes,
  ...aiToolRoutes,
  ...languageToolRoutes,
  ...gameToolRoutes,
  ...systemToolRoutes,
  ...mp3ToolRoutes,
  ...blogRoutes, 
  ...dashboardRoutes,
];

export const appRoutesConfig = allRouteModules.map(route => {
  const PageComponent = route.component;
  const element = route.isToolPage ? (
    <ToolPageLayout 
      pageTitle={route.title || 'Tool'} 
      pageDescription={route.description || 'An awesome tool by Toolzenix.'}
      canonicalPath={route.path}
    >
      <PageComponent />
    </ToolPageLayout>
  ) : (
    <PageComponent />
  );
  
  return {
    path: route.path,
    element: element,
  };
});

appRoutesConfig.push({
  path: '*',
  element: <NotFound />
});