import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  icon: string;
  image: string;
  shortDescription: string;
  detailedDescription: string;
  bestFor: string[];
  benefits: { title: string; description: string }[];
  processSteps: { step: number; title: string; description: string }[];
  relatedServices: string[];
  sortOrder: number;
  isActive: boolean;
  seoTitle: string;
  seoDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    icon: { type: String, default: 'truck' },
    image: { type: String, default: '' },
    shortDescription: { type: String, required: true },
    detailedDescription: { type: String, required: true },
    bestFor: [{ type: String }],
    benefits: [
      {
        title: { type: String },
        description: { type: String },
      },
    ],
    processSteps: [
      {
        step: { type: Number },
        title: { type: String },
        description: { type: String },
      },
    ],
    relatedServices: [{ type: String }],
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
