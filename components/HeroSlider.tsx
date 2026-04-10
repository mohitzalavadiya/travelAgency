"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";

const slides = [
  {
    image: "/images/hero.jpg",
    accent: "Traveling & Tours",
    title: "Adventure is \n Waiting For You",
    subtitle: "Experience the world's most breathtaking locations with Tevily.",
  },
  {
    image: "/images/destination-6.jpg",
    accent: "Explore the World",
    title: "Travel to Any \n Corner of World",
    subtitle: "We provide the best tour packages for your dream destination.",
  },
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  return (
    <section className="relative h-[100vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image}
            alt="Hero Background"
            fill
            priority
            className="object-cover scale-110 active:scale-100 transition-transform duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-secondary/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-transparent to-white/10" />
          
          <div className="relative z-10 h-full container mx-auto px-6 flex flex-col items-center justify-center text-center text-white">
            <motion.span
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-script text-primary text-4xl lg:text-6xl mb-6 block"
            >
              {slides[current].accent}
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-9xl font-serif font-black mb-10 max-w-6xl mx-auto leading-[1.05] tracking-tighter"
            >
              {slides[current].title.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <Button variant="primary" href="/packages">
                Explore Our Tours
              </Button>
              <Button variant="outline" size="lg" href="/about" className="rounded-full px-12 py-7 border-white/30 text-white hover:bg-white hover:text-secondary group transition-all">
                Learn More <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-10 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all group"
      >
        <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-10 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all group"
      >
        <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Page Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              current === i ? "bg-primary w-8" : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
