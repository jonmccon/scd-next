import { Suspense } from "react";
import HealthStats from "@/components/healthcheck/health-stats";
import WebsiteList from "@/components/healthcheck/website-list";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Website Health Dashboard</h1>

      <Suspense fallback={<div>Loading health statistics...</div>}>
        <HealthStats />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <WebsiteList />
      </div>
    </div>
  );
}