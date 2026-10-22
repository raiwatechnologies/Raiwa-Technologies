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
        <title>{`Contact Us | Raiwa Technologies`}</title>
        <meta name="description" content="Contact Raiwa Technologies for a free consultation. Email us, call us or message us on WhatsApp to discuss your ecommerce, development and marketing goals." />
      </Helmet>

      <div className="flex flex-col bg-background">
        {/* Hero */}
        <section className="pt-20 pb-16 md:pt-32 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 font-heading">
              Let's Grow Your Business
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Fill out the form below, call us or message us on WhatsApp. We'll review your needs and share clear, practical next steps.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 bg-background flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Form Side */}
              <div className="lg:w-3/5 bg-card p-8 md:p-10 rounded-3xl shadow-xl border border-border">
                <h2 className="text-2xl font-bold font-heading text-foreground mb-2">Request Free Consultation</h2>
                <p className="text-muted-foreground mb-8">Please share as much detail as possible so we can prepare before we speak.</p>
                <ContactForm />
              </div>

              {/* Info Side */}
              <div className="lg:w-2/5 space-y-10">
                <div>
                  <h3 className="text-2xl font-bold font-heading text-foreground mb-6">Contact Information</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Email Us</p>
                        <a href={`mailto:${BRAND.email}`} className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                          {BRAND.email}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Call / WhatsApp</p>
                        <a href={`tel:${BRAND.phoneTel}`} className="text-lg font-semibold text-foreground hover:text-primary transition-colors block">
                          {BRAND.phoneDisplay}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Location</p>
                        <p className="text-lg font-semibold text-foreground">Serving Clients Worldwide</p>
                        <p className="text-muted-foreground text-sm mt-1">Available for Remote Work</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/20">
                  <h4 className="font-bold text-foreground text-xl mb-4 font-heading">Need an immediate response?</h4>
                  <p className="text-muted-foreground mb-6">
                    Message us directly on WhatsApp for a quick reply. We're happy to answer your questions and discuss your project.
                  </p>
                  <WhatsAppButton variant="default" className="w-full text-center justify-center h-12" />
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* Map / Location Graphic */}
        <section className="bg-muted/30 border-t border-border py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold font-heading mb-6">Global Reach, Personal Service</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We work remotely with brands and sellers around the world. Wherever you are, you get the same dedicated attention and clear communication.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;