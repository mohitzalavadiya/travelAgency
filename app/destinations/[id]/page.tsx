import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Star, ArrowLeft, Globe, Shield, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import dbConnect from "@/lib/mongodb";
import Destination from "@/models/Destination";
import mongoose from "mongoose";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DestinationIdPage({ params }: PageProps) {
  const { id } = await params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  await dbConnect();
  const destination = await Destination.findById(id);

  if (!destination) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-secondary/80 to-transparent" />
        <div className="container mx-auto px-6 pb-16 relative z-10">
          <Button href="/destinations" variant="ghost" className="text-white mb-6 p-0 hover:bg-transparent flex items-center gap-2">
            <ArrowLeft size={20} /> Back to Destinations
          </Button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-4">
                <MapPin size={18} /> {destination.country}
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4">
                {destination.name}
              </h1>
              <div className="flex items-center gap-2 text-white/90">
                <Star className="text-[#FFB400] fill-[#FFB400]" size={20} />
                <span className="font-bold text-lg">{destination.rating.toFixed(1)}</span>
                <span className="text-white/60 ml-2">(1,200+ Reviews)</span>
              </div>
            </div>
            <Button 
              size="lg" 
              href={`/booking?destination=${encodeURIComponent(destination.name)}`}
              className="bg-white text-secondary hover:bg-primary hover:text-white px-10 rounded-2xl h-16 text-lg"
            >
              Check Availability
            </Button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left Content */}
            <div className="lg:w-2/3">
              <div className="space-y-10">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-secondary mb-6">About {destination.name}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
                    {destination.longDescription}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: Globe, label: "Languages", value: "English, Local" },
                    { icon: Shield, label: "Safety Rating", value: "High (Level 1)" },
                    { icon: Clock, label: "Best Time to Visit", value: "May - September" },
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-muted rounded-3xl border border-gray-100 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                        <p className="font-bold text-secondary">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-secondary mb-6">Top Attractions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="relative h-48 rounded-3xl overflow-hidden group">
                        <Image 
                          src={`/images/destination-${(i % 6) + 1}.jpg`} 
                          alt="Attraction" 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                          <p className="text-white font-bold text-lg">Iconic Landmark #{i}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Sticky Booking Box */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100">
                <h3 className="text-2xl font-serif font-bold text-secondary mb-6">Inquiry For This Place</h3>
                <form className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Full Name</label>
                    <input type="text" className="w-full bg-muted p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary/20" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Email</label>
                    <input type="email" className="w-full bg-muted p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary/20" placeholder="Your Email" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Message</label>
                    <textarea className="w-full bg-muted p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary/20 h-32 resize-none" placeholder="Special requirements..." />
                  </div>
                  <Button className="w-full h-16 text-lg rounded-2xl">Send Inquiry</Button>
                </form>
                <div className="mt-8 pt-8 border-t border-gray-100 italic text-center text-sm text-muted-foreground">
                  &quot;One of the best places I have ever visited. Truly magical!&quot;
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
