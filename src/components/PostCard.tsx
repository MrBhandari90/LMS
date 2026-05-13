import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, MessageSquare, Heart, Share2, AlertTriangle, ExternalLink, User } from 'lucide-react';
import { BlogPost, Role } from '../types';

interface PostCardProps {
  key?: string;
  post: BlogPost;
  currentUserId: string;
  currentUserRole: Role;
  onDelete: (postId: string) => void;
  onLike: (postId: string) => void;
  onReport: (postId: string) => void;
}

export default function PostCard({ post, currentUserId, currentUserRole, onDelete, onLike, onReport }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const canDelete = 
    currentUserRole === Role.ADMIN || 
    currentUserRole === Role.EMPLOYEE || 
    post.authorId === currentUserId;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-[40px] p-6 sm:p-8 shadow-premium border border-white/40 hover:shadow-premium transition-all duration-500 relative group bg-white/40 backdrop-blur-xl"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center border-2 border-mint/20 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
            <User className="w-6 h-6 text-mint relative z-10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-forest tracking-tight font-serif italic">{post.authorName}</h4>
              <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-[2px] shadow-sm ${
                post.authorRole === Role.ADMIN ? 'bg-forest text-mint' : 
                post.authorRole === Role.EMPLOYEE ? 'bg-moss text-mint' : 'glass text-forest/40'
              }`}>
                {post.authorRole}
              </span>
            </div>
            <p className="text-[10px] font-black text-forest/30 uppercase tracking-[0.2em] mt-1">
              {new Date(post.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => onReport(post.id)}
            className="p-2.5 text-forest/20 hover:text-orange-400 hover:bg-orange-50/50 rounded-full transition-all"
            title="Report Inappropriate Content"
          >
            <AlertTriangle className="w-4 h-4" />
          </button>
          
          {canDelete && (
            <button 
              onClick={() => onDelete(post.id)}
              className="p-2.5 text-forest/20 hover:text-red-500 hover:bg-red-50/50 rounded-full transition-all"
              title="Prune Post"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-forest/80 text-sm font-medium leading-relaxed whitespace-pre-wrap font-sans">
          {post.content}
        </p>

        {post.media && (
          <div className="rounded-[32px] overflow-hidden border border-forest/5 shadow-inner bg-forest/5 group/post-img relative">
            {post.media.type === 'image' || post.media.type === 'gif' ? (
              <img src={post.media.url} alt="Post content" className="w-full h-full object-cover max-h-[500px] transition-transform duration-1000 group-hover/post-img:scale-105" />
            ) : (
              <a href={post.media.url} target="_blank" rel="noopener noreferrer" className="p-8 flex items-center justify-between hover:bg-forest hover:text-white transition-all group/link bg-white/40">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-white/50 group-hover/link:bg-white/20">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest block opacity-60">External Protocol</span>
                    <span className="text-sm font-black tracking-tight truncate max-w-[200px] block">{post.media.url}</span>
                  </div>
                </div>
                <Share2 className="w-5 h-5 opacity-40" />
              </a>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-forest/5">
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => {
                setIsLiked(!isLiked);
                onLike(post.id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                isLiked ? 'bg-red-50 text-red-500' : 'bg-forest/5 text-forest/60 hover:bg-forest/10 hover:text-forest'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-[10px] font-black uppercase tracking-widest">{post.likes + (isLiked ? 1 : 0)}</span>
            </button>

            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-forest/5 text-forest/60 hover:bg-forest/10 hover:text-forest transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">{post.comments.length}</span>
            </button>
          </div>

          <button className="p-3 text-forest/40 hover:text-forest hover:bg-forest/5 rounded-full transition-all">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden"
            >
              <div className="pt-4 space-y-4">
                {post.comments.map(comment => (
                  <div key={comment.id} className="flex gap-4 p-4 rounded-[24px] bg-forest/[0.02]">
                    <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-forest/40" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black text-forest uppercase tracking-widest">{comment.authorName}</span>
                        <span className="text-[8px] font-bold text-forest/20 uppercase tracking-widest">
                          {new Date(comment.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-forest/70 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
                
                <div className="relative mt-4">
                  <input 
                    type="text" 
                    placeholder="Contribute to dialogue..."
                    className="w-full bg-white/50 border border-forest/10 px-6 py-4 rounded-full text-xs font-bold text-forest placeholder:text-forest/20 focus:outline-none focus:ring-4 focus:ring-forest/[0.03] transition-all"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-forest text-mint p-2 rounded-full shadow-lg">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
