import React from 'react';
import { Edit2, Trash2, BookOpen, ArrowRight } from 'lucide-react';
import { Book, Role } from '../types';
import { motion } from 'motion/react';

interface BookCardProps {
  book: Book;
  role: Role;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  onView: (book: Book) => void;
  key?: string | number;
}

export default function BookCard({ book, role, onEdit, onDelete, onView }: BookCardProps) {
  const isEmployee = role === Role.EMPLOYEE || role === Role.ADMIN;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group glass rounded-[40px] hover:shadow-premium transition-all duration-500 relative overflow-hidden flex flex-col p-4 bg-white/40"
    >
      {/* Cover Image Area */}
      <div className="aspect-[4/5] w-full rounded-[32px] overflow-hidden relative mb-6">
        {book.coverImage ? (
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
          />
        ) : (
          <div className="w-full h-full bg-[#0c2d21] flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-mint opacity-20" />
          </div>
        )}
        
        <div className="absolute top-4 left-4 z-10">
          <div className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest backdrop-blur-xl shadow-lg border border-white/20 ${
            book.available ? 'bg-mint/60 text-forest' : 'bg-black/30 text-white'
          }`}>
            {book.available ? 'In Stock' : 'Loaned'}
          </div>
        </div>

        <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/20 transition-colors duration-500" />

        <button 
          onClick={(e) => { e.stopPropagation(); onView(book); }}
          className="absolute bottom-4 right-4 bg-white text-forest h-12 w-12 rounded-full shadow-2xl translate-y-20 group-hover:translate-y-0 transition-all duration-500 hover:scale-110 flex items-center justify-center z-10"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="px-2 pb-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-forest/30">{book.category}</span>
        </div>
        
        <h3 className="text-xl font-bold tracking-tight text-forest mb-1 leading-tight group-hover:text-moss transition-colors font-serif italic">
          {book.title}
        </h3>
        <p className="text-[10px] font-black text-forest/40 uppercase tracking-[0.2em]">
           {book.author}
        </p>

        {isEmployee && (
          <div className="flex items-center gap-2 mt-6 pt-6 border-t border-forest/5">
            <button
              onClick={() => onEdit(book)}
              className="flex-1 bg-forest/5 hover:bg-forest hover:text-white p-2.5 rounded-full transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              onClick={() => onDelete(book.id)}
              className="p-2.5 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {!isEmployee && (
          <button 
            onClick={() => onView(book)}
            className="w-full mt-6 bg-forest hover:bg-forest/90 text-white py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all transition-all shadow-xl active:scale-95"
          >
            Read Manual
          </button>
        )}
      </div>
    </motion.div>
  );
}
