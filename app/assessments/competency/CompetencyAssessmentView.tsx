"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible";
import { ChevronDown, Save, Send } from "lucide-react";

interface Competency {
  id: string;
  name: string;
  weight: number;
  score: number;
  comments: string;
}

function CompetencyAssessment() {
  const [coreOpen, setCoreOpen] = useState(true);
  const [nonCoreOpen, setNonCoreOpen] = useState(true);

  const [coreCompetencies, setCoreCompetencies] = useState<Competency[]>([
    { id: "1", name: "Organisation & Management", weight: 15, score: 0, comments: "" },
    { id: "2", name: "Innovation & Strategic Thinking", weight: 15, score: 0, comments: "" },
    { id: "3", name: "Leadership & Decision Making", weight: 15, score: 0, comments: "" },
    { id: "4", name: "Communication", weight: 10, score: 0, comments: "" },
    { id: "5", name: "Job Knowledge & Technical Skills", weight: 15, score: 0, comments: "" },
    { id: "6", name: "Supporting & Cooperating", weight: 10, score: 0, comments: "" },
    { id: "7", name: "Productivity", weight: 10, score: 0, comments: "" },
    { id: "8", name: "Budget & Cost Management", weight: 10, score: 0, comments: "" },
  ]);

  const [nonCoreCompetencies, setNonCoreCompetencies] = useState<Competency[]>([
    { id: "9", name: "Ability to Develop Staff", weight: 20, score: 0, comments: "" },
    { id: "10", name: "Personal Development", weight: 15, score: 0, comments: "" },
    { id: "11", name: "Delivering Results", weight: 20, score: 0, comments: "" },
    { id: "12", name: "Following Instructions", weight: 15, score: 0, comments: "" },
    { id: "13", name: "Respect & Commitment", weight: 15, score: 0, comments: "" },
    { id: "14", name: "Teamwork", weight: 15, score: 0, comments: "" },
  ]);

  const updateScore = (type: "core" | "nonCore", id: string, score: number) => {
    if (type === "core") {
      setCoreCompetencies(coreCompetencies.map((c) => (c.id === id ? { ...c, score } : c)));
    } else {
      setNonCoreCompetencies(nonCoreCompetencies.map((c) => (c.id === id ? { ...c, score } : c)));
    }
  };

  const updateComments = (type: "core" | "nonCore", id: string, comments: string) => {
    if (type === "core") {
      setCoreCompetencies(coreCompetencies.map((c) => (c.id === id ? { ...c, comments } : c)));
    } else {
      setNonCoreCompetencies(nonCoreCompetencies.map((c) => (c.id === id ? { ...c, comments } : c)));
    }
  };

  const coreAverage = coreCompetencies.reduce((sum, c) => sum + c.score, 0) / coreCompetencies.length;
  const nonCoreAverage = nonCoreCompetencies.reduce((sum, c) => sum + c.score, 0) / nonCoreCompetencies.length;

  return (
    <div className="space-y-6">
      <div>
        <h1>Competency Assessment</h1>
        <p className="text-muted-foreground">Section 5: Evaluate core and non-core competencies</p>
      </div>

      {/* Core Competencies */}
      <Card>
        <Collapsible open={coreOpen} onOpenChange={setCoreOpen}>
          <CardHeader>
            <CollapsibleTrigger className="flex items-center justify-between w-full hover:opacity-80">
              <CardTitle>Core Competencies</CardTitle>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${coreOpen ? "rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              {coreCompetencies.map((competency) => (
                <div
                  key={competency.id}
                  className="p-4 border border-border rounded-lg space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4>{competency.name}</h4>
                      <p className="text-sm text-muted-foreground">Weight: {competency.weight}%</p>
                    </div>
                    <Select
                      value={competency.score.toString()}
                      onValueChange={(value) => updateScore("core", competency.id, parseInt(value))}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Score" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Poor</SelectItem>
                        <SelectItem value="2">2 - Below Avg</SelectItem>
                        <SelectItem value="3">3 - Average</SelectItem>
                        <SelectItem value="4">4 - Good</SelectItem>
                        <SelectItem value="5">5 - Excellent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`core-comments-${competency.id}`}>Comments</Label>
                    <Textarea
                      id={`core-comments-${competency.id}`}
                      placeholder="Provide evidence and examples..."
                      value={competency.comments}
                      onChange={(e) => updateComments("core", competency.id, e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              ))}

              <div className="mt-4 p-4 bg-[#382873]/5 border border-[#382873]/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <Label>Core Competencies Average (N)</Label>
                  <span className="text-2xl">{coreAverage.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Non-Core Competencies */}
      <Card>
        <Collapsible open={nonCoreOpen} onOpenChange={setNonCoreOpen}>
          <CardHeader>
            <CollapsibleTrigger className="flex items-center justify-between w-full hover:opacity-80">
              <CardTitle>Non-Core Competencies</CardTitle>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${nonCoreOpen ? "rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              {nonCoreCompetencies.map((competency) => (
                <div
                  key={competency.id}
                  className="p-4 border border-border rounded-lg space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4>{competency.name}</h4>
                      <p className="text-sm text-muted-foreground">Weight: {competency.weight}%</p>
                    </div>
                    <Select
                      value={competency.score.toString()}
                      onValueChange={(value) => updateScore("nonCore", competency.id, parseInt(value))}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Score" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Poor</SelectItem>
                        <SelectItem value="2">2 - Below Avg</SelectItem>
                        <SelectItem value="3">3 - Average</SelectItem>
                        <SelectItem value="4">4 - Good</SelectItem>
                        <SelectItem value="5">5 - Excellent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`noncore-comments-${competency.id}`}>Comments</Label>
                    <Textarea
                      id={`noncore-comments-${competency.id}`}
                      placeholder="Provide evidence and examples..."
                      value={competency.comments}
                      onChange={(e) => updateComments("nonCore", competency.id, e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              ))}

              <div className="mt-4 p-4 bg-[#17B8A6]/5 border border-[#17B8A6]/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <Label>Non-Core Competencies Average (O)</Label>
                  <span className="text-2xl">{nonCoreAverage.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" className="gap-2">
          <Save className="h-4 w-4" />
          Save Draft
        </Button>
        <Button className="bg-[#382873] hover:bg-[#4A3599] gap-2">
          <Send className="h-4 w-4" />
          Submit Assessment
        </Button>
      </div>
    </div>
  );
}

export default CompetencyAssessment;
