"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "./ui/Button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/destinations" },
  { name: "Packages", href: "/packages" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white transition-transform group-hover:rotate-12">
            <Globe size={24} />
          </div>
          <span className={`text-2xl font-serif font-bold tracking-tight transition-colors ${
            scrolled ? "text-secondary" : "text-white"
          }`}>
            TravelLuxe
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                scrolled ? "text-secondary" : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button variant="primary" size="sm" className="hidden lg:flex">
            Plan Your Trip
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? "text-secondary" : "text-white"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 md:hidden z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-white shadow-2xl transition-transform duration-300 transform md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-8 gap-6 mt-16">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-serif font-semibold text-secondary hover:text-primary transition-colors border-b border-gray-100 pb-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button variant="primary" className="mt-4" onClick={() => setIsOpen(false)}>
            Plan Your Trip
          </Button>
        </div>
      </div>
    </nav>
  );
};
