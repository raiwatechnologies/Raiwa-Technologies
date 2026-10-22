import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { services, servicePath } from '@/lib/services.js';

const ServiceCard = ({ icon: Icon, title, description, benefits, ctaText = "Learn More", index = 0 }) => {
  const matchingService = services.find((service) => service.title.toLowerCase() === title.toLowerCase() || service.title.toLowerCase().startsWith(`${title.toLowerCase()} `));
  const destination = matchingService ? servicePath(matchingService) : '/contact';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="flex flex-col h-full rounded-2xl bg-white p-8 border shadow-luxury hover:shadow-luxury-hover transition-all duration-300 group relative overflow-hidden" style={{ borderColor: matchingService?.accent ? `${matchingService.accent}35` : undefined }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-[100px] -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150 z-0" style={{ backgroundColor: matchingService?.soft || "hsl(var(--primary-lighter-bg))" }} />
      
      <div className="relative z-10 flex-grow flex flex-col">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white border transition-all duration-300 shadow-sm" style={{ color: matchingService?.accent || "hsl(var(--primary))", borderColor: matchingService?.accent ? `${matchingService.accent}30` : undefined }}>
          {matchingService?.logoUrl ? <img src={matchingService.logoUrl} alt={`${matchingService.title} logo`} className="h-8 w-8 object-contain" loading="lazy" /> : <Icon className="h-8 w-8" />}
        </div>
        
        {matchingService && <p className="text-xs font-extrabold uppercase tracking-[.18em] mb-3" style={{ color: matchingService.accent }}>{matchingService.label}</p>}
        <h3 className="mb-4 text-2xl font-bold text-primary-dark font-heading transition-colors duration-300" style={{ color: matchingService?.accent || undefined }}>
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
          <Link to={destination}>
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