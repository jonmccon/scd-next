"use client"

import { useState } from "react"
import StatusBadge from "./status-badge"

interface HealthCheck {
  id: string
  checkedAt: Date
  status: string
  statusCode: number | null
  responseTimeMs: number | null
  redirectUrl: string | null
  finalUrl: string | null
  errorMessage: string | null
  errorType: string | null
  contentType: string | null
  contentIssue: string | null
}

interface HealthCheckTableProps {
  healthChecks: HealthCheck[]
}

export default function HealthCheckTable({ healthChecks }: HealthCheckTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date & Time
            </th>
            <th scope="col" className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Response Time
            </th>
            <th scope="col" className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status Code
            </th>
            <th scope="col" className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Details
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {healthChecks.map((check) => (
            <>
              <tr key={check.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleRow(check.id)}>
                <td className="whitespace-nowrap text-sm text-gray-500">
                  {new Date(check.checkedAt).toLocaleString()}
                </td>
                <td className="whitespace-nowrap">
                  {["up", "down", "warning", "redirect", "content_error"].includes(check.status) ? (
                    <StatusBadge status={check.status as "up" | "down" | "warning" | "redirect" | "content_error"} />
                  ) : (
                    <span className="text-sm text-gray-500">Unknown</span>
                  )}
                </td>
                <td className="whitespace-nowrap text-sm text-gray-500">
                  {check.responseTimeMs ? `${check.responseTimeMs}ms` : "-"}
                </td>
                <td className="whitespace-nowrap text-sm text-gray-500">{check.statusCode || "-"}</td>
                <td className="whitespace-nowrap text-sm text-gray-500">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleRow(check.id)
                    }}
                  >
                    {expandedRow === check.id ? "Hide" : "Show"}
                  </button>
                </td>
              </tr>
              {expandedRow === check.id && (
                <tr className="bg-gray-50">
                  <td colSpan={5} className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {check.redirectUrl && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Redirect URL</h4>
                          <p className="text-sm text-gray-500 break-all">{check.redirectUrl}</p>
                        </div>
                      )}

                      {check.finalUrl && check.finalUrl !== check.redirectUrl && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Final URL</h4>
                          <p className="text-sm text-gray-500 break-all">{check.finalUrl}</p>
                        </div>
                      )}

                      {check.errorMessage && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Error Message</h4>
                          <p className="text-sm text-gray-500">{check.errorMessage}</p>
                        </div>
                      )}

                      {check.errorType && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Error Type</h4>
                          <p className="text-sm text-gray-500">{check.errorType}</p>
                        </div>
                      )}

                      {check.contentType && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Content Type</h4>
                          <p className="text-sm text-gray-500">{check.contentType}</p>
                        </div>
                      )}

                      {check.contentIssue && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Content Issue</h4>
                          <p className="text-sm text-gray-500">{check.contentIssue}</p>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}

