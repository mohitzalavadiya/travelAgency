import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingForm } from "@/components/BookingForm";
import { ShieldCheck, Headphones, CreditCard } from "lucide-react";

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#F9F7F3]">
      <Navbar />
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-primary/5 rounded-bl-[200px] -z-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/4 h-[400px] bg-secondary/5 rounded-tr-[200px] -z-10 blur-3xl" />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              Reserve Your Journey
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-secondary mb-6">
              Book Your Next Adventure
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Fill in the details below and our travel experts will curate a personalized itinerary just for you. Your luxury experience starts here.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left side: Trust badges & Info */}
            <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
              <div className="p-8 bg-white rounded-[40px] shadow-sm border border-gray-100 flex items-start gap-4 transition-transform hover:scale-105">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-secondary mb-1">Secure Booking</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Your data is protected by industry-leading security protocols.</p>
                </div>
              </div>

              <div className="p-8 bg-white rounded-[40px] shadow-sm border border-gray-100 flex items-start gap-4 transition-transform hover:scale-105">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Headphones size={24} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-secondary mb-1">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Dedicated travel agents available around the clock.</p>
                </div>
              </div>

              <div className="p-8 bg-white rounded-[40px] shadow-sm border border-gray-100 flex items-start gap-4 transition-transform hover:scale-105">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-secondary mb-1">Flexible Payment</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Multiple payment options available with zero hidden fees.</p>
                </div>
              </div>
            </div>

            {/* Right side: Form Card */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-2xl shadow-secondary/5 border border-gray-100">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
