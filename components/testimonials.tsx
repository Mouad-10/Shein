"use client"

import { useRef } from "react"

const REVIEWS = [
  { src: "/reviews/review4.webp", alt: "Instagram message thanking for the $750 Sephora gift card" },
  { src: "/reviews/review5.webp", alt: "Instagram message about a Sephora gift card that just arrived" },
  { src: "/reviews/review3.webp", alt: "Instagram message about a SHEIN coupon and private haul" },
  { src: "/reviews/review1.webp", alt: "Instagram message thanking for the gift card with SHEIN package" },
  { src: "/reviews/review2.webp", alt: "DM me your claims so I can feature it here" },
]

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: number) => {
    const el = scrollerRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollBy({ left: dir * amount, behavior: "smooth" })
  }

  return (
    <section className="mt-10 w-full">
      <h2 className="text-center text-2xl font-extrabold text-primary text-balance">
        SHEIN Top Claims of the Week
      </h2>
      <p className="mt-1 flex items-center justify-center gap-1.5 text-center text-sm font-medium text-muted-foreground">
        Real results from real people! <span aria-hidden>💗</span>
      </p>
      <p className="mt-1 text-center text-xs font-medium text-primary/70">&larr; swipe to see more &rarr;</p>

      <div className="relative mt-5">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous testimonials"
          className="absolute left-0 top-1/2 z-10 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-card/90 text-primary shadow-sm backdrop-blur-sm sm:flex"
        >
          &larr;
        </button>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((r) => (
            <div
              key={r.src}
              className="w-[72%] shrink-0 snap-center overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm sm:w-[46%]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={r.src || "/placeholder.svg"}
                alt={r.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next testimonials"
          className="absolute right-0 top-1/2 z-10 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-card/90 text-primary shadow-sm backdrop-blur-sm sm:flex"
        >
          &rarr;
        </button>
      </div>
    </section>
  )
}
