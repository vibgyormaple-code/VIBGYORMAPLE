'use client';

import { useState } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';

const inquiryTypes = [
  { value: 'distributor', label: 'Distributor Inquiry' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'product_info', label: 'Product Information' },
  { value: 'general', label: 'General Inquiry' },
];

export default function LeadForm() {
  const [form, setForm] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    message: '',
    inquiryType: 'general',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setForm({ name: '', companyName: '', email: '', phone: '', message: '', inquiryType: 'general' });
      } else {
        setError(data.message || 'Submission failed. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Message Sent!</h3>
        <p className="text-gray-500 text-sm mb-6">
          Thank you for reaching out. Our team will contact you within 24–48 hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-[#C8102E] font-semibold hover:underline text-sm"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)] space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5" htmlFor="lead-name">
            Full Name <span className="text-[#C8102E]">*</span>
          </label>
          <input
            id="lead-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Smith"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition-all bg-[#f8f8f8] focus:bg-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5" htmlFor="lead-company">
            Company Name
          </label>
          <input
            id="lead-company"
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="ACME Corp (optional)"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition-all bg-[#f8f8f8] focus:bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5" htmlFor="lead-email">
            Email Address <span className="text-[#C8102E]">*</span>
          </label>
          <input
            id="lead-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition-all bg-[#f8f8f8] focus:bg-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5" htmlFor="lead-phone">
            Phone Number <span className="text-[#C8102E]">*</span>
          </label>
          <input
            id="lead-phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition-all bg-[#f8f8f8] focus:bg-white"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5" htmlFor="lead-inquiry">
          Inquiry Type
        </label>
        <select
          id="lead-inquiry"
          name="inquiryType"
          value={form.inquiryType}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition-all bg-[#f8f8f8] focus:bg-white"
        >
          {inquiryTypes.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5" htmlFor="lead-message">
          Message <span className="text-[#C8102E]">*</span>
        </label>
        <textarea
          id="lead-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about your requirements..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition-all bg-[#f8f8f8] focus:bg-white resize-none"
          required
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>
      )}

      <button
        type="submit"
        id="lead-submit-btn"
        disabled={loading}
        className="w-full bg-[#C8102E] text-white py-4 rounded-xl font-bold text-base hover:bg-[#a50d26] transition-all disabled:opacity-60 flex items-center justify-center gap-2 hover:shadow-lg"
      >
        {loading && <Loader2 size={18} className="animate-spin" />}
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
