import Hero from './Hero';
import HowItWorks from './HowItWorks';
import NavBar from './NavBar';
import Features from './Features';
import CTASection from './CTASection';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <div>
        <NavBar />
        <Hero />
        <HowItWorks />
        <Features />
        <CTASection />
        <Footer />
    </div>
  );
}
