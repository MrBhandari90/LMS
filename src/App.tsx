import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Filter, ArrowRight, Library, Trophy, Globe, Zap, ShieldCheck, Trash2, LayoutGrid, List, Asterisk } from 'lucide-react';
import { Book, Role } from './types';
import { INITIAL_BOOKS, CATEGORIES } from './constants';
import Navbar from './components/Navbar';
import BookCard from './components/BookCard';
import BookTable from './components/BookTable';
import BookModal from './components/BookModal';
import BookDetailsModal from './components/BookDetailsModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import LoginModal from './components/LoginModal';
import ContactSection from './components/ContactSection';
import BlogSection from './components/BlogSection';
import LoadingScreen from './components/LoadingScreen';
import { motion, AnimatePresence } from 'motion/react';
import { BlogPost } from './types';

import { BrowserRouter as Router, Routes, Route, ScrollRestoration } from 'react-router-dom';
import Home from './pages/Home';
import BlogPage from './pages/BlogPage';

const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    authorName: 'Adrian Newey',
    authorRole: Role.ADMIN,
    authorId: 'admin-1',
    content: 'Observing a fascinating specimen of Monstere Deliciosa showing high adaptive resistance in high-humidity environment. Analyzing leaf structure for biological structural engineering insights.',
    timestamp: new Date().toISOString(),
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=1000'
    },
    likes: 42,
    comments: [
      { id: 'c1', authorName: 'Botanist X', authorRole: Role.STUDENT, content: 'Excellent documentation! The vein structure is indeed remarkable.', timestamp: new Date().toISOString() }
    ]
  },
  {
    id: 'post-2',
    authorName: 'Knowledge Bot',
    authorRole: Role.EMPLOYEE,
    authorId: 'emp-1',
    content: 'New manual on Tropical Biology Specimens has been added to the primary archive. Level 2 clearance required for checkout.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    likes: 12,
    comments: []
  }
];

export default function App() {
  const [role, setRole] = useState<Role>(Role.STUDENT);
  const [targetRole, setTargetRole] = useState<Role>(Role.STUDENT);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('apex_library_books');
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [viewingBook, setViewingBook] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('apex_library_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  useEffect(() => {
    localStorage.setItem('apex_library_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('apex_library_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    // Simulate initial system load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [books, searchQuery, selectedCategory]);

  const handleRoleChange = (newRole: Role) => {
    if (newRole === Role.STUDENT) {
      setRole(newRole);
    } else {
      setTargetRole(newRole);
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = (authenticatedRole: Role) => {
    setRole(authenticatedRole);
    setIsLoginModalOpen(false);
  };

  const handleAddBook = (newBook: Partial<Book>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setBooks([...books, { ...newBook, id, addedAt: new Date().toISOString() } as Book]);
    setIsModalOpen(false);
  };

  const handleUpdateBook = (updatedBook: Partial<Book>) => {
    setBooks(books.map(b => b.id === updatedBook.id ? { ...b, ...updatedBook } as Book : b));
    setEditingBook(null);
    setIsModalOpen(false);
  };

  const handleDeleteBook = (id: string) => {
    const book = books.find(b => b.id === id);
    if (book) {
      setBookToDelete(book);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDelete = () => {
    if (bookToDelete) {
      setBooks(books.filter(b => b.id !== bookToDelete.id));
      setBookToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const openAddModal = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const openEditModal = (book: Book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleViewBook = (book: Book) => {
    setViewingBook(book);
    setIsDetailsOpen(true);
  };

  const handleAddPost = (newPost: Partial<BlogPost>) => {
    const post: BlogPost = {
      id: `post-${Date.now()}`,
      authorName: role === Role.STUDENT ? 'Knowledge Seeker' : role === Role.EMPLOYEE ? 'Archive Specialist' : 'Central Admin',
      authorRole: role,
      authorId: 'current-user',
      content: newPost.content || '',
      timestamp: new Date().toISOString(),
      media: newPost.media,
      likes: 0,
      comments: []
    };
    setPosts([post, ...posts]);
  };

  const handleDeletePost = (id: string) => {
    if (confirm('TERMINATE FEEDBACK: Are you sure you want to permanently prune this broadcast from the network?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  const handleLikePost = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleReportPost = (id: string) => {
    alert('PROTOCOL ALERT: Content has been reported to botanical moderators for immediate audit.');
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      
      <div className="min-h-screen bg-[#fdfefd] font-sans text-forest overflow-x-hidden selection:bg-mint selection:text-forest flex flex-col">
        <Navbar currentRole={role} setRole={handleRoleChange} />
        
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                <Home 
                  role={role}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  filteredBooks={filteredBooks}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  openAddModal={openAddModal}
                  openEditModal={openEditModal}
                  handleDeleteBook={handleDeleteBook}
                  handleViewBook={handleViewBook}
                />
              } />
              <Route path="/blog" element={
                <BlogPage 
                  posts={posts}
                  role={role}
                  onAddPost={handleAddPost}
                  onDeletePost={handleDeletePost}
                  onLikePost={handleLikePost}
                  onReportPost={handleReportPost}
                />
              } />
            </Routes>
          </AnimatePresence>
        </div>

        {/* Community Section from image */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20">
          <div className="relative min-h-[400px] sm:h-[500px] rounded-[30px] sm:rounded-[40px] overflow-hidden flex items-center justify-center text-center p-6 sm:p-12 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&q=80&w=2000" 
              alt="community" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-forest/70 backdrop-blur-md" />
            <div className="relative z-10 w-full max-w-3xl">
              <h2 className="text-white text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-none font-serif italic">Join the <br /> <span className="font-sans not-italic">community!</span></h2>
              <p className="text-mint/70 font-bold uppercase tracking-[0.3em] text-[10px] sm:text-[11px] mb-10 sm:mb-12 max-w-sm mx-auto leading-relaxed">
                Subscribe to The Library for monthly technical growth tips.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {['Instagram', 'Twitter', 'LinkedIn', 'Github'].map(social => (
                  <button 
                    key={social} 
                    className="px-8 sm:px-10 py-4 glass rounded-full text-white text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-forest transition-all shadow-premium active:scale-95 border border-white/20 backdrop-blur-xl"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-forest text-white pt-16 sm:pt-24 pb-8 sm:pb-12 mt-auto">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16 sm:mb-20">
              <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-mint p-2.5 rounded-full shadow-lg">
                    <Asterisk className="w-5 h-5 text-forest" />
                  </div>
                  <span className="text-2xl font-black tracking-tighter uppercase select-none">
                    knowledge<span className="text-mint">petal</span>
                  </span>
                </div>
                <p className="text-mint/50 font-medium text-sm max-w-sm mb-8 leading-relaxed">
                  Nurturing the world's most comprehensive repository of botanical engineering, ecology, and technical growth literature. Our archive is maintained by biological architects.
                </p>
              </div>

              <div className="col-span-1 lg:col-span-1">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-mint/40 mb-6">Discovery</h4>
                <ul className="space-y-4 text-xs font-bold uppercase tracking-[0.2em] text-mint/80">
                  <li className="hover:text-white hover:translate-x-1 cursor-pointer transition-all">Catalog</li>
                  <li className="hover:text-white hover:translate-x-1 cursor-pointer transition-all">Resources</li>
                  <li className="hover:text-white hover:translate-x-1 cursor-pointer transition-all">Growth Tips</li>
                </ul>
              </div>

              <div className="col-span-1 lg:col-span-1">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-mint/40 mb-6">Legal</h4>
                <ul className="space-y-4 text-xs font-bold uppercase tracking-[0.2em] text-mint/80">
                  <li className="hover:text-white hover:translate-x-1 cursor-pointer transition-all">Privacy</li>
                  <li className="hover:text-white hover:translate-x-1 cursor-pointer transition-all">Terms</li>
                  <li className="hover:text-white hover:translate-x-1 cursor-pointer transition-all">Ethics</li>
                </ul>
              </div>

              <div className="col-span-1 lg:col-span-1">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-mint/40 mb-6">Systems</h4>
                <ul className="space-y-4 text-xs font-bold uppercase tracking-[0.2em] text-mint/80">
                  <li className="hover:text-white hover:translate-x-1 cursor-pointer transition-all">Integrity</li>
                  <li className="hover:text-white hover:translate-x-1 cursor-pointer transition-all">Archive</li>
                  <li className="hover:text-white hover:translate-x-1 cursor-pointer transition-all">Support</li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-mint/20 text-center sm:text-left">
                  © 2026 KNOWLEDGE PETAL SYSTEMS. ALL RIGHTS RESERVED.
                </p>
                <div className="flex gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-mint/10" />
                   <div className="w-1.5 h-1.5 rounded-full bg-mint/20" />
                   <div className="w-1.5 h-1.5 rounded-full bg-mint/30" />
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-30 hover:opacity-100 transition-opacity">
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-mint">Powered by Antigravity AI</span>
                <div className="w-4 h-4 bg-mint rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </footer>

        <BookModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={editingBook ? handleUpdateBook : handleAddBook}
          book={editingBook}
        />

        <BookDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          book={viewingBook}
        />

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title={bookToDelete?.title || ''}
        />

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLoginSuccess}
          targetRole={targetRole}
        />
      </div>
    </Router>
  );
}
