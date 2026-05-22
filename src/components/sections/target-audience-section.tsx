"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { AudienceCard } from "@/components/target-audience/audience-card";
import {
  IconSparkle,
  IconCamera,
  IconVenue,
  IconWave,
} from "@/components/icons";

const audienceList = [
  {
    title: "Launching a New Product",
    description: (
      <>
        Make an{" "}
        <span className="rounded-md bg-accent/10 px-1.5 py-0.5 font-semibold text-accent-deep">
          unforgettable statement
        </span>{" "}
        that drives immediate awareness and curiosity from the first second.
      </>
    ),
    icon: IconSparkle,
  },
  {
    title: "Opening a New Location",
    description: (
      <>
        <span className="rounded-md bg-accent/10 px-1.5 py-0.5 font-semibold text-accent-deep">
          Dominate the local physical area
        </span>{" "}
        and drive foot traffic directly to your front doors.
      </>
    ),
    icon: IconVenue,
  },
  {
    title: "Seeking Viral Engagement",
    description: (
      <>
        People don&apos;t take pictures of normal billboards. They{" "}
        <span className="rounded-md bg-accent/10 px-1.5 py-0.5 font-semibold text-accent-deep">
          film this and share it natively
        </span>
        .
      </>
    ),
    icon: IconCamera,
  },
  {
    title: "Dominating Major Events",
    description: (
      <>
        <span className="rounded-md bg-accent/10 px-1.5 py-0.5 font-semibold text-accent-deep">
          Stand out effortlessly
        </span>{" "}
        outside conferences, concerts, and massive festivals across the country.
      </>
    ),
    icon: IconWave,
  },
];

export function TargetAudienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const rawIndex = Math.floor(latest * audienceList.length);
    const clampedIndex = Math.max(0, Math.min(audienceList.length - 1, rawIndex));
    if (clampedIndex !== activeIndex) setActiveIndex(clampedIndex);
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-auto bg-[#fafafa] py-16 md:h-[300vh] md:py-0"
    >
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply" aria-hidden />

      <div className="md:sticky md:top-0 flex h-auto w-full items-center justify-center px-6 md:h-screen">
        <div className="relative mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div>
              <SectionHeader
                variant="normal"
                title="Is this for you?"
                theme="light"
                headline={
                  <>
                    This Cybertruck is
                    <br />
                    made for you{" "}
                    <span className="text-accent italic">if...</span>
                  </>
                }
                subtitle="It's not just a digital billboard. It's a statement piece designed strictly for brands that refuse to blend in."
              />

              <div className="mt-10 hidden gap-2 md:flex">
                {audienceList.map((item, i) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition ${
                      i === activeIndex
                        ? "bg-accent text-white"
                        : "bg-zinc-200/80 text-zinc-500 hover:bg-zinc-200"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full md:h-80 lg:h-[22rem] md:overflow-hidden">
              <motion.div
                animate={{ y: `-${activeIndex * 25}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-x-0 top-0 hidden h-[400%] w-full flex-col md:flex"
              >
                {audienceList.map((item, i) => (
                  <div key={item.title} className="flex h-1/4 w-full items-center p-2">
                    <AudienceCard
                      index={i}
                      total={audienceList.length}
                      title={item.title}
                      description={item.description}
                      icon={item.icon}
                      active={i === activeIndex}
                    />
                  </div>
                ))}
              </motion.div>

              <div className="flex flex-col gap-5 md:hidden">
                {audienceList.map((item, i) => (
                  <AudienceCard
                    key={item.title}
                    index={i}
                    total={audienceList.length}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    active={i === activeIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
