"use client";

import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@/components/icons";

export function Header() {
  const links = [
    { href: "#concept", label: "Concept" },
    { href: "#visualization", label: "The Truck" },
    { href: "#cases", label: "Case Studies" },
    { href: "#process", label: "Process" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="fixed inset-x-0 top-6 z-50 px-4 md:px-8">
      <div
        className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/15 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.25),0_0_40px_-20px_rgba(80,160,230,0.4)] ring-1 ring-black/5 transition-all"
        style={{
          background:
            "linear-gradient(135deg, rgba(12, 16, 28, 0.78) 0%, rgba(8, 12, 22, 0.7) 100%)",
          backdropFilter: "blur(24px) saturate(1.8)",
          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
        }}
      >
        <Link href="/" className="flex items-center gap-2 pl-2">
          <Image
            src="/logo.png"
            alt="HotSpot"
            width={120}
            height={36}
            priority
            fetchPriority="high"
            className="h-7 w-auto md:h-8"
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
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 rounded-full bg-accent-gradient px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-accent/20 ring-1 ring-white/10 transition hover:opacity-90"
        >
          Book Experience
          <IconArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}
