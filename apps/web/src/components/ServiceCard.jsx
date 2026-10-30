
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
  icon: Icon,
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
      // Homepage wrapper already handles its card movement.
      whileHover={
        iconOnly
          ? undefined
          : { y: -3 }
      }
      className="service-card group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-[#FDFDFD] shadow-[0_3px_10px_rgba(0,0,0,0.025)] transition-shadow duration-300 hover:shadow-[0_8px_22px_rgba(0,0,0,0.07)]"
      style={{
        borderColor: 'rgba(23, 19, 19, 0.18)',
      }}
    >

      {/* Decorative corner */}
      <div
        className="absolute -right-8 -top-8 z-0 h-32 w-32 rounded-bl-[100px] transition-transform duration-500 group-hover:scale-150"
        style={{
          backgroundColor: soft,
        }}
      />

      <div className="relative z-10 flex flex-grow flex-col">

        {/* HOMEPAGE GRAPH ICON */}
        {iconOnly && Icon && (
          <div className="mb-4 px-8 pt-6">
            <Icon className="h-8 w-8 text-[#DA0807]" />
          </div>
        )}

        {/* SERVICE IMAGE */}
        {themeImage && (
          <div
            className={`mx-3 mt-3 mb-5 overflow-hidden rounded-xl bg-[#FDFDFD] ${
              compact ? 'h-48' : 'h-48'
            }`}
          >
            <img
              src={themeImage}
              alt={`${title} service`}
              className="block h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
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
        <h3 className="mb-4 px-8 font-heading text-2xl font-bold text-[#171313] transition-colors duration-300">
          {title}
        </h3>

        {/* SERVICE DESCRIPTION */}
        <p className="mb-6 flex-grow px-8 leading-relaxed text-[#55514F]">
          {description}
        </p>

        {/* SERVICE BENEFITS: SIMPLE RED DOTS */}
        {benefits && benefits.length > 0 && (
          <ul className="mb-8 space-y-3 px-8">
            {benefits.map((benefit, i) => (
              <li
                key={`${title}-benefit-${i}`}
                className="flex items-center text-sm font-medium text-[#171313]"
              >
                <span
                  className="mr-3 h-2 w-2 shrink-0 rounded-full bg-[#DA0807]"
                  aria-hidden="true"
                />

                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CARD CTA */}
        <div className="mx-8 mt-auto border-t border-[#171313]/15 pb-2 pt-6">
          <Link
            to={destination}
            className="block"
            aria-label={`${ctaText} about ${title}`}
          >
            <Button
              variant="ghost"
              className="group/btn h-12 w-full justify-between font-bold text-[#171313] transition-colors duration-200 hover:bg-[#171313] hover:text-[#FDFDFD]"
            >
              {ctaText}

              <ArrowRight className="h-5 w-5 text-[#DA0807] transition-transform group-hover/btn:translate-x-1 group-hover/btn:text-[#FDFDFD]" />
            </Button>
          </Link>
        </div>

      </div>
    </motion.div>
  );
};

export default ServiceCard;