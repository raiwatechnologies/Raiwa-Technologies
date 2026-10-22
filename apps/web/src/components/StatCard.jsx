import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ number, label, icon: Icon, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden rounded-2xl bg-white p-8 border border-primary/10 shadow-luxury group transition-all duration-300 hover:shadow-luxury-hover hover:border-primary/30"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-lighter-bg/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 flex flex-col items-center text-center">
        {Icon && (
          <div className="mb-5 rounded-xl bg-primary-lighter-bg p-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
            <Icon className="h-7 w-7" />
          </div>
        )}
        <h3 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-2 font-heading tracking-tight group-hover:text-primary transition-colors">
          {number}
        </h3>
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

export default StatCard;