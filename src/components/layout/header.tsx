"use client";

import { useState, useRef } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { DirectionalArrow } from "@/components/icons/directional-arrow";
import { TrackedCta } from "@/components/marketing/tracked-cta";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useAudience, useDictionary, useLocale } from "@/i18n/locale-provider";
import { localizedPath } from "@/i18n/config";

export function Header() {
  const dict = useDictionary();
  const locale = useLocale();
  const audience = useAudience();
  const home = localizedPath(locale, audience);

  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else if (latest < previous) {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  const links = [
    { href: "#concept", label: dict.nav.concept },
    { href: "#visualization", label: dict.nav.truck },
    { href: "#cases", label: dict.nav.cases },
    { href: "#process", label: dict.nav.process },
    { href: "#services", label: dict.nav.services },
    { href: "#contact", label: dict.nav.contact },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={hidden ? { y: -150, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ 
        y: { duration: 0.35, ease: "easeInOut" },
        opacity: { duration: 0.4, ease: "easeOut", delay: 0.1 }
      }}
      className="fixed inset-x-0 top-6 z-50 px-4 md:px-8"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-full border border-white/15 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.25),0_0_40px_-20px_rgba(80,160,230,0.4)] ring-1 ring-black/5 transition-all"
        style={{
          background:
            "linear-gradient(135deg, rgba(12, 16, 28, 0.78) 0%, rgba(8, 12, 22, 0.7) 100%)",
          backdropFilter: "blur(24px) saturate(1.8)",
          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
        }}
      >
        <Link href={home} className="flex shrink-0 items-center gap-2 ps-2">
          <Image
            src="/logo.png"
            alt="HotSpot"
            width={120}
            height={36}
            priority
            loading="eager"
            fetchPriority="high"
            sizes="120px"
            className="h-7 w-auto md:h-8"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher />
          <TrackedCta
            href="#contact"
            ctaLocation="header"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent-gradient px-3.5 py-2 text-[11px] font-semibold whitespace-nowrap text-white shadow-lg shadow-accent/20 ring-1 ring-white/10 transition hover:opacity-90 sm:px-5 sm:py-2.5 sm:text-xs"
          >
            {dict.nav.cta}
            <DirectionalArrow className="h-3.5 w-3.5 shrink-0" />
          </TrackedCta>
        </div>
      </div>
    </motion.header>
  );
}
