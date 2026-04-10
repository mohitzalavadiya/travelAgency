import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  image: string;
}

export const TestimonialCard = ({ name, role, content, image }: TestimonialCardProps) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-500">
      <div className="text-primary mb-6 animate-pulse group-hover:scale-125 transition-transform">
        <Quote size={40} fill="currentColor" opacity={0.2} />
      </div>
      
      <p className="text-muted-foreground italic text-lg leading-relaxed mb-8 max-w-md">
        "{content}"
      </p>
      
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-primary/10 group-hover:border-primary transition-colors duration-500 shadow-inner">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="text-lg font-serif font-bold text-secondary">{name}</h4>
          <p className="text-sm text-primary font-medium tracking-wide">{role}</p>
        </div>
      </div>
    </div>
  );
};
