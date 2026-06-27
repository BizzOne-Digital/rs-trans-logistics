import mongoose, { Document, Schema } from 'mongoose';

export interface ISiteSettings extends Document {
  companyName: string;
  logo: string;
  favicon: string;
  phone: string;
  email: string;
  contactPerson: string;
  address: string;
  serviceArea: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
    accentOrange: string;
    background: string;
    backgroundSecondary: string;
    textMuted: string;
    metalGrey: string;
  };
  mapEmbed: string;
  footerText: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  ogImage: string;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    companyName: { type: String, default: 'Blue River Logistics' },
    logo: { type: String, default: '' },
    favicon: { type: String, default: '' },
    phone: { type: String, default: '+1 236 514 6876' },
    email: { type: String, default: 'rajneelsampat00@gmail.com' },
    contactPerson: { type: String, default: 'Rajneel Sampat' },
    address: { type: String, default: '12542 Grove Crescent, Surrey, BC V3V 2L7, Canada' },
    serviceArea: { type: String, default: 'Canada and USA' },
    socialLinks: {
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    brandColors: {
      primary: { type: String, default: '#2563EB' },
      secondary: { type: String, default: '#111827' },
      accent: { type: String, default: '#F97316' },
      accentOrange: { type: String, default: '#F97316' },
      background: { type: String, default: '#070B12' },
      backgroundSecondary: { type: String, default: '#111827' },
      textMuted: { type: String, default: '#CBD5E1' },
      metalGrey: { type: String, default: '#64748B' },
    },
    mapEmbed: {
      type: String,
      default:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2609.4848539835!2d-122.8447!3d49.1913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDExJzI4LjciTiAxMjLCsDUwJzQ0LjkiVw!5e0!3m2!1sen!2sca!4v1234567890',
    },
    footerText: {
      type: String,
      default: 'Full-service trucking solutions between Canada and the USA.',
    },
    seoTitle: {
      type: String,
      default: 'Blue River Logistics | Canada & USA Trucking Services',
    },
    seoDescription: {
      type: String,
      default:
        'Full-service trucking company based in Surrey, BC, providing dry van, reefer, flatbed, step deck, container, and intermodal freight services between Canada and the USA.',
    },
    seoKeywords: {
      type: String,
      default:
        'Canada USA trucking, Surrey BC trucking, cross-border trucking, freight transportation, dry van, reefer trucking, flatbed trucking',
    },
    ogImage: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
