import Link from 'next/link';
import { Scene404 } from '@/components/webgl/Scene404';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene404 />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-8xl font-bold text-text-primary mb-4">
          404
        </h1>
        <p className="text-xl text-text-secondary mb-8">
          This page drifted into another dimension.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
        >
          Take Me Home
        </Link>
      </div>
    </div>
  );
}
