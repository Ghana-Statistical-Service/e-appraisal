"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Lock, Save, Send } from "lucide-react";

export function MidYearReview() {
  const [appraiseeSign, setAppraiseeSign] = useState(false);
  const [appraiserSign, setAppraiserSign] = useState(false);

  const targets = [
    { id: "1", target: "Complete quarterly statistical reports", progress: "", remarks: "" },
    { id: "2", target: "Implement new data collection methodology", progress: "", remarks: "" },
    { id: "3", target: "Train 10 junior staff on statistical software", progress: "", remarks: "" },
  ];

  const competencies = [
    { id: "1", name: "Organisation & Management", progress: "", remarks: "" },
    { id: "2", name: "Innovation & Strategic Thinking", progress: "", remarks: "" },
    { id: "3", name: "Leadership & Decision Making", progress: "", remarks: "" },
    { id: "4", name: "Communication", progress: "", remarks: "" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Mid-Year Review</h1>
        <p className="text-muted-foreground">Section 3: Review progress on targets and competencies</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progress Review</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="targets" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="targets">Targets Progress</TabsTrigger>
              <TabsTrigger value="competencies">Competency Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="targets" className="space-y-4 mt-6">
              {targets.map((target, index) => (
                <div key={target.id} className="p-4 border border-border rounded-lg space-y-4">
                  <div>
                    <h4>Target {index + 1}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{target.target}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`target-progress-${target.id}`}>Progress</Label>
                    <Textarea
                      id={`target-progress-${target.id}`}
                      placeholder="Describe your progress towards this target..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`target-remarks-${target.id}`}>Remarks</Label>
                    <Textarea
                      id={`target-remarks-${target.id}`}
                      placeholder="Any additional remarks or challenges..."
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="competencies" className="space-y-4 mt-6">
              {competencies.map((competency, index) => (
                <div key={competency.id} className="p-4 border border-border rounded-lg space-y-4">
                  <div>
                    <h4>Competency {index + 1}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{competency.name}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`competency-progress-${competency.id}`}>Progress Notes</Label>
                    <Textarea
                      id={`competency-progress-${competency.id}`}
                      placeholder="Describe your development in this competency..."
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Digital Signatures */}
      <Card>
        <CardHeader>
          <CardTitle>Digital Signatures</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Label>Appraisee Signature</Label>
                {appraiseeSign && <Lock className="h-4 w-4 text-green-600" />}
              </div>
              {!appraiseeSign ? (
                <Button
                  onClick={() => setAppraiseeSign(true)}
                  variant="outline"
                  className="w-full"
                >
                  Sign Document
                </Button>
              ) : (
                <div className="p-3 bg-green-50 border border-green-200 rounded text-center">
                  <p className="text-sm">Signed by Ahmed Salim Adam</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Label>Appraiser Signature</Label>
                {appraiserSign && <Lock className="h-4 w-4 text-green-600" />}
              </div>
              {!appraiserSign ? (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded text-center">
                  <p className="text-sm text-muted-foreground">Awaiting appraiser signature</p>
                </div>
              ) : (
                <div className="p-3 bg-green-50 border border-green-200 rounded text-center">
                  <p className="text-sm">Signed by Kwesi Eshun</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {appraiseeSign && appraiserSign && (
            <div className="p-4 bg-green-50 border border-green-300 rounded-lg text-center">
              <p className="text-green-700">✓ Mid-Year Review Completed</p>
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
          Submit to Appraiser
        </Button>
      </div>
    </div>
  );
}

export default function Page() {
  return <MidYearReview />;
}
