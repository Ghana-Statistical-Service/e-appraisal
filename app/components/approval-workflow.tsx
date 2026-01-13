import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle, Clock, Circle } from "lucide-react";

interface WorkflowStep {
  role: string;
  name: string;
  status: "completed" | "current" | "pending";
  date?: string;
}

interface ApprovalWorkflowProps {
  steps: WorkflowStep[];
  userType: "staff" | "sectional_head" | "director";
}

export function ApprovalWorkflow({ steps, userType }: ApprovalWorkflowProps) {
  const getWorkflowLabel = (type: string) => {
    switch (type) {
      case "staff":
        return "Staff Appraisal Workflow";
      case "sectional_head":
        return "Sectional Head Appraisal Workflow";
      case "director":
        return "Director Appraisal Workflow";
      default:
        return "Appraisal Workflow";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getWorkflowLabel(userType)}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.role} className="flex gap-4">
              <div className="flex flex-col items-center">
                {step.status === "completed" ? (
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                ) : step.status === "current" ? (
                  <div className="w-10 h-10 rounded-full bg-[#17B8A6] flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Circle className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                {index < steps.length - 1 && (
                  <div
                    className={`w-0.5 h-12 mt-2 ${
                      step.status === "completed" ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 pb-4">
                <h4>{step.role}</h4>
                <p className="text-sm text-muted-foreground">{step.name}</p>
                {step.date && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(step.date).toLocaleDateString()}
                  </p>
                )}
                {step.status === "current" && (
                  <div className="mt-2 inline-flex items-center px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">
                    Awaiting Action
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
