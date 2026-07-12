'use client';

import { useRef, useEffect } from 'react';
import { useDeviceTier } from '@/lib/hooks/useDeviceTier';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { cn } from '@/lib/utils/cn';

interface GitHubGlobeProps {
  className?: string;
  contributionData?: { date: string; count: number }[];
}

export function GitHubGlobe({ className, contributionData }: GitHubGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const deviceTier = useDeviceTier();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (deviceTier === 'low' || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;
    let width = 0;
    let height = 0;

    const dots: { lat: number; lng: number; size: number; intensity: number }[] = [];
    const DOT_COUNT = deviceTier === 'high' ? 200 : deviceTier === 'medium' ? 100 : 50;

    // Generate random contribution dots on the sphere
    for (let i = 0; i < DOT_COUNT; i++) {
      dots.push({
        lat: (Math.random() - 0.5) * Math.PI,
        lng: Math.random() * Math.PI * 2,
        size: Math.random() * 3 + 1,
        intensity: Math.random(),
      });
    }

    const resize = () => {
      const container = containerRef.current;
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * 2;
      canvas.height = height * 2;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(2, 2);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.35;

      // Draw the sphere
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const latRad = (lat * Math.PI) / 180;
        const r = radius * Math.cos(latRad);
        const y = centerY + radius * Math.sin(latRad);
        if (r > 0) {
          ctx.beginPath();
          ctx.ellipse(centerX, y, r, r * 0.15, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Draw longitude lines
      for (let lng = 0; lng < 360; lng += 30) {
        const lngRad = (lng * Math.PI) / 180;
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 5) {
          const latRad = (lat * Math.PI) / 180;
          const x = centerX + radius * Math.cos(latRad) * Math.sin(lngRad + rotation);
          const y = centerY + radius * Math.sin(latRad);
          if (lat === -90) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw contribution dots
      for (const dot of dots) {
        const latRad = dot.lat;
        const lngRad = dot.lng + rotation;

        const x = centerX + radius * Math.cos(latRad) * Math.sin(lngRad);
        const y = centerY + radius * Math.sin(latRad);
        const z = radius * Math.cos(latRad) * Math.cos(lngRad);

        // Only draw dots on the visible hemisphere
        if (z > 0) {
          const alpha = dot.intensity * 0.8 + 0.2;
          const size = dot.size * (0.5 + (z / radius) * 0.5);
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.fill();
        }
      }

      rotation += 0.005;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [deviceTier, reduced]);

  if (deviceTier === 'low' || reduced) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-full min-h-[300px]', className)}
      aria-label="GitHub contributions globe visualization"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-hidden="true"
      />
    </div>
  );
}
