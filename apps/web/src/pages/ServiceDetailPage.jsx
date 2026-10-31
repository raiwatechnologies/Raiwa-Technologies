import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

import {
  mainServices,
  services,
  servicePath,
  mainServicePath,
} from '@/lib/services.js';

import { Button } from '@/components/ui/button.jsx';

const COLORS = {
  white: '#FDFDFD',
  lightGray: '#E5E5E5',
  gray: '#A09E9D',
  black: '#171313',
  red: '#DA0807',
};

/* -------------------------------------------------------
   SHARED CARD HOVER STANDARD
------------------------------------------------------- */

const CARD_HOVER_STYLES = `
  /*
    Raiwa Technologies shared card hover standard:

    - Preserve each card's original border.
    - Never add a dark or black border on hover.
    - Normal shadow: 2.5% black.
    - Hover shadow: 7% black.
    - Smooth 3px upward movement.
    - Preserve existing card backgrounds and content.
  */

  .detail-hover-card {
    height: 100%;
    min-width: 0;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.025) !important;
    transition:
      transform 280ms ease,
      box-shadow 280ms ease !important;
  }

  .detail-hover-card:hover {
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.07) !important;
    transform: translateY(-3px);
  }

  .detail-hover-card:focus-visible {
    outline: 2px solid #DA0807;
    outline-offset: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    .detail-hover-card {
      transition: none !important;
    }

    .detail-hover-card:hover {
      transform: none;
    }
  }
`;

/* -------------------------------------------------------
   REUSABLE COMPONENTS
------------------------------------------------------- */

function ProjectButton({ children, className = '' }) {
  return (
    <Button
      size="lg"
      className={`group h-14 border border-[#DA0807] bg-[#DA0807] px-7 font-bold text-white shadow-[0_8px_24px_rgba(218,8,7,0.20)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B80707] hover:bg-[#B80707] hover:shadow-[0_8px_22px_rgba(0,0,0,0.07)] ${className}`}
    >
      {children}
    </Button>
  );
}

function ServiceImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
}) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-[#E5E5E5] to-[#FDFDFD] ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sparkles className="h-9 w-9 text-[#A09E9D]" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
    />
  );
}

function Eyebrow({ children, color = COLORS.red }) {
  return (
    <p
      className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] sm:text-sm"
      style={{ color }}
    >
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  centered = false,
}) {
  return (
    <div
      className={`max-w-3xl ${
        centered ? 'mx-auto text-center' : ''
      }`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}

      <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-[#171313] sm:text-4xl md:text-5xl">
        {title}{' '}
        {highlight && (
          <span className="text-[#DA0807]">{highlight}</span>
        )}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-relaxed text-[#66615F] sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------
   SERVICE DIRECTORY CARD
   No logo or logo holder
------------------------------------------------------- */

function ServiceCard({ item }) {
  const image = item.themeImage || item.image;

  return (
    <Link
      to={servicePath(item)}
      aria-label={`Explore ${item.title}`}
      className="detail-hover-card group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-[#FDFDFD] shadow-[0_3px_10px_rgba(0,0,0,0.025)] transition-all duration-300 focus-visible:outline-none"
      style={{
        borderColor: 'rgba(23, 19, 19, 0.18)',
      }}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#E5E5E5]">
        <ServiceImage
          src={image}
          alt={`${item.title} service`}
          className="block h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171313]/25 via-transparent to-transparent opacity-70"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="text-xl font-extrabold text-[#171313] transition-colors duration-300 group-hover:text-[#DA0807] md:text-2xl">
          {item.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-[#66615F] md:text-base">
          {item.description}
        </p>

        <div className="mt-6 border-t border-[#171313]/15 pt-5">
          <span className="inline-flex items-center gap-2 text-sm font-extrabold text-[#171313] transition-colors duration-300 group-hover:text-[#DA0807]">
            Explore service
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* -------------------------------------------------------
   CALL TO ACTION
------------------------------------------------------- */

function CallToAction({ title, description }) {
  return (
    <section className="px-5 pb-20 pt-4 sm:px-8 md:pb-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#171313]/20 bg-[#171313] px-6 py-14 text-center text-white shadow-[0_14px_35px_rgba(23,19,19,0.15)] sm:px-10 md:px-16 md:py-20">

        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(circle at 85% 10%, rgba(218,8,7,0.65), transparent 42%)',
          }}
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#DA0807] to-transparent"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-3xl">
          <Eyebrow color="#FF7777">
            Let's Grow Together
          </Eyebrow>

          <h2 className="mb-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h2>

          <p className="mx-auto mb-9 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            {description}
          </p>

          <Link to="/contact">
            <ProjectButton className="border-white bg-white text-[#171313] shadow-none hover:border-white hover:bg-white hover:text-[#171313]">
              Talk to our team
              <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </ProjectButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   MAIN SERVICE PAGE
------------------------------------------------------- */

function MainServicePage({ main }) {
  const children = (main.children || [])
    .map((childSlug) =>
      services.find((item) => item.slug === childSlug)
    )
    .filter(Boolean);

  const heroImage =
    main.themeImage ||
    main.image ||
    children.find((item) => item.themeImage)?.themeImage ||
    children.find((item) => item.image)?.image;

  return (
    <>
      <Helmet>
        <title>{`${main.title} Services | Raiwa Technologies`}</title>
        <meta
          name="description"
          content={
            main.description ||
            `${main.title} solutions from Raiwa Technologies.`
          }
        />
      </Helmet>

      <style>{CARD_HOVER_STYLES}</style>

      <main className="bg-[#FDFDFD]">

        {/* MAIN SERVICE HERO */}
        <section className="relative isolate overflow-hidden bg-[#171313] text-white">
          {heroImage && (
            <div className="absolute inset-0 -z-20">
              <ServiceImage
                src={heroImage}
                alt=""
                loading="eager"
                className="h-full w-full object-cover object-center"
              />
            </div>
          )}

          <div className="absolute inset-0 -z-10 bg-[#171313]/80" />

          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#171313]/95 via-[#171313]/80 to-[#171313]/55" />

          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#171313]/60 to-transparent" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-[1.1fr_.9fr] md:gap-14 md:py-28">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.09] px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#DA0807]" />
                Raiwa Technologies Services
              </div>

              <h1 className="mb-6 font-heading text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl">
                {main.title}
                <span className="text-white/65">, done right.</span>
              </h1>

              <p className="mb-9 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
                {main.description}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/contact">
                  <ProjectButton className="w-full sm:w-auto">
                    Discuss Your Project
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </ProjectButton>
                </Link>

                <Link
                  to="/services"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-md border border-white/35 px-7 text-sm font-bold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#171313]"
                >
                  All Services
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-white/20 bg-white/[0.08] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.3)] backdrop-blur-sm">

                <div className="overflow-hidden rounded-2xl bg-[#E5E5E5]">
                  <ServiceImage
                    src={heroImage}
                    alt={`${main.title} services`}
                    loading="eager"
                    className="block h-64 w-full object-cover object-center md:h-80"
                  />
                </div>

                <div className="p-5 md:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                    Explore our capabilities
                  </p>

                  <p className="mt-2 text-xl font-bold leading-snug text-white md:text-2xl">
                    A practical approach to your next stage of growth.
                  </p>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -right-4 -z-10 h-32 w-32 rounded-full bg-[#DA0807]/30 blur-3xl"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#DA0807] to-transparent" />
        </section>

        {/* MAIN SERVICE CHILDREN */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <SectionHeading
              eyebrow="Explore the category"
              title={main.title}
              highlight="Services"
              description="Choose a specialist service to explore its scope, benefits and next steps."
            />

            <div className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#171313]/15 bg-[#E5E5E5]/40 px-4 py-2 text-sm font-bold text-[#171313] md:self-end">
              <span className="h-2 w-2 rounded-full bg-[#DA0807]" />
              {children.length} specialist{' '}
              {children.length === 1 ? 'service' : 'services'}
            </div>
          </div>

          {children.length > 0 ? (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {children.map((item) => (
                <ServiceCard key={item.slug} item={item} />
              ))}
            </div>
          ) : (
            <div
              className="detail-hover-card rounded-2xl border bg-[#E5E5E5]/35 p-8 md:p-10"
              style={{
                borderColor: 'rgba(23, 19, 19, 0.18)',
              }}
            >
              <h3 className="text-xl font-bold text-[#171313]">
                Services in this category are being prepared.
              </h3>

              <p className="mt-3 max-w-xl leading-relaxed text-[#66615F]">
                Contact our team to discuss your requirements and find the
                right solution for your business.
              </p>

              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 font-bold text-[#DA0807] transition-colors hover:text-[#171313]"
              >
                Contact us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </section>

        <CallToAction
          title={`Ready to get started with ${main.title}?`}
          description="Tell us about your goals and we’ll help you choose the right approach for your business."
        />
      </main>
    </>
  );
}

/* -------------------------------------------------------
   INDIVIDUAL SERVICE PAGE
------------------------------------------------------- */

function IndividualServicePage({ service }) {
  const serviceImage = service.themeImage || service.image;

  const parentCategory = mainServices.find(
    (item) => item.title === service.category
  );

  const related = services
    .filter(
      (item) =>
        item.category === service.category &&
        item.slug !== service.slug
    )
    .slice(0, 3);

  const benefits = service.benefits || [];

  return (
    <>
      <Helmet>
        <title>{`${service.title} | Raiwa Technologies`}</title>
        <meta
          name="description"
          content={
            service.description ||
            `${service.title} solutions from Raiwa Technologies.`
          }
        />
      </Helmet>

      <style>{CARD_HOVER_STYLES}</style>

      <main className="bg-[#FDFDFD]">

        {/* INDIVIDUAL SERVICE HERO */}
        <section className="relative isolate overflow-hidden bg-[#171313]">
          {serviceImage && (
            <div className="absolute inset-0 -z-20">
              <ServiceImage
                src={serviceImage}
                alt=""
                loading="eager"
                className="h-full w-full object-cover object-center"
              />
            </div>
          )}

          <div className="absolute inset-0 -z-10 bg-[#171313]/85" />

          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#171313]/95 via-[#171313]/80 to-[#171313]/55" />

          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#171313]/50 to-transparent" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-[1.05fr_.95fr] md:gap-14 md:py-28">
            <div className="text-white">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.09] px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#DA0807]" />
                {service.category} Solutions
              </div>

              <h1 className="mb-6 font-heading text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl">
                {service.title}
                <span className="text-white/65">, done right.</span>
              </h1>

              <p className="mb-9 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
                {service.description}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/contact">
                  <ProjectButton className="w-full sm:w-auto">
                    Discuss Your Project
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </ProjectButton>
                </Link>

                {parentCategory ? (
                  <Link
                    to={mainServicePath(parentCategory)}
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-md border border-white/35 px-6 text-sm font-bold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#171313]"
                  >
                    {parentCategory.title}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <Link
                    to="/services"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-md border border-white/35 px-6 text-sm font-bold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#171313]"
                  >
                    All Services
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-white/20 bg-white/[0.08] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.3)] backdrop-blur-sm">

                <div className="overflow-hidden rounded-2xl bg-[#E5E5E5]">
                  <ServiceImage
                    src={serviceImage}
                    alt={`${service.title} service`}
                    loading="eager"
                    className="block h-64 w-full object-cover object-center md:h-80"
                  />
                </div>

                <div className="p-5 md:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                    Service overview
                  </p>

                  <p className="mt-2 text-xl font-bold leading-snug text-white md:text-2xl">
                    A solution shaped around your business goals.
                  </p>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -right-4 -z-10 h-32 w-32 rounded-full bg-[#DA0807]/30 blur-3xl"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#DA0807] to-transparent" />
        </section>

        {/* SERVICE BENEFITS */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          <div className="grid gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-20">

            <div>
              <SectionHeading
                eyebrow="What we can help with"
                title="Everything you need to"
                highlight="move forward."
                description="We shape the work around your goals, current setup and customers. You get a clear scope, practical communication and a process designed to keep progress visible."
              />

              {parentCategory && (
                <Link
                  to={mainServicePath(parentCategory)}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#171313] transition-colors hover:text-[#DA0807]"
                >
                  Explore all {parentCategory.title} services
                  <ArrowRight className="h-4 w-4 text-[#DA0807]" />
                </Link>
              )}
            </div>

            <div>
              {benefits.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  {benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="detail-hover-card group rounded-2xl border bg-[#FDFDFD] p-6"
                      style={{
                        borderColor: 'rgba(23, 19, 19, 0.18)',
                      }}
                    >
                      <span className="mb-5 block h-2.5 w-2.5 rounded-full bg-[#DA0807]" />

                      <h3 className="text-lg font-extrabold leading-snug text-[#171313] transition-colors group-hover:text-[#DA0807]">
                        {benefit}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-[#66615F]">
                        Planned around your needs, priorities and the
                        requirements of your business.
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="detail-hover-card rounded-2xl border bg-[#E5E5E5]/35 p-8"
                  style={{
                    borderColor: 'rgba(23, 19, 19, 0.18)',
                  }}
                >
                  <p className="font-semibold text-[#171313]">
                    We tailor this service to your requirements.
                  </p>

                  <p className="mt-2 leading-relaxed text-[#66615F]">
                    Contact our team to discuss the scope and priorities of
                    your project.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SERVICE PROCESS */}
        <section className="border-y border-[#171313]/10 bg-[#E5E5E5]/40 py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">

            <div className="mb-12 max-w-3xl">
              <SectionHeading
                eyebrow="How it works"
                title="A clear path from"
                highlight="planning to progress."
                description="A straightforward process that keeps your project organized, focused and moving in the right direction."
              />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  number: '01',
                  title: 'Discover',
                  description:
                    'We learn about your goals, audience, current setup and what success should look like.',
                },
                {
                  number: '02',
                  title: 'Build the Plan',
                  description:
                    'We agree on priorities, deliverables and the best approach for your specific service.',
                },
                {
                  number: '03',
                  title: 'Launch & Improve',
                  description:
                    'We implement the work, review progress and identify useful next steps.',
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="detail-hover-card group rounded-2xl border bg-[#FDFDFD] p-7 md:p-8"
                  style={{
                    borderColor: 'rgba(23, 19, 19, 0.18)',
                  }}
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#171313] text-sm font-extrabold text-white transition-colors duration-300 group-hover:bg-[#DA0807]">
                    {step.number}
                  </span>

                  <h3 className="mt-6 text-xl font-extrabold text-[#171313]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#66615F] sm:text-base">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CallToAction
          title={`Ready to get started with ${service.title}?`}
          description="Tell us about your goals and we’ll help you work out the right next step."
        />

        {/* RELATED SERVICES */}
        {related.length > 0 && (
          <section className="border-t border-[#171313]/10 bg-[#FDFDFD] px-5 py-20 sm:px-8 md:py-24">
            <div className="mx-auto max-w-7xl">

              <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading
                  eyebrow="Explore more"
                  title="Related"
                  highlight="Services"
                  description="Discover other services that may support your business goals."
                />

                <Link
                  to="/services"
                  className="inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-[#171313] transition-colors hover:text-[#DA0807]"
                >
                  View all services
                  <ChevronRight className="h-4 w-4 text-[#DA0807]" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <ServiceCard key={item.slug} item={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

/* -------------------------------------------------------
   PAGE ROUTER
------------------------------------------------------- */

export default function ServiceDetailPage() {
  const { slug } = useParams();

  const main = mainServices.find(
    (item) => item.slug === slug
  );

  const service = services.find(
    (item) => item.slug === slug
  );

  if (main) {
    return <MainServicePage main={main} />;
  }

  if (service) {
    return <IndividualServicePage service={service} />;
  }

  return (
    <>
      <Helmet>
        <title>Service Not Found | Raiwa Technologies</title>
        <meta
          name="description"
          content="Explore the complete range of services offered by Raiwa Technologies."
        />
      </Helmet>

      <style>{CARD_HOVER_STYLES}</style>

      <main className="flex min-h-[65vh] flex-col items-center justify-center bg-[#FDFDFD] px-5 py-20 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5E5E5]">
          <Sparkles className="h-8 w-8 text-[#DA0807]" />
        </div>

        <Eyebrow>Raiwa Technologies</Eyebrow>

        <h1 className="mb-4 font-heading text-3xl font-extrabold text-[#171313] sm:text-4xl">
          Service not found
        </h1>

        <p className="mb-8 max-w-lg leading-relaxed text-[#66615F]">
          The page you are looking for may have moved or may no longer be
          available. Explore our full service directory to find what you
          need.
        </p>

        <Link to="/services">
          <ProjectButton>
            Explore All Services
            <ArrowRight className="ml-3 h-5 w-5" />
          </ProjectButton>
        </Link>
      </main>
    </>
  );
}