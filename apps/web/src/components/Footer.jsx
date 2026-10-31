
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

  const serviceLinks = mainServices.map((service) => ({
    name: service.title,
    path: mainServicePath(service),
  }));

  const socialLinkClass =
    'flex h-10 w-10 items-center justify-center rounded-full border border-[#A09E9D]/40 bg-[#171313] text-[#FDFDFD] transition-all duration-300 hover:-translate-y-1 hover:border-[#DA0807] hover:bg-[#DA0807]';

  const contactIconClass =
    'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#A09E9D]/30 bg-[#E5E5E5] transition-colors duration-300 group-hover:border-[#DA0807] group-hover:bg-[#DA0807]';

  const linkClass =
    'text-[#E5E5E5] transition-colors duration-200 hover:text-[#DA0807]';

  return (
    <footer className="relative border-t-[3px] border-[#DA0807] bg-[#171313] text-[#E5E5E5]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="group mb-6 inline-flex items-center gap-2">
              <Logo className="h-12 w-12 transition-transform duration-300 group-hover:scale-105" />
              <span className="font-heading text-2xl font-bold tracking-tight text-[#FDFDFD]">
                Raiwa<span className="text-[#DA0807]"> Technologies</span>
              </span>
            </Link>

            <p className="mb-8 text-sm leading-relaxed text-[#E5E5E5]">
              Raiwa Technologies helps ambitious brands build, launch and scale
              across ecommerce marketplaces, with development, marketing, ads
              and SEO that deliver measurable growth.
            </p>

            <div className="flex gap-4">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>

              <a
                href={`mailto:${BRAND.email}`}
                className={socialLinkClass}
                aria-label="Send us an email"
              >
                <Mail className="h-4 w-4" />
              </a>

              <a
                href={`tel:${BRAND.phoneTel}`}
                className={socialLinkClass}
                aria-label="Call us"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-6 font-heading text-lg font-bold text-[#FDFDFD]">
              Quick Links
            </h2>
            <ul className="space-y-4 text-sm font-medium">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={linkClass}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 font-heading text-lg font-bold text-[#FDFDFD]">
              Our Services
            </h2>
            <ul className="space-y-4 text-sm font-medium">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={linkClass}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 font-heading text-lg font-bold text-[#FDFDFD]">
              Contact
            </h2>
            <ul className="space-y-5 text-sm">
              <li className="group flex items-start gap-4">
                <div className={contactIconClass}>
                  <Mail className="h-4 w-4 text-[#171313] transition-colors group-hover:text-white" />
                </div>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="mt-2 break-all text-[#E5E5E5] transition-colors hover:text-[#DA0807]"
                >
                  {BRAND.email}
                </a>
              </li>

              <li className="group flex items-start gap-4">
                <div className={contactIconClass}>
                  <Phone className="h-4 w-4 text-[#171313] transition-colors group-hover:text-white" />
                </div>
                <a
                  href={`tel:${BRAND.phoneTel}`}
                  className="mt-2 text-[#E5E5E5] transition-colors hover:text-[#DA0807]"
                >
                  {BRAND.phoneDisplay}
                </a>
              </li>

              <li className="group flex items-start gap-4">
                <div className={contactIconClass}>
                  <MapPin className="h-4 w-4 text-[#171313] transition-colors group-hover:text-white" />
                </div>
                <span className="mt-1 text-[#E5E5E5]">
                  Serving Clients Worldwide
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#A09E9D]/30 pt-8 text-sm text-[#E5E5E5] md:flex-row">
          <p>
            © {currentYear} {BRAND.name}. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link to="/privacy-policy" className={linkClass}>
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className={linkClass}>
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
