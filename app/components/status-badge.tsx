import { cn } from "./ui/utils";

interface StatusBadgeProps {
  status:
    | "draft"
    | "submitted"
    | "returned"
    | "approved"
    | "pending"
    | "in-review"
    | "completed"
    | "open"
    | "closed";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    draft: { label: "Draft", color: "bg-gray-100 text-gray-700 border-gray-300" },
    submitted: { label: "Submitted", color: "bg-blue-100 text-blue-700 border-blue-300" },
    returned: { label: "Returned", color: "bg-red-100 text-red-700 border-red-300" },
    approved: { label: "Approved", color: "bg-green-100 text-green-700 border-green-300" },
    pending: { label: "Pending", color: "bg-amber-100 text-amber-700 border-amber-300" },
    "in-review": { label: "In Review", color: "bg-purple-100 text-purple-700 border-purple-300" },
    completed: { label: "Completed", color: "bg-green-100 text-green-700 border-green-300" },
    open: { label: "Open", color: "bg-green-100 text-green-700 border-green-300" },
    closed: { label: "Closed", color: "bg-red-100 text-red-700 border-red-300" },
  };

  const config = statusConfig[status];

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full border",
      config.color,
      className
    )}>
      {config.label}
    </span>
  );
}
