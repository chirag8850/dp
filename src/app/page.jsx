import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Footer from "./_components/sections/Footer";
import About from "./_components/sections/About";
import Services from "./_components/sections/Serivces";
import Pricing from "./_components/sections/Pricing";
import Blog from "./_components/sections/Blog";
import Contact from "./_components/sections/Contact";

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen bg-custom">
        <Header />
        <Hero />
      </div>

      <About />
      <Services />
      <Pricing />
      <Blog />
      <div className="left-bg">
        <Contact />
      </div>
      <Footer />
    </>
  );
}
