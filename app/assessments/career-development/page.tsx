"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Plus, Trash2, Save, Send } from "lucide-react";

interface TrainingNeed {
  id: string;
  course: string;
  priority: string;
  timeline: string;
}

function CareerDevelopment() {
  const [developmentPlan, setDevelopmentPlan] = useState("");
  const [trainingNeeds, setTrainingNeeds] = useState<TrainingNeed[]>([
    { id: "1", course: "", priority: "", timeline: "" },
  ]);

  const addTrainingNeed = () => {
    setTrainingNeeds([
      ...trainingNeeds,
      { id: Date.now().toString(), course: "", priority: "", timeline: "" },
    ]);
  };

  const removeTrainingNeed = (id: string) => {
    setTrainingNeeds(trainingNeeds.filter((need) => need.id !== id));
  };

  const updateTrainingNeed = (id: string, field: keyof TrainingNeed, value: string) => {
    setTrainingNeeds(
      trainingNeeds.map((need) => (need.id === id ? { ...need, [field]: value } : need))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Career Development</h1>
        <p className="text-muted-foreground">Section 7: Identify training needs and development plan</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Development Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="development-plan">Overall Development Goals</Label>
            <Textarea
              id="development-plan"
              placeholder="Describe your career development goals and aspirations..."
              value={developmentPlan}
              onChange={(e) => setDevelopmentPlan(e.target.value)}
              rows={5}
            />
            <p className="text-sm text-muted-foreground">
              Include short-term and long-term career objectives
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Training Needs</CardTitle>
            <Button onClick={addTrainingNeed} variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Training
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {trainingNeeds.map((need, index) => (
            <div
              key={need.id}
              className="p-4 border border-border rounded-lg space-y-4 bg-muted/30"
            >
              <div className="flex justify-between items-center">
                <h4>Training Need {index + 1}</h4>
                {trainingNeeds.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTrainingNeed(need.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`course-${need.id}`}>Course/Training</Label>
                  <Input
                    id={`course-${need.id}`}
                    placeholder="e.g., Advanced Statistical Methods"
                    value={need.course}
                    onChange={(e) => updateTrainingNeed(need.id, "course", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`priority-${need.id}`}>Priority</Label>
                  <Select
                    value={need.priority}
                    onValueChange={(value) => updateTrainingNeed(need.id, "priority", value)}
                  >
                    <SelectTrigger id={`priority-${need.id}`}>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`timeline-${need.id}`}>Timeline</Label>
                  <Select
                    value={need.timeline}
                    onValueChange={(value) => updateTrainingNeed(need.id, "timeline", value)}
                  >
                    <SelectTrigger id={`timeline-${need.id}`}>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="q1">Q1 2026</SelectItem>
                      <SelectItem value="q2">Q2 2026</SelectItem>
                      <SelectItem value="q3">Q3 2026</SelectItem>
                      <SelectItem value="q4">Q4 2026</SelectItem>
                      <SelectItem value="next-year">Next Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills Gap Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="skills-gap">Identify Current Skills Gaps</Label>
            <Textarea
              id="skills-gap"
              placeholder="List skills or competencies you need to develop to achieve your career goals..."
              rows={4}
            />
          </div>
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
          Submit Plan
        </Button>
      </div>
    </div>
  );
}

export default function Page() {
  return <CareerDevelopment />;
}
