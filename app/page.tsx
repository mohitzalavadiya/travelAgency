import React from "react";
import Image from "next/image";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { DestinationCard } from "@/components/DestinationCard";
import { PackageCard } from "@/components/PackageCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Button } from "@/components/ui/Button";
import { HeroSearchBar } from "@/components/HeroSearchBar";
import dbConnect from "@/lib/mongodb";
import Destination from "@/models/Destination";
import Package from "@/models/Package";
import Testimonial from "@/models/Testimonial";
import Offer from "@/models/Offer";

export default async function Home() {
  await dbConnect();
  
  const popularDestinations = await Destination.find({}).limit(3);
  const featuredPackages = await Package.find({ isFeatured: true }).limit(3);
  const testimonials = await Testimonial.find({}).limit(3);
  const activeOffer = await Offer.findOne({ isActive: true });

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Luxury Travel Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in-down">
            Explore the World Luxe
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 max-w-5xl leading-[1.1] animate-fade-in-up">
            Unforgettable Journeys Await Your Presence
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed animate-fade-in-up">
            Expertly curated luxury travel experiences for those who seek the extraordinary. From hidden paradises to iconic landmarks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
            <Button variant="primary" size="lg" href="/destinations">
              Explore Destinations
            </Button>
            <Button variant="outline" size="lg" href="/booking" className="border-white text-white hover:bg-white hover:text-secondary">
              Book a Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <HeroSearchBar />

      {/* Popular Destinations */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <SectionHeader
            pill="Top Destinations"
            title="Discover our Most Loved Locations"
            subtitle="Travel is the only thing you buy that makes you richer. Choose from our curated selection of hand-picked escapes."
          />
          
          {popularDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {popularDestinations.map((dest) => (
                <DestinationCard 
                  key={dest._id.toString()} 
                  id={dest._id.toString()}
                  image={dest.image}
                  location={dest.name}
                  description={dest.description}
                  rating={dest.rating}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              No regions found. Explore our packages for more ideas.
            </div>
          )}
          
          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" href="/destinations">
              View All Destinations <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-muted relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <SectionHeader
                pill="Why TravelLuxe"
                title="We Create Experiences, Not Just Vacations"
                subtitle="Our dedicated team of travel enthusiasts ensures every detail of your trip is handled with the utmost care and precision."
                centered={false}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                {[
                  { title: "Best Price Guarantee", desc: "Premium luxury at competitive rates." },
                  { title: "24/7 Premium Support", desc: "We're with you at every step." },
                  { title: "Tailored Itineraries", desc: "Expertly crafted to your desires." },
                  { title: "Handpicked Hotels", desc: "Only the finest accommodations." },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-4 p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                    <CheckCircle className="text-primary" size={32} />
                    <h4 className="text-xl font-serif font-bold text-secondary">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative h-[600px] w-full rounded-[60px] overflow-hidden shadow-2xl">
              <Image
                src="/images/about-hero.jpg"
                alt="Our Luxury Service"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <SectionHeader
            pill="Exclusive Offers"
            title="Our Featured Travel Packages"
            subtitle="Explore our most popular all-inclusive luxury travel packages designed for everyone."
          />
          
          {featuredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.map((pkg) => (
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
            <div className="text-center py-20 text-muted-foreground">
              Stay tuned for our upcoming luxury retreats.
            </div>
          )}
          
          <div className="mt-16 text-center">
            <Button variant="primary" size="lg" href="/packages">
              Browse All Packages
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeader
            pill="Testimonials"
            title="Hear From Our Travelers"
            subtitle="Real stories from our valued customers who embarked on extraordinary journeys with TravelLuxe."
          />
          
          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial._id.toString()}
                  name={testimonial.name}
                  role={testimonial.role}
                  content={testimonial.content}
                  image={testimonial.image}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground italic">
              Loading our guests&apos; stories...
            </div>
          )}
        </div>
      </section>

      {/* CTA Section / Offer Banner */}
      <section className="px-6 py-24">
        <div className="container mx-auto relative rounded-[60px] overflow-hidden group">
          <div className="absolute inset-0">
            <Image
              src={activeOffer?.backgroundImage || "/images/cta-bg.jpg"}
              alt="Ready for adventure"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-secondary/70 backdrop-blur-sm group-hover:bg-secondary/65 transition-colors" />
          </div>
          
          <div className="relative z-10 py-24 px-8 text-center text-white flex flex-col items-center">
            <SectionHeader
              pill={activeOffer ? `${activeOffer.discount} OFF` : "Join the Journey"}
              title={activeOffer?.title || "Ready for Your Next Extraordinary Adventure?"}
              subtitle={activeOffer?.subtitle || "Let us take you there. Book your personalized luxury travel package today and receive an exclusive discount."}
              darkBackground={true}
            />
            <div className="flex gap-4">
              <Button variant="primary" size="lg" href={activeOffer?.ctaLink || "/booking"} className="bg-white text-secondary hover:bg-primary hover:text-white px-12 transition-all">
                {activeOffer?.ctaText || "Get Started"}
              </Button>
              <Button size="lg" href="/contact" className="bg-transparent border-white text-white border-2 hover:bg-white hover:text-secondary px-12 transition-all">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
