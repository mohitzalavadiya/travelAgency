"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, User } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";

const posts = [
  {
    image: "/images/destination-1.jpg",
    date: "28 Aug",
    author: "Admin",
    comments: 2,
    title: "Things to See and Do When Visiting Japan",
  },
  {
    image: "/images/destination-2.jpg",
    date: "26 Aug",
    author: "Admin",
    comments: 0,
    title: "Travel the Most Beautiful Places in the World",
  },
  {
    image: "/images/destination-3.jpg",
    date: "21 Aug",
    author: "Admin",
    comments: 5,
    title: "Journeys are Best Measured in New Friends",
  },
];

export const BlogSection = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeader
          scriptAccent="Updates & News"
          title="Leatest News & Articles"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-64 overflow-hidden rounded-[20px] mb-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-5 left-5 bg-primary text-white w-14 h-14 rounded-xl flex flex-col items-center justify-center font-black leading-tight shadow-xl">
                    <span className="text-xl">{post.date.split(' ')[0]}</span>
                    <span className="text-[11px] uppercase tracking-wider">{post.date.split(' ')[1]}</span>
                </div>
              </div>

              <div className="space-y-4 px-2">
                <div className="flex items-center gap-6 text-[#777] text-sm font-bold">
                  <div className="flex items-center gap-2 group-hover:text-primary transition-colors">
                    <User size={16} className="text-primary" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2 group-hover:text-primary transition-colors">
                    <MessageCircle size={16} className="text-primary" />
                    <span>{post.comments} Comments</span>
                  </div>
                </div>

                <h3 className="text-2xl font-serif font-black text-secondary group-hover:text-primary transition-colors leading-tight">
                  <Link href="/blog">{post.title}</Link>
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
