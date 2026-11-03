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
  TrendingUp,
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
  const [isVisible, setIsVisible] = React.useState(false);
  const counterRef = React.useRef(null);

  // Observe the counter so it animates only while its section is visible.
  React.useEffect(() => {
    const element = counterRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Replay the count-up animation every six seconds while visible.
  React.useEffect(() => {
    if (!isVisible) return undefined;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) {
      setValue(target);
      return undefined;
    }

    let animationFrame = null;
    let restartTimer = null;
    let cancelled = false;

    const runAnimation = () => {
      setValue(0);
      const startTime = performance.now();

      const animate = (now) => {
        if (cancelled) return;

        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * easedProgress));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      restartTimer = window.setTimeout(runAnimation, 6000);
    };

    runAnimation();

    return () => {
      cancelled = true;
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      if (restartTimer !== null) window.clearTimeout(restartTimer);
    };
  }, [isVisible, target, duration]);

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
  const [showAllServices, setShowAllServices] = React.useState(false);

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
     ABOUT OUR SERVICES - DETAILED SERVICE CONTENT
  ------------------------------------------------------- */

  const aboutServiceDetails = [
    {
      slug: 'ecommerce',
      title: 'Ecommerce Solutions',
      image: '/service-assets/ecommerce-solutions.png',
      description:
        'We help businesses launch, manage and grow their ecommerce operations across leading marketplaces with reliable account management and performance-focused strategies.',
      coverage: [
        'Marketplace store setup and configuration.',
        'Product listings and catalogue optimization.',
        'Account health and policy compliance.',
        'Inventory, orders and store operations.',
        'Marketplace growth and performance monitoring.',
        'Amazon, eBay, Walmart, Shopify and more.',
      ],
    },
    {
      slug: 'marketing',
      title: 'Marketing Solutions',
      image: '/service-assets/marketing-solutions.png',
      description:
        'We build effective digital marketing strategies that strengthen your online presence, reach the right audience and create sustainable brand growth.',
      coverage: [
        'Digital marketing strategy and planning.',
        'Social media marketing and management.',
        'Search Engine Optimization (SEO).',
        'Content strategy and audience growth.',
        'Marketing automation solutions.',
        'Brand awareness and online visibility.',
      ],
    },
    {
      slug: 'development',
      title: 'Development Solutions',
      image: '/service-assets/development-solutions.png',
      description:
        'From websites and mobile applications to games and graphic design, we develop digital experiences that turn ideas into practical, scalable products.',
      coverage: [
        'Custom website development.',
        'Android and iOS application development.',
        'Game development and interactive experiences.',
        'UI/UX and graphics designing.',
        'Custom features and system integrations.',
        'Performance optimization and maintenance.',
      ],
    },
    {
      slug: 'ads',
      title: 'Advertising Solutions',
      image: '/service-assets/advertising-solutions.png',
      description:
        'We create and optimize targeted advertising campaigns across Google and Meta platforms to help businesses reach potential customers and improve campaign performance.',
      coverage: [
        'Google Search and Display advertising.',
        'Meta Facebook and Instagram Ads.',
        'Campaign strategy and audience targeting.',
        'Retargeting and conversion tracking.',
        'Ad creative and campaign optimization.',
        'Performance monitoring and reporting.',
      ],
    },
    {
      slug: 'management',
      title: 'Business Management',
      image: '/service-assets/business-management.png',
      description:
        'We simplify everyday business operations through structured account management, operational support and performance monitoring so you can focus on growth.',
      coverage: [
        'Ecommerce account management.',
        'Store and operational management.',
        'Product and order coordination.',
        'Account health monitoring and support.',
        'Performance tracking and reporting.',
        'Workflow optimization and operational support.',
      ],
    },
    {
      slug: 'branding-and-creative',
      title: 'Branding & Creative',
      image: '/service-assets/branding-creative.png',
      description:
        'We create consistent and professional brand identities through strategic visual design and creative assets that help businesses communicate their value.',
      coverage: [
        'Brand identity and visual direction.',
        'Logo and graphic design.',
        'Social media creative designs.',
        'Marketing and advertising visuals.',
        'Product graphics and promotional assets.',
        'Consistent branding across digital platforms.',
      ],
    },
  ];

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
        'We build sustainable growth through optimized listings, strong SEO, and loyal customers.',
    },
    {
      icon: Target,
      title: 'Measurable Results',
      description:
        'Clear reports on sales, ad spend, and performance ensure every decision is data-driven.',
    },
    {
      icon: Activity,
      title: 'Cost-Effective Allocation',
      description:
        "We optimize every dollar by focusing on high-performing channels and products to maximize returns.",
    },
    {
      icon: Award,
      title: 'Long-term Success',
      description:
        'We adapt to marketplace changes and support your brands long-term growth and success.',
    },
  ];

  /* -------------------------------------------------------
     HOW WE GROW YOUR BUSINESS - FOUR SIMPLE STEPS
  ------------------------------------------------------- */

  const growthSteps = [
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

        .home-featured-services-grid {
          display: grid;
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
          grid-template-columns: minmax(0, 1fr);
          column-gap: 28px;
          row-gap: 34px;
          align-items: stretch;
        }

        @media (min-width: 640px) {
          .home-featured-services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 1024px) {
          .home-featured-services-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            column-gap: 30px;
            row-gap: 36px;
          }
        }

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
          box-shadow: 0 8px 22px rgba(23, 19, 19, 0.03);
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
          background: #FAFAFA;
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
  transform: none !important;
  transition: none !important;
}

.home-stat-card-shell > * {
  height: 100%;
  background: transparent !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  transform: none !important;
  transition: none !important;
}

.home-stat-card-shell:hover {
  transform: none !important;
  z-index: auto;
}

.home-stat-card-shell:hover > * {
  background: transparent !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  transform: none !important;
}

        /* ================================================
           ABOUT OUR SERVICES - PREMIUM SECTION
        ================================================ */

        .home-about-services-section {
          position: relative;
          overflow: hidden;
          padding: 90px 0;
          background: #FFFFFF;
        }

        .home-about-services-heading {
          max-width: 750px;
          margin: 0 auto 75px;
          text-align: center;
        }

        .home-about-services-heading h2 {
          margin-bottom: 16px;
          color: #171313;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 850;
          line-height: 1.2;
          letter-spacing: -0.035em;
        }

        .home-about-services-heading h2 span {
          color: #DA0807;
        }

        .home-about-services-heading p {
          max-width: 620px;
          margin: 0 auto;
          color: #777777;
          font-size: 16px;
          line-height: 1.8;
        }

        .home-about-services-line {
          width: 65px;
          height: 4px;
          margin: 22px auto;
          border-radius: 20px;
          background: #DA0807;
        }

        /* SERVICE ROWS */

        .home-about-service-list {
          display: flex;
          flex-direction: column;
          gap: 34px;
        }

        .home-about-service-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          align-items: center;
          gap: 52px;
          min-width: 0;
          padding: 22px;
          border: 0;
          border-radius: 20px;
          background: #FFFFFF;
          box-shadow: none;
        }

        /* No full-row hover shade: keep service text clean. */

        .home-about-service-row:hover {
          transform: none;
          background: #FFFFFF;
          box-shadow: none;
        }

        /* ALTERNATING IMAGE POSITION */

        .home-about-service-row.is-reversed
        .home-about-service-media-wrap {
          order: 2;
        }

        .home-about-service-row.is-reversed
        .home-about-service-content {
          order: 1;
        }

        /* IMAGE WRAPPER - MATCH HIGH-IMPACT CARD HOVER */

        .home-about-service-media-wrap {
          display: flex;
          min-width: 0;
          width: 100%;
          aspect-ratio: 4 / 3;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 22px;
          background: transparent;
          perspective: 1200px;
        }

        /* SERVICE IMAGES */

        .home-about-service-media {
          display: block;
          width: 100%;
          height: 100%;
          min-width: 0;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          object-position: center;
          border: 0;
          border-radius: 17px;
          background: #F3F3F3;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.025);
          transform-style: preserve-3d;
          transition:
            transform 350ms cubic-bezier(0.2, 0.7, 0.3, 1),
            box-shadow 350ms ease;
        }

        .home-about-service-media-wrap:hover .home-about-service-media {
          transform: translate3d(0, 0, 18px) scale(1.015);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.07);
        }

        /* SERVICE CONTENT */

        .home-about-service-content {
          min-width: 0;
        }

        .home-about-service-content h3 {
          margin-bottom: 17px;
          color: #171313;
          font-size: clamp(25px, 3vw, 34px);
          font-weight: 550;
          line-height: 1.3;
          letter-spacing: 0.005em;
        }

        .home-about-service-description {
          margin-bottom: 25px;
          color: #696969;
          font-size: 15px;
          font-weight: 400;
          line-height: 1.85;
        }

        /* COVERAGE LIST */

        .home-about-service-list-heading {
          margin-bottom: 15px;
          color: #171313;
          font-size: 12px;
          font-weight: 850;
          letter-spacing: 0.10em;
          text-transform: uppercase;
        }

        .home-about-service-points {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 13px 18px;
          margin: 0 0 30px;
          padding: 0;
          list-style: none;
        }

        .home-about-service-point {
          display: flex;
          min-width: 0;
          align-items: flex-start;
          gap: 9px;
          color: #171313;
          font-size: 13px;
          font-weight: 400 !important;
          line-height: 1.6;
        }

        .home-about-service-point * {
          font-weight: 400 !important;
        }

        .home-about-point-mark {
          display: inline-block;
          flex: 0 0 auto;
          margin-top: -1px;
          color: #171313;
          font-size: 18px;
          font-weight: 900;
          line-height: 1.2;
        }

        /* SERVICE BUTTONS */

        .home-about-service-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 13px;
        }

        .home-about-book-link {
          display: inline-flex;
          text-decoration: none;
        }

        .home-about-book-button {
          height: 53px !important;
          padding: 0 24px !important;
          border: 0 !important;
          border-radius: 11px !important;
          background: #FFFFFF !important;
          color: #171313 !important;
          font-size: 14px !important;
          font-weight: 750 !important;
          box-shadow: 0 7px 16px rgba(23, 19, 19, 0.07) !important;
          transition:
            transform 250ms ease,
            background-color 250ms ease,
            color 250ms ease,
            box-shadow 250ms ease !important;
        }

        .home-about-book-button:hover {
          transform: translateY(-4px);
          border: 0 !important;
          background: #DA0807 !important;
          color: #FFFFFF !important;
          box-shadow: 0 12px 24px rgba(23, 19, 19, 0.07) !important;
        }

        .home-about-learn-button {
          display: inline-flex;
          min-height: 53px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0 23px;
          border: 0;
          border-radius: 11px;
          background: #FFFFFF;
          color: #171313;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 7px 16px rgba(23, 19, 19, 0.07);
          transition:
            transform 250ms ease,
            box-shadow 250ms ease;
        }

        .home-about-learn-button svg {
          width: 17px;
          height: 17px;
          color: #171313;
          transition: transform 250ms ease;
        }

        .home-about-learn-button:hover {
          transform: translateY(-4px);
          border: 0;
          background: #F5F3F3;
          color: #171313;
          box-shadow: 0 12px 24px rgba(23, 19, 19, 0.07);
        }

        .home-about-learn-button:hover svg {
          transform: translateX(5px);
          color: #171313;
        }

        .home-about-book-button:focus-visible,
        .home-about-learn-button:focus-visible {
          outline: 3px solid rgba(23, 19, 19, 0.25);
          outline-offset: 4px;
        }

        /* VIEW ALL SERVICES */

        .home-about-view-all-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 42px;
        }

        .home-about-view-all-wrap::before,
        .home-about-view-all-wrap::after {
          width: 38px;
          height: 1px;
          background: rgba(23, 19, 19, 0.28);
          content: '';
        }

        .home-about-view-all-button {
          min-height: 42px;
          padding: 0 20px;
          border: 0;
          border-radius: 999px;
          background: #FFFFFF;
          color: #171313;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.02em;
          box-shadow: 0 7px 16px rgba(23, 19, 19, 0.07);
          cursor: pointer;
          transition:
            transform 240ms ease,
            background-color 240ms ease,
            color 240ms ease,
            box-shadow 240ms ease;
        }

        .home-about-view-all-button:hover {
          transform: translateY(-3px);
          border: 0;
          background: #DA0807;
          color: #FFFFFF;
          box-shadow: 0 12px 22px rgba(23, 19, 19, 0.07);
        }

        .home-about-view-all-button:focus-visible {
          outline: 3px solid rgba(23, 19, 19, 0.25);
          outline-offset: 4px;
        }

        /* RESPONSIVE ABOUT OUR SERVICES */

        @media (max-width: 900px) {
          .home-about-service-row {
            gap: 30px;
            padding: 16px;
          }

          .home-about-service-media-wrap {
            padding: 7px;
          }

          .home-about-service-points {
            grid-template-columns: 1fr;
            gap: 11px;
          }
        }

        @media (max-width: 767px) {
          .home-about-services-section {
            padding: 65px 0;
          }

          .home-about-services-heading {
            margin-bottom: 48px;
          }

          .home-about-service-list {
            gap: 45px;
          }

          .home-about-service-row {
            grid-template-columns: minmax(0, 1fr);
            gap: 22px;
            padding: 14px;
          }

          .home-about-service-row .home-about-service-media-wrap,
          .home-about-service-row.is-reversed .home-about-service-media-wrap {
            order: 1;
          }

          .home-about-service-row .home-about-service-content,
          .home-about-service-row.is-reversed .home-about-service-content {
            order: 2;
          }

          .home-about-service-content h3 {
            font-size: 27px;
          }

          .home-about-service-points {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 480px) {
          .home-about-services-heading h2 {
            font-size: 32px;
          }

          .home-about-services-heading p {
            font-size: 14px;
          }

          .home-about-service-media-wrap {
            border-radius: 16px;
            padding: 6px;
          }

          .home-about-service-media {
            border-radius: 13px;
          }

          .home-about-service-row {
            padding: 10px;
            border-radius: 15px;
          }

          .home-about-service-content h3 {
            font-size: 25px;
          }

          .home-about-service-description {
            font-size: 14px;
          }

          .home-about-service-points {
            grid-template-columns: 1fr;
          }

          .home-about-service-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .home-about-book-link {
            width: 100%;
          }

          .home-about-book-button,
          .home-about-learn-button {
            width: 100%;
          }

          .home-about-view-all-wrap {
            gap: 10px;
            margin-top: 30px;
          }

          .home-about-view-all-wrap::before,
          .home-about-view-all-wrap::after {
            width: 24px;
          }
        }

        /* ================================================
           HOW WE GROW YOUR BUSINESS - FOUR STEP PROCESS
        ================================================ */

        .home-growth-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          align-items: center;
          gap: clamp(30px, 5vw, 68px);
        }

        .home-growth-steps {
          min-width: 0;
        }

        .home-growth-step {
          position: relative;
          display: grid;
          grid-template-columns: 82px minmax(0, 1fr);
          align-items: start;
          gap: 19px;
          min-height: 126px;
          padding: 12px 14px 16px;
          border: 0;
          border-radius: 18px;
          transition:
            transform 240ms cubic-bezier(0.2, 0.7, 0.3, 1),
            background-color 240ms ease,
            border-color 240ms ease,
            box-shadow 240ms ease;
          will-change: transform;
        }

        .home-growth-step:hover {
  transform: translateY(-3px);
  border: 0;
  background: rgba(23, 19, 19, 0.015);
  box-shadow: 0 4px 10px rgba(23, 19, 19, 0.025);
}

        .home-growth-step:focus-within {
          outline: 2px solid rgba(23, 19, 19, 0.25);
          outline-offset: 3px;
        }

        .home-growth-marker {
          position: relative;
          display: flex;
          width: 72px;
          height: 72px;
          align-items: center;
          justify-content: center;
        }

        .home-growth-icon {
          display: flex;
          width: 68px;
          height: 68px;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 50%;
          background: #FFFFFF;
          color: #171313;
          box-shadow: 0 7px 17px rgba(23, 19, 19, 0.07);
          transition:
            transform 240ms ease,
            border-color 240ms ease,
            box-shadow 240ms ease;
        }

        .home-growth-icon svg {
          width: 29px;
          height: 29px;
          stroke-width: 2;
        }

        /* Icon hover only when cursor is directly over the icon */
.home-growth-icon {
  transition:
    background 250ms ease,
    color 250ms ease,
    transform 250ms ease,
    box-shadow 250ms ease;
}

.home-growth-icon:hover {
  background: rgba(218, 8, 7, 0.055) !important;
  color: #DA0807 !important;
  transform: scale(1.025);
  box-shadow: 0 5px 13px rgba(218, 8, 7, 0.07);
}

.home-growth-icon:hover svg {
  color: #DA0807 !important;
  stroke: #DA0807 !important;
}

        .home-growth-number {
          position: absolute;
          top: -5px;
          right: -5px;
          z-index: 2;
          display: flex;
          width: 31px;
          height: 31px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: linear-gradient(145deg, #292929, #080808);
          color: #FFFFFF;
          font-size: 13px;
          font-weight: 800;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.17);
        }

        .home-growth-connector {
  position: absolute;
  top: 87px;
  left: 50px;
  width: 1px;
  height: 20px;
  background: rgba(23, 19, 19, 0.16);
  pointer-events: none;
}

.home-growth-connector::after {
  position: absolute;
  bottom: 0;
  left: -3px;
  width: 6px;
  height: 6px;
  border-right: 1px solid rgba(23, 19, 19, 0.22);
  border-bottom: 1px solid rgba(23, 19, 19, 0.22);
  content: '';
  transform: rotate(45deg);
}

        .home-growth-copy {
          min-width: 0;
          padding: 5px 0 0;
        }

        .home-growth-copy h3 {
          margin: 0 0 7px;
          color: #171313;
          font-size: 21px;
          font-weight: 800;
          line-height: 1.3;
        }

        .home-growth-copy p {
          max-width: 500px;
          margin: 0;
          color: #6F6F6F;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.7;
        }

        /* GROWTH IMAGE - MATCH HIGH-IMPACT CARD HOVER */

        .home-growth-visual {
          position: relative;
          display: flex;
          width: 100%;
          min-width: 0;
          aspect-ratio: 4 / 3;
          align-items: center;
          justify-content: center;
          overflow: visible;
          padding: 8px;
          border: 0;
          border-radius: 26px;
          background: transparent;
          box-shadow: none;
          perspective: 1200px;
        }

        .home-growth-image {
          display: block;
          width: 100%;
          height: 100%;
          aspect-ratio: 4 / 3;
          object-fit: contain;
          object-position: center;
          border: 0;
          border-radius: 18px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.025);
          transform-style: preserve-3d;
          transition:
            transform 350ms cubic-bezier(0.2, 0.7, 0.3, 1),
            box-shadow 350ms ease;
        }

        .home-growth-visual:hover .home-growth-image {
          transform: translate3d(0, 0, 18px) scale(1.015);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.07);
        }

        @media (max-width: 900px) {
          .home-growth-layout {
            grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
            gap: 24px;
          }

          .home-growth-step {
            grid-template-columns: 70px minmax(0, 1fr);
            gap: 13px;
            min-height: 132px;
            padding-left: 8px;
            padding-right: 8px;
          }

          .home-growth-marker {
            width: 66px;
            height: 66px;
          }

          .home-growth-icon {
            width: 62px;
            height: 62px;
          }

          .home-growth-connector {
            top: 82px;
            left: 41px;
          }

          .home-growth-copy h3 {
            font-size: 18px;
          }

          .home-growth-copy p {
            font-size: 13px;
          }
        }

        @media (max-width: 767px) {
          .home-growth-layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 28px;
          }

          .home-growth-step {
            grid-template-columns: 72px minmax(0, 1fr);
            min-height: 116px;
            gap: 13px;
            padding: 9px 8px 14px;
          }

          .home-growth-marker {
            width: 68px;
            height: 68px;
          }

          .home-growth-icon {
            width: 64px;
            height: 64px;
          }

          .home-growth-connector {
            top: 78px;
            left: 42px;
            height: 20px;
          }

          .home-growth-copy h3 {
            font-size: 19px;
          }

          .home-growth-copy p {
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .home-growth-step {
            grid-template-columns: 60px minmax(0, 1fr);
            min-height: 116px;
            gap: 12px;
            padding: 8px 5px 14px;
          }

          .home-growth-marker {
            width: 58px;
            height: 58px;
          }

          .home-growth-icon {
            width: 54px;
            height: 54px;
          }

          .home-growth-icon svg {
            width: 25px;
            height: 25px;
          }

          .home-growth-number {
            top: -5px;
            right: -5px;
            width: 27px;
            height: 27px;
            font-size: 12px;
          }

          .home-growth-connector {
            top: 68px;
            left: 34px;
            height: 20px;
          }

          .home-growth-copy {
            padding-top: 2px;
          }

          .home-growth-copy h3 {
            font-size: 17px;
          }

          .home-growth-copy p {
            font-size: 12px;
            line-height: 1.6;
          }

          .home-growth-visual {
            border-radius: 18px;
          }

          .home-growth-image {
            border-radius: 13px;
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
          .home-hero-button,
          .home-about-service-media,
          .home-about-book-button,
          .home-about-learn-button,
          .home-about-learn-button svg,
          .home-about-view-all-button,
          .home-growth-step,
          .home-growth-icon,
          .home-growth-image {
            transition: none !important;
          }

          .home-service-card-shell:hover,
          .home-benefit-feature:hover,
          .home-stat-card-shell:hover,
          .home-hero-button:hover,
          .home-about-service-media-wrap:hover .home-about-service-media,
          .home-about-book-button:hover,
          .home-about-learn-button:hover,
          .home-about-view-all-button:hover,
          .home-growth-step:hover,
          .home-growth-visual:hover .home-growth-image {
            transform: none !important;
          }
        }

        /* ================================================
           REFINED PAGE-WIDE HEADING TYPOGRAPHY
        ================================================ */

        .home-page-scope h1,
        .home-page-scope h2 {
          font-weight: 700;
          letter-spacing: 0.006em;
          line-height: 1.2;
        }

        .home-page-scope h3,
        .home-page-scope h4,
        .home-page-scope h5,
        .home-page-scope h6 {
          font-weight: 650;
          letter-spacing: 0.008em;
          line-height: 1.3;
        }

        .home-page-scope h1,
        .home-page-scope h2,
        .home-page-scope h3,
        .home-page-scope h4,
        .home-page-scope h5,
        .home-page-scope h6 {
          overflow-wrap: normal;
          word-break: normal;
          text-wrap: pretty;
        }
        
/* ================================================
   MARKETPLACES - CLEAN BORDERLESS CARDS
================================================ */

.marketplace-logo-card {
  border: none !important;
  outline: none !important;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.035) !important;
}

.marketplace-logo-card:hover {
  border: none !important;
  outline: none !important;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.065) !important;
}

      `}</style>

      <div className="home-page-scope flex flex-col bg-background">

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

            <div className="home-card-grid home-featured-services-grid">

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
            ABOUT OUR SERVICES - SIX MAIN SERVICES
        =============================================== */}

        <section className="home-about-services-section">

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* SECTION HEADING */}

            <motion.div
              className="home-about-services-heading"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65 }}
            >

              <h2>
                About Our{' '}
                <span>Services</span>
              </h2>

              <div className="home-about-services-line" />

              <p>
                Explore our complete range of digital solutions.
                From building your brand to managing operations,
                we provide the expertise and support your business
                needs to move forward.
              </p>

            </motion.div>

            {/* SIX MAIN SERVICE SECTIONS */}

            <div className="home-about-service-list">

              {aboutServiceDetails
                .slice(0, showAllServices ? aboutServiceDetails.length : 3)
                .map((service, index) => {

                const mainService = mainServices.find(
                  (item) => item.slug === service.slug
                );

                const learnMorePath = mainService
                  ? mainServicePath(mainService)
                  : '/services';

                return (

                  <motion.article
                    key={service.slug}
                    className={`home-about-service-row ${
                      index % 2 !== 0 ? 'is-reversed' : ''
                    }`}

                    initial={{ opacity: 0, y: 45 }}

                    whileInView={{ opacity: 1, y: 0 }}

                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}

                    transition={{
                      duration: 0.7,
                      delay: 0.08,
                      ease: 'easeOut',
                    }}
                  >

                    {/* SERVICE IMAGE */}

                    <div className="home-about-service-media-wrap">
                      <img
                        src={service.image}
                        alt={`${service.title} service`}
                        loading="lazy"
                        className="home-about-service-media"
                      />
                    </div>

                    {/* SERVICE INFORMATION */}

                    <div className="home-about-service-content">

                      <h3>
                        {service.title}
                      </h3>

                      <p className="home-about-service-description">
                        {service.description}
                      </p>

                      {/* SERVICE COVERAGE */}

                      <h4 className="home-about-service-list-heading">
                        What We Cover
                      </h4>

                      <ul className="home-about-service-points">

                        {service.coverage.map((point) => (

                          <li
                            key={point}
                            className="home-about-service-point"
                          >

                            <span
                              className="home-about-point-mark"
                              aria-hidden="true"
                            >
                              •
                            </span>

                            {point}

                          </li>

                        ))}

                      </ul>

                      {/* ACTION BUTTONS */}

                      <div className="home-about-service-actions">

                        <Link
                          to="/contact"
                          className="home-about-book-link"
                        >

                          <Button
                            size="lg"
                            className="home-about-book-button"
                          >
                            Book Consultation

                            <ArrowRight className="ml-2 h-4 w-4" />

                          </Button>

                        </Link>

                        <Link
                          to={learnMorePath}
                          className="home-about-learn-button"
                        >

                          Learn More

                          <ArrowRight />

                        </Link>

                      </div>

                    </div>

                  </motion.article>

                );

              })}

            </div>

            <div className="home-about-view-all-wrap">
              <button
                type="button"
                className="home-about-view-all-button"
                aria-expanded={showAllServices}
                onClick={() => setShowAllServices((current) => !current)}
              >
                {showAllServices ? 'Show Less' : 'View All'}
              </button>
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

            <div className="mb-10 mt-16 text-center">
  <h2 className="mb-3 font-heading text-4xl font-extrabold tracking-tight text-[#171313] md:text-5xl">
    Our <span className="text-[#DA0807]">Performance</span>
  </h2>
  <p className="text-lg text-muted-foreground md:text-xl">
    Our Success in Numbers
  </p>
</div>

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
            HOW WE GROW YOUR BUSINESS
        =============================================== */}

        <section className="bg-background py-24 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
              <h2 className="mb-5 font-heading text-4xl font-extrabold text-[#171313] md:text-5xl">
                How We Grow Your{' '}
                <span className="text-[#DA0807]">Business</span>
              </h2>

              <p className="text-lg text-muted-foreground md:text-xl">
                A simple, transparent process that takes you from idea to results.
              </p>
            </div>

            <div className="home-growth-layout">
              <div className="home-growth-steps">
                {growthSteps.map((step, index) => {
                  const StepIcon = step.icon;

                  return (
                    <article
                      key={step.number}
                      className="home-growth-step"
                    >
                      <div className="home-growth-marker" aria-hidden="true">
                        <div className="home-growth-icon">
                          <StepIcon />
                        </div>

                      </div>

                      <div className="home-growth-copy">
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>

                      {index < growthSteps.length - 1 && (
                        <span
                          className="home-growth-connector"
                          aria-hidden="true"
                        />
                      )}
                    </article>
                  );
                })}
              </div>

              <div className="home-growth-visual">
                <img
                  src="/service-assets/growth.png"
                  alt="Raiwa Technologies business growth process"
                  loading="lazy"
                  className="home-growth-image"
                />
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