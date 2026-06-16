'use client';

import { AnimationProvider } from '@/lib/animation-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnimationProvider>
      {children}
    </AnimationProvider>
  );
}
