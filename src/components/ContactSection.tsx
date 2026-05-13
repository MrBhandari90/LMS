import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, User, MessageSquare, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = [];
    if (!formData.name) newErrors.push('Name is required');
    if (!formData.email) {
      newErrors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.push('Please enter a valid email address');
    }
    if (!formData.message) newErrors.push('Message is required');
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors([]);
    setStatus('sending');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMsg = data.error || 'Failed to send message';
        if (data.code === 'MISSING_KEY' || errorMsg.includes('RESEND_API_KEY is not set') || errorMsg.includes('API key is invalid')) {
          errorMsg = 'Email service is not configured. Please add RESEND_API_KEY in Application Settings.';
        }
        throw new Error(errorMsg);
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      console.error('Contact error:', err);
      setErrors([err.message || 'An unexpected technical error occurred. Please try again later.']);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-12 h-[2px] bg-forest/20" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-forest/40">Inquiry Terminal</span>
            <div className="w-12 h-[2px] bg-forest/20" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-black text-forest tracking-tighter leading-none mb-6 font-serif"
          >
            Connect with <br className="hidden sm:block" /> our <span className="italic font-light">Growth Team</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-forest/60 font-medium max-w-lg mx-auto"
          >
            Have technical questions about botanical engineering or need assistance with your catalog? Reach out for expert consultation.
          </motion.p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-mint/40 to-moss/40 rounded-[48px] blur-2xl opacity-0 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative glass rounded-[48px] p-8 sm:p-12 shadow-premium border border-white/40 backdrop-blur-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {errors.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-red-50/50 backdrop-blur-md p-4 rounded-3xl border border-red-100"
                >
                  <div className="flex items-center gap-3 text-red-500 mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Validation Errors</span>
                  </div>
                  <ul className="space-y-1">
                    {errors.map((err, i) => (
                      <li key={i} className="text-xs font-bold text-red-400/80">• {err}</li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="relative group/input">
                    <label className="absolute -top-2.5 left-6 px-2 bg-[#fdfefd] text-[8px] font-black uppercase tracking-[0.4em] text-forest/40 z-10 transition-colors group-focus-within/input:text-moss">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/20 group-focus-within/input:text-moss transition-colors" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/40 border border-forest/5 px-14 py-5 rounded-full text-sm font-semibold text-forest placeholder:text-forest/10 focus:outline-none focus:ring-4 focus:ring-moss/5 focus:bg-white focus:border-moss/20 transition-all shadow-sm"
                        placeholder="E.G. JULIEN CLERC"
                      />
                    </div>
                  </div>

                  <div className="relative group/input">
                    <label className="absolute -top-2.5 left-6 px-2 bg-[#fdfefd] text-[8px] font-black uppercase tracking-[0.4em] text-forest/40 z-10 transition-colors group-focus-within/input:text-moss">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/20 group-focus-within/input:text-moss transition-colors" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/40 border border-forest/5 px-14 py-5 rounded-full text-sm font-semibold text-forest placeholder:text-forest/10 focus:outline-none focus:ring-4 focus:ring-moss/5 focus:bg-white focus:border-moss/20 transition-all shadow-sm"
                        placeholder="E.G. CONTACT@DOMAIN.COM"
                      />
                    </div>
                  </div>

                  <div className="relative group/input">
                    <label className="absolute -top-2.5 left-6 px-2 bg-[#fdfefd] text-[8px] font-black uppercase tracking-[0.4em] text-forest/40 z-10 transition-colors group-focus-within/input:text-moss">Subject</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/20 group-focus-within/input:text-moss transition-colors" />
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-white/40 border border-forest/5 px-14 py-5 rounded-full text-sm font-semibold text-forest placeholder:text-forest/10 focus:outline-none focus:ring-4 focus:ring-moss/5 focus:bg-white focus:border-moss/20 transition-all shadow-sm"
                        placeholder="E.G. ASSET LOGISTICS"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative group/input flex flex-col h-full">
                  <label className="absolute -top-2.5 left-6 px-2 bg-[#fdfefd] text-[8px] font-black uppercase tracking-[0.4em] text-forest/40 z-10 transition-colors group-focus-within/input:text-moss">Message Payload</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="flex-1 w-full bg-white/40 border border-forest/5 p-8 rounded-[32px] text-sm font-semibold text-forest placeholder:text-forest/10 focus:outline-none focus:ring-4 focus:ring-moss/5 focus:bg-white focus:border-moss/20 transition-all shadow-sm resize-none"
                    placeholder="ENTER YOUR TECHNICAL INQUIRY HERE..."
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-4">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-forest/30 max-w-sm text-center sm:text-left">
                  By transmitting this data, you agree to our botanical data handling protocols and privacy standards.
                </p>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full sm:w-auto bg-forest hover:bg-forest/90 text-white px-12 py-6 rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all shadow-2xl shadow-forest/10 hover:shadow-forest/20 hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Transmitting...
                    </>
                  ) : status === 'success' ? (
                    <>
                      Sent Successfully
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-mint" />
                      Initialize Inquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
