
import React from 'react';
import { motion } from 'framer-motion';

const benefitImages = {
  'Sustainable Growth': '/service-assets/sustainable-growth.png',
  'Measurable Results': '/service-assets/measurable-results.png',
  'Cost-Effective Allocation': '/service-assets/cost-effective-allocation.png',
  'Long-term Success': '/service-assets/long-term-success.png',

  // Images for the benefit cards used on the Services page
  'Careful Research': '/service-assets/sustainable-growth.png',
  'Tailored Execution': '/service-assets/cost-effective-allocation.png',
  'Focus on Results': '/service-assets/measurable-results.png',
};

const BenefitCard = ({ icon: Icon, title, description, index = 0 }) => {
  const image = benefitImages[title];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="relative flex flex-col h-full min-h-[280px] rounded-2xl bg-white p-6 sm:p-8 pr-28 sm:pr-40 border border-primary/10 shadow-luxury hover:shadow-luxury-hover hover:border-primary/30 transition-all duration-300 group"
    >
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-lighter-bg text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
        {Icon && <Icon className="h-8 w-8" />}
      </div>

      <h3 className="mb-4 text-xl sm:text-2xl font-bold text-foreground font-heading group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>

      <p className="text-muted-foreground leading-relaxed flex-grow text-base">
        {description}
      </p>

      {image && (
        <div className="pointer-events-none absolute right-3 top-3 sm:right-4 sm:top-4 w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center z-10">
          <img
            src={image}
            alt={`${title} illustration`}
            loading="lazy"
            className="w-full h-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
            onError={(event) => {
              console.error('Benefit image failed to load:', image);
              event.currentTarget.style.visibility = 'hidden';
            }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default BenefitCard;
