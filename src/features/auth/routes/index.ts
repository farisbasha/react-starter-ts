import { RouteObject } from 'react-router-dom';

const authRoutes: RouteObject[] = [
  {
      path: '/login-page',
      lazy: async () => {
        const { default: LoginPage } = await import('../pages/login-page');
        return { Component: LoginPage };
      },
    },
];

export { authRoutes };
