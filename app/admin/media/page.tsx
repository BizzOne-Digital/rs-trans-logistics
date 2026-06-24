'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Upload, Image, Info } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';

export default function AdminMediaPage() {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/media/upload', { method: 'POST', body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Upload failed');
      toast.success('Image uploaded successfully');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminTopbar title="Media Manager" />
      <div className="flex-1 p-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 glass-card border border-blue-500/20 rounded-xl flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-blue-400 text-sm font-medium mb-1">Media Management</p>
            <p className="text-slate-400 text-sm">
              To enable full image uploads, configure Cloudinary in your <code className="text-blue-300">.env.local</code> file with your CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET. Then implement the upload API route at <code className="text-blue-300">/api/admin/media/upload</code>.
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card border border-white/5 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Image className="w-5 h-5 text-blue-400" />
            <h3 className="text-white font-bold">Upload Images</h3>
          </div>

          <label className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
            uploading ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5'
          }`}>
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
            {uploading ? (
              <div className="text-center">
                <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-blue-400 text-sm">Uploading...</p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <p className="text-white font-medium mb-1">Drop image here or click to upload</p>
                <p className="text-slate-500 text-sm">PNG, JPG, WebP up to 10MB</p>
              </div>
            )}
          </label>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Hero Background', 'Service Images', 'About Images', 'Logo', 'Favicon'].map((type) => (
              <div key={type} className="glass p-3 rounded-xl text-center border border-white/5">
                <Image className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                <p className="text-slate-400 text-xs">{type}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mt-6 glass-card border border-white/5 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-4">Free Image Resources</h3>
          <p className="text-slate-400 text-sm mb-4">Use these free resources for high-quality trucking and logistics images:</p>
          <div className="space-y-3">
            {[
              { name: 'Unsplash', url: 'https://unsplash.com/s/photos/trucking', desc: 'Free high-quality photos' },
              { name: 'Pexels', url: 'https://www.pexels.com/search/truck/', desc: 'Free stock photos' },
              { name: 'Pixabay', url: 'https://pixabay.com/images/search/truck/', desc: 'Free commercial images' },
            ].map((r) => (
              <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between glass p-3 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all">
                <div>
                  <p className="text-white text-sm font-medium">{r.name}</p>
                  <p className="text-slate-500 text-xs">{r.desc}</p>
                </div>
                <span className="text-blue-400 text-xs">Visit →</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
