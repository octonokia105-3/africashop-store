"use client";

import { motion } from "framer-motion";
import { MapPin, BadgeCheck } from "lucide-react";

const reviews = [
  {
    initial: "ف",
    name: "فاطمة الزهراء",
    city: "الدار البيضاء",
    text: "صراحة الباك رائع جداً! كريم الوجه والمقشر خلاو ليا بشرتي ناعمة ورطبة بزاف من أول استخدام. الحقيبة الشفافة تاهيا أنيقة بزاف وخديتها معايا في السفر. شكراً AfricaShop."
  },
  {
    initial: "م",
    name: "مريم بنجلون",
    city: "الرباط",
    text: "أحسن مجموعة عناية شريتها هاد العام! ريحة الأركان غزالة وطبيعية. حليب الجسم والماسك داروليا الفرق للبشرة ديالي. التوصيل مجاني ووصلني في 24 ساعة."
  },
  {
    initial: "ن",
    name: "نادية بنعلي",
    city: "مراكش",
    text: "وصلني الطلب كهدية وغزالت بزاف! الـ 7 قطـع كاملين جودتهم ممتازة وخدمت بيهم روتين السبا في الدار. الخدمة احترافية والدفع عند الاستلام مريح جداً."
  }
];

export default function TestimonialsGrid() {
  return (
    <section className="py-24 relative z-10 bg-surface-2/50" id="reviews">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-block bg-gold/10 text-gold border border-gold/25 rounded-full px-4 py-1 text-xs font-bold tracking-wider uppercase mb-4">
            آراء العملاء
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-light leading-tight mb-4">
            ماذا تقول عميلاتنا؟
          </h2>
          <p className="text-muted text-lg">أكثر من 5,000 إمرأة سعيدة في جميع أنحاء المغرب</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-surface border border-border rounded-3xl p-8 hover:border-gold/30 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(232,93,136,0.15)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-4 left-6 text-7xl text-gold/10 font-serif leading-none select-none">"</div>
              
              <div className="flex gap-1 text-gold mb-6 relative z-10">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              
              <p className="text-muted text-sm leading-[1.8] min-h-[100px] relative z-10">
                "{rev.text}"
              </p>
              
              <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold to-[#d4426f] text-white font-black text-lg flex items-center justify-center shadow-md shrink-0">
                    {rev.initial}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-light">{rev.name}</span>
                    <span className="text-[10px] text-muted flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gold" /> {rev.city}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-[10px] font-bold text-success bg-success/10 px-2 py-1 rounded-full">
                  <BadgeCheck className="w-3 h-3" /> مشتري موثق
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
