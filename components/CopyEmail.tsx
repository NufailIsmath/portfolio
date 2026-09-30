"use client";

import { useState } from "react";
import { profile } from "@/lib/data";

export default function CopyEmail({ className = "btn" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className={className}
      onClick={() => {
        navigator.clipboard?.writeText(profile.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
      aria-live="polite"
    >
      {copied ? "Copied ✓" : "Copy email"}
    </button>
  );
}
