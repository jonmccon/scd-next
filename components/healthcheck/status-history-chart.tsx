"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

// Register Chart.js components
Chart.register(...registerables)

interface HealthCheck {
  checkedAt: Date
  status: string
}

interface StatusHistoryChartProps {
  data: HealthCheck[]
}

export default function StatusHistoryChart({ data }: StatusHistoryChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Map status to numeric values for visualization
    // 1 = up, 0 = down/error/etc.
    const statusValues = data.map((item) => (item.status === "up" ? 1 : 0))

    // Prepare data for chart
    const labels = data.map((item) => new Date(item.checkedAt).toLocaleDateString())

    // Create chart
    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Status",
            data: statusValues,
            backgroundColor: statusValues.map((value) => (value === 1 ? "#10B981" : "#EF4444")),
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 1,
            ticks: {
              callback: (value) => (value === 1 ? "Up" : "Down"),
            },
          },
          x: {
            ticks: {
              maxRotation: 45,
              minRotation: 45,
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: (tooltipItems) => {
                const index = tooltipItems[0].dataIndex
                return new Date(data[index].checkedAt).toLocaleString()
              },
              label: (context) => {
                const status = data[context.dataIndex].status
                return `Status: ${status.charAt(0).toUpperCase() + status.slice(1)}`
              },
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return (
    <div className="w-full h-64">
      <canvas ref={chartRef} />
    </div>
  )
}

