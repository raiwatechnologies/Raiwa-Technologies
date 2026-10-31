import React from 'react';
import { Helmet } from 'react-helmet';
import { Mail, Phone, MapPin } from 'lucide-react';

import ContactForm from '@/components/ContactForm.jsx';
import WhatsAppButton from '@/components/WhatsAppButton.jsx';
import { BRAND } from '@/lib/brand.js';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Raiwa Technologies</title>
        <meta
          name="description"
          content="Contact Raiwa Technologies for a free consultation. Email us, call us or message us on WhatsApp to discuss your ecommerce, development and marketing goals."
        />
      </Helmet>

      {/* CONTACT PAGE CARD HOVER STYLING */}
      <style>{`
        /*
          Raiwa Technologies shared card hover standard:

          - Preserve the original card border.
          - Never add a dark or black border on hover.
          - Normal shadow: 2.5% black.
          - Hover shadow: 7% black.
          - Smooth 3px upward movement.
        */

        .contact-hover-card {
          box-shadow:
            0 3px 10px rgba(0, 0, 0, 0.025) !important;
          transition:
            transform 280ms ease,
            box-shadow 280ms ease !important;
        }

        .contact-hover-card:hover {
          box-shadow:
            0 8px 22px rgba(0, 0, 0, 0.07) !important;
          transform: translateY(-3px);
        }

        .contact-info-icon {
          transition:
            background-color 250ms ease,
            color 250ms ease,
            transform 250ms ease;
        }

        li:hover .contact-info-icon {
          background-color: rgba(23, 19, 19, 0.04) !important;
          color: #DA0807;
          transform: translateY(-2px);
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-hover-card,
          .contact-info-icon {
            transition: none !important;
          }

          .contact-hover-card:hover,
          li:hover .contact-info-icon {
            transform: none;
          }
        }
      `}</style>

      <main className="flex flex-col bg-background">

        {/* HERO */}
        <section className="bg-[#E5E5E5]/40 pb-16 pt-20 md:pt-32">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">

            <span className="mb-5 inline-block text-sm font-extrabold uppercase tracking-[0.2em] text-[#DA0807]">
              Get In Touch
            </span>

            <h1 className="mb-6 font-heading text-4xl font-extrabold tracking-tight text-[#171313] md:text-5xl lg:text-6xl">
              Let's Grow Your Business
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#66615F] md:text-xl">
              Fill out the form below, call us or message us on WhatsApp.
              We'll review your needs and share clear, practical next steps.
            </p>

          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="flex-grow bg-background py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">

              {/* FORM SIDE */}
              <div className="contact-hover-card rounded-3xl border border-[#171313]/20 bg-white p-7 shadow-sm md:p-10 lg:w-3/5">

                <div className="mb-8">
                  <span className="mb-3 block text-xs font-extrabold uppercase tracking-[0.18em] text-[#DA0807]">
                    Start a Conversation
                  </span>

                  <h2 className="mb-3 font-heading text-2xl font-extrabold text-[#171313] md:text-3xl">
                    Request Free Consultation
                  </h2>

                  <p className="leading-relaxed text-muted-foreground">
                    Please share as much detail as possible so we can
                    prepare before we speak.
                  </p>
                </div>

                <ContactForm />
              </div>

              {/* CONTACT INFORMATION */}
              <div className="space-y-10 lg:w-2/5">

                <div>
                  <span className="mb-3 block text-xs font-extrabold uppercase tracking-[0.18em] text-[#DA0807]">
                    Reach Out
                  </span>

                  <h3 className="mb-8 font-heading text-2xl font-extrabold text-[#171313] md:text-3xl">
                    Contact Information
                  </h3>

                  <ul className="space-y-7">

                    {/* EMAIL */}
                    <li className="flex items-start gap-4">
                      <div className="contact-info-icon flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-[#171313]/15 bg-[#E5E5E5] text-[#171313]">
                        <Mail className="h-6 w-6" />
                      </div>

                      <div className="min-w-0">
                        <p className="mb-1 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                          Email Us
                        </p>

                        <a
                          href={`mailto:${BRAND.email}`}
                          className="break-words text-base font-semibold text-[#171313] transition-colors hover:text-[#DA0807] sm:text-lg"
                        >
                          {BRAND.email}
                        </a>
                      </div>
                    </li>

                    {/* PHONE */}
                    <li className="flex items-start gap-4">
                      <div className="contact-info-icon flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-[#171313]/15 bg-[#E5E5E5] text-[#171313]">
                        <Phone className="h-6 w-6" />
                      </div>

                      <div>
                        <p className="mb-1 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                          Call / WhatsApp
                        </p>

                        <a
                          href={`tel:${BRAND.phoneTel}`}
                          className="block text-base font-semibold text-[#171313] transition-colors hover:text-[#DA0807] sm:text-lg"
                        >
                          {BRAND.phoneDisplay}
                        </a>
                      </div>
                    </li>

                    {/* LOCATION */}
                    <li className="flex items-start gap-4">
                      <div className="contact-info-icon flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-[#171313]/15 bg-[#E5E5E5] text-[#171313]">
                        <MapPin className="h-6 w-6" />
                      </div>

                      <div>
                        <p className="mb-1 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                          Location
                        </p>

                        <p className="text-base font-semibold text-[#171313] sm:text-lg">
                          Serving Clients Worldwide
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          Available for Remote Work
                        </p>
                      </div>
                    </li>

                  </ul>
                </div>

                {/* WHATSAPP CARD */}
                <div className="contact-hover-card rounded-3xl border border-[#171313]/20 bg-[#E5E5E5]/40 p-7 md:p-8">

                  <span className="mb-4 block text-xs font-extrabold uppercase tracking-[0.18em] text-[#DA0807]">
                    Quick Support
                  </span>

                  <h4 className="mb-4 font-heading text-xl font-extrabold text-[#171313] md:text-2xl">
                    Need an immediate response?
                  </h4>

                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    Message us directly on WhatsApp for a quick reply.
                    We're happy to answer your questions and discuss
                    your project.
                  </p>

                  <WhatsAppButton
                    variant="default"
                    className="h-12 w-full justify-center text-center"
                  />

                </div>

              </div>
            </div>
          </div>
        </section>

        {/* GLOBAL REACH */}
        <section className="border-t border-[#171313]/10 bg-[#E5E5E5]/30 py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">

            <span className="mb-4 block text-xs font-extrabold uppercase tracking-[0.2em] text-[#DA0807]">
              Wherever You Are
            </span>

            <h2 className="mb-6 font-heading text-3xl font-extrabold text-[#171313] md:text-4xl">
              Global Reach, Personal Service
            </h2>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              We work remotely with brands and sellers around the world.
              Wherever you are, you get the same dedicated attention
              and clear communication.
            </p>

          </div>
        </section>

      </main>
    </>
  );
};

export default ContactPage;