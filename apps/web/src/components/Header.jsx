import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Code2, Megaphone, Palette, BriefcaseBusiness, Search, Smartphone, Settings, ShoppingBag, Video, Globe, Gamepad2, Share2, Target, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { cn } from '@/lib/utils.js';
import Logo from '@/components/Logo.jsx';
import { services, servicePath } from '@/lib/services.js';

const iconFor = (title) => {
  const name = title.toLowerCase();
  if (name.includes('tiktok')) return Video;
  if (name.includes('amazon') || name.includes('shopify') || name.includes('marketplace') || name.includes('ebay') || name.includes('daraz') || name.includes('temu') || name.includes('walmart') || name.includes('mercari')) return ShoppingBag;
  if (name.includes('web')) return Code2;
  if (name.includes('marketing')) return Megaphone;
  if (name.includes('graphic')) return Palette;
  if (name.includes('seo')) return Search;
  if (name.includes('app')) return Smartphone;
  if (name.includes('game')) return Gamepad2;
  if (name.includes('automation')) return Workflow;
  if (name.includes('ads')) return Target;
  if (name.includes('social')) return Share2;
  if (name.includes('management')) return Settings;
  return Globe;
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsServicesOpen(false);
    };
    const handleKey = (event) => { if (event.key === 'Escape') setIsServicesOpen(false); };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group" aria-label="Raiwa Technologies home">
            <Logo className="w-12 h-12 transition-transform duration-300 group-hover:scale-105" />
            <span className="text-xl sm:text-2xl font-bold font-heading tracking-tight text-foreground">Raiwa<span className="text-primary"> Technologies</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-5 lg:gap-8" aria-label="Main navigation">
            <Link to="/" className={cn("text-sm font-semibold py-2 hover:text-primary", location.pathname === '/' ? 'text-primary' : 'text-foreground/80')}>Home</Link>
            <div className="relative" ref={dropdownRef} onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
              <button type="button" aria-expanded={isServicesOpen} aria-haspopup="true" onClick={() => setIsServicesOpen((open) => !open)} className={cn("inline-flex items-center gap-1 text-sm font-semibold py-2 hover:text-primary", location.pathname.startsWith('/services') ? 'text-primary' : 'text-foreground/80')}>
                Services <ChevronDown className={cn("w-4 h-4 transition-transform", isServicesOpen && "rotate-180")} />
              </button>
              {isServicesOpen && <div className="absolute left-0 top-full pt-3 w-[285px] z-50">
                <div className="bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 max-h-[75vh] overflow-y-auto">
                  {services.map((service) => {
                    const Icon = iconFor(service.title);
                    const active = location.pathname === servicePath(service);
                    return <Link key={service.slug} to={servicePath(service)} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors", active ? "bg-purple-50 text-primary font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-primary")}>
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: service.soft, color: service.accent }}><Icon className="w-4 h-4" /></span>
                      <span>{service.title}</span>
                    </Link>;
                  })}
                  <Link to="/services" className="block border-t border-slate-100 mt-2 pt-3 px-3 pb-1 text-sm font-bold text-primary">View all services →</Link>
                </div>
              </div>}
            </div>
            {navLinks.slice(1).map((link) => <Link key={link.name} to={link.path} className={cn("text-sm font-semibold transition-colors py-2 hover:text-primary", location.pathname === link.path ? "text-primary" : "text-foreground/80")}>{link.name}</Link>)}
          </nav>

          <div className="hidden md:flex items-center gap-4"><Link to="/contact"><Button className="bg-primary hover:bg-primary-light text-white font-bold px-6 shadow-luxury">Get Started</Button></Link></div>
          <div className="md:hidden flex items-center gap-3"><button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMobileMenuOpen} className="p-2 rounded-lg text-foreground hover:bg-muted">{isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button></div>
        </div>
      </div>
      {isMobileMenuOpen && <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-border shadow-lg max-h-[80vh] overflow-y-auto">
        <div className="px-4 pt-2 pb-6 space-y-1">
          <Link to="/" className="block px-4 py-3 rounded-lg text-base font-semibold hover:bg-muted">Home</Link>
          <button type="button" onClick={() => setIsServicesOpen((open) => !open)} className="w-full flex justify-between items-center px-4 py-3 rounded-lg text-base font-semibold hover:bg-muted" aria-expanded={isServicesOpen}>Services <ChevronDown className={cn("w-4 h-4 transition-transform", isServicesOpen && "rotate-180")} /></button>
          {isServicesOpen && <div className="ml-3 pl-3 border-l border-border space-y-1">{services.map((service) => <Link key={service.slug} to={servicePath(service)} className="block px-4 py-2.5 rounded-lg text-sm text-foreground/80 hover:bg-purple-50 hover:text-primary">{service.title}</Link>)}<Link to="/services" className="block px-4 py-2.5 text-sm font-bold text-primary">View all services</Link></div>}
          {navLinks.slice(1).map((link) => <Link key={link.name} to={link.path} className="block px-4 py-3 rounded-lg text-base font-semibold hover:bg-muted">{link.name}</Link>)}
          <div className="pt-4"><Link to="/contact" className="block"><Button className="w-full bg-primary hover:bg-primary-light text-white font-bold h-12">Get Started</Button></Link></div>
        </div>
      </div>}
    </header>
  );
};

export default Header;
