import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import WorkSection from '../components/WorkSection';
import AboutSection from '../components/AboutSection';
import ReviewSection from '../components/ReviewSection';
import HiringSection from '../components/HiringSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

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
