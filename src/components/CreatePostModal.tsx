import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Image as ImageIcon, Link as LinkIcon, Send, Trash2, Globe, User } from 'lucide-react';
import { Role, BlogPost } from '../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Partial<BlogPost>) => void;
  currentUser: { name: string; role: Role; id: string };
}

export default function CreatePostModal({ isOpen, onClose, onSubmit, currentUser }: CreatePostModalProps) {
  const [content, setContent] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'gif' | 'link' | null>(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
        setMediaUrl(reader.result as string);
        setMediaType('image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit({
      content,
      media: mediaType && mediaUrl ? {
        type: mediaType,
        url: mediaUrl,
        preview: mediaPreview || undefined
      } : undefined
    });

    handleClose();
  };

  const handleClose = () => {
    setContent('');
    setMediaType(null);
    setMediaUrl('');
    setMediaPreview(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-forest/80 backdrop-blur-md"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-lg relative z-10 rounded-[48px] shadow-2xl overflow-hidden glass p-8"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-forest flex items-center justify-center">
                    <User className="w-4 h-4 text-mint" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-forest/40">Knowledge Broadcast</span>
                </div>
                <h2 className="text-3xl font-black text-forest tracking-tighter leading-none">
                  Draft <span className="text-moss">Update</span>
                </h2>
              </div>
              <button onClick={handleClose} className="p-3 hover:bg-forest/5 rounded-full transition-all text-forest/40">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <textarea
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="WHAT'S EVOLVING IN YOUR DOMAIN?"
                  className="w-full bg-forest/5 border border-transparent px-8 py-8 rounded-[32px] text-sm font-bold text-forest placeholder:text-forest/20 focus:outline-none focus:bg-white focus:ring-4 focus:ring-forest/[0.03] transition-all shadow-inner h-40 resize-none"
                />
              </div>

              {mediaPreview && (
                <div className="relative rounded-[32px] overflow-hidden shadow-xl border border-white/40 group">
                  <img src={mediaPreview} alt="Preview" className="w-full h-48 object-cover" />
                  <button 
                    type="button"
                    onClick={() => {
                      setMediaPreview(null);
                      setMediaUrl('');
                      setMediaType(null);
                    }}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:scale-110 transition-transform"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {mediaType === 'link' && !mediaPreview && (
                <div className="relative group/link">
                  <label className="absolute -top-3 left-6 px-2 bg-[#fdfefd] text-[8px] font-black uppercase tracking-[0.4em] text-forest/40">Resource URL</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/20" />
                    <input
                      type="url"
                      value={mediaUrl}
                      onChange={(e) => setMediaUrl(e.target.value)}
                      className="w-full bg-white/50 border border-forest/10 px-14 py-5 rounded-full text-sm font-bold text-forest placeholder:text-forest/20 focus:outline-none focus:ring-4 focus:ring-forest/[0.03] focus:bg-white transition-all shadow-sm"
                      placeholder="HTTPS://RESOURCE.ARCHIVE.NET"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-4 rounded-full transition-all ${mediaType === 'image' ? 'bg-forest text-mint shadow-lg' : 'bg-forest/5 text-forest/40 hover:bg-forest/10'}`}
                    title="Attach Visual Asset"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (mediaType === 'link') {
                        setMediaType(null);
                        setMediaUrl('');
                      } else {
                        setMediaType('link');
                        setMediaUrl('');
                      }
                    }}
                    className={`p-4 rounded-full transition-all ${mediaType === 'link' ? 'bg-forest text-mint shadow-lg' : 'bg-forest/5 text-forest/40 hover:bg-forest/10'}`}
                    title="Reference Link"
                  >
                    <LinkIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="p-4 rounded-full bg-forest/5 text-forest/40 hover:bg-forest/10 transition-all font-black text-xs px-6"
                  >
                    GIF
                  </button>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                <button
                  type="submit"
                  className="bg-forest hover:bg-forest/90 text-white px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all shadow-2xl shadow-forest/20 active:scale-95"
                >
                  <Send className="w-4 h-4 text-mint" />
                  Broadcast Post
                </button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-forest/5 text-center">
              <p className="text-[8px] font-black text-forest/20 uppercase tracking-[0.4em]">
                Your update will be stored in the botanical network for authorized retrieval.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
