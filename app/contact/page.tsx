import React from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Send, Globe } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/cta-bg.jpg"
          alt="Contact Us Hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-secondary/60 backdrop-blur-sm" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 tracking-tight leading-none">Get in Touch</h1>
          <p className="text-gray-200 max-w-xl mx-auto leading-relaxed">
            Ready to plan your next extraordinary escape? Our luxury travel experts are here to help you every step of the way.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Contact Info */}
            <div className="lg:w-1/3 flex flex-col gap-10">
              <SectionHeader
                pill="Contact Us"
                title="We're Here for You"
                subtitle="Whether you have a specific destination in mind or need inspiration, our travel experts are ready to assist."
                centered={false}
              />
              
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif font-bold text-secondary mb-1">Our Office</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">123 Luxury Avenue, Suite 500<br />New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif font-bold text-secondary mb-1">Phone</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">+1 (234) 567-890<br />Mon-Fri 9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif font-bold text-secondary mb-1">Email</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">hello@tripzo.com<br />support@tripzo.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-2/3 bg-white p-10 md:p-14 rounded-[50px] shadow-2xl border border-gray-100">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Full Name</label>
                  <input type="text" placeholder="John Doe" className="bg-muted p-4 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-secondary font-medium outline-none" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="bg-muted p-4 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-secondary font-medium outline-none" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Subject</label>
                  <input type="text" placeholder="Planning a trip to Bali" className="bg-muted p-4 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-secondary font-medium outline-none" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">How can we help?</label>
                  <textarea rows={5} placeholder="Tell us about your dream vacation..." className="bg-muted p-4 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-secondary font-medium outline-none resize-none" />
                </div>
                <div className="md:col-span-2 pt-4">
                  <Button variant="primary" size="lg" className="w-full flex gap-2 items-center text-lg h-16 group">
                    Send Message <Send size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[500px] w-full relative grayscale hover:grayscale-0 transition-all duration-1000">
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <Globe size={64} className="text-gray-400 opacity-20" />
            <span className="absolute text-gray-400 font-serif lowercase italic">interactive map placeholder</span>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.9147703055!2d-74.1197637394146!3d40.69740344223377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
        />
      </section>

      <Footer />
    </main>
  );
}
