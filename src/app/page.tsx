import FeaturedListings from "@/components/FeaturedListings";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <>
      <Header />
      <main id="inhoud" className="flex-1">
        <Hero />
        <Testimonial />
        <FeaturedListings />
      </main>
      <Footer />
    </>
  );
}
