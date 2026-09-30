"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

// Offset of an IANA zone from UTC, in hours, at a given instant.
function offsetHours(tz: string, at: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(at);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
  return Math.round((asUtc - at.getTime()) / 60000) / 60;
}

const fmt = (tz: string, d: Date) =>
  new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" }).format(d);

const VISITOR_DAY = { start: 9, end: 18 };

export default function TimezoneOverlap() {
  const [now, setNow] = useState<Date | null>(null);
  const [visitorTz, setVisitorTz] = useState("UTC");

  useEffect(() => {
    setVisitorTz(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const d = now ?? new Date(0);
  const diff = offsetHours(profile.timezone, d) - offsetHours(visitorTz, d);
  const { start, end } = profile.workHours;

  // 48 half-hour cells across the visitor's local day.
  const cells = Array.from({ length: 48 }, (_, i) => {
    const local = i / 2;
    const mine = (((local + diff) % 24) + 24) % 24;
    const me = mine >= start && mine < end;
    const you = local >= VISITOR_DAY.start && local < VISITOR_DAY.end;
    return { me, you };
  });
  const overlap = cells.filter((c) => c.me && c.you).length / 2;
  const sameZone = Math.abs(diff) < 0.01;
  const shortTz = visitorTz.split("/").pop()?.replace(/_/g, " ");

  return (
    <div className="tz">
      <div className="tz-clocks">
        <div>
          <span className="eyebrow">My time · {profile.location.split(",")[0]}</span>
          <strong className="mono">{now ? fmt(profile.timezone, d) : "—"}</strong>
        </div>
        <div>
          <span className="eyebrow">Your time · {shortTz}</span>
          <strong className="mono">{now ? fmt(visitorTz, d) : "—"}</strong>
        </div>
      </div>
      <div className="tz-bar" aria-hidden>
        {cells.map((c, i) => (
          <i key={i} className={c.me && c.you ? "both" : c.me ? "me" : c.you ? "you" : ""} />
        ))}
      </div>
      <div className="tz-scale mono" aria-hidden>
        <span>00</span>
        <span>06</span>
        <span>12</span>
        <span>18</span>
        <span>24</span>
      </div>
      <p className="tz-note">
        {now ? (
          sameZone ? (
            <>We share a timezone, so your whole working day overlaps with mine.</>
          ) : (
            <>
              <strong>{overlap}h</strong> of overlap with a 9–6 working day in your timezone. I adjust my
              hours for remote teams, so I can usually join your standups and planning calls.
            </>
          )
        ) : (
          <>Calculating overlap with your timezone…</>
        )}
      </p>
      <div className="tz-legend mono">
        <span><i className="me" />my hours</span>
        <span><i className="you" />your 9–6</span>
        <span><i className="both" />overlap</span>
      </div>
    </div>
  );
}
