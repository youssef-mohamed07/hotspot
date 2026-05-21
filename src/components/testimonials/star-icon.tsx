export function StarIcon({ filled = false, className = "" }: { filled?: boolean; className?: string }) {
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
