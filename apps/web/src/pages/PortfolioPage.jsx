import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Award,
  Users,
  DollarSign,
  ThumbsUp,
  ShoppingCart,
  Globe,
  ShoppingBag,
  Gamepad2,
  Megaphone,
  Search,
} from 'lucide-react';

import ProjectCard from '@/components/ProjectCard.jsx';
import StatCard from '@/components/StatCard.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Link } from 'react-router-dom';

const PortfolioPage = () => {
  const [filter, setFilter] = useState('All');

  const categories = [
    'All',
    'Ecommerce',
    'Development',
    'Marketing',
    'Ads',
    'SEO Optimization',
    'Management',
  ];

  const projects = [
    {
      title: 'Amazon Store Launch & Growth',
      image: '/service-assets/amazon-theme-image.jpg',
      client: 'Ecommerce · Amazon',
      category: 'Ecommerce',
      icon: ShoppingCart,
      description:
        'Complete seller account setup, search-optimized product listings and ongoing account management that keeps stores healthy, visible and ready to scale.',
      tags: ['Amazon', 'Listings', 'Account Mgmt'],
      metrics: [
        { value: 'End-to-End', label: 'Store Setup' },
        { value: 'Daily', label: 'Account Care' },
      ],
    },
    {
      title: 'Multi-Marketplace Expansion',
      image: '/service-assets/wall-mart-theme.jpg',
      client: 'Ecommerce · eBay, Walmart, Temu, Daraz',
      category: 'Ecommerce',
      icon: Globe,
      description:
        'Expanding established brands onto multiple marketplaces at once, with consistent listings, unified order handling and one team managing every channel.',
      tags: ['eBay', 'Walmart', 'Temu', 'Daraz'],
      metrics: [
        { value: 'Multi-Channel', label: 'Presence' },
        { value: 'One Team', label: 'Managed Together' },
      ],
    },
    {
      title: 'Shopify & TikTok Shop Setup',
      image: '/service-assets/shopify-theme.jpg',
      client: 'Ecommerce · Shopify, TikTok Shop',
      category: 'Ecommerce',
      icon: ShoppingBag,
      description:
        'Conversion-focused Shopify stores and TikTok Shop launches, designed so brands can own their customer experience and tap into social commerce.',
      tags: ['Shopify', 'TikTok Shop', 'Store Design'],
      metrics: [
        { value: 'Custom', label: 'Store Design' },
        { value: 'Launch-Ready', label: 'Social Commerce' },
      ],
    },
    {
      title: 'Game & App Development',
      image: '/service-assets/app-development-theme.jpg',
      client: 'Development · Games, Apps, Web',
      category: 'Development',
      icon: Gamepad2,
      description:
        'Custom mobile games, apps and websites built from concept to launch, with polished design, smooth performance and ongoing support.',
      tags: ['Game Dev', 'App Dev', 'Web Dev'],
      metrics: [
        { value: 'Concept to Launch', label: 'Full Cycle' },
        { value: 'Ongoing', label: 'Support' },
      ],
    },
    {
      title: 'Social Media & Ads Campaigns',
      image: '/service-assets/meta-ads-theme.jpg',
      client: 'Marketing · Meta Ads, Google Ads',
      category: 'Ads',
      icon: Megaphone,
      description:
        'Targeted Meta and Google ad campaigns paired with Instagram, Facebook and TikTok content that builds awareness and drives customers to buy.',
      tags: ['Meta Ads', 'Google Ads', 'Social Media'],
      metrics: [
        { value: 'Targeted', label: 'Audiences' },
        { value: 'Regular', label: 'Reporting' },
      ],
    },
    {
      title: 'SEO & Search Visibility',
      image: '/service-assets/seo-optimization-theme.jpg',
      client: 'SEO · Websites & Marketplaces',
      category: 'SEO Optimization',
      icon: Search,
      description:
        'Technical audits, keyword research and on-page optimization that help websites and marketplace listings get found by high-intent buyers.',
      tags: ['Technical SEO', 'Keywords', 'Content'],
      metrics: [
        { value: 'Full Audit', label: 'Technical SEO' },
        { value: 'Long-Term', label: 'Organic Growth' },
      ],
    },
  ];

  // Replace these sample reviews with real client feedback before publishing.
  const testimonials = [
    {
      quote:
        'Our Amazon account is handled with real care. Listings are clean, issues are fixed quickly, and we always know what is happening with our store.',
      name: 'Amazon Seller',
      role: 'Ecommerce Client',
      rating: 5,
    },
    {
      quote:
        'They set up our Shopify store and TikTok Shop and walked us through everything. Communication was fast and the whole process felt professional.',
      name: 'Online Brand Owner',
      role: 'Shopify & TikTok Shop Client',
      rating: 5,
    },
    {
      quote:
        'Having one team manage all our marketplaces saved us a huge amount of time. Orders, listings and accounts are finally under control.',
      name: 'Multi-Store Seller',
      role: 'Marketplace Management Client',
      rating: 5,
    },
    {
      quote:
        'Our ad campaigns became much more focused. The reporting is clear, and every update explains what is working and what is being improved.',
      name: 'Ecommerce Entrepreneur',
      role: 'Ads & Marketing Client',
      rating: 5,
    },
    {
      quote:
        'From the first idea to the final build, the development team was responsive, creative and very easy to work with.',
      name: 'Startup Founder',
      role: 'Development Client',
      rating: 5,
    },
    {
      quote:
        'Reliable, honest and always available on WhatsApp. It feels like having an in-house team without the extra cost.',
      name: 'Small Business Owner',
      role: 'Long-Term Client',
      rating: 5,
    },
  ];

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <>
      <Helmet>
        <title>Our Work & Client Reviews | Raiwa Technologies</title>

        <meta
          name="description"
          content="Explore the ecommerce, development, marketing and SEO work delivered by Raiwa Technologies, and read what clients say about working with us."
        />
      </Helmet>

      {/* PORTFOLIO CARD HOVER STYLING */}
      <style>{`
        /*
          RAIWA TECHNOLOGIES SHARED CARD HOVER STANDARD

          - Preserve each card's original border.
          - Never add a dark or black border on hover.
          - Normal shadow: 2.5% black.
          - Hover shadow: 7% black.
          - Smooth 3px upward movement.
          - Preserve original card backgrounds and design.
        */

        .portfolio-card-shell {
          min-width: 0;
          height: 100%;
          border-radius: 1rem;
          transition: transform 280ms ease;
        }

        .portfolio-card-shell > * {
          height: 100%;
          box-shadow:
            0 3px 10px rgba(0, 0, 0, 0.025) !important;
          transition:
            box-shadow 280ms ease !important;
        }

        .portfolio-card-shell:hover {
          transform: translateY(-3px);
        }

        .portfolio-card-shell:hover > * {
          box-shadow:
            0 8px 22px rgba(0, 0, 0, 0.07) !important;
        }

        .portfolio-card-shell > *:hover {
          box-shadow:
            0 8px 22px rgba(0, 0, 0, 0.07) !important;
        }

        .portfolio-card-shell:focus-within {
          outline: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .portfolio-card-shell,
          .portfolio-card-shell > * {
            transition: none !important;
          }

          .portfolio-card-shell:hover {
            transform: none;
          }
        }
      `}</style>

      <main className="flex flex-col bg-background">

        {/* HERO SECTION */}
        <section className="relative flex min-h-[70vh] items-center overflow-hidden py-20 md:py-32">

          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1617957689230-231cdaa2fe5c?auto=format&fit=crop&w=2000&q=80"
              alt="Modern workspace"
              className="block h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-[#171313]/85 mix-blend-multiply" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#171313] via-[#171313]/75 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md">
                Our Work
              </div>

              <h1 className="mb-8 font-heading text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                Our Portfolio of{' '}
                <span className="text-[#E5E5E5]">Success</span>
              </h1>

              <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/80 md:text-2xl">
                We don't just deliver services; we build growth. Explore
                the kind of work we do for ambitious brands across
                ecommerce, development, marketing and SEO.
              </p>
            </motion.div>
          </div>
        </section>

        {/* RESULTS BY NUMBERS */}
        <section className="relative z-20 -mt-20 bg-background py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

              <div className="portfolio-card-shell">
                <StatCard
                  number="End-to-end"
                  label="Service Delivery"
                  icon={Award}
                  index={0}
                />
              </div>

              <div className="portfolio-card-shell">
                <StatCard
                  number="Multi-channel"
                  label="Marketplace Support"
                  icon={Users}
                  index={1}
                />
              </div>

              <div className="portfolio-card-shell">
                <StatCard
                  number="Custom"
                  label="Growth Strategies"
                  icon={DollarSign}
                  index={2}
                />
              </div>

              <div className="portfolio-card-shell">
                <StatCard
                  number="Ongoing"
                  label="Optimization & Support"
                  icon={ThumbsUp}
                  index={3}
                />
              </div>

            </div>
          </div>
        </section>

        {/* PROJECT SHOWCASE */}
        <section className="border-y border-primary/10 bg-primary-lighter-bg/30 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-6 font-heading text-3xl font-bold text-[#171313] md:text-5xl">
                Featured Work
              </h2>

              <p className="text-lg text-muted-foreground">
                A look at the kind of projects we deliver, from
                marketplace stores to custom apps and growth campaigns.
              </p>
            </div>

            {/* FILTERS */}
            <div className="mb-16 flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  aria-pressed={filter === category}
                  className={`rounded-full border px-8 py-3 text-sm font-bold transition-all duration-300 ${
                    filter === category
                      ? 'border-[#171313] bg-[#171313] text-white shadow-[0_4px_12px_rgba(0,0,0,0.07)]'
                      : 'border-[#A09E9D]/40 bg-white text-[#171313] hover:border-[#A09E9D]/50 hover:bg-[#E5E5E5]/40 hover:text-[#DA0807]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* PROJECT CARDS */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.title}
                  className="portfolio-card-shell"
                >
                  <ProjectCard
                    {...project}
                    ctaText="Discuss a Similar Project"
                    index={index}
                  />
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="py-20 text-center text-lg text-muted-foreground">
                More projects in this category coming soon.
              </div>
            )}

          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-6 font-heading text-3xl font-bold text-[#171313] md:text-5xl">
                Client Reviews
              </h2>

              <p className="text-lg text-muted-foreground">
                Hear from the business owners who trust Raiwa
                Technologies to help them grow.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.name}-${index}`}
                  className="portfolio-card-shell"
                >
                  <TestimonialCard
                    {...testimonial}
                    index={index}
                  />
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* BOTTOM CTA */}
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
              Talk to the Raiwa Technologies team about your goals. Get
              honest advice and a clear plan for growing your brand.
            </p>

            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="h-16 w-full border border-[#E5E5E5] bg-white px-10 text-lg font-bold text-[#171313] shadow-[0_5px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E5E5E5] hover:text-[#171313] hover:shadow-[0_8px_22px_rgba(0,0,0,0.07)] sm:w-auto"
                >
                  Book a Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default PortfolioPage;