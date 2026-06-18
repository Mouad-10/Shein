// Maps a 2-letter ISO country code to a human-friendly display name.
const REGION_NAMES =
  typeof Intl !== "undefined" && "DisplayNames" in Intl
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null

export function getCountryName(code: string | undefined | null): string {
  if (!code) return "your area"
  const upper = code.toUpperCase()
  try {
    const name = REGION_NAMES?.of(upper)
    return name && name !== upper ? name : upper
  } catch {
    return upper
  }
}

// Countries where the reward is available.
export const ALLOWED_COUNTRIES = ["GB", "AU", "US", "CA"] as const

export function isRewardAvailable(code: string | undefined | null): boolean {
  if (!code) return false
  return (ALLOWED_COUNTRIES as readonly string[]).includes(code.toUpperCase())
}
