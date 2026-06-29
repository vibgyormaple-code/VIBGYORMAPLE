'use client';

import { useState, useRef } from 'react';
import { X, Loader2, CheckCircle, Mail } from 'lucide-react';

interface OTPModalProps {
  email: string;
  otpToken: string;
  onTokenUpdate: (newToken: string) => void;
  onVerified: () => void;
  onClose: () => void;
}

export default function OTPModal({ email, otpToken, onTokenUpdate, onVerified, onClose }: OTPModalProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter') handleVerify();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpStr = otp.join('');
    if (otpStr.length !== 6) {
      setError('Please enter the 6-digit code.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpStr, otpToken }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(onVerified, 1000);
      } else {
        setError(data.message || 'Invalid OTP. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();

    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.otpToken) {
        onTokenUpdate(data.otpToken);
      } else {
        setError(data.message || 'Failed to resend OTP.');
      }
    } catch {
      setError('Failed to resend OTP.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X size={18} className="text-gray-500" />
        </button>

        {success ? (
          <div className="text-center py-8">
            <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">Email Verified!</h2>
            <p className="text-gray-500 text-sm">Proceeding to payment...</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-[#C8102E]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-[#C8102E]" />
              </div>
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-1">Verify Your Email</h2>
              <p className="text-gray-500 text-sm">
                We sent a 6-digit code to<br />
                <strong className="text-[#1A1A1A]">{email}</strong>
              </p>
            </div>

            {/* OTP Inputs */}
            <div className="flex gap-3 justify-center mb-6" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  id={`otp-input-${i}`}
                  className={`w-12 h-14 text-center text-2xl font-black border-2 rounded-xl focus:outline-none focus:border-[#C8102E] transition-colors ${
                    error ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-[#f8f8f8]'
                  } ${digit ? 'border-[#C8102E] bg-white' : ''}`}
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <button
              onClick={handleVerify}
              disabled={loading || otp.join('').length !== 6}
              id="verify-otp-btn"
              className="w-full bg-[#C8102E] text-white py-4 rounded-xl font-bold text-base hover:bg-[#a50d26] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>

            <p className="text-center text-sm text-gray-500">
              Didn&apos;t receive it?{' '}
              <button
                onClick={handleResend}
                disabled={resending}
                className="text-[#C8102E] font-semibold hover:underline disabled:opacity-50"
              >
                {resending ? 'Sending...' : 'Resend Code'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
