'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Globe, Save } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';

interface SeoSettings {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  ogImage: string;
}

export default function AdminSEOPage() {
  const [settings, setSettings] = useState<SeoSettings>({
    seoTitle: 'RS Trans Logistics | Canada & USA Trucking Services',
    seoDescription: 'Full-service trucking company based in Surrey, BC, providing freight services between Canada and the USA.',
    seoKeywords: 'Canada USA trucking, Surrey BC trucking, cross-border freight, dry van, reefer service',
    ogImage: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/settings').then((r) => r.json()).then((d) => {
      setSettings({ seoTitle: d.seoTitle || '', seoDescription: d.seoDescription || '', seoKeywords: d.seoKeywords || '', ogImage: d.ogImage || '' });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/settings', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      toast.success('SEO settings saved');
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  if (loading) return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-[#070B12]">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <AdminTopbar title="SEO Settings" />
      <div className="flex-1 p-6 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card border border-white/5 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="text-white font-bold">Global SEO Settings</h3>
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Site Title</label>
              <input value={settings.seoTitle} onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
                className="form-input w-full px-4 py-3 rounded-xl text-sm" />
              <p className="text-slate-600 text-xs mt-1">{settings.seoTitle.length}/60 characters (recommended max 60)</p>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Meta Description</label>
              <textarea value={settings.seoDescription} onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
                rows={3} className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none" />
              <p className="text-slate-600 text-xs mt-1">{settings.seoDescription.length}/160 characters (recommended max 160)</p>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Keywords (comma separated)</label>
              <textarea value={settings.seoKeywords} onChange={(e) => setSettings({ ...settings, seoKeywords: e.target.value })}
                rows={3} className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none"
                placeholder="Canada USA trucking, Surrey BC trucking, cross-border freight..." />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Open Graph Image URL</label>
              <input value={settings.ogImage} onChange={(e) => setSettings({ ...settings, ogImage: e.target.value })}
                className="form-input w-full px-4 py-3 rounded-xl text-sm" placeholder="https://..." />
              <p className="text-slate-600 text-xs mt-1">Image shown when sharing on social media. Recommended: 1200x630px</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card border border-white/5 rounded-2xl p-6 mb-6">
          <h3 className="text-white font-bold mb-4">SEO Preview</h3>
          <div className="glass rounded-xl p-4 border border-white/5">
            <p className="text-blue-400 text-sm font-medium mb-1">{settings.seoTitle || 'Page Title'}</p>
            <p className="text-green-400 text-xs mb-1">https://rstranslogistics.com</p>
            <p className="text-slate-400 text-sm">{settings.seoDescription || 'Meta description will appear here...'}</p>
          </div>
        </motion.div>

        <div className="flex justify-end">
          <button onClick={handleSave} disabled={saving}
            className="btn-shine flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl transition-all disabled:opacity-60">
            {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Save SEO Settings</>}
          </button>
        </div>
      </div>
    </div>
  );
}
