"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import {
  IconArrowRight,
  IconBolt,
  IconBuilding,
  IconChevronDown,
  IconCube,
  IconGlobe,
  IconMail,
  IconMapPin,
  IconPhone,
  IconQuote,
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
  "Mobily", "STC", "NEOM", "Aramco", "SABIC", "Riyadh Season",
  "MDL Beast", "Hikma", "Red Sea Film", "Ministry of Culture",
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
  { quote: "The Cybertruck activation generated more social impressions in one weekend than our entire Q3 digital campaign.", author: "Sara Al-Dosari", role: "Marketing Director" },
  { quote: "From brief to delivery, HotSpot ran the entire production. Zero coordination headaches on our side.", author: "Mohammed Al-Rashid", role: "VP Events" },
  { quote: "Crowds gathered before the truck even parked. The visual presence is on another level.", author: "Khalid Mansour", role: "Head of Production" },
];

// Cities with approximate normalized positions on a stylized KSA map (% from top-left)
const cities = [
  { name: "Riyadh",  region: "Central",   x: 56, y: 50, hub: true },
  { name: "Jeddah",  region: "Western",   x: 26, y: 58, hub: true },
  { name: "Mecca",   region: "Western",   x: 28, y: 62 },
  { name: "Medina",  region: "Western",   x: 30, y: 45 },
  { name: "AlUla",   region: "Western",   x: 32, y: 35 },
  { name: "NEOM",    region: "North-West", x: 18, y: 22 },
  { name: "Dammam",  region: "Eastern",   x: 78, y: 38, hub: true },
  { name: "Khobar",  region: "Eastern",   x: 80, y: 42 },
];

const faqs = [
  { q: "Can the Cybertruck be customized?", a: "Yes — full vehicle wraps, rooftop decorations, LED cube screens, flowers, balloons, and modular setups. Every activation is designed around your brand." },
  { q: "Is it suitable for indoor events?", a: "Absolutely. The Cybertruck fits through standard loading docks and is engineered for both indoor malls and outdoor festivals." },
  { q: "Do you provide operators & setup?", a: "Every activation includes a full technical crew — from delivery and setup to live operation and strike." },
  { q: "Can we integrate our campaign digitally?", a: "Yes. We support live social media feeds, custom apps, QR activations, AI photo booths, and real-time audience engagement tools." },
  { q: "Is it available across Saudi Arabia?", a: "We operate nationwide — Riyadh, Jeddah, Dammam, and everywhere in between. Contact us for availability." },
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
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">The strongest marketing tool</p>
            <h2 className="display-headline mt-4 text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
              The most powerful<br />
              marketing tool in the<br />
              <span className="text-gradient-accent">Saudi market.</span>
            </h2>
            <p className="mt-8 max-w-lg text-lg text-zinc-400">
              Traditional advertising gets ignored. The HotSpot Cybertruck moves through your audience&apos;s daily life — at malls, events, business districts and national campaigns — generating attention, engagement and viral content that paid media simply can&apos;t buy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Mobile Reach", "Crowd Magnet", "Viral by Design", "Premium Presence"].map((tag) => (
                <span key={tag} className="glass-light rounded-full px-4 py-2 text-xs text-zinc-300">{tag}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { num: "01", label: "Attention", desc: "People stop and look" },
                { num: "02", label: "Engagement", desc: "They walk over and interact" },
                { num: "03", label: "Virality", desc: "They film it and share it" },
                { num: "04", label: "Recall", desc: "They remember your brand" },
              ].map((item) => (
                <div key={item.num} className="spotlight-card glass-card rounded-2xl p-6 hover:border-white/20">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">/{item.num}</p>
                  <p className="mt-3 text-lg font-semibold text-white">{item.label}</p>
                  <p className="mt-1 text-xs text-zinc-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Proof of Concept — Logo Slider ─── */
function ProofOfConceptSection() {
  return (
    <section className="relative border-y border-white/5 bg-black/40 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Proof of concept</p>
          <h2 className="display-headline mt-3 text-2xl text-white sm:text-3xl md:text-4xl">
            Our solutions trusted by
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Marquee items={trustedClients} />
        </Reveal>
      </div>
    </section>
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
  const [autoRotate, setAutoRotate] = useState(true);
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
              <CybertruckScene autoRotate={autoRotate} onAutoRotateChange={setAutoRotate} />
            </div>
            {/* Bottom controls */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between p-6">
              <div className="glass pointer-events-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-zinc-300">
                <span className="pulse-dot" />
                Drag · Zoom · Explore
              </div>
              <button
                onClick={() => setAutoRotate((v) => !v)}
                className="glass pointer-events-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-zinc-200 transition hover:bg-white/10"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${autoRotate ? "bg-accent-soft animate-pulse" : "bg-zinc-500"}`} />
                {autoRotate ? "Rotating" : "Paused"}
              </button>
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

/* ─── 8. Other Services Linked With Our Cybertruck ─── */
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
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Client voices</p>
          <h2 className="display-headline mt-4 text-4xl text-white sm:text-5xl md:text-6xl">
            What our<br />
            <span className="text-gradient-accent">partners say.</span>
          </h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.08}>
              <div className="spotlight-card glass-card flex h-full flex-col rounded-3xl p-8 hover:border-white/20">
                <IconQuote className="h-8 w-8 text-accent/30" />
                <p className="mt-6 flex-1 text-base leading-relaxed text-zinc-300">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-8 border-t border-white/5 pt-6">
                  <p className="text-sm font-semibold text-white">{t.author}</p>
                  <p className="mt-1 text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
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

      {/* Country silhouette */}
      <svg
        viewBox="0 0 100 75"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient id="ksa-fill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#2a76a6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#04285f" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="ksa-stroke" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#5ba3d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2a76a6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Stylized KSA outline (approximate silhouette) */}
        <path
          d="M 18 18
             L 24 14
             L 30 12
             L 38 14
             L 44 18
             L 50 16
             L 60 18
             L 70 22
             L 78 26
             L 84 32
             L 86 40
             L 84 46
             L 80 50
             L 76 50
             L 72 56
             L 68 60
             L 60 64
             L 50 66
             L 38 66
             L 30 62
             L 24 56
             L 22 50
             L 24 44
             L 22 38
             L 18 32
             L 16 26
             Z"
          fill="url(#ksa-fill)"
          stroke="url(#ksa-stroke)"
          strokeWidth={0.4}
          strokeLinejoin="round"
        />
      </svg>

      {/* City pins */}
      {cities.map((city) => (
        <CityPin key={city.name} city={city} />
      ))}

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

function CityPin({ city }: { city: { name: string; x: number; y: number; hub?: boolean } }) {
  const size = city.hub ? "h-3 w-3" : "h-2 w-2";
  const ringSize = city.hub ? "h-8 w-8" : "h-6 w-6";
  return (
    <div
      className="group absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${city.x}%`, top: `${city.y}%` }}
    >
      {/* Pulse ring */}
      <span
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${ringSize} rounded-full border border-accent/50`}
        style={{ animation: city.hub ? "city-pulse 2.4s ease-out infinite" : "city-pulse 3.2s ease-out infinite" }}
        aria-hidden
      />
      {/* Dot */}
      <span
        className={`relative block ${size} rounded-full bg-accent shadow-[0_0_12px_rgba(42,118,166,0.9)] transition group-hover:scale-150`}
      />
      {/* Tooltip */}
      <div className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap opacity-0 transition group-hover:opacity-100">
        <div className="glass-strong rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white">
          {city.name}
        </div>
      </div>
    </div>
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
      className={`${cardBase} ${active ? cardSelected : cardIdle} text-left`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">{label}</p>
          {description && <p className="mt-1 text-xs leading-relaxed text-zinc-500">{description}</p>}
        </div>
        {kbd && (
          <span className="font-mono text-[10px] text-zinc-600">{kbd}</span>
        )}
      </div>
      <span
        className={`absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full transition ${
          active ? "bg-accent text-white" : "border border-white/15 text-transparent"
        }`}
      >
        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M2.5 6.5l2.5 2.5L9.5 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
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
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">FAQ</p>
          <h2 className="display-headline mt-4 text-4xl text-white sm:text-5xl">
            Common<br />
            <span className="text-gradient-accent">questions.</span>
          </h2>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.05}>
              <details className="group glass-card rounded-2xl">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <IconChevronDown className="h-5 w-5 shrink-0 text-zinc-500 transition group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-sm leading-relaxed text-zinc-400">
                  {faq.a}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
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
