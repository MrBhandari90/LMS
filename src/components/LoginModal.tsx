import React, { useState } from 'react';
import { X, Lock, User, ShieldCheck, Zap } from 'lucide-react';
import { Role } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: Role) => void;
  targetRole: Role;
}

export default function LoginModal({ isOpen, onClose, onLogin, targetRole }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Predefined credentials for the demo
    const credentials = {
      [Role.ADMIN]: { user: 'admin', pass: 'admin123' },
      [Role.EMPLOYEE]: { user: 'staff', pass: 'staff123' },
    };

    const targetCreds = credentials[targetRole as keyof typeof credentials];

    if (username === targetCreds.user && password === targetCreds.pass) {
      onLogin(targetRole);
      onClose();
      setUsername('');
      setPassword('');
    } else {
      setError('INVALID ACCESS CREDENTIALS. CHECK SYSTEM LOGS.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#15151e]/95 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white/70 w-full max-w-lg relative z-10 rounded-[48px] shadow-2xl overflow-hidden glass p-1"
        >
          <div className="p-10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-forest p-2 rounded-full">
                    <Lock className="w-4 h-4 text-mint" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-forest/40">Knowledge Terminal</span>
                </div>
                <h2 className="text-4xl font-black text-forest tracking-tighter leading-none">
                  Authorize <span className="text-moss">Entry</span>
                </h2>
                <p className="text-[10px] font-black uppercase tracking-widest text-forest/30 mt-2">
                  Access Level: {targetRole.toUpperCase()}
                </p>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-forest/5 rounded-full transition-all text-forest/40">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div 
                  initial={{ x: -10 }} 
                  animate={{ x: 0 }}
                  className="bg-red-50 p-4 rounded-3xl flex items-center gap-3"
                >
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-wider">{error}</span>
                </motion.div>
              )}

              <div className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/20 group-focus-within:text-forest transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="USERNAME"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-14 pr-4 py-5 bg-white/50 border border-forest/5 rounded-full text-xs font-bold uppercase tracking-widest focus:outline-none focus:bg-white focus:ring-2 focus:ring-forest/5 transition-all shadow-sm"
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/20 group-focus-within:text-forest transition-colors" />
                  <input
                    type="password"
                    required
                    placeholder="ACCESS KEY"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-14 pr-4 py-5 bg-white/50 border border-forest/5 rounded-full text-xs font-bold uppercase tracking-widest focus:outline-none focus:bg-white focus:ring-2 focus:ring-forest/5 transition-all shadow-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-forest hover:bg-forest/90 text-white py-6 rounded-full text-xs font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-forest/20 active:scale-95"
              >
                Access Archive
              </button>
            </form>
          </div>

          <div className="bg-forest/5 p-6 text-center">
            <p className="text-[8px] font-black text-forest/20 uppercase tracking-[0.4em]">
              Authorized personnel only. Sessions are logged via botanical network.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
