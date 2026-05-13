import React, { useState, useEffect } from 'react';
import { Search, Asterisk } from 'lucide-react';
import { Role } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

interface NavbarProps {
  currentRole: Role;
  setRole: (role: Role) => void;
}

export default function Navbar({ currentRole, setRole }: NavbarProps) {
  const [showSecondary, setShowSecondary] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY > 300 || location.pathname !== '/') {
        setShowSecondary(true);
      } else {
        setShowSecondary(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const roles = [
    { id: Role.STUDENT, label: 'Student' },
    { id: Role.EMPLOYEE, label: 'Employee' },
    { id: Role.ADMIN, label: 'Admin' },
  ];

  const handleRoleClick = (role: Role) => {
    setRole(role);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const scrollToContact = () => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'contact' } });
    } else {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
      <div className="pt-4 sm:pt-6 px-4 flex justify-center w-full pointer-events-auto">
        <nav className={`glass rounded-full p-1.5 flex items-center gap-1 sm:gap-2 w-full max-w-fit overflow-x-auto no-scrollbar shadow-xl transition-all duration-500 ${isScrolled ? 'scale-95 opacity-90 hover:scale-100 hover:opacity-100' : ''}`}>
          <Link to="/" className="flex items-center gap-3 px-3 sm:px-4 sm:pr-6 border-r border-forest/10 mr-1 sm:mr-2 shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-forest flex items-center justify-center shadow-lg">
              <Asterisk className="w-5 h-5 text-mint" />
            </div>
            <span className="hidden sm:inline text-xs font-black uppercase tracking-tighter text-forest">knowledge</span>
          </Link>

          <div className="flex items-center gap-1 shrink-0">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleClick(role.id)}
                className={`px-4 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  currentRole === role.id 
                    ? 'bg-forest text-white shadow-md scale-105' 
                    : 'text-forest/60 hover:text-forest hover:bg-forest/5'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-2 ml-2 sm:ml-4 pl-2 sm:pl-4 border-l border-forest/10 shrink-0">
            <button className="p-2 text-forest/60 hover:text-forest transition-colors hidden xs:flex">
              <Search className="w-4 h-4" />
            </button>
            <button className="px-4 sm:px-5 py-2 glass rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-forest transition-all hover:bg-forest hover:text-white whitespace-nowrap shadow-sm">
              Shop
            </button>
            <button className="px-4 sm:px-5 py-2 glass rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-forest transition-all hover:bg-forest hover:text-white whitespace-nowrap shadow-sm hidden md:flex">
              Log in
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {showSecondary && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 pointer-events-auto"
          >
            <nav className="glass rounded-full px-6 py-2 shadow-lg border border-white/50 flex items-center gap-6">
              <button 
                onClick={scrollToContact}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all ${location.pathname === '/' ? 'text-forest' : 'text-forest/60 hover:text-forest'}`}
              >
                Home
              </button>
              <div className="w-1 h-1 rounded-full bg-forest/20" />
              <button 
                onClick={() => navigate('/blog')}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all ${location.pathname === '/blog' ? 'text-forest' : 'text-forest/60 hover:text-forest'}`}
              >
                Blog
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
