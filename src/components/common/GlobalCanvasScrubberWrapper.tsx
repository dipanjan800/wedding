"use client";

import dynamic from "next/dynamic";

const GlobalCanvasScrubber = dynamic(
  () => import("./GlobalCanvasScrubber"),
  { ssr: false }
);

export default function GlobalCanvasScrubberWrapper() {
  return <GlobalCanvasScrubber />;
}
