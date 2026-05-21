export const processSteps = [
  {
    n: "01",
    title: "Brief & Discovery",
    blurb:
      "We listen to your goals, audience and dates. Output: a sharp creative direction and a watertight technical scope.",
    bullets: ["Goals & KPIs alignment", "Audience & venue mapping", "Constraints & permits"],
    duration: "Day 1–3",
  },
  {
    n: "02",
    title: "Design & Concept",
    blurb:
      "Vehicle wraps, LED content, lighting plots and on-truck experiences — designed around your brand.",
    bullets: ["Wrap & rooftop concepts", "Custom LED content", "Interactive moments"],
    duration: "Week 1",
  },
  {
    n: "03",
    title: "Production & Build",
    blurb:
      "Wrap install, content production, hardware prep, rehearsal. Every cue is dry-run before we ship.",
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
    blurb:
      "Full technical crew running the activation — content, lighting, social capture, audience engagement.",
    bullets: ["Live operators on board", "Real-time content", "Social capture team"],
    duration: "Activation window",
  },
  {
    n: "06",
    title: "Wrap Report",
    blurb:
      "Footage, KPIs, social listening and recommendations — delivered within 5 business days.",
    bullets: ["Hero film + raw footage", "Engagement & reach data", "Next-campaign roadmap"],
    duration: "+5 days",
  },
] as const;
