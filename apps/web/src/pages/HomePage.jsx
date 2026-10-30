import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShoppingCart,
  Megaphone,
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
import ServiceCard from '@/components/ServiceCard.jsx';
import StatCard from '@/components/StatCard.jsx';
import BenefitCard from '@/components/BenefitCard.jsx';
import ProcessStep from '@/components/ProcessStep.jsx';

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

/* Custom upward-growth graph icon for service cards */
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

const HomePage = () => {
  const navigate = useNavigate();

  const featuredServices = [
    {
      icon: GrowthChartIcon,
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
      icon: GrowthChartIcon,
      title: 'Marketing',
      image: '/service-assets/marketing-theme-image.jpg',
      description:
        'Build brand awareness, attract the right audience and grow your business through digital marketing, SEO and intelligent automation.',
      benefits: [
        'Digital & Social Media Marketing',
        'SEO Optimization',
        'Marketing Automation',
      ],
    },
    {
      icon: GrowthChartIcon,
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

      {/* Shared homepage interaction and shadow styling */}
      <style>{`
        /* HIGH-IMPACT SERVICE CARDS */

        .home-service-card-shell {
          height: 100%;
          min-width: 0;
          cursor: pointer;
          border-radius: 1rem;
          transition:
            transform 280ms ease,
            filter 280ms ease;
          perspective: 1000px;
        }

        .home-service-card-shell > * {
          height: 100%;
          border: 1px solid rgba(23, 19, 19, 0.30) !important;
          border-radius: 1rem;
          box-shadow:
            0 5px 12px rgba(23, 19, 19, 0.09),
            0 13px 28px rgba(23, 19, 19, 0.13) !important;
          transition:
            border-color 280ms ease,
            box-shadow 280ms ease,
            transform 280ms ease;
        }

        .home-service-card-shell:hover {
          transform: translateY(-8px) scale(1.012);
          z-index: 2;
        }

        .home-service-card-shell:hover > * {
          border-color: rgba(23, 19, 19, 0.80) !important;
          box-shadow:
            0 0 0 2px rgba(23, 19, 19, 0.12),
            0 12px 22px rgba(23, 19, 19, 0.13),
            0 23px 42px rgba(23, 19, 19, 0.20) !important;
        }

        .home-service-card-shell:focus-visible {
          outline: 3px solid #DA0807;
          outline-offset: 5px;
        }

        /* Simple red benefit dots */
        .home-service-card-shell ul li > div:first-child {
          width: 8px !important;
          height: 8px !important;
          min-width: 8px !important;
          min-height: 8px !important;
          margin-right: 12px !important;
          background: #DA0807 !important;
          border-radius: 50% !important;
          overflow: hidden;
        }

        .home-service-card-shell ul li > div:first-child > div {
          display: none !important;
        }

        /* WHAT WE PROVIDE CARDS */

        .home-benefit-card-shell {
          height: 100%;
          transition: transform 280ms ease;
        }

        .home-benefit-card-shell > * {
          height: 100%;
          border: 1px solid rgba(23, 19, 19, 0.24) !important;
          box-shadow:
            0 5px 12px rgba(23, 19, 19, 0.07),
            0 12px 28px rgba(23, 19, 19, 0.13) !important;
          transition:
            border-color 280ms ease,
            box-shadow 280ms ease;
        }

        .home-benefit-card-shell:hover {
          transform: translateY(-6px);
        }

        .home-benefit-card-shell:hover > * {
          border-color: rgba(23, 19, 19, 0.65) !important;
          box-shadow:
            0 0 0 1px rgba(23, 19, 19, 0.10),
            0 17px 35px rgba(23, 19, 19, 0.19) !important;
        }

        .home-benefit-card-shell h3,
        .home-benefit-card-shell h4 {
          color: #171313 !important;
        }

        /* STATISTIC CARDS */

        .home-stat-card-shell {
          height: 100%;
          transition: transform 280ms ease;
        }

        .home-stat-card-shell > * {
          height: 100%;
          border: 1px solid rgba(23, 19, 19, 0.24) !important;
          box-shadow:
            0 5px 12px rgba(23, 19, 19, 0.07),
            0 12px 25px rgba(23, 19, 19, 0.13) !important;
          transition:
            border-color 280ms ease,
            box-shadow 280ms ease;
        }

        .home-stat-card-shell:hover {
          transform: translateY(-5px);
        }

        .home-stat-card-shell:hover > * {
          border-color: rgba(23, 19, 19, 0.65) !important;
          box-shadow:
            0 0 0 1px rgba(23, 19, 19, 0.10),
            0 17px 32px rgba(23, 19, 19, 0.18) !important;
        }

        /* HOW WE WORK CARDS */

        .home-process-step-shell {
          height: 100%;
          transition: transform 280ms ease;
        }

        .home-process-step-shell > * {
          height: 100%;
          border: 1px solid rgba(23, 19, 19, 0.24) !important;
          box-shadow:
            0 5px 12px rgba(23, 19, 19, 0.07),
            0 12px 25px rgba(23, 19, 19, 0.13) !important;
          transition:
            border-color 280ms ease,
            box-shadow 280ms ease;
        }

        .home-process-step-shell:hover {
          transform: translateY(-5px);
        }

        .home-process-step-shell:hover > * {
          border-color: rgba(23, 19, 19, 0.65) !important;
          box-shadow:
            0 0 0 1px rgba(23, 19, 19, 0.10),
            0 17px 32px rgba(23, 19, 19, 0.18) !important;
        }

        /* HERO BUTTONS */

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

        @media (prefers-reduced-motion: reduce) {
          .home-service-card-shell,
          .home-service-card-shell > *,
          .home-benefit-card-shell,
          .home-benefit-card-shell > *,
          .home-stat-card-shell,
          .home-stat-card-shell > *,
          .home-process-step-shell,
          .home-process-step-shell > *,
          .home-hero-button {
            transition: none !important;
          }

          .home-service-card-shell:hover,
          .home-benefit-card-shell:hover,
          .home-stat-card-shell:hover,
          .home-process-step-shell:hover,
          .home-hero-button:hover {
            transform: none;
          }
        }
      `}</style>

      <div className="flex flex-col bg-background">

        {/* HERO SECTION */}
        <section className="relative overflow-hidden min-h-[700px] flex items-center py-16 md:min-h-[760px] md:py-24">

          {/* Clear hero image without dark overlay or shadow */}
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

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/90 text-[#171313] font-bold text-sm mb-8 border border-[#171313]/15 shadow-sm">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#DA0807] opacity-30 animate-ping" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#DA0807]" />
                  </span>

                  Now Onboarding New Ecommerce Brands
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#171313] leading-[1.1] mb-6 font-heading tracking-tight">
                  We Built{' '}
                  <span className="text-[#DA0807]">
                    Together.
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-[#171313]/85 mb-10 leading-relaxed max-w-2xl font-medium">
                 Raiwa Technologies — Empowering Growth Through Digital Solutions.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 items-center">

                  <Link to="/contact" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="home-hero-button w-full text-lg h-14 px-8 font-bold bg-[#DA0807] text-white hover:bg-[#B80707]"
                    >
                      Get a Free Consultation
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>

                  <div className="w-full sm:w-auto">
                    <WhatsAppButton
                      variant="default"
                      className="home-hero-button w-full sm:w-auto h-14 px-8 text-lg"
                    />
                  </div>

                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* SELECTED PLATFORM LOGOS MARQUEE */}
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

        {/* OUR APPROACH */}
        <section className="relative overflow-hidden border-0 bg-primary-lighter-bg/30 pt-0 pb-16">

          <div className="absolute -top-[150px] md:top-0 right-0 w-[600px] h-[600px] bg-[#A09E9D]/15 rounded-full blur-[120px] translate-y-0 md:-translate-y-1/2 translate-x-1/3 pointer-events-none" />

          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#A09E9D]/15 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#171313]/15 text-[#171313] border border-[#171313]/20 shadow-[0_9px_24px_rgba(23,19,19,0.20)] -translate-y-1 font-bold text-sm mb-6 uppercase tracking-widest"
              >
                Our Approach
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading mb-8 text-primary-dark tracking-tight"
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
                className="text-xl text-muted-foreground leading-relaxed"
              >
                At Raiwa Technologies, every decision is tied to your
                results. We combine careful account handling, smart
                technology and honest reporting to build ecommerce
                brands that last.
              </motion.p>

            </div>
          </div>
        </section>

        {/* HIGH-IMPACT SERVICES */}
        <section className="py-20 md:py-28 bg-background">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-6 font-heading">
                High-Impact{' '}
                <span className="text-[#DA0807]">
                  Services
                </span>
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground">
                Focused, practical solutions that help your business
                get found, get sales and keep growing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {featuredServices.map((service, index) => (
                <div
                  key={service.title}
                  className="home-service-card-shell min-w-0"
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
                  <ServiceCard
                    {...service}
                    iconOnly
                    index={index}
                    compact
                  />
                </div>
              ))}

            </div>

            <div className="text-center mt-12 md:mt-16">
              <Link to="/services">
                <Button
                  size="lg"
                  className="bg-white text-[#171313] border-2 border-[#171313]/30 hover:bg-[#171313] hover:text-white hover:border-[#171313] font-bold h-14 px-10 shadow-md hover:shadow-xl transition-all duration-300 text-lg hover:-translate-y-1"
                >
                  Explore All Services
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

          </div>
        </section>

        {/* WHAT WE PROVIDE + STATISTICS */}
        <section className="relative overflow-hidden py-20 md:py-28 bg-primary-lighter-bg/30">

          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A09E9D]/15 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-5 font-heading tracking-tight">
                What We <span className="text-[#DA0807]">Provide</span>
              </h2>

              <div className="w-20 h-1 bg-[#171313]/30 rounded-full mx-auto mb-5" />

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Practical solutions designed to help your business
                grow, perform and succeed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

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

            {/* Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-16 md:mt-24">

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

        {/* MARKETPLACES */}
        <section className="py-24 bg-primary-lighter-bg/30 border-y border-[#171313]/15">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-dark mb-4 font-heading">
              <span className="text-[#DA0807]">
                Marketplaces
              </span>{' '}
              We Work With
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
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

        {/* HOW WE WORK */}
        <section className="py-32 bg-background">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-6 font-heading">
                How We <span className="text-[#DA0807]">Work</span>
              </h2>

              <p className="text-xl text-muted-foreground">
                A simple, transparent process that takes you from idea to results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

              {processSteps.map((step, index) => (
                <div
                  key={index}
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

        {/* BOTTOM CTA */}
        <section className="py-32 bg-primary-dark relative overflow-hidden">

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

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 font-heading tracking-tight">
              Ready to Grow Your Business?
            </h2>

            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Talk to the Raiwa Technologies team about your goals. Get honest
              advice and a clear plan for growing your brand.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">

              <Link to="/contact">
                <Button
                  size="lg"
                  className="home-hero-button w-full sm:w-auto h-16 px-10 font-bold text-lg bg-white text-primary-dark hover:bg-primary-lighter-bg hover:text-primary"
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