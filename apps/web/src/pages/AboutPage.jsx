import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Target, TrendingUp, Users, ShieldCheck, Eye, Handshake, Rocket } from 'lucide-react';
import ValuePropositionCard from '@/components/ValuePropositionCard.jsx';
import Logo from '@/components/Logo.jsx';
import { Button } from '@/components/ui/button.jsx';

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: 'Radical Transparency',
      description: 'We keep you informed with honest, easy-to-understand reporting on the numbers that matter: sales, spend and growth.'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Improvement',
      description: 'Good enough is never enough. We keep testing, refining and optimizing your accounts and campaigns to get better results every month.'
    },
    {
      icon: Users,
      title: 'True Partnership',
      description: 'We work as an extension of your team. Your goals become our goals, and we celebrate every win together.'
    }
  ];

  const pillars = [
    {
      icon: Rocket,
      title: 'Our Mission',
      description: 'To help ambitious brands build, launch and scale their businesses online with reliable account handling, smart technology and honest advice.'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To become a trusted growth partner for ecommerce brands worldwide, known for careful execution and long-term client relationships.'
    },
    {
      icon: Handshake,
      title: 'Our Promise',
      description: 'Clear communication, careful attention to detail and a genuine commitment to your success, from the first message to long after launch.'
    }
  ];

  const platforms = ['Amazon', 'eBay', 'Walmart', 'Shopify', 'TikTok Shop', 'Temu', 'Daraz', 'Mercari', 'Meta Ads', 'Google Ads'];

  return (
    <>
      <Helmet>
        <title>{`About Us | Raiwa Technologies`}</title>
        <meta name="description" content="Learn about Raiwa Technologies, an ecommerce-focused growth company offering marketplace management, development, marketing, ads and SEO." />
      </Helmet>

      <div className="flex flex-col bg-background">
        {/* Hero / Intro */}
        <section className="pt-20 pb-20 md:pt-32 bg-background overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              
              <div className="lg:w-1/2 relative w-full">
                <div className="aspect-square max-w-md mx-auto relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#A09E9D]/40 bg-luxury-gradient flex flex-col items-center justify-center text-center p-10">
                  <Logo className="w-36 h-36 mb-6" />
                  <div className="text-3xl md:text-4xl font-extrabold text-white font-heading tracking-tight mb-3">Raiwa Technologies</div>
                  <div className="text-primary-lighter font-semibold mb-4">Ecommerce, Development &amp; Digital Growth</div>
                  <div className="inline-flex px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold uppercase tracking-widest">Established 2020</div>
                </div>
                {/* Decorative blob */}
                <div className="absolute top-10 -left-10 w-[120%] h-[120%] bg-[#A09E9D]/20 rounded-full blur-3xl -z-10" />
              </div>

              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E5E5E5] text-[#171313] border border-[#A09E9D]/30 font-bold text-sm mb-6">
                  About Raiwa Technologies · Since 2020
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 font-heading leading-tight">
                  We help brands grow online, the right way.
                </h1>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed mb-8">
                  <p>
                    Founded in 2020, Raiwa Technologies is an ecommerce-focused growth company. We help sellers and brands launch, manage and scale their businesses across the world's biggest marketplaces, backed by development, marketing, ads and SEO under one roof.
                  </p>
                  <p>
                    We started with a simple belief: business owners should not have to juggle five different agencies to grow. So we built <strong className="text-foreground">one dependable team that handles it all</strong>, from your store setup to your daily account management and growth campaigns.
                  </p>
                  <p>
                    Our approach is built on careful account handling, honest communication and results you can measure, which is why our clients stay with us.
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
                  <div>
                    <div className="text-3xl font-extrabold text-[#171313] mb-1">20+</div>
                    <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Satisfied Clients</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-[#171313] mb-1">$10K+</div>
                    <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Revenue Generated</div>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-[#171313] mb-1">99%</div>
                    <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Client Retention</div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* Mission / Vision / Promise */}
        <section className="py-24 bg-[#E5E5E5]/40 border-y border-[#A09E9D]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-foreground">What Drives Us</h2>
              <p className="text-muted-foreground text-lg">The purpose behind everything we build and every account we manage.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((item, idx) => (
                <ValuePropositionCard key={idx} {...item} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-foreground">Our Approach &amp; Values</h2>
              <p className="text-muted-foreground text-lg">The principles that guide how we work with you and manage your business.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, idx) => (
                <ValuePropositionCard key={idx} {...value} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* Platforms */}
        <section className="py-20 bg-[#E5E5E5]/40 border-y border-[#A09E9D]/30 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ShieldCheck className="w-16 h-16 text-[#171313] mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-heading text-foreground">Platforms We Specialize In</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Since 2020, our team has built hands-on experience with the marketplaces and advertising platforms that matter most to your growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {platforms.map((name) => (
                <span key={name} className="px-6 py-3 bg-white text-[#171313] border border-[#A09E9D]/40 rounded-full font-bold">{name}</span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-background text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading text-foreground">Let's grow your business together</h2>
            <p className="text-lg text-muted-foreground mb-10">
              Tell us about your goals and we'll show you how Raiwa Technologies can help.
            </p>
            <Link to="/contact">
              <Button size="lg" className="h-14 px-10 font-bold text-lg bg-[#171313] text-white border border-[#171313] hover:bg-[#DA0807] hover:border-[#DA0807] shadow-luxury hover:shadow-luxury-hover transition-all duration-300">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
