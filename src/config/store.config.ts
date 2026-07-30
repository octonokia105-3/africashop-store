// AGENCY MASTER STORE CONFIGURATION TEMPLATE
// Change the theme color palette in 1 click!

export const THEME_PALETTES = {
  // 🌸 1. Rose Pink & White (Female Cosmetics & Skincare)
  roseBeauty: {
    primary: "#e85d88",
    primaryHover: "#d4426f",
    background: "#fff7f9",
    surface: "#ffffff",
    textLight: "#2c161e",
    border: "rgba(225, 100, 145, 0.15)"
  },

  // 🌿 2. Emerald Green & Natural (Argan Oil & Organic Products)
  emeraldOrganic: {
    primary: "#059669",
    primaryHover: "#047857",
    background: "#f0fdf4",
    surface: "#ffffff",
    textLight: "#064e3b",
    border: "rgba(5, 150, 105, 0.15)"
  },

  // 👑 3. Royal Gold & Obsidian Dark (Luxury Perfumes & Watches)
  royalLuxury: {
    primary: "#eab308",
    primaryHover: "#ca8a04",
    background: "#09090b",
    surface: "#18181b",
    textLight: "#fef08a",
    border: "rgba(234, 179, 8, 0.2)"
  },

  // ⚡ 4. Ocean Cyan & Tech Silver (Electronics & Gadgets)
  cyanTech: {
    primary: "#06b6d4",
    primaryHover: "#0891b2",
    background: "#f0fdfa",
    surface: "#ffffff",
    textLight: "#164e63",
    border: "rgba(6, 182, 212, 0.15)"
  },

  // 💜 5. Deep Violet & Pearl (Fashion & Jewelry)
  violetFashion: {
    primary: "#8b5cf6",
    primaryHover: "#7c3aed",
    background: "#f5f3ff",
    surface: "#ffffff",
    textLight: "#4c1d95",
    border: "rgba(139, 92, 246, 0.15)"
  }
}

// Active Configuration for the current store build
export const STORE_CONFIG = {
  storeName: "AfricaShop",
  storeTagline: "المتجر الإفريقي الأول لمنتجات التجميل والعناية الطبيعية",
  currency: "MAD",
  whatsappNumber: "+212600000000",
  
  // 🎨 CHOOSE ANY THEME ABOVE FOR YOUR CLIENT!
  // Options: THEME_PALETTES.roseBeauty | THEME_PALETTES.emeraldOrganic | THEME_PALETTES.royalLuxury | THEME_PALETTES.cyanTech | THEME_PALETTES.violetFashion
  activeTheme: THEME_PALETTES.roseBeauty,

  pricing: {
    singlePackPrice: 220,
    doublePackPrice: 399,
    triplePackPrice: 549,
    orderBumpPrice: 49,
    orderBumpTitle: "زيت الأركان الخالص 100ml (+49 درهم)"
  }
}
