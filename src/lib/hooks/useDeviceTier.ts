'use client';

import { useState, useEffect } from 'react';

export type DeviceTier = 'low' | 'medium' | 'high';

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('medium');

  useEffect(() => {
    const gpu = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) return 'low';
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
      const lowEndGPUs = ['intel hd graphics 400', 'intel hd graphics 2500', 'mali-400', 'adreno 3'];
      const isLow = lowEndGPUs.some((g) => renderer?.toLowerCase().includes(g));
      const memory = (gl.getParameter(gl.MAX_TEXTURE_SIZE) ?? 2048);
      if (isLow || memory <= 2048) return 'low';
      if (memory <= 4096) return 'medium';
      return 'high';
    };

    const memory = () => {
      if ('deviceMemory' in navigator) {
        const mem = (navigator as unknown as { deviceMemory: number }).deviceMemory;
        if (mem <= 2) return 'low';
        if (mem <= 4) return 'medium';
      }
      return null;
    };

    const determine = () => {
      const memTier = memory();
      if (memTier) return setTier(memTier);
      const gpuTier = gpu();
      setTier(gpuTier);
    };

    determine();
  }, []);

  return tier;
}
