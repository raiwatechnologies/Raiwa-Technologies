import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, ShoppingCart, Megaphone, Globe, ShieldCheck, Activity, Award, Users, DollarSign, ThumbsUp, LineChart, Target, TrendingUp, Lightbulb, Settings, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { services, servicePath } from '@/lib/services.js';
import WhatsAppButton from '@/components/WhatsAppButton.jsx';
import ServiceCard from '@/components/ServiceCard.jsx';
import StatCard from '@/components/StatCard.jsx';
import BenefitCard from '@/components/BenefitCard.jsx';
import ProcessStep from '@/components/ProcessStep.jsx';

const HomePage = () => {
  const featuredServices = [
    {
      icon: ShoppingCart,
      title: 'Ecommerce',
      image: '/service-assets/ecommerce-theme.png',
      logoUrl: '/service-assets/ecommerce-logo.png',
      description: "Complete store setup and growth across the world's biggest marketplaces, so your products reach more customers and sell more.",
      benefits: ['Amazon, eBay, Walmart & More', 'Shopify & TikTok Shop', 'Daily Account Management']
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      description: 'Data-driven campaigns across search and social that build brand awareness and turn attention into measurable revenue.',
      benefits: ['Social Media Marketing', 'Meta & Google Ads', 'Performance Reporting']
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Rank higher on Google and marketplace search so high-intent buyers find your brand before they find your competitors.',
      benefits: ['Technical SEO Audits', 'Keyword Strategy', 'Listing & Content Optimization']
    },
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Professional, responsive websites built to showcase your brand, deliver a smooth user experience and support business growth.',
      benefits: ['Business Website Development', 'Responsive Web Design', 'Website Maintenance & Support']
    }
  ];

  const marketplaces = ['Amazon', 'eBay', 'Walmart Marketplace', 'Shopify', 'TikTok Shop', 'Temu', 'Daraz', 'Mercari'];
  const marketplaceItems = marketplaces.map((name) => services.find((service) => service.title.toLowerCase() === name.toLowerCase() || (name === 'Walmart Marketplace' && service.slug === 'walmart-marketplace'))).filter(Boolean);

  const processSteps = [
    {
      number: '1',
      icon: Lightbulb,
      title: 'Discover',
      description: 'We learn your products, goals and market so we know exactly where the biggest opportunities are.'
    },
    {
      number: '2',
      icon: Settings,
      title: 'Plan',
      description: 'We build a clear, practical roadmap for your store, platform and marketing channels.'
    },
    {
      number: '3',
      icon: Rocket,
      title: 'Launch',
      description: 'Our team sets up, optimizes and launches, handling the details so nothing slips through.'
    },
    {
      number: '4',
      icon: TrendingUp,
      title: 'Scale',
      description: 'We track results, improve what works and scale your growth with transparent reporting.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{`Raiwa Technologies | Ecommerce, Development & Digital Growth`}</title>
        <meta name="description" content="Raiwa Technologies is an ecommerce-focused growth company offering marketplace management, app and game development, SEO, social media marketing and ads." />
      </Helmet>

      <div className="flex flex-col bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[90vh] flex items-center pt-20 pb-20 md:pt-32 md:pb-32">
          <div className="absolute inset-0 z-0 bg-primary-dark">
            <img 
              src="https://images.unsplash.com/photo-1600950722026-886f06209015?auto=format&fit=crop&w=2000&q=80" 
              alt="Raiwa Technologies team at work" 
              className="w-full h-full object-cover mix-blend-overlay opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 via-primary-dark/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 text-white font-bold text-sm mb-8 border border-white/20 backdrop-blur-md shadow-lg">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-light opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-light"></span>
                  </span>
                  Now Onboarding New Ecommerce Brands
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 font-heading tracking-tight drop-shadow-md">
                  Build. Launch. <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-lighter to-primary-light">Scale Your Brand.</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl font-medium drop-shadow-sm">
                  Raiwa Technologies is your growth partner for ecommerce, development, SEO and digital marketing, turning your products into predictable, profitable sales.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5 items-center mb-8">
                  <Link to="/contact" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full text-lg h-14 px-8 font-bold bg-white text-primary-dark hover:bg-primary-lighter-bg shadow-luxury hover:shadow-luxury-hover transition-all duration-300">
                      Get a Free Consultation
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <WhatsAppButton 
                    variant="default" 
                    className="w-full sm:w-auto h-14 px-8 text-lg" 
                  />
                </div>
                
                <div className="flex items-center gap-6 text-sm text-white/90 font-semibold drop-shadow-sm">
                  <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary-light"/> No Obligation</div>
                  <div className="flex items-center gap-2"><Activity className="w-5 h-5 text-primary-light"/> Transparent Reporting</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* All Services Logo Marquee - directly below Hero */}
       <section
  className="overflow-hidden bg-primary-lighter-bg/30 py-9"
  aria-label="Our services"
>
          <div className="overflow-hidden">
            <div className="services-logo-track">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className="flex shrink-0 items-start gap-8 pr-8 sm:gap-12 sm:pr-12"
                  aria-hidden={copy === 1 ? true : undefined}
                >
                  {services.map((service, index) => (
                    <div
                      key={`${copy}-${service.slug || service.title}-${index}`}
                      className="flex w-24 shrink-0 flex-col items-center gap-3 sm:w-32"
                    >
                      <div className="flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16">
                        {service.logoUrl ? (
                          <img
                            src={service.logoUrl}
                            alt={copy === 0 ? `${service.title} logo` : ''}
                            loading="lazy"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div
                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
                            aria-hidden="true"
                          >
                            {service.icon ? (
                              <service.icon className="h-7 w-7" />
                            ) : (
                              <span className="text-xl font-bold">
                                {service.title.charAt(0)}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <p className="text-center text-xs font-semibold leading-snug text-slate-700 sm:text-sm">
                        {service.title}
                      </p>
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
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }

            @media (prefers-reduced-motion: reduce) {
              .services-logo-track {
                animation: none;
              }
            }
          `}</style>
        </section>

        {/* Our Approach */}
        <section className="pt-0 pb-32 bg-primary-lighter-bg/30 relative overflow-hidden">
          {/* Subtle Decorative Elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 uppercase tracking-widest"
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
                We Don't Just Manage Stores, <br className="hidden md:block"/>
                <span className="text-primary">We Grow Businesses.</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-muted-foreground leading-relaxed"
              >
                At Raiwa Technologies, every decision is tied to your results. We combine careful account handling, smart technology and honest reporting to build ecommerce brands that last.
              </motion.p>
            </div>

            {/* Statistics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8 mb-16 sm:mb-24">
              <StatCard number="100%" label="Account Handling Perfection" icon={Award} index={0} />
              <StatCard number="20+" label="Satisfied Clients" icon={Users} index={1} />
              <StatCard number="$10K+" label="Revenue Generated" icon={DollarSign} index={2} />
              <StatCard number="99%" label="Client Retention" icon={ThumbsUp} index={3} />
            </div>

            {/* Benefits Grid */}
            <div className="text-center mb-12">
  <h2 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-5 font-heading tracking-tight">
    What We Provide
  </h2>
  <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-5" />
  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
    Practical solutions designed to help your business grow, perform and succeed.
  </p>
</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <BenefitCard 
                icon={LineChart}
                title="Sustainable Growth"
                description="We skip risky shortcuts and build steady growth through optimized listings, strong SEO and loyal customers, so your brand keeps growing long after the first sale."
                index={0}
              />
              <BenefitCard 
                icon={Target}
                title="Measurable Results"
                description="You will always know where your money goes and what it earns. Clear reports on sales, ad spend and performance keep every decision backed by real numbers."
                index={1}
              />
              <BenefitCard 
                icon={Activity}
                title="Cost-Effective Allocation"
                description="Every dollar of your budget is planned with care. We focus spend on the channels and products that perform, and cut what doesn't, for a stronger return."
                index={2}
              />
              <BenefitCard 
                icon={Award}
                title="Long-term Success"
                description="We work as your long-term partner, adapting to marketplace and algorithm changes so your brand stays competitive and keeps moving forward."
                index={3}
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-6 font-heading">High-Impact Services</h2>
              <p className="text-xl text-muted-foreground">
                Focused, practical solutions that help your business get found, get sales and keep growing.
              </p>
            </div>
            
            
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-8">
          {featuredServices.map((service, index) => (
            <ServiceCard
            key={index}
            {...service}
            index={index}
            compact
            />
          ))}
        </div>
  
            <div className="text-center mt-16">
              <Link to="/services">
                <Button size="lg" className="bg-white text-primary border-2 border-primary/20 hover:border-primary hover:bg-primary-lighter-bg font-bold h-14 px-10 shadow-sm transition-all duration-300 text-lg">
                  Explore All Services <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Marketplaces */}
        <section className="py-24 bg-primary-lighter-bg/30 border-y border-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-dark mb-4 font-heading">Marketplaces We Work With</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Marketplace specialists to help you launch, manage and grow wherever your customers shop.
            </p>
            <div className="marketplace-marquee" aria-label="Marketplaces we support">
              <div className="marketplace-track">
                {[...marketplaceItems, ...marketplaceItems].map((service, index) => (
                  <Link key={`${service.slug}-${index}`} to={servicePath(service)} className="marketplace-logo-card" aria-label={`${service.title} services`}>
                    {service.logoUrl ? <img src={service.logoUrl} alt={`${service.title} logo`} loading="lazy" /> : <span className="marketplace-fallback">{service.title.slice(0,1)}</span>}
                    <span>{service.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-6 font-heading">How We Work</h2>
              <p className="text-xl text-muted-foreground">
                A simple, transparent process that takes you from idea to results.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={index}
                  {...step}
                  isLast={index === processSteps.length - 1}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-32 bg-primary-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-luxury-gradient opacity-90" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center mix-blend-overlay opacity-20" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 font-heading tracking-tight">Ready to Grow Your Business?</h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Talk to the Raiwa Technologies team about your goals. Get honest advice and a clear plan for growing your brand.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto h-16 px-10 font-bold text-lg bg-white text-primary-dark hover:bg-primary-lighter-bg hover:text-primary transition-all shadow-luxury">
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
