"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Droplets, Sparkles, Heart, CheckCircle2 } from "lucide-react";
import { Product } from "@/app/actions/products";

export default function TechnicalSpecs({ product }: { product?: Product }) {
  const features = product?.features || [];
  const hasDynamicFeatures = features.length > 0;
  
  const arganSpecsLeft = [
    { label: "حليب الجسم (Lait Corps)", val: "ترطيب وتفتيح المناطق الجافة", icon: Droplets },
    { label: "مقشر الوجه والجسم (Gommage)", val: "إزالة الخلايا الميتة وتنقية المسام", icon: Sparkles },
    { label: "ماسك الوجه (Masque Visage)", val: "تغذية عميقة ومنح نضارة فورية", icon: Heart },
    { label: "كريم الوجه (Crème)", val: "نعومة وإشراقة تدوم طوال اليوم", icon: CheckCircle2 },
  ];

  const arganSpecsRight = [
    { label: "صابون الأركان (Savon)", val: "تنظيف طبيعي غني بالزيوت المغذية", icon: CheckCircle2 },
    { label: "كيسين ليف استحمام", val: "وردي وأزرق لتقشير ممتع ولطيف", icon: Sparkles },
    { label: "حقيبة تجميل عصرية", val: "حقيبة شفافة أنيقة من AfricaShop", icon: Heart },
    { label: "أركان مغربي 100%", val: "مكونات مغربية أصيلة وآمنة للبشرة", icon: Droplets },
  ];

  return (
    <section className="py-24 bg-void relative overflow-hidden" id="specs">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,93,136,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-block bg-gold/10 text-gold border border-gold/25 rounded-full px-4 py-1 text-xs font-bold tracking-wider uppercase mb-4">
            محتويات وتفاصيل المجموعة
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-light leading-tight text-gold-shine">
            تركيبة الأناقة المغربية الأصيلة
          </h2>
          <p className="text-muted mt-4 text-lg">7 قطع متكاملة مصممة خصيصاً لمنحك العناية الفائقة والدلال اليومي</p>
        </div>

        {/* Desktop: 3 Columns. Mobile: Stacked */}
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          
          {/* Left Column */}
          <div className="order-2 lg:order-1 flex flex-col gap-6">
            <h3 className="text-2xl font-black text-gold border-b border-border/50 pb-3 text-right">
              {hasDynamicFeatures ? "المواصفات الأساسية" : "مستحضرات الوجه والجسم"}
            </h3>
            {(hasDynamicFeatures ? features.slice(0, Math.ceil(features.length / 2)) : arganSpecsLeft).map((s: any, i: number) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                key={i} 
                className="flex items-center justify-end gap-4 p-4 bg-surface-2/50 backdrop-blur-sm border border-border rounded-2xl hover:border-gold/50 transition-colors"
              >
                <div className="text-right">
                  <div className="text-muted text-xs font-bold">{s.label}</div>
                  <div className="text-light text-lg font-black">{s.val}</div>
                </div>
                <div className="w-12 h-12 shrink-0 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  {s.icon ? <s.icon className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center: Massive Model Portrait Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative w-full aspect-square lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(232,93,136,0.25)] border border-gold/20"
          >
            <Image 
              src={product?.images?.[0] || "/images/products/model_portrait_bag.jpg"} 
              alt="AfricaShop Moroccan Argan Beauty Pack Model"
              fill
              className="object-cover hover:scale-105 transition-transform duration-[2s]"
            />
            {/* Inner shadow for blending */}
            <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(10,10,10,0.3)] pointer-events-none" />
          </motion.div>

          {/* Right Column */}
          <div className="order-3 lg:order-3 flex flex-col gap-6">
            <h3 className="text-2xl font-black text-gold border-b border-border/50 pb-3 text-left">
              {hasDynamicFeatures ? "مواصفات إضافية" : "ملحقات ومزايا الباك"}
            </h3>
            {(hasDynamicFeatures ? features.slice(Math.ceil(features.length / 2)) : arganSpecsRight).map((s: any, i: number) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                key={i} 
                className="flex items-center justify-start gap-4 p-4 bg-surface-2/50 backdrop-blur-sm border border-border rounded-2xl hover:border-gold/50 transition-colors"
              >
                <div className="w-12 h-12 shrink-0 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  {s.icon ? <s.icon className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                </div>
                <div className="text-left">
                  <div className="text-muted text-xs font-bold">{s.label}</div>
                  <div className="text-light text-lg font-black">{s.val}</div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
