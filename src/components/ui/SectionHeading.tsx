import { cn } from '@/lib/utils/cn';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'center' | 'left';
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-text-secondary max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
