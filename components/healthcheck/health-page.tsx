"use client";

import HealthSummary from "@/components/healthcheck/health-summary";

export default function HealthPage() {
  const healthHistory = [
    { status: "up", responseTimeMs: 120, checkedAt: new Date() },
    { status: "down", responseTimeMs: null, checkedAt: new Date() },
    { status: "redirect", responseTimeMs: 200, checkedAt: new Date() },
  ];

  return <HealthSummary healthHistory={healthHistory} />;
}

