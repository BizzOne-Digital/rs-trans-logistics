import mongoose, { Document, Schema } from 'mongoose';

export interface IPageContent extends Document {
  pageName: string;
  sections: Record<string, unknown>;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const PageContentSchema = new Schema<IPageContent>(
  {
    pageName: { type: String, required: true, unique: true },
    sections: { type: Schema.Types.Mixed, default: {} },
    status: { type: String, default: 'active', enum: ['active', 'inactive'] },
  },
  { timestamps: true }
);

export default mongoose.models.PageContent ||
  mongoose.model<IPageContent>('PageContent', PageContentSchema);
