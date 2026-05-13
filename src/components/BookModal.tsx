import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Upload, Image as ImageIcon, Trash2, CheckCircle } from 'lucide-react';
import { Book, Role } from '../types';
import { CATEGORIES } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: Partial<Book>) => void;
  book?: Book | null;
}

export default function BookModal({ isOpen, onClose, onSave, book }: BookModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Partial<Book>>({
    title: '',
    author: '',
    isbn: '',
    category: CATEGORIES[0],
    available: true,
    publishedYear: new Date().getFullYear(),
    coverImage: '',
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    } else {
      setFormData({
        title: '',
        author: '',
        isbn: '',
        category: CATEGORIES[0],
        available: true,
        publishedYear: new Date().getFullYear(),
        coverImage: '',
      });
    }
  }, [book, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, coverImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, coverImage: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#15151e]/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white/70 w-full max-w-lg relative z-10 rounded-[48px] shadow-2xl overflow-hidden glass p-8"
          >
            <div className="">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-black text-forest tracking-tighter leading-none">
                    {book ? 'Optimize' : 'Cultivate'} <span className="text-moss">Resource</span>
                  </h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-forest/40 mt-1">Botanical Asset Management</p>
                </div>
                <button onClick={onClose} className="p-3 hover:bg-forest/5 rounded-full transition-all text-forest/40">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload Section */}
                <div>
                  <div className="relative group">
                    {formData.coverImage ? (
                      <div className="relative h-56 w-full overflow-hidden rounded-[32px] shadow-xl border border-white/40">
                        <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-forest/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                          <button 
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-white text-forest p-3 rounded-full hover:scale-110 transition-transform"
                          >
                            <Upload className="w-5 h-5" />
                          </button>
                          <button 
                            type="button"
                            onClick={removeImage}
                            className="bg-red-500 text-white p-3 rounded-full hover:scale-110 transition-transform"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-56 border-2 border-dashed border-forest/10 bg-forest/[0.02] rounded-[32px] flex flex-col items-center justify-center gap-4 hover:bg-forest hover:text-white hover:border-transparent transition-all group"
                      >
                        <div className="bg-white p-4 rounded-full shadow-xl group-hover:scale-110 transition-transform">
                          <ImageIcon className="w-6 h-6 text-forest" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Upload Manual Cover</span>
                      </button>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <label className="absolute -top-2 left-6 px-2 bg-[#fdfefd] text-[8px] font-black uppercase tracking-widest text-forest/40 z-10">Manual Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-white/50 border border-forest/5 px-8 py-5 rounded-full text-sm font-bold text-forest placeholder:text-forest/20 focus:outline-none focus:ring-2 focus:ring-forest/5 focus:bg-white transition-all shadow-sm"
                      placeholder="E.G. TROPICAL BIOLOGY SPECIMENS"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="absolute -top-2 left-6 px-2 bg-[#fdfefd] text-[8px] font-black uppercase tracking-widest text-forest/40 z-10">Author</label>
                      <input
                        type="text"
                        required
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full bg-white/50 border border-forest/5 px-8 py-5 rounded-full text-sm font-bold text-forest focus:outline-none focus:ring-2 focus:ring-forest/5 focus:bg-white transition-all shadow-sm"
                      />
                    </div>
                    <div className="relative">
                      <label className="absolute -top-2 left-6 px-2 bg-[#fdfefd] text-[8px] font-black uppercase tracking-widest text-forest/40 z-10">Asset Number</label>
                      <input
                        type="text"
                        required
                        value={formData.isbn}
                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                        className="w-full bg-white/50 border border-forest/5 px-8 py-5 rounded-full text-sm font-bold text-forest focus:outline-none focus:ring-2 focus:ring-forest/5 focus:bg-white transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="absolute -top-2 left-6 px-2 bg-[#fdfefd] text-[8px] font-black uppercase tracking-widest text-forest/40 z-10">Knowledge Area</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-white/50 border border-forest/5 px-8 py-5 rounded-full text-sm font-bold text-forest focus:outline-none focus:ring-2 focus:ring-forest/5 focus:bg-white transition-all shadow-sm appearance-none"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                        ))}
                      </select>
                    </div>
                    <div className="relative">
                      <label className="absolute -top-2 left-6 px-2 bg-[#fdfefd] text-[8px] font-black uppercase tracking-widest text-forest/40 z-10">Catalog Year</label>
                      <input
                        type="number"
                        required
                        value={formData.publishedYear}
                        onChange={(e) => setFormData({ ...formData, publishedYear: parseInt(e.target.value) })}
                        className="w-full bg-white/50 border border-forest/5 px-8 py-5 rounded-full text-sm font-bold text-forest focus:outline-none focus:ring-2 focus:ring-forest/5 focus:bg-white transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-forest/5 p-4 rounded-full">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      id="available"
                      checked={formData.available}
                      onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                      className="w-6 h-6 rounded-full border-2 border-forest/20 appearance-none bg-white checked:bg-forest checked:border-forest transition-all cursor-pointer"
                    />
                    {formData.available && <CheckCircle className="absolute pointer-events-none w-4 h-4 text-mint" />}
                  </div>
                  <label htmlFor="available" className="text-[10px] font-black uppercase tracking-widest text-forest/60 cursor-pointer">Register as Available Resource</label>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-forest hover:bg-forest/90 text-white py-6 rounded-full text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-forest/20 active:scale-95"
                  >
                    <Save className="w-5 h-5 text-mint" />
                    {book ? 'Update Entry' : 'Cultivate Asset'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
