"use client";

import dynamic from "next/dynamic";

const PlaygroundApp = dynamic(
  () => import("@/app/pages/playground").then((m) => m.default),
  { ssr: false }
);

export default function PlaygroundPage() {
  return <PlaygroundApp />;
}
