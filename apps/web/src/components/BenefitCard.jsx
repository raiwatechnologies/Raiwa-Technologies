import React from 'react';
import { motion } from 'framer-motion';

const BenefitCard = ({ icon: Icon, title, description, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="flex flex-col h-full rounded-2xl bg-white p-8 border border-primary/10 shadow-luxury hover:shadow-luxury-hover hover:border-primary/30 transition-all duration-300 group"
    >
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-lighter-bg text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="mb-4 text-2xl font-bold text-foreground font-heading group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed flex-grow text-base">
        {description}
      </p>
    </motion.div>
  );
};

export default BenefitCard;