'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Phone, Mail, MapPin, Send, CheckCircle, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to submit');
      setSubmitted(true);
      toast.success('Message sent successfully!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#070B12]">
      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('/images/contact-bg.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B12]/80 via-[#070B12]/70 to-[#070B12]" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-400 border border-blue-500/30 rounded-full px-4 py-2 mb-6 glass">
            📞 Get in Touch
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="heading-xl text-white mb-6">
            Contact <span className="gradient-text">Blue River Logistics</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ready to move freight between Canada and the USA? Contact us today and request a custom quote.
          </motion.p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <ScrollReveal direction="left">
              {[
                {
                  icon: Phone, label: 'Phone', value: '+1 236 514 6876',
                  href: 'tel:+12365146876', color: 'blue',
                },
                {
                  icon: Mail, label: 'Email', value: 'rajneelsampat00@gmail.com',
                  href: 'mailto:rajneelsampat00@gmail.com', color: 'blue',
                },
                {
                  icon: MapPin, label: 'Address', value: '12542 Grove Crescent, Surrey, BC V3V 2L7, Canada',
                  href: null, color: 'orange',
                },
              ].map((item) => (
                <div key={item.label} className="glass-card border border-white/5 hover:border-blue-500/20 rounded-2xl p-6 flex items-start gap-4 transition-all premium-card">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-white font-medium hover:text-blue-400 transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-white font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2}>
              <div className="glass-card border border-white/5 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-2">Contact Person</h3>
                <p className="text-slate-400 text-sm mb-4">Rajneel Sampat</p>
                <h3 className="text-white font-bold mb-2">Service Area</h3>
                <p className="text-slate-400 text-sm mb-4">Canada & United States of America</p>
                <Link href="/quote"
                  className="btn-shine flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all w-full">
                  Request a Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="right">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card border border-green-500/20 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-white font-bold text-2xl mb-4">Message Sent!</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Your message has been received. We will get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="glass-card border border-white/5 rounded-2xl p-8 space-y-5">
                  <h3 className="text-white font-bold text-xl mb-6">Send Us a Message</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Your Name *</label>
                      <input {...register('name')} placeholder="Full name" className="form-input w-full px-4 py-3 rounded-xl text-sm" />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Email Address *</label>
                      <input {...register('email')} type="email" placeholder="your@email.com" className="form-input w-full px-4 py-3 rounded-xl text-sm" />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Phone Number</label>
                      <input {...register('phone')} placeholder="+1 (XXX) XXX-XXXX" className="form-input w-full px-4 py-3 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Subject *</label>
                      <input {...register('subject')} placeholder="What is this about?" className="form-input w-full px-4 py-3 rounded-xl text-sm" />
                      {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Message *</label>
                    <textarea {...register('message')} rows={5} placeholder="Write your message here..." className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none" />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={loading}
                    className="btn-shine w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-4 rounded-xl text-lg transition-all neon-blue">
                    {loading ? (
                      <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-5 h-5" /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="glass-card border border-white/5 rounded-2xl overflow-hidden h-72 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-3">📍</div>
                  <p className="text-white font-bold text-lg mb-1">12542 Grove Crescent</p>
                  <p className="text-slate-400">Surrey, BC V3V 2L7, Canada</p>
                  <a
                    href="https://maps.google.com/?q=12542+Grove+Crescent+Surrey+BC+V3V+2L7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                  >
                    Open in Google Maps <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
