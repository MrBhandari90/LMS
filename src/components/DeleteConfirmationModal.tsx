import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, title }: DeleteConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#15151e]/90 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white/80 w-full max-w-md relative z-10 rounded-[40px] shadow-2xl glass p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-red-50 p-4 rounded-full">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-black text-forest uppercase tracking-tighter">Discard Resource</h3>
                <p className="text-[10px] font-black text-forest/40 uppercase tracking-widest mt-1">Terminal Pruning Action</p>
              </div>
            </div>

            <p className="text-sm font-bold text-forest/60 mb-8 leading-relaxed">
              Are you sure you want to prune <span className="text-forest font-black tracking-tight">{title}</span> from the archive? This action cannot be undone.
            </p>

            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 px-8 py-4 glass rounded-full text-[10px] font-black uppercase tracking-widest text-forest"
              >
                Abort
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-red-500/20 transition-all"
              >
                Prune Entry
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
