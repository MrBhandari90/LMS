import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, ArrowRight, LayoutGrid, List } from 'lucide-react';
import { Book, Role } from '../types';
import { CATEGORIES } from '../constants';
import BookCard from '../components/BookCard';
import BookTable from '../components/BookTable';
import ContactSection from '../components/ContactSection';
import { useLocation } from 'react-router-dom';

interface HomeProps {
  role: Role;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  filteredBooks: Book[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  openAddModal: () => void;
  openEditModal: (book: Book) => void;
  handleDeleteBook: (id: string) => void;
  handleViewBook: (book: Book) => void;
}

export default function Home({
  role,
  viewMode,
  setViewMode,
  filteredBooks,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  openAddModal,
  openEditModal,
  handleDeleteBook,
  handleViewBook
}: HomeProps) {
  const location = useLocation();

  React.useEffect(() => {
    if (location.state && (location.state as any).scrollTo === 'contact') {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Clear state to avoid scrolling again on manual refreshes/navigates
        window.history.replaceState({}, document.title);
      }
    }
  }, [location]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden px-4">
        <div className="max-w-[1400px] mx-auto relative h-[500px] sm:h-[600px] md:h-[700px] rounded-[30px] sm:rounded-[40px] overflow-hidden shadow-2xl flex items-center justify-center">
          <div className="absolute inset-0 bg-forest">
            <img 
              src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&q=80&w=2000" 
              alt="Lush Plants" 
              className="w-full h-full object-cover opacity-50 mix-blend-overlay scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/30 to-transparent" />
          </div>

          <div className="relative flex flex-col items-center justify-center text-center p-6 sm:p-12 z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl flex flex-col items-center"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-mint text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] drop-shadow-sm">Petal Power</span>
              </div>
              
              <h1 className="text-white text-6xl sm:text-8xl md:text-[140px] lg:text-[180px] font-black tracking-tighter leading-[0.8] mb-8 select-none text-center w-full font-serif italic">
                growth
              </h1>
              
              <div className="glass rounded-[24px] sm:rounded-[32px] inline-block mb-10 sm:mb-12 shadow-premium border border-white/10 mx-auto backdrop-blur-xl">
                <p className="text-forest text-xs sm:text-sm md:text-base font-medium max-w-lg leading-relaxed text-center px-6 sm:px-12 py-6 sm:py-8">
                  We're your online technical library destination. We offer a wide range of houseplant biology and ecological engineering manuals, shipped directly from our knowledge house to yours!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
                <button className="w-full sm:w-auto bg-white text-forest px-8 sm:px-10 py-4 sm:py-5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest hover:bg-mint hover:scale-105 transition-all shadow-xl active:scale-95">
                  shop New books
                </button>
                <div className="flex items-center justify-center gap-4 text-white/80 hover:text-white transition-colors cursor-pointer group w-full sm:w-auto">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-all">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-90" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap">Explore collection</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-8 md:-mt-16 lg:-mt-24 relative z-20 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="md:col-span-1 glass p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] shadow-xl hover:-translate-y-1 transition-transform border border-white/40">
            <h3 className="text-3xl sm:text-4xl font-black mb-2 text-forest tracking-tighter">100+ Asset</h3>
            <p className="text-[10px] sm:text-xs font-bold text-forest/50 uppercase leading-relaxed max-w-[200px]">
              We want our readers to be inspired to get their hands dirty.
            </p>
          </div>
          <div className="md:col-span-2 glass p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] flex items-center justify-between shadow-xl hover:-translate-y-1 transition-transform border border-white/40">
            <div>
              <h3 className="text-xl sm:text-2xl font-black mb-1 text-forest tracking-tight leading-none mb-2">Technical Library</h3>
              <p className="text-[10px] sm:text-xs font-bold text-forest/50 uppercase leading-relaxed max-w-md">
                Each manual is curated by our botanical experts, so they are as happy and technical as they get.
              </p>
            </div>
            <div className="bg-forest p-4 rounded-full shadow-lg shrink-0 ml-4 group cursor-pointer hover:rotate-90 transition-transform">
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-mint" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 sm:mb-20 pb-8 border-b border-forest/5">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 w-full sm:w-auto">
             {['All', ...CATEGORIES].map(cat => (
               <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                    selectedCategory === cat 
                    ? 'bg-forest text-mint shadow-xl scale-105' 
                    : 'glass text-forest/40 hover:text-forest hover:bg-white'
                  }`}
               >
                 {cat}
               </button>
             ))}
          </div>
          <button className="w-full sm:w-auto px-8 py-3 glass rounded-full text-[10px] font-black uppercase tracking-widest text-forest/40 hover:text-forest hover:bg-white transition-all shadow-sm">
            See All
          </button>
        </div>

        {(role === Role.EMPLOYEE || role === Role.ADMIN) && (
          <div className="glass p-4 sm:p-6 rounded-[28px] sm:rounded-[32px] mb-12 sm:mb-20 flex flex-col xl:flex-row gap-4 sm:gap-6 items-stretch justify-between shadow-lg border border-white/50">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/30 group-focus-within:text-forest transition-colors" />
                <input
                  type="text"
                  placeholder="SEARCH THE ARCHIVE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 sm:py-5 bg-white/60 border border-forest/5 rounded-full text-xs font-bold uppercase tracking-wider focus:outline-none focus:bg-white focus:ring-4 focus:ring-forest/[0.03] transition-all shadow-inner"
                />
              </div>
            </div>

            <button
              onClick={openAddModal}
              className="bg-forest hover:bg-moss text-mint px-8 sm:px-10 py-4 sm:py-5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-2xl active:scale-95 shrink-0"
            >
              <Plus className="w-5 h-5" />
              Add New Registry
            </button>
          </div>
        )}

        <div className="mb-12 sm:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-[2px] bg-forest/20" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-forest/40">Latest additions</span>
              </div>
              <h2 className="text-5xl sm:text-7xl font-black text-forest tracking-tighter leading-[0.9] mb-6 font-serif">
                Curated <br className="hidden sm:block" /> <span className="italic font-light">Collection</span>
              </h2>
              <p className="text-forest/60 font-medium text-sm sm:text-base leading-relaxed max-w-lg">
                Bring nature inside and shop our big selection of fresh indoor manuals, including plant-friendly coding guides, orchid architecture, and more.
              </p>
            </div>
            
            {(role === Role.EMPLOYEE || role === Role.ADMIN) && (
              <div className="flex glass p-1.5 rounded-full shadow-lg border border-white/50 self-start lg:self-auto">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 sm:p-3 rounded-full transition-all duration-300 ${viewMode === 'grid' ? 'bg-forest text-mint shadow-xl' : 'text-forest/30 hover:text-forest'}`}
                >
                  <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 sm:p-3 rounded-full transition-all duration-300 ${viewMode === 'list' ? 'bg-forest text-mint shadow-xl' : 'text-forest/30 hover:text-forest'}`}
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {viewMode === 'list' && (role === Role.EMPLOYEE || role === Role.ADMIN) ? (
              <BookTable
                books={filteredBooks}
                role={role}
                onEdit={openEditModal}
                onDelete={handleDeleteBook}
                onView={handleViewBook}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 xl:gap-10">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    role={role}
                    onEdit={openEditModal}
                    onDelete={handleDeleteBook}
                    onView={handleViewBook}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          {filteredBooks.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-24 sm:py-32 text-center glass rounded-[32px] sm:rounded-[40px] border border-white/50"
            >
              <div className="bg-mint w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Search className="w-7 h-7 sm:w-8 sm:h-8 text-forest" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-forest tracking-tight">No Manuals Found</p>
              <p className="text-forest/40 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] mt-4 max-w-xs mx-auto">
                Try broadening your botanical search parameters.
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <ContactSection />
    </>
  );
}
