"use client"

import { useEffect, useRef } from "react"

interface HealthHistoryItem {
  status: string
  responseTimeMs: number | null
  checkedAt: Date
}

interface HealthSummaryProps {
  healthHistory: HealthHistoryItem[]
}

export default function HealthSummary({ healthHistory }: HealthSummaryProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || healthHistory.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const width = canvas.width
    const height = canvas.height
    const barWidth = width / healthHistory.length

    healthHistory.forEach((item, index) => {
      const x = index * barWidth

      // Set color based on status
      let color
      switch (item.status) {
        case "up":
          color = "#10B981" // green-500
          break
        case "down":
          color = "#EF4444" // red-500
          break
        case "redirect":
          color = "#F59E0B" // amber-500
          break
        case "error":
        case "content_error":
          color = "#F97316" // orange-500
          break
        default:
          color = "#6B7280" // gray-500
      }

      ctx.fillStyle = color
      ctx.fillRect(x, 0, barWidth - 1, height)
    })
  }, [healthHistory])

  // Calculate uptime percentage
  const uptimePercentage =
    healthHistory.length > 0
      ? Math.round((healthHistory.filter((item) => item.status === "up").length / healthHistory.length) * 100)
      : 0

  // Calculate average response time
  const responseTimes = healthHistory
    .filter((item) => item.responseTimeMs !== null)
    .map((item) => item.responseTimeMs as number)

  const avgResponseTime =
    responseTimes.length > 0 ? Math.round(responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length) : 0

  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="text-xs text-gray-500">30-day history</div>
        <div className="text-xs font-medium">{uptimePercentage}% uptime</div>
      </div>

      <div className="h-6 rounded overflow-hidden mb-2">
        <canvas ref={canvasRef} width="200" height="24" className="w-full h-full" />
      </div>

      {avgResponseTime > 0 && (
        <div className="text-xs text-gray-500">
          Avg. response time: <span className="font-medium">{avgResponseTime}ms</span>
        </div>
      )}
    </div>
  )
}

