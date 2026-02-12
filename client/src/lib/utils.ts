import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Convert hex to rgba for gradients and overlays */
export function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Bright/vibrant accents use 10% tint; others use 15% */
const BRIGHT_ACCENT_IDS = ["firecrawl", "chatbase", "adcreative", "hubspot-ai", "invideo", "originality-ai"];
export function getAccentTintOpacity(id: string): number {
  return BRIGHT_ACCENT_IDS.includes(id) ? 0.1 : 0.15;
}
