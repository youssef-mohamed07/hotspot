"use client";

import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-zinc-200">
              <Image src="/logo.png" alt="HotSpot" width={120} height={36} className="h-8 w-auto" />
            </div>
            <p className="mt-4 max-w-sm text-sm text-zinc-500">
              The strongest marketing tool in the Saudi market. Cybertruck activations, LED experiences and full event production.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Links</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-500">
              <li><a href="#concept" className="transition hover:text-white">Concept</a></li>
              <li><a href="#visualization" className="transition hover:text-white">The Truck</a></li>
              <li><a href="#cases" className="transition hover:text-white">Case Studies</a></li>
              <li><a href="#services" className="transition hover:text-white">Services</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-500">
              <li><a href="mailto:inquiry@hotsspots.com" className="transition hover:text-white">inquiry@hotsspots.com</a></li>
              <li><a href="tel:+966543938548" className="transition hover:text-white">+966 54 393 8548</a></li>
              <li><span>Riyadh, Saudi Arabia</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-zinc-600 md:flex-row">
          <p>&copy; {new Date().getFullYear()} HotSpot. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-white">Instagram</a>
            <a href="#" className="transition hover:text-white">LinkedIn</a>
            <a href="#" className="transition hover:text-white">X / Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}