'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Save, Building, Phone, Mail, MapPin, Globe, Palette } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';

interface Settings {
  companyName: string; phone: string; email: string; contactPerson: string;
  address: string; serviceArea: string; footerText: string; mapEmbed: string;
  socialLinks: { facebook: string; twitter: string; linkedin: string; instagram: string; };
  brandColors: { primary: string; accent: string; background: string; };
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/settings').then((r) => r.json()).then((d) => { setSettings(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/settings', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      toast.success('Settings saved successfully');
    } catch { toast.error('Failed to save settings'); }
    finally { setSaving(false); }
  };

  const update = (field: string, value: string) => {
    setSettings((prev) => prev ? { ...prev, [field]: value } : prev);
  };
  const updateSocial = (field: string, value: string) => {
    setSettings((prev) => prev ? { ...prev, socialLinks: { ...prev.socialLinks, [field]: value } } : prev);
  };
  const updateColor = (field: string, value: string) => {
    setSettings((prev) => prev ? { ...prev, brandColors: { ...prev.brandColors, [field]: value } } : prev);
  };

  if (loading) return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-[#070B12]">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <AdminTopbar title="Company Settings" />
      <div className="flex-1 p-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 glass-card border border-yellow-500/20 rounded-xl">
          <p className="text-yellow-400 text-sm">⚠️ Changes here update content across the entire website in real-time.</p>
        </motion.div>

        <div className="space-y-6">
          {/* Company Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Building className="w-5 h-5 text-blue-400" />
              <h3 className="text-white font-bold">Company Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Company Name', field: 'companyName', placeholder: 'Blue River Logistics' },
                { label: 'Contact Person', field: 'contactPerson', placeholder: 'Rajneel Sampat' },
                { label: 'Phone Number', field: 'phone', placeholder: '+1 236 514 6876' },
                { label: 'Email Address', field: 'email', placeholder: 'rajneelsampat00@gmail.com' },
                { label: 'Service Area', field: 'serviceArea', placeholder: 'Canada and USA' },
              ].map((item) => (
                <div key={item.field}>
                  <label className="block text-sm text-slate-400 mb-2">{item.label}</label>
                  <input value={(settings as unknown as Record<string, string>)?.[item.field] || ''} onChange={(e) => update(item.field, e.target.value)}
                    placeholder={item.placeholder} className="form-input w-full px-4 py-3 rounded-xl text-sm" />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-2">Business Address</label>
                <input value={settings?.address || ''} onChange={(e) => update('address', e.target.value)}
                  placeholder="12542 Grove Crescent, Surrey, BC V3V 2L7, Canada" className="form-input w-full px-4 py-3 rounded-xl text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-2">Footer Text</label>
                <input value={settings?.footerText || ''} onChange={(e) => update('footerText', e.target.value)}
                  className="form-input w-full px-4 py-3 rounded-xl text-sm" />
              </div>
            </div>
          </motion.div>

          {/* Brand Colors */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass-card border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Palette className="w-5 h-5 text-blue-400" />
              <h3 className="text-white font-bold">Brand Colors</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Primary Blue', field: 'primary' },
                { label: 'Accent Orange', field: 'accent' },
                { label: 'Background', field: 'background' },
              ].map((item) => (
                <div key={item.field}>
                  <label className="block text-sm text-slate-400 mb-2">{item.label}</label>
                  <div className="flex gap-2">
                    <input type="color" value={(settings?.brandColors as Record<string, string>)?.[item.field] || '#000000'}
                      onChange={(e) => updateColor(item.field, e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer border border-white/10 bg-transparent" />
                    <input value={(settings?.brandColors as Record<string, string>)?.[item.field] || ''} onChange={(e) => updateColor(item.field, e.target.value)}
                      className="form-input flex-1 px-3 py-2 rounded-xl text-sm font-mono" placeholder="#000000" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass-card border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Globe className="w-5 h-5 text-blue-400" />
              <h3 className="text-white font-bold">Social Media Links</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((platform) => (
                <div key={platform}>
                  <label className="block text-sm text-slate-400 mb-2 capitalize">{platform}</label>
                  <input value={(settings?.socialLinks as Record<string, string>)?.[platform] || ''}
                    onChange={(e) => updateSocial(platform, e.target.value)}
                    placeholder={`https://${platform}.com/...`} className="form-input w-full px-4 py-3 rounded-xl text-sm" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Map Embed */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="glass-card border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="w-5 h-5 text-blue-400" />
              <h3 className="text-white font-bold">Google Map Embed URL</h3>
            </div>
            <input value={settings?.mapEmbed || ''} onChange={(e) => update('mapEmbed', e.target.value)}
              placeholder="Google Maps embed URL" className="form-input w-full px-4 py-3 rounded-xl text-sm" />
            <p className="text-slate-500 text-xs mt-2">Get this from Google Maps → Share → Embed a map → Copy link src</p>
          </motion.div>

          <div className="flex justify-end">
            <button onClick={handleSave} disabled={saving}
              className="btn-shine flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl transition-all disabled:opacity-60">
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Save Settings</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
