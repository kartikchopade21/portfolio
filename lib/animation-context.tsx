'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AnimationSettings {
  speed: number; // 0.5 to 2.0
  intensity: number; // 0 to 1
  enabled: boolean;
}

interface AnimationContextType {
  settings: AnimationSettings;
  updateSettings: (newSettings: Partial<AnimationSettings>) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AnimationSettings>({
    speed: 1,
    intensity: 1,
    enabled: true,
  });

  const updateSettings = (newSettings: Partial<AnimationSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <AnimationContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}
