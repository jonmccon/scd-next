"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

// Register Chart.js components
Chart.register(...registerables)

interface HealthCheck {
  checkedAt: Date
  responseTimeMs: number | null
  status: string
}

interface ResponseTimeChartProps {
  data: HealthCheck[]
}

export default function ResponseTimeChart({ data }: ResponseTimeChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Filter out entries with no response time
    const validData = data.filter((item) => item.responseTimeMs !== null)

    if (validData.length === 0) return

    // Prepare data for chart
    const labels = validData.map((item) => new Date(item.checkedAt).toLocaleDateString())

    const responseTimeData = validData.map((item) => item.responseTimeMs)

    // Create chart
    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Response Time (ms)",
            data: responseTimeData,
            borderColor: "#3B82F6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Response Time (ms)",
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
                return new Date(validData[index].checkedAt).toLocaleString()
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

