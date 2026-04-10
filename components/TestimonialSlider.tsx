"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  content: string;
  image: string;
}

export const TestimonialSlider = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="relative max-w-5xl mx-auto mt-16 px-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-10 md:p-16 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col md:flex-row items-center gap-12 text-left"
        >
          <div className="relative shrink-0">
             <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-[6px] border-primary/10 relative z-10 transition-transform duration-700 hover:scale-105">
                <Image
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  fill
                  className="object-cover"
                />
             </div>
             <div className="absolute -bottom-2 -right-2 bg-primary w-12 h-12 rounded-full flex items-center justify-center text-white z-20 shadow-lg">
                <Quote size={20} fill="currentColor" />
             </div>
          </div>

          <div className="flex-1">
            <div className="flex gap-1 mb-6">
               {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-accent fill-accent" />
               ))}
            </div>
            
            <p className="text-secondary text-xl md:text-2xl font-medium leading-relaxed mb-8 italic">
              "{testimonials[current].content}"
            </p>
            
            <div>
              <h4 className="text-xl font-serif font-black text-secondary">{testimonials[current].name}</h4>
              <p className="text-primary font-black uppercase text-xs tracking-widest mt-1">{testimonials[current].role || "Traveler"}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-4 mt-12">
        <button 
          onClick={() => setCurrent(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
          className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all group shadow-sm bg-white"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => setCurrent(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
          className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all group shadow-sm bg-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
