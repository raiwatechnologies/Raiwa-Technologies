import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ quote, name, role, company, rating = 5, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="relative flex flex-col rounded-2xl bg-white p-8 border border-primary/10 shadow-luxury hover:shadow-luxury-hover hover:border-primary/30 transition-all duration-300"
    >
      <Quote className="absolute top-6 right-6 w-12 h-12 text-primary-lighter-bg" />
      
      <div className="flex gap-1 mb-6">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-primary text-primary" />
        ))}
      </div>
      
      <blockquote className="text-lg text-foreground leading-relaxed mb-8 font-medium italic relative z-10 flex-grow">
        "{quote}"
      </blockquote>
      
      <div className="flex items-center gap-4 mt-auto pt-6 border-t border-primary/10">
        <div className="w-12 h-12 rounded-full bg-primary-lighter-bg flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-bold text-primary-dark">{name}</div>
          <div className="text-sm text-muted-foreground">{company ? `${role}, ${company}` : role}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;