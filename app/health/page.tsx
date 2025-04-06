import { Suspense } from "react";
import HealthStats from "@/components/healthcheck/health-stats";
import WebsiteList from "@/components/healthcheck/website-list";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">

      <Suspense fallback={<div>Loading health statistics...</div>}>
        <HealthStats />
      </Suspense>

      <div className="mt-8">
        <WebsiteList />
      </div>
    </div>
  );
}