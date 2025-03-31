interface StatusBadgeProps {
  status: string
  size?: "default" | "large"
}

export default function StatusBadge({ status, size = "default" }: StatusBadgeProps) {
  // Get status-specific classes
  const getStatusClasses = (status: string): string => {
    switch (status) {
      case "up":
        return "bg-green-100 text-green-800"
      case "down":
        return "bg-red-100 text-red-800"
      case "redirect":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "content_error":
        return "bg-orange-100 text-orange-800"
      case "too_many_redirects":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get size-specific classes
  const getSizeClasses = (size: "default" | "large"): string => {
    switch (size) {
      case "large":
        return "px-3 py-1 text-sm"
      default:
        return "px-2.5 py-0.5 text-xs"
    }
  }

  // Format the status text for display
  const statusText =
    {
      up: "Up",
      down: "Down",
      redirect: "Redirect",
      error: "Error",
      content_error: "Content Error",
      too_many_redirects: "Too Many Redirects",
    }[status] || status

  // Combine all classes
  const classes = `inline-flex items-center rounded-full font-medium ${getStatusClasses(status)} ${getSizeClasses(size)}`

  return <span className={classes}>{statusText}</span>
}

