"use client";

import { useState, useEffect, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Switch } from "../components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Building2, Users, Award, Briefcase, Plus, Pencil, Trash2, Calendar, Lock, Unlock, User } from "lucide-react";
import { StatusBadge } from "../components/status-badge";
import { AppraisalCycle, useAppraisalCycles } from "../../hooks/useAppraisalCycles";
import { Directorate, useDirectorates } from "../../hooks/useDirectorates";
import { Section, useSections } from "../../hooks/useSections";


interface Grade {
  id: string;
  code: string;
  name: string;
  level: number;
  minSalary: string;
  maxSalary: string;
}

interface Position {
  id: string;
  code: string;
  title: string;
  gradeId: string;
  gradeName: string;
  department: string;
  description: string;
}

interface PhaseControl {
  id: string;
  name: string;
  isOpen: boolean;
  startDate: string;
  endDate: string;
}

function OrganizationSetup() {
  const { appraisalCycles, loading: cyclesLoading, error: cyclesError } = useAppraisalCycles();
  const { directorates, loading: directoratesLoading, error: directoratesError } = useDirectorates();
  const { sections, loading: sectionsLoading, error: sectionsError } = useSections();

  const [activeTab, setActiveTab] = useState("cycles");

  // Phase Controls for current cycle
  const [phaseControls, setPhaseControls] = useState<PhaseControl[]>([
    {
      id: "1",
      name: "Performance Planning",
      isOpen: true,
      startDate: "2026-01-01",
      endDate: "2026-03-31",
    },
    {
      id: "2",
      name: "Mid-Year Review",
      isOpen: true,
      startDate: "2026-06-01",
      endDate: "2026-07-31",
    },
    {
      id: "3",
      name: "End-Year Review",
      isOpen: false,
      startDate: "2026-11-01",
      endDate: "2026-12-31",
    },
  ]);

  // Mock data for grades
  const [grades, setGrades] = useState<Grade[]>([
    {
      id: "1",
      code: "GRD-001",
      name: "Director",
      level: 1,
      minSalary: "GHS 15,000",
      maxSalary: "GHS 25,000",
    },
    {
      id: "2",
      code: "GRD-002",
      name: "Deputy Director",
      level: 2,
      minSalary: "GHS 12,000",
      maxSalary: "GHS 18,000",
    },
    {
      id: "3",
      code: "GRD-003",
      name: "Principal Statistician",
      level: 3,
      minSalary: "GHS 9,000",
      maxSalary: "GHS 14,000",
    },
    {
      id: "4",
      code: "GRD-004",
      name: "Senior Statistician",
      level: 4,
      minSalary: "GHS 7,000",
      maxSalary: "GHS 11,000",
    },
    {
      id: "5",
      code: "GRD-005",
      name: "Statistician",
      level: 5,
      minSalary: "GHS 5,000",
      maxSalary: "GHS 8,000",
    },
  ]);

  // Mock data for positions
  const [positions, setPositions] = useState<Position[]>([
    {
      id: "1",
      code: "POS-001",
      title: "Director of Statistical Operations",
      gradeId: "1",
      gradeName: "Director",
      department: "Statistical Operations",
      description: "Oversees all statistical operations",
    },
    {
      id: "2",
      code: "POS-002",
      title: "HR Manager",
      gradeId: "2",
      gradeName: "Deputy Director",
      department: "Human Resources",
      description: "Manages human resources department",
    },
    {
      id: "3",
      code: "POS-003",
      title: "Senior Data Analyst",
      gradeId: "4",
      gradeName: "Senior Statistician",
      department: "Statistical Operations",
      description: "Analyzes statistical data and prepares reports",
    },
    {
      id: "4",
      code: "POS-004",
      title: "Research Officer",
      gradeId: "5",
      gradeName: "Statistician",
      department: "Research & Development",
      description: "Conducts research and statistical studies",
    },
  ]);

  const togglePhase = (phaseId: string) => {
    setPhaseControls((prev) =>
      prev.map((phase) =>
        phase.id === phaseId ? { ...phase, isOpen: !phase.isOpen } : phase
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-800">Organization Setup</h1>
        <p className="text-gray-500">Configure organizational structure, appraisal cycles, grades, and positions</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white border-gray-200">
          <TabsTrigger value="cycles" className="data-[state=active]:bg-blue-600 text-white data-[state=inactive]:text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            Appraisal Cycles
          </TabsTrigger>
          <TabsTrigger value="directorates" className="data-[state=active]:bg-blue-600 text-white data-[state=inactive]:text-gray-500">
            <Building2 className="h-4 w-4 mr-2" />
            Directorates
          </TabsTrigger>
          <TabsTrigger value="sections" className="data-[state=active]:bg-blue-600 text-white data-[state=inactive]:text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            Sections
          </TabsTrigger>
          <TabsTrigger value="grades" className="data-[state=active]:bg-blue-600 text-white data-[state=inactive]:text-gray-500">
            <Award className="h-4 w-4 mr-2" />
            Grades
          </TabsTrigger>
          <TabsTrigger value="positions" className="data-[state=active]:bg-blue-600 text-white data-[state=inactive]:text-gray-500">
            <Briefcase className="h-4 w-4 mr-2" />
            Positions
          </TabsTrigger>
          <TabsTrigger value="staff" className="data-[state=active]:bg-blue-600 text-white data-[state=inactive]:text-gray-500">
            <User className="h-4 w-4 mr-2" />
            Staff
          </TabsTrigger>
        </TabsList>

        {/* Appraisal Cycles Tab */}
        <TabsContent value="cycles" className="space-y-6">
          {/* Appraisal Cycles Card */}
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-800">Appraisal Cycles</CardTitle>
              <AppraisalCycleDialog mode="add" />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2d3a] hover:bg-[#252834]">
                    <TableHead className="text-gray-500">Year</TableHead>
                    <TableHead className="text-gray-500">Start Date</TableHead>
                    <TableHead className="text-gray-500">End Date</TableHead>
                    <TableHead className="text-gray-500">Status</TableHead>
                    <TableHead className="text-gray-500">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appraisalCycles.map((cycle) => (
                    <TableRow key={cycle.cycle_id} className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-gray-800 font-medium">{cycle.cycle_year}</TableCell>
                      <TableCell className="text-gray-800">{new Date(cycle.start_date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-gray-800">{new Date(cycle.end_date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <StatusBadge 
                          status={cycle.status === "active" ? "approved" : cycle.status === "completed" ? "completed" : "pending"} 
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300 hover:bg-[#252834]"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-[#252834]"
                            disabled={cycle.status === "active"}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Phase Control Card */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-800">Phase Controls - 2026 Cycle</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Open or close phases to control user access for the current appraisal cycle
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {phaseControls.map((phase) => (
                  <div
                    key={phase.id}
                    className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {phase.isOpen ? (
                          <Unlock className="h-5 w-5 text-green-500" />
                        ) : (
                          <Lock className="h-5 w-5 text-red-500" />
                        )}
                        <h3 className="text-gray-800 font-medium">{phase.name}</h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            phase.isOpen
                              ? "bg-green-300/20 text-green-600"
                              : "bg-red-300/20 text-red-600"
                          }`}
                        >
                          {phase.isOpen ? "Open" : "Closed"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Period: {new Date(phase.startDate).toLocaleDateString()} -{" "}
                        {new Date(phase.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {phase.isOpen
                          ? "Users can access and make changes to this phase"
                          : "This phase is locked - users cannot make changes"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`toggle-${phase.id}`} className="text-gray-400 text-sm">
                          {phase.isOpen ? "Close" : "Open"}
                        </Label>
                        <Switch
                          id={`toggle-${phase.id}`}
                          checked={phase.isOpen}
                          onCheckedChange={() => togglePhase(phase.id)}
                          className="data-[state=checked]:bg-green-600"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-400 hover:text-blue-300 hover:bg-[#1a1d29]"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Directorates Tab */}
        <TabsContent value="directorates">
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-800">Directorates</CardTitle>
              <DirectorateDialog mode="add" />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2d3a] hover:bg-[#252834]">
                    <TableHead className="text-gray-500">Code</TableHead>
                    <TableHead className="text-gray-500">Directorate Name</TableHead>
                    <TableHead className="text-gray-500">Director</TableHead>
                    <TableHead className="text-gray-500">Employees</TableHead>
                    <TableHead className="text-gray-500">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {directorates.map((directorate) => (
                    <TableRow key={directorate.directorate_id} className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-gray-400">{directorate.code}</TableCell>
                      <TableCell className="text-gray-500 font-medium">{directorate.name}</TableCell>
                      <TableCell className="text-gray-400">{directorate.director}</TableCell>
                      <TableCell className="text-gray-400">{directorate.employeeCount}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300 hover:bg-[#252834]"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-[#252834]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sections Tab */}
        <TabsContent value="sections">
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-800">Sections</CardTitle>
              <SectionDialog mode="add" directorates={directorates} />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2d3a] hover:bg-[#252834]">
                    <TableHead className="text-gray-500">Code</TableHead>
                    <TableHead className="text-gray-500">Section Name</TableHead>
                    <TableHead className="text-gray-500">Directorate</TableHead>
                    <TableHead className="text-gray-500">Section Head</TableHead>
                    <TableHead className="text-gray-500">Employees</TableHead>
                    <TableHead className="text-gray-500">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sections.map((section) => (
                    <TableRow key={section.section_id} className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-gray-400">{section.code}</TableCell>
                      <TableCell className="text-gray-500 font-medium">{section.name}</TableCell>
                      <TableCell className="text-gray-400">{section.directorateName}</TableCell>
                      <TableCell className="text-gray-400">{section.head}</TableCell>
                      <TableCell className="text-gray-400">{section.employeeCount}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300 hover:bg-[#252834]"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-[#252834]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Grades Tab */}
        <TabsContent value="grades">
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-800">Grades</CardTitle>
              <GradeDialog mode="add" />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2d3a] hover:bg-[#252834]">
                    <TableHead className="text-gray-500">Code</TableHead>
                    <TableHead className="text-gray-500">Grade Name</TableHead>
                    <TableHead className="text-gray-500">Level</TableHead>
                    <TableHead className="text-gray-500">Min Salary</TableHead>
                    <TableHead className="text-gray-500">Max Salary</TableHead>
                    <TableHead className="text-gray-500">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grades.map((grade) => (
                    <TableRow key={grade.id} className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-gray-400">{grade.code}</TableCell>
                      <TableCell className="text-gray-500 font-medium">{grade.name}</TableCell>
                      <TableCell className="text-gray-400">Level {grade.level}</TableCell>
                      <TableCell className="text-gray-400">{grade.minSalary}</TableCell>
                      <TableCell className="text-gray-400">{grade.maxSalary}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300 hover:bg-[#252834]"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-[#252834]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Positions Tab */}
        <TabsContent value="positions">
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-800">Positions</CardTitle>
              <PositionDialog mode="add" grades={grades} />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2d3a] hover:bg-[#252834]">
                    <TableHead className="text-gray-500">Code</TableHead>
                    <TableHead className="text-gray-500">Position Title</TableHead>
                    <TableHead className="text-gray-500">Grade</TableHead>
                    <TableHead className="text-gray-500">Department</TableHead>
                    <TableHead className="text-gray-500">Description</TableHead>
                    <TableHead className="text-gray-500">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {positions.map((position) => (
                    <TableRow key={position.id} className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-gray-400">{position.code}</TableCell>
                      <TableCell className="text-gray-500 font-medium">{position.title}</TableCell>
                      <TableCell className="text-gray-400">{position.gradeName}</TableCell>
                      <TableCell className="text-gray-400">{position.department}</TableCell>
                      <TableCell className="text-gray-400">{position.description}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300 hover:bg-[#252834]"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-[#252834]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Staff Tab */}
        <TabsContent value="staff">
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-800">Staff</CardTitle>
              <PositionDialog mode="add" grades={grades} />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2d3a] hover:bg-[#252834]">
                    <TableHead className="text-gray-500">Code</TableHead>
                    <TableHead className="text-gray-500">Position Title</TableHead>
                    <TableHead className="text-gray-500">Grade</TableHead>
                    <TableHead className="text-gray-500">Department</TableHead>
                    <TableHead className="text-gray-500">Description</TableHead>
                    <TableHead className="text-gray-500">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {positions.map((position) => (
                    <TableRow key={position.id} className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-gray-400">{position.code}</TableCell>
                      <TableCell className="text-gray-500 font-medium">{position.title}</TableCell>
                      <TableCell className="text-gray-400">{position.gradeName}</TableCell>
                      <TableCell className="text-gray-400">{position.department}</TableCell>
                      <TableCell className="text-gray-400">{position.description}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300 hover:bg-[#252834]"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-[#252834]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Appraisal Cycle Dialog Component
function AppraisalCycleDialog({ mode }: { mode: "add" | "edit" }) {
  const [open, setOpen] = useState(false);

  const { createAppraisalCycle, loading } = useAppraisalCycles();

  const [cycleData, setCycleData] = useState({
    cycle_year: "",
    start_date: "",
    end_date: "",
    status: "active",
  });

  const handleSubmit = async () => {
    try {
      await createAppraisalCycle(cycleData);
      setOpen(false);
      setCycleData({
        cycle_year: "",
        start_date: "",
        end_date: "",
        status: "active",
      });
    } catch {
      alert("Failed to create appraisal cycle");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Appraisal Cycle
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1d29] border-[#2a2d3a] text-white">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Create New Appraisal Cycle" : "Edit Appraisal Cycle"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Set up a new appraisal cycle for the organization
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="cycle-year" className="text-gray-300">Cycle Year</Label>
            <Input
              id="cycle-year"
              type="number"
              placeholder="e.g., 2027"
              className="bg-[#252834] border-[#2a2d3a] text-white"
              value={cycleData.cycle_year}
              onChange={(e) =>
                setCycleData({ ...cycleData, cycle_year: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cycle-start" className="text-gray-300">Start Date</Label>
              <Input
                id="cycle-start"
                type="date"
                className="bg-[#252834] border-[#2a2d3a] text-white"
                value={cycleData.start_date}
                onChange={(e) =>
                  setCycleData({ ...cycleData, start_date: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cycle-end" className="text-gray-300">End Date</Label>
              <Input
                id="cycle-end"
                type="date"
                className="bg-[#252834] border-[#2a2d3a] text-white"
                value={cycleData.end_date}
                onChange={(e) =>
                  setCycleData({ ...cycleData, end_date: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cycle-year" className="text-gray-300">Status</Label>
            <Select 
              value={cycleData.status}
              onValueChange={(value) =>
                setCycleData({ ...cycleData, status: value })
              }
            >
              <SelectTrigger className="bg-[#252834] border-[#2a2d3a] text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1d29] border-[#2a2d3a]">
                <SelectItem value="active" className="text-white hover:bg-[#2a2d3a]">Active</SelectItem>
                <SelectItem value="completed" className="text-white hover:bg-[#2a2d3a]">Completed</SelectItem>
                <SelectItem value="approved" className="text-white hover:bg-[#2a2d3a]">Approved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-400">
              <strong>Note:</strong> Creating a new cycle will set up the default phases (Performance Planning, Mid-Year Review, End-Year Review) which you can configure after creation.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-[#2a2d3a] text-gray-400 hover:bg-[#252834]">
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
            {mode === "add" ? "Create Cycle" : "Save Changes"} {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Directorate Dialog Component
function DirectorateDialog({ mode }: { mode: "add" | "edit" }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Directorate
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1d29] border-[#2a2d3a] text-white">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Directorate" : "Edit Directorate"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter the details for the directorate
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="dir-code" className="text-gray-300">Directorate Code</Label>
            <Input
              id="dir-code"
              placeholder="e.g., DIR-005"
              className="bg-[#252834] border-[#2a2d3a] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dir-name" className="text-gray-300">Directorate Name</Label>
            <Input
              id="dir-name"
              placeholder="e.g., Information Technology"
              className="bg-[#252834] border-[#2a2d3a] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dir-director" className="text-gray-300">Director</Label>
            <Input
              id="dir-director"
              placeholder="e.g., Dr. John Mensah"
              className="bg-[#252834] border-[#2a2d3a] text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-[#2a2d3a] text-gray-400 hover:bg-[#252834]">
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setOpen(false)}>
            {mode === "add" ? "Add Directorate" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Section Dialog Component
function SectionDialog({ mode, directorates }: { mode: "add" | "edit"; directorates: Directorate[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1d29] border-[#2a2d3a] text-white">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Section" : "Edit Section"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter the details for the section
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="sec-code" className="text-gray-300">Section Code</Label>
            <Input
              id="sec-code"
              placeholder="e.g., SEC-005"
              className="bg-[#252834] border-[#2a2d3a] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sec-name" className="text-gray-300">Section Name</Label>
            <Input
              id="sec-name"
              placeholder="e.g., Quality Assurance"
              className="bg-[#252834] border-[#2a2d3a] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sec-directorate" className="text-gray-300">Directorate</Label>
            <Select>
              <SelectTrigger className="bg-[#252834] border-[#2a2d3a] text-white">
                <SelectValue placeholder="Select directorate" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1d29] border-[#2a2d3a]">
                {directorates.map((dir) => (
                  <SelectItem key={dir.directorate_id} value={dir.directorate_id} className="text-white hover:bg-[#252834]">
                    {dir.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sec-head" className="text-gray-300">Section Head</Label>
            <Input
              id="sec-head"
              placeholder="e.g., Ahmed Salim Adam"
              className="bg-[#252834] border-[#2a2d3a] text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-[#2a2d3a] text-gray-400 hover:bg-[#252834]">
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setOpen(false)}>
            {mode === "add" ? "Add Section" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Grade Dialog Component
function GradeDialog({ mode }: { mode: "add" | "edit" }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Grade
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1d29] border-[#2a2d3a] text-white">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Grade" : "Edit Grade"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter the details for the grade
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="grade-code" className="text-gray-300">Grade Code</Label>
            <Input
              id="grade-code"
              placeholder="e.g., GRD-006"
              className="bg-[#252834] border-[#2a2d3a] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="grade-name" className="text-gray-300">Grade Name</Label>
            <Input
              id="grade-name"
              placeholder="e.g., Assistant Statistician"
              className="bg-[#252834] border-[#2a2d3a] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="grade-level" className="text-gray-300">Level</Label>
            <Input
              id="grade-level"
              type="number"
              placeholder="e.g., 6"
              className="bg-[#252834] border-[#2a2d3a] text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grade-min" className="text-gray-300">Min Salary</Label>
              <Input
                id="grade-min"
                placeholder="e.g., GHS 4,000"
                className="bg-[#252834] border-[#2a2d3a] text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade-max" className="text-gray-300">Max Salary</Label>
              <Input
                id="grade-max"
                placeholder="e.g., GHS 6,500"
                className="bg-[#252834] border-[#2a2d3a] text-white"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-[#2a2d3a] text-gray-400 hover:bg-[#252834]">
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setOpen(false)}>
            {mode === "add" ? "Add Grade" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Position Dialog Component
function PositionDialog({ mode, grades }: { mode: "add" | "edit"; grades: Grade[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Position
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1d29] border-[#2a2d3a] text-white">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Position" : "Edit Position"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter the details for the position
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="pos-code" className="text-gray-300">Position Code</Label>
            <Input
              id="pos-code"
              placeholder="e.g., POS-005"
              className="bg-[#252834] border-[#2a2d3a] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pos-title" className="text-gray-300">Position Title</Label>
            <Input
              id="pos-title"
              placeholder="e.g., IT Support Specialist"
              className="bg-[#252834] border-[#2a2d3a] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pos-grade" className="text-gray-300">Grade</Label>
            <Select>
              <SelectTrigger className="bg-[#252834] border-[#2a2d3a] text-white">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1d29] border-[#2a2d3a]">
                {grades.map((grade) => (
                  <SelectItem key={grade.id} value={grade.id} className="text-white hover:bg-[#252834]">
                    {grade.name} (Level {grade.level})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pos-dept" className="text-gray-300">Department</Label>
            <Input
              id="pos-dept"
              placeholder="e.g., Information Technology"
              className="bg-[#252834] border-[#2a2d3a] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pos-desc" className="text-gray-300">Description</Label>
            <Input
              id="pos-desc"
              placeholder="Brief description of the position"
              className="bg-[#252834] border-[#2a2d3a] text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-[#2a2d3a] text-gray-400 hover:bg-[#252834]">
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setOpen(false)}>
            {mode === "add" ? "Add Position" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function Page() {
  return <OrganizationSetup />;
}
