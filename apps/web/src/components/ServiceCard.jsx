import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import {
  services,
  servicePath,
  mainServices,
  mainServicePath
} from '@/lib/services.js';

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  benefits,
  image: propsImage,
  logoUrl: propsLogoUrl,
  ctaText = 'Learn More',
  index = 0
}) => {

  const normalizedTitle = title.toLowerCase();

  const matchingService = services.find((service) => {
    const serviceTitle = service.title.toLowerCase();

    return (
      serviceTitle === normalizedTitle ||
      serviceTitle.startsWith(`${normalizedTitle} `)
    );
  });

  const matchingMain = mainServices.find(
    (service) => service.title.toLowerCase() === normalizedTitle
  );

  // Use the matching service OR main service data.
  const serviceData = matchingService || matchingMain;

  const destination = matchingService
    ? servicePath(matchingService)
    : matchingMain
      ? mainServicePath(matchingMain)
      : '/contact';

  // Support images and logos from all service sources.
  const themeImage =
    propsImage ||
    serviceData?.themeImage ||
    serviceData?.image ||
    matchingMain?.themeImage ||
    matchingMain?.image;

  const logoUrl =
    propsLogoUrl ||
    serviceData?.logoUrl ||
    matchingMain?.logoUrl;

  const accent = serviceData?.accent;
  const soft = serviceData?.soft;
  const label = serviceData?.label;

  const CardIcon = Icon || ShoppingCart;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="flex flex-col h-full rounded-2xl bg-white border shadow-luxury hover:shadow-luxury-hover transition-all duration-300 group relative overflow-hidden"
      style={{
        borderColor: accent ? `${accent}35` : undefined
      }}
    >
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-bl-[100px] -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150 z-0"
        style={{
          backgroundColor: soft || 'hsl(var(--primary-lighter-bg))'
        }}
      />

      <div className="relative z-10 flex-grow flex flex-col">
        {/* Service theme image */}
        {themeImage && (
          <div className="-mx-px -mt-px mb-6 h-36 overflow-hidden bg-slate-100 rounded-t-2xl">
            <img
              src={themeImage}
              alt={`${title} service`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              onError={(event) => {
                console.error('Service theme image failed to load:', themeImage);
                event.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Service logo */}
        <div
          className="mb-4 ml-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white border transition-all duration-300 shadow-sm"
          style={{
            color: accent || 'hsl(var(--primary))',
            borderColor: accent ? `${accent}30` : undefined
          }}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${title} logo`}
              className="h-10 w-10 object-contain"
              loading="lazy"
              onError={(event) => {
                console.error('Service logo failed to load:', logoUrl);
                event.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <CardIcon className="h-8 w-8" />
          )}
        </div>

        {label && (
          <p
            className="text-xs font-extrabold uppercase tracking-[.18em] mb-3 px-8"
            style={{ color: accent }}
          >
            {label}
          </p>
        )}

        <h3
          className="mb-4 px-8 text-2xl font-bold text-primary-dark font-heading transition-colors duration-300"
          style={{ color: accent || undefined }}
        >
          {title}
        </h3>

        <p className="text-muted-foreground leading-relaxed mb-6 px-8 flex-grow">
          {description}
        </p>

        {benefits && benefits.length > 0 && (
          <ul className="mb-8 px-8 space-y-3">
            {benefits.map((benefit, i) => (
              <li
                key={i}
                className="flex items-center text-sm font-medium text-foreground"
              >
                <div className="mr-3 flex items-center justify-center h-5 w-5 rounded-full bg-primary-lighter-bg text-primary shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                {benefit}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto mx-8 pt-6 pb-2 border-t border-border/50">
          <Link to={destination} className="block">
            <Button
              variant="ghost"
              className="w-full justify-between group/btn hover:bg-primary-lighter-bg hover:text-primary font-bold text-primary-dark h-12"
            >
              {ctaText}
              <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1 text-primary" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
