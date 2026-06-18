"use client"

import { useState } from "react"

type GiftButtonProps = {
  href: string
  brand: string
  value: string
  initials: string
  /** Stagger the bob animation so the two buttons aren't perfectly in sync. */
  delay?: number
}

export function GiftButton({ href, brand, value, initials, delay = 0 }: GiftButtonProps) {
  const [pressed, setPressed] = useState(false)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      aria-label={`${value} ${brand} gift card. Enter email and complete deals.`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, oklch(0.62 0.2 350), oklch(0.72 0.19 355), oklch(0.62 0.2 350))",
        animationDelay: `${delay}ms`,
      }}
      className={`gift-bob gift-glow group relative flex w-full items-center gap-3 overflow-hidden rounded-full px-3 py-3.5 text-left transition-transform duration-150 active:scale-[0.97] ${
        pressed ? "scale-[0.97]" : ""
      }`}
    >
      {/* shine sweep */}
      <span aria-hidden className="gift-shine pointer-events-none absolute inset-0" />
      <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-card text-sm font-black text-primary shadow-sm">
        {initials}
      </span>
      <span className="relative flex flex-col leading-tight">
        <span className="text-base font-extrabold text-primary-foreground sm:text-lg">
          {value} {brand} Gift Card
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-primary-foreground/85">
          Enter Email &amp; Complete Deals
        </span>
      </span>
      <span className="relative ml-auto flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-foreground/25 text-primary-foreground transition-transform duration-150 group-hover:translate-x-0.5">
        &rsaquo;
      </span>
    </a>
  )
}
