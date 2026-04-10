"use client";

import React from "react";
import { motion } from "framer-motion";

const brands = [
  "Traveling", "Adventure", "Tourism", "Tours", "Booking", "Explore"
];

export const BrandLogos = () => {
  return (
    <section className="py-20 bg-white border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-10">
          {brands.map((brand, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-500 cursor-pointer"
            >
              <div className="text-2xl lg:text-3xl font-serif font-black text-secondary tracking-tighter">
                {brand}<span className="text-primary">.</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
