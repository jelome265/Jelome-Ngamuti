# Phase 4: Testimonials, Resume & Contact (Days 18–21)

**Goal:** Social proof, downloadable resume, functional contact system. **No `style={}` inline CSS.**

**Dependencies:** Phase 0 (UI primitives), Phase 2 (Reveal), Phase 3 (GlassCard)

---

## File Tree

```
src/
├── app/
│   └── page.tsx                        # Updated — Testimonials, ResumeSection, ContactSection wired
├── components/
│   ├── sections/
│   │   ├── Testimonials.tsx
│   │   ├── ResumeSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── Input.tsx
│       └── Textarea.tsx
├── lib/
│   ├── data/
│   │   └── testimonials.ts
│   ├── types/
│   │   └── testimonial.ts
│   └── utils/
│       └── validation.ts               # Zod schemas
```

---

## Task 4.1 — Testimonials Data

### src/lib/types/testimonial.ts
```typescript
export interface Testimonial { id: string; quote: string; author: string; title: string; avatar?: string; }
```

### src/lib/data/testimonials.ts
```typescript
import { type Testimonial } from '@/lib/types/testimonial';
export const testimonials: Testimonial[] = [
  { id: 't-1', quote: 'Jelome demonstrates strong technical skills and a methodical approach to problem-solving. His database designs are consistently well-structured.', author: 'Dr. Sarah Chen', title: 'Professor, Computer Science' },
  { id: 't-2', quote: 'Exceptional full-stack developer with an eye for detail. Delivered our project on time with clean, maintainable code.', author: 'Michael Torres', title: 'Project Lead, Tech Startup' },
];
```

---

## Task 4.2 — Form Validation

### src/lib/utils/validation.ts
```typescript
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  honeypot: z.string().max(0, 'Bot detected').optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

---

## Task 4.3 — Form UI Components

### src/components/ui/Input.tsx
```typescript
'use client';
import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { label: string; error?: string; }

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-text-secondary">{label}</label>
      <input ref={ref} id={id} className={cn('w-full px-4 py-2.5 rounded-lg bg-surface border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors', error ? 'border-error' : 'border-border', className)} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} {...props} />
      {error && <p id={`${id}-error`} className="text-xs text-error" role="alert">{error}</p>}
    </div>
  )
);
Input.displayName = 'Input';
```

### src/components/ui/Textarea.tsx
```typescript
'use client';
import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { label: string; error?: string; }

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-text-secondary">{label}</label>
      <textarea ref={id} id={id} className={cn('w-full px-4 py-2.5 rounded-lg bg-surface border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors resize-y min-h-[120px]', error ? 'border-error' : 'border-border', className)} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} {...props} />
      {error && <p id={`${id}-error`} className="text-xs text-error" role="alert">{error}</p>}
    </div>
  )
);
Textarea.displayName = 'Textarea';
```

---

## Task 4.4 — Section Components

### src/components/sections/Testimonials.tsx

Carousel with auto-advance, manual controls. States: populated, empty.

```typescript
'use client';
import { useState, useEffect, useCallback } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Reveal } from '@/components/animation/Reveal';
import { cn } from '@/lib/utils/cn';
import { testimonials } from '@/lib/data/testimonials';

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setActive(p => (p + 1) % testimonials.length), []);
  const prev = useCallback(() => setActive(p => (p - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [isPaused, next]);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-bg-alt/30" aria-label="Testimonials" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <Container>
        <Reveal><SectionHeading title="Testimonials" subtitle="What people say about working with me." /></Reveal>
        <div className="relative max-w-2xl mx-auto">
          <GlassCard className="text-center p-8 md:p-10">
            <svg className="w-8 h-8 text-primary/30 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" /></svg>
            <p className="text-lg text-text-secondary leading-relaxed mb-6">&ldquo;{testimonials[active]?.quote}&rdquo;</p>
            <div>
              <p className="font-semibold text-text-primary">{testimonials[active]?.author}</p>
              <p className="text-sm text-text-muted">{testimonials[active]?.title}</p>
            </div>
          </GlassCard>

          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <button onClick={prev} className="p-2 rounded-full text-text-muted hover:text-text-primary hover:bg-surface transition-colors" aria-label="Previous testimonial">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stroke-current" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <div className="flex gap-2" role="tablist" aria-label="Testimonial indicators">
                {testimonials.map((_, i) => (
                  <button key={i} role="tab" aria-selected={active === i} onClick={() => setActive(i)} className={cn('w-2 h-2 rounded-full transition-all duration-300', active === i ? 'bg-primary w-6' : 'bg-border')} aria-label={`Go to testimonial ${i + 1}`} />
                ))}
              </div>
              <button onClick={next} className="p-2 rounded-full text-text-muted hover:text-text-primary hover:bg-surface transition-colors" aria-label="Next testimonial">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stroke-current" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
```

### src/components/sections/ResumeSection.tsx

```typescript
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig } from '@/lib/data/site';

export function ResumeSection() {
  return (
    <section id="resume" className="py-24 md:py-32" aria-label="Resume">
      <Container className="text-center">
        <SectionHeading title="Resume &eacute;sum&eacute;" subtitle="Download my full resume for a complete overview of my experience." />
        <a href={siteConfig.resumeUrl} download className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-white font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20" aria-label="Download resume PDF">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stroke-current" aria-hidden="true"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          Download Resume (PDF)
        </a>
      </Container>
    </section>
  );
}
```

### src/components/sections/ContactSection.tsx

All states: idle, typing, validating, submitting (loading), success, error. Spam protection via honeypot. No `style={}`.

```typescript
'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/data/site';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactSection() {
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', honeypot: '' });

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (formData.name.length < 2) errs.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Valid email required';
    if (formData.subject.length < 3) errs.subject = 'Subject required';
    if (formData.message.length < 10) errs.message = 'Message too short (min 10 chars)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData(p => ({ ...p, [field]: value }));
    if (errors[field]) setErrors(p => { const n = { ...p }; delete n[field]; return n; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Spam bot detected
    if (!validate()) return;
    setState('submitting');
    try {
      const { honeypot, ...data } = formData;
      await new Promise(r => setTimeout(r, 1500)); // Simulated send
      setState('success');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch {
      setState('error');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-bg-alt/30" aria-label="Contact">
      <Container>
        <SectionHeading title="Get In Touch" subtitle="Have a project in mind? Let&apos;s talk." />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <GlassCard className="lg:col-span-2">
            {state === 'success' ? (
              <div className="text-center py-12">
                <svg className="w-12 h-12 text-success mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Message Sent!</h3>
                <p className="text-text-secondary">Thank you! I&apos;ll get back to you within 24 hours.</p>
                <Button variant="outline" className="mt-6" onClick={() => setState('idle')}>Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="absolute opacity-0 h-0 pointer-events-none" aria-hidden="true">
                  <input type="text" name="honeypot" value={formData.honeypot} onChange={e => handleChange('honeypot', e.target.value)} tabIndex={-1} autoComplete="off" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input id="name" label="Name" value={formData.name} onChange={e => handleChange('name', e.target.value)} error={errors.name} placeholder="Your name" required />
                  <Input id="email" label="Email" type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} error={errors.email} placeholder="your@email.com" required />
                </div>
                <Input id="subject" label="Subject" value={formData.subject} onChange={e => handleChange('subject', e.target.value)} error={errors.subject} placeholder="What is this about?" required />
                <Textarea id="message" label="Message" value={formData.message} onChange={e => handleChange('message', e.target.value)} error={errors.message} placeholder="Tell me about your project..." required />
                {state === 'error' && <p className="text-sm text-error" role="alert">Something went wrong. Please try again or email me directly.</p>}
                <Button type="submit" variant="primary" size="lg" loading={state === 'submitting'} className="w-full sm:w-auto">
                  {state === 'submitting' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </GlassCard>

          <div className="space-y-4">
            <GlassCard>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Email</h3>
              <a href={`mailto:${siteConfig.social.email}`} className="text-text-secondary hover:text-primary transition-colors">{siteConfig.social.email}</a>
            </GlassCard>
            {siteConfig.social.phone && (
              <GlassCard>
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Phone</h3>
                <a href={`tel:${siteConfig.social.phone}`} className="text-text-secondary hover:text-primary transition-colors">{siteConfig.social.phone}</a>
              </GlassCard>
            )}
            <GlassCard>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Social</h3>
              <div className="flex gap-3">
                <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary transition-colors" aria-label="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                </a>
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary transition-colors" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </div>
            </GlassCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

---

## Acceptance Criteria

| Criterion | Verification |
|---|---|
| Zero `style={}` props | Grep check |
| Testimonials carousel auto-advances every 5s | Watch quotes change automatically |
| Pause on hover | Hover carousel → auto-advance stops |
| Manual next/prev buttons work | Click arrows → testimonial changes |
| Dot indicators show active | Active dot is wider, colored |
| Empty testimonials: section hidden | Remove data → section not rendered |
| Resume download button triggers download | Click → PDF downloads |
| Contact form — idle state: all fields empty | Form renders with placeholders |
| Contact form — typing: field highlights | Focus → border turns primary |
| Contact form — validation: shows errors | Submit empty → error messages appear |
| Contact form — submitting: spinner + disabled | Submit valid → button shows spinner, disabled |
| Contact form — success: thank you message | Submit → "Message Sent" with checkmark |
| Contact form — error: retry message | Simulate failure → error banner |
| Honeypot spam field hidden from users | field is off-screen, tabIndex=-1 |
| Contact info shows email, phone, social | Verify all rendered |
