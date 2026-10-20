import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const ServiceCard = ({ icon: Icon, title, description, benefits, ctaText = "Learn More", index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="flex flex-col h-full rounded-2xl bg-white p-8 border border-primary/10 shadow-luxury hover:shadow-luxury-hover hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-lighter-bg rounded-bl-[100px] -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150 z-0" />
      
      <div className="relative z-10 flex-grow flex flex-col">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
          <Icon className="h-8 w-8" />
        </div>
        
        <h3 className="mb-4 text-2xl font-bold text-primary-dark font-heading group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {benefits && benefits.length > 0 && (
          <ul className="mb-8 space-y-3">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-center text-sm font-medium text-foreground">
                <div className="mr-3 flex items-center justify-center h-5 w-5 rounded-full bg-primary-lighter-bg text-primary">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                {benefit}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-6 border-t border-border/50">
          <Link to="/contact">
            <Button variant="ghost" className="w-full justify-between group/btn hover:bg-primary-lighter-bg hover:text-primary font-bold text-primary-dark h-12">
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