'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        {children}
        <Toaster
          richColors
          position="top-center"
          toastOptions={{
            className: 'glass',
          }}
        />
      </TooltipProvider>
    </ThemeProvider>
  );
}
