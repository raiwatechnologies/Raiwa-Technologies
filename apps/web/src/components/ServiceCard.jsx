
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
  ctaText = 'For More Information',
  index = 0,
  compact = false
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

  const serviceData = matchingService || matchingMain;

  const destination = matchingService
    ? servicePath(matchingService)
    : matchingMain
      ? mainServicePath(matchingMain)
      : '/contact';

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
      className="flex flex-col h-full rounded-2xl bg-[#FDFDFD] border border-[#E5E5E5] shadow-md hover:shadow-xl hover:border-[#DA0807]/40 transition-all duration-300 group relative overflow-hidden"
      style={{
        borderColor: accent ? `${accent}35` : undefined
      }}
    >
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-bl-[100px] -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150 z-0"
        style={{
          backgroundColor: soft || '#E5E5E5'
        }}
      />

      <div className="relative z-10 flex-grow flex flex-col">
        
{themeImage && (
  <div
    className={`mx-3 mt-3 mb-4 aspect-[3/2] rounded-xl overflow-hidden bg-[#FDFDFD] ${
      compact ? 'max-h-44' : 'max-h-52'
    }`}
  >
    <img
      src={themeImage}
      alt={`${title} service`}
      className="block w-full h-full object-contain object-center transition-transform duration-300"
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


        <div
          className={`mb-4 ml-8 inline-flex items-center justify-center rounded-2xl bg-[#FDFDFD] border border-[#E5E5E5] transition-all duration-300 shadow-sm ${
            compact ? 'h-14 w-14' : 'h-16 w-16'
          }`}
          style={{
            color: '#171313',
            borderColor: '#E5E5E5'
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
            style={{ color: '#DA0807' }}
          >
            {label}
          </p>
        )}

        <h3
          className="mb-4 px-8 text-2xl font-bold font-heading transition-colors duration-300"
          style={{ color: '#171313' }}
        >
          {title}
        </h3>

        <p
          className="leading-relaxed mb-6 px-8 flex-grow"
          style={{ color: '#55514F' }}
        >
          {description}
        </p>

        {benefits && benefits.length > 0 && (
          <ul className="mb-8 px-8 space-y-3">
            {benefits.map((benefit, i) => (
              <li
                key={i}
                className="flex items-center text-sm font-medium"
                style={{ color: '#171313' }}
              >
                <div className="mr-3 flex items-center justify-center h-5 w-5 rounded-full bg-[#E5E5E5] shrink-0">
                  <div className="h-2 w-2 rounded-full bg-[#DA0807]" />
                </div>
                {benefit}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto mx-8 pt-6 pb-2 border-t border-[#E5E5E5]">
          <Link to={destination} className="block">
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
