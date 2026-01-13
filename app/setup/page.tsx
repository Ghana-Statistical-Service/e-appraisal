"use client";

import { useState } from "react";
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
import { Building2, Users, Award, Briefcase, Plus, Pencil, Trash2, Calendar, Lock, Unlock } from "lucide-react";
import { StatusBadge } from "../components/status-badge";

interface Directorate {
  id: string;
  code: string;
  name: string;
  director: string;
  employeeCount: number;
}

interface Section {
  id: string;
  code: string;
  name: string;
  directorateId: string;
  directorateName: string;
  head: string;
  employeeCount: number;
}

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

interface AppraisalCycle {
  id: string;
  year: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "upcoming";
}

interface PhaseControl {
  id: string;
  name: string;
  isOpen: boolean;
  startDate: string;
  endDate: string;
}

export function OrganizationSetup() {
  const [activeTab, setActiveTab] = useState("cycles");

  // Appraisal Cycles
  const [appraisalCycles, setAppraisalCycles] = useState<AppraisalCycle[]>([
    {
      id: "1",
      year: "2026",
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      status: "active",
    },
    {
      id: "2",
      year: "2025",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      status: "completed",
    },
  ]);

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

  // Mock data for directorates
  const [directorates, setDirectorates] = useState<Directorate[]>([
    {
      id: "1",
      code: "DIR-001",
      name: "Digital Services & Technology (DST)",
      director: "Mark Abuabu-Dadzie",
      employeeCount: 45,
    },
    {
      id: "2",
      code: "DIR-002",
      name: "Human Resources",
      director: "Isaac Odoom",
      employeeCount: 18,
    },
    {
      id: "3",
      code: "DIR-003",
      name: "Administration",
      director: "Kwadwo Asante",
      employeeCount: 32,
    },
  ]);

  // Mock data for sections
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      code: "SEC-001",
      name: "Application and Database",
      directorateId: "1",
      directorateName: "Digital Services & Technology (DST)",
      head: "Kwesi Eshun",
      employeeCount: 15,
    },
    {
      id: "2",
      code: "SEC-002",
      name: "Systems Support",
      directorateId: "1",
      directorateName: "Digital Services & Technology (DST)",
      head: "Ahmed Salim Adam",
      employeeCount: 20,
    },
    {
      id: "3",
      code: "SEC-003",
      name: "HR Operations",
      directorateId: "2",
      directorateName: "Human Resources",
      head: "Isaac Odoom",
      employeeCount: 8,
    },
    {
      id: "4",
      code: "SEC-004",
      name: "Administration Services",
      directorateId: "3",
      directorateName: "Administration",
      head: "Afisu Ganiyu",
      employeeCount: 10,
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
        <h1 className="text-white">Organization Setup</h1>
        <p className="text-gray-400">Configure organizational structure, appraisal cycles, grades, and positions</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-[#1a1d29] border border-[#2a2d3a]">
          <TabsTrigger value="cycles" className="data-[state=active]:bg-blue-600">
            <Calendar className="h-4 w-4 mr-2" />
            Appraisal Cycles
          </TabsTrigger>
          <TabsTrigger value="directorates" className="data-[state=active]:bg-blue-600">
            <Building2 className="h-4 w-4 mr-2" />
            Directorates
          </TabsTrigger>
          <TabsTrigger value="sections" className="data-[state=active]:bg-blue-600">
            <Users className="h-4 w-4 mr-2" />
            Sections
          </TabsTrigger>
          <TabsTrigger value="grades" className="data-[state=active]:bg-blue-600">
            <Award className="h-4 w-4 mr-2" />
            Grades
          </TabsTrigger>
          <TabsTrigger value="positions" className="data-[state=active]:bg-blue-600">
            <Briefcase className="h-4 w-4 mr-2" />
            Positions
          </TabsTrigger>
        </TabsList>

        {/* Appraisal Cycles Tab */}
        <TabsContent value="cycles" className="space-y-6">
          {/* Appraisal Cycles Card */}
          <Card className="bg-[#1a1d29] border-[#2a2d3a]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Appraisal Cycles</CardTitle>
              <AppraisalCycleDialog mode="add" />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2d3a] hover:bg-[#252834]">
                    <TableHead className="text-gray-400">Year</TableHead>
                    <TableHead className="text-gray-400">Start Date</TableHead>
                    <TableHead className="text-gray-400">End Date</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appraisalCycles.map((cycle) => (
                    <TableRow key={cycle.id} className="border-[#2a2d3a] hover:bg-[#252834]">
                      <TableCell className="text-white font-medium">{cycle.year}</TableCell>
                      <TableCell className="text-gray-300">{new Date(cycle.startDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-gray-300">{new Date(cycle.endDate).toLocaleDateString()}</TableCell>
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
          <Card className="bg-[#1a1d29] border-[#2a2d3a]">
            <CardHeader>
              <CardTitle className="text-white">Phase Controls - 2026 Cycle</CardTitle>
              <p className="text-sm text-gray-400 mt-1">
                Open or close phases to control user access for the current appraisal cycle
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {phaseControls.map((phase) => (
                  <div
                    key={phase.id}
                    className="flex items-center justify-between p-4 bg-[#252834] border border-[#2a2d3a] rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {phase.isOpen ? (
                          <Unlock className="h-5 w-5 text-green-500" />
                        ) : (
                          <Lock className="h-5 w-5 text-red-500" />
                        )}
                        <h3 className="text-white font-medium">{phase.name}</h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            phase.isOpen
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {phase.isOpen ? "Open" : "Closed"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        Period: {new Date(phase.startDate).toLocaleDateString()} -{" "}
                        {new Date(phase.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
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
          <Card className="bg-[#1a1d29] border-[#2a2d3a]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Directorates</CardTitle>
              <DirectorateDialog mode="add" />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2d3a] hover:bg-[#252834]">
                    <TableHead className="text-gray-400">Code</TableHead>
                    <TableHead className="text-gray-400">Directorate Name</TableHead>
                    <TableHead className="text-gray-400">Director</TableHead>
                    <TableHead className="text-gray-400">Employees</TableHead>
                    <TableHead className="text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {directorates.map((directorate) => (
                    <TableRow key={directorate.id} className="border-[#2a2d3a] hover:bg-[#252834]">
                      <TableCell className="text-gray-300">{directorate.code}</TableCell>
                      <TableCell className="text-white font-medium">{directorate.name}</TableCell>
                      <TableCell className="text-gray-300">{directorate.director}</TableCell>
                      <TableCell className="text-gray-300">{directorate.employeeCount}</TableCell>
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
          <Card className="bg-[#1a1d29] border-[#2a2d3a]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Sections</CardTitle>
              <SectionDialog mode="add" directorates={directorates} />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2d3a] hover:bg-[#252834]">
                    <TableHead className="text-gray-400">Code</TableHead>
                    <TableHead className="text-gray-400">Section Name</TableHead>
                    <TableHead className="text-gray-400">Directorate</TableHead>
                    <TableHead className="text-gray-400">Section Head</TableHead>
                    <TableHead className="text-gray-400">Employees</TableHead>
                    <TableHead className="text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sections.map((section) => (
                    <TableRow key={section.id} className="border-[#2a2d3a] hover:bg-[#252834]">
                      <TableCell className="text-gray-300">{section.code}</TableCell>
                      <TableCell className="text-white font-medium">{section.name}</TableCell>
                      <TableCell className="text-gray-300">{section.directorateName}</TableCell>
                      <TableCell className="text-gray-300">{section.head}</TableCell>
                      <TableCell className="text-gray-300">{section.employeeCount}</TableCell>
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
          <Card className="bg-[#1a1d29] border-[#2a2d3a]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Grades</CardTitle>
              <GradeDialog mode="add" />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2d3a] hover:bg-[#252834]">
                    <TableHead className="text-gray-400">Code</TableHead>
                    <TableHead className="text-gray-400">Grade Name</TableHead>
                    <TableHead className="text-gray-400">Level</TableHead>
                    <TableHead className="text-gray-400">Min Salary</TableHead>
                    <TableHead className="text-gray-400">Max Salary</TableHead>
                    <TableHead className="text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grades.map((grade) => (
                    <TableRow key={grade.id} className="border-[#2a2d3a] hover:bg-[#252834]">
                      <TableCell className="text-gray-300">{grade.code}</TableCell>
                      <TableCell className="text-white font-medium">{grade.name}</TableCell>
                      <TableCell className="text-gray-300">Level {grade.level}</TableCell>
                      <TableCell className="text-gray-300">{grade.minSalary}</TableCell>
                      <TableCell className="text-gray-300">{grade.maxSalary}</TableCell>
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
          <Card className="bg-[#1a1d29] border-[#2a2d3a]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Positions</CardTitle>
              <PositionDialog mode="add" grades={grades} />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2d3a] hover:bg-[#252834]">
                    <TableHead className="text-gray-400">Code</TableHead>
                    <TableHead className="text-gray-400">Position Title</TableHead>
                    <TableHead className="text-gray-400">Grade</TableHead>
                    <TableHead className="text-gray-400">Department</TableHead>
                    <TableHead className="text-gray-400">Description</TableHead>
                    <TableHead className="text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {positions.map((position) => (
                    <TableRow key={position.id} className="border-[#2a2d3a] hover:bg-[#252834]">
                      <TableCell className="text-gray-300">{position.code}</TableCell>
                      <TableCell className="text-white font-medium">{position.title}</TableCell>
                      <TableCell className="text-gray-300">{position.gradeName}</TableCell>
                      <TableCell className="text-gray-300">{position.department}</TableCell>
                      <TableCell className="text-gray-300">{position.description}</TableCell>
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
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cycle-start" className="text-gray-300">Start Date</Label>
              <Input
                id="cycle-start"
                type="date"
                className="bg-[#252834] border-[#2a2d3a] text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cycle-end" className="text-gray-300">End Date</Label>
              <Input
                id="cycle-end"
                type="date"
                className="bg-[#252834] border-[#2a2d3a] text-white"
              />
            </div>
          </div>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-400">
              <strong>Note:</strong> Creating a new cycle will set up the default phases (Performance Planning, Mid-Year Review, End-Year Review) which you can configure after creation.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-[#2a2d3a] text-gray-300 hover:bg-[#252834]">
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setOpen(false)}>
            {mode === "add" ? "Create Cycle" : "Save Changes"}
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
          <Button variant="outline" onClick={() => setOpen(false)} className="border-[#2a2d3a] text-gray-300 hover:bg-[#252834]">
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
                  <SelectItem key={dir.id} value={dir.id} className="text-white hover:bg-[#252834]">
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
          <Button variant="outline" onClick={() => setOpen(false)} className="border-[#2a2d3a] text-gray-300 hover:bg-[#252834]">
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
          <Button variant="outline" onClick={() => setOpen(false)} className="border-[#2a2d3a] text-gray-300 hover:bg-[#252834]">
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
          <Button variant="outline" onClick={() => setOpen(false)} className="border-[#2a2d3a] text-gray-300 hover:bg-[#252834]">
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
