
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Search,
  Share2,
  Megaphone,
  MousePointerClick,
  TrendingUp,
  Target,
  Lightbulb,
  Settings,
  Rocket,
  ShoppingBag,
  ShoppingCart,
  Store,
  Package,
  Tag,
  Layers,
  Globe,
  Video,
  Smartphone,
  Gamepad2,
  Code,
  LayoutDashboard,
  ClipboardList,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

import ServiceCard from '@/components/ServiceCard.jsx';
import BenefitCard from '@/components/BenefitCard.jsx';
import ProcessStep from '@/components/ProcessStep.jsx';
import FAQSection from '@/components/FAQSection.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Link } from 'react-router-dom';
import { mainServices, mainServicePath } from '@/lib/services.js';

const serviceCategories = [
  {
    id: 'ecommerce',
    title: 'Ecommerce',
    description:
      'Launch and grow your online store on the marketplaces your customers already shop on, with complete setup, optimization and day-to-day management.',
    services: [
      {
        icon: Video,
        title: 'TikTok Shop',
        description:
          'Tap into one of the fastest-growing shopping channels with a TikTok Shop that is set up properly and built to sell.',
        benefits: [
          'Shop Setup & Product Listing',
          'Content & Promotion Support',
          'Order & Account Handling',
        ],
      },
      {
        icon: Tag,
        title: 'eBay',
        description:
          'Reach millions of active buyers with well-optimized eBay listings and a store that is managed with care.',
        benefits: [
          'Store Setup & Listing Optimization',
          'Pricing & Promotions',
          'Ongoing Account Management',
        ],
      },
      {
        icon: ShoppingCart,
        title: 'Amazon',
        description:
          'Build a strong Amazon presence with search-optimized listings, healthy account performance and a clear path to growth.',
        benefits: [
          'Seller Account Setup',
          'Listing & Keyword Optimization',
          'Account Health Monitoring',
        ],
      },
      {
        icon: Store,
        title: 'Walmart Marketplace',
        description:
          'Get your products in front of Walmart shoppers with professional onboarding, listings and marketplace management.',
        benefits: [
          'Seller Onboarding',
          'Catalog & Listing Management',
          'Performance Tracking',
        ],
      },
      {
        icon: Package,
        title: 'Temu',
        description:
          'Open a competitive Temu store and keep it running smoothly with accurate listings and responsive account support.',
        benefits: [
          'Store Setup',
          'Product Upload & Optimization',
          'Order & Account Support',
        ],
      },
      {
        icon: Layers,
        title: 'Mercari',
        description:
          "Reach Mercari's active community of shoppers with well-presented listings and a smoothly managed shop.",
        benefits: [
          'Shop Setup',
          'Listing & Pricing Management',
          'Ongoing Account Support',
        ],
      },
      {
        icon: ShoppingBag,
        title: 'Shopify',
        description:
          'A fast, beautiful and conversion-focused Shopify store that gives you full control over your brand and customer experience.',
        benefits: [
          'Store Design & Setup',
          'Product & Collection Management',
          'Conversion Optimization',
        ],
      },
      {
        icon: Globe,
        title: 'Daraz',
        description:
          'Sell to customers across South Asia with a professionally managed Daraz seller account and optimized product listings.',
        benefits: [
          'Seller Account Setup',
          'Listing & Campaign Management',
          'Order & Account Support',
        ],
      },
    ],
  },
  {
    id: 'development',
    title: 'Development',
    description:
      'Custom-built digital products that look great, run smoothly and are ready to grow with your business.',
    services: [
      {
        icon: Smartphone,
        title: 'App Development',
        description:
          'Mobile apps designed around your customers, with clean interfaces, solid performance and room to scale.',
        benefits: [
          'Android & iOS Apps',
          'UI/UX Design',
          'Testing & Launch Support',
        ],
      },
      {
        icon: Gamepad2,
        title: 'Game Development',
        description:
          'Engaging games built from concept to launch, with strong gameplay, polished visuals and smooth performance.',
        benefits: [
          'Game Design & Prototyping',
          'Mobile & Web Games',
          'Updates & Maintenance',
        ],
      },
      {
        icon: Code,
        title: 'Web Development',
        description:
          'Fast, responsive and secure websites that represent your brand professionally and turn visitors into customers.',
        benefits: [
          'Business & Ecommerce Websites',
          'Responsive Design',
          'Speed & Security',
        ],
      },
      {
        icon: Lightbulb,
        title: 'Graphic Design',
        description:
          'Create a consistent visual identity with polished brand assets and creative designed for your audience.',
        benefits: [
          'Brand & Campaign Assets',
          'Social & Digital Graphics',
          'Reusable Design Templates',
        ],
      },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing',
    description:
      'Smart, consistent marketing that builds brand awareness, grows your audience and drives real sales.',
    services: [
      {
        icon: Megaphone,
        title: 'Digital Marketing',
        description:
          'Complete digital marketing strategies that bring the right customers to your brand and keep them coming back.',
        benefits: [
          'Strategy & Planning',
          'Content & Email Marketing',
          'Performance Reporting',
        ],
      },
      {
        icon: Share2,
        title: 'Social Media Marketing',
        description:
          'Grow an engaged community and strong brand presence on the platforms where your customers spend their time.',
        benefits: [
          'Instagram',
          'Facebook',
          'TikTok',
        ],
      },
      {
        icon: Search,
        title: 'SEO Optimization',
        description:
          'Improve your visibility with technical fixes, smart keyword targeting and quality content that helps your store and website rank higher.',
        benefits: [
          'Technical SEO Audits',
          'Keyword Research & On-Page SEO',
          'Content & Link Building',
        ],
      },
      {
        icon: Settings,
        title: 'Automation Solutions',
        description:
          'Connect repetitive marketing and website tasks into dependable workflows, from reporting to routine optimization checks.',
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
    description:
      'Paid advertising that is carefully targeted and closely monitored so your budget works as hard as possible.',
    services: [
      {
        icon: Target,
        title: 'Meta Ads',
        description:
          'Reach the right audience on Facebook and Instagram with campaigns built to generate clicks, leads and sales.',
        benefits: [
          'Audience Targeting',
          'Creative & Copy Direction',
          'Retargeting Campaigns',
        ],
      },
      {
        icon: MousePointerClick,
        title: 'Google Ads',
        description:
          'Appear in front of customers at the exact moment they search for what you sell, with campaigns optimized for return.',
        benefits: [
          'Search & Shopping Ads',
          'Keyword Research',
          'Conversion Tracking',
        ],
      },
    ],
  },
  {
    id: 'management',
    title: 'Management',
    description:
      'Hand over the daily work and focus on your business while our team keeps your digital presence running smoothly.',
    services: [
      {
        icon: LayoutDashboard,
        title: 'Web Management',
        description:
          'Reliable website care so your site stays fast, secure, up to date and always working for your business.',
        benefits: [
          'Updates & Content Changes',
          'Performance & Security Checks',
          'Issue Fixing & Support',
        ],
      },
      {
        icon: ClipboardList,
        title: 'Account Management',
        description:
          'Careful, professional handling of your marketplace and ad accounts, with the attention to detail that keeps them healthy and growing.',
        benefits: [
          'Daily Account Monitoring',
          'Order & Customer Handling',
          'Regular Performance Reports',
        ],
      },
    ],
  },
];

const processSteps = [
  {
    number: '1',
    icon: Lightbulb,
    title: 'Discovery & Analysis',
    description:
      'We learn about your business, products and goals, and review your current setup to find the biggest opportunities.',
  },
  {
    number: '2',
    icon: Settings,
    title: 'Strategy Development',
    description:
      'We create a clear, tailored plan for the platforms and channels that will work best for your brand.',
  },
  {
    number: '3',
    icon: Rocket,
    title: 'Implementation',
    description:
      'Our team handles setup, development, listings and campaigns with careful attention to every detail.',
  },
  {
    number: '4',
    icon: TrendingUp,
    title: 'Optimization & Reporting',
    description:
      'We keep improving what works and share transparent reports so you always know where you stand.',
  },
];

const faqs = [
  {
    question: 'Which platforms and marketplaces do you work with?',
    answer:
      'We work with TikTok Shop, eBay, Amazon, Walmart, Temu, Mercari, Shopify and Daraz. We also build websites, apps and games, and run SEO, social media and paid advertising.',
  },
  {
    question: 'How long does it take to see results?',
    answer:
      'It depends on the service and your market. Store setup and ad campaigns can start showing movement within weeks, while SEO and organic growth typically build over several months. We will give you a realistic timeline for your project after an initial consultation.',
  },
  {
    question: 'How much do your services cost?',
    answer:
      'Every business is different, so we provide custom quotes based on the services you need and the scope of work. Contact us for a free consultation and we will recommend a plan that fits your budget.',
  },
  {
    question: 'Can you take over my existing store or account?',
    answer:
      'Yes. Our account management service covers day-to-day handling, optimization and reporting for existing marketplace stores, ad accounts and websites.',
  },
  {
    question: 'Can you build a custom website, app or game?',
    answer:
      'Absolutely. Our development team builds custom websites, mobile apps and games, from the first concept through launch and ongoing support.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Send us a message through the contact form or chat with us directly on WhatsApp. We will learn about your goals, answer your questions and suggest the best next steps.',
  },
];

const getMainServiceLink = (title) => {
  const mainService = mainServices.find(
    (item) => item.title === title
  );

  return mainService
    ? mainServicePath(mainService)
    : '/services';
};

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | Raiwa Technologies</title>
        <meta
          name="description"
          content="Ecommerce marketplace management, app, game and web development, digital marketing, ads, SEO and account management from Raiwa Technologies."
        />
      </Helmet>

      <main className="flex flex-col overflow-hidden bg-[#FDFDFD]">

        {/* HERO SECTION */}
        <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-[#171313] py-24 md:min-h-[700px] md:py-32">

          <picture className="absolute inset-0 -z-20 block h-full w-full">
            <source
              media="(max-width: 767px)"
              srcSet="/hero-service-image-mobile.png"
            />
            <img
              src="/hero-service-image-laptop.png"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center"
            />
          </picture>

          <div
            className="absolute inset-0 -z-10 bg-[#171313]/80"
            aria-hidden="true"
          />

          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-[#171313]/80 via-[#171313]/45 to-[#171313]/70"
            aria-hidden="true"
          />

          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mx-auto max-w-4xl text-center"
            >
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-5 py-2.5 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#DA0807] shadow-[0_0_10px_rgba(218,8,7,0.8)]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/90 sm:text-sm">
                  One Partner. Complete Digital Support.
                </span>
              </div>

              <h1 className="mb-7 font-heading text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Complete Solutions for{' '}
                <span className="bg-gradient-to-r from-white via-[#E5E5E5] to-[#DA0807] bg-clip-text text-transparent">
                  Growing Brands
                </span>
              </h1>

              <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
                From launching your marketplace store to building apps and
                driving traffic, Raiwa Technologies gives you everything you
                need to sell more, all in one place.
              </p>

              <div className="mb-11 flex flex-wrap justify-center gap-3">
                {serviceCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`#${category.id}`}
                    className="rounded-full border border-white/25 bg-white/[0.08] px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#DA0807] hover:bg-[#DA0807] hover:text-white hover:shadow-[0_8px_22px_rgba(218,8,7,0.25)]"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>

              <div className="flex justify-center">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="group h-14 w-full border border-[#DA0807] bg-[#DA0807] px-8 font-bold text-white shadow-[0_8px_24px_rgba(218,8,7,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-[#171313] hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] sm:w-auto"
                  >
                    Get a Free Consultation
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          <div
            className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#DA0807] to-transparent"
            aria-hidden="true"
          />
        </section>

        {/* SERVICES CATEGORIES */}
        <section className="bg-[#FDFDFD] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="mx-auto mb-20 max-w-3xl text-center md:mb-24">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#DA0807]">
                What We Do
              </span>

              <h2 className="mb-5 font-heading text-3xl font-extrabold tracking-tight text-[#171313] sm:text-4xl md:text-5xl">
                Solutions Built Around{' '}
                <span className="text-[#DA0807]">Your Growth</span>
              </h2>

              <p className="text-base leading-relaxed text-[#66615F] sm:text-lg">
                Explore our services and discover the right solutions to
                strengthen your online presence, reach more customers and
                grow your business.
              </p>
            </div>

            {serviceCategories.map((category, catIndex) => (
              <section
                key={category.id}
                id={category.id}
                className={`scroll-mt-28 ${
                  catIndex !== 0
                    ? 'mt-24 border-t border-[#171313]/15 pt-20 md:mt-28 md:pt-24'
                    : ''
                }`}
              >
                <div className="mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-3xl">
                    <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-[#DA0807]">
                      Our Services / 0{catIndex + 1}
                    </span>

                    <Link
                      to={getMainServiceLink(category.title)}
                      className="group inline-flex items-center gap-3"
                    >
                      <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#171313] transition-colors duration-300 group-hover:text-[#DA0807] sm:text-4xl">
                        {category.title}
                      </h2>

                      <ArrowRight className="h-6 w-6 text-[#DA0807] transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    <p className="mt-4 text-base leading-relaxed text-[#66615F] sm:text-lg">
                      {category.description}
                    </p>
                  </div>

                  <Link
                    to={getMainServiceLink(category.title)}
                    className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#171313] transition-colors duration-300 hover:text-[#DA0807]"
                  >
                    Explore {category.title}
                    <ArrowRight className="h-4 w-4 text-[#DA0807]" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                  {category.services.map((service, srvIndex) => (
                    <ServiceCard
                      key={service.title}
                      {...service}
                      index={srvIndex}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="border-y border-[#171313]/10 bg-[#E5E5E5]/35 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#DA0807]">
                The Raiwa Difference
              </span>

              <h2 className="mb-5 font-heading text-3xl font-extrabold tracking-tight text-[#171313] sm:text-4xl md:text-5xl">
                Why Choose Raiwa Technologies?
              </h2>

              <p className="text-base leading-relaxed text-[#66615F] sm:text-lg">
                We don't just complete tasks; we partner with you to drive
                measurable business growth.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
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

        {/* OUR PROCESS */}
        <section className="bg-[#FDFDFD] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#DA0807]">
                How We Work
              </span>

              <h2 className="mb-5 font-heading text-3xl font-extrabold tracking-tight text-[#171313] sm:text-4xl md:text-5xl">
                Our Proven <span className="text-[#DA0807]">Process</span>
              </h2>

              <p className="text-base leading-relaxed text-[#66615F] sm:text-lg">
                A simple, systematic approach that takes you from first
                conversation to measurable growth.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={step.number}
                  {...step}
                  isLast={index === processSteps.length - 1}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="border-t border-[#171313]/10 bg-[#E5E5E5]/35 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#DA0807]">
                Got Questions?
              </span>

              <h2 className="mb-5 font-heading text-3xl font-extrabold tracking-tight text-[#171313] sm:text-4xl md:text-5xl">
                Frequently Asked{' '}
                <span className="text-[#DA0807]">Questions</span>
              </h2>

              <p className="text-base leading-relaxed text-[#66615F] sm:text-lg">
                Clear answers about how we work and what you can expect.
              </p>
            </div>

            <FAQSection faqs={faqs} />
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="relative isolate overflow-hidden bg-[#171313] py-24 md:py-32">

          <picture className="absolute inset-0 -z-20 block h-full w-full">
            <source
              media="(max-width: 767px)"
              srcSet="/hero-above-footer-mobile.png"
            />
            <img
              src="/hero-above-footer-laptop.png"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center"
            />
          </picture>

          <div
            className="absolute inset-0 -z-10 bg-[#171313]/75"
            aria-hidden="true"
          />

          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-[#171313]/70 via-transparent to-[#171313]/70"
            aria-hidden="true"
          />

          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-5 inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B6B]">
                Let's Build Something Great
              </span>

              <h2 className="mb-7 font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Ready to Grow Your{' '}
                <span className="text-[#DA0807]">Business?</span>
              </h2>

              <p className="mx-auto mb-11 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
                Talk to the Raiwa Technologies team about your goals. Get
                honest advice and a clear plan for growing your brand.
              </p>

              <Link to="/contact">
                <Button
                  size="lg"
                  className="group h-14 w-full border-2 border-white bg-white px-9 text-base font-bold text-[#171313] shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-[#DA0807] hover:bg-[#DA0807] hover:text-white sm:w-auto"
                >
                  Book a Free Consultation
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ServicesPage;