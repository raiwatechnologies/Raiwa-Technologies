
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { mainServices, services, servicePath } from '@/lib/services.js';
import { Button } from '@/components/ui/button.jsx';

const COLORS = {
  white: '#FDFDFD',
  lightGray: '#E5E5E5',
  gray: '#A09E9D',
  black: '#171313',
  red: '#DA0807',
};

function ProjectButton({ children }) {
  return (
    <Button
      size="lg"
      className="bg-white text-[#171313] hover:bg-[#DA0807] hover:text-white font-bold transition-colors duration-300"
    >
      {children}
    </Button>
  );
}

function ServiceImage({ src, alt, className = '', loading = 'lazy' }) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-[#E5E5E5] ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sparkles className="w-8 h-8 text-[#A09E9D]" />
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
      className="text-sm font-bold uppercase tracking-[.2em] mb-3"
      style={{ color }}
    >
      {children}
    </p>
  );
}

function ServiceCard({ item }) {
  const Icon = item.icon;
  const image = item.themeImage || item.image;

  return (
    <Link
      to={servicePath(item)}
      className="group overflow-hidden rounded-2xl border border-[#A09E9D]/30 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="w-full aspect-[16/9] overflow-hidden bg-[#E5E5E5]">
        <ServiceImage
          src={image}
          alt={`${item.title} service`}
          className="block w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 overflow-hidden"
          style={{
            background: item.soft || COLORS.lightGray,
            color: item.accent || COLORS.black,
          }}
        >
          {item.logoUrl ? (
            <img
              src={item.logoUrl}
              alt={`${item.title} logo`}
              className="w-8 h-8 object-contain"
              loading="lazy"
              decoding="async"
            />
          ) : Icon ? (
            <Icon className="w-6 h-6" />
          ) : (
            <Sparkles className="w-6 h-6" />
          )}
        </div>

        <h3 className="text-xl font-bold text-[#171313] transition-colors group-hover:text-[#DA0807]">
          {item.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          {item.description}
        </p>

        <span className="inline-flex items-center gap-2 mt-5 font-bold text-sm text-[#171313] transition-colors group-hover:text-[#DA0807]">
          Explore service
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function CallToAction({ title, description }) {
  return (
    <section className="px-5 sm:px-8 pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto rounded-3xl px-6 py-12 md:p-16 text-center text-white bg-[#171313] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background:
              'radial-gradient(circle at top right, #A09E9D, transparent 55%)',
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            {title}
          </h2>

          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            {description}
          </p>

          <Link to="/contact">
            <ProjectButton>
              Talk to our team
              <ArrowRight className="ml-2 w-5 h-5" />
            </ProjectButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ServiceDetailPage() {
  const { slug } = useParams();

  const main = mainServices.find((item) => item.slug === slug);
  const service = services.find((item) => item.slug === slug);

  if (main) {
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
          <meta name="description" content={main.description || ''} />
        </Helmet>

        <main className="bg-background">
          {/* Main service hero */}
          <section
            className="relative overflow-hidden text-white"
            style={{ background: COLORS.black }}
          >
            {heroImage && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url("${heroImage}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.28,
                }}
                aria-hidden="true"
              />
            )}

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(23,19,19,0.94) 0%, rgba(23,19,19,0.70) 55%, rgba(23,19,19,0.48) 100%)',
              }}
              aria-hidden="true"
            />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28 grid md:grid-cols-[1.1fr_.9fr] gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold mb-7">
                  <Sparkles className="w-4 h-4" />
                  Raiwa Technologies Services
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                  {main.title}
                  <span className="text-white/70">, done right.</span>
                </h1>

                <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl mb-8">
                  {main.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link to="/contact">
                    <ProjectButton>
                      Discuss Your Project
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </ProjectButton>
                  </Link>

                  <Link
                    to="/services"
                    className="inline-flex items-center px-5 py-3 rounded-md border border-white/35 text-white font-semibold transition-colors hover:bg-white hover:text-[#171313]"
                  >
                    All Services
                  </Link>
                </div>
              </div>

              {heroImage && (
                <div className="rounded-3xl overflow-hidden border border-white/20 bg-white/10 p-3 shadow-2xl">
                  <ServiceImage
                    src={heroImage}
                    alt={`${main.title} services`}
                    className="block w-full h-64 md:h-80 object-cover object-center rounded-2xl"
                    loading="eager"
                  />

                  <div className="p-4">
                    <p className="text-sm text-white/75">
                      Explore our {main.title.toLowerCase()} capabilities
                    </p>
                    <p className="text-xl font-bold mt-1">
                      A practical plan for your next stage of growth
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Main service child cards */}
          <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <Eyebrow>Explore the category</Eyebrow>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#171313]">
                  {main.title} services
                </h2>
                <p className="text-muted-foreground mt-3 max-w-2xl">
                  Choose a specialist service to see its scope, benefits and
                  next steps.
                </p>
              </div>

              <span className="text-sm font-semibold text-muted-foreground">
                {children.length} specialist{' '}
                {children.length === 1 ? 'service' : 'services'}
              </span>
            </div>

            {children.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {children.map((item) => (
                  <ServiceCard key={item.slug} item={item} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-[#A09E9D]/30 bg-[#E5E5E5]/40 p-8">
                <p className="text-[#171313] font-semibold">
                  Services in this category are being prepared.
                </p>
                <p className="text-muted-foreground mt-2">
                  Contact our team to discuss your requirements.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 mt-5 font-bold text-[#DA0807] hover:underline"
                >
                  Contact us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </section>

          <CallToAction
            title={`Ready to get started with ${main.title}?`}
            description="Tell us about your goals and we’ll help you choose the right approach."
          />
        </main>
      </>
    );
  }

  if (!service) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-5 text-center">
        <h1 className="text-3xl font-bold text-[#171313] mb-3">
          Service not found
        </h1>
        <p className="text-muted-foreground mb-6">
          Choose a service from our full service directory.
        </p>
        <Link to="/services">
          <Button className="bg-[#171313] text-white hover:bg-[#DA0807]">
            Explore Services
          </Button>
        </Link>
      </section>
    );
  }

  const Icon = service.icon;
  const serviceImage = service.themeImage || service.image;

  const related = services
    .filter(
      (item) =>
        item.category === service.category && item.slug !== service.slug
    )
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{`${service.title} | Raiwa Technologies`}</title>
        <meta name="description" content={service.description || ''} />
      </Helmet>

      <main className="bg-background">
        {/* Individual service hero */}
        <section
          className="relative overflow-hidden"
          style={{ background: COLORS.black }}
        >
          {serviceImage && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url("${serviceImage}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.28,
              }}
              aria-hidden="true"
            />
          )}

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, rgba(23,19,19,0.94) 0%, rgba(23,19,19,0.70) 55%, rgba(23,19,19,0.48) 100%)',
            }}
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28 grid md:grid-cols-[1.05fr_.95fr] gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold mb-7">
                <Sparkles className="w-4 h-4" />
                {service.category} Solutions
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                {service.title}
                <span className="text-white/70">, done right.</span>
              </h1>

              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mb-8">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/contact">
                  <ProjectButton>
                    Discuss Your Project
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </ProjectButton>
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center px-5 py-3 rounded-md border border-white/35 text-white font-semibold transition-colors hover:bg-white hover:text-[#171313]"
                >
                  All Services
                </Link>
              </div>
            </div>

            <div className="rounded-3xl p-5 md:p-8 bg-white/10 border border-white/20 backdrop-blur-sm">
              <div className="rounded-2xl overflow-hidden bg-white shadow-2xl">
                <ServiceImage
                  src={serviceImage}
                  alt={`${service.title} service visual`}
                  className="block w-full h-56 md:h-72 object-cover object-center"
                  loading="eager"
                />

                <div className="p-6 md:p-8">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 overflow-hidden"
                    style={{
                      color: service.accent || COLORS.black,
                      background: service.soft || COLORS.lightGray,
                    }}
                  >
                    {service.logoUrl ? (
                      <img
                        src={service.logoUrl}
                        alt={`${service.title} logo`}
                        className="w-9 h-9 object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : Icon ? (
                      <Icon className="w-7 h-7" />
                    ) : (
                      <Sparkles className="w-7 h-7" />
                    )}
                  </div>

                  <p
                    className="text-xs uppercase tracking-[.2em] font-bold mb-2"
                    style={{ color: service.accent || COLORS.red }}
                  >
                    {service.label || service.category}
                  </p>

                  <h2 className="text-2xl font-bold text-[#171313]">
                    A practical plan for your next stage of growth
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-[.8fr_1.2fr] gap-12 md:gap-20">
            <div>
              <Eyebrow>What we can help with</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#171313] leading-tight">
                Everything you need to move forward.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                We shape the work around your goals, current setup and
                customers. You get a clear scope, practical communication and
                a process designed to keep progress visible.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {(service.benefits || []).map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-2xl border border-[#A09E9D]/30 bg-white p-6 shadow-sm"
                >
                  <CheckCircle2
                    className="w-6 h-6 mb-4"
                    style={{ color: service.accent || COLORS.red }}
                  />
                  <h3 className="font-bold text-lg text-[#171313]">
                    {benefit}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Planned around your needs, priorities and the requirements
                    of your business.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section
          className="py-16 md:py-20"
          style={{
            background: service.soft || `${COLORS.lightGray}80`,
          }}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="max-w-3xl mb-10">
              <Eyebrow>How it works</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#171313]">
                A clear path from planning to progress.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                [
                  '01',
                  'Discover',
                  'We learn about your goals, audience, current setup and what success should look like.',
                ],
                [
                  '02',
                  'Build the plan',
                  'We agree priorities, deliverables and the best approach for your specific service.',
                ],
                [
                  '03',
                  'Launch and improve',
                  'We implement the work, review what is happening and identify useful next steps.',
                ],
              ].map(([number, title, body]) => (
                <div
                  key={number}
                  className="bg-white rounded-2xl p-7 border border-[#A09E9D]/30"
                >
                  <span
                    className="text-sm font-extrabold"
                    style={{ color: service.accent || COLORS.red }}
                  >
                    {number}
                  </span>
                  <h3 className="text-xl font-bold text-[#171313] mt-4 mb-2">
                    {title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CallToAction
          title={`Ready to get started with ${service.title}?`}
          description="Tell us about your goals and we’ll help you work out the right next step."
        />

        {/* Related services */}
        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <Eyebrow>Explore more</Eyebrow>
                <h2 className="text-3xl font-extrabold text-[#171313]">
                  Related services
                </h2>
              </div>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-[#171313] hover:text-[#DA0807] font-bold transition-colors"
              >
                View all services
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {related.map((item) => (
                <ServiceCard key={item.slug} item={item} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
