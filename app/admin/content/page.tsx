'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Save, FileText, Home, Info, Phone } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';

const sections = [
  {
    id: 'hero',
    icon: Home,
    label: 'Hero Section',
    fields: [
      { key: 'heroLabel', label: 'Top Label', placeholder: 'CANADA • USA FREIGHT SOLUTIONS', type: 'text' },
      { key: 'heroHeading', label: 'Main Heading', placeholder: 'Full-Service Trucking Between Canada & the USA', type: 'text' },
      { key: 'heroSubheading', label: 'Subheading', placeholder: 'Reliable freight transportation solutions...', type: 'textarea' },
      { key: 'heroPrimaryBtn', label: 'Primary Button Text', placeholder: 'Request a Quote', type: 'text' },
      { key: 'heroSecondaryBtn', label: 'Secondary Button Text', placeholder: 'Explore Services', type: 'text' },
    ],
  },
  {
    id: 'about',
    icon: Info,
    label: 'About Section',
    fields: [
      { key: 'aboutHeading', label: 'About Heading', placeholder: 'About Blue River Logistics', type: 'text' },
      { key: 'aboutSubheading', label: 'Subheading', placeholder: 'A full-service trucking company...', type: 'textarea' },
      { key: 'aboutOverview', label: 'Company Overview', placeholder: 'We are a full-service trucking company...', type: 'textarea' },
      { key: 'missionText', label: 'Mission Statement', placeholder: 'To provide reliable...', type: 'textarea' },
    ],
  },
  {
    id: 'contact',
    icon: Phone,
    label: 'Contact Info',
    fields: [
      { key: 'contactHeading', label: 'Contact Page Heading', placeholder: 'Contact Blue River Logistics', type: 'text' },
      { key: 'contactSubheading', label: 'Contact Subheading', placeholder: 'Ready to move freight...', type: 'textarea' },
    ],
  },
];

export default function AdminContentPage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [content, setContent] = useState<Record<string, string>>({
    heroLabel: 'CANADA • USA FREIGHT SOLUTIONS',
    heroHeading: 'Full-Service Trucking Between Canada & the USA',
    heroSubheading: 'Reliable freight transportation solutions built for businesses that need speed, safety, and consistency across borders.',
    heroPrimaryBtn: 'Request a Quote',
    heroSecondaryBtn: 'Explore Services',
    aboutHeading: 'About Blue River Logistics',
    aboutSubheading: 'A full-service trucking company based in Surrey, BC, serving freight needs across Canada and the USA.',
    aboutOverview: 'We are a full-service trucking company based in Surrey, British Columbia...',
    missionText: 'To provide reliable, flexible, and professional trucking services...',
    contactHeading: 'Contact Blue River Logistics',
    contactSubheading: 'Ready to move freight between Canada and the USA? Contact us today.',
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/settings', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageContent: content }),
      });
      toast.success('Content saved successfully');
    } catch { toast.error('Failed to save content'); }
    finally { setSaving(false); }
  };

  const currentSection = sections.find((s) => s.id === activeSection);

  return (
    <div className="flex flex-col min-h-screen">
      <AdminTopbar title="Website Content" />
      <div className="flex-1 p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 glass-card border border-blue-500/20 rounded-xl">
          <p className="text-blue-400 text-sm">📝 Edit your website text content here. Changes will be saved to database. Deploy updates to reflect them live.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Section nav */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="glass-card border border-white/5 rounded-2xl p-4 h-fit">
            <h3 className="text-white font-bold text-sm mb-4">Page Sections</h3>
            {sections.map((s) => (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={`admin-sidebar-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all mb-1 ${
                  activeSection === s.id ? 'active text-blue-400 bg-blue-500/10' : 'text-slate-400 hover:text-white'
                }`}>
                <s.icon className="w-4 h-4" />
                {s.label}
              </button>
            ))}
          </motion.div>

          {/* Fields */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-3 glass-card border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              {currentSection && <currentSection.icon className="w-5 h-5 text-blue-400" />}
              <h3 className="text-white font-bold">{currentSection?.label}</h3>
            </div>
            <div className="space-y-5">
              {currentSection?.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm text-slate-400 mb-2">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea value={content[field.key] || ''} onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
                      rows={4} placeholder={field.placeholder} className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none" />
                  ) : (
                    <input value={content[field.key] || ''} onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
                      placeholder={field.placeholder} className="form-input w-full px-4 py-3 rounded-xl text-sm" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={handleSave} disabled={saving}
                className="btn-shine flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl transition-all disabled:opacity-60">
                {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Save Content</>}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
