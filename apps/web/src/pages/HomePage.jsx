
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Activity,
  Award,
  Users,
  DollarSign,
  ThumbsUp,
  LineChart,
  Target,
  TrendingUp,
  Lightbulb,
  Settings,
  Rocket,
} from 'lucide-react';

import { Button } from '@/components/ui/button.jsx';
import {
  services,
  servicePath,
  mainServices,
  mainServicePath,
} from '@/lib/services.js';

import WhatsAppButton from '@/components/WhatsAppButton.jsx';
import StatCard from '@/components/StatCard.jsx';
import BenefitCard from '@/components/BenefitCard.jsx';
import ProcessStep from '@/components/ProcessStep.jsx';

/* -------------------------------------------------------
   ANIMATED COUNTER
------------------------------------------------------- */

const AnimatedCounter = ({
  target,
  prefix = '',
  suffix = '',
  duration = 1800,
}) => {
  const [value, setValue] = React.useState(0);
  const counterRef = React.useRef(null);

  React.useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    let animationFrame;
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;

        started = true;
        observer.disconnect();

        const reduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

        if (reduceMotion) {
          setValue(target);
          return;
        }

        const startTime = performance.now();

        const animate = (now) => {
          const progress = Math.min(
            (now - startTime) / duration,
            1
          );

          const easedProgress = 1 - Math.pow(1 - progress, 3);

          setValue(Math.round(target * easedProgress));

          if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
          }
        };

        animationFrame = requestAnimationFrame(animate);
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration]);

  return (
    <span ref={counterRef}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
};

/* -------------------------------------------------------
   CUSTOM GROWTH GRAPH ICON
------------------------------------------------------- */

const GrowthChartIcon = ({ className }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M7 5V41H43"
      stroke="#171313"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M12 32L20 25L26 29L38 13"
      stroke="#DA0807"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M29 13H38V22"
      stroke="#DA0807"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <circle cx="12" cy="32" r="2" fill="#DA0807" />
    <circle cx="20" cy="25" r="2" fill="#DA0807" />
    <circle cx="26" cy="29" r="2" fill="#DA0807" />
  </svg>
);

/* -------------------------------------------------------
   HOMEPAGE
------------------------------------------------------- */

const HomePage = () => {
  const navigate = useNavigate();

  /* FEATURED SERVICES */

  const featuredServices = [
    {
      title: 'Ecommerce',
      image: '/service-assets/ecommerce-theme.png',
      description:
        'Complete store setup and growth across leading marketplaces, helping your products reach more customers and generate sales.',
      benefits: [
        'Amazon, eBay, Walmart & More',
        'Shopify & TikTok Shop',
        'Marketplace Account Management',
      ],
    },
    {
      title: 'Marketing',
      image: '/service-assets/marketing-theme-image.jpg',
      description:
        'Build brand awareness, attract audience and grow your business via digital marketing, SEO and intelligent automation.',
      benefits: [
        'Digital & Social Media Marketing',
        'SEO Optimization',
        'Marketing Automation',
      ],
    },
    {
      title: 'Development',
      image: '/service-assets/development-theme-image.jpg',
      description:
        'Build powerful digital experiences for your business, from professional websites and mobile applications to engaging games.',
      benefits: [
        'Web & App Development',
        'Game Development',
        'Graphic Design',
      ],
    },
  ];

  /* SERVICE PAGE ROUTING */

  const getFeaturedServicePath = (title) => {
    const mainService = mainServices.find(
      (item) =>
        item.title.toLowerCase() === title.toLowerCase()
    );

    return mainService
      ? mainServicePath(mainService)
      : '/services';
  };

  const handleFeaturedCardClick = (event, title) => {
    // Allow the information button to follow its own link.
    if (event.target.closest('a, button')) return;

    navigate(getFeaturedServicePath(title));
  };

  const handleFeaturedCardKeyDown = (event, title) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate(getFeaturedServicePath(title));
    }
  };

  /* MARKETPLACES */

  const marketplaces = [
    'Amazon',
    'eBay',
    'Walmart Marketplace',
    'Shopify',
    'TikTok Shop',
    'Temu',
    'Daraz',
    'Mercari',
  ];

  const marketplaceItems = marketplaces
    .map((name) =>
      services.find(
        (service) =>
          service.title.toLowerCase() === name.toLowerCase() ||
          (name === 'Walmart Marketplace' &&
            service.slug === 'walmart-marketplace')
      )
    )
    .filter(Boolean);

  /* WORK PROCESS */

  const processSteps = [
    {
      number: '1',
      icon: Lightbulb,
      title: 'Discover',
      description:
        'We learn your products, goals and market so we know exactly where the biggest opportunities are.',
    },
    {
      number: '2',
      icon: Settings,
      title: 'Plan',
      description:
        'We build a clear, practical roadmap for your store, platform and marketing channels.',
    },
    {
      number: '3',
      icon: Rocket,
      title: 'Launch',
      description:
        'Our team sets up, optimizes and launches, handling the details so nothing slips through.',
    },
    {
      number: '4',
      icon: TrendingUp,
      title: 'Scale',
      description:
        'We track results, improve what works and scale your growth with transparent reporting.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Raiwa Technologies | Ecommerce, Development & Digital Growth
        </title>

        <meta
          name="description"
          content="Raiwa Technologies is an ecommerce-focused growth company offering marketplace management, app and game development, SEO, social media marketing and ads."
        />
      </Helmet>

      {/* -------------------------------------------------
          HOMEPAGE STYLES
      ------------------------------------------------- */}

      <style>{`

        /* ================================================
           3D CARD PERSPECTIVE
        ================================================ */

        .home-card-grid {
          perspective: 1200px;
          perspective-origin: center center;
        }

        .home-service-card-shell,
        .home-benefit-card-shell,
        .home-stat-card-shell,
        .home-process-step-shell {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          transition:
            transform 350ms cubic-bezier(0.2, 0.7, 0.3, 1),
            box-shadow 350ms ease;
        }

        /* ================================================
           HIGH-IMPACT SERVICE CARDS
        ================================================ */

        .home-service-card-shell {
          display: flex;
          height: 100%;
          min-width: 0;
          flex-direction: column;
          cursor: pointer;
          overflow: hidden;
          border: none !important;
          border-radius: 1rem;
          background: #ffffff;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.025);
        }

        .home-service-card-shell:hover {
          transform: translate3d(0, 0, 18px) scale(1.015);
          border: none !important;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.07);
          z-index: 2;
        }

        .home-service-card-shell:focus-visible {
          outline: 2px solid #DA0807;
          outline-offset: 4px;
        }

        .home-service-card-image {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          object-position: center;
        }

        /* GRAPH ICON BOX */

        .home-service-icon-box {
          display: flex;
          width: 48px;
          height: 48px;
          min-width: 48px;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(23, 19, 19, 0.10);
          border-radius: 10px;
          background: #ffffff;
        }

        .home-service-icon-box svg {
          width: 29px;
          height: 29px;
        }

        /* BENEFIT DOTS */

        .home-service-benefit-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          min-width: 7px;
          border-radius: 50%;
          background: #DA0807;
        }

        /* ================================================
           FOR MORE INFORMATION BUTTON
        ================================================ */

        .home-service-more-button {
          display: flex;
          width: 100%;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: auto;
          border: 1px solid rgba(23, 19, 19, 0.10);
          border-radius: 9px;
          background: #F1F1F1;
          padding: 12px 18px;
          color: #171313;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition:
            background-color 220ms ease,
            border-color 220ms ease,
            color 220ms ease,
            transform 220ms ease;
        }

        .home-service-more-button:hover {
          background: #E5E5E5;
          border-color: rgba(23, 19, 19, 0.20);
          color: #171313;
          transform: translateY(-1px);
        }

        .home-service-more-button svg {
          width: 17px;
          height: 17px;
          transition: transform 220ms ease;
        }

        .home-service-more-button:hover svg {
          transform: translateX(3px);
        }

        .home-service-more-button:focus-visible {
          outline: 2px solid #DA0807;
          outline-offset: 3px;
        }

        /* ================================================
           WHAT WE PROVIDE
        ================================================ */

        .home-benefit-card-shell {
          height: 100%;
        }

        .home-benefit-card-shell > * {
          height: 100%;
          background: #ffffff !important;
          border: 1px solid rgba(23, 19, 19, 0.10) !important;
          border-radius: 1rem;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.025) !important;
          transition:
            box-shadow 350ms ease,
            background-color 350ms ease;
        }

        .home-benefit-card-shell:hover {
          transform: translate3d(0, 0, 18px) scale(1.015);
          z-index: 2;
        }

        .home-benefit-card-shell:hover > * {
          background: #ffffff !important;
          border: 1px solid rgba(23, 19, 19, 0.10) !important;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.07) !important;
        }

        .home-benefit-card-shell h3,
        .home-benefit-card-shell h4 {
          color: #171313 !important;
        }

        /* ================================================
           STATISTIC CARDS
        ================================================ */

        .home-stat-card-shell {
          height: 100%;
        }

        .home-stat-card-shell > * {
          height: 100%;
          border: 1px solid rgba(23, 19, 19, 0.20) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04) !important;
          transition: box-shadow 350ms ease;
        }

        .home-stat-card-shell:hover {
          transform: translate3d(0, 0, 18px) scale(1.015);
          z-index: 2;
        }

        .home-stat-card-shell:hover > * {
          border-color: rgba(23, 19, 19, 0.20) !important;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.07) !important;
        }

        /* ================================================
           HOW WE WORK
           No border and no shadow
        ================================================ */

        .home-process-step-shell {
          height: 100%;
          border: none !important;
          box-shadow: none !important;
        }

        .home-process-step-shell:hover {
          transform: translate3d(0, 0, 18px) scale(1.015);
          z-index: 2;
        }

        .home-process-step-shell > *,
        .home-process-step-shell:hover > * {
          height: 100%;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          background: transparent !important;
          transform: none !important;
          transition: none !important;
        }

        /* ================================================
           HERO BUTTONS
        ================================================ */

        .home-hero-button {
          transition:
            transform 220ms ease,
            box-shadow 220ms ease,
            background-color 220ms ease !important;
          box-shadow:
            0 5px 12px rgba(23, 19, 19, 0.16),
            0 9px 22px rgba(23, 19, 19, 0.12);
        }

        .home-hero-button:hover {
          transform: translateY(-4px);
          box-shadow:
            0 9px 16px rgba(23, 19, 19, 0.19),
            0 17px 32px rgba(23, 19, 19, 0.20) !important;
        }

        .home-hero-button:active {
          transform: translateY(-1px);
        }

        .home-hero-button:focus-visible {
          outline: 3px solid #171313;
          outline-offset: 4px;
        }

        /* ================================================
           REDUCED MOTION ACCESSIBILITY
        ================================================ */

        @media (prefers-reduced-motion: reduce) {
          .home-service-card-shell,
          .home-benefit-card-shell,
          .home-stat-card-shell,
          .home-process-step-shell,
          .home-benefit-card-shell > *,
          .home-stat-card-shell > *,
          .home-process-step-shell > *,
          .home-service-more-button,
          .home-hero-button {
            transition: none !important;
          }

          .home-service-card-shell:hover,
          .home-benefit-card-shell:hover,
          .home-stat-card-shell:hover,
          .home-process-step-shell:hover,
          .home-service-more-button:hover,
          .home-hero-button:hover {
            transform: none !important;
          }
        }

      `}</style>

      <div className="flex flex-col bg-background">

        {/* ===============================================
            HERO SECTION
        =============================================== */}

        <section className="relative flex min-h-[700px] items-center overflow-hidden py-16 md:min-h-[760px] md:py-24">

          <div className="absolute inset-0 z-0 bg-white">
            <picture className="absolute inset-0 block h-full w-full">
              <source
                media="(max-width: 767px)"
                srcSet="/hero-image-phone.png"
              />

              <img
                src="/hero-image-laptop.png"
                alt="Raiwa Technologies business growth and digital solutions"
                className="block h-full w-full object-cover object-center"
              />
            </picture>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-[650px]">

              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >

                <h1 className="home-hero-heading mb-4 -translate-y-3 text-5xl font-extrabold tracking-tight text-[#171313] sm:text-5xl md:text-6xl lg:text-6xl">
                  We Built{' '}
                  <span className="whitespace-nowrap text-[#DA0807]">
                    Together.
                  </span>
                </h1>

                <p className="-translate-y-1 text-[clamp(13px,1.9vw,20px)] font-medium leading-relaxed text-[#171313]/85">
                  <span className="block whitespace-nowrap">
                    Raiwa Technologies — Empowering Growth
                  </span>

                  <span className="block">
                    Through Digital Solutions.
                  </span>
                </p>

                {/* HERO BUTTONS */}

                <div className="mt-16 flex flex-col items-start gap-5 sm:flex-row sm:items-center md:mt-20 lg:mt-24">

                  <Link to="/contact" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="home-hero-button h-14 w-full bg-[#DA0807] px-8 text-lg font-bold text-white hover:bg-[#B80707] sm:w-auto"
                    >
                      Get a Free Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>

                  <div className="w-full sm:w-auto">
                    <WhatsAppButton
                      variant="default"
                      className="home-hero-button h-14 w-full px-8 text-lg sm:w-auto"
                    />
                  </div>

                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ===============================================
            SELECTED PLATFORM LOGOS MARQUEE
        =============================================== */}

        <section
          className="relative z-10 w-full overflow-hidden border-0 bg-primary-lighter-bg/30 py-8 sm:py-9"
          aria-label="Platform logos"
        >
          <div className="w-full overflow-hidden">
            <div className="services-logo-track">

              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
                  aria-hidden={copy === 1 ? true : undefined}
                >
                  {[
                    'tiktok-shop',
                    'shopify',
                    'walmart-marketplace',
                    'mercari',
                    'temu',
                    'ebay',
                    'amazon',
                    'daraz',
                    'google-ads',
                    'meta-ads',
                    'seo-optimization',
                  ].map((slug) => {
                    const service = services.find(
                      (item) => item.slug === slug
                    );

                    if (!service || !service.logoUrl) {
                      return null;
                    }

                    return (
                      <div
                        key={`${copy}-${slug}`}
                        className="flex w-24 shrink-0 items-center justify-center sm:w-28"
                      >
                        <img
                          src={service.logoUrl}
                          alt={
                            copy === 0
                              ? `${service.title} logo`
                              : ''
                          }
                          loading="lazy"
                          draggable="false"
                          className="h-16 w-16 object-contain sm:h-[72px] sm:w-[72px]"
                        />
                      </div>
                    );
                  })}
                </div>
              ))}

            </div>
          </div>

          <style>{`
            .services-logo-track {
              display: flex;
              width: max-content;
              animation: services-logo-scroll 45s linear infinite;
              will-change: transform;
            }

            @keyframes services-logo-scroll {
              from {
                transform: translateX(0);
              }

              to {
                transform: translateX(-50%);
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .services-logo-track {
                animation: none;
              }
            }
          `}</style>
        </section>

        {/* ===============================================
            OUR APPROACH
        =============================================== */}

        <section className="relative overflow-hidden border-0 bg-primary-lighter-bg/30 pb-16 pt-0">

          <div className="pointer-events-none absolute -right-1/3 -top-[150px] h-[600px] w-[600px] translate-y-0 rounded-full bg-[#A09E9D]/15 blur-[120px] md:top-0 md:-translate-y-1/2" />

          <div className="pointer-events-none absolute -bottom-0 -left-1/3 h-[600px] w-[600px] translate-y-1/2 rounded-full bg-[#A09E9D]/15 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-8 font-heading text-4xl font-extrabold tracking-tight text-primary-dark md:text-5xl lg:text-6xl"
              >
                We Don't Just Manage Stores,{' '}
                <br className="hidden md:block" />

                <span className="text-[#DA0807]">
                  We Grow Businesses.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl leading-relaxed text-muted-foreground"
              >
                At Raiwa Technologies, every decision is tied to your
                results. We combine careful account handling, smart
                technology and honest reporting to build ecommerce
                brands that last.
              </motion.p>

            </div>
          </div>
        </section>

        {/* ===============================================
            HIGH-IMPACT SERVICES
        =============================================== */}

        <section className="bg-background py-20 md:py-28">

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
              <h2 className="mb-6 font-heading text-4xl font-extrabold text-primary-dark md:text-5xl">
                High-Impact{' '}
                <span className="text-[#DA0807]">
                  Services
                </span>
              </h2>

              <p className="text-lg text-muted-foreground md:text-xl">
                Focused, practical solutions that help your business
                get found, get sales and keep growing.
              </p>
            </div>

            <div className="home-card-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

              {featuredServices.map((service) => (
                <div
                  key={service.title}
                  className="home-service-card-shell"
                  role="link"
                  tabIndex={0}
                  aria-label={`Explore ${service.title} services`}
                  onClick={(event) =>
                    handleFeaturedCardClick(event, service.title)
                  }
                  onKeyDown={(event) =>
                    handleFeaturedCardKeyDown(event, service.title)
                  }
                >

                  {/* SERVICE IMAGE */}

                  <img
                    src={service.image}
                    alt={`${service.title} services`}
                    loading="lazy"
                    className="home-service-card-image"
                  />

                  {/* SERVICE CONTENT */}

                  <div className="flex flex-1 flex-col p-6">

                    {/* GRAPH ICON AND SERVICE NAME */}

                    <div className="mb-4 flex items-center gap-3">

                      <div className="home-service-icon-box">
                        <GrowthChartIcon />
                      </div>

                      <h3 className="font-heading text-xl font-bold text-[#171313] sm:text-2xl">
                        {service.title}
                      </h3>

                    </div>

                    {/* DESCRIPTION */}

                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {service.description}
                    </p>

                    {/* BENEFITS */}

                    <ul className="space-y-3">
                      {service.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-start text-sm font-medium text-[#171313]/85"
                        >
                          <span className="home-service-benefit-dot mt-1.5 mr-3" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    {/* MORE INFORMATION BUTTON */}

                    <Link
                      to={getFeaturedServicePath(service.title)}
                      className="home-service-more-button"
                      aria-label={`For more information about ${service.title}`}
                    >
                      <span>For More Information</span>
                      <ArrowRight />
                    </Link>

                  </div>
                </div>
              ))}

            </div>

            {/* EXPLORE ALL SERVICES BUTTON */}

            <div className="mt-12 text-center md:mt-16">
              <Link to="/services">
                <Button
                  size="lg"
                  className="h-14 border-2 border-[#171313]/30 bg-white px-10 text-lg font-bold text-[#171313] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#171313] hover:bg-[#171313] hover:text-white hover:shadow-xl"
                >
                  Explore All Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

          </div>
        </section>

        {/* ===============================================
            WHAT WE PROVIDE + STATISTICS
        =============================================== */}

        <section className="relative overflow-hidden bg-[#F7F7F7] py-20 md:py-28">

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* SECTION INTRODUCTION */}

            <div className="mb-12 text-center">
              <h2 className="mb-5 font-heading text-4xl font-extrabold tracking-tight text-primary-dark md:text-5xl">
                What We <span className="text-[#DA0807]">Provide</span>
              </h2>

              <div className="mx-auto mb-5 h-1 w-20 rounded-full bg-[#171313]/30" />

              <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
                Practical solutions designed to help your business
                grow, perform and succeed.
              </p>
            </div>

            {/* BENEFIT CARDS */}

            <div className="home-card-grid mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">

              <div className="home-benefit-card-shell">
                <BenefitCard
                  icon={LineChart}
                  title="Sustainable Growth"
                  description="We skip risky shortcuts and build steady growth through optimized listings, strong SEO and loyal customers, so your brand keeps growing long after the first sale."
                  index={0}
                />
              </div>

              <div className="home-benefit-card-shell">
                <BenefitCard
                  icon={Target}
                  title="Measurable Results"
                  description="You will always know where your money goes and what it earns. Clear reports on sales, ad spend and performance keep every decision backed by real numbers."
                  index={1}
                />
              </div>

              <div className="home-benefit-card-shell">
                <BenefitCard
                  icon={Activity}
                  title="Cost-Effective Allocation"
                  description="Every dollar of your budget is planned with care. We focus spend on the channels and products that perform, and cut what doesn't, for a stronger return."
                  index={2}
                />
              </div>

              <div className="home-benefit-card-shell">
                <BenefitCard
                  icon={Award}
                  title="Long-term Success"
                  description="We work as your long-term partner, adapting to marketplace and algorithm changes so your brand stays competitive and keeps moving forward."
                  index={3}
                />
              </div>

            </div>

            {/* STATISTICS */}

            <div className="home-card-grid mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-24 lg:grid-cols-4 lg:gap-8">

              <div className="home-stat-card-shell">
                <StatCard
                  number={
                    <span style={{ color: '#171313' }}>
                      <AnimatedCounter target={100} suffix="%" />
                    </span>
                  }
                  label="Account Handling Perfection"
                  icon={Award}
                  index={0}
                />
              </div>

              <div className="home-stat-card-shell">
                <StatCard
                  number={
                    <span style={{ color: '#171313' }}>
                      <AnimatedCounter target={25} suffix="+" />
                    </span>
                  }
                  label="Satisfied Clients"
                  icon={Users}
                  index={1}
                />
              </div>

              <div className="home-stat-card-shell">
                <StatCard
                  number={
                    <span style={{ color: '#171313' }}>
                      <AnimatedCounter
                        target={25}
                        prefix="$"
                        suffix="K+"
                      />
                    </span>
                  }
                  label="Revenue Generated"
                  icon={DollarSign}
                  index={2}
                />
              </div>

              <div className="home-stat-card-shell">
                <StatCard
                  number={
                    <span style={{ color: '#171313' }}>
                      <AnimatedCounter target={99} suffix="%" />
                    </span>
                  }
                  label="Client Retention"
                  icon={ThumbsUp}
                  index={3}
                />
              </div>

            </div>
          </div>
        </section>

        {/* ===============================================
            MARKETPLACES
        =============================================== */}

        <section className="border-y border-[#171313]/15 bg-primary-lighter-bg/30 py-24">

          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">

            <h2 className="mb-4 font-heading text-3xl font-extrabold text-primary-dark md:text-4xl">
              <span className="text-[#DA0807]">
                Marketplaces
              </span>{' '}
              We Work With
            </h2>

            <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
              Marketplace specialists to help you launch, manage and grow wherever your customers shop.
            </p>

            <div
              className="marketplace-marquee"
              aria-label="Marketplaces we support"
            >
              <div className="marketplace-track">
                {[...marketplaceItems, ...marketplaceItems].map(
                  (service, index) => (
                    <Link
                      key={`${service.slug}-${index}`}
                      to={servicePath(service)}
                      className="marketplace-logo-card"
                      aria-label={`${service.title} services`}
                    >
                      {service.logoUrl ? (
                        <img
                          src={service.logoUrl}
                          alt={`${service.title} logo`}
                          loading="lazy"
                        />
                      ) : (
                        <span className="marketplace-fallback">
                          {service.title.slice(0, 1)}
                        </span>
                      )}

                      <span>{service.title}</span>
                    </Link>
                  )
                )}
              </div>
            </div>

          </div>
        </section>

        {/* ===============================================
            HOW WE WORK
        =============================================== */}

        <section className="bg-background py-32">

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* SECTION INTRODUCTION */}

            <div className="mx-auto mb-20 max-w-3xl text-center">
              <h2 className="mb-6 font-heading text-4xl font-extrabold text-primary-dark md:text-5xl">
                How We <span className="text-[#DA0807]">Work</span>
              </h2>

              <p className="text-xl text-muted-foreground">
                A simple, transparent process that takes you from idea to results.
              </p>
            </div>

            {/* PROCESS CARDS */}

            <div className="home-card-grid grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">

              {processSteps.map((step, index) => (
                <div
                  key={step.number}
                  className="home-process-step-shell"
                >
                  <ProcessStep
                    {...step}
                    isLast={index === processSteps.length - 1}
                    index={index}
                  />
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* ===============================================
            BOTTOM CTA
        =============================================== */}

        <section className="relative overflow-hidden bg-primary-dark py-32">

          <picture className="absolute inset-0 z-0 block h-full w-full">
            <source
              media="(max-width: 767px)"
              srcSet="/hero-above-footer-mobile.png"
            />

            <img
              src="/hero-above-footer-laptop.png"
              alt=""
              aria-hidden="true"
              className="block h-full w-full object-cover object-center"
            />
          </picture>

          <div
            className="absolute inset-0 z-0 bg-black/50"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">

            <h2 className="mb-8 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              Ready to Grow Your Business?
            </h2>

            <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-white/90">
              Talk to the Raiwa Technologies team about your goals. Get honest
              advice and a clear plan for growing your brand.
            </p>

            <div className="flex flex-col justify-center gap-6 sm:flex-row">

              <Link to="/contact">
                <Button
                  size="lg"
                  className="home-hero-button h-16 w-full bg-white px-10 text-lg font-bold text-primary-dark hover:bg-primary-lighter-bg hover:text-primary sm:w-auto"
                >
                  Book a Free Consultation
                </Button>
              </Link>

            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default HomePage;