import Navbar from './Navbar';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import WorkSection from './WorkSection';
import AboutSection from './AboutSection';
import ReviewSection from './ReviewSection';
import HiringSection from './HiringSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
export default function HomePage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WorkSection />
      <AboutSection />
      <ReviewSection />
      <HiringSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
