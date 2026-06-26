'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { CheckCircle, Truck, Send, Phone, Mail } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  companyName: z.string().optional(),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  pickupLocation: z.string().min(3, 'Pickup location is required'),
  deliveryLocation: z.string().min(3, 'Delivery location is required'),
  freightType: z.string().min(1, 'Please select a freight type'),
  pickupDate: z.string().optional(),
  deliveryDate: z.string().optional(),
  freightWeight: z.string().optional(),
  freightDimensions: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const freightTypes = [
  'Dry Van', 'Reefer Service', 'Flatbed / Curtain Van / Roll Tite',
  'Step Deck', 'Container Service', 'Intermodal', 'Other',
];

const freightTypeSlugMap: Record<string, string> = {
  'dry-vans': 'Dry Van',
  'reefer-service': 'Reefer Service',
  'flatbed-curtain-roll-tite': 'Flatbed / Curtain Van / Roll Tite',
  'step-deck': 'Step Deck',
  'container-service': 'Container Service',
  'intermodal': 'Intermodal',
};

function QuoteForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service') || '';
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const preselected = freightTypeSlugMap[serviceParam] || '';

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { freightType: preselected },
  });

  useEffect(() => {
    if (preselected) setValue('freightType', preselected);
  }, [preselected, setValue]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/quote-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to submit');
      setSubmitted(true);
      toast.success('Quote request submitted!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto glass-card border border-green-500/20 rounded-2xl p-12 text-center"
      >
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>
        <h3 className="text-white font-bold text-2xl mb-4">Quote Request Received!</h3>
        <p className="text-slate-400 leading-relaxed mb-8">
          Thank you. Your quote request has been received. Our team will contact you shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="tel:+12365146876" className="flex items-center gap-2 glass border border-white/10 text-white px-5 py-3 rounded-xl text-sm hover:border-white/20 transition-colors">
            <Phone className="w-4 h-4 text-blue-400" /> +1 236 514 6876
          </a>
          <a href="mailto:rajneelsampat00@gmail.com" className="flex items-center gap-2 glass border border-white/10 text-white px-5 py-3 rounded-xl text-sm hover:border-white/20 transition-colors">
            <Mail className="w-4 h-4 text-blue-400" /> Email Us
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Contact Info */}
      <div className="glass-card border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-bold mb-5 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-black">1</span>
          Your Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Full Name *</label>
            <input {...register('fullName')} placeholder="Your full name" className="form-input w-full px-4 py-3 rounded-xl text-sm" />
            {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Company Name</label>
            <input {...register('companyName')} placeholder="Your company (optional)" className="form-input w-full px-4 py-3 rounded-xl text-sm" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Phone Number *</label>
            <input {...register('phone')} placeholder="+1 (XXX) XXX-XXXX" className="form-input w-full px-4 py-3 rounded-xl text-sm" />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Email Address *</label>
            <input {...register('email')} type="email" placeholder="your@email.com" className="form-input w-full px-4 py-3 rounded-xl text-sm" />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>
        </div>
      </div>

      {/* Shipment Info */}
      <div className="glass-card border border-white/5 rounded-2xl p-6">
        <h3 className="text-white font-bold mb-5 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-black">2</span>
          Shipment Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Pickup Location *</label>
            <input {...register('pickupLocation')} placeholder="City, Province/State, Country" className="form-input w-full px-4 py-3 rounded-xl text-sm" />
            {errors.pickupLocation && <p className="text-red-400 text-xs mt-1">{errors.pickupLocation.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Delivery Location *</label>
            <input {...register('deliveryLocation')} placeholder="City, Province/State, Country" className="form-input w-full px-4 py-3 rounded-xl text-sm" />
            {errors.deliveryLocation && <p className="text-red-400 text-xs mt-1">{errors.deliveryLocation.message}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-400 mb-2">Freight Type *</label>
            <select {...register('freightType')} className="form-input w-full px-4 py-3 rounded-xl text-sm bg-[#111827]">
              <option value="">Select freight type...</option>
              {freightTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.freightType && <p className="text-red-400 text-xs mt-1">{errors.freightType.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Preferred Pickup Date</label>
            <input {...register('pickupDate')} type="date" className="form-input w-full px-4 py-3 rounded-xl text-sm" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Preferred Delivery Date</label>
            <input {...register('deliveryDate')} type="date" className="form-input w-full px-4 py-3 rounded-xl text-sm" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Freight Weight</label>
            <input {...register('freightWeight')} placeholder="e.g. 5000 lbs" className="form-input w-full px-4 py-3 rounded-xl text-sm" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Freight Dimensions</label>
            <input {...register('freightDimensions')} placeholder='e.g. 48"L x 48"W x 48"H' className="form-input w-full px-4 py-3 rounded-xl text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-400 mb-2">Additional Details</label>
            <textarea {...register('message')} rows={4} placeholder="Any additional information about your shipment..." className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none" />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-shine w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-all neon-blue"
      >
        {loading ? (
          <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</>
        ) : (
          <><Send className="w-5 h-5" /> Request My Quote</>
        )}
      </button>

      <p className="text-center text-slate-500 text-sm">
        By submitting, you agree to be contacted by our team regarding your freight quote.
      </p>
    </form>
  );
}

export default function QuotePage() {
  return (
    <div className="bg-[#070B12]">
      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('/images/quote-bg.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B12]/80 via-[#070B12]/70 to-[#070B12]" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-400 border border-blue-500/30 rounded-full px-4 py-2 mb-6 glass">
            <Truck className="w-4 h-4" /> Free Custom Quote
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="heading-xl text-white mb-6">
            Need Freight Moved?{' '}
            <span className="gradient-text">Request a Quote Today.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto">
            Every shipment is different. Send us your freight details and we will provide a custom quote based on your pickup location, destination, service type, and timeline.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <Suspense fallback={<div className="text-center py-12 text-slate-400">Loading form...</div>}>
            <QuoteForm />
          </Suspense>
        </div>
      </section>

      {/* Info cards */}
      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '⚡', title: 'Fast Response', desc: 'We typically respond to quote requests within 24 hours.' },
            { icon: '💰', title: 'Custom Pricing', desc: 'Every quote is tailored to your specific shipment needs.' },
            { icon: '🤝', title: 'No Obligation', desc: 'Requesting a quote is free with no commitment required.' },
          ].map((item) => (
            <ScrollReveal key={item.title}>
              <div className="glass-card border border-white/5 rounded-xl p-5 text-center">
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="text-white font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
