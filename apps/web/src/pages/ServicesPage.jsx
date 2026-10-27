import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, Share2, Megaphone, MousePointerClick, TrendingUp, Target, Lightbulb, Settings, Rocket, ShoppingBag, ShoppingCart, Store, Package, Tag, Layers, Globe, Video, Smartphone, Gamepad2, Code, LayoutDashboard, ClipboardList } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard.jsx';
import BenefitCard from '@/components/BenefitCard.jsx';
import ProcessStep from '@/components/ProcessStep.jsx';
import FAQSection from '@/components/FAQSection.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Link } from 'react-router-dom';
import { mainServices, mainServicePath } from '@/lib/services.js';

const ServicesPage = () => {
  const serviceCategories = [
    {
      id: 'ecommerce',
      title: 'Ecommerce',
      description: 'Launch and grow your online store on the marketplaces your customers already shop on, with complete setup, optimization and day-to-day management.',
      services: [
        {
          icon: Video,
          title: 'TikTok Shop',
          description: 'Tap into one of the fastest-growing shopping channels with a TikTok Shop that is set up properly and built to sell.',
          benefits: ['Shop Setup & Product Listing', 'Content & Promotion Support', 'Order & Account Handling']
        },
        {
          icon: Tag,
          title: 'eBay',
          description: 'Reach millions of active buyers with well-optimized eBay listings and a store that is managed with care.',
          benefits: ['Store Setup & Listing Optimization', 'Pricing & Promotions', 'Ongoing Account Management']
        },
        {
          icon: ShoppingCart,
          title: 'Amazon',
          description: 'Build a strong Amazon presence with search-optimized listings, healthy account performance and a clear path to growth.',
          benefits: ['Seller Account Setup', 'Listing & Keyword Optimization', 'Account Health Monitoring']
        },
        {
          icon: Store,
          title: 'Walmart Marketplace',
          description: 'Get your products in front of Walmart shoppers with professional onboarding, listings and marketplace management.',
          benefits: ['Seller Onboarding', 'Catalog & Listing Management', 'Performance Tracking']
        },
        {
          icon: Package,
          title: 'Temu',
          description: 'Open a competitive Temu store and keep it running smoothly with accurate listings and responsive account support.',
          benefits: ['Store Setup', 'Product Upload & Optimization', 'Order & Account Support']
        },
        {
          icon: Layers,
          title: 'Mercari',
          description: 'Reach Mercari\'s active community of shoppers with well-presented listings and a smoothly managed shop.',
          benefits: ['Shop Setup', 'Listing & Pricing Management', 'Ongoing Account Support']
        },
        {
          icon: ShoppingBag,
          title: 'Shopify',
          description: 'A fast, beautiful and conversion-focused Shopify store that gives you full control over your brand and customer experience.',
          benefits: ['Store Design & Setup', 'Product & Collection Management', 'Conversion Optimization']
        },
        {
          icon: Globe,
          title: 'Daraz',
          description: 'Sell to customers across South Asia with a professionally managed Daraz seller account and optimized product listings.',
          benefits: ['Seller Account Setup', 'Listing & Campaign Management', 'Order & Account Support']
        }
      ]
    },
    {
      id: 'development',
      title: 'Development',
      description: 'Custom-built digital products that look great, run smoothly and are ready to grow with your business.',
      services: [
        {
          icon: Smartphone,
          title: 'App Development',
          description: 'Mobile apps designed around your customers, with clean interfaces, solid performance and room to scale.',
          benefits: ['Android & iOS Apps', 'UI/UX Design', 'Testing & Launch Support']
        },
        {
          icon: Gamepad2,
          title: 'Game Development',
          description: 'Engaging games built from concept to launch, with strong gameplay, polished visuals and smooth performance.',
          benefits: ['Game Design & Prototyping', 'Mobile & Web Games', 'Updates & Maintenance']
        },
        {
          icon: Code,
          title: 'Web Development',
          description: 'Fast, responsive and secure websites that represent your brand professionally and turn visitors into customers.',
          benefits: ['Business & Ecommerce Websites', 'Responsive Design', 'Speed & Security']
        },
        {
          icon: Lightbulb,
          title: 'Graphic Design',
          description: 'Create a consistent visual identity with polished brand assets and creative designed for your audience.',
          benefits: ['Brand & Campaign Assets', 'Social & Digital Graphics', 'Reusable Design Templates']
        }
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing',
      description: 'Smart, consistent marketing that builds brand awareness, grows your audience and drives real sales.',
      services: [
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Complete digital marketing strategies that bring the right customers to your brand and keep them coming back.',
    benefits: [
      'Strategy & Planning',
      'Content & Email Marketing',
      'Performance Reporting',
    ],
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    description: 'Grow an engaged community and strong brand presence on the platforms where your customers spend their time.',
    benefits: [
      'Instagram',
      'Facebook',
      'TikTok',
    ],
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    description: 'Improve your visibility with technical fixes, smart keyword targeting and quality content that helps your store and website rank higher.',
    benefits: [
      'Technical SEO Audits',
      'Keyword Research & On-Page SEO',
      'Content & Link Building',
    ],
  },
  {
    icon: Settings,
    title: 'Automation Solutions',
    description: 'Connect repetitive marketing and website tasks into dependable workflows, from reporting to routine optimization checks.',
    benefits: [
      'Marketing Workflow Automation',
      'Reporting & Integrations',
      'Monitoring & Support',
    ],
  },
],
    },
    {
      id: 'ads',
      title: 'Ads',
      description: 'Paid advertising that is carefully targeted and closely monitored so your budget works as hard as possible.',
      services: [
        {
          icon: Target,
          title: 'Meta Ads',
          description: 'Reach the right audience on Facebook and Instagram with campaigns built to generate clicks, leads and sales.',
          benefits: ['Audience Targeting', 'Creative & Copy Direction', 'Retargeting Campaigns']
        },
        {
          icon: MousePointerClick,
          title: 'Google Ads',
          description: 'Appear in front of customers at the exact moment they search for what you sell, with campaigns optimized for return.',
          benefits: ['Search & Shopping Ads', 'Keyword Research', 'Conversion Tracking']
        }
      ]
    },

    {
      id: 'management',
      title: 'Management',
      description: 'Hand over the daily work and focus on your business while our team keeps your digital presence running smoothly.',
      services: [
        {
          icon: LayoutDashboard,
          title: 'Web Management',
          description: 'Reliable website care so your site stays fast, secure, up to date and always working for your business.',
          benefits: ['Updates & Content Changes', 'Performance & Security Checks', 'Issue Fixing & Support']
        },
        {
          icon: ClipboardList,
          title: 'Account Management',
          description: 'Careful, professional handling of your marketplace and ad accounts, with the attention to detail that keeps them healthy and growing.',
          benefits: ['Daily Account Monitoring', 'Order & Customer Handling', 'Regular Performance Reports']
        }
      ]
    }
  ];

  const processSteps = [
    {
      number: "1",
      icon: Lightbulb,
      title: "Discovery & Analysis",
      description: "We learn about your business, products and goals, and review your current setup to find the biggest opportunities."
    },
    {
      number: "2",
      icon: Settings,
      title: "Strategy Development",
      description: "We create a clear, tailored plan for the platforms and channels that will work best for your brand."
    },
    {
      number: "3",
      icon: Rocket,
      title: "Implementation",
      description: "Our team handles setup, development, listings and campaigns with careful attention to every detail."
    },
    {
      number: "4",
      icon: TrendingUp,
      title: "Optimization & Reporting",
      description: "We keep improving what works and share transparent reports so you always know where you stand."
    }
  ];

  const faqs = [
    {
      question: 'Which platforms and marketplaces do you work with?',
      answer: 'We work with TikTok Shop, eBay, Amazon, Walmart, Temu, Mercari, Shopify and Daraz. We also build websites, apps and games, and run SEO, social media and paid advertising.'
    },
    {
      question: 'How long does it take to see results?',
      answer: 'It depends on the service and your market. Store setup and ad campaigns can start showing movement within weeks, while SEO and organic growth typically build over several months. We will give you a realistic timeline for your project after an initial consultation.'
    },
    {
      question: 'How much do your services cost?',
      answer: 'Every business is different, so we provide custom quotes based on the services you need and the scope of work. Contact us for a free consultation and we will recommend a plan that fits your budget.'
    },
    {
      question: 'Can you take over my existing store or account?',
      answer: 'Yes. Our account management service covers day-to-day handling, optimization and reporting for existing marketplace stores, ad accounts and websites.'
    },
    {
      question: 'Can you build a custom website, app or game?',
      answer: 'Absolutely. Our development team builds custom websites, mobile apps and games, from the first concept through launch and ongoing support.'
    },
    {
      question: 'How do I get started?',
      answer: 'Send us a message through the contact form or chat with us directly on WhatsApp. We will learn about your goals, answer your questions and suggest the best next steps.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{`Our Services | Raiwa Technologies`}</title>
        <meta name="description" content="Ecommerce marketplace management, app, game and web development, digital marketing, ads, SEO and account management from Raiwa Technologies." />
      </Helmet>

      <div className="flex flex-col bg-background">

        {/* Hero Section */}
        <section className="relative pt-20 pb-24 md:pt-40 overflow-hidden bg-slate-950">
          {/* Responsive laptop and mobile background images */}
          <picture className="absolute inset-0 block h-full w-full">
            <source
              media="(max-width: 767px)"
              srcSet="/hero-service-image-mobile.png"
            />
            <img
              src="/hero-service-image-laptop.png"
              alt=""
              aria-hidden="true"
              className="block h-full w-full object-cover object-center"
            />
          </picture>

          {/* Dark overlay for text readability */}
          <div
            className="absolute inset-0 bg-slate-950/75"
            aria-hidden="true"
          />

          {/* Subtle brand accent */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-slate-950/30"
            aria-hidden="true"
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 font-heading leading-tight">
                Complete Solutions for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-400">
                  Growing Brands
                </span>
              </h1>

              <p className="text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto mb-10">
                From launching your marketplace store to building apps and driving traffic, Raiwa Technologies gives you everything you need to sell more, all in one place.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {serviceCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={mainServicePath(
                      mainServices.find((item) => item.title === category.title) ||
                        mainServices[0]
                    )}
                    className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white hover:text-primary-dark transition-all duration-300 backdrop-blur-sm"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-14 px-8 font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-all"
                  >
                    Get a Free Consultation
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Categories */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {serviceCategories.map((category, catIndex) => (
              <div
                key={category.id}
                id={category.id}
                className={`scroll-mt-28 mb-24 last:mb-0 ${catIndex !== 0 ? 'pt-24 border-t border-border' : ''}`}
              >
                <div className="mb-12 md:mb-16 max-w-3xl">
                  <Link to={mainServicePath(mainServices.find((item) => item.title === category.title) || mainServices[0])} className="inline-flex items-center gap-2 group"><h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading group-hover:text-primary transition-colors">{category.title}</h2><span className="text-primary mb-4" aria-hidden="true">↗</span></Link>
                  <p className="text-lg text-muted-foreground">{category.description}</p>
                </div>
                
                <div
                  className={
                  category.services.length === 1
                  ? 'grid grid-cols-1 gap-6 max-w-3xl'
                  : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  }>

                  {category.services.map((service, srvIndex) => (
                    <ServiceCard key={srvIndex} {...service} index={srvIndex} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Our Services */}
        <section className="py-24 bg-slate-50/50 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-foreground">Why Choose Raiwa Technologies?</h2>
              <p className="text-lg text-muted-foreground">We don't just complete tasks; we partner with you to drive measurable business growth.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BenefitCard 
                icon={Search}
                title="Careful Research"
                description="Every project starts with a close look at your products, competitors and market so we focus on the opportunities that matter most."
                index={0}
              />
              <BenefitCard 
                icon={Target}
                title="Tailored Execution"
                description="No cookie-cutter packages. Your plan is built around your goals, your budget and the platforms where your customers are."
                index={1}
              />
              <BenefitCard 
                icon={TrendingUp}
                title="Focus on Results"
                description="We care about sales, growth and return on investment, and we keep you informed with clear and honest reporting."
                index={2}
              />
            </div>
          </div>
        </section>

        {/* Service Process */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-foreground">Our Proven Process</h2>
              <p className="text-lg text-muted-foreground">A simple, systematic approach that takes you from first conversation to measurable growth.</p>
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

        {/* FAQs Section */}
        <section className="py-24 bg-slate-50/50 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Clear answers about how we work and what you can expect.
              </p>
            </div>
            
            <FAQSection faqs={faqs} />
          </div>
        </section>

{/* Bottom CTA */}
<section className="py-32 bg-primary-dark relative overflow-hidden">
  {/* Responsive background images */}
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

  {/* Dark overlay for readable text */}
  <div
    className="absolute inset-0 z-0 bg-black/50"
    aria-hidden="true"
  />

  {/* CTA content */}
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
          className="w-full sm:w-auto h-16 px-10 font-bold text-lg bg-white text-primary-dark hover:bg-primary-lighter-bg hover:text-primary transition-all shadow-luxury"
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

export default ServicesPage;
