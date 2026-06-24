import mongoose, { Document, Schema } from 'mongoose';

export interface IQuoteRequest extends Document {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  pickupLocation: string;
  deliveryLocation: string;
  freightType: string;
  pickupDate: string;
  deliveryDate: string;
  freightWeight: string;
  freightDimensions: string;
  message: string;
  status: 'new' | 'in-review' | 'contacted' | 'quoted' | 'completed' | 'archived';
  internalNotes: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuoteRequestSchema = new Schema<IQuoteRequest>(
  {
    fullName: { type: String, required: true },
    companyName: { type: String, default: '' },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    deliveryLocation: { type: String, required: true },
    freightType: { type: String, required: true },
    pickupDate: { type: String, default: '' },
    deliveryDate: { type: String, default: '' },
    freightWeight: { type: String, default: '' },
    freightDimensions: { type: String, default: '' },
    message: { type: String, default: '' },
    status: {
      type: String,
      default: 'new',
      enum: ['new', 'in-review', 'contacted', 'quoted', 'completed', 'archived'],
    },
    internalNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.QuoteRequest ||
  mongoose.model<IQuoteRequest>('QuoteRequest', QuoteRequestSchema);
