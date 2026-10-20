import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { cn } from '@/lib/utils.js';
import Logo from '@/components/Logo.jsx';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
            <Logo className="w-12 h-12 transition-transform duration-300 group-hover:scale-105" />
            <span className="text-xl sm:text-2xl font-bold font-heading tracking-tight text-foreground transition-colors duration-300">
              Raiwa<span className="text-primary"> Technologies</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-5 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-sm font-semibold transition-all duration-200 hover:text-primary relative py-2",
                    isActive 
                      ? "text-primary" 
                      : "text-foreground/80"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/contact">
              <Button className="bg-primary hover:bg-primary-light text-white font-bold px-6 shadow-luxury hover:shadow-luxury-hover transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className="p-2 rounded-lg transition-colors text-foreground hover:bg-muted"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-border shadow-lg animate-slide-up">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-base font-semibold transition-colors",
                    isActive 
                      ? "bg-primary-lighter-bg text-primary" 
                      : "text-foreground hover:bg-muted hover:text-primary"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4">
              <Link to="/contact" className="block">
                <Button className="w-full bg-primary hover:bg-primary-light text-white font-bold h-12">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;