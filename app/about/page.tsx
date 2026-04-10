"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { Loader2 } from "lucide-react";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
}

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch("/api/team");
        if (response.ok) {
          const data = await response.json();
          setTeamMembers(data);
        }
      } catch (error) {
        console.error("Failed to fetch team:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/about-hero.jpg"
          alt="About Us Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-secondary/70 backdrop-blur-sm" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 animate-fade-in-up">Our Story</h1>
          <p className="text-gray-200 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
            We are more than just a travel agency. We are creators of memories, architects of journeys, and seekers of the extraordinary.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 space-y-8">
              <SectionHeader
                pill="Our Mission"
                title="Redefining the Luxury Travel Experience"
                subtitle="Founded in 2010, Tripzo was born from a passion for the world's most beautiful places and a commitment to providing the ultimate travel experience."
                centered={false}
              />
              <p className="text-muted-foreground leading-relaxed">
                Tripzo is an award-winning luxury travel agency specializing in personalized journeys across seven continents. We believe travel should be immersive, authentic, and transformative.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our curated collections of hotels, resorts, and private villas are selected with meticulous care, ensuring you have the most premium experience possible.
              </p>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-64 rounded-[40px] overflow-hidden shadow-lg transform translate-y-10">
                  <Image src="/images/destination-1.jpg" alt="Paris" fill className="object-cover" />
                </div>
                <div className="relative h-64 rounded-[40px] overflow-hidden shadow-lg">
                  <Image src="/images/destination-2.jpg" alt="Bali" fill className="object-cover" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative h-72 rounded-[40px] overflow-hidden shadow-lg">
                  <Image src="/images/hero.jpg" alt="Beach" fill className="object-cover" />
                </div>
                <div className="relative h-56 rounded-[40px] overflow-hidden shadow-lg transform -translate-y-6">
                  <Image src="/images/destination-3.jpg" alt="Dubai" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <SectionHeader
            pill="Our Team"
            title="The Experts Behind Your Journey"
            subtitle="Meet the passionate travel designers dedicated to crafting your next extraordinary adventure."
          />
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground font-serif">Loading our expert team...</p>
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {teamMembers.map((member) => (
                <div key={member._id} className="flex flex-col items-center group">
                  <div className="relative w-72 h-[400px] mb-6 overflow-hidden rounded-t-[100px] rounded-b-3xl shadow-xl transition-transform duration-500 group-hover:scale-[1.03]">
                    <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-secondary">{member.name}</h3>
                  <p className="text-primary font-medium tracking-wide uppercase text-xs">{member.role}</p>
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center py-20 bg-white rounded-[40px] shadow-sm">
                <p className="text-muted-foreground font-serif text-lg italic">Our expert team members will be listed here soon.</p>
             </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
