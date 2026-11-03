import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  services,
  servicePath,
  mainServices,
  mainServicePath,
} from '@/lib/services.js';

const MotionLink = motion(Link);

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
    <MotionLink
      to={destination}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      whileHover={
        iconOnly
          ? undefined
          : {
              y: -3,
              boxShadow: '0 8px 22px rgba(0, 0, 0, 0.03)',
            }
      }
      className="service-card group relative flex h-full flex-col overflow-hidden rounded-2xl bg-[#FDFDFD] shadow-[0_3px_12px_rgba(0,0,0,0.03)] transition-all duration-300 no-underline"
      style={{
        textDecoration: 'none',
        color: 'inherit',
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
            className={`mx-3 mt-3 mb-5 overflow-hidden rounded-xl bg-[#FDFDFD] shadow-[0_6px_14px_rgba(0,0,0,0.03)] ${
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

        {/* SERVICE BENEFITS */}
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
          <span
            className="flex h-12 w-full items-center justify-between rounded-md px-4 font-bold text-[#171313] transition-colors duration-200 group-hover:bg-[#171313] group-hover:text-[#FDFDFD]"
            aria-label={`${ctaText} about ${title}`}
          >
            {ctaText}

            <ArrowRight className="h-5 w-5 text-[#DA0807] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#FDFDFD]" />
          </span>
        </div>

      </div>
    </MotionLink>
  );
};

export default ServiceCard;