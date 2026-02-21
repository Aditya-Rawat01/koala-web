"use client";

import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

export function CopyButton({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="rounded-2xl cursor-pointer
        "
      >
        {copied ? <CopyCheck size={18} /> : <Copy size={18} />}
      </button>
    </div>
  );
}
