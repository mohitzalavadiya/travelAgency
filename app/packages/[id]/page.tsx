import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Users, Star, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import dbConnect from "@/lib/mongodb";
import Package from "@/models/Package";
import mongoose from "mongoose";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PackageIdPage({ params }: PageProps) {
  const { id } = await params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  await dbConnect();
  const pkg = await Package.findById(id);

  if (!pkg) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-secondary/70 backdrop-blur-[2px]" />
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <Button href="/packages" variant="ghost" className="text-white/60 mb-6 p-0 hover:bg-transparent flex items-center gap-2 mx-auto decoration-white/20 hover:text-white">
            <ArrowLeft size={20} /> Back to Packages
          </Button>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">
            {pkg.name}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-lg font-medium text-white/90">
            <div className="flex items-center gap-2">
              <Calendar className="text-primary" size={22} /> {pkg.duration}
            </div>
            <div className="w-2 h-2 bg-white/20 rounded-full" />
            <div className="flex items-center gap-2">
              <Star className="text-[#FFB400] fill-[#FFB400]" size={22} /> {pkg.rating.toFixed(1)}
            </div>
          </div>
        </div>
      </section>

      {/* Booking and Details */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left Column: Details */}
            <div className="lg:w-2/3">
              <div className="space-y-12">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-secondary mb-6">Experience Overview</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
                    {pkg.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col gap-6">
                    <h3 className="text-xl font-serif font-bold text-secondary flex items-center gap-2">
                      <CheckCircle2 className="text-primary" size={24} /> What&apos;s Included
                    </h3>
                    <ul className="space-y-4">
                      {pkg.includes.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center gap-4">
                     <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
                        <Users size={32} />
                     </div>
                     <h3 className="text-xl font-serif font-bold text-secondary">Group Size</h3>
                     <p className="text-muted-foreground">Max 12 Guests for a personalized boutique experience.</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-secondary mb-6">Detailed Itinerary</h3>
                  <div className="space-y-6">
                    {[1, 2, 3].map((day) => (
                      <div key={day} className="flex gap-6 group">
                        <div className="w-16 h-16 rounded-2xl bg-muted flex flex-col items-center justify-center shrink-0 border border-gray-100 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <span className="text-xs font-bold uppercase tracking-widest leading-none">Day</span>
                          <span className="text-2xl font-serif font-bold">0{day}</span>
                        </div>
                        <div className="pt-2">
                          <h4 className="text-xl font-serif font-bold text-secondary mb-2">Adventure Discovery Phase</h4>
                          <p className="text-muted-foreground">Detailed daily plan including morning exploration, gourmet lunch sessions, and evening leisure with curated local experiences.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Booking Card */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 bg-secondary text-white p-10 rounded-[50px] shadow-2xl overflow-hidden group">
                <div className="z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-sm font-medium text-white/60 tracking-widest uppercase">Price starts at</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-serif font-bold text-primary">${pkg.price}</span>
                      <span className="text-white/40">/person</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6 mb-10">
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <Calendar size={20} className="text-primary" />
                        <div>
                          <p className="text-xs text-white/40 uppercase tracking-widest">Travel Month</p>
                          <p className="font-bold">May 2024 - Sept 2024</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <Users size={20} className="text-primary" />
                        <div>
                          <p className="text-xs text-white/40 uppercase tracking-widest">Travelers</p>
                          <p className="font-bold">Couple (2 Adults)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    variant="primary" 
                    size="lg" 
                    href={`/booking?destination=${encodeURIComponent(pkg.name)}`}
                    className="w-full h-16 text-lg rounded-2xl mb-6 shadow-xl shadow-primary/20"
                  >
                    Book This Voyage
                  </Button>
                  
                  <p className="text-center text-xs text-white/40 leading-relaxed px-4">
                    By booking, you agree to our Terms of Luxury Service and Refund Policies. Secure payment guaranteed.
                  </p>
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
