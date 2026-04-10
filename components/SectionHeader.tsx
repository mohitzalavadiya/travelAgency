import React from "react";

interface SectionHeaderProps {
  pill: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  darkBackground?: boolean;
}

export const SectionHeader = ({ 
  pill, 
  title, 
  subtitle, 
  centered = true,
  darkBackground = false 
}: SectionHeaderProps) => {
  return (
    <div className={`flex flex-col gap-4 mb-12 ${centered ? "items-center text-center mx-auto" : "items-start text-left"}`}>
      <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest animate-fade-in ${
        darkBackground 
          ? "bg-white/20 text-white backdrop-blur-sm" 
          : "bg-primary/10 text-primary"
      }`}>
        {pill}
      </span>
      <h2 className={`text-4xl md:text-5xl font-serif font-bold max-w-3xl leading-tight ${
        darkBackground ? "text-white" : "text-secondary"
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-3xl leading-relaxed ${
          darkBackground ? "text-gray-200" : "text-muted-foreground"
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
