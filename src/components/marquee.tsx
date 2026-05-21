interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="marquee-mask overflow-hidden">
      <div className="marquee">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap text-sm font-medium uppercase tracking-[0.25em] text-zinc-500"
          >
            {item}
            <span className="ml-12 text-accent/40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
