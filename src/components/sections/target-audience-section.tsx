"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { SectionHeader } from "@/components/section-header";
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
        <span className="font-semibold text-zinc-900 bg-accent/10 px-1.5 py-0.5 rounded-md">
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
        <span className="font-semibold text-zinc-900 bg-accent/10 px-1.5 py-0.5 rounded-md">
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
        People don't take pictures of normal billboards. They{" "}
        <span className="font-semibold text-zinc-900 bg-accent/10 px-1.5 py-0.5 rounded-md">
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
        <span className="font-semibold text-zinc-900 bg-accent/10 px-1.5 py-0.5 rounded-md">
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

  // Track scroll of the 200vh section to map into 4 discrete snaps (faster scrolling)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 0 to 1 across 4 sections.
    // latest * 4 items
    const rawIndex = Math.floor(latest * audienceList.length);
    // cap from 0 to length - 1
    const clampedIndex = Math.max(
      0,
      Math.min(audienceList.length - 1, rawIndex),
    );
    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
  });

  return (
    <section ref={sectionRef} className="relative h-auto md:h-[300vh] bg-transparent py-16 md:py-0">
      {/* Sticky viewport container (only sticky on Desktop) */}
      <div className="md:sticky md:top-0 flex h-auto md:h-screen w-full items-center justify-center px-6">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-24 items-center">
            {/* Left Column - Fixed inside the sticky container */}
            <div className="relative">
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
            </div>

            {/* Right Column */}
            <div className="relative w-full md:h-72 lg:h-80 md:overflow-hidden rounded-3xl">
              {/* Desktop Sliding Track */}
              <motion.div
                animate={{ y: `-${activeIndex * 25}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="hidden md:flex absolute inset-x-0 top-0 flex-col h-[400%] w-full"
              >
                {audienceList.map((item, i) => {
                  const Icon = item.icon;
                  // Make cards slightly transparent if not active to simulate focus
                  const isActive = i === activeIndex;

                  return (
                    <div
                      key={i}
                      className="h-1/4 w-full flex items-center justify-center p-2"
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? 1 : 0.9,
                          opacity: isActive ? 1 : 0.4,
                          y: isActive ? 0 : 20,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        className="w-full flex h-full flex-col justify-center gap-4 rounded-3xl border border-zinc-200/60 bg-white p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] sm:p-8"
                      >
                        <motion.div
                          animate={
                            isActive
                              ? {
                                  y: [0, -4, 0],
                                }
                              : { y: 0 }
                          }
                          transition={
                            isActive
                              ? {
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }
                              : {}
                          }
                          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50 border border-zinc-100 shadow-sm"
                        >
                          <Icon className="h-5 w-5 text-accent" />
                        </motion.div>
                        <div>
                          <motion.h3
                            animate={{ x: isActive ? 0 : -10 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                              delay: 0.1,
                            }}
                            className="text-lg font-bold text-zinc-900 sm:text-xl"
                          >
                            {item.title}
                          </motion.h3>
                          <motion.p
                            animate={{ x: isActive ? 0 : -10 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                              delay: 0.15,
                            }}
                            className="mt-2 text-base leading-relaxed text-zinc-600 sm:text-lg"
                          >
                            {item.description}
                          </motion.p>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Mobile Normal Flex Layout */}
              <div className="flex flex-col gap-6 md:hidden">
                {audienceList.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="w-full flex flex-col justify-center gap-4 rounded-3xl border border-zinc-200/60 bg-white p-6 shadow-sm"
                    >
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50 border border-zinc-100 shadow-sm">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-zinc-900">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-base leading-relaxed text-zinc-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
