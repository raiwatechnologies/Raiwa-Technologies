import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { BRAND } from '@/lib/brand.js';

// Shared layout used by the Privacy Policy and Terms & Conditions pages.
const LegalPage = ({ title, metaDescription, lastUpdated, intro, sections }) => {
  return (
    <>
      <Helmet>
        <title>{`${title} | ${BRAND.name}`}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <div className="flex flex-col bg-background">
        {/* Hero */}
        <section className="pt-20 pb-16 md:pt-32 bg-muted/30 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-4 font-heading">{title}</h1>
            <p className="text-muted-foreground font-medium">Last updated: {lastUpdated}</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">{intro}</p>

            <div className="space-y-12">
              {sections.map((section, index) => (
                <div key={section.heading}>
                  <h2 className="text-2xl font-bold font-heading text-foreground mb-4">
                    {index + 1}. {section.heading}
                  </h2>
                  {section.paragraphs?.map((text, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-4">{text}</p>
                  ))}
                  {section.list && (
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mb-4">
                      {section.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 rounded-2xl bg-primary-lighter-bg/50 border border-primary/10">
              <h2 className="text-xl font-bold font-heading text-foreground mb-3">Questions about this page?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Email us at{' '}
                <a href={`mailto:${BRAND.email}`} className="text-primary font-semibold hover:underline">{BRAND.email}</a>
                {' '}or call{' '}
                <a href={`tel:${BRAND.phoneTel}`} className="text-primary font-semibold hover:underline">{BRAND.phoneDisplay}</a>.
                You can also visit our <Link to="/contact" className="text-primary font-semibold hover:underline">contact page</Link>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LegalPage;
