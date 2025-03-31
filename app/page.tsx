import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Features from "./components/Features";
import ApiExample from "./components/ApiExample";
import ClientShowcase from "./components/ClientShowcase";
import ServiceOfferings from "./components/ServiceOfferings";
import CTASection from "./components/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero 
          title="Next.js & Cloudflare Specialists"
          subtitle="We build lightning-fast websites and applications that leverage the power of the edge"
          ctaText="Get a Free Consultation"
          ctaLink="/contact"
        />
        <ClientShowcase />
        <ServiceOfferings />
        <Features />
        <CTASection 
          title="Ready to accelerate your web presence?"
          subtitle="Let's discuss how our expertise in Next.js and Cloudflare can help your business."
          buttonText="Contact Us Today"
          buttonLink="/contact"
        />
      </main>
      <Footer />
    </div>
  );
}
