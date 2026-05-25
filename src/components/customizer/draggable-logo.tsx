"use client";

import { useRef, useState, type PointerEvent, type RefObject } from "react";

interface DraggableLogoProps {
  src: string;
  position: { x: number; y: number };
  scale: number;
  onPositionChange: (next: { x: number; y: number }) => void;
  containerRef: RefObject<HTMLDivElement | null>;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function DraggableLogo({
  src,
  position,
  scale,
  onPositionChange,
  containerRef,
}: DraggableLogoProps) {
  const [dragging, setDragging] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    event.preventDefault();
    event.stopPropagation();
    (event.target as HTMLElement).setPointerCapture(event.pointerId);

    const rect = container.getBoundingClientRect();
    const xPx = (position.x / 100) * rect.width;
    const yPx = (position.y / 100) * rect.height;
    offsetRef.current = {
      x: event.clientX - (rect.left + xPx),
      y: event.clientY - (rect.top + yPx),
    };
    setDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const xPx = event.clientX - rect.left - offsetRef.current.x;
    const yPx = event.clientY - rect.top - offsetRef.current.y;
    const x = clamp((xPx / rect.width) * 100, 6, 94);
    const y = clamp((yPx / rect.height) * 100, 8, 92);
    onPositionChange({ x, y });
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    (event.target as HTMLElement).releasePointerCapture?.(event.pointerId);
    setDragging(false);
  };

  return (
    <div
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${scale}%`,
        maxWidth: 220,
        touchAction: "none",
      }}
    >
      <div
        role="button"
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        className={`group relative cursor-grab select-none rounded-md transition-shadow ${
          dragging
            ? "cursor-grabbing ring-2 ring-accent/70 shadow-lg shadow-accent/30"
            : "hover:ring-2 hover:ring-accent/50"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          draggable={false}
          className="pointer-events-none h-auto w-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
          aria-hidden
        />
      </div>
    </div>
  );
}
