import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, Filter, MessageSquare, Sparkles, TrendingUp, Users } from 'lucide-react';
import { BlogPost, Role } from '../types';
import PostCard from './PostCard';
import CreatePostModal from './CreatePostModal';

interface BlogSectionProps {
  posts: BlogPost[];
  role: Role;
  onAddPost: (post: Partial<BlogPost>) => void;
  onDeletePost: (postId: string) => void;
  onLikePost: (postId: string) => void;
  onReportPost: (postId: string) => void;
}

export default function BlogSection({ posts, role, onAddPost, onDeletePost, onLikePost, onReportPost }: BlogSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'recent'>('recent');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }).sort((a, b) => {
    if (activeFilter === 'popular') return b.likes - a.likes;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <section id="blog" className="py-24 px-4 bg-[#fdfefd]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar / Info */}
          <div className="lg:w-1/3 xl:w-1/4">
            <div className="sticky top-32 space-y-8">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="w-12 h-[2px] bg-forest/20" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-forest/40">Network Feed</span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl sm:text-6xl font-black text-forest tracking-tighter leading-none mb-8"
                >
                  Growth <br /> <span className="text-moss">Dialogues</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-forest/60 font-medium leading-relaxed mb-8"
                >
                  An interconnected digital garden where biological architects share technical updates, specimens, and research findings.
                </motion.p>
                
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-forest hover:bg-forest/90 text-white px-8 py-6 rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all shadow-2xl shadow-forest/20 active:scale-95"
                >
                  <Plus className="w-5 h-5 text-mint" />
                  Cultivate Update
                </motion.button>
              </div>

              <div className="glass p-8 rounded-[40px] space-y-6 shadow-xl border border-white/50">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-forest/30 mb-2">Network Insights</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-mint rounded-full">
                        <Users className="w-4 h-4 text-forest" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-forest">Architects</span>
                    </div>
                    <span className="text-sm font-black text-forest">1,204</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-mint rounded-full">
                        <TrendingUp className="w-4 h-4 text-forest" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-forest">Engagement</span>
                    </div>
                    <span className="text-sm font-black text-forest">+24%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="flex-1">
            <div className="glass p-4 sm:p-6 rounded-[40px] mb-12 flex flex-col sm:flex-row gap-6 items-stretch justify-between shadow-lg border border-white/50">
              <div className="relative flex-1 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/20 group-focus-within:text-forest transition-colors" />
                <input
                  type="text"
                  placeholder="FILTER DIALOGUES..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 sm:py-5 bg-white/50 border border-forest/10 rounded-full text-xs font-bold uppercase tracking-widest focus:outline-none focus:bg-white focus:ring-4 focus:ring-forest/[0.03] transition-all shadow-inner"
                />
              </div>

              <div className="flex glass p-1.5 rounded-full border border-forest/5">
                {[
                  { id: 'recent', icon: Sparkles, label: 'Recent' },
                  { id: 'popular', icon: TrendingUp, label: 'Popular' }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all ${
                      activeFilter === filter.id ? 'bg-forest text-white shadow-xl px-8' : 'text-forest/40 hover:text-forest'
                    }`}
                  >
                    <filter.icon className="w-3.5 h-3.5" />
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              <div className="space-y-8">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map(post => (
                    <PostCard
                      key={post.id}
                      post={post}
                      currentUserId="user-1" // In a real app this comes from auth
                      currentUserRole={role}
                      onDelete={onDeletePost}
                      onLike={onLikePost}
                      onReport={onReportPost}
                    />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-32 text-center glass rounded-[48px] border border-white/50"
                  >
                    <div className="bg-mint w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                      <MessageSquare className="w-10 h-10 text-forest" />
                    </div>
                    <h3 className="text-3xl font-black text-forest tracking-tighter mb-4">Garden Silence</h3>
                    <p className="text-forest/40 font-bold uppercase tracking-[0.2em] text-[10px] max-w-xs mx-auto">
                      No updates found matching your filter parameters. Be the first to plant a seed.
                    </p>
                  </motion.div>
                )}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onAddPost}
        currentUser={{ name: 'Admin Architect', role: role, id: 'user-1' }}
      />
    </section>
  );
}
