import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { PackageCard } from "@/components/PackageCard";
import dbConnect from "@/lib/mongodb";
import Package from "@/models/Package";

export default async function PackagesPage() {
  await dbConnect();
  const travelPackages = await Package.find({});

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Packages Hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-secondary/60 backdrop-blur-sm" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Travel Packages</h1>
          <p className="text-gray-200 max-w-xl mx-auto px-6">
            Explore our curated all-inclusive luxury travel packages designed for your ultimate experience.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <SectionHeader
            pill="Exclusive Offers"
            title="Premium Travel Experiences"
            subtitle="Find the perfect package that suits your style. From relaxation to adventure, we have everything."
          />
          
          {travelPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {travelPackages.map((pkg) => (
                <PackageCard 
                  key={pkg._id.toString()} 
                  id={pkg._id.toString()}
                  image={pkg.image}
                  title={pkg.name}
                  price={pkg.price}
                  duration={pkg.duration}
                  location={pkg.location}
                  rating={pkg.rating}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-muted/30 rounded-[40px] border border-dashed border-gray-200">
               <p className="text-xl text-muted-foreground font-serif">Check back soon for new exclusive offers.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
