import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import Logo from '@/components/Logo.jsx';
import { BRAND, getWhatsAppUrl } from '@/lib/brand.js';
import { mainServices, mainServicePath } from '@/lib/services.js';

const Footer = () => {
  const currentYear = 2020;

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const serviceLinks = mainServices.map((service) => ({ name: service.title, path: mainServicePath(service) }));

  return (
    <footer className="bg-primary-dark text-primary-lighter-bg relative border-t-[6px] border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
              <Logo className="w-12 h-12 transition-transform duration-300 group-hover:scale-105" />
              <span className="text-2xl font-bold font-heading text-white tracking-tight">
                Raiwa<span className="text-primary-light"> Technologies</span>
              </span>
            </Link>
            <p className="text-primary-lighter/70 leading-relaxed text-sm mb-8">
              Raiwa Technologies helps ambitious brands build, launch and scale across ecommerce marketplaces, with development, marketing, ads and SEO that deliver measurable growth.
            </p>
            <div className="flex gap-4">
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary text-white transition-all duration-300 hover:-translate-y-1" aria-label="Chat on WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href={`mailto:${BRAND.email}`} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary text-white transition-all duration-300 hover:-translate-y-1" aria-label="Send us an email">
                <Mail className="w-4 h-4" />
              </a>
              <a href={`tel:${BRAND.phoneTel}`} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary text-white transition-all duration-300 hover:-translate-y-1" aria-label="Call us">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-lg font-bold text-white mb-6 font-heading">Quick Links</p>
            <ul className="space-y-4 text-sm font-medium">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-primary-lighter/70 hover:text-white transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-lg font-bold text-white mb-6 font-heading">Our Services</p>
            <ul className="space-y-4 text-sm font-medium">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-primary-lighter/70 hover:text-white transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-lg font-bold text-white mb-6 font-heading">Contact</p>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <Mail className="w-4 h-4 text-primary-light group-hover:text-white transition-colors" />
                </div>
                <a href={`mailto:${BRAND.email}`} className="mt-2 text-primary-lighter/70 hover:text-white transition-colors break-all">{BRAND.email}</a>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <Phone className="w-4 h-4 text-primary-light group-hover:text-white transition-colors" />
                </div>
                <a href={`tel:${BRAND.phoneTel}`} className="mt-2 text-primary-lighter/70 hover:text-white transition-colors">{BRAND.phoneDisplay}</a>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <MapPin className="w-4 h-4 text-primary-light group-hover:text-white transition-colors" />
                </div>
                <span className="mt-1 text-primary-lighter/70">Serving Clients Worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-lighter/50">
          <p>© {currentYear} {BRAND.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
