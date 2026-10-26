import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ProcessStep = ({ number, title, description, icon: Icon, isLast, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative isolate flex flex-col items-center text-center group"
    >
      <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-card shadow-xl border-2 border-primary/20 group-hover:border-primary transition-colors duration-300">
        <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-white font-bold text-sm shadow-md">
          {number}
        </div>
        <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
      </div>
      
      <h3 className="mb-3 text-xl font-bold text-foreground font-heading">{title}</h3>
      <p className="text-muted-foreground leading-relaxed max-w-xs">{description}</p>

      {!isLast && (
        <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary/20 to-primary/5 -z-10">
          <ArrowRight className="absolute -right-3 -top-2.5 h-5 w-5 text-primary/40" />
        </div>
      )}
    </motion.div>
  );
};

export default ProcessStep;