"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { StatusBadge } from "../components/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Eye } from "lucide-react";

interface Appraisal {
  id: string;
  year: number;
  appraisee: string;
  role: string;
  stage: string;
  status: "draft" | "submitted" | "returned" | "approved" | "in-review";
}

export function MyAppraisals() {
  const [filterYear, setFilterYear] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const appraisals: Appraisal[] = [
    {
      id: "1",
      year: 2026,
      appraisee: "Ahmed Salim Adam",
      role: "Application & Database Officer",
      stage: "End-Year Review",
      status: "in-review",
    },
    {
      id: "2",
      year: 2025,
      appraisee: "Ahmed Salim Adam",
      role: "Application & Database Officer",
      stage: "Approved",
      status: "approved",
    },
    {
      id: "3",
      year: 2024,
      appraisee: "Ahmed Salim Adam",
      role: "Application & Database Officer",
      stage: "Approved",
      status: "approved",
    },
  ];

  const filteredAppraisals = appraisals.filter((appraisal) => {
    const yearMatch = filterYear === "all" || appraisal.year.toString() === filterYear;
    const statusMatch = filterStatus === "all" || appraisal.status === filterStatus;
    return yearMatch && statusMatch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1>My Appraisals</h1>
        <p className="text-muted-foreground">View and manage your appraisal records</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Appraisal Records</CardTitle>
            <div className="flex gap-3">
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="in-review">In Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead>Appraisee</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Current Stage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppraisals.map((appraisal) => (
                <TableRow key={appraisal.id}>
                  <TableCell>{appraisal.year}</TableCell>
                  <TableCell>{appraisal.appraisee}</TableCell>
                  <TableCell>{appraisal.role}</TableCell>
                  <TableCell>{appraisal.stage}</TableCell>
                  <TableCell>
                    <StatusBadge status={appraisal.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      {appraisal.status === "draft" || appraisal.status === "returned"
                        ? "Continue"
                        : "View"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Page() {
  return <MyAppraisals />;
}
