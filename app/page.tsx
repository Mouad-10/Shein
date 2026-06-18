import { headers } from "next/headers"
import { getCountryName, isRewardAvailable } from "@/lib/countries"
import { GiftButton } from "@/components/gift-button"
import { Testimonials } from "@/components/testimonials"
import { Particles } from "@/components/particles"

export const dynamic = "force-dynamic"

const SHEIN_URL = "https://giftclick.org/aff_c?offer_id=76&aff_id=164614"
const SEPHORA_URL = "https://linkthem.net/aff_c?offer_id=163&aff_id=164614"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ cc?: string }>
}) {
  const h = await headers()
  const { cc } = await searchParams
  // Vercel sets x-vercel-ip-country with the visitor's 2-letter ISO country code.
  // `?cc=US` can be used to preview a specific region.
  const countryCode =
    cc ||
    h.get("x-vercel-ip-country") ||
    h.get("cf-ipcountry") ||
    h.get("x-country-code") ||
    ""
  const countryName = getCountryName(countryCode)
  const codeLabel = countryCode ? countryCode.toUpperCase() : "your region"
  const available = isRewardAvailable(countryCode)

  const steps = [
    { title: "Click A Button Above", sub: "Start your gift card claim process" },
    { title: "Enter Your Email & Basic Info", sub: "We need this to send your gift card" },
    { title: "Complete Recommended Deals", sub: "(Higher value deals = faster rewards!)" },
    { title: "Claim Your Gift Card!", sub: "Your reward is waiting for you!" },
  ]

  return (
    <main className="relative flex min-h-dvh flex-col items-center px-4 py-8">
      <Particles />
      <div className="flex w-full max-w-md flex-col items-center">
        {/* Hero */}
        <div className="relative mb-4 flex size-16 items-center justify-center rounded-full bg-card text-card-foreground shadow-md">
          <span className="text-3xl font-black">$</span>
          <span aria-hidden className="absolute -right-1 -top-1 text-lg">
            ✨
          </span>
        </div>

        {available ? (
          <>
            <h1 className="text-center text-3xl font-extrabold text-primary text-balance">
              Claim Your Gift Card Now!
            </h1>
            <p className="mt-1 text-center text-sm font-medium text-muted-foreground">
              Higher value deals = faster rewards!
            </p>

            {/* CTA buttons */}
            <div className="mt-6 flex w-full flex-col gap-4">
              <GiftButton href={SHEIN_URL} brand="SHEIN" value="$750" initials="S" delay={0} />
              <GiftButton href={SEPHORA_URL} brand="SEPHORA" value="$750" initials="SE" delay={400} />
            </div>

            {/* How it works */}
            <section className="mt-8 w-full rounded-3xl border border-border/60 bg-card/80 p-3 shadow-sm backdrop-blur-sm">
              <ol className="flex flex-col gap-3">
                {steps.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-4 py-3"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                      {i + 1}
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-sm font-bold text-foreground">{step.title}</span>
                      <span className="text-xs font-medium text-muted-foreground">{step.sub}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            <p className="mt-4 max-w-sm text-center text-[11px] font-medium leading-relaxed text-muted-foreground">
              * Terms and conditions apply. Gift card values may vary based on completed offers.
            </p>

            {/* Availability badge */}
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-foreground">
              <span aria-hidden>✅</span>
              Reward available in {countryName}
              <span className="text-muted-foreground">{codeLabel}</span>
            </p>

            <Testimonials />
          </>
        ) : (
          <>
            <h1 className="text-center text-2xl font-extrabold text-foreground text-balance">
              Reward Not Available
            </h1>
            <p className="mt-2 max-w-sm text-center text-sm font-medium text-muted-foreground text-pretty">
              Unfortunately this gift card offer isn&apos;t available in your region right now.
            </p>

            <div
              className="mt-6 flex w-full items-center gap-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-4"
              role="alert"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-destructive text-2xl font-bold leading-none text-primary-foreground">
                &times;
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-base font-bold text-destructive">Not available in {countryName}</span>
                <span className="text-sm text-muted-foreground">
                  Offer limited to select regions <span className="font-medium">{codeLabel}</span>
                </span>
              </span>
            </div>

            <p className="mt-4 text-center text-xs font-medium text-muted-foreground">
              This reward is currently available in the US, UK, Canada, and Australia only.
            </p>
          </>
        )}
      </div>
    </main>
  )
}
