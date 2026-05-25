"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const translations = {
  en: {
    b2b: { title: "Corporates", desc: "Discover enterprise-scale activations, fleet deployments, and comprehensive brand dominance." },
    b2c: { title: "Individual", desc: "Book a premium moving experience for private events, luxury parties, and personal celebrations." },
    langToggle: "العربية",
    nextLang: "ar" as const
  },
  ar: {
    b2b: { title: "شركات", desc: "اكتشف التفعيلات على مستوى الشركات، ونشر الأساطيل، والسيطرة الشاملة لعلامتك التجارية." },
    b2c: { title: "أفراد", desc: "احجز تجربة متحركة فاخرة للفعاليات الخاصة، الحفلات الفخمة، والاحتفالات الشخصية." },
    langToggle: "English",
    nextLang: "en" as const
  }
};

type Lang = "en" | "ar";

export default function LocaleSelectorPage({ params }: { params: Promise<{ locale: string }> }) {
  const router = useRouter();
  const { locale } = use(params);
  const lang = (locale === "ar" ? "ar" : "en") as Lang;
  const [selected, setSelected] = useState<"b2b" | "b2c" | null>(null);

  const handleSelect = (audience: "b2b" | "b2c") => {
    setSelected(audience);
    setTimeout(() => {
      router.push(`/${lang}/${audience}`);
    }, 800);
  };

  const switchLanguage = () => {
    router.push(`/${translations[lang].nextLang}`);
  };

  const t = translations[lang];
  const isRtl = lang === "ar";

  return (
    <AnimatePresence>
      {!selected && (
        <motion.div 
          key="split-screen"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex flex-col md:flex-row overflow-hidden"
          dir={isRtl ? "rtl" : "ltr"}
        >
          {/* Language Toggle */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            onClick={switchLanguage}
            className="absolute top-6 end-6 z-30 rounded-full border border-zinc-900/10 bg-white/95 px-4 py-2 text-xs font-medium text-zinc-900 shadow-lg backdrop-blur-md transition hover:bg-white hover:shadow-xl md:top-8"
          >
            {t.langToggle}
          </motion.button>

          {/* Central Logo */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="rounded-full bg-white/10 p-4 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.3)] ring-1 ring-white/20"
              dir="ltr"
            >
              <Image
                src="/logo.png"
                alt="HotSpot"
                width={140}
                height={40}
                priority
                loading="eager"
                fetchPriority="high"
                sizes="140px"
                className="h-8 w-auto md:h-10"
                style={{ width: "auto", height: "auto" }}
              />
            </motion.div>
          </div>

          {/* Corporates (B2B) Pane - Dark Theme */}
          <motion.div
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group relative flex flex-1 cursor-pointer flex-col items-center justify-center bg-[#05060a] p-8 text-center transition-colors"
            onClick={() => handleSelect("b2b")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-deep/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            <div className="relative z-10 flex flex-col items-center transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-lg backdrop-blur-sm transition-all group-hover:bg-accent/20 group-hover:ring-accent/40 group-hover:shadow-accent/20">
                <svg className="h-8 w-8 text-zinc-300 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
                </svg>
              </div>
              <h2 className="display-headline text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">{t.b2b.title}</h2>
              <p className="mt-4 max-w-xs text-sm text-zinc-400 md:text-base leading-relaxed">
                {t.b2b.desc}
              </p>
            </div>
          </motion.div>

          {/* Individual (B2C) Pane - Light Theme */}
          <motion.div
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group relative flex flex-1 cursor-pointer flex-col items-center justify-center bg-[#faf8f5] p-8 text-center transition-colors"
            onClick={() => handleSelect("b2c")}
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            <div className="relative z-10 flex flex-col items-center transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-900/5 ring-1 ring-zinc-900/10 shadow-sm backdrop-blur-sm transition-all group-hover:bg-accent/10 group-hover:ring-accent/30 group-hover:shadow-accent/10">
                <svg className="h-8 w-8 text-zinc-600 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h2 className="display-headline text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl lg:text-5xl">{t.b2c.title}</h2>
              <p className="mt-4 max-w-xs text-sm text-zinc-500 md:text-base leading-relaxed">
                {t.b2c.desc}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
