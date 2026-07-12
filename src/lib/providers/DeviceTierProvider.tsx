'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type DeviceTier = 'low' | 'medium' | 'high';

export interface DeviceTierContextValue {
  tier: DeviceTier;
  dpr: number;
  particleMultiplier: number;
  enablePostProcessing: boolean;
  isTouch: boolean;
}

const DeviceTierContext = createContext<DeviceTierContextValue | null>(null);

function detectTier(): DeviceTier {
  if (typeof window === 'undefined') return 'high';
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
  if (memory !== undefined && memory <= 2) return 'low';
  const cores = navigator.hardwareConcurrency;
  if (cores && cores <= 4) return 'low';
  if (cores && cores <= 6) return 'medium';
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!gl) return 'low';
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo
    ? (gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string)
    : '';
  const lowPatterns = [
    'intel hd graphics',
    'intel uhd graphics 6',
    'adreno 5',
    'adreno 6',
    'mali-400',
    'mali-450',
    'powervr',
  ];
  for (const p of lowPatterns) {
    if (renderer.toLowerCase().includes(p)) return 'low';
  }
  return 'high';
}

export function DeviceTierProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DeviceTierContextValue>({
    tier: 'high',
    dpr: 1,
    particleMultiplier: 1,
    enablePostProcessing: true,
    isTouch: false,
  });

  useEffect(() => {
    const tier = detectTier();
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    let dpr: number;
    let particleMultiplier: number;
    let enablePostProcessing: boolean;
    switch (tier) {
      case 'low':
        dpr = Math.min(window.devicePixelRatio, 1);
        particleMultiplier = 0.3;
        enablePostProcessing = false;
        break;
      case 'medium':
        dpr = Math.min(window.devicePixelRatio, 1.5);
        particleMultiplier = 0.6;
        enablePostProcessing = false;
        break;
      case 'high':
        dpr = Math.min(window.devicePixelRatio, 2);
        particleMultiplier = 1;
        enablePostProcessing = true;
        break;
    }
    if (isTouch) {
      particleMultiplier *= 0.5;
      dpr = Math.min(dpr, 1.5);
    }
    setState({ tier, dpr, particleMultiplier, enablePostProcessing, isTouch });
  }, []);

  return (
    <DeviceTierContext.Provider value={state}>
      {children}
    </DeviceTierContext.Provider>
  );
}

export function useDeviceTier(): DeviceTierContextValue {
  const ctx = useContext(DeviceTierContext);
  if (!ctx) throw new Error('useDeviceTier must be used within DeviceTierProvider');
  return ctx;
}
