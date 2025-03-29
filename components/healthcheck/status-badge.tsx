import { cva, type VariantProps } from "class-variance-authority"

const badgeVariants = cva("inline-flex items-center rounded-full font-medium", {
  variants: {
    status: {
      up: "bg-green-100 text-green-800",
      down: "bg-red-100 text-red-800",
      redirect: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
      content_error: "bg-orange-100 text-orange-800",
      too_many_redirects: "bg-yellow-100 text-yellow-800",
    },
    size: {
      default: "px-2.5 py-0.5 text-xs",
      large: "px-3 py-1 text-sm",
    },
  },
  defaultVariants: {
    status: "up",
    size: "default",
  },
})

interface StatusBadgeProps extends VariantProps<typeof badgeVariants> {
  status: string
}

export default function StatusBadge({ status, size }: StatusBadgeProps) {
  const statusText =
    {
      up: "Up",
      down: "Down",
      redirect: "Redirect",
      error: "Error",
      content_error: "Content Error",
      too_many_redirects: "Too Many Redirects",
    }[status] || status

  return <span className={badgeVariants({ status: status as any, size })}>{statusText}</span>
}

