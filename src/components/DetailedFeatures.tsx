"use client";

import { Sparkles, Heart, Droplets, ShieldCheck, Gift, Star } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/app/actions/products";

export default function DetailedFeatures({ product }: { product?: Product }) {
  const mainTitle = product ? product.title : "روتين السبا والجمال المتكامل بالأركان الأصيل";
  const mainImage = product && product.images.length > 0 ? product.images[0] : "/images/products/model_vanity_masque.jpg";
  const description = product ? product.description : "مجموعة الجمال الاستثنائية التي تجمع 7 قطـع أساسية لتغذية، ترطيب، وتصفية البشرة والجسم. احصلي على إشراقة السبا في منزلـك بلمسات الأركان المغربي الطبيعي 100%.";

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <div className="inline-block bg-gold/10 text-gold border border-gold/25 rounded-full px-4 py-1 text-xs font-bold tracking-wider uppercase mb-4">
          فوائد الباك الملكي
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-light leading-tight mb-4">
          جمال ونعومة الدلال المغربي<br />بين يديك اليوم
        </h2>
        <p className="text-muted max-w-xl mx-auto">
          مجموعة متكاملة للعناية بالبشرة والجسم بالأركان الخالص — ترطيب عميق، تقشير لطيف، وحقيبة أنيقة
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Feature 1: Main Spotlight */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          className="md:col-span-2 bg-gradient-to-br from-gold/10 to-surface border border-gold/25 rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 hover:border-gold/40 transition-colors group"
        >
          <div className="flex-1 space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-black text-light text-gold-shine">{mainTitle}</h3>
            <p className="text-muted leading-relaxed text-lg whitespace-pre-wrap">
              {description}
            </p>
            <div className="flex items-baseline gap-2 pt-4">
              <span className="text-4xl font-black text-gold">100%</span>
              <span className="text-sm font-bold text-muted">طبيعي وأصيل</span>
            </div>
          </div>
          <div className="flex-1 w-full relative h-[400px]">
            <Image 
              src={mainImage} 
              alt={mainTitle}
              fill
              className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 shadow-xl"
            />
          </div>
        </motion.div>

        {/* Feature 2: Studio Pack Focus */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          className="md:col-span-2 bg-gradient-to-br from-surface to-gold/5 border border-border rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row-reverse items-center gap-10 hover:border-gold/30 transition-all shadow-xl group"
        >
          <div className="flex-1 space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-black text-light text-gold-shine">تركيبة الأركان الفاخرة لتغذية البشرة</h3>
            <p className="text-muted leading-relaxed text-lg">
              يعمل حليب الجسم والمقشر الطبيعي وماسك الوجه معاً على تنقية المسام وإزالة الخلايا الميتة، مما يمنح بشرتك ملمساً مخملياً وإشراقة طبيعية تدوم طوال اليوم.
            </p>
            <div className="flex items-baseline gap-2 pt-4">
              <span className="text-4xl font-black text-gold">7 في 1</span>
              <span className="text-sm font-bold text-muted uppercase">روتين كامل</span>
            </div>
          </div>
          <div className="flex-1 w-full relative h-[400px]">
            <Image 
              src="/images/products/model_applying_lotion.jpg" 
              alt="Argan Pack Model Routine"
              fill
              className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 shadow-xl"
            />
          </div>
        </motion.div>

        {/* Feature 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          className="bg-surface border border-border rounded-[32px] p-8 hover:border-gold/30 hover:-translate-y-1 transition-all shadow-xl"
        >
          <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-6">
            <Droplets className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-light mb-3">ترطيب عميق وحماية</h3>
          <p className="text-muted text-sm leading-relaxed mb-6">
            كريم الوجه وصابون الأركان يمنحان بشرتك الترطيب اليومي اللازم للحماية من الجفاف والعوامل الخارجية.
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-gold">24H</span>
            <span className="text-xs font-bold text-muted">ترطيب مستمر</span>
          </div>
        </motion.div>

        {/* Feature 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          className="bg-surface border border-border rounded-[32px] p-8 hover:border-gold/30 hover:-translate-y-1 transition-all shadow-xl"
        >
          <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-6">
            <Gift className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-light mb-3">حقيبة أنيقة للرحلات واليوميات</h3>
          <p className="text-muted text-sm leading-relaxed mb-6">
            تأتي المنتجات في حقيبة تجميل شفافة وعصرية من AfricaShop لتسهيل تنظيم وحمل مستحضراتك أينما ذهبتِ.
          </p>
        </motion.div>

        {/* Feature 5 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          className="bg-surface border border-border rounded-[32px] p-8 hover:border-gold/30 hover:-translate-y-1 transition-all shadow-xl"
        >
          <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-6">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-light mb-3">توصيل مجاني وضمان 100%</h3>
          <p className="text-muted text-sm leading-relaxed mb-6">
            نوصل طلبك مجاناً إلى باب منزلك في جميع مدن المغرب مع إمكانية معاينة الطلب والدفع عند الاستلام.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
