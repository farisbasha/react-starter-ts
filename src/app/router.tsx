import { homeRoutes } from '@/features/home/routes';

import { authRoutes } from '@/features/auth/routes';

import { sharedRoutes } from '@/features/shared/routes';


import { useMemo } from 'react';
import {
  RouteObject,
  // LoaderFunctionArgs,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { AppRoot } from './root';






const appRoutes: RouteObject[] = [
  ...homeRoutes,
  ...authRoutes,
  ...sharedRoutes,


];

const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: (
        <AppRoot />
      ),
      children: [
        ...appRoutes,
      ],
    },

    // {
    //   path: '*',
    //   lazy: async () => {
    //     const { NotFoundRoute } = await import('./routes/not-found');
    //     return { Component: NotFoundRoute };
    //   },
    // },
  ]);

}

export const AppRouter = () => {


  const router = useMemo(() => createAppRouter(), []);

  return <RouterProvider router={router} />;
};
// {
//   path: '/',
//     element: (
//       <ProtectedRoute>
//         <AppRoot />
//       </ProtectedRoute>
//     ),
//       children: [
//         {
//           path: '',
//           lazy: async () => {
//             const { HomePage } = await import('./routes/home');
//             return { Component: HomePage };
//           },
//         },
//       ],
// },