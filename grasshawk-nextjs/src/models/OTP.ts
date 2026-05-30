import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOTP extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
  used: boolean;
}

const OTPSchema = new Schema<IOTP>({
  email: { type: String, required: true, lowercase: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
});

// Auto-expire documents after expiresAt
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP: Model<IOTP> =
  mongoose.models.OTP || mongoose.model<IOTP>('OTP', OTPSchema);

export default OTP;
