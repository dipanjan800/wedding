"use client";

import { useLenis } from "@/hooks/useLenis";

/**
 * Headless component — initializes Lenis smooth scroll engine globally.
 * Renders nothing. Mounted once in the root layout.
 */
export default function LenisProvider() {
  useLenis();
  return null;
}
