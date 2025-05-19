import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProductsSection />
      <BenefitsSection />
      <NewsletterSection />
    </main>
  );
}