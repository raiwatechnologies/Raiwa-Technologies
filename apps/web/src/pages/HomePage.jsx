
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
   HOMEPAGE
------------------------------------------------------- */

const HomePage = () => {
  const navigate = useNavigate();
  const [activeProcessTab, setActiveProcessTab] = React.useState('startup');

  /* -------------------------------------------------------
     FEATURED SERVICES - ALL SIX MAIN CATEGORIES
  ------------------------------------------------------- */

  const featuredServiceContent = [
    {
      title: 'Ecommerce',
      slug: 'ecommerce',
      description:
        'Marketplace store setup, management and growth.',
    },
    {
      title: 'Marketing',
      slug: 'marketing',
      description:
        'Digital marketing, SEO and audience growth.',
    },
    {
      title: 'Development',
      slug: 'development',
      description:
        'Websites, apps, games and creative design.',
    },
    {
      title: 'Ads',
      slug: 'ads',
      description:
        'Targeted advertising campaigns and optimization.',
    },
    {
      title: 'Management',
      slug: 'management',
      description:
        'Reliable website and account management.',
    },
    {
      title: 'Branding & Creative',
      slug: 'branding-and-creative',
      description:
        'Brand identity and visual content creation.',
    },
  ];

  // Automatically get main service images from services.js.
  const featuredServices = featuredServiceContent.map((service) => {
    const mainService = mainServices.find(
      (item) => item.slug === service.slug
    );

    return {
      ...service,
      image:
        mainService?.themeImage ||
        mainService?.image ||
        '',
    };
  });

  /* -------------------------------------------------------
     SERVICE PAGE ROUTING
  ------------------------------------------------------- */

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

  /* -------------------------------------------------------
     MARKETPLACES
  ------------------------------------------------------- */

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

  /* -------------------------------------------------------
     PLATFORM LOGOS MARQUEE
     EXISTING LOGOS + 6 NEW PNG LOGOS
  ------------------------------------------------------- */

  const additionalPlatformLogos = [
    {
      title: 'Android',
      logoUrl: '/service-assets/android-logo.png',
    },
    {
      title: 'Apple',
      logoUrl: '/service-assets/apple-logo.png',
    },
    {
      title: 'App Store',
      logoUrl: '/service-assets/appstore-logo.png',
    },
    {
      title: 'iOS',
      logoUrl: '/service-assets/ios-logo.png',
    },
    {
      title: 'Play Store',
      logoUrl: '/service-assets/playstore-logo.png',
    },
    {
      title: 'Unity',
      logoUrl: '/service-assets/unity-logo.png',
    },
  ];

  const selectedPlatformSlugs = [
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
  ];

  const existingPlatformLogos = selectedPlatformSlugs
    .map((slug) => services.find((item) => item.slug === slug))
    .filter((service) => service && service.logoUrl)
    .map((service) => ({
      title: service.title,
      logoUrl: service.logoUrl,
    }));

  const platformLogoItems = [
    ...existingPlatformLogos,
    ...additionalPlatformLogos,
  ];

  /* -------------------------------------------------------
     BENEFIT FEATURES - HORIZONTAL FEATURE LIST
  ------------------------------------------------------- */

  const benefitFeatures = [
    {
      icon: LineChart,
      title: 'Sustainable Growth',
      description:
        'We skip risky shortcuts and build steady growth through optimized listings, strong SEO and loyal customers, so your brand keeps growing long after the first sale.',
    },
    {
      icon: Target,
      title: 'Measurable Results',
      description:
        'You will always know where your money goes and what it earns. Clear reports on sales, ad spend and performance keep every decision backed by real numbers.',
    },
    {
      icon: Activity,
      title: 'Cost-Effective Allocation',
      description:
        "Every dollar of your budget is planned with care. We focus spend on the channels and products that perform, and cut what doesn't, for a stronger return.",
    },
    {
      icon: Award,
      title: 'Long-term Success',
      description:
        'We work as your long-term partner, adapting to marketplace and algorithm changes so your brand stays competitive and keeps moving forward.',
    },
  ];

  /* -------------------------------------------------------
     HOW WE WORK - STARTUP & ENTERPRISE PROCESSES
  ------------------------------------------------------- */

  const workProcessTabs = {
    startup: {
      label: 'Startup Product Development',
      steps: [
        {
          number: '1',
          icon: Lightbulb,
          title: 'Discovery Call',
          description:
            'We discuss your product idea, business goals, target users, market opportunity and key requirements to define the right product direction.',
        },
        {
          number: '2',
          icon: Target,
          title: 'MVP Planning',
          description:
            'We prioritize core MVP features, define the product roadmap, select the right technology stack and build a practical development plan.',
        },
        {
          number: '3',
          icon: Settings,
          title: 'Design & Development',
          description:
            'We shape the user experience and build your product in focused stages, keeping you involved through regular updates and reviews.',
        },
        {
          number: '4',
          icon: Rocket,
          title: 'Testing & Launch',
          description:
            'We test key features, refine the experience and prepare your product for launch, then help you plan the next improvements.',
        },
      ],
    },
    enterprise: {
      label: 'Enterprise Software Solutions',
      steps: [
        {
          number: '1',
          icon: Users,
          title: 'Business & Requirements Analysis',
          description:
            'We work with your stakeholders to understand business workflows, operational challenges, system requirements and project priorities.',
        },
        {
          number: '2',
          icon: Target,
          title: 'Solution Architecture',
          description:
            'We define the system architecture, integrations, technology stack and delivery roadmap around your organization’s needs.',
        },
        {
          number: '3',
          icon: Settings,
          title: 'Development & Integration',
          description:
            'We build and configure the solution, connect required systems and keep implementation aligned with your teams and workflows.',
        },
        {
          number: '4',
          icon: Award,
          title: 'Quality, Deployment & Support',
          description:
            'We validate functionality, coordinate deployment and provide ongoing improvements and support as your business requirements evolve.',
        },
      ],
    },
  };

  const activeWorkProcess = workProcessTabs[activeProcessTab];

  return (
    <>
      <Helmet>
        <title>
          Raiwa Technologies | Ecommerce, Development & Digital Growth
        </title>

        <meta
          name="description"
          content="Raiwa Technologies provides ecommerce management, development, branding and creative services, digital marketing, SEO, advertising and business management."
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
        .home-benefit-feature,
        .home-stat-card-shell {
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
          flex-shrink: 0;
        }

        .home-service-card-content {
          display: flex;
          flex: 1;
          min-width: 0;
          flex-direction: column;
          justify-content: center;
          padding: 13px 14px 15px;
        }

        .home-service-card-title {
          overflow: hidden;
          color: #171313;
          font-size: 16px;
          font-weight: 800;
          line-height: 1.3;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .home-service-card-description {
          margin-top: 5px;
          overflow: hidden;
          color: #777777;
          font-size: 12px;
          font-weight: 500;
          line-height: 1.5;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* ================================================
           HORIZONTAL BENEFIT FEATURE LIST
        ================================================ */

        .home-benefit-feature {
          display: flex;
          min-width: 0;
          height: 100%;
          align-items: flex-start;
          gap: 17px;
          padding: 22px;
          border: 1px solid rgba(23, 19, 19, 0.10);
          border-radius: 14px;
          background: #ffffff;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.025);
        }

        .home-benefit-feature:hover {
          transform: translate3d(0, 0, 18px) scale(1.015);
          border: 1px solid rgba(23, 19, 19, 0.10);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.07);
          z-index: 2;
        }

        .home-benefit-feature-icon {
          display: flex;
          flex: 0 0 48px;
          width: 48px;
          height: 48px;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(23, 19, 19, 0.08);
          border-radius: 12px;
          background: #F7F7F7;
        }

        .home-benefit-feature-icon svg {
          width: 23px;
          height: 23px;
          color: #DA0807;
          stroke-width: 2;
        }

        .home-benefit-feature-content {
          flex: 1;
          min-width: 0;
        }

        .home-benefit-feature-title {
          margin-bottom: 7px;
          color: #171313;
          font-size: 17px;
          font-weight: 800;
          line-height: 1.35;
        }

        .home-benefit-feature-description {
          color: #777777;
          font-size: 13px;
          font-weight: 400;
          line-height: 1.7;
        }

        .home-benefit-feature-divider {
          width: 34px;
          height: 2px;
          margin-top: 12px;
          border-radius: 4px;
          background: #DA0807;
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
           HOW WE WORK - TWO BUSINESS PROCESS TABS
        ================================================ */

        .home-process-tabs {
          display: flex;
          width: 100%;
          max-width: 850px;
          margin: 0 auto 34px;
          border-bottom: 1px solid rgba(23, 19, 19, 0.14);
        }

        .home-process-tab {
          display: flex;
          flex: 1 1 50%;
          min-width: 0;
          align-items: center;
          justify-content: center;
          gap: 11px;
          padding: 17px 18px;
          border: 0;
          border-bottom: 3px solid transparent;
          background: transparent;
          color: #777777;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.4;
          text-align: center;
          cursor: pointer;
          transition:
            color 220ms ease,
            border-color 220ms ease,
            background 220ms ease;
        }

        .home-process-tab svg {
          width: 23px;
          height: 23px;
          flex: 0 0 auto;
        }

        .home-process-tab:hover,
        .home-process-tab[aria-selected="true"] {
          color: #DA0807;
        }

        .home-process-tab[aria-selected="true"] {
          border-bottom-color: #DA0807;
          background: linear-gradient(
            to top,
            rgba(218, 8, 7, 0.055),
            transparent 75%
          );
        }

        .home-process-tab:focus-visible {
          outline: 2px solid #DA0807;
          outline-offset: -3px;
          border-radius: 8px 8px 0 0;
        }

        .home-process-panel {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          align-items: stretch;
          gap: 48px;
        }

        .home-process-timeline {
          min-width: 0;
        }

        .home-process-item {
          position: relative;
          display: grid;
          grid-template-columns: 78px minmax(0, 1fr);
          gap: 16px;
          min-height: 142px;
          padding: 17px 18px 17px 12px;
          border-radius: 15px;
          transition:
            background-color 220ms ease,
            box-shadow 220ms ease;
        }

        .home-process-item.is-active {
          background: #FFF7F7;
          box-shadow: inset 3px 0 0 #DA0807;
        }

        .home-process-item:hover:not(.is-active) {
          background: #FAFAFA;
        }

        .home-process-marker-column {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .home-process-number {
          position: relative;
          z-index: 1;
          display: flex;
          width: 54px;
          height: 54px;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(218, 8, 7, 0.17);
          border-radius: 50%;
          background: #FFFFFF;
          color: #DA0807;
          font-size: 17px;
          font-weight: 800;
          box-shadow: 0 4px 12px rgba(23, 19, 19, 0.08);
        }

        .home-process-item.is-active .home-process-number {
          border-color: #DA0807;
          background: #DA0807;
          color: #FFFFFF;
          box-shadow: 0 6px 16px rgba(218, 8, 7, 0.20);
        }

        .home-process-connector {
          position: absolute;
          top: 62px;
          bottom: -17px;
          left: 50%;
          width: 1px;
          border-left: 2px dashed rgba(23, 19, 19, 0.20);
          transform: translateX(-50%);
        }

        .home-process-copy {
          min-width: 0;
          padding: 1px 0 7px;
        }

        .home-process-copy h3 {
          display: flex;
          align-items: center;
          gap: 9px;
          margin: 0 0 7px;
          color: #171313;
          font-size: 21px;
          font-weight: 750;
          line-height: 1.3;
        }

        .home-process-step-icon {
          width: 20px;
          height: 20px;
          flex: 0 0 auto;
          color: #DA0807;
          stroke-width: 2;
        }

        .home-process-copy p {
          margin: 0;
          color: #6F6F6F;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.65;
        }

        .home-process-image-column {
          display: flex;
          min-width: 0;
          flex-direction: column;
          justify-content: center;
          gap: 12px;
        }

        .home-process-image-placeholder {
          position: relative;
          display: flex;
          min-height: 430px;
          width: 100%;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 2px dashed rgba(218, 8, 7, 0.28);
          border-radius: 22px;
          background:
            radial-gradient(
              circle at 85% 15%,
              rgba(218, 8, 7, 0.09),
              transparent 28%
            ),
            radial-gradient(
              circle at 10% 90%,
              rgba(218, 8, 7, 0.055),
              transparent 30%
            ),
            #F7F7F7;
        }

        .home-process-image-placeholder::before,
        .home-process-image-placeholder::after {
          position: absolute;
          content: "";
          border: 1px solid rgba(218, 8, 7, 0.10);
          border-radius: 50%;
          pointer-events: none;
        }

        .home-process-image-placeholder::before {
          width: 240px;
          height: 240px;
          top: -115px;
          right: -75px;
        }

        .home-process-image-placeholder::after {
          width: 190px;
          height: 190px;
          bottom: -95px;
          left: -65px;
        }

        .home-process-image-placeholder-content {
          position: relative;
          z-index: 1;
          max-width: 300px;
          padding: 24px;
          text-align: center;
        }

        .home-process-image-placeholder-label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 13px;
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(218, 8, 7, 0.09);
          color: #DA0807;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
        }

        .home-process-image-placeholder-content h3 {
          margin: 0 0 8px;
          color: #171313;
          font-size: 20px;
          font-weight: 800;
        }

        .home-process-image-placeholder-content p {
          margin: 0;
          color: #777777;
          font-size: 13px;
          line-height: 1.6;
        }

        .home-process-image-note {
          color: #999999;
          font-size: 12px;
          line-height: 1.5;
          text-align: center;
        }

        @media (max-width: 900px) {
          .home-process-panel {
            grid-template-columns: minmax(0, 1fr) minmax(0, 0.85fr);
            gap: 25px;
          }

          .home-process-image-placeholder {
            min-height: 390px;
          }

          .home-process-item {
            grid-template-columns: 65px minmax(0, 1fr);
            gap: 12px;
            padding-left: 8px;
            padding-right: 10px;
          }

          .home-process-copy h3 {
            font-size: 18px;
          }
        }

        @media (max-width: 767px) {
          .home-process-tabs {
            margin-bottom: 24px;
          }

          .home-process-tab {
            gap: 7px;
            padding: 13px 8px;
            font-size: 13px;
          }

          .home-process-tab svg {
            width: 19px;
            height: 19px;
          }

          .home-process-panel {
            grid-template-columns: minmax(0, 1fr);
            gap: 24px;
          }

          .home-process-image-placeholder {
            min-height: 300px;
          }

          .home-process-item {
            min-height: 130px;
          }
        }

        @media (max-width: 480px) {
          .home-process-tab {
            flex-direction: column;
            min-height: 78px;
            font-size: 12px;
          }

          .home-process-item {
            grid-template-columns: 52px minmax(0, 1fr);
            gap: 10px;
            padding: 14px 9px;
          }

          .home-process-number {
            width: 42px;
            height: 42px;
            font-size: 14px;
          }

          .home-process-connector {
            top: 50px;
          }

          .home-process-copy h3 {
            font-size: 16px;
          }

          .home-process-copy p {
            font-size: 12px;
          }

          .home-process-image-placeholder {
            min-height: 250px;
            border-radius: 16px;
          }
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
           RESPONSIVE FEATURE LIST
        ================================================ */

        @media (max-width: 480px) {
          .home-benefit-feature {
            gap: 13px;
            padding: 17px;
          }

          .home-benefit-feature-icon {
            flex-basis: 42px;
            width: 42px;
            height: 42px;
          }

          .home-benefit-feature-title {
            font-size: 15px;
          }

          .home-benefit-feature-description {
            font-size: 12px;
          }
        }

        /* ================================================
           REDUCED MOTION ACCESSIBILITY
        ================================================ */

        @media (prefers-reduced-motion: reduce) {
          .home-service-card-shell,
          .home-benefit-feature,
          .home-stat-card-shell,
          .home-process-tab,
          .home-process-item,
          .home-stat-card-shell > *,
          .home-hero-button {
            transition: none !important;
          }

          .home-service-card-shell:hover,
          .home-benefit-feature:hover,
          .home-stat-card-shell:hover,
          .home-process-item:hover,
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
                  We Build{' '}
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
                  {platformLogoItems.map((item, index) => (
                    <div
                      key={`${copy}-${item.title}-${index}`}
                      className="flex w-24 shrink-0 items-center justify-center sm:w-28"
                    >
                      <img
                        src={item.logoUrl}
                        alt={
                          copy === 0
                            ? `${item.title} logo`
                            : ''
                        }
                        loading="lazy"
                        draggable="false"
                        className="h-16 w-16 object-contain sm:h-[72px] sm:w-[72px]"
                      />
                    </div>
                  ))}
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
            HIGH-IMPACT SERVICES - SIX MAIN CATEGORIES
            DESKTOP: 3 CARDS + 3 CARDS
        =============================================== */}

        <section className="bg-background py-10 md:py-14">

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="mx-auto mb-8 max-w-3xl text-center">
              <h2 className="mb-2 font-heading text-3xl font-extrabold text-primary-dark md:text-4xl">
                High-Impact{' '}
                <span className="text-[#DA0807]">
                  Services
                </span>
              </h2>

              <p className="text-sm text-muted-foreground md:text-base">
                Focused solutions to help your business grow.
              </p>
            </div>

            <div className="home-card-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {featuredServices.map((service) => (
                <div
                  key={service.slug}
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

                  <img
                    src={service.image}
                    alt={`${service.title} services`}
                    loading="lazy"
                    className="home-service-card-image"
                  />

                  <div className="home-service-card-content">

                    <h3 className="home-service-card-title">
                      {service.title}
                    </h3>

                    <p className="home-service-card-description">
                      {service.description}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>
        </section>

        {/* ===============================================
            WHAT WE PROVIDE + STATISTICS
        =============================================== */}

        <section className="relative overflow-hidden bg-[#F7F7F7] py-20 md:py-28">

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

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

            {/* HORIZONTAL BENEFIT FEATURE LIST */}

            <div className="home-card-grid mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">

              {benefitFeatures.map((feature) => {
                const FeatureIcon = feature.icon;

                return (
                  <article
                    key={feature.title}
                    className="home-benefit-feature"
                  >

                    <div className="home-benefit-feature-icon">
                      <FeatureIcon aria-hidden="true" />
                    </div>

                    <div className="home-benefit-feature-content">

                      <h3 className="home-benefit-feature-title">
                        {feature.title}
                      </h3>

                      <p className="home-benefit-feature-description">
                        {feature.description}
                      </p>

                      <div
                        className="home-benefit-feature-divider"
                        aria-hidden="true"
                      />

                    </div>

                  </article>
                );
              })}

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
            HOW WE WORK - STARTUP & ENTERPRISE TABS
        =============================================== */}

        <section className="bg-background py-24 md:py-28">

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
              <h2 className="mb-5 font-heading text-4xl font-extrabold text-primary-dark md:text-5xl">
                How We Grow Your{' '}
                <span className="text-[#DA0807]">Business</span>
              </h2>

              <p className="text-lg text-muted-foreground md:text-xl">
                A simple, transparent process tailored to your business and goals.
              </p>
            </div>

            <div
              className="home-process-tabs"
              role="tablist"
              aria-label="Choose your project type"
            >
              <button
                type="button"
                id="startup-process-tab"
                role="tab"
                aria-selected={activeProcessTab === 'startup'}
                aria-controls="startup-enterprise-process-panel"
                className="home-process-tab"
                onClick={() => setActiveProcessTab('startup')}
              >
                <Rocket aria-hidden="true" />
                <span>Startup Product Development</span>
              </button>

              <button
                type="button"
                id="enterprise-process-tab"
                role="tab"
                aria-selected={activeProcessTab === 'enterprise'}
                aria-controls="startup-enterprise-process-panel"
                className="home-process-tab"
                onClick={() => setActiveProcessTab('enterprise')}
              >
                <Users aria-hidden="true" />
                <span>Enterprise Software Solutions</span>
              </button>
            </div>

            <div
              id="startup-enterprise-process-panel"
              className="home-process-panel"
              role="tabpanel"
              aria-labelledby={`${activeProcessTab}-process-tab`}
            >
              <div className="home-process-timeline">
                {activeWorkProcess.steps.map((step, index) => {
                  const StepIcon = step.icon;

                  return (
                    <article
                      key={`${activeProcessTab}-${step.number}`}
                      className={`home-process-item ${index === 0 ? 'is-active' : ''}`}
                    >
                      <div
                        className="home-process-marker-column"
                        aria-hidden="true"
                      >
                        <div className="home-process-number">
                          {step.number}
                        </div>

                        {index !== activeWorkProcess.steps.length - 1 && (
                          <div className="home-process-connector" />
                        )}
                      </div>

                      <div className="home-process-copy">
                        <h3>
                          <StepIcon
                            className="home-process-step-icon"
                            aria-hidden="true"
                          />
                          <span>{step.title}</span>
                        </h3>

                        <p>{step.description}</p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="home-process-image-column">

                {activeProcessTab === 'startup' ? (
                  <div
                    className="home-process-image-placeholder"
                    role="img"
                    aria-label="Startup Product Development image placeholder"
                  >
                    <div className="home-process-image-placeholder-content">
                      <span className="home-process-image-placeholder-label">
                        STARTUP IMAGE AREA
                      </span>

                      <h3>Startup Product Development</h3>

                      <p>
                        Add your startup-focused image here. Replace this placeholder with your Startup image.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="home-process-image-placeholder"
                    role="img"
                    aria-label="Enterprise Software Solutions image placeholder"
                  >
                    <div className="home-process-image-placeholder-content">
                      <span className="home-process-image-placeholder-label">
                        ENTERPRISE IMAGE AREA
                      </span>

                      <h3>Enterprise Software Solutions</h3>

                      <p>
                        Add your enterprise-focused image here. Replace this placeholder with your Enterprise image.
                      </p>
                    </div>
                  </div>
                )}

                <p className="home-process-image-note">
                  Each tab has its own separate image placeholder.
                </p>
              </div>
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