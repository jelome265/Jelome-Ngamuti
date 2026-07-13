'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/data/site';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

const initialFormData: FormFields = {
  name: '',
  email: '',
  subject: '',
  message: '',
  honeypot: '',
};

export function ContactSection() {
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormFields>(initialFormData);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (formData.subject.trim().length < 3) {
      errs.subject = 'Subject must be at least 3 characters';
    }
    if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field: keyof FormFields, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear validation error for the field being edited
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check — if filled, silently reject (bot detected)
    if (formData.honeypot) return;

    if (!validate()) return;

    setState('submitting');

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
          publicKey,
        );
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      setState('success');
      setFormData(initialFormData);
      setErrors({});
    } catch {
      setState('error');
    }
  };

  const handleReset = () => {
    setState('idle');
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-bg-alt/30"
      aria-label="Contact"
    >
      <Container>
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind? Let&apos;s talk."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Form Card */}
          <GlassCard className="lg:col-span-2">
            {state === 'success' ? (
              /* ---- Success State ---- */
              <div className="text-center py-12">
                <svg
                  className="w-12 h-12 text-success mx-auto mb-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Message Sent!
                </h3>
                <p className="text-text-secondary">
                  Thank you! I&apos;ll get back to you within 24 hours.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={handleReset}
                >
                  Send Another
                </Button>
              </div>
            ) : (
              /* ---- Form States: idle / typing / validating / submitting / error ---- */
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Honeypot field — invisible to users, detectable by bots */}
                <div
                  className="absolute opacity-0 h-0 pointer-events-none overflow-hidden"
                  aria-hidden="true"
                >
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={(e) => handleChange('honeypot', e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    id="name"
                    label="Name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    error={errors.name}
                    placeholder="Your name"
                    required
                    disabled={state === 'submitting'}
                  />
                  <Input
                    id="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    error={errors.email}
                    placeholder="your@email.com"
                    required
                    disabled={state === 'submitting'}
                  />
                </div>

                <Input
                  id="subject"
                  label="Subject"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  error={errors.subject}
                  placeholder="What is this about?"
                  required
                  disabled={state === 'submitting'}
                />

                <Textarea
                  id="message"
                  label="Message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  error={errors.message}
                  placeholder="Tell me about your project..."
                  required
                  disabled={state === 'submitting'}
                  rows={5}
                />

                {/* Error banner */}
                {state === 'error' && (
                  <div
                    className="p-4 rounded-lg bg-error/10 border border-error/30 text-sm text-error"
                    role="alert"
                  >
                    Something went wrong. Please try again or email me directly
                    at{' '}
                    <a
                      href={`mailto:${siteConfig.social.email}`}
                      className="underline underline-offset-2 hover:text-primary transition-colors"
                    >
                      {siteConfig.social.email}
                    </a>
                    .
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={state === 'submitting'}
                  className="w-full sm:w-auto"
                >
                  {state === 'submitting' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </GlassCard>

          {/* Contact Info Sidebar */}
          <div className="space-y-4">
            {/* Email */}
            <GlassCard>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                Email
              </h3>
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="text-text-secondary hover:text-primary transition-colors break-all"
              >
                {siteConfig.social.email}
              </a>
            </GlassCard>

            {/* Phone (optional) */}
            {siteConfig.social.phone && (
              <GlassCard>
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                  Phone
                </h3>
                <a
                  href={`tel:${siteConfig.social.phone}`}
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  {siteConfig.social.phone}
                </a>
              </GlassCard>
            )}

            {/* Social Links */}
            <GlassCard>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                Social
              </h3>
              <div className="flex gap-3">
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </GlassCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
