import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Star } from "lucide-react";
import { Button } from "./ui/Button";

interface PackageCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  duration: string;
  location: string;
  rating: number;
}

export const PackageCard = ({
  id,
  image,
  title,
  price,
  duration,
  location,
  rating,
}: PackageCardProps) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100">
      <Link href={`/packages/${id}`}>
        <div className="relative h-64 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Star className="text-primary fill-primary" size={14} />
            <span className="text-xs font-bold text-secondary">{rating}</span>
          </div>
          <div className="absolute bottom-4 right-4 bg-primary text-white font-bold px-4 py-2 rounded-2xl shadow-lg transform transition-transform group-hover:scale-110">
            ${price}
          </div>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col grow">
        <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2">
          <MapPin size={14} />
          {location}
        </div>
        <Link href={`/packages/${id}`}>
          <h3 className="text-xl font-serif font-bold text-secondary mb-3 group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-4 text-muted-foreground text-sm mb-6">
          <div className="flex items-center gap-1.5">
            <Clock size={16} />
            {duration}
          </div>
          <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
          <div className="text-primary font-medium">Limited Offer</div>
        </div>
        
        <div className="mt-auto">
          <Button 
            variant="outline" 
            href={`/booking?destination=${encodeURIComponent(title)}`}
            className="w-full rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};
