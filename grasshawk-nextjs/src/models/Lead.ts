import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILead extends Document {
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  message: string;
  inquiryType: 'distributor' | 'partnership' | 'product_info' | 'general';
  createdAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    companyName: { type: String, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    inquiryType: {
      type: String,
      enum: ['distributor', 'partnership', 'product_info', 'general'],
      default: 'general',
    },
  },
  { timestamps: true }
);

const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;
