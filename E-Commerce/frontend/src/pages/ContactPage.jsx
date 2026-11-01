import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { apiService } from '../services/api';
import { useToast } from '../context/ToastContext';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      addToast('Please fill in your name, email, and message.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiService.submitContact(formData);
      setSubmitting(false);
      setSubmitted(true);
      addToast(res.message || 'Thank you for reaching out! Your message was received.', 'success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setSubmitting(false);
      addToast('Failed to submit message. Please try again.', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3.5 py-1 rounded-full">
          We're Here to Help
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Get in Touch With Our Team
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Have an inquiry regarding an order, bulk wholesale, or custom specs? Send us a note below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <h2 className="text-lg font-extrabold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-600" />
              <span>Contact Channels</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Email Customer Support</h4>
                  <p className="text-slate-500 text-xs">concierge@novaluxe.store</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Average reply time: under 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Toll-Free Phone Hotline</h4>
                  <p className="text-slate-500 text-xs">+1 (800) 555-NOVA (6682)</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Mon - Fri: 8:00 AM – 8:00 PM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Corporate Headquarters</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    100 Innovation Parkway, Suite 400<br />
                    San Francisco Bay Area, CA 94107
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Order Dispatch Hours</h4>
                  <p className="text-slate-500 text-xs">Mon – Sat: Same-day shipping before 3 PM EST</p>
                </div>
              </div>
            </div>

            {/* Social media connections */}
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Connect on Social</p>
              <div className="flex gap-2">
                {['Twitter / X', 'Instagram', 'LinkedIn', 'YouTube'].map((platform) => (
                  <span
                    key={platform}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-brand-50 text-slate-600 hover:text-brand-600 font-bold text-xs transition cursor-pointer border border-slate-100"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Message Received!</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Thank you for contacting us. One of our customer experience specialists has received your inquiry and will email you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition shadow-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900 mb-1">Send Us a Direct Message</h2>
              <p className="text-xs text-slate-500 mb-4">We usually respond within 2-4 business hours.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Marcus Chen"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="marcus@example.com"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Order question, warranty, or return"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="How can our customer concierge assist you today?"
                  required
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm py-3.5 px-8 rounded-2xl shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 transition hover:scale-[1.02] disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Transmitting...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
