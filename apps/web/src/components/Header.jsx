import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button.jsx';
import { cn } from '@/lib/utils.js';
import Logo from '@/components/Logo.jsx';

import {
  services,
  servicePath,
  mainServices,
  mainServicePath,
} from '@/lib/services.js';

const Header = () => {
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(
    mainServices[0]?.slug || ''
  );

  const location = useLocation();
  const ref = useRef(null);

  // Reset menus after navigation.
  useEffect(() => {
    setMobile(false);
    setOpen(false);
  }, [location.pathname]);

  // Close desktop menu when clicking outside or pressing Escape.
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setMobile(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick
      );
      document.removeEventListener(
        'keydown',
        handleEscape
      );
    };
  }, []);

  const nav = [
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Get sub-services using their unique slugs.
  const getChildren = (group) => {
    if (!group?.children) return [];

    return group.children
      .map((slug) =>
        services.find((item) => item.slug === slug)
      )
      .filter(Boolean);
  };

  const activeGroup =
    mainServices.find((group) => group.slug === active) ||
    mainServices[0];

  const activeChildren = getChildren(activeGroup);

  const toggleDesktopMenu = () => {
    setOpen((previous) => !previous);
  };

  const handleMobileGroup = (slug) => {
    setActive((previous) =>
      previous === slug ? '' : slug
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm border-b border-[#171313]/10">

      {/* HEADER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* COMPANY BRAND */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center gap-2 group"
            aria-label="Raiwa Technologies home"
          >
            <Logo className="w-12 h-12 transition-transform duration-300 group-hover:scale-105" />

            <span className="text-xl sm:text-2xl font-bold font-heading tracking-tight text-[#171313]">
              Raiwa
              <span className="text-[#DA0807]">
                {' '}Technologies
              </span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            className="hidden md:flex items-center gap-5 lg:gap-8"
            aria-label="Main navigation"
          >

            <Link
              to="/"
              className={cn(
                'text-sm font-semibold py-2 transition-colors hover:text-[#DA0807]',
                location.pathname === '/'
                  ? 'text-[#DA0807]'
                  : 'text-[#171313]/80'
              )}
            >
              Home
            </Link>

            {/* SERVICES MEGA MENU */}
            <div
              className="relative"
              ref={ref}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >

              <button
                type="button"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={toggleDesktopMenu}
                className={cn(
                  'inline-flex items-center gap-1.5 text-sm font-semibold py-2 transition-colors hover:text-[#DA0807]',
                  location.pathname.startsWith('/services')
                    ? 'text-[#DA0807]'
                    : 'text-[#171313]/80'
                )}
              >
                Services

                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform duration-200',
                    open && 'rotate-180'
                  )}
                />
              </button>

              {/* MEGA MENU */}
              {open && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[850px] max-w-[95vw] z-50">

                  <div className="grid grid-cols-[225px_minmax(0,1fr)] bg-white border border-[#171313]/15 rounded-2xl shadow-[0_18px_55px_rgba(23,19,19,0.20)] overflow-hidden">

                    {/* LEFT PANEL: ALL SERVICES */}
                    <div className="bg-[#171313] text-white p-6 flex flex-col justify-between min-h-[390px]">

                      <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/50 mb-5">
                          Explore
                        </p>

                        <h3 className="text-2xl font-extrabold leading-tight mb-4">
                          Our Digital
                          <span className="block text-[#DA0807]">
                            Solutions.
                          </span>
                        </h3>

                        <p className="text-sm text-white/65 leading-relaxed mb-7">
                          Everything your business needs to build,
                          launch and grow in one place.
                        </p>
                      </div>

                      <Link
                        to="/services"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#DA0807] hover:bg-[#B80707] text-white font-bold text-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                      >
                        All Services

                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </Link>

                    </div>

                    {/* RIGHT PANEL */}
                    <div className="p-5 min-w-0">

                      {/* MAIN CATEGORY HEADING */}
                      <div className="flex items-center justify-between gap-3 mb-4">

                        <div>
                          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#A09E9D] mb-1">
                            Browse Categories
                          </p>

                          <h3 className="text-lg font-extrabold text-[#171313]">
                            Main Services
                          </h3>
                        </div>

                        <span className="text-xs text-[#777]">
                          {mainServices.length} Categories
                        </span>

                      </div>

                      {/* MAIN SERVICES: EACH TITLE IS CLICKABLE */}
                      <div className="grid grid-cols-2 gap-2 mb-5">

                        {mainServices.map((group) => (
                          <div
                            key={group.slug}
                            onMouseEnter={() =>
                              setActive(group.slug)
                            }
                            className={cn(
                              'flex items-center justify-between gap-1 min-w-0 rounded-xl border transition-all duration-200',
                              active === group.slug
                                ? 'bg-[#FCEEEE] border-[#DA0807]/45 shadow-sm'
                                : 'bg-white border-[#171313]/10 hover:bg-[#F7F7F7] hover:border-[#171313]/25'
                            )}
                          >

                            {/* CLICKABLE MAIN SERVICE */}
                            <Link
                              to={mainServicePath(group)}
                              onFocus={() =>
                                setActive(group.slug)
                              }
                              className={cn(
                                'flex-1 min-w-0 px-3 py-3 text-sm font-bold truncate transition-colors',
                                active === group.slug
                                  ? 'text-[#DA0807]'
                                  : 'text-[#171313] hover:text-[#DA0807]'
                              )}
                            >
                              {group.title}
                            </Link>

                            {/* SEPARATE SUB-SERVICE TOGGLE */}
                            <button
                              type="button"
                              aria-label={`Show ${group.title} sub-services`}
                              aria-expanded={active === group.slug}
                              onClick={() =>
                                setActive(group.slug)
                              }
                              className={cn(
                                'shrink-0 p-3 rounded-r-xl transition-colors',
                                active === group.slug
                                  ? 'text-[#DA0807]'
                                  : 'text-[#777] hover:text-[#DA0807]'
                              )}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>

                          </div>
                        ))}

                      </div>

                      {/* SUB-SERVICE PANEL */}
                      {activeGroup && (
                        <div className="border-t border-[#171313]/10 pt-4">

                          <div className="flex items-center justify-between gap-3 mb-3">

                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#999] mb-1">
                                Explore Sub-services
                              </p>

                              <Link
                                to={mainServicePath(activeGroup)}
                                className="text-base font-extrabold text-[#171313] hover:text-[#DA0807] transition-colors"
                              >
                                {activeGroup.title}
                              </Link>
                            </div>

                            <Link
                              to={mainServicePath(activeGroup)}
                              className="text-xs font-bold text-[#DA0807] hover:underline whitespace-nowrap"
                            >
                              View category
                              <ArrowRight className="inline w-3 h-3 ml-1" />
                            </Link>

                          </div>

                          {activeChildren.length > 0 ? (
                            <div className="grid grid-cols-2 gap-1">

                              {activeChildren.map((item) => (
                                <Link
                                  key={item.slug}
                                  to={servicePath(item)}
                                  className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm text-[#55514F] font-medium hover:bg-[#FCEEEE] hover:text-[#DA0807] transition-colors group"
                                >
                                  <span className="min-w-0 truncate">
                                    {item.title}
                                  </span>

                                  <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-40 group-hover:opacity-100" />
                                </Link>
                              ))}

                            </div>
                          ) : (
                            <p className="text-sm text-[#777] py-3">
                              No sub-services available.
                            </p>
                          )}

                        </div>
                      )}

                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* OTHER NAV LINKS */}
            {nav.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-sm font-semibold transition-colors py-2 hover:text-[#DA0807]',
                  location.pathname === link.path
                    ? 'text-[#DA0807]'
                    : 'text-[#171313]/80'
                )}
              >
                {link.name}
              </Link>
            ))}

          </nav>

          {/* DESKTOP CONTACT BUTTON */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/contact">
              <Button className="bg-[#DA0807] hover:bg-[#B80707] text-white font-bold px-6 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                Free Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobile((previous) => !previous)}
              aria-label={mobile ? 'Close menu' : 'Open menu'}
              aria-expanded={mobile}
              className="p-2 rounded-lg text-[#171313] hover:bg-[#171313]/5 transition-colors"
            >
              {mobile ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      {mobile && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-[#171313]/15 shadow-[0_15px_35px_rgba(23,19,19,0.15)] max-h-[85vh] overflow-y-auto">

          <div className="px-4 pt-3 pb-6 space-y-2">

            <Link
              to="/"
              className="block px-4 py-3 rounded-xl text-base font-semibold text-[#171313] hover:bg-[#F7F7F7] transition-colors"
            >
              Home
            </Link>

            {/* ALL SERVICES */}
            <Link
              to="/services"
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#171313] text-white font-bold hover:bg-[#DA0807] transition-colors"
            >
              All Services
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* MAIN SERVICE ACCORDIONS */}
            <div className="pt-2">

              <p className="px-4 pb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#999]">
                Main Services
              </p>

              <div className="space-y-2">

                {mainServices.map((group) => {
                  const expanded = active === group.slug;
                  const groupChildren = getChildren(group);

                  return (
                    <div
                      key={group.slug}
                      className={cn(
                        'rounded-xl border overflow-hidden transition-colors',
                        expanded
                          ? 'border-[#DA0807]/40 bg-[#FDFDFD]'
                          : 'border-[#171313]/10 bg-white'
                      )}
                    >

                      {/* MAIN SERVICE LINK AND EXPAND BUTTON */}
                      <div className="flex items-center">

                        <Link
                          to={mainServicePath(group)}
                          className={cn(
                            'flex-1 min-w-0 px-4 py-3.5 text-sm font-bold transition-colors',
                            expanded
                              ? 'text-[#DA0807]'
                              : 'text-[#171313] hover:text-[#DA0807]'
                          )}
                        >
                          {group.title}
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleMobileGroup(group.slug)
                          }
                          aria-label={`Toggle ${group.title} sub-services`}
                          aria-expanded={expanded}
                          className={cn(
                            'p-4 transition-colors',
                            expanded
                              ? 'text-[#DA0807]'
                              : 'text-[#777] hover:text-[#DA0807]'
                          )}
                        >
                          <ChevronDown
                            className={cn(
                              'w-4 h-4 transition-transform duration-200',
                              expanded && 'rotate-180'
                            )}
                          />
                        </button>

                      </div>

                      {/* SUB-SERVICES */}
                      {expanded && (
                        <div className="px-4 pb-3 border-t border-[#171313]/10">

                          <Link
                            to={mainServicePath(group)}
                            className="flex items-center justify-between py-3 text-xs font-bold uppercase tracking-wide text-[#DA0807]"
                          >
                            View {group.title} Overview
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>

                          <div className="space-y-1">

                            {groupChildren.map((item) => (
                              <Link
                                key={item.slug}
                                to={servicePath(item)}
                                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#55514F] hover:bg-[#FCEEEE] hover:text-[#DA0807] transition-colors"
                              >
                                <span>{item.title}</span>

                                <ChevronRight className="w-4 h-4 shrink-0 opacity-50" />
                              </Link>
                            ))}

                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}

              </div>
            </div>

            {/* OTHER LINKS */}
            <div className="border-t border-[#171313]/10 pt-3 mt-3">

              {nav.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-4 py-3 rounded-xl text-base font-semibold text-[#171313] hover:bg-[#F7F7F7] transition-colors"
                >
                  {link.name}
                </Link>
              ))}

            </div>

            {/* MOBILE CONTACT BUTTON */}
            <div className="pt-3">
              <Link to="/contact" className="block">
                <Button className="w-full bg-[#DA0807] hover:bg-[#B80707] text-white font-bold h-12 shadow-md transition-all">
                  Free Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
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