"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar as CalendarIcon, 
  Users, 
  MessageSquare, 
  Send,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { Button } from "./ui/Button";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  travelDate: string;
  guests: string;
  message: string;
}

const initialFormState: FormData = {
  fullName: "",
  email: "",
  phone: "",
  destination: "",
  travelDate: "",
  guests: "1",
  message: "",
};

const FormContent = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [destinationsList, setDestinationsList] = useState([]);
  const [isLoadingDestinations, setIsLoadingDestinations] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("/api/destinations");
        if (response.ok) {
          const data = await response.json();
          setDestinationsList(data);
        }
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        setIsLoadingDestinations(false);
      }
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    const destination = searchParams.get("destination");
    const date = searchParams.get("date");
    const guests = searchParams.get("guests");

    setFormData((prev) => ({
      ...prev,
      ...(destination && { destination: decodeURIComponent(destination) }),
      ...(date && { travelDate: date }),
      ...(guests && { guests: guests }),
    }));
  }, [searchParams]);

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.destination.trim()) newErrors.destination = "Destination is required";
    if (!formData.travelDate) newErrors.travelDate = "Travel date is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData(initialFormState);
      } else {
        throw new Error("Failed to submit booking");
      }
    } catch {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-secondary mb-4">
          Booking Request Received!
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Thank you for choosing us. Our travel consultant will contact you within the next 24 hours to finalize your journey.
        </p>
        <Button href="/" variant="primary" size="lg" className="rounded-2xl">
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <User size={14} className="text-primary" /> Full Name
          </label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full bg-muted p-4 rounded-2xl border-2 transition-all outline-none focus:ring-4 focus:ring-primary/10 ${
              errors.fullName ? "border-red-400" : "border-transparent focus:border-primary/30"
            }`}
            placeholder="John Doe"
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Mail size={14} className="text-primary" /> Email Address
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-muted p-4 rounded-2xl border-2 transition-all outline-none focus:ring-4 focus:ring-primary/10 ${
              errors.email ? "border-red-400" : "border-transparent focus:border-primary/30"
            }`}
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Phone size={14} className="text-primary" /> Phone Number
          </label>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full bg-muted p-4 rounded-2xl border-2 transition-all outline-none focus:ring-4 focus:ring-primary/10 ${
              errors.phone ? "border-red-400" : "border-transparent focus:border-primary/30"
            }`}
            placeholder="+1 (234) 567-890"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <MapPin size={14} className="text-primary" /> Preferred Destination
          </label>
          <div className="relative">
            <select
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className={`w-full bg-muted p-4 rounded-2xl border-2 transition-all outline-none focus:ring-4 focus:ring-primary/10 appearance-none ${
                errors.destination ? "border-red-400" : "border-transparent focus:border-primary/30"
              }`}
            >
              <option value="">Select a destination</option>
              {destinationsList.map((dest: { _id: string, name: string }) => (
                <option key={dest._id} value={dest.name}>
                  {dest.name}
                </option>
              ))}
              {destinationsList.length === 0 && !isLoadingDestinations && (
                <option value="Other">Other (Contact us)</option>
              )}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              {isLoadingDestinations ? <Loader2 size={18} className="animate-spin" /> : <MapPin size={18} />}
            </div>
          </div>
          {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination}</p>}
        </div>

        {/* Travel Date */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <CalendarIcon size={14} className="text-primary" /> Planned Travel Date
          </label>
          <input
            name="travelDate"
            type="date"
            value={formData.travelDate}
            onChange={handleChange}
            className={`w-full bg-muted p-4 rounded-2xl border-2 transition-all outline-none focus:ring-4 focus:ring-primary/10 ${
              errors.travelDate ? "border-red-400" : "border-transparent focus:border-primary/30"
            }`}
          />
          {errors.travelDate && <p className="text-red-500 text-xs mt-1">{errors.travelDate}</p>}
        </div>

        {/* Number of People */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Users size={14} className="text-primary" /> Group Size
          </label>
          <select
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full bg-muted p-4 rounded-2xl border-2 border-transparent transition-all outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/30 appearance-none"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, "9+"].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Person" : "People"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <MessageSquare size={14} className="text-primary" /> Special Requirements (Optional)
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full bg-muted p-4 rounded-2xl border-2 border-transparent transition-all outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/30 resize-none"
          placeholder="Tell us about your dream trip..."
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-16 rounded-2xl text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={24} /> Processing your dream trip...
          </>
        ) : (
          <>
            <Send size={24} /> Confirm Booking Request
          </>
        )}
      </Button>
    </form>
  );
};

export const BookingForm = () => {
    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <FormContent />
        </Suspense>
    );
};
