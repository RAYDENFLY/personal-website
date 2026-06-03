import { Suspense } from "react";
import { About } from "@/components/About";
import { Connect } from "@/components/Connect";
import { Currently } from "@/components/Currently";
import { Favorites } from "@/components/Favorites";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { FAQ } from "@/components/FAQ";
import { MessageBoard } from "@/components/MessageBoard";
import { Hero } from "@/components/Hero";
import { Interests } from "@/components/Interests";
import { Navbar } from "@/components/Navbar";
import { Quote } from "@/components/Quote";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { StatsBar } from "@/components/StatsBar";
import { NowPlaying, NowPlayingSkeleton } from "@/components/now-playing";

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
        <Currently>
          <Suspense fallback={<NowPlayingSkeleton />}>
            <NowPlaying />
          </Suspense>
        </Currently>
        <Favorites />
        <Gallery />
        <FAQ />
        <MessageBoard />
        <Quote />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
