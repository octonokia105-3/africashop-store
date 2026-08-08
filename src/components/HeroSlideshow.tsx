"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/app/actions/products";

const defaultSlides = [
  {
    id: 1,
    image: "/images/products/model_holding_bag.jpg",
    title: "باك الأركان الملكي المتكامل 🌿",
    subtitle: "7 قطـع فاخرة للعناية الشاملة بالوجه والجسم بالأركان المغربي الأصيل. التوصيل مجاني والدفع عند الاستلام بـ 220 درهم فقط!",
    cta: "أطلبي الآن واستفيدي من التوصيل المجاني",
  },
  {
    id: 2,
    image: "/images/products/model_applying_lotion.jpg",
    title: "طقوس الجمال والدلال اليومي ✨",
    subtitle: "مجموعة العناية الشاملة لتصفية ونعومة البشرة. حليب الجسم، مقشر طبيعي، ماسك مغذي، كريم ومرطب الوجه.",
    cta: "احصلي على مجموعتك الآن",
  },
  {
    id: 3,
    image: "/images/products/flatlay_jaderoller.jpg",
    title: "أصالة الجمال والرفاهية 🇲🇦",
    subtitle: "أركان طبيعي 100% مغذي ومجدد للبشرة. تأتي في حقيبة تجميل عصرية أنيقة من AfricaShop — الهدية المثالية بكل أنثى.",
    cta: "اكتشفي باقة الأناقة",
  }
];

export default function HeroSlideshow({ product }: { product?: Product }) {
  const [current, setCurrent] = useState(0);

  const slides = product && product.images.length > 0 
    ? product.images.map((img, idx) => ({
        id: idx + 1,
        image: img,
        title: product.title,
        subtitle: product.description || "التوصيل مجاني والدفع عند الاستلام!",
        cta: "أطلب الآن قبل نفاذ الكمية",
      }))
    : defaultSlides;

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <section className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden bg-[#fff7f9] border-b border-rose-100">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Background Image with subtle zoom */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 8, ease: "linear" }}
          >
            <Image 
              src={slides[current].image}
              alt={slides[current].title || "AfricaShop Slide"}
              fill
              className="object-cover object-center"
              priority
            />
            {/* Soft Light Overlay so products and face remain 100% visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent opacity-90" />
          </motion.div>

          {/* Text Content Container */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className="max-w-3xl w-full flex flex-col items-center">
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-[#e85d88] drop-shadow-sm mb-4"
              >
                {slides[current].title}
              </motion.h1>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/85 backdrop-blur-md px-6 py-4 rounded-2xl border border-rose-200/60 shadow-sm max-w-2xl mb-8"
              >
                <p className="text-base sm:text-lg md:text-xl text-gray-700 font-bold leading-relaxed">
                  {slides[current].subtitle}
                </p>
              </motion.div>
              
              <motion.button 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('checkout-top')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#e85d88] hover:bg-[#d4426f] text-white font-bold py-4 px-8 md:px-12 rounded-full text-lg md:text-xl shadow-[0_8px_25px_rgba(232,93,136,0.4)] transition-all flex items-center gap-3 group cursor-pointer"
              >
                <span>{slides[current].cta}</span>
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows (Hidden on very small screens, visible on md+) */}
      <div className="hidden md:flex absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between px-6 z-20 pointer-events-none">
        <button 
          onClick={prevSlide}
          className="pointer-events-auto w-12 h-12 rounded-full bg-void/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:text-void hover:border-gold transition-all duration-300 group"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
        <button 
          onClick={nextSlide}
          className="pointer-events-auto w-12 h-12 rounded-full bg-void/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:text-void hover:border-gold transition-all duration-300 group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 inset-x-0 flex justify-center gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 rounded-full ${
              current === idx 
                ? "w-10 h-2.5 bg-gold shadow-[0_0_10px_rgba(232,184,58,0.5)]" 
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Bottom fade to blend with page */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-void to-transparent z-10 pointer-events-none" />
    </section>
  );
}
