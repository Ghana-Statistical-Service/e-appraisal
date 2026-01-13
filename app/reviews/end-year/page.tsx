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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Save, Send } from "lucide-react";

interface Target {
  id: string;
  target: string;
  weight: number;
  score: number;
  comments: string;
}

function EndYearReview() {
  const [targets, setTargets] = useState<Target[]>([
    { id: "1", target: "Complete quarterly statistical reports", weight: 30, score: 0, comments: "" },
    { id: "2", target: "Implement new data collection methodology", weight: 35, score: 0, comments: "" },
    { id: "3", target: "Train 10 junior staff on statistical software", weight: 35, score: 0, comments: "" },
  ]);

  const updateScore = (id: string, score: number) => {
    setTargets(targets.map((t) => (t.id === id ? { ...t, score } : t)));
  };

  const updateComments = (id: string, comments: string) => {
    setTargets(targets.map((t) => (t.id === id ? { ...t, comments } : t)));
  };

  const totalScore = targets.reduce((sum, t) => sum + (t.weight * t.score) / 100, 0);
  const averageScore = targets.length > 0 ? totalScore / targets.length : 0;
  const performancePlanScore = totalScore;

  return (
    <div className="space-y-6">
      <div>
        <h1>End-Year Review</h1>
        <p className="text-muted-foreground">Section 4: Evaluate performance against targets</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Target Performance Evaluation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Target</TableHead>
                  <TableHead className="w-[15%]">Weight (%)</TableHead>
                  <TableHead className="w-[15%]">Score (1-5)</TableHead>
                  <TableHead className="w-[30%]">Comments</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {targets.map((target) => (
                  <TableRow key={target.id}>
                    <TableCell>{target.target}</TableCell>
                    <TableCell>{target.weight}%</TableCell>
                    <TableCell>
                      <Select
                        value={target.score.toString()}
                        onValueChange={(value) => updateScore(target.id, parseInt(value))}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Score" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 - Poor</SelectItem>
                          <SelectItem value="2">2 - Below Average</SelectItem>
                          <SelectItem value="3">3 - Average</SelectItem>
                          <SelectItem value="4">4 - Good</SelectItem>
                          <SelectItem value="5">5 - Excellent</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Textarea
                        placeholder="Comments..."
                        value={target.comments}
                        onChange={(e) => updateComments(target.id, e.target.value)}
                        rows={2}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-[#382873]/5 border border-[#382873]/20 rounded-lg">
              <Label className="text-sm text-muted-foreground">Total Score</Label>
              <div className="text-3xl mt-2">{totalScore.toFixed(2)}</div>
            </div>

            <div className="p-4 bg-[#17B8A6]/5 border border-[#17B8A6]/20 rounded-lg">
              <Label className="text-sm text-muted-foreground">Average Score</Label>
              <div className="text-3xl mt-2">{averageScore.toFixed(2)}</div>
            </div>

            <div className="p-4 bg-[#DB2988]/5 border border-[#DB2988]/20 rounded-lg">
              <Label className="text-sm text-muted-foreground">Performance Plan Score (M)</Label>
              <div className="text-3xl mt-2">{performancePlanScore.toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Comments */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="overall-comments">General Remarks</Label>
            <Textarea
              id="overall-comments"
              placeholder="Provide overall comments on your performance for the year..."
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
          Submit Review
        </Button>
      </div>
    </div>
  );
}

export default function Page() {
  return <EndYearReview />;
}
