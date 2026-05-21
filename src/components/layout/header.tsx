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
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="glass-strong mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 py-2 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
        <Link href="/" className="flex items-center gap-2 pl-3">
          <Image src="/logo.png" alt="HotSpot" width={120} height={36} className="h-8 w-auto" />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="rounded-full px-4 py-1.5 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="inline-flex items-center gap-1.5 rounded-full bg-accent-gradient px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90">
          Book Experience
          <IconArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}