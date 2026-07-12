'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import Lenis from 'lenis';

interface LenisContextValue {
  lenis: Lenis | null;
  isReady: boolean;
}

const LenisContext = createContext<LenisContextValue>({ lenis: null, isReady: false });

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouchDevice) {
      setIsReady(true);
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    setIsReady(true);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isTouchDevice]);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, isReady }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis(): LenisContextValue {
  return useContext(LenisContext);
}
