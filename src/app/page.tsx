"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { KSA_REGIONS, KSA_VIEWBOX } from "@/lib/ksa-map";
import {
  IconArrowRight,
  IconBolt,
  IconBuilding,
  IconCube,
  IconGlobe,
  IconMail,
  IconMapPin,
  IconPhone,
  IconScreen,
  IconShield,
  IconSpotlight,
  IconStar,
  IconUsers,
  IconWhatsApp,
} from "@/components/icons";

// 3D model is browser-only
const CybertruckScene = dynamic(
  () => import("@/components/cybertruck-scene").then((m) => m.CybertruckScene),
  { ssr: false, loading: () => <SceneLoader /> }
);

function SceneLoader() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="flex flex-col items-center gap-3 text-zinc-500">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
        <p className="text-[10px] uppercase tracking-[0.3em]">Loading 3D model</p>
      </div>
    </div>
  );
}

/* ─── Data ─── */
const trustedClients = [
  { name: "Mobily",              sector: "Telecom",        since: "2022", logo: "/logos/mobily.svg" },
  { name: "STC",                 sector: "Telecom",        since: "2023", logo: "/logos/stc.svg" },
  { name: "NEOM",                sector: "Real Estate",    since: "2023", logo: "/logos/neom.svg" },
  { name: "Aramco",              sector: "Energy",         since: "2024", logo: "/logos/aramco.svg" },
  { name: "SABIC",               sector: "Industrial",     since: "2024", logo: "/logos/sabic.svg" },
  { name: "Riyadh Season",       sector: "Entertainment",  since: "2023", logo: "/logos/riyadh-season.svg" },
  { name: "MDL Beast",           sector: "Music & Events", since: "2023" },
  { name: "Hikma",               sector: "Healthcare",     since: "2024", logo: "/logos/hikma.svg" },
  { name: "Red Sea Film",        sector: "Culture",        since: "2024" },
  { name: "Ministry of Culture", sector: "Government",     since: "2024" },
];

const conceptPillars = [
  {
    title: "Location-Based",
    subtitle: "Built around your audience",
    description: "We position the Cybertruck where your audience already lives — malls, events, neighborhoods, business districts. The location is part of the message.",
    Icon: IconMapPin,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    bullets: [
      "Foot-traffic mapping in advance",
      "Permits, parking & power handled",
      "Indoor mall + open street ready",
    ],
    metric: { value: "98%", label: "On-target placement" },
  },
  {
    title: "Branding Bta3ak",
    subtitle: "Designed around your brand",
    description: "Full vehicle wraps, custom LED content, interactive overlays, and modular accessories. The truck becomes a 100% extension of your brand identity.",
    Icon: IconCube,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=80",
    bullets: [
      "Full-body custom vehicle wrap",
      "Branded LED content & motion graphics",
      "Modular props, lighting & accessories",
    ],
    metric: { value: "100%", label: "Brand control" },
  },
];

const transitionStats = [
  { value: 10, suffix: "M+", label: "Impressions" },
  { value: 500, suffix: "+", label: "Activations" },
  { value: 50, suffix: "K+", label: "Visitors" },
  { value: 95, suffix: "%", label: "Engagement" },
];

const caseStudies = [
  { title: "Mobily Ramadan Campaign", category: "National Telecom", year: "2024", impressions: "2.4M", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" },
  { title: "Riyadh Season Mall Tour", category: "Entertainment", year: "2024", impressions: "1.8M", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
  { title: "NEOM Brand Activation", category: "Real Estate", year: "2023", impressions: "3.1M", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80" },
  { title: "Hikma VIP Launch", category: "Luxury", year: "2024", impressions: "950K", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" },
];

const otherServices = [
  { title: "LED Screens & Walls", description: "Modular LED panels for any size or shape — pair with the truck for full-coverage activations.", Icon: IconScreen },
  { title: "Stage Production", description: "Full event staging, lighting, sound and AV crews to extend the activation into a complete production.", Icon: IconSpotlight },
  { title: "Interactive Tech", description: "Custom apps, AI photo booths, social walls and live audience engagement layers.", Icon: IconBolt },
  { title: "Brand Activations", description: "End-to-end campaign design, content production and on-site execution across the Kingdom.", Icon: IconStar },
];

const testimonials = [
  {
    quote: "The Cybertruck activation generated more social impressions in one weekend than our entire Q3 digital campaign.",
    author: "Sara Al-Dosari",
    role: "Marketing Director",
    company: "IA Group",
    initials: "SA",
    rating: 5,
    metric: { value: "3.2M", label: "Social impressions" },
    accent: "from-[#2a76a6] to-[#04285f]",
  },
  {
    quote: "From brief to delivery, HotSpot ran the entire production. Zero coordination headaches on our side.",
    author: "Mohammed Al-Rashid",
    role: "VP Events",
    company: "Hikma Group",
    initials: "MA",
    rating: 5,
    metric: { value: "0", label: "Vendor escalations" },
    accent: "from-[#5ba3d4] to-[#2a76a6]",
  },
  {
    quote: "Crowds gathered before the truck even parked. The visual presence is on another level.",
    author: "Khalid Mansour",
    role: "Head of Production",
    company: "Mobily",
    initials: "KM",
    rating: 5,
    metric: { value: "12K", label: "Visitors / day" },
    accent: "from-[#1d5a82] to-[#04285f]",
  },
];

// City positions on the 1000×824 viewBox of the real Simplemaps KSA SVG (src/sa.svg → src/lib/ksa-map.ts)
const cities = [
  { name: "Riyadh", region: "Central",    x: 530, y: 476, hub: true },
  { name: "Jeddah", region: "Western",    x: 310, y: 540, hub: true },
  { name: "Mecca",  region: "Western",    x: 351, y: 555 },
  { name: "Medina", region: "Western",    x: 245, y: 405 },
  { name: "AlUla",  region: "Western",    x: 215, y: 320 },
  { name: "NEOM",   region: "North-West", x: 130, y: 180 },
  { name: "Dammam", region: "Eastern",    x: 735, y: 425, hub: true },
  { name: "Khobar", region: "Eastern",    x: 750, y: 440 },
];

const faqCategories = ["All", "Customization", "Operations", "Technology", "Logistics"] as const;
type FaqCategory = typeof faqCategories[number];

const faqs: { q: string; a: string; category: FaqCategory }[] = [
  {
    q: "Can the Cybertruck be customized?",
    a: "Yes — full vehicle wraps, rooftop decorations, LED cube screens, flowers, balloons, and modular setups. Every activation is designed around your brand identity, with creative direction signed off before production.",
    category: "Customization",
  },
  {
    q: "Is it suitable for indoor events?",
    a: "Absolutely. The Cybertruck fits through standard loading docks (height 1.91m, width 2.20m) and is engineered for both indoor malls and outdoor festivals. We coordinate venue clearances ahead of time.",
    category: "Logistics",
  },
  {
    q: "Do you provide operators & setup?",
    a: "Every activation includes a full technical crew — from delivery, setup, and rehearsal through live operation and strike. You don't need to coordinate with multiple vendors.",
    category: "Operations",
  },
  {
    q: "Can we integrate our campaign digitally?",
    a: "Yes. We support live social media feeds, custom mobile apps, QR activations, AI photo booths, real-time audience engagement tools, and CRM integrations for lead capture.",
    category: "Technology",
  },
  {
    q: "Is it available across Saudi Arabia?",
    a: "We operate nationwide — Riyadh, Jeddah, Dammam, AlUla, NEOM, and everywhere in between. Multi-city tours are common; we route the truck and crew between activations.",
    category: "Logistics",
  },
  {
    q: "How far in advance should we book?",
    a: "For full-scale activations: 3–4 weeks ideal, 1 week minimum. We've delivered emergency campaigns in 72 hours when timelines allowed. The earlier we get involved, the more we can design for your brand.",
    category: "Operations",
  },
  {
    q: "What's included in the activation cost?",
    a: "Vehicle rental, custom branding production, on-board hardware, full technical crew, content production, and a wrap report with footage and KPIs. Permits and venue fees are quoted separately based on the location.",
    category: "Operations",
  },
  {
    q: "Can the LED screens display live content?",
    a: "Yes. Our screens accept live HDMI/SDI feeds, CMS-controlled playlists, social media walls, and remote live updates. Content can be swapped on-the-fly during the activation.",
    category: "Technology",
  },
];

/* ─── Page ─── */
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <StrongestToolSection />
        <ProofOfConceptSection />
        <ConceptSection />
        <TransitionStatsSection />
        <VisualizationSection />
        <CaseStudiesSection />
        <ProcessSection />
        <OtherServicesSection />
        <TestimonialsSection />
        <ServingCitiesSection />
        <FormSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

/* ─── Header ─── */
function Header() {
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

/* ─── 2. The Strongest Marketing Tool in the Saudi Market ─── */
function StrongestToolSection() {
  return (
    <section className="relative overflow-hidden py-32">
      {/* Cinematic crowd backdrop */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060a] via-[#05060a]/85 to-[#05060a]" aria-hidden />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 100%, rgba(42,118,166,0.22), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-25" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <Reveal className="mb-16 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs uppercase tracking-[0.3em] text-accent">The strongest marketing tool</p>
          </div>
          <h2 className="display-headline mt-6 text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
            The most powerful<br />
            marketing tool in the<br />
            <span className="text-gradient-accent">Saudi market.</span>
          </h2>
        </Reveal>

        {/* Headline comparison strip */}
        <Reveal delay={0.1}>
          <div className="mb-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] sm:grid-cols-2">
            <div className="relative p-8 md:p-10">
              <div className="absolute inset-0 bg-zinc-900/40" aria-hidden />
              <div className="relative">
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Traditional ads</p>
                <p className="mt-4 display-headline text-5xl text-zinc-700 line-through decoration-zinc-700/60 sm:text-6xl">
                  IGNORED
                </p>
                <p className="mt-4 text-sm text-zinc-500">
                  Average banner CTR: <span className="text-zinc-300">0.05%</span>
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-zinc-600">
                  <li className="flex items-center gap-2"><span className="text-red-500/80">✕</span> Ad-blocked, scrolled past</li>
                  <li className="flex items-center gap-2"><span className="text-red-500/80">✕</span> Saturated, forgettable</li>
                  <li className="flex items-center gap-2"><span className="text-red-500/80">✕</span> Static and time-bound</li>
                </ul>
              </div>
            </div>
            <div className="relative p-8 md:p-10">
              <div
                className="absolute inset-0 opacity-80"
                style={{
                  background:
                    "radial-gradient(70% 80% at 80% 30%, rgba(42,118,166,0.18), transparent 70%), linear-gradient(135deg, rgba(42,118,166,0.08), rgba(4,40,95,0.04))",
                }}
                aria-hidden
              />
              <div className="relative">
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent">HotSpot Cybertruck</p>
                <p className="mt-4 display-headline text-5xl text-gradient-accent sm:text-6xl">
                  REMEMBERED
                </p>
                <p className="mt-4 text-sm text-zinc-300">
                  Average dwell time per activation: <span className="font-semibold text-white">4–9 min</span>
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2"><span className="text-accent">✓</span> Crowds gather, film, and share</li>
                  <li className="flex items-center gap-2"><span className="text-accent">✓</span> Scarcity-driven attention</li>
                  <li className="flex items-center gap-2"><span className="text-accent">✓</span> Mobile, location-aware, programmable</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Big visual grid: gauge + ticker + outcomes */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Engagement gauge */}
          <Reveal delay={0.2}>
            <div className="spotlight-card glass-card relative h-full overflow-hidden rounded-3xl p-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">/Gauge · 01</p>
              <p className="mt-2 text-sm text-zinc-300">Engagement vs. traditional</p>
              <EngagementGauge value={94} />
              <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-zinc-500">
                <span>Banner ad</span>
                <span>HotSpot truck</span>
              </div>
            </div>
          </Reveal>

          {/* Live impressions ticker */}
          <Reveal delay={0.28}>
            <div className="spotlight-card glass-card relative h-full overflow-hidden rounded-3xl p-8">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(70% 70% at 50% 100%, rgba(42,118,166,0.4), transparent 70%)",
                }}
                aria-hidden
              />
              <div className="relative">
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">/Live · 02</p>
                <p className="mt-2 text-sm text-zinc-300">Avg. impressions per activation day</p>
                <ImpressionsTicker />
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-widest text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(42,118,166,0.9)]" />
                  Verified field data
                </div>
              </div>
            </div>
          </Reveal>

          {/* Outcomes ladder */}
          <Reveal delay={0.36}>
            <div className="spotlight-card glass-card relative h-full overflow-hidden rounded-3xl p-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">/Funnel · 03</p>
              <p className="mt-2 text-sm text-zinc-300">From glance to brand recall</p>
              <OutcomeLadder />
            </div>
          </Reveal>
        </div>

        {/* Tag strip */}
        <Reveal delay={0.45}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {["Mobile reach", "Crowd magnet", "Viral by design", "Premium presence", "Location-aware", "Always shareable"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Animated half-gauge — fills from 0 to {value}% on viewport entry */
function EngagementGauge({ value }: { value: number }) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate from 0 to value
          let raf: number;
          const start = performance.now();
          const duration = 1800;
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(eased * value);
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
          obs.disconnect();
          return () => cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  // Half-circle: 180° sweep. SVG path for the arc background and progress.
  const radius = 70;
  const circumference = Math.PI * radius;
  const dashOffset = circumference * (1 - progress / 100);

  return (
    <div ref={ref} className="relative mt-6 flex flex-col items-center">
      <svg viewBox="0 0 180 100" className="w-full max-w-[260px]">
        <defs>
          <linearGradient id="gauge-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#2a76a6" />
            <stop offset="100%" stopColor="#5ba3d4" />
          </linearGradient>
        </defs>
        {/* Track */}
        <path
          d="M 20 90 A 70 70 0 0 1 160 90"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={10}
          strokeLinecap="round"
        />
        {/* Progress */}
        <path
          d="M 20 90 A 70 70 0 0 1 160 90"
          fill="none"
          stroke="url(#gauge-grad)"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ filter: "drop-shadow(0 0 6px rgba(91,163,212,0.5))" }}
        />
      </svg>
      <div className="-mt-8 flex flex-col items-center">
        <p className="display-headline text-5xl text-white sm:text-6xl">
          {Math.round(progress)}<span className="text-gradient-accent">×</span>
        </p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-zinc-500">More attention</p>
      </div>
    </div>
  );
}

/* Live-feel impressions counter that ticks up continuously */
function ImpressionsTicker() {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Ramp up to 47000, then keep ticking by small random increments
          let raf: number;
          const start = performance.now();
          const duration = 2200;
          const target = 47000;
          const tick = (now: number) => {
            const t = (now - start) / duration;
            if (t < 1) {
              const eased = 1 - Math.pow(1 - t, 3);
              setCount(Math.round(eased * target));
              raf = requestAnimationFrame(tick);
            } else {
              setCount(target);
              // Slow live ticker
              const id = setInterval(() => {
                setCount((c) => c + Math.floor(Math.random() * 7) + 2);
              }, 1400);
              obs.disconnect();
              return () => {
                clearInterval(id);
                cancelAnimationFrame(raf);
              };
            }
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const formatted = count.toLocaleString("en-US");
  return (
    <div ref={ref} className="mt-6">
      <p className="display-headline text-5xl text-white sm:text-6xl">
        {formatted}
        <span className="text-gradient-accent">+</span>
      </p>
      <p className="mt-2 text-xs text-zinc-500">eyes per truck per day</p>
    </div>
  );
}

/* Outcome ladder — animated bars showing the funnel from glance to recall */
function OutcomeLadder() {
  const stages = [
    { label: "Glance", value: 100, desc: "First eye contact" },
    { label: "Stop", value: 78, desc: "Pause to look" },
    { label: "Engage", value: 54, desc: "Walk over, interact" },
    { label: "Share", value: 31, desc: "Film, post, tag" },
    { label: "Recall", value: 88, desc: "Remember 7 days later" },
  ];
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-6 space-y-2.5">
      {stages.map((s, i) => (
        <div key={s.label} className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-medium text-white">{s.label}</span>
            <span className="font-mono text-zinc-500">{s.value}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-accent-gradient transition-[width] duration-1000 ease-out"
              style={{
                width: visible ? `${s.value}%` : "0%",
                transitionDelay: `${i * 110}ms`,
                boxShadow: "0 0 8px rgba(42,118,166,0.5)",
              }}
            />
          </div>
          <p className="text-[10px] text-zinc-600">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── 3. Proof of Concept — Logo Wall ─── */
function ProofOfConceptSection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Top + bottom hairlines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-soft/40 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-soft/40 to-transparent" aria-hidden />
      {/* Atmospheric glow */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(40% 60% at 50% 50%, rgba(42,118,166,0.18), transparent 70%)",
        }}
        aria-hidden
      />
      {/* Big background watermark "TRUSTED" */}
      <div
        aria-hidden
        className="display-headline pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center text-[20rem] leading-none text-white/[0.02] sm:text-[28rem]"
      >
        TRUSTED
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-accent" />
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Proof of concept</p>
            </div>
            <h2 className="display-headline mt-5 text-3xl text-white sm:text-4xl md:text-5xl">
              Our solutions <span className="text-gradient-accent">trusted by</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-end gap-3 text-sm text-zinc-400">
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(42,118,166,0.9)]" />
                <span className="text-zinc-200">{trustedClients.length}+</span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500">brands</span>
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5">
                <span className="text-zinc-200">10</span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500">sectors</span>
              </span>
            </div>
          </Reveal>
        </div>

        {/* Logo grid */}
        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] sm:grid-cols-3 lg:grid-cols-5">
            {trustedClients.map((client, i) => (
              <ClientTile key={client.name} client={client} index={i} />
            ))}
          </div>
        </Reveal>

        {/* Footer caption */}
        <Reveal delay={0.25}>
          <p className="mt-8 text-center text-xs text-zinc-500">
            And more across telecom, government, real estate, and entertainment.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** Render a real logo image when available; fallback to a styled wordmark. */
function ClientTile({
  client, index,
}: {
  client: { name: string; sector: string; since: string; logo?: string };
  index: number;
}) {
  return (
    <div
      className="group relative flex h-32 items-center justify-center bg-[#08090f] transition-colors duration-300 hover:bg-white/[0.02] sm:h-36"
    >
      {/* Subtle accent corner glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(80% 80% at 50% 50%, rgba(42,118,166,0.18), transparent 70%)",
        }}
      />

      {/* Logo or wordmark */}
      <div className="relative flex h-full w-full items-center justify-center px-6 transition-all duration-300 group-hover:-translate-y-1">
        {client.logo ? (
          <Image
            src={client.logo}
            alt={`${client.name} logo`}
            width={140}
            height={48}
            className="h-9 w-auto max-w-[70%] object-contain opacity-60 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-10"
            unoptimized={client.logo.endsWith(".svg")}
            style={{ filter: "brightness(0) invert(0.78)" }}
          />
        ) : (
          <span
            className="display-headline text-2xl tracking-tight text-zinc-500 transition-colors duration-300 group-hover:text-white sm:text-3xl"
            style={{ letterSpacing: "0.04em" }}
          >
            {client.name.split(" ")[0]}
            {client.name.split(" ").length > 1 && (
              <span className="text-accent">·</span>
            )}
          </span>
        )}
      </div>

      {/* Hover-only sector + since pill */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 rounded-full border border-white/10 bg-black/70 px-2.5 py-0.5 text-[9px] uppercase tracking-widest text-zinc-400 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {client.sector} · since {client.since}
      </div>

      {/* Index marker */}
      <span className="pointer-events-none absolute left-3 top-3 font-mono text-[9px] tracking-widest text-zinc-700">
        /{String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

/* ─── 4. Concept Section — "El Cybertruck da 3ashanak" ─── */
function ConceptSection() {
  return (
    <section id="concept" className="relative overflow-hidden py-32">
      {/* Ambient backdrop */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(40% 50% at 20% 30%, rgba(42,118,166,0.18), transparent 65%), radial-gradient(40% 50% at 80% 70%, rgba(4,40,95,0.18), transparent 65%)",
        }}
        aria-hidden
      />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-25" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <Reveal className="mb-20 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs uppercase tracking-[0.3em] text-accent">The concept</p>
          </div>
          <h2 className="display-headline mt-6 text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
            This Cybertruck is<br />
            <span className="text-gradient-accent">made for you.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            Two principles drive every activation — where we put it, and how it&apos;s dressed for your brand.
          </p>
        </Reveal>

        {/* Pillars */}
        <div className="space-y-24 lg:space-y-28">
          {conceptPillars.map((pillar, i) => (
            <ConceptPillar key={pillar.title} pillar={pillar} index={i} flipped={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ConceptPillarData {
  title: string;
  subtitle: string;
  description: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  image: string;
  bullets: string[];
  metric: { value: string; label: string };
}

function ConceptPillar({
  pillar, index, flipped,
}: { pillar: ConceptPillarData; index: number; flipped: boolean }) {
  return (
    <Reveal delay={index * 0.1}>
      <div
        className={`grid items-center gap-10 lg:gap-16 lg:grid-cols-2 ${
          flipped ? "lg:[&>div:first-child]:order-2" : ""
        }`}
      >
        {/* Visual side */}
        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[36px]">
            <Image
              src={pillar.image}
              alt={pillar.title}
              fill
              className="object-cover transition duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Cinematic overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#05060a] via-[#05060a]/30 to-transparent" />
            <div
              className="absolute inset-0 mix-blend-overlay"
              style={{
                background:
                  "radial-gradient(60% 60% at 30% 30%, rgba(42,118,166,0.4), transparent 70%)",
              }}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

            {/* Floating index badge */}
            <div className="glass-strong absolute left-6 top-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-zinc-200">
              <span className="pulse-dot" />
              Pillar /{String(index + 1).padStart(2, "0")}
            </div>

            {/* Floating metric pill */}
            <div className="glass-strong absolute bottom-6 right-6 rounded-2xl px-5 py-3">
              <p className="text-2xl font-semibold tracking-tight text-white">{pillar.metric.value}</p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400">{pillar.metric.label}</p>
            </div>
          </div>

          {/* Decorative offset frame */}
          <div
            className={`pointer-events-none absolute inset-0 hidden -translate-x-3 translate-y-3 rounded-[36px] border border-accent/20 lg:block ${
              flipped ? "-translate-x-[-12px]" : ""
            }`}
            aria-hidden
          />
        </div>

        {/* Copy side */}
        <div className="relative">
          {/* Huge background numeral */}
          <span
            className="display-headline pointer-events-none absolute -left-2 -top-10 select-none text-[10rem] leading-none text-white/[0.04] sm:text-[14rem]"
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 text-accent">
                <pillar.Icon className="h-5 w-5" />
              </span>
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{pillar.subtitle}</p>
            </div>

            <h3 className="display-headline mt-6 text-3xl text-white sm:text-4xl md:text-5xl">
              {pillar.title}
            </h3>

            <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-400 md:text-lg">
              {pillar.description}
            </p>

            {/* Bullets */}
            <ul className="mt-8 space-y-3">
              {pillar.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-zinc-300">
                  <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── 5. Transition Section — Stats ─── */
function TransitionStatsSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(42,118,166,0.18), transparent 70%)" }} aria-hidden />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">
          {transitionStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <div className="group relative h-full glass-light p-10 text-center transition hover:bg-white/[0.06]">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">/{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-xs uppercase tracking-widest text-zinc-400">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 6. Visualization Car — 3D Model Section ─── */
function VisualizationSection() {
  return (
    <section id="visualization" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Visualization</p>
          <h2 className="display-headline mt-4 text-4xl text-white sm:text-5xl md:text-6xl">
            Meet your <span className="text-gradient-accent">activation truck.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
            Drag to rotate. Scroll to zoom. Explore every angle of the platform that will carry your brand.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[36px] glass-strong">
            <div className="absolute inset-12 rounded-full bg-accent-gradient opacity-25 blur-3xl" aria-hidden />
            <div className="grid-floor pointer-events-none absolute inset-0 opacity-40" aria-hidden />
            <div className="relative h-full w-full">
              <CybertruckScene initialView="explore" />
            </div>
            <div className="pointer-events-none absolute left-6 top-6">
              <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-zinc-300">
                <span className="pulse-dot" />
                Drag · Zoom · Explore
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 7. Case Studies ─── */
function CaseStudiesSection() {
  return (
    <section id="cases" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Case studies</p>
          <h2 className="display-headline mt-4 text-4xl text-white sm:text-5xl md:text-6xl">
            Activations that<br />
            <span className="text-gradient-accent">moved markets.</span>
          </h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.title} delay={i * 0.08}>
              <div className="spotlight-card glass-card group relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src={cs.image}
                  alt={cs.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080f] via-[#06080f]/60 to-transparent" />
                <div className="relative flex h-full flex-col justify-between p-8">
                  <div className="flex items-start justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{cs.category} · {cs.year}</p>
                    <span className="glass rounded-full px-3 py-1 text-[10px] uppercase tracking-widest text-zinc-200">{cs.impressions} reach</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{cs.title}</h3>
                    <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400 opacity-0 transition group-hover:opacity-100">
                      <span>View case study</span>
                      <IconArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Process — Scroll-driven step rail ─── */
const processSteps = [
  {
    n: "01",
    title: "Brief & Discovery",
    blurb: "We listen to your goals, audience and dates. Output: a sharp creative direction and a watertight technical scope.",
    bullets: ["Goals & KPIs alignment", "Audience & venue mapping", "Constraints & permits"],
    duration: "Day 1–3",
  },
  {
    n: "02",
    title: "Design & Concept",
    blurb: "Vehicle wraps, LED content, lighting plots and on-truck experiences — designed around your brand.",
    bullets: ["Wrap & rooftop concepts", "Custom LED content", "Interactive moments"],
    duration: "Week 1",
  },
  {
    n: "03",
    title: "Production & Build",
    blurb: "Wrap install, content production, hardware prep, rehearsal. Every cue is dry-run before we ship.",
    bullets: ["Vehicle wrap install", "Content & motion graphics", "Studio rehearsal"],
    duration: "Week 1–2",
  },
  {
    n: "04",
    title: "Deployment",
    blurb: "Logistics, permits, on-site setup, crew briefings. We arrive, plug in, and we're live.",
    bullets: ["Routing & permits", "On-site setup", "Crew briefings"],
    duration: "Activation day",
  },
  {
    n: "05",
    title: "Live Operation",
    blurb: "Full technical crew running the activation — content, lighting, social capture, audience engagement.",
    bullets: ["Live operators on board", "Real-time content", "Social capture team"],
    duration: "Activation window",
  },
  {
    n: "06",
    title: "Wrap Report",
    blurb: "Footage, KPIs, social listening and recommendations — delivered within 5 business days.",
    bullets: ["Hero film + raw footage", "Engagement & reach data", "Next-campaign roadmap"],
    duration: "+5 days",
  },
];

function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress: 0 when section top hits viewport bottom; 1 when section bottom hits viewport top
      const total = rect.height + vh;
      const passed = vh - rect.top;
      const p = Math.max(0, Math.min(1, passed / total));
      setScrollProgress(p);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <section id="process" className="relative overflow-hidden py-32">
      {/* Backdrop */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(40% 60% at 50% 30%, rgba(42,118,166,0.18), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-25" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <Reveal className="mb-20 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Our process</p>
          </div>
          <h2 className="display-headline mt-6 text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
            From brief to<br />
            <span className="text-gradient-accent">activation day.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            Six stages, one team, no hand-offs. Every step is signed off before the next begins.
          </p>
        </Reveal>

        {/* Timeline rail */}
        <div ref={containerRef} className="relative">
          {/* Center vertical track (mobile: left-aligned, desktop: centered) */}
          <div
            className="absolute bottom-0 left-6 top-0 w-px bg-white/[0.06] md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />
          {/* Animated progress fill */}
          <div
            className="absolute left-6 top-0 w-px bg-gradient-to-b from-accent via-accent-soft to-accent-deep md:left-1/2 md:-translate-x-1/2"
            style={{
              height: `${scrollProgress * 100}%`,
              boxShadow: "0 0 12px rgba(42,118,166,0.6)",
              transition: "height 80ms linear",
            }}
            aria-hidden
          />

          {/* Steps */}
          <ol className="space-y-16 md:space-y-24">
            {processSteps.map((step, i) => (
              <ProcessStep key={step.n} step={step} index={i} />
            ))}
          </ol>
        </div>

        {/* Footer CTA */}
        <Reveal delay={0.1}>
          <div className="mt-24 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-zinc-400">Ready to start your timeline?</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 hover:shadow-lg hover:shadow-accent/20"
            >
              Build my brief
              <IconArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProcessStep({
  step, index,
}: {
  step: typeof processSteps[number];
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);
  const fromLeft = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <li ref={ref} className="relative">
      {/* Mobile dot (left rail) */}
      <span
        className={`absolute left-6 top-6 -translate-x-1/2 md:hidden ${
          visible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        } transition-all duration-500`}
        aria-hidden
      >
        <span className="block h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_rgba(42,118,166,0.9)]" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full border border-accent/50 animate-ping" />
      </span>

      {/* Desktop dot (center rail) */}
      <span
        className={`absolute left-1/2 top-6 hidden -translate-x-1/2 md:block ${
          visible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        } transition-all duration-500`}
        style={{ transitionDelay: "120ms" }}
        aria-hidden
      >
        <span className="relative block h-4 w-4 rounded-full bg-accent shadow-[0_0_14px_rgba(42,118,166,0.9)]">
          <span className="absolute inset-0 rounded-full bg-white/30" />
        </span>
        <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40 animate-ping" />
      </span>

      <div
        className={`grid items-start gap-6 md:grid-cols-2 ${
          fromLeft ? "" : "md:[&>div:first-child]:order-2"
        }`}
      >
        {/* Card side */}
        <div
          className={`pl-16 md:pl-0 ${fromLeft ? "md:pr-12" : "md:pl-12"}`}
          style={{
            transition: "all 800ms cubic-bezier(0.22, 1, 0.36, 1)",
            transitionDelay: "100ms",
            transform: visible
              ? "translateX(0) translateY(0)"
              : `translateX(${fromLeft ? "-40px" : "40px"}) translateY(20px)`,
            opacity: visible ? 1 : 0,
          }}
        >
          <div className="spotlight-card glass-card group rounded-3xl p-7 hover:border-white/20 md:p-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                /Step {step.n}
              </span>
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 text-[10px] uppercase tracking-widest text-accent">
                {step.duration}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">
              {step.blurb}
            </p>
            <ul className="mt-5 space-y-2">
              {step.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-xs text-zinc-300 md:text-sm">
                  <span className="mt-1.5 grid h-3 w-3 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Numeral side — huge index for visual rhythm */}
        <div
          className={`hidden md:flex md:items-start ${fromLeft ? "md:justify-start md:pl-12" : "md:justify-end md:pr-12"}`}
          style={{
            transition: "all 900ms cubic-bezier(0.22, 1, 0.36, 1)",
            transitionDelay: "200ms",
            transform: visible
              ? "translateX(0)"
              : `translateX(${fromLeft ? "30px" : "-30px"})`,
            opacity: visible ? 1 : 0,
          }}
        >
          <span className="display-headline select-none text-[8rem] leading-none text-white/[0.06] lg:text-[11rem]">
            {step.n}
          </span>
        </div>
      </div>
    </li>
  );
}
function OtherServicesSection() {
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Beyond the truck</p>
          <h2 className="display-headline mt-4 text-4xl text-white sm:text-5xl md:text-6xl">
            Other services<br />
            <span className="text-gradient-accent">that pair with it.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            The Cybertruck is the centerpiece. We extend it with full event production capabilities — so a single team owns your activation end to end.
          </p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {otherServices.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.06}>
              <div className="spotlight-card glass-card group h-full rounded-3xl p-8 hover:-translate-y-1 hover:border-white/20">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 text-accent">
                  <service.Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 9. Testimonials ─── */
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const main = testimonials[active];

  return (
    <section className="relative overflow-hidden py-32">
      {/* Atmospheric backdrop */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(45% 55% at 25% 30%, rgba(42,118,166,0.18), transparent 70%), radial-gradient(35% 45% at 80% 70%, rgba(4,40,95,0.18), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-25" aria-hidden />

      {/* Massive quote glyph backdrop */}
      <div
        aria-hidden
        className="display-headline pointer-events-none absolute -left-8 top-20 select-none text-[28rem] leading-none text-white/[0.02] sm:-left-16 sm:text-[40rem]"
      >
        “
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header + aggregate rating */}
        <Reveal className="mb-16 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-accent" />
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Client voices</p>
            </div>
            <h2 className="display-headline mt-6 text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Trusted by the<br />
              <span className="text-gradient-accent">biggest stages.</span>
            </h2>
          </div>
          <AggregateRating />
        </Reveal>

        {/* Featured testimonial */}
        <Reveal delay={0.15}>
          <div className="relative overflow-hidden rounded-[36px] glass-strong">
            {/* Accent gradient wash */}
            <div
              className={`absolute inset-0 opacity-50 bg-gradient-to-br ${main.accent}`}
              style={{ mixBlendMode: "soft-light" }}
              aria-hidden
            />
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(60% 80% at 80% 20%, rgba(42,118,166,0.22), transparent 65%)",
              }}
              aria-hidden
            />
            <div className="grid-floor pointer-events-none absolute inset-0 opacity-30" aria-hidden />

            <div className="relative grid gap-10 p-8 sm:p-12 md:p-16 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              {/* Quote side */}
              <div className="flex flex-col">
                {/* Rating */}
                <div className="mb-6 flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} filled={i < main.rating} className="h-4 w-4" />
                  ))}
                  <span className="ml-3 text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                    Verified partner
                  </span>
                </div>

                {/* The quote */}
                <p className="text-pretty text-2xl font-medium leading-tight text-white sm:text-3xl md:text-4xl lg:leading-[1.15]">
                  <span className="text-accent">&ldquo;</span>
                  {main.quote}
                  <span className="text-accent">&rdquo;</span>
                </p>

                {/* Author block */}
                <div className="mt-10 flex items-center gap-4">
                  <div
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${main.accent} text-base font-semibold text-white shadow-lg shadow-accent/20`}
                  >
                    {main.initials}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">{main.author}</p>
                    <p className="text-sm text-zinc-400">
                      {main.role} · <span className="text-zinc-300">{main.company}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Metric pull-out */}
              <div className="flex flex-col gap-3 lg:items-end lg:text-right">
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent">Outcome</p>
                <p className="display-headline text-7xl text-white sm:text-8xl">
                  {main.metric.value}
                </p>
                <p className="max-w-[12rem] text-sm text-zinc-300 lg:ml-auto">
                  {main.metric.label}
                </p>
                {/* Bottom progress dots / nav */}
                <div className="mt-6 flex items-center gap-2 lg:justify-end">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`Show testimonial ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === active
                          ? "w-8 bg-accent shadow-[0_0_8px_rgba(42,118,166,0.7)]"
                          : "w-3 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Side rail with the other two */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={0.05 * i}>
              <button
                onClick={() => setActive(i)}
                className={`spotlight-card glass-card group h-full w-full rounded-3xl p-6 text-left transition hover:-translate-y-0.5 ${
                  i === active
                    ? "border-accent/40 bg-accent/[0.04]"
                    : "hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${t.accent} text-xs font-semibold text-white`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.author}</p>
                      <p className="text-[11px] text-zinc-500">{t.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <StarIcon key={j} filled className="h-2.5 w-2.5" />
                    ))}
                  </div>
                </div>
                <p className="mt-5 line-clamp-3 text-xs leading-relaxed text-zinc-400 transition group-hover:text-zinc-300">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500">{t.metric.label}</span>
                  <span className="text-sm font-semibold text-accent">{t.metric.value}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AggregateRating() {
  return (
    <div className="glass-light flex items-center gap-5 rounded-2xl px-6 py-4">
      <div className="text-right">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} filled className="h-4 w-4" />
          ))}
        </div>
        <p className="mt-1.5 text-[10px] uppercase tracking-[0.25em] text-zinc-400">
          4.9 / 5 · 80+ partners
        </p>
      </div>
      <div className="h-10 w-px bg-white/10" />
      <div>
        <p className="text-2xl font-semibold tracking-tight text-white">98%</p>
        <p className="text-[10px] uppercase tracking-widest text-zinc-500">
          Repeat clients
        </p>
      </div>
    </div>
  );
}

function StarIcon({ filled = false, className = "" }: { filled?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill={filled ? "url(#star-grad)" : "none"}
      stroke={filled ? "none" : "rgba(255,255,255,0.2)"}
      strokeWidth={1.5}
    >
      <defs>
        <linearGradient id="star-grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#5ba3d4" />
          <stop offset="100%" stopColor="#2a76a6" />
        </linearGradient>
      </defs>
      <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.65l5.9-.85L10 1.5z" />
    </svg>
  );
}

/* ─── 10. Serving Cities ─── */
function ServingCitiesSection() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(42,118,166,0.2), transparent 70%)" }} aria-hidden />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Serving cities</p>
          <h2 className="display-headline mt-4 text-4xl text-white sm:text-5xl md:text-6xl">
            Operating across<br />
            <span className="text-gradient-accent">the Kingdom.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            From Riyadh to NEOM, we move the truck wherever your audience lives. Eight active hubs and counting.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <KingdomMap />
            <CitiesPanel />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function KingdomMap() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[36px] glass-strong">
      {/* Ambient glow */}
      <div className="absolute inset-12 rounded-full bg-accent-gradient opacity-15 blur-3xl" aria-hidden />
      {/* Subtle grid overlay */}
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-50" aria-hidden />

      {/* Real KSA regions + city hotspots in shared SVG coord space */}
      <svg
        viewBox={KSA_VIEWBOX}
        className="absolute inset-0 h-full w-full p-6"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="ksa-fill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#2a76a6" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#04285f" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="ksa-stroke" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#5ba3d4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#2a76a6" stopOpacity="0.35" />
          </linearGradient>
          <radialGradient id="pin-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5ba3d4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#5ba3d4" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* All 13 administrative regions */}
        <g aria-hidden>
          {KSA_REGIONS.map((region) => (
            <path
              key={region.id}
              d={region.d}
              fill="url(#ksa-fill)"
              stroke="url(#ksa-stroke)"
              strokeWidth={1.2}
              strokeLinejoin="round"
              className="transition-colors duration-300 hover:fill-[rgba(42,118,166,0.28)]"
            >
              <title>{region.name}</title>
            </path>
          ))}
        </g>

        {/* City pins on top */}
        {cities.map((city) => (
          <CityPinSvg key={city.name} city={city} />
        ))}
      </svg>

      {/* Footer caption */}
      <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-zinc-500">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(42,118,166,0.9)]" />
          Active hub
        </span>
        <span>Saudi Arabia · KSA</span>
      </div>
    </div>
  );
}

function CityPinSvg({
  city,
}: {
  city: { name: string; x: number; y: number; hub?: boolean };
}) {
  // viewBox is 1000×824, so pin sizes are tuned to that scale
  const r = city.hub ? 9 : 6;
  const ringR = city.hub ? 22 : 16;
  const dur = city.hub ? "2.4s" : "3.2s";
  const padX = city.name.length * 7;
  return (
    <g className="group" style={{ cursor: "pointer" }}>
      {/* Outer halo (static glow) */}
      <circle cx={city.x} cy={city.y} r={ringR * 1.7} fill="url(#pin-glow)" />
      {/* Animated pulse ring */}
      <circle
        cx={city.x}
        cy={city.y}
        r={r}
        fill="none"
        stroke="#2a76a6"
        strokeWidth={1.8}
        opacity={0.7}
      >
        <animate attributeName="r" from={r} to={ringR} dur={dur} repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.7" to="0" dur={dur} repeatCount="indefinite" />
      </circle>
      {/* Solid dot */}
      <circle
        cx={city.x}
        cy={city.y}
        r={r}
        fill="#5ba3d4"
        className="transition-all duration-200 group-hover:opacity-100"
        style={{ filter: "drop-shadow(0 0 14px rgba(91,163,212,0.9))" }}
      />
      {/* Hover label */}
      <g className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <rect
          x={city.x - padX}
          y={city.y + 14}
          width={padX * 2}
          height={26}
          rx={13}
          fill="rgba(10, 12, 18, 0.95)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={1}
        />
        <text
          x={city.x}
          y={city.y + 31}
          textAnchor="middle"
          fontSize={14}
          fill="#fff"
          fontWeight={600}
          style={{ letterSpacing: "0.1em" }}
        >
          {city.name.toUpperCase()}
        </text>
      </g>
    </g>
  );
}

function CitiesPanel() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {cities.map((city) => (
          <div
            key={city.name}
            className="spotlight-card glass-card group rounded-2xl p-4 transition hover:-translate-y-0.5 hover:border-white/20"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{city.name}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-zinc-500">{city.region}</p>
              </div>
              {city.hub && (
                <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-widest text-accent">
                  Hub
                </span>
              )}
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-zinc-500">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(42,118,166,0.8)]" />
              <span>Active</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5 text-center">
        <p className="text-sm text-zinc-300">
          <span className="font-semibold text-white">Need another city?</span>{" "}
          We deploy nationwide on request.
        </p>
        <a href="#contact" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent transition hover:text-white">
          Request location
          <IconArrowRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

/* ─── 11. Contact Form (Multi-step Wizard) ─── */
function FormSection() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Build your brief</p>
          <h2 className="display-headline mt-4 text-4xl text-white sm:text-5xl md:text-6xl">
            Start your<br />
            <span className="text-gradient-accent">activation.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-zinc-400">
            Six quick questions. We come back within 24 hours with scope, timeline and a tailored proposal.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-[36px] glass-strong p-6 md:p-10">
            <div className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(50% 50% at 50% 0%, rgba(42,118,166,0.22), transparent 60%)" }} aria-hidden />
            <div className="grid-floor pointer-events-none absolute inset-0 opacity-25" aria-hidden />
            <div className="relative">
              <BriefWizard submitted={submitted} onSubmitted={() => setSubmitted(true)} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Wizard configuration ─── */
type CampaignType = "mall" | "event" | "national" | "vip" | "other";
type Goal = "awareness" | "launch" | "footfall" | "sales" | "vip" | "social";
type Service = "led" | "stage" | "sound" | "interactive" | "photo" | "wraps";
type Timeline = "asap" | "1month" | "3months" | "exploring";
type Budget = "under50" | "50to150" | "150to500" | "500plus" | "tbd";

interface BriefData {
  campaignType: CampaignType | null;
  goals: Goal[];
  services: Service[];
  city: string;
  duration: number;
  audience: number;
  timeline: Timeline | null;
  budget: Budget | null;
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
}

const initialBrief: BriefData = {
  campaignType: null,
  goals: [],
  services: [],
  city: "Riyadh",
  duration: 3,
  audience: 5000,
  timeline: null,
  budget: null,
  name: "",
  company: "",
  email: "",
  phone: "",
  notes: "",
};

function BriefWizard({ submitted, onSubmitted }: { submitted: boolean; onSubmitted: () => void }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BriefData>(initialBrief);
  const totalSteps = 6;

  const update = <K extends keyof BriefData>(key: K, value: BriefData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const toggleArray = <K extends "goals" | "services">(key: K, value: BriefData[K][number]) =>
    setData((d) => {
      const arr = d[key] as Array<typeof value>;
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...d, [key]: next } as BriefData;
    });

  // Per-step validity
  const canAdvance = [
    data.campaignType !== null,
    data.goals.length > 0,
    data.services.length > 0,
    data.city.trim().length > 0,
    data.timeline !== null && data.budget !== null,
    data.name.trim().length > 1 && /\S+@\S+\.\S+/.test(data.email),
  ][step];

  if (submitted) return <BriefSuccess data={data} />;

  return (
    <div className="grid gap-8">
      <WizardProgress current={step} total={totalSteps} />
      <div className="min-h-[360px]">
        {step === 0 && <Step0Type data={data} update={update} />}
        {step === 1 && <Step1Goals data={data} toggle={(v) => toggleArray("goals", v)} />}
        {step === 2 && <Step2Services data={data} toggle={(v) => toggleArray("services", v)} />}
        {step === 3 && <Step3Logistics data={data} update={update} />}
        {step === 4 && <Step4TimingBudget data={data} update={update} />}
        {step === 5 && <Step5Contact data={data} update={update} />}
      </div>
      <WizardNav
        step={step}
        totalSteps={totalSteps}
        canAdvance={canAdvance}
        onPrev={() => setStep((s) => Math.max(0, s - 1))}
        onNext={() => setStep((s) => Math.min(totalSteps - 1, s + 1))}
        onSubmit={onSubmitted}
      />
    </div>
  );
}

function WizardProgress({ current, total }: { current: number; total: number }) {
  const labels = ["Type", "Goals", "Services", "Logistics", "Timing", "Contact"];
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-zinc-500">
        <span className="text-accent">Step {current + 1} of {total}</span>
        <span>{labels[current]}</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-accent-gradient transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function WizardNav({
  step, totalSteps, canAdvance, onPrev, onNext, onSubmit,
}: {
  step: number; totalSteps: number; canAdvance: boolean;
  onPrev: () => void; onNext: () => void; onSubmit: () => void;
}) {
  const isLast = step === totalSteps - 1;
  return (
    <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-6">
      <button
        type="button"
        onClick={onPrev}
        disabled={step === 0}
        className="rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-zinc-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-400"
      >
        ← Back
      </button>
      <button
        type="button"
        onClick={isLast ? onSubmit : onNext}
        disabled={!canAdvance}
        className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90 hover:shadow-lg hover:shadow-accent/20 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:shadow-none"
      >
        {isLast ? "Submit Brief" : "Continue"}
        <IconArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ─── Wizard Step Components ─── */

const cardBase = "group relative cursor-pointer rounded-2xl border bg-white/[0.03] p-5 transition hover:border-white/30 hover:bg-white/[0.06]";
const cardSelected = "border-accent bg-accent/10";
const cardIdle = "border-white/10";

function StepHeader({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h3>
      {hint && <p className="mt-2 text-sm text-zinc-500">{hint}</p>}
    </div>
  );
}

function ChoiceCard({
  active, onClick, label, description, kbd,
}: {
  active: boolean; onClick: () => void; label: string; description?: string; kbd?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`${cardBase} ${active ? cardSelected : cardIdle} text-left ${kbd ? "pb-7" : ""}`}
    >
      {/* Reserve right padding so the check badge never overlaps the title */}
      <div className="pr-8">
        <p className="text-sm font-semibold text-white">{label}</p>
        {description && <p className="mt-1 text-xs leading-relaxed text-zinc-500">{description}</p>}
      </div>

      {/* Check badge — top-right corner only */}
      <span
        className={`absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full transition ${
          active ? "bg-accent text-white" : "border border-white/15 text-transparent"
        }`}
      >
        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M2.5 6.5l2.5 2.5L9.5 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>

      {/* Index pill — bottom-right corner, far from the check badge */}
      {kbd && (
        <span className="absolute bottom-3 right-3 font-mono text-[10px] tracking-widest text-zinc-600">
          {kbd}
        </span>
      )}
    </button>
  );
}

/* Step 0 — Campaign type (single choice MCQ) */
function Step0Type({ data, update }: { data: BriefData; update: <K extends keyof BriefData>(k: K, v: BriefData[K]) => void }) {
  const types: { id: CampaignType; label: string; description: string }[] = [
    { id: "mall", label: "Mall Activation", description: "Brand presence inside or around shopping destinations." },
    { id: "event", label: "Event Launch", description: "Product launches, openings, gala arrivals." },
    { id: "national", label: "National Campaign", description: "Multi-city tour with a unified message." },
    { id: "vip", label: "VIP Experience", description: "Premium guest transport, branded entrances." },
    { id: "other", label: "Something Else", description: "Custom format — we'll design around it." },
  ];
  return (
    <div>
      <StepHeader title="What kind of activation?" hint="Pick the format that fits your campaign best." />
      <div className="grid gap-3 sm:grid-cols-2">
        {types.map((t, i) => (
          <ChoiceCard
            key={t.id}
            active={data.campaignType === t.id}
            onClick={() => update("campaignType", t.id)}
            label={t.label}
            description={t.description}
            kbd={`/0${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* Step 1 — Goals (multi-select) */
function Step1Goals({ data, toggle }: { data: BriefData; toggle: (g: Goal) => void }) {
  const goals: { id: Goal; label: string; description: string }[] = [
    { id: "awareness", label: "Brand Awareness", description: "Maximize impressions and visibility." },
    { id: "launch", label: "Product Launch", description: "Generate buzz around a new offering." },
    { id: "footfall", label: "Drive Footfall", description: "Pull crowds into a venue or location." },
    { id: "sales", label: "Sales Activation", description: "Convert attention into purchases on the spot." },
    { id: "vip", label: "VIP Hosting", description: "Premium experience for select guests." },
    { id: "social", label: "Social Virality", description: "Drive UGC and shareable moments." },
  ];
  return (
    <div>
      <StepHeader title="What are your goals?" hint="Pick all that apply — we'll tune the activation around them." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map((g) => (
          <ChoiceCard
            key={g.id}
            active={data.goals.includes(g.id)}
            onClick={() => toggle(g.id)}
            label={g.label}
            description={g.description}
          />
        ))}
      </div>
    </div>
  );
}

/* Step 2 — Services (multi-select) */
function Step2Services({ data, toggle }: { data: BriefData; toggle: (s: Service) => void }) {
  const services: { id: Service; label: string; description: string }[] = [
    { id: "led", label: "LED Screens", description: "Modular walls, mobile screens, branded panels." },
    { id: "stage", label: "Stage Production", description: "Full staging, rigging, lighting and crew." },
    { id: "sound", label: "Sound System", description: "Line array, monitors, broadcast-ready audio." },
    { id: "interactive", label: "Interactive Tech", description: "Custom apps, AR, social walls, data overlays." },
    { id: "photo", label: "AI Photo Booth", description: "Branded photo experiences for guests." },
    { id: "wraps", label: "Vehicle Wraps", description: "Full custom Cybertruck branding skin." },
  ];
  return (
    <div>
      <StepHeader title="Which add-ons do you need?" hint="Combine the truck with extra production capabilities." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <ChoiceCard
            key={s.id}
            active={data.services.includes(s.id)}
            onClick={() => toggle(s.id)}
            label={s.label}
            description={s.description}
          />
        ))}
      </div>
    </div>
  );
}

/* Step 3 — Logistics (city + duration + audience size sliders) */
function Step3Logistics({ data, update }: { data: BriefData; update: <K extends keyof BriefData>(k: K, v: BriefData[K]) => void }) {
  const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition focus:border-accent focus:bg-white/[0.07] focus:outline-none";
  const labelCls = "mb-2 block text-[10px] uppercase tracking-[0.25em] text-zinc-400";
  const cityOptions = ["Riyadh", "Jeddah", "Dammam", "Khobar", "Mecca", "Medina", "AlUla", "NEOM", "Multi-city"];
  return (
    <div>
      <StepHeader title="Tell us the logistics." hint="City, duration and expected audience help us scope the right kit." />
      <div className="grid gap-6">
        <div>
          <label className={labelCls}>Primary city</label>
          <div className="flex flex-wrap gap-2">
            {cityOptions.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => update("city", c)}
                className={`rounded-full border px-4 py-2 text-xs transition ${
                  data.city === c
                    ? "border-accent bg-accent/15 text-white"
                    : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/30 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <SliderField
            label="Activation duration"
            value={data.duration}
            min={1}
            max={14}
            step={1}
            onChange={(v) => update("duration", v)}
            display={`${data.duration} ${data.duration === 1 ? "day" : "days"}`}
          />
          <SliderField
            label="Expected audience"
            value={data.audience}
            min={500}
            max={50000}
            step={500}
            onChange={(v) => update("audience", v)}
            display={data.audience >= 1000 ? `${(data.audience / 1000).toFixed(data.audience % 1000 === 0 ? 0 : 1)}K people` : `${data.audience} people`}
          />
        </div>
        <div>
          <label htmlFor="venue-detail" className={labelCls}>Specific venue or area (optional)</label>
          <input
            id="venue-detail"
            type="text"
            placeholder="e.g. Boulevard City, Park Avenue Mall, King Abdullah Park..."
            className={inputCls}
            onChange={(e) => update("notes", e.target.value)}
            defaultValue={data.notes}
          />
        </div>
      </div>
    </div>
  );
}

function SliderField({
  label, value, min, max, step, onChange, display,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; display: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400">{label}</span>
        <span className="text-sm font-semibold text-white">{display}</span>
      </div>
      <div className="relative">
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-accent-gradient" style={{ width: `${pct}%` }} />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(42,118,166,0.35)] [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white"
        />
      </div>
    </div>
  );
}

/* Step 4 — Timing & Budget (two MCQ groups) */
function Step4TimingBudget({ data, update }: { data: BriefData; update: <K extends keyof BriefData>(k: K, v: BriefData[K]) => void }) {
  const timelines: { id: Timeline; label: string; description: string }[] = [
    { id: "asap", label: "ASAP", description: "Within the next 2 weeks." },
    { id: "1month", label: "Within 1 month", description: "We have a target date." },
    { id: "3months", label: "1–3 months out", description: "Planning ahead." },
    { id: "exploring", label: "Just exploring", description: "Open timeline." },
  ];
  const budgets: { id: Budget; label: string; description: string }[] = [
    { id: "under50", label: "Under 50K SAR", description: "Tactical activation." },
    { id: "50to150", label: "50K–150K SAR", description: "Standard production." },
    { id: "150to500", label: "150K–500K SAR", description: "Premium scope." },
    { id: "500plus", label: "500K+ SAR", description: "Hero production." },
    { id: "tbd", label: "Not sure yet", description: "Help us scope it." },
  ];
  return (
    <div className="grid gap-8">
      <div>
        <StepHeader title="When are you aiming for?" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {timelines.map((t) => (
            <ChoiceCard
              key={t.id}
              active={data.timeline === t.id}
              onClick={() => update("timeline", t.id)}
              label={t.label}
              description={t.description}
            />
          ))}
        </div>
      </div>
      <div>
        <StepHeader title="Indicative budget?" hint="Helps us recommend the right scope. Adjustable later." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {budgets.map((b) => (
            <ChoiceCard
              key={b.id}
              active={data.budget === b.id}
              onClick={() => update("budget", b.id)}
              label={b.label}
              description={b.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* Step 5 — Contact + review */
function Step5Contact({ data, update }: { data: BriefData; update: <K extends keyof BriefData>(k: K, v: BriefData[K]) => void }) {
  const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition focus:border-accent focus:bg-white/[0.07] focus:outline-none";
  const labelCls = "mb-2 block text-[10px] uppercase tracking-[0.25em] text-zinc-400";
  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <StepHeader title="Almost there." hint="Where should we send the proposal?" />
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="w-name" className={labelCls}>Full name</label>
              <input id="w-name" value={data.name} onChange={(e) => update("name", e.target.value)} type="text" required placeholder="Your name" className={inputCls} />
            </div>
            <div>
              <label htmlFor="w-company" className={labelCls}>Company</label>
              <input id="w-company" value={data.company} onChange={(e) => update("company", e.target.value)} type="text" placeholder="Brand or agency" className={inputCls} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="w-email" className={labelCls}>Email</label>
              <input id="w-email" value={data.email} onChange={(e) => update("email", e.target.value)} type="email" required placeholder="you@brand.com" className={inputCls} />
            </div>
            <div>
              <label htmlFor="w-phone" className={labelCls}>Phone (WhatsApp)</label>
              <input id="w-phone" value={data.phone} onChange={(e) => update("phone", e.target.value)} type="tel" placeholder="+966 5x xxx xxxx" className={inputCls} />
            </div>
          </div>
          <div>
            <label htmlFor="w-extra" className={labelCls}>Anything else?</label>
            <textarea id="w-extra" value={data.notes} onChange={(e) => update("notes", e.target.value)} rows={3} placeholder="Specific dates, brand references, must-haves..." className={inputCls} />
          </div>
        </div>
      </div>
      <BriefSummary data={data} />
    </div>
  );
}

function BriefSummary({ data }: { data: BriefData }) {
  const typeLabels: Record<CampaignType, string> = {
    mall: "Mall Activation",
    event: "Event Launch",
    national: "National Campaign",
    vip: "VIP Experience",
    other: "Custom",
  };
  const timelineLabels: Record<Timeline, string> = {
    asap: "ASAP",
    "1month": "Within 1 month",
    "3months": "1–3 months",
    exploring: "Exploring",
  };
  const budgetLabels: Record<Budget, string> = {
    under50: "<50K SAR",
    "50to150": "50–150K SAR",
    "150to500": "150–500K SAR",
    "500plus": "500K+ SAR",
    tbd: "TBD",
  };
  const audienceDisplay = data.audience >= 1000
    ? `${(data.audience / 1000).toFixed(data.audience % 1000 === 0 ? 0 : 1)}K`
    : `${data.audience}`;
  const rows = [
    { label: "Type", value: data.campaignType ? typeLabels[data.campaignType] : "—" },
    { label: "Goals", value: data.goals.length ? `${data.goals.length} selected` : "—" },
    { label: "Add-ons", value: data.services.length ? `${data.services.length} selected` : "—" },
    { label: "City", value: data.city || "—" },
    { label: "Duration", value: `${data.duration} ${data.duration === 1 ? "day" : "days"}` },
    { label: "Audience", value: audienceDisplay },
    { label: "Timeline", value: data.timeline ? timelineLabels[data.timeline] : "—" },
    { label: "Budget", value: data.budget ? budgetLabels[data.budget] : "—" },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-[10px] uppercase tracking-[0.3em] text-accent">Your brief</p>
      <div className="mt-5 space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between border-b border-white/5 pb-3 text-sm last:border-0">
            <span className="text-zinc-500">{r.label}</span>
            <span className="font-medium text-white">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BriefSuccess({ data }: { data: BriefData }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-10 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-accent-gradient shadow-lg shadow-accent/30">
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="display-headline text-3xl text-white sm:text-4xl">
        Brief received.
      </h3>
      <p className="max-w-md text-sm text-zinc-400">
        Thanks{data.name ? `, ${data.name.split(" ")[0]}` : ""}. Our team will reach out within 24 hours with a tailored proposal for your{" "}
        <span className="text-white">{data.campaignType ?? "activation"}</span>{" "}
        in <span className="text-white">{data.city}</span>.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <a href="https://wa.me/966543938548" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90">
          <IconWhatsApp className="h-4 w-4" />
          Chat now
        </a>
        <a href="mailto:inquiry@hotsspots.com" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-white/10">
          <IconMail className="h-4 w-4" />
          Email us
        </a>
      </div>
    </div>
  );
}

function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = faqs.filter(
    (f) => activeCategory === "All" || f.category === activeCategory
  );

  return (
    <section className="relative overflow-hidden py-32">
      {/* Atmospheric backdrop */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(40% 50% at 80% 20%, rgba(42,118,166,0.18), transparent 70%), radial-gradient(35% 45% at 10% 80%, rgba(4,40,95,0.18), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-25" aria-hidden />

      {/* Massive transparent ? glyph */}
      <div
        aria-hidden
        className="display-headline pointer-events-none absolute right-[-8rem] top-1/2 -translate-y-1/2 select-none text-[40rem] leading-none text-white/[0.025] sm:right-[-4rem]"
      >
        ?
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <Reveal className="mb-16 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs uppercase tracking-[0.3em] text-accent">FAQ</p>
          </div>
          <h2 className="display-headline mt-6 text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Everything you<br />
            need to <span className="text-gradient-accent">know.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            Quick answers about customization, logistics, and how the activation actually runs.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          {/* Category rail */}
          <Reveal delay={0.05}>
            <div className="lg:sticky lg:top-28">
              <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-zinc-500">Filter by</p>
              <div className="flex flex-wrap gap-2 lg:flex-col">
                {faqCategories.map((cat) => {
                  const count =
                    cat === "All" ? faqs.length : faqs.filter((f) => f.category === cat).length;
                  const active = cat === activeCategory;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setOpenIndex(0);
                      }}
                      className={`group/btn flex items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 text-left text-sm transition-all ${
                        active
                          ? "border-accent/40 bg-accent/[0.08] text-white"
                          : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:bg-white/[0.04] hover:text-zinc-200"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(42,118,166,0.9)]" />
                        )}
                        <span className={active ? "font-semibold" : ""}>{cat}</span>
                      </span>
                      <span
                        className={`font-mono text-[10px] transition ${
                          active ? "text-accent" : "text-zinc-600 group-hover/btn:text-zinc-400"
                        }`}
                      >
                        {String(count).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Helpful contact card */}
              <div className="mt-8 hidden rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5 lg:block">
                <p className="text-sm font-semibold text-white">Still curious?</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Skip the forms. Reach our team directly.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href="https://wa.me/966543938548"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90"
                  >
                    <IconWhatsApp className="h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                  <a
                    href="mailto:inquiry@hotsspots.com"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-300 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    <IconMail className="h-3.5 w-3.5" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Question list */}
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <Reveal key={`${activeCategory}-${faq.q}`} delay={i * 0.04}>
                <FAQItem
                  faq={faq}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </Reveal>
            ))}

            {filtered.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center text-sm text-zinc-500">
                No questions in this category yet.
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.15}>
          <div className="mt-20 flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <p className="text-lg font-semibold text-white">Didn&apos;t find what you needed?</p>
              <p className="mt-1 text-sm text-zinc-400">
                Our team responds within 24 hours with a tailored answer.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 hover:shadow-lg hover:shadow-accent/20"
            >
              Ask us anything
              <IconArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FAQItem({
  faq, index, isOpen, onToggle,
}: {
  faq: { q: string; a: string; category: FaqCategory };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    setHeight(isOpen ? el.scrollHeight : 0);
  }, [isOpen, faq.a]);

  return (
    <div
      className={`spotlight-card glass-card group rounded-3xl transition-all duration-300 ${
        isOpen
          ? "border-accent/30 bg-white/[0.04]"
          : "hover:border-white/20"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 p-6 text-left md:p-7"
      >
        {/* Number + content */}
        <div className="flex items-start gap-5">
          <span
            className={`shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
              isOpen ? "text-accent" : "text-zinc-600"
            }`}
          >
            /{String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex-1">
            <h3
              className={`text-base font-semibold leading-snug transition-colors md:text-lg ${
                isOpen ? "text-white" : "text-zinc-200 group-hover:text-white"
              }`}
            >
              {faq.q}
            </h3>
            <p
              className={`mt-1 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-500 transition-opacity ${
                isOpen ? "opacity-0 md:opacity-100" : "opacity-70"
              }`}
            >
              <span className="h-1 w-1 rounded-full bg-zinc-600" />
              {faq.category}
            </p>
          </div>
        </div>

        {/* Chevron / plus icon */}
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all ${
            isOpen
              ? "rotate-45 border-accent/40 bg-accent/15 text-accent"
              : "border-white/10 bg-white/[0.03] text-zinc-400 group-hover:border-white/30 group-hover:text-white"
          }`}
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2}>
            <path d="M8 2v12M2 8h12" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* Animated answer */}
      <div
        style={{
          height: `${height}px`,
          transition: "height 380ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="overflow-hidden"
      >
        <div ref={contentRef}>
          <div className="border-t border-white/5 px-6 pb-6 pt-4 md:px-7">
            <p
              className="ml-9 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base"
              style={{
                transform: isOpen ? "translateY(0)" : "translateY(-8px)",
                opacity: isOpen ? 1 : 0,
                transition: "transform 400ms ease-out, opacity 400ms ease-out",
                transitionDelay: isOpen ? "120ms" : "0ms",
              }}
            >
              {faq.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Footer ─── */
function Footer() {
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
