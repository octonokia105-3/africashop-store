import AnnouncementBar from "@/components/AnnouncementBar";
import StickyHeader from "@/components/StickyHeader";
import HeroSlideshow from "@/components/HeroSlideshow";
import SocialProofMarquee from "@/components/SocialProofMarquee";
import UrgencySection from "@/components/UrgencySection";
import DetailedFeatures from "@/components/DetailedFeatures";
import TechnicalSpecs from "@/components/TechnicalSpecs";
import HowItWorks from "@/components/HowItWorks";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import TrustGuarantees from "@/components/TrustGuarantees";
import FAQAccordion from "@/components/FAQAccordion";
import CheckoutForm from "@/components/CheckoutForm";
import Footer from "@/components/Footer";
import StickyActionButtons from "@/components/StickyActionButtons";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden font-cairo bg-void text-light">
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(232,93,136,0.06)_0%,transparent_100%)]" />

      <StickyActionButtons />
      <StickyMobileCTA />

      <AnnouncementBar />
      <StickyHeader />
      
      <main>
        <HeroSlideshow />
        <SocialProofMarquee />
        <UrgencySection stock={7} />
        
        {/* Desire & Features Phase */}
        <DetailedFeatures />
        <TechnicalSpecs />
        
        {/* Top Checkout Section */}
        <div id="checkout-top" className="scroll-mt-24 py-12 bg-surface">
          <CheckoutForm />
        </div>

        {/* Proof & Risk Reversal */}
        <HowItWorks />
        <TrustGuarantees />
        <TestimonialsGrid />
        <FAQAccordion />
        
        {/* Bottom Checkout Section */}
        <div className="pt-10 bg-void">
          <SocialProofMarquee />
        </div>
        <div id="checkout-bottom">
          <CheckoutForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
