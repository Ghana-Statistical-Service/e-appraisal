import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle, XCircle, MessageSquare, Clock } from "lucide-react";

interface AuditEntry {
  id: string;
  action: "approved" | "returned" | "clarification" | "submitted";
  user: string;
  role: string;
  date: string;
  remarks?: string;
}

interface AuditTrailProps {
  entries: AuditEntry[];
}

export function AuditTrail({ entries }: AuditTrailProps) {
  const getIcon = (action: string) => {
    switch (action) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "returned":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "clarification":
        return <MessageSquare className="h-5 w-5 text-amber-600" />;
      case "submitted":
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case "approved":
        return "Approved";
      case "returned":
        return "Returned for Correction";
      case "clarification":
        return "Requested Clarification";
      case "submitted":
        return "Submitted";
      default:
        return action;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Approval History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <div key={entry.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                {getIcon(entry.action)}
                {index < entries.length - 1 && (
                  <div className="w-0.5 h-full bg-border mt-2 flex-1" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p>{getActionLabel(entry.action)}</p>
                    <p className="text-sm text-muted-foreground">
                      by {entry.user} ({entry.role})
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                </div>
                {entry.remarks && (
                  <div className="mt-2 p-3 bg-muted rounded-lg">
                    <p className="text-sm">{entry.remarks}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
