import React from 'react';
import { motion } from 'framer-motion';

const ValuePropositionCard = ({ icon: Icon, title, description, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white p-6 md:p-8 rounded-2xl border border-[#A09E9D]/30 relative isolate overflow-hidden group hover:shadow-lg hover:border-[#DA0807]/40 transition-all duration-300"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#A09E9D]/15 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150" />
      
      <div className="w-12 h-12 bg-[#E5E5E5] text-[#171313] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#171313] group-hover:text-white transition-colors duration-300">
        <Icon className="w-6 h-6" />
      </div>
      
      <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default ValuePropositionCard;