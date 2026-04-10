"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Destination {
  _id: string;
  name: string;
}

export const HeroSearchBar = () => {
    const router = useRouter();
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [guests, setGuests] = useState("1");
    const [destinations, setDestinations] = useState<Destination[]>([]);

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
            }
        };
        fetchDestinations();
    }, []);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (destination) params.append("destination", destination);
        if (date) params.append("date", date);
        if (guests) params.append("guests", guests);
        
        router.push(`/booking?${params.toString()}`);
    };

    return (
        <section className="container mx-auto px-6 -mt-16 relative z-30">
            <div className="bg-white p-8 rounded-[40px] shadow-2xl flex flex-col lg:flex-row items-center gap-8 border border-gray-100 animate-fade-in-up delay-300">
                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Destination Input */}
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Search size={22} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1.5">Destination</label>
                            <input 
                                type="text" 
                                list="destinations-list"
                                placeholder="Where to?" 
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className="bg-transparent border-none p-0 text-secondary font-serif font-bold text-lg placeholder:text-gray-300 focus:ring-0 w-full"
                            />
                            <datalist id="destinations-list">
                                {destinations.map((dest) => (
                                    <option key={dest._id} value={dest.name} />
                                ))}
                            </datalist>
                        </div>
                    </div>
                
                    {/* Date Input */}
                    <div className="flex items-start gap-4 md:border-l md:border-gray-100 md:pl-8">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Calendar size={22} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col w-full relative">
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1.5">Date</label>
                            <div className="relative group">
                                <input 
                                    type="date" 
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="bg-transparent border-none p-0 text-secondary font-serif font-bold text-lg placeholder:text-gray-300 focus:ring-0 w-full cursor-pointer" 
                                />
                                {!date && (
                                    <span className="absolute left-0 pointer-events-none text-gray-300 font-serif font-bold text-lg">
                                        Choose date
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                
                    {/* Guests Input */}
                    <div className="flex items-start gap-4 md:border-l md:border-gray-100 md:pl-8">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Users size={22} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1.5">Guests</label>
                            <div className="relative">
                                <select 
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    className="bg-transparent border-none p-0 text-secondary font-serif font-bold text-lg placeholder:text-gray-300 focus:ring-0 w-full cursor-pointer appearance-none pr-8"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                                    ))}
                                    <option value="9+">9+ Guests</option>
                                </select>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={handleSearch}
                    className="w-full lg:w-auto h-20 px-16 rounded-[28px] text-lg shadow-xl hover:shadow-primary/20 hover:scale-105 transition-all duration-300"
                >
                    Search Now
                </Button>
            </div>
        </section>
    );
};
