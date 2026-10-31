import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  Target,
  TrendingUp,
  Users,
  ShieldCheck,
  Eye,
  Handshake,
  Rocket,
} from 'lucide-react';

import ValuePropositionCard from '@/components/ValuePropositionCard.jsx';
import Logo from '@/components/Logo.jsx';
import { Button } from '@/components/ui/button.jsx';

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: 'Radical Transparency',
      description:
        'We keep you informed with honest, easy-to-understand reporting on the numbers that matter: sales, spend and growth.',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Improvement',
      description:
        'Good enough is never enough. We keep testing, refining and optimizing your accounts and campaigns to get better results every month.',
    },
    {
      icon: Users,
      title: 'True Partnership',
      description:
        'We work as an extension of your team. Your goals become our goals, and we celebrate every win together.',
    },
  ];

  const pillars = [
    {
      icon: Rocket,
      title: 'Our Mission',
      description:
        'To help ambitious brands build, launch and scale their businesses online with reliable account handling, smart technology and honest advice.',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description:
        'To become a trusted growth partner for ecommerce brands worldwide, known for careful execution and long-term client relationships.',
    },
    {
      icon: Handshake,
      title: 'Our Promise',
      description:
        'Clear communication, careful attention to detail and a genuine commitment to your success, from the first message to long after launch.',
    },
  ];

  const platforms = [
    'Amazon',
    'eBay',
    'Walmart',
    'Shopify',
    'TikTok Shop',
    'Temu',
    'Daraz',
    'Mercari',
    'Meta Ads',
    'Google Ads',
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Raiwa Technologies</title>
        <meta
          name="description"
          content="Learn about Raiwa Technologies, an ecommerce-focused growth company offering marketplace management, development, marketing, ads and SEO."
        />
      </Helmet>

      {/* ABOUT PAGE CARD HOVER STYLING */}
      <style>{`
        /*
          Raiwa Technologies shared card hover standard:

          - Preserve each card's original border.
          - Never add a dark or black border on hover.
          - Normal shadow: 2.5% black.
          - Hover shadow: 7% black.
          - Smooth 3px upward movement.
          - Preserve original card backgrounds and design.
        */

        .about-hover-card {
          height: 100%;
          min-width: 0;
          transition: transform 280ms ease;
        }

        .about-hover-card > * {
          height: 100%;
          box-shadow:
            0 3px 10px rgba(0, 0, 0, 0.025) !important;
          transition:
            box-shadow 280ms ease !important;
        }

        .about-hover-card:hover {
          transform: translateY(-3px);
        }

        .about-hover-card:hover > * {
          box-shadow:
            0 8px 22px rgba(0, 0, 0, 0.07) !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-hover-card,
          .about-hover-card > * {
            transition: none !important;
          }

          .about-hover-card:hover {
            transform: none;
          }
        }
      `}</style>

      <main className="flex flex-col bg-background">

        {/* HERO / INTRO */}
        <section className="overflow-hidden bg-background pb-20 pt-20 md:pt-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-16 lg:flex-row">

              {/* BRAND CARD */}
              <div className="relative w-full lg:w-1/2">
                <div className="relative z-10 mx-auto flex aspect-square max-w-md flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-[#DA0807]/60 bg-gradient-to-br from-[#171313] via-[#6D0505] to-[#DA0807] p-10 text-center shadow-2xl">

                  <Logo className="mb-6 h-36 w-36" />

                  <div
                    className="mb-3 text-2xl font-extrabold tracking-[0.04em] md:text-3xl"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    <span className="text-white">
                      RAIWA{' '}
                    </span>

                    <span className="text-[#FFD6D6]">
                      TECHNOLOGIES
                    </span>
                  </div>

                  <div className="mb-4 font-semibold text-white/90">
                    Ecommerce, Development &amp; Digital Growth
                  </div>

                  <div className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-white">
                    Established 2020
                  </div>
                </div>

                {/* DECORATIVE BLOB */}
                <div className="pointer-events-none absolute -left-10 top-10 -z-10 h-[120%] w-[120%] rounded-full bg-[#DA0807]/15 blur-3xl" />
              </div>

              {/* ABOUT TEXT */}
              <div className="lg:w-1/2">

                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#DA0807]/20 bg-[#E5E5E5] px-4 py-2 text-sm font-bold text-[#171313]">
                  About Raiwa Technologies · Since 2020
                </div>

                <h1 className="mb-6 font-heading text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
                  We help brands{' '}
                  <span className="text-[#DA0807]">
                    grow online
                  </span>
                  , the right way.
                </h1>

                <div className="mb-8 space-y-4 text-lg leading-relaxed text-muted-foreground">

                  <p>
                    Founded in 2020, Raiwa Technologies is an ecommerce-focused
                    growth company. We help sellers and brands launch, manage
                    and scale their businesses across the world's biggest
                    marketplaces, backed by development, marketing, ads and SEO
                    under one roof.
                  </p>

                  <p>
                    We started with a simple belief: business owners should not
                    have to juggle five different agencies to grow. So we built{' '}
                    <strong className="text-foreground">
                      one dependable team that handles it all
                    </strong>
                    , from your store setup to your daily account management
                    and growth campaigns.
                  </p>

                  <p>
                    Our approach is built on careful account handling, honest
                    communication and results you can measure, which is why
                    our clients stay with us.
                  </p>

                </div>

                {/* STATISTICS */}
                <div className="grid grid-cols-3 gap-6 border-t border-border pt-6">

                  <div>
                    <div className="mb-1 text-3xl font-extrabold text-[#DA0807]">
                      20+
                    </div>

                    <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Satisfied Clients
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 text-3xl font-extrabold text-[#DA0807]">
                      $10K+
                    </div>

                    <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Revenue Generated
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 text-3xl font-extrabold text-[#DA0807]">
                      99%
                    </div>

                    <div className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Client Retention
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION / VISION / PROMISE */}
        <section className="border-y border-[#A09E9D]/30 bg-[#E5E5E5]/40 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
                What <span className="text-[#DA0807]">Drives Us</span>
              </h2>

              <p className="text-lg text-muted-foreground">
                The purpose behind everything we build and every account we
                manage.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {pillars.map((item, index) => (
                <div
                  key={item.title}
                  className="about-hover-card"
                >
                  <ValuePropositionCard
                    {...item}
                    index={index}
                  />
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* CORE VALUES */}
        <section className="bg-background py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
                Our Approach{' '}
                <span className="text-[#DA0807]">&amp; Values</span>
              </h2>

              <p className="text-lg text-muted-foreground">
                The principles that guide how we work with you and manage your
                business.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="about-hover-card"
                >
                  <ValuePropositionCard
                    {...value}
                    index={index}
                  />
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* PLATFORMS */}
        <section className="border-y border-[#A09E9D]/30 bg-[#E5E5E5]/40 py-20 text-center">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

            <ShieldCheck className="mx-auto mb-6 h-16 w-16 text-[#DA0807]" />

            <h2 className="mb-6 font-heading text-2xl font-bold text-foreground md:text-3xl">
              Platforms We{' '}
              <span className="text-[#DA0807]">
                Specialize In
              </span>
            </h2>

            <p className="mb-8 text-lg text-muted-foreground">
              Since 2020, our team has built hands-on experience with the
              marketplaces and advertising platforms that matter most to your
              growth.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {platforms.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-[#A09E9D]/40 bg-white px-6 py-3 font-bold text-[#171313] transition-colors duration-200 hover:border-[#DA0807]/50 hover:text-[#DA0807]"
                >
                  {name}
                </span>
              ))}
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="bg-background py-24 text-center">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

            <h2 className="mb-6 font-heading text-3xl font-bold text-foreground md:text-4xl">
              Let's grow your business{' '}
              <span className="text-[#DA0807]">together</span>
            </h2>

            <p className="mb-10 text-lg text-muted-foreground">
              Tell us about your goals and we'll show you how Raiwa Technologies
              can help.
            </p>

            <Link to="/contact">
              <Button
                size="lg"
                className="h-14 border border-[#DA0807] bg-[#DA0807] px-10 text-lg font-bold text-white shadow-[0_5px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B80707] hover:bg-[#B80707] hover:shadow-[0_8px_22px_rgba(0,0,0,0.07)]"
              >
                Contact Us Today
              </Button>
            </Link>

          </div>
        </section>

      </main>
    </>
  );
};

export default AboutPage;