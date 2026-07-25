import BestSellersSection from "@/components/landing/BestSellersSection";
import CategoriesSection from "@/components/landing/CategoriesSection";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <BestSellersSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
