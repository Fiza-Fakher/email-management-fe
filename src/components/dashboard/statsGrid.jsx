import React, { useMemo } from "react";
import { INITIAL_EMAILS } from "../../constant/index";

export default function StatsGrid() {
  const stats = useMemo(() => {
    const total = INITIAL_EMAILS.length;
    const authorized = INITIAL_EMAILS.filter((e) => e.status === "Authorized").length;
    const pending = INITIAL_EMAILS.filter((e) => e.status === "Pending").length;
    const rejected = INITIAL_EMAILS.filter((e) => e.status === "Rejected").length;

    return [
      {
        label: "Total Emails",
        value: total,
        labelClass: "text-[color:var(--text-secondary)]",
        valueClass: "text-[color:var(--text-primary)]",
        style: { background: "var(--bg-secondary)", borderColor: "var(--border)" },
      },
      {
        label: "Authorized",
        value: authorized,
        labelClass: "text-green-700",
        valueClass: "text-green-700",
        style: { background: "var(--bg-secondary)", borderColor: "rgba(22,163,74,.35)" },
      },
      {
        label: "Pending",
        value: pending,
        labelClass: "text-amber-700",
        valueClass: "text-amber-700",
        style: {
          background: "rgba(245,158,11,.08)",
          borderColor: "rgba(245,158,11,.35)",
        },
      },
      {
        label: "Rejected",
        value: rejected,
        labelClass: "text-red-700",
        valueClass: "text-red-700",
        style: {
          background: "rgba(239,68,68,.06)",
          borderColor: "rgba(239,68,68,.35)",
        },
      },
    ];
  }, []);

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="
            rounded-xl border p-4 shadow-sm
            transition-all duration-300 ease-out
            hover:-translate-y-1 hover:shadow-lg
          "
          style={s.style}
        >
          <div className={`text-md ${s.labelClass}`}>{s.label}</div>
          <div className={`mt-1 text-3xl font-extrabold ${s.valueClass}`}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}