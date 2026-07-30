import { notFound } from "next/navigation";
import { getProductBySlug } from "@/app/actions/products";
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
import LeadGenPopup from "@/components/LeadGenPopup";
import StickyActionButtons from "@/components/StickyActionButtons";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.title} | ArwaShop`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product || !product.is_active) {
    notFound();
  }

  // Pass product data to components. We can either pass it as props, 
  // or for now, since we haven't refactored the components to take props yet,
  // we just render them. We will refactor the components next.
  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden font-cairo">
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(232,184,58,0.03)_0%,transparent_100%)]" />
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />

      {/* <LeadGenPopup /> */}
      <StickyActionButtons />
      <StickyMobileCTA />

      <AnnouncementBar />
      <StickyHeader />
      
      <main>
        <HeroSlideshow product={product} />
        <SocialProofMarquee />
        <UrgencySection stock={product.urgency_stock} />
        
        <DetailedFeatures product={product} />
        <TechnicalSpecs product={product} />
        
        <div id="checkout-top" className="scroll-mt-24 py-12 bg-surface">
          <CheckoutForm product={product} />
        </div>

        <HowItWorks />
        <TrustGuarantees />
        <TestimonialsGrid />
        <FAQAccordion />
        
        <div className="pt-10 bg-void">
          <SocialProofMarquee />
        </div>
        <div id="checkout-bottom">
          <CheckoutForm product={product} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
