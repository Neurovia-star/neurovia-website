import About from "@/components/About";
import { AuthModalProvider } from "@/components/AuthModal";
import Background from "@/components/Background";
import Contact from "@/components/Contact";
import Courses from "@/components/Courses";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { LoadingProvider } from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <LoadingProvider>
      <AuthModalProvider>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <Courses />
        <About />
        <Testimonials />
        <Faq />
        <CtaBand />
        <Contact />
      </main>
        <Footer />
      </AuthModalProvider>
    </LoadingProvider>
  );
}
