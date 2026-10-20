import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';

const TestimonialsCarousel = ({ testimonials }) => {
  return (
    <div className="w-full relative px-4 md:px-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
              <TestimonialCard {...testimonial} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-card hover:bg-primary hover:text-primary-foreground border-border transition-colors" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-card hover:bg-primary hover:text-primary-foreground border-border transition-colors" />
        </div>
      </Carousel>
    </div>
  );
};

export default TestimonialsCarousel;