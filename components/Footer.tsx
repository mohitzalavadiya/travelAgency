import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Globe, Camera, X } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white transition-transform group-hover:rotate-12">
                <Globe size={24} />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight">
                TravelLuxe
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Elevating your travel experience with luxury, exploration, and unforgettable memories. Join us on the journey of a lifetime.
            </p>
            <div className="flex gap-4">
              {[Globe, X, Camera].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-primary transition-all duration-300"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-serif font-bold">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {["Destinations", "Cruises", "Hotels", "Packages", "About Us", "Contact"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase().replace(" ", "-")}`}
                  className="text-gray-400 text-sm hover:text-primary transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Social / IG Column (Placeholder for Premium look) */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-serif font-bold">Follow Our Journey</h4>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-gray-800 rounded-lg overflow-hidden group relative">
                   <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                   <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-125 opacity-40 group-hover:opacity-100" style={{ backgroundImage: `url('/images/destination-${i}.jpg')` }} />
                </div>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-serif font-bold">Contact Us</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="text-primary mt-1" size={18} />
                <span>123 Luxury Avenue, Suite 500<br />New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="text-primary" size={18} />
                <span>+1 (234) 567-890</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="text-primary" size={18} />
                <span>hello@travelluxe.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
          <p>© 2024 TravelLuxe Agency. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
