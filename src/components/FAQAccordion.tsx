"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "كيف يتم الدفع عند الاستلام؟",
    a: "عند وصول باقة الأركان إلى باب منزلك، تسلمين المبلغ لمندوب التوصيل نقداً بعد معاينة طلبك وتفقده بنفسك. لا حاجة لأي دفع مسبق عبر البنك."
  },
  {
    q: "متى سيصلني الطلب؟",
    a: "نقوم بتوصيل طلبك خلال 24 إلى 48 ساعة كحد أقصى لجميع المدن والقرى المغربية مع التوصيل المجاني بالكامل."
  },
  {
    q: "هل المنتجات أصلية وطبيعية 100%؟",
    a: "نعم، جميع مستحضرات الباك مصنعة من زيوت الأركان المغربي الطبيعي الأصيل 100% وخالية من المواد الكيميائية الضارة ومناسبة لجميع أنواع البشرة."
  },
  {
    q: "مما تتكون مجموعة الجمال؟",
    a: "تحتوي المجموعة على 7 قطع: حليب الجسم المرطب، مقشر الوجه والجسم، ماسك الوجه النضر، كريم الوجه، صابون الأركان، كيسين ليف استحمام، وحقيبة تجميل عصرية من AfricaShop."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-surface-2 relative z-10" id="faq">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-block bg-gold/10 text-gold border border-gold/25 rounded-full px-4 py-1 text-xs font-bold tracking-wider uppercase mb-4">
            الأسئلة الشائعة
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-light leading-tight mb-4 flex items-center justify-center gap-4">
            <HelpCircle className="w-10 h-10 text-gold" />
            كل ما تريد معرفته
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={`bg-surface border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-gold/40' : 'border-border hover:border-gold/20'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-right outline-none"
                >
                  <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-gold' : 'text-light'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold' : 'text-muted'}`} />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-muted leading-relaxed border-t border-border mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
