import React from 'react';
import { Edit2, Trash2, CheckCircle, XCircle, Info } from 'lucide-react';
import { Book, Role } from '../types';
import { motion } from 'motion/react';

interface BookTableProps {
  books: Book[];
  role: Role;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  onView: (book: Book) => void;
}

export default function BookTable({ books, role, onEdit, onDelete, onView }: BookTableProps) {
  return (
    <div className="overflow-x-auto no-scrollbar glass rounded-[32px] shadow-2xl border border-white/50">
      <table className="w-full text-left border-collapse min-w-[800px] lg:min-w-full">
        <thead>
          <tr className="bg-forest text-mint">
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-mint/40">Status</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-mint/40">Visual</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-mint/40">Identity</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-mint/40 hidden md:table-cell">Category</th>
            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-mint/40 text-right">Operational Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-forest/5">
          {books.map((book) => (
            <motion.tr 
              layout
              key={book.id} 
              className="hover:bg-forest/5 transition-colors group"
            >
              <td className="px-8 py-6">
                {book.available ? (
                  <div className="flex items-center gap-2 text-forest">
                    <div className="w-2 h-2 rounded-full bg-forest animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">In Stock</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-forest/40">
                    <div className="w-2 h-2 rounded-full bg-forest/20" />
                    <span className="text-[10px] font-black uppercase tracking-widest italic whitespace-nowrap">Loaned</span>
                  </div>
                )}
              </td>
              <td className="px-8 py-6">
                <div className="w-12 h-16 bg-white rounded-xl overflow-hidden shadow-lg border border-forest/5 transition-transform group-hover:scale-110">
                  {book.coverImage ? (
                    <img src={book.coverImage} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-forest/5 flex items-center justify-center">
                      <span className="text-[8px] font-black uppercase text-forest/20">Empty</span>
                    </div>
                  )}
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="font-black text-forest text-lg tracking-tight mb-0.5 max-w-[200px] sm:max-w-xs truncate">
                  {book.title}
                </div>
                <div className="text-[10px] font-bold text-forest/40 uppercase tracking-widest whitespace-nowrap">
                  {book.author}
                </div>
              </td>
              <td className="px-8 py-6 hidden md:table-cell">
                <span className="px-4 py-1.5 glass rounded-full text-[10px] font-black uppercase tracking-widest text-forest/60 whitespace-nowrap">
                  {book.category}
                </span>
              </td>
              <td className="px-8 py-6 text-right">
                <div className="flex justify-end gap-2 group-hover:gap-3 transition-all">
                  <button
                    onClick={() => onView(book)}
                    className="p-3 text-forest hover:bg-forest hover:text-white rounded-full transition-all shadow-sm bg-white border border-forest/5"
                    title="View Technical Details"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(book)}
                    className="p-3 text-forest hover:bg-forest hover:text-white rounded-full transition-all shadow-sm bg-white border border-forest/5"
                    title="Update Asset"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(book.id)}
                    className="p-3 text-red-600 hover:bg-red-600 hover:text-white rounded-full transition-all shadow-sm bg-white border border-forest/5"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
