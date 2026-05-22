"use client";

import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@/components/icons";

export function Footer() {
  return (
    <footer className="bg-[#fafafa] px-4 pb-6 pt-12 md:px-8">
      <div
        className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 px-8 py-16 shadow-[0_16px_40px_rgba(0,0,0,0.3),0_0_40px_-10px_rgba(42,118,166,0.3)] ring-1 ring-black/5 md:px-16 md:py-20"
        style={{
          background:
            "linear-gradient(135deg, rgba(12, 16, 28, 0.96) 0%, rgba(8, 12, 22, 0.98) 100%)",
          backdropFilter: "blur(24px) saturate(1.8)",
          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
        }}
      >
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-start">
          
          <div className="max-w-sm">
            <Link href="/" className="inline-block">
              <Image src="/logo.png" alt="HotSpot" width={140} height={42} className="h-10 w-auto brightness-0 invert" />
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-zinc-400">
              The strongest marketing tool in the Saudi market. Cybertruck activations, LED experiences, and full event production from concept to deployment.
            </p>
            <a href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/5 py-2.5 pl-5 pr-4 text-sm font-semibold text-white ring-1 ring-white/10 transition-all hover:bg-white/10 hover:ring-white/20">
              Book your activation
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white">
                <IconArrowRight className="h-3 w-3" />
              </span>
            </a>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 md:gap-24">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Navigation</p>
              <ul className="mt-6 space-y-4 text-sm font-medium text-zinc-400">
                <li><a href="#concept" className="transition-colors hover:text-white">Concept</a></li>
                <li><a href="#visualization" className="transition-colors hover:text-white">The Truck</a></li>
                <li><a href="#cases" className="transition-colors hover:text-white">Case Studies</a></li>
                <li><a href="#services" className="transition-colors hover:text-white">Services</a></li>
              </ul>
            </div>
            
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Contact</p>
              <ul className="mt-6 space-y-4 text-sm font-medium text-zinc-400">
                <li>
                  <a href="mailto:inquiry@hotsspots.com" className="transition-colors hover:text-white">inquiry@hotsspots.com</a>
                </li>
                <li>
                  <a href="tel:+966543938548" className="transition-colors hover:text-white">+966 54 393 8548</a>
                </li>
                <li>Riyadh, Saudi Arabia</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-xs font-medium text-zinc-500 md:flex-row">
          <p>&copy; {new Date().getFullYear()} HotSpot. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="transition-colors hover:text-white">Instagram</a>
            <a href="#" className="transition-colors hover:text-white">LinkedIn</a>
            <a href="#" className="transition-colors hover:text-white">X / Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}