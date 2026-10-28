import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge.jsx';
import { Link } from 'react-router-dom';

const PortfolioCard = ({ image, title, client, problem, results, category, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden border border-border transition-all duration-500 hover:shadow-2xl flex flex-col h-full"
    >
      <div className="relative w-full overflow-hidden aspect-[16/9] bg-[#E5E5E5]">
        <img
          src={image}
          alt={`Case study for ${client}`}
          loading="lazy"
          decoding="async"
          className="block w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171313]/95 via-[#171313]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
          <p className="text-primary-foreground font-medium mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            <span className="font-bold block mb-1">The Challenge:</span>
            {problem}
          </p>
          <Link to="/contact" className="inline-flex items-center text-primary-foreground font-bold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
            Work with us <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="bg-[#E5E5E5] text-[#171313] hover:bg-[#A09E9D]/40 border border-[#A09E9D]/30">
            {category}
          </Badge>
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-foreground">
          {title}
        </h3>
        
        <p className="text-sm font-medium text-muted-foreground mb-6">
          Client: <span className="text-foreground">{client}</span>
        </p>
        
        <div className="mt-auto bg-muted/50 rounded-xl p-4 border border-border/50 group-hover:border-[#DA0807]/40 transition-colors">
          <div className="flex items-start gap-3">
            <div className="bg-[#E5E5E5] p-2 rounded-lg text-[#171313] flex-shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Results</p>
              <p className="text-sm font-semibold text-foreground leading-snug">{results}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;