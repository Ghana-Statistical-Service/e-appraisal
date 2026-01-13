"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Save, Send } from "lucide-react";

export function AssessmentDecision() {
  const [decision, setDecision] = useState("");
  const [notes, setNotes] = useState("");

  const decisions = [
    {
      value: "outstanding",
      label: "Outstanding – Promote immediately",
      description: "Exceptional performance, ready for immediate promotion",
    },
    {
      value: "suitable",
      label: "Suitable for promotion",
      description: "Strong performance, suitable for promotion when position available",
    },
    {
      value: "likely",
      label: "Likely ready in 2–3 years",
      description: "Good performance, needs further development before promotion",
    },
    {
      value: "not-ready",
      label: "Not ready for promotion",
      description: "Performing at current level, not yet ready for advancement",
    },
    {
      value: "unlikely",
      label: "Unlikely to be promoted further",
      description: "Performance does not warrant promotion consideration",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Assessment Decision</h1>
        <p className="text-muted-foreground">Section 8: Promotion readiness assessment</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Promotion Readiness</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={decision} onValueChange={setDecision} className="space-y-4">
            {decisions.map((item) => (
              <div
                key={item.value}
                className={`flex items-start space-x-3 p-4 border rounded-lg transition-colors ${
                  decision === item.value
                    ? "border-[#382873] bg-[#382873]/5"
                    : "border-border hover:bg-muted/50"
                }`}
              >
                <RadioGroupItem value={item.value} id={item.value} className="mt-1" />
                <div className="flex-1">
                  <Label
                    htmlFor={item.value}
                    className="cursor-pointer"
                  >
                    {item.label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supporting Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="decision-notes">
              Justification for Assessment Decision
            </Label>
            <Textarea
              id="decision-notes"
              placeholder="Provide detailed reasoning for your assessment decision, including strengths, areas for improvement, and development recommendations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
            />
            <p className="text-sm text-muted-foreground">
              This information will be used by HR and management for succession planning
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Decision Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {decision ? (
            <div className="p-4 bg-[#17B8A6]/5 border border-[#17B8A6]/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Selected Decision:</p>
              <p>
                {decisions.find((d) => d.value === decision)?.label}
              </p>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center text-muted-foreground">
              Please select a promotion readiness decision above
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" className="gap-2">
          <Save className="h-4 w-4" />
          Save Draft
        </Button>
        <Button className="bg-[#382873] hover:bg-[#4A3599] gap-2">
          <Send className="h-4 w-4" />
          Submit Decision
        </Button>
      </div>
    </div>
  );
}

export default function Page() {
  return <AssessmentDecision />;
}
