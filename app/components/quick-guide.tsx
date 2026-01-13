import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Info } from "lucide-react";

export function QuickGuide() {
  const tips = [
    "Complete your performance planning section first to set clear objectives",
    "Mid-year reviews help track progress and adjust goals as needed",
    "Digital signatures lock sections once approved - review carefully",
    "Use the save draft feature to continue work later",
    "Your appraiser must review and approve each section before final submission",
  ];

  return (
    <Card className="bg-[#382873]/5 border-[#382873]/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-[#382873]" />
          <CardTitle>Quick Guide</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex gap-2 text-sm">
              <span className="text-[#17B8A6]">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
