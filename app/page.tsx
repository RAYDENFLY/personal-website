import { About } from "@/components/About";
import { Connect } from "@/components/Connect";
import { Currently } from "@/components/Currently";
import { Favorites } from "@/components/Favorites";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Interests } from "@/components/Interests";
import { Navbar } from "@/components/Navbar";
import { Quote } from "@/components/Quote";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { StatsBar } from "@/components/StatsBar";

export default function Home() {
  return (
    <>
      <RevealOnScroll />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Interests />
        <Currently />
        <Favorites />
        <Gallery />
        <Quote />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
