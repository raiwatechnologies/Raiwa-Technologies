import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ image, icon: Icon, title, client, description, tags, metrics, ctaText = 'View Case Study', index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col rounded-2xl bg-white border border-[#A09E9D]/30 overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-500"
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#E5E5E5]">
        <div className="absolute inset-0 bg-[#171313]/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {image ? (
          <img 
            src={image} 
            alt={`${title} project for ${client}`}
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-luxury-gradient flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
            {Icon && <Icon className="h-20 w-20 text-white/90" />}
          </div>
        )}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
          {tags?.map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/95 backdrop-blur-sm text-[#171313] border border-[#A09E9D]/30 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-8">
        <div className="mb-2 text-sm font-bold text-[#171313] uppercase tracking-widest">{client}</div>
        <h3 className="text-2xl font-bold font-heading text-[#171313] mb-4 group-hover:text-[#DA0807] transition-colors">{title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">{description}</p>
        
        {metrics && (
          <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-[#E5E5E5]/50 rounded-xl border border-[#A09E9D]/25">
            {metrics.map((metric, i) => (
              <div key={i}>
                <div className="text-xl font-bold text-primary-dark mb-1">{metric.value}</div>
                <div className="text-xs font-medium text-muted-foreground uppercase">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        <Link to="/contact" className="inline-flex items-center text-[#171313] font-bold mt-auto group/link hover:text-[#DA0807] transition-colors">
          {ctaText}
          <ArrowUpRight className="ml-2 w-5 h-5 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;