import React from 'react';
import { X, BookOpen, User, Hash, Calendar, Tag, CheckCircle, XCircle, Info } from 'lucide-react';
import { Book } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface BookDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
}

export default function BookDetailsModal({ isOpen, onClose, book }: BookDetailsModalProps) {
  if (!book) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#15151e]/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-4xl max-h-[90vh] relative z-10 rounded-[32px] sm:rounded-[48px] shadow-2xl overflow-y-auto no-scrollbar glass p-4 sm:p-6"
          >
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
              {/* Image Section */}
              <div className="w-full md:w-2/5 aspect-[4/5] sm:aspect-[3/4] rounded-[24px] sm:rounded-[40px] overflow-hidden relative shadow-2xl shrink-0">
                {book.coverImage ? (
                  <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-forest flex items-center justify-center">
                    <BookOpen className="w-16 sm:w-20 h-16 sm:h-20 text-mint opacity-20" />
                  </div>
                )}
                
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                  <div className="glass-dark px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-mint border border-white/10 whitespace-nowrap">
                    {book.category}
                  </div>
                </div>

                <button onClick={onClose} className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 sm:p-3 bg-white/20 hover:bg-white/40 rounded-full transition-all text-white backdrop-blur-md z-20">
                  <X className="w-5 h-5 sm:w-6 h-6" />
                </button>
              </div>
              
              {/* Content Section */}
              <div className="flex-1 py-2 sm:py-4 md:pr-6 flex flex-col min-w-0">
                <div className="mb-8 sm:mb-12">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <span className="text-forest/40 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em]">Botanical Asset</span>
                  </div>
                  
                  <h2 className="text-4xl sm:text-5xl font-black text-forest tracking-tighter leading-[0.95] mb-4 break-words">
                    {book.title}
                  </h2>
                  <p className="text-lg sm:text-xl text-forest/60 font-bold uppercase tracking-widest leading-tight">
                    Manual by <span className="text-forest break-words">{book.author}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                   <div className="glass-dark p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] text-mint">
                      <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-mint/40 mb-1 sm:mb-2">Publish Date</p>
                      <p className="text-xl sm:text-2xl font-black">{book.publishedYear}</p>
                   </div>
                   <div className="glass p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] text-forest">
                      <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-forest/40 mb-1 sm:mb-2">Serial Number</p>
                      <p className="font-mono text-[10px] sm:text-xs font-bold truncate">{book.isbn}</p>
                   </div>
                </div>

                <div className={`p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] mb-8 flex items-center justify-between shadow-xl ${
                  book.available ? 'bg-mint text-forest' : 'bg-forest text-mint shadow-forest/20'
                }`}>
                  <div className="min-w-0">
                    <h3 className="text-xl sm:text-2xl font-black mb-1 leading-none truncate">{book.available ? 'In Stock' : 'Loaned Out'}</h3>
                    <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest opacity-60 leading-tight">
                      {book.available ? 'Ready for botanical study' : 'Asset is currently deployed elsewhere'}
                    </p>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-full shrink-0 ml-4 ${book.available ? 'bg-forest text-mint' : 'bg-mint text-forest'}`}>
                    {book.available ? <CheckCircle className="w-5 h-5 sm:w-6 h-6" /> : <XCircle className="w-5 h-5 sm:w-6 h-6" />}
                  </div>
                </div>

                <div className="mt-auto flex gap-4">
                  <button
                    onClick={onClose}
                    className="w-full bg-forest hover:bg-moss text-white py-4 sm:py-6 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-forest/20"
                  >
                    Close Resource
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
