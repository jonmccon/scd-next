"use client";

import { useEffect, useState } from "react";
import { DashboardPageProps } from "@/app/health/page"; // Import the parent interface

type HealthStatsData = DashboardPageProps["healthStats"]; // Extract the healthStats type

export default function HealthStats({ data }: { data: HealthStatsData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard title="Total Websites" value={data.totalChecked.toString()} description="Websites being monitored" />
      <StatCard
        title="Uptime"
        value={`${data.uptimePercentage}%`}
        description="Websites currently up"
        color={data.uptimePercentage > 95 ? "green" : data.uptimePercentage > 80 ? "yellow" : "red"}
      />
      <StatCard
        title="Issues"
        value={data.issues.toString()}
        description="Websites with problems"
        color={data.issues > 0 ? "red" : "green"}
      />
      <StatCard title="Last Check" value={new Date().toLocaleDateString()} description="Most recent health check" />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  color?: "green" | "yellow" | "red" | "blue";
}

function StatCard({ title, value, description, color = "blue" }: StatCardProps) {
  // Get color-specific classes
  const getColorClasses = (color: string): string => {
    switch (color) {
      case "blue":
        return "bg-blue-50 text-blue-700";
      case "green":
        return "bg-green-50 text-green-700";
      case "yellow":
        return "bg-yellow-50 text-yellow-700";
      case "red":
        return "bg-red-50 text-red-700";
      default:
        return "bg-blue-50 text-blue-700";
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className={`text-3xl font-bold ${getColorClasses(color)} inline-block px-2 py-1 rounded`}>{value}</div>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}

