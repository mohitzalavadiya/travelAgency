"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { DestinationCard } from "@/components/DestinationCard";
import { Loader2 } from "lucide-react";

interface Destination {
  _id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("/api/destinations");
        if (response.ok) {
          const data = await response.json();
          setDestinations(data);
        }
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Page Header */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/cta-bg.jpg"
          alt="Destinations Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-secondary/60 backdrop-blur-sm" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 animate-fade-in-up">Explore Destinations</h1>
          <p className="text-gray-200 max-w-xl mx-auto px-6 animate-fade-in-up delay-100">
            Discover the world&apos;s most breathtaking locations curated just for you.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <SectionHeader
            pill="All Locations"
            title="Choose Your Next Escape"
            subtitle="Explore our full collection of world-class destinations, each offering a unique luxury experience."
          />
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground font-serif">Loading breathtaking locations...</p>
            </div>
          ) : destinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {destinations.map((dest) => (
                <DestinationCard 
                  key={dest._id} 
                  id={dest._id}
                  image={dest.image}
                  location={dest.name}
                  description={dest.description}
                  rating={dest.rating}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-muted/30 rounded-[40px] border border-dashed border-gray-200">
              <p className="text-xl text-muted-foreground font-serif">New destinations coming soon.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
