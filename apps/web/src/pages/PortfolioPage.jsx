import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, Users, DollarSign, ThumbsUp, ArrowRight, ShoppingCart, Globe, ShoppingBag, Gamepad2, Megaphone, Search } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard.jsx';
import StatCard from '@/components/StatCard.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Link } from 'react-router-dom';

const PortfolioPage = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Ecommerce', 'Development', 'Marketing', 'Ads', 'SEO Optimization', 'Management'];

  const projects = [
    {
      title: 'Amazon Store Launch & Growth',
      image: '/service-assets/amazon-theme-image.jpg',
      client: 'Ecommerce · Amazon',
      category: 'Ecommerce',
      icon: ShoppingCart,
      description: 'Complete seller account setup, search-optimized product listings and ongoing account management that keeps stores healthy, visible and ready to scale.',
      tags: ['Amazon', 'Listings', 'Account Mgmt'],
      metrics: [
        { value: 'End-to-End', label: 'Store Setup' },
        { value: 'Daily', label: 'Account Care' }
      ]
    },
    {
      title: 'Multi-Marketplace Expansion',
      image: '/service-assets/wall-mart-theme.jpg',
      client: 'Ecommerce · eBay, Walmart, Temu, Daraz',
      category: 'Ecommerce',
      icon: Globe,
      description: 'Expanding established brands onto multiple marketplaces at once, with consistent listings, unified order handling and one team managing every channel.',
      tags: ['eBay', 'Walmart', 'Temu', 'Daraz'],
      metrics: [
        { value: 'Multi-Channel', label: 'Presence' },
        { value: 'One Team', label: 'Managed Together' }
      ]
    },
    {
      title: 'Shopify & TikTok Shop Setup',
      image: '/service-assets/shopify-theme.jpg',
      client: 'Ecommerce · Shopify, TikTok Shop',
      category: 'Ecommerce',
      icon: ShoppingBag,
      description: 'Conversion-focused Shopify stores and TikTok Shop launches, designed so brands can own their customer experience and tap into social commerce.',
      tags: ['Shopify', 'TikTok Shop', 'Store Design'],
      metrics: [
        { value: 'Custom', label: 'Store Design' },
        { value: 'Launch-Ready', label: 'Social Commerce' }
      ]
    },
    {
      title: 'Game & App Development',
      image: '/service-assets/app-development-theme.jpg',
      client: 'Development · Games, Apps, Web',
      category: 'Development',
      icon: Gamepad2,
      description: 'Custom mobile games, apps and websites built from concept to launch, with polished design, smooth performance and ongoing support.',
      tags: ['Game Dev', 'App Dev', 'Web Dev'],
      metrics: [
        { value: 'Concept to Launch', label: 'Full Cycle' },
        { value: 'Ongoing', label: 'Support' }
      ]
    },
    {
      title: 'Social Media & Ads Campaigns',
      image: '/service-assets/meta-ads-theme.jpg',
      client: 'Marketing · Meta Ads, Google Ads',
      category: 'Ads',
      icon: Megaphone,
      description: 'Targeted Meta and Google ad campaigns paired with Instagram, Facebook and TikTok content that builds awareness and drives customers to buy.',
      tags: ['Meta Ads', 'Google Ads', 'Social Media'],
      metrics: [
        { value: 'Targeted', label: 'Audiences' },
        { value: 'Regular', label: 'Reporting' }
      ]
    },
    {
      title: 'SEO & Search Visibility',
      image: '/service-assets/seo-optimization-theme.jpg',
      client: 'SEO · Websites & Marketplaces',
      category: 'SEO Optimization',
      icon: Search,
      description: 'Technical audits, keyword research and on-page optimization that help websites and marketplace listings get found by high-intent buyers.',
      tags: ['Technical SEO', 'Keywords', 'Content'],
      metrics: [
        { value: 'Full Audit', label: 'Technical SEO' },
        { value: 'Long-Term', label: 'Organic Growth' }
      ]
    }
  ];

  // NOTE FOR THE SITE OWNER: the reviews below are sample wording to show how this section looks.
  // Before publishing, replace them with real feedback from your clients (names/roles can be edited here).
  const testimonials = [
    {
      quote: "Our Amazon account is handled with real care. Listings are clean, issues are fixed quickly, and we always know what is happening with our store.",
      name: "Amazon Seller",
      role: "Ecommerce Client",
      rating: 5
    },
    {
      quote: "They set up our Shopify store and TikTok Shop and walked us through everything. Communication was fast and the whole process felt professional.",
      name: "Online Brand Owner",
      role: "Shopify & TikTok Shop Client",
      rating: 5
    },
    {
      quote: "Having one team manage all our marketplaces saved us a huge amount of time. Orders, listings and accounts are finally under control.",
      name: "Multi-Store Seller",
      role: "Marketplace Management Client",
      rating: 5
    },
    {
      quote: "Our ad campaigns became much more focused. The reporting is clear, and every update explains what is working and what is being improved.",
      name: "Ecommerce Entrepreneur",
      role: "Ads & Marketing Client",
      rating: 5
    },
    {
      quote: "From the first idea to the final build, the development team was responsive, creative and very easy to work with.",
      name: "Startup Founder",
      role: "Development Client",
      rating: 5
    },
    {
      quote: "Reliable, honest and always available on WhatsApp. It feels like having an in-house team without the extra cost.",
      name: "Small Business Owner",
      role: "Long-Term Client",
      rating: 5
    }
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <>
      <Helmet>
        <title>{`Our Work & Client Reviews | Raiwa Technologies`}</title>
        <meta name="description" content="Explore the ecommerce, development, marketing and SEO work delivered by Raiwa Technologies, and read what clients say about working with us." />
      </Helmet>

      <div className="flex flex-col bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden flex items-center min-h-[70vh] pt-20 pb-20 md:pt-32 md:pb-32">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1617957689230-231cdaa2fe5c?auto=format&fit=crop&w=2000&q=80" 
              alt="Modern workspace" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary-dark/90 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-primary-dark/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/10 text-primary-lighter border border-white/20 backdrop-blur-md mb-8 text-sm font-bold uppercase tracking-widest">
                Our Work
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 font-heading leading-tight tracking-tight">
                Our Portfolio of <span className="text-primary-light">Success</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                We don't just deliver services; we build growth. Explore the kind of work we do for ambitious brands across ecommerce, development, marketing and SEO.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Results by Numbers */}
        <section className="py-24 bg-background relative z-20 -mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard number="End-to-end" label="Service Delivery" icon={Award} index={0} />
              <StatCard number="Multi-channel" label="Marketplace Support" icon={Users} index={1} />
              <StatCard number="Custom" label="Growth Strategies" icon={DollarSign} index={2} />
              <StatCard number="Ongoing" label="Optimization & Support" icon={ThumbsUp} index={3} />
            </div>
          </div>
        </section>

        {/* Project Showcase */}
        <section className="py-24 bg-primary-lighter-bg/30 border-y border-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-primary-dark">Featured Work</h2>
              <p className="text-lg text-muted-foreground">A look at the kind of projects we deliver, from marketplace stores to custom apps and growth campaigns.</p>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-sm ${
                    filter === cat 
                      ? 'bg-primary text-white shadow-luxury' 
                      : 'bg-white text-primary-dark border border-primary/10 hover:border-primary hover:text-primary hover:bg-primary-lighter-bg'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.title} {...project} ctaText="Discuss a Similar Project" index={index} />
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-20 text-muted-foreground text-lg">
                More projects in this category coming soon.
              </div>
            )}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-primary-dark">Client Reviews</h2>
              <p className="text-lg text-muted-foreground">Hear from the business owners who trust Raiwa Technologies to help them grow.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <TestimonialCard key={idx} {...testimonial} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-32 bg-primary-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-luxury-gradient opacity-90" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center mix-blend-overlay opacity-20" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 font-heading tracking-tight">
              Ready to be our next <span className="text-primary-light">success story?</span>
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Partner with a team that cares about your growth. Tell us about your goals and let's build something great together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto h-16 px-10 font-bold text-lg bg-white text-primary-dark hover:bg-primary-lighter-bg hover:text-primary transition-all shadow-luxury">
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PortfolioPage;
