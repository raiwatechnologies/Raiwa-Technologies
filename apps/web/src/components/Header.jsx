
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
  const [headerHovered, setHeaderHovered] = useState(false);

  const [scrolled, setScrolled] = useState(
    typeof window !== 'undefined' ? window.scrollY > 40 : false
  );

  const [active, setActive] = useState(
    mainServices[0]?.slug || ''
  );

  const location = useLocation();
  const ref = useRef(null);

  const isSolid =
    scrolled || open || mobile || headerHovered;

  const isTransparent = !isSolid;

  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    updateScroll();

    window.addEventListener('scroll', updateScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    setMobile(false);
    setOpen(false);
    setHeaderHovered(false);
  }, [location.pathname]);

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
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const nav = [
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

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

  const headerBackground = isTransparent
    ? 'bg-transparent border-transparent shadow-none backdrop-blur-0'
    : 'bg-white border-[#171313]/10 shadow-sm backdrop-blur-xl';

const navTextColor = isTransparent
  ? 'text-[#171313] hover:text-[#DA0807] [text-shadow:0_1px_3px_rgba(255,255,255,0.85)]'
  : 'text-[#171313] hover:text-[#DA0807]';

  const headerControlColor = isTransparent
    ? 'text-white'
    : 'text-[#171313]';

  return (
    <>
      {/* DROPDOWN BOX HOVER ANIMATIONS */}
      <style>{`
        .service-category-box {
          border: none !important;
          background: #FDFDFD;
          box-shadow: none;
          transition:
            transform 260ms ease,
            box-shadow 260ms ease,
            background-color 260ms ease;
          will-change: transform;
        }

        .service-category-box:hover {
          transform: translateY(-3px);
          background: #F5F5F5 !important;
          box-shadow:
            0 8px 22px rgba(0, 0, 0, 0.07) !important;
        }

        .service-category-box.active {
          background: #F3F3F3 !important;
          box-shadow:
            0 3px 10px rgba(0, 0, 0, 0.025);
        }

        .service-subcategory-link {
          border: none !important;
          background: transparent;
          transition:
            transform 240ms ease,
            box-shadow 240ms ease,
            background-color 240ms ease,
            color 240ms ease;
        }

        .service-subcategory-link:hover {
          transform: translateY(-2px);
          background: #F3F3F3 !important;
          color: #171313 !important;
          box-shadow:
            0 8px 22px rgba(0, 0, 0, 0.07);
        }

        .mobile-service-category {
          border: none !important;
          background: #FDFDFD;
          transition:
            transform 260ms ease,
            box-shadow 260ms ease,
            background-color 260ms ease;
        }

        .mobile-service-category:hover {
          transform: translateY(-2px);
          background: #F5F5F5 !important;
          box-shadow:
            0 8px 22px rgba(0, 0, 0, 0.07);
        }

        .mobile-service-category.active {
          background: #F3F3F3 !important;
          box-shadow:
            0 3px 10px rgba(0, 0, 0, 0.025);
        }

        .mobile-service-subcategory {
          transition:
            transform 240ms ease,
            background-color 240ms ease,
            box-shadow 240ms ease;
        }

        .mobile-service-subcategory:hover {
          transform: translateY(-2px);
          background: #F3F3F3 !important;
          color: #171313 !important;
          box-shadow:
            0 8px 22px rgba(0, 0, 0, 0.07);
        }

        @media (prefers-reduced-motion: reduce) {
          .service-category-box,
          .service-subcategory-link,
          .mobile-service-category,
          .mobile-service-subcategory {
            transition: none !important;
          }

          .service-category-box:hover,
          .service-subcategory-link:hover,
          .mobile-service-category:hover,
          .mobile-service-subcategory:hover {
            transform: none !important;
          }
        }
      `}</style>

      <header
        onMouseEnter={() => setHeaderHovered(true)}
        onMouseLeave={() => setHeaderHovered(false)}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 w-full border-b',
          'transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-in-out',
          headerBackground
        )}
      >
        {/* HEADER BAR */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">

            {/* COMPANY BRAND */}
            <Link
              to="/"
              className="group flex flex-shrink-0 items-center gap-2"
              aria-label="Raiwa Technologies home"
            >
              <Logo className="h-12 w-12 transition-transform duration-300 group-hover:scale-105" />

              <span className="font-heading text-xl font-bold tracking-tight sm:text-2xl">
                <span className="text-[#DA0807]">
                  Raiwa
                </span>

                <span className="text-[#171313]">
                  {' '}Technologies
                </span>
              </span>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav
              className="hidden items-center gap-5 md:flex lg:gap-8"
              aria-label="Main navigation"
            >
              <Link
                to="/"
                className={cn(
                  'py-2 text-sm font-semibold transition-colors duration-300',
                  navTextColor
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
                    'inline-flex items-center gap-1.5 py-2 text-sm font-semibold transition-colors duration-300',
                    navTextColor
                  )}
                >
                  Services

                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform duration-200',
                      open && 'rotate-180'
                    )}
                  />
                </button>

                {/* MEGA MENU */}
                {open && (
                  <div className="absolute left-1/2 top-full z-50 w-[850px] max-w-[95vw] -translate-x-1/2 pt-4">

                    <div className="grid grid-cols-[225px_minmax(0,1fr)] overflow-hidden rounded-2xl border border-[#171313]/15 bg-white shadow-[0_18px_55px_rgba(23,19,19,0.20)]">

                      {/* LEFT PANEL */}
                      <div className="flex min-h-[390px] flex-col justify-between bg-[#171313] p-6 text-white">

                        <div>
                          <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/50">
                            Explore
                          </p>

                          <h3 className="mb-4 text-2xl font-extrabold leading-tight">
                            Our Digital
                            <span className="block text-[#DA0807]">
                              Solutions.
                            </span>
                          </h3>

                          <p className="mb-7 text-sm leading-relaxed text-white/65">
                            Everything your business needs to build,
                            launch and grow in one place.
                          </p>
                        </div>

                        <Link
                          to="/services"
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between gap-3 rounded-xl bg-[#DA0807] px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#B80707] hover:shadow-lg"
                        >
                          All Services
                          <ArrowRight className="h-4 w-4 shrink-0" />
                        </Link>
                      </div>

                      {/* RIGHT PANEL */}
                      <div className="min-w-0 p-5">

                        {/* MAIN CATEGORY HEADING */}
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <div>
                            <p className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#A09E9D]">
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

                        {/* MAIN SERVICES */}
                        <div className="mb-5 grid grid-cols-2 gap-2">
                          {mainServices.map((group) => (
                            <div
                              key={group.slug}
                              onMouseEnter={() =>
                                setActive(group.slug)
                              }
                              className={cn(
                                'service-category-box flex min-w-0 items-center justify-between gap-1 rounded-xl',
                                active === group.slug && 'active'
                              )}
                            >
                              <Link
                                to={mainServicePath(group)}
                                onFocus={() =>
                                  setActive(group.slug)
                                }
                                className="min-w-0 flex-1 truncate px-3 py-3 text-sm font-bold text-[#171313] transition-colors hover:text-[#171313]"
                              >
                                {group.title}
                              </Link>

                              <button
                                type="button"
                                aria-label={`Show ${group.title} sub-services`}
                                aria-expanded={active === group.slug}
                                onClick={() =>
                                  setActive(group.slug)
                                }
                                className="shrink-0 rounded-r-xl p-3 text-[#777] transition-colors hover:text-[#171313]"
                              >
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* SUB-SERVICE PANEL */}
                        {activeGroup && (
                          <div className="border-t border-[#171313]/10 pt-4">

                            <div className="mb-3 flex items-center justify-between gap-3">
                              <div>
                                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#999]">
                                  Explore Sub-services
                                </p>

                                <Link
                                  to={mainServicePath(activeGroup)}
                                  className="text-base font-extrabold text-[#171313] transition-colors hover:text-[#55514F]"
                                >
                                  {activeGroup.title}
                                </Link>
                              </div>

                              <Link
                                to={mainServicePath(activeGroup)}
                                className="whitespace-nowrap text-xs font-bold text-[#55514F] transition-colors hover:text-[#171313] hover:underline"
                              >
                                View category
                                <ArrowRight className="ml-1 inline h-3 w-3" />
                              </Link>
                            </div>

                            {activeChildren.length > 0 ? (
                              <div className="grid grid-cols-2 gap-1">
                                {activeChildren.map((item) => (
                                  <Link
                                    key={item.slug}
                                    to={servicePath(item)}
                                    className="service-subcategory-link group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[#55514F]"
                                  >
                                    <span className="min-w-0 truncate">
                                      {item.title}
                                    </span>

                                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#777] opacity-50 transition-opacity group-hover:opacity-100" />
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <p className="py-3 text-sm text-[#777]">
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
                    'py-2 text-sm font-semibold transition-colors duration-300',
                    navTextColor
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* DESKTOP CONTACT BUTTON */}
            <div className="hidden items-center gap-4 md:flex">
              <Link to="/contact">
                <Button className="bg-[#DA0807] px-6 font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#B80707] hover:shadow-xl">
                  Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                type="button"
                onClick={() => setMobile((previous) => !previous)}
                aria-label={mobile ? 'Close menu' : 'Open menu'}
                aria-expanded={mobile}
                className={cn(
                  'rounded-lg p-2 transition-colors hover:bg-white/10',
                  headerControlColor
                )}
              >
                {mobile ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        {mobile && (
          <div className="absolute left-0 right-0 top-20 max-h-[85vh] overflow-y-auto border-b border-[#171313]/15 bg-white shadow-[0_15px_35px_rgba(23,19,19,0.15)] md:hidden">

            <div className="space-y-2 px-4 pb-6 pt-3">

              <Link
                to="/"
                className="block rounded-xl px-4 py-3 text-base font-semibold text-[#171313] transition-colors hover:bg-[#F7F7F7]"
              >
                Home
              </Link>

              {/* ALL SERVICES */}
              <Link
                to="/services"
                className="flex items-center justify-between rounded-xl bg-[#171313] px-4 py-3 font-bold text-white transition-colors hover:bg-[#DA0807]"
              >
                All Services
                <ArrowRight className="h-4 w-4" />
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
                          'mobile-service-category overflow-hidden rounded-xl',
                          expanded && 'active'
                        )}
                      >
                        {/* MAIN SERVICE LINK AND EXPAND BUTTON */}
                        <div className="flex items-center">
                          <Link
                            to={mainServicePath(group)}
                            className="min-w-0 flex-1 px-4 py-3.5 text-sm font-bold text-[#171313] transition-colors hover:text-[#171313]"
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
                            className="p-4 text-[#777] transition-colors hover:text-[#171313]"
                          >
                            <ChevronDown
                              className={cn(
                                'h-4 w-4 transition-transform duration-200',
                                expanded && 'rotate-180'
                              )}
                            />
                          </button>
                        </div>

                        {/* SUB-SERVICES */}
                        {expanded && (
                          <div className="px-4 pb-3">

                            <Link
                              to={mainServicePath(group)}
                              className="flex items-center justify-between py-3 text-xs font-bold uppercase tracking-wide text-[#55514F] transition-colors hover:text-[#171313]"
                            >
                              View {group.title} Overview
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>

                            <div className="space-y-1">
                              {groupChildren.map((item) => (
                                <Link
                                  key={item.slug}
                                  to={servicePath(item)}
                                  className="mobile-service-subcategory flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#55514F]"
                                >
                                  <span>{item.title}</span>

                                  <ChevronRight className="h-4 w-4 shrink-0 text-[#777] opacity-50" />
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
              <div className="mt-3 border-t border-[#171313]/10 pt-3">
                {nav.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block rounded-xl px-4 py-3 text-base font-semibold text-[#171313] transition-colors hover:bg-[#F7F7F7]"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* MOBILE CONTACT BUTTON */}
              <div className="pt-3">
                <Link to="/contact" className="block">
                  <Button className="h-12 w-full bg-[#DA0807] font-bold text-white shadow-md transition-all hover:bg-[#B80707]">
                    Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;