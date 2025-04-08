export default function StatusBadge({ status }: { status: 'up' | 'down' | 'warning' | 'redirect' | 'content_error' }) {
  const statusClasses = {
    up: "bg-green-100 text-green-800",
    down: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    redirect: "bg-blue-100 text-blue-800",
    content_error: "bg-orange-100 text-orange-800",
  };

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        statusClasses[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
}

