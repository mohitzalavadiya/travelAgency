import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

interface DestinationCardProps {
  id: string;
  image: string;
  location: string;
  description: string;
  rating: number;
}

export const DestinationCard = ({ id, image, location, description, rating }: DestinationCardProps) => {
  return (
    <div className="group cursor-pointer">
      <Link href={`/destinations/${id}`}>
        <div className="relative h-[450px] overflow-hidden rounded-t-[100px] rounded-b-2xl mb-4 transition-transform duration-500 group-hover:scale-[1.02]">
          <Image
            src={image}
            alt={location}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          
          {/* Rating Badge */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 bg-white rounded-full shadow-lg transition-transform group-hover:scale-110">
            <Star className="text-[#FFB400] fill-[#FFB400]" size={16} />
            <span className="text-sm font-bold text-secondary">{rating.toFixed(1)}</span>
          </div>
        </div>
      </Link>
      
      <div className="text-center px-4">
        <Link href={`/destinations/${id}`}>
          <h3 className="text-2xl font-serif font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
            {location}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};
