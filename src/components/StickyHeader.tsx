"use client";

import { Phone, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function StickyHeader() {
  return (
    <header className="sticky top-0 z-[100] bg-white border-b border-rose-100 py-3 shadow-sm transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-6 flex items-center justify-between gap-4">
        
        {/* CTA Section (Left on RTL) */}
        <div className="flex items-center gap-4">
          <a 
            href="#checkout-top"
            className="bg-[#e85d88] hover:bg-[#d4426f] text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-[0_4px_14px_rgba(232,93,136,0.35)] hover:scale-105 transition-all whitespace-nowrap flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            اطلب الآن
          </a>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-700 font-bold">
            <Phone className="w-4 h-4 text-[#e85d88]" />
            <span dir="ltr">+212 600-000000</span>
          </div>
        </div>

        {/* Logo Section (Right on RTL) */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight text-[#e85d88]">
            Africa<span className="text-[#e85d88]">Shop</span>
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#e85d88] flex items-center justify-center font-black text-white text-base shadow-sm">
            A
          </div>
        </div>

      </div>
    </header>
  );
}
