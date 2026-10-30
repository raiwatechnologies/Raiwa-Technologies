import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

import {
  services,
  servicePath,
  mainServices,
  mainServicePath,
} from '@/lib/services.js';

const ServiceCard = ({
  title,
  description,
  benefits,
  image: propsImage,
  ctaText = 'For More Information',
  index = 0,
  compact = false,
  iconOnly = false,
}) => {
  const normalizedTitle = title.toLowerCase();

  // Find matching individual service.
  const matchingService = services.find(
    (service) => service.title.toLowerCase() === normalizedTitle
  );

  // Find matching main service.
  const matchingMain = mainServices.find(
    (service) => service.title.toLowerCase() === normalizedTitle
  );

  const serviceData = matchingService || matchingMain;

  // Determine correct destination.
  const destination = matchingService
    ? servicePath(matchingService)
    : matchingMain
      ? mainServicePath(matchingMain)
      : '/contact';

  // Determine service image.
  const themeImage =
    propsImage ||
    serviceData?.themeImage ||
    serviceData?.image;

  const accent = serviceData?.accent || '#DA0807';
  const soft = serviceData?.soft || '#E5E5E5';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      // Homepage already has its own card hover animation.
      // Avoid applying a second lift effect there.
      whileHover={
        iconOnly
          ? undefined
          : { y: -5 }
      }
      className="service-card flex flex-col h-full rounded-2xl bg-[#FDFDFD] border border-[#171313]/25 shadow-[0_5px_12px_rgba(23,19,19,0.08),0_12px_26px_rgba(23,19,19,0.12)] transition-all duration-300 group relative overflow-hidden"
      style={{
        borderColor: `${accent}45`,
      }}
    >

      {/* Decorative corner */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-bl-[100px] -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150 z-0"
        style={{
          backgroundColor: soft,
        }}
      />

      <div className="relative z-10 flex-grow flex flex-col">

        {/* SERVICE IMAGE */}
        {themeImage && (
          <div
            className={`mx-3 mt-3 mb-5 rounded-xl overflow-hidden bg-[#FDFDFD] ${
              compact ? 'h-48' : 'h-48'
            }`}
          >
            <img
              src={themeImage}
              alt={`${title} service`}
              className="block w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              onError={(event) => {
                console.error(
                  'Service theme image failed to load:',
                  themeImage
                );

                event.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* SERVICE TITLE */}
        <h3
          className="mb-4 px-8 text-2xl font-bold font-heading transition-colors duration-300"
          style={{
            color: '#171313',
          }}
        >
          {title}
        </h3>

        {/* SERVICE DESCRIPTION */}
        <p
          className="leading-relaxed mb-6 px-8 flex-grow"
          style={{
            color: '#55514F',
          }}
        >
          {description}
        </p>

        {/* SERVICE BENEFITS: RED DOTS ONLY */}
        {benefits && benefits.length > 0 && (
          <ul className="mb-8 px-8 space-y-3">
            {benefits.map((benefit, i) => (
              <li
                key={`${title}-benefit-${i}`}
                className="flex items-center text-sm font-medium"
                style={{
                  color: '#171313',
                }}
              >
                {/* Plain red dot without any background container */}
                <span
                  className="mr-3 h-2 w-2 rounded-full bg-[#DA0807] shrink-0"
                  aria-hidden="true"
                />

                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CARD CTA */}
        <div className="mt-auto mx-8 pt-6 pb-2 border-t border-[#171313]/15">
          <Link
            to={destination}
            className="block"
            aria-label={`${ctaText} about ${title}`}
          >
            <Button
              variant="ghost"
              className="w-full justify-between group/btn hover:bg-[#171313] hover:text-[#FDFDFD] font-bold text-[#171313] h-12 transition-colors duration-200"
            >
              {ctaText}

              <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1 text-[#DA0807] group-hover/btn:text-[#FDFDFD]" />
            </Button>
          </Link>
        </div>

      </div>
    </motion.div>
  );
};

export default ServiceCard;