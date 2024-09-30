
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';

import { MainErrorFallback } from '@/components/errors/main';
import { Spinner } from '@/components/ui/spinner';
import { ThemeProvider } from '@/components/theme-provider';


type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {


  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <HelmetProvider>


          {/* <Notifications /> */}
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            {children}
          </ThemeProvider>



        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
