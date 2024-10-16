import { RouteObject } from 'react-router-dom';

const sharedRoutes: RouteObject[] = [
  {
      path: '/onboarding',
      lazy: async () => {
        const { default: Onboarding } = await import('../pages/onboarding');
        return { Component: Onboarding };
      },
    },

  {
      path: '/splash-page',
      lazy: async () => {
        const { default: SplashPage } = await import('../pages/splash-page');
        return { Component: SplashPage };
      },
    },
];

export { sharedRoutes };
