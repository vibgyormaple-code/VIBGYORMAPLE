// Simple in-memory cache for OTPs to replace the MongoDB database
interface OTPRecord {
  email: string;
  otp: string;
  expiresAt: Date;
  used: boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var otpStore: Map<string, OTPRecord> | undefined;
}

if (!global.otpStore) {
  global.otpStore = new Map<string, OTPRecord>();
}

export const otpCache = global.otpStore;
