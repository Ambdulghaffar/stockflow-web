import LatestProductsSection from "@/components/shop/latest-products-section";
import CategoriesSection from "@/components/landing/CategoriesSection";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <LatestProductsSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
