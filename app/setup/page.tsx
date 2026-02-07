"use client";

import { useState, useEffect, useMemo } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "../components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandItem } from "../components/ui/command";
import { Building2, Users, Award, Briefcase, Plus, Pencil, Trash2, Calendar, Lock, Unlock, User, GitBranch, Loader2 } from "lucide-react";
import { StatusBadge } from "../components/status-badge";
import { AppraisalCycle, useAppraisalCycles } from "../../hooks/useAppraisalCycles";
import { Directorate, useDirectorates } from "../../hooks/useDirectorates";
import { Section, useSections } from "../../hooks/useSections";
import { AppraisalCycleDialog } from "../../hooks/AppraisalCycleDialog";
import { StaffLevel, useStaffLevels } from "../../hooks/useStaffLevels";
import { AppraisalRouteRule, useAppraisalRouteRules } from "../../hooks/useAppraisalRouteRules";
import { StaffMember, useStaff } from "../../hooks/useStaff";
import { DirectorateHead, useDirectorateHeads } from "../../hooks/useDirectorateHeads";
import { SectionHead, useSectionHeads } from "../../hooks/useSectionHeads";
import { useStaffDirectory } from "../../hooks/useStaffDirectory";


interface Grade {
  id: string;
  code: string;
  name: string;
  level: number;
  minSalary: string;
  maxSalary: string;
}

interface PhaseControl {
  id: string;
  name: string;
  isOpen: boolean;
  startDate: string;
  endDate: string;
}

interface AppraisalRouteRule {
  rule_id: number;
  appraisee_level_id: number;
  appraiser_level_id: number;
  is_active: boolean;
  created_at: string;
  appraisee_level_code: string;
  appraiser_level_code: string;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function OrganizationSetup() {
  const PAGE_SIZE = 10;
  const {
    appraisalCycles,
    loading: cyclesLoading,
    error: cyclesError,
    refetch: refetchCycles,
    isAdmin,
    createAppraisalCycle,
    updateAppraisalCycle,
    deleteAppraisalCycle,
  } = useAppraisalCycles();
  const {
    directorates,
    loading: directoratesLoading,
    error: directoratesError,
    refetch: refetchDirectorates,
    createDirectorate,
    updateDirectorate,
    deleteDirectorate,
    isAdmin: isDirectorateAdmin,
  } = useDirectorates();
  const {
    sections,
    loading: sectionsLoading,
    error: sectionsError,
    refetch: refetchSections,
    createSection,
    updateSection,
    deleteSection,
    isAdmin: isSectionAdmin,
  } = useSections();
  const {
    staffLevels,
    loading: staffLevelsLoading,
    error: staffLevelsError,
    refetch: refetchStaffLevels,
    createStaffLevel,
    updateStaffLevel,
    deleteStaffLevel,
    isAdmin: isStaffLevelsAdmin,
  } = useStaffLevels();
  const {
    staff,
    loading: staffLoading,
    error: staffError,
    refetch: refetchStaff,
    createStaff,
    updateStaff,
    deactivateStaff,
    isAdmin: isStaffAdmin,
  } = useStaff();
  const staffDirectory = useStaffDirectory();

  const [activeTab, setActiveTab] = useState("cycles");
  const levelOptions = [
    { id: 1, code: "OFFICER" },
    { id: 2, code: "SECTIONAL_HEAD" },
    { id: 3, code: "DIRECTOR" },
    { id: 4, code: "HR" },
    { id: 5, code: "DGS" },
    { id: 6, code: "GS" },
  ];

  const {
    rules,
    loading: rulesLoading,
    error: rulesError,
    refetch: refetchRules,
    createRule,
    updateRule,
    deleteRule,
    isAdmin: isRulesAdmin,
  } = useAppraisalRouteRules();
  const {
    directorateHeads,
    loading: directorateHeadsLoading,
    refetch: refetchDirectorateHeads,
    assignDirectorateHead,
    updateDirectorateHead,
    removeDirectorateHead,
  } = useDirectorateHeads();
  const {
    sectionHeads,
    loading: sectionHeadsLoading,
    refetch: refetchSectionHeads,
    assignSectionHead,
    updateSectionHead,
    removeSectionHead,
  } = useSectionHeads();

  const [selectedCycleId, setSelectedCycleId] = useState<string | null>(null);
  const [phaseByCycleId, setPhaseByCycleId] = useState<
    Record<string, PhaseControl[]>
  >({});
  const [pendingCycleOpenId, setPendingCycleOpenId] = useState<string | null>(null);
  const [deleteCycleId, setDeleteCycleId] = useState<string | null>(null);
  const [deleteDirectorateId, setDeleteDirectorateId] = useState<string | null>(null);
  const [deleteSectionId, setDeleteSectionId] = useState<string | null>(null);
  const [cyclesPage, setCyclesPage] = useState(1);
  const [directoratesPage, setDirectoratesPage] = useState(1);
  const [sectionsPage, setSectionsPage] = useState(1);
  const [staffLevelsPage, setStaffLevelsPage] = useState(1);
  const [routesPage, setRoutesPage] = useState(1);
  const [staffPage, setStaffPage] = useState(1);
  const [assignFilterType, setAssignFilterType] = useState<"all" | "directorates" | "sections">("all");
  const [assignDirectorateFilter, setAssignDirectorateFilter] = useState<string>("all");
  const [assignSearch, setAssignSearch] = useState("");
  const directorateMap = useMemo(
    () => new Map(directorates.map((d) => [d.directorate_id, d.name])),
    [directorates]
  );
  const sectionMap = useMemo(
    () => new Map(sections.map((s) => [s.section_id, s.name])),
    [sections]
  );
  const levelMap = useMemo(
    () => new Map(staffLevels.map((l) => [l.level_id, l])),
    [staffLevels]
  );
  const staffMap = useMemo(
    () => new Map(staff.map((s) => [s.staff_id, s])),
    [staff]
  );
  const directorateHeadMap = useMemo(
    () => new Map(directorateHeads.map((h) => [h.directorate_id, h])),
    [directorateHeads]
  );
  const sectionHeadMap = useMemo(
    () => new Map(sectionHeads.map((h) => [h.section_id, h])),
    [sectionHeads]
  );

  const assignRows = useMemo(() => {
    const term = assignSearch.trim().toLowerCase();
    const filteredDirectorates =
      assignDirectorateFilter === "all"
        ? directorates
        : directorates.filter((d) => d.directorate_id === assignDirectorateFilter);

    const rows: Array<{
      type: "directorate" | "section";
      directorate: Directorate;
      section?: Section;
      headStaff?: StaffMember;
      assignedAt?: string;
    }> = [];

    const matchesTerm = (value: string) => value.toLowerCase().includes(term);

    filteredDirectorates
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((dir) => {
        const dirHead = directorateHeadMap.get(dir.directorate_id);
        const dirHeadStaff = dirHead ? staffMap.get(dirHead.head_staff_id) : undefined;

        if (assignFilterType !== "sections") {
          rows.push({ type: "directorate", directorate: dir, headStaff: dirHeadStaff, assignedAt: dirHead?.assigned_at });
        }

        if (assignFilterType !== "directorates") {
          sections
            .filter((s) => s.directorate_id === dir.directorate_id)
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach((sec) => {
              const secHead = sectionHeadMap.get(sec.section_id);
              const secHeadStaff = secHead ? staffMap.get(secHead.head_staff_id) : undefined;
              rows.push({ type: "section", directorate: dir, section: sec, headStaff: secHeadStaff, assignedAt: secHead?.assigned_at });
            });
        }
      });

    if (!term) return rows;

    return rows.filter((row) => {
      const headName = row.headStaff
        ? `${row.headStaff.first_name} ${row.headStaff.last_name}`
        : "";
      const headEmail = row.headStaff?.email || "";
      return (
        matchesTerm(row.directorate.name) ||
        matchesTerm(row.section?.name || "") ||
        matchesTerm(headName) ||
        matchesTerm(headEmail)
      );
    });
  }, [
    assignFilterType,
    assignDirectorateFilter,
    assignSearch,
    directorates,
    sections,
    directorateHeadMap,
    sectionHeadMap,
    staffMap,
  ]);

  useEffect(() => {
    if (activeTab === "assign-heads") {
      staffDirectory.prefetchAll();
    }
  }, [activeTab, staffDirectory]);

  const clampPage = (page: number, total: number) =>
    Math.min(page, Math.max(1, Math.ceil(total / PAGE_SIZE)));

  const getPageItems = (current: number, totalPages: number) => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "ellipsis")[] = [1];
    const start = Math.max(2, current - 1);
    const end = Math.min(totalPages - 1, current + 1);
    if (start > 2) pages.push("ellipsis");
    for (let i = start; i <= end; i += 1) pages.push(i);
    if (end < totalPages - 1) pages.push("ellipsis");
    pages.push(totalPages);
    return pages;
  };

  const renderPagination = (
    page: number,
    setPage: (next: number) => void,
    total: number
  ) => {
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    return (
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage(Math.max(1, page - 1));
              }}
            />
          </PaginationItem>
          {getPageItems(page, totalPages).map((item, index) => (
            <PaginationItem key={`${item}-${index}`}>
              {item === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={item === page}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(item);
                  }}
                >
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage(Math.min(totalPages, page + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

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

  const [deletingStaffLevelId, setDeletingStaffLevelId] = useState<number | null>(null);
  const [deactivatingStaffId, setDeactivatingStaffId] = useState<number | null>(null);

  const togglePhase = (phaseId: string) => {
    if (!selectedCycleId || !isAdmin) return;
    const previousPhases = phaseByCycleId[selectedCycleId] || [];
    let nextOpen = false;

    const nextPhases = previousPhases.map((phase) => {
      if (phase.id !== phaseId) return phase;
      nextOpen = !phase.isOpen;
      return { ...phase, isOpen: nextOpen };
    });

    setPhaseByCycleId((prev) => ({
      ...prev,
      [selectedCycleId]: nextPhases,
    }));

    if (nextOpen && selectedCycle && selectedCycle.status !== "active") {
      setPendingCycleOpenId(selectedCycleId);
      updateAppraisalCycle(selectedCycle.cycle_id, {
        cycle_year: selectedCycle.cycle_year,
        start_date: selectedCycle.start_date,
        end_date: selectedCycle.end_date,
        status: "active",
      })
        .then(refetchCycles)
        .catch(() => {
          setPhaseByCycleId((prev) => ({
            ...prev,
            [selectedCycleId]: previousPhases,
          }));
        })
        .finally(() => {
          setPendingCycleOpenId(null);
        });
    }
  };

  const sortedCycles = [...appraisalCycles].sort(
    (a, b) => Number(b.cycle_year) - Number(a.cycle_year)
  );
  const selectedCycle = selectedCycleId
    ? appraisalCycles.find((c) => c.cycle_id === selectedCycleId)
    : null;
  const currentPhases = selectedCycleId
    ? phaseByCycleId[selectedCycleId] || []
    : [];

  useEffect(() => {
    setCyclesPage((page) => clampPage(page, sortedCycles.length));
  }, [sortedCycles.length]);

  useEffect(() => {
    setDirectoratesPage((page) => clampPage(page, directorates.length));
  }, [directorates.length]);

  useEffect(() => {
    setSectionsPage((page) => clampPage(page, sections.length));
  }, [sections.length]);

  useEffect(() => {
    setStaffLevelsPage((page) => clampPage(page, staffLevels.length));
  }, [staffLevels.length]);

  useEffect(() => {
    setRoutesPage((page) => clampPage(page, rules.length));
  }, [rules.length]);

  useEffect(() => {
    setStaffPage((page) => clampPage(page, staff.length));
  }, [staff.length]);

  useEffect(() => {
    if (!appraisalCycles.length) return;
    const active = appraisalCycles.find((c) => c.status === "active");
    if (active) {
      setSelectedCycleId(active.cycle_id);
      return;
    }
    const newest = [...appraisalCycles].sort(
      (a, b) => Number(b.cycle_year) - Number(a.cycle_year)
    )[0];
    setSelectedCycleId(newest?.cycle_id ?? appraisalCycles[0].cycle_id);
  }, [appraisalCycles]);

  useEffect(() => {
    if (!selectedCycleId || !selectedCycle) return;
    if (phaseByCycleId[selectedCycleId]) return;

    const year = Number(selectedCycle.cycle_year);
    const startDate = new Date(selectedCycle.start_date);
    const endDate = new Date(selectedCycle.end_date);
    const isCycleOpen = selectedCycle.status === "active";

    const perfStart = startDate;
    const perfEnd = new Date(year, 2, 31);
    if (perfEnd < perfStart) {
      perfEnd.setMonth(perfStart.getMonth() + 3);
    }

    const midStart = new Date(year, 5, 1);
    const midEnd = new Date(year, 6, 31);
    const endStart = new Date(year, 10, 1);

    const defaults: PhaseControl[] = [
      {
        id: "performance-planning",
        name: "Performance Planning",
        isOpen: isCycleOpen,
        startDate: perfStart.toISOString().slice(0, 10),
        endDate: perfEnd.toISOString().slice(0, 10),
      },
      {
        id: "mid-year-review",
        name: "Mid-Year Review",
        isOpen: isCycleOpen,
        startDate: midStart.toISOString().slice(0, 10),
        endDate: midEnd.toISOString().slice(0, 10),
      },
      {
        id: "end-year-review",
        name: "End-Year Review",
        isOpen: false,
        startDate: endStart.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
      },
    ];

    setPhaseByCycleId((prev) => ({
      ...prev,
      [selectedCycleId]: defaults,
    }));
  }, [selectedCycleId, selectedCycle, phaseByCycleId, appraisalCycles]);

  useEffect(() => {
    if (!selectedCycleId || !selectedCycle) return;
    if (selectedCycle.status === "active") return;
    if (pendingCycleOpenId === selectedCycleId) return;
    setPhaseByCycleId((prev) => {
      const phases = prev[selectedCycleId];
      if (!phases) return prev;
      const hasOpen = phases.some((p) => p.isOpen);
      if (!hasOpen) return prev;
      return {
        ...prev,
        [selectedCycleId]: phases.map((p) => ({ ...p, isOpen: false })),
      };
    });
  }, [selectedCycleId, selectedCycle, phaseByCycleId, pendingCycleOpenId]);

  useEffect(() => {
    if (!selectedCycleId || !selectedCycle) return;
    if (selectedCycle.status !== "active") return;
    if (pendingCycleOpenId !== selectedCycleId) return;
    setPendingCycleOpenId(null);
  }, [selectedCycleId, selectedCycle, pendingCycleOpenId]);

  useEffect(() => {
    if (!selectedCycleId || !selectedCycle) return;
    if (selectedCycle.status !== "active") return;
    const phases = phaseByCycleId[selectedCycleId] || [];
    if (!phases.length) return;
    const allClosed = phases.every((p) => !p.isOpen);
    if (!allClosed) return;
    if (!isAdmin) return;
    updateAppraisalCycle(selectedCycle.cycle_id, {
      cycle_year: selectedCycle.cycle_year,
      start_date: selectedCycle.start_date,
      end_date: selectedCycle.end_date,
      status: "completed",
    }).then(refetchCycles);
  }, [selectedCycleId, selectedCycle, phaseByCycleId, isAdmin, updateAppraisalCycle, refetchCycles]);

  const staffLevelMap = useMemo(
    () => new Map(staffLevels.map((l) => [l.level_id, l])),
    [staffLevels]
  );

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
          {/* <TabsTrigger value="grades" className="data-[state=active]:bg-blue-600 text-white data-[state=inactive]:text-gray-500">
            <Award className="h-4 w-4 mr-2" />
            Grades
          </TabsTrigger> */}
          <TabsTrigger value="positions" className="data-[state=active]:bg-blue-600 text-white data-[state=inactive]:text-gray-500">
            <Briefcase className="h-4 w-4 mr-2" />
            Staff Levels
          </TabsTrigger>
          <TabsTrigger value="routes" className="data-[state=active]:bg-blue-600 text-white data-[state=inactive]:text-gray-500">
            <GitBranch className="h-4 w-4 mr-2" />
            Appraisal Route
          </TabsTrigger>
          <TabsTrigger value="assign-heads" className="data-[state=active]:bg-blue-600 text-white data-[state=inactive]:text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            Assign Heads
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
              {isAdmin ? (
                <AppraisalCycleDialog
                  mode="add"
                  onCreate={async (payload) => {
                    await createAppraisalCycle(payload);
                    refetchCycles();
                  }}
                />
              ) : null}
            </CardHeader>
            <CardContent>
              {cyclesError ? (
                <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {cyclesError}
                </div>
              ) : null}
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2d3a] hover:bg-[#252834]">
                    <TableHead className="text-gray-500">ID</TableHead>
                    <TableHead className="text-gray-500">Year</TableHead>
                    <TableHead className="text-gray-500">Start Date</TableHead>
                    <TableHead className="text-gray-500">End Date</TableHead>
                    <TableHead className="text-gray-500">Status</TableHead>
                    <TableHead className="text-gray-500">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cyclesLoading ? (
                    <TableRow className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-gray-400" colSpan={6}>
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : appraisalCycles.length === 0 ? (
                    <TableRow className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-gray-400" colSpan={6}>
                        No appraisal cycles found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedCycles
                      .slice((cyclesPage - 1) * PAGE_SIZE, cyclesPage * PAGE_SIZE)
                      .map((cycle, index) => (
                      <TableRow key={cycle.cycle_id} className="border-gray-200 hover:bg-gray-50">
                        <TableCell className="text-gray-400">
                          {(cyclesPage - 1) * PAGE_SIZE + index + 1}
                        </TableCell>
                        <TableCell className="text-gray-800 font-medium">{cycle.cycle_year}</TableCell>
                        <TableCell className="text-gray-800">{formatDate(cycle.start_date)}</TableCell>
                        <TableCell className="text-gray-800">{formatDate(cycle.end_date)}</TableCell>
                        <TableCell>
                        <StatusBadge 
                          status={cycle.status === "active" ? "open" : "closed"} 
                        />
                        </TableCell>
                        <TableCell>
                          {isAdmin ? (
                            <div className="flex gap-2">
                              <AppraisalCycleDialog
                                mode="edit"
                                cycle={cycle}
                                onUpdate={async (id, payload) => {
                                  await updateAppraisalCycle(id, payload);
                                  refetchCycles();
                                }}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:text-red-300 hover:bg-[#252834]"
                                disabled={cycle.status === "active"}
                                onClick={async () => {
                                  setDeleteCycleId(cycle.cycle_id);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : null}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              {sortedCycles.length > PAGE_SIZE ? renderPagination(cyclesPage, setCyclesPage, sortedCycles.length) : null}
            </CardContent>
          </Card>

          <AlertDialog
            open={!!deleteCycleId}
            onOpenChange={(open) => {
              if (!open) setDeleteCycleId(null);
            }}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Appraisal Cycle?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove the cycle.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    if (!deleteCycleId) return;
                    await deleteAppraisalCycle(deleteCycleId);
                    setDeleteCycleId(null);
                    refetchCycles();
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Phase Control Card */}
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-gray-800">
                  Phase Controls{selectedCycle ? ` - ${selectedCycle.cycle_year} Cycle` : ""}
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Open or close phases to control user access for the current appraisal cycle
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-gray-500 text-sm">Cycle</Label>
                <Select
                  value={selectedCycleId ?? ""}
                  onValueChange={(value) => setSelectedCycleId(value)}
                >
                  <SelectTrigger className="w-[200px] bg-white border-gray-200 text-gray-800">
                    <SelectValue placeholder="Select cycle" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    {sortedCycles.map((cycle) => (
                      <SelectItem key={cycle.cycle_id} value={cycle.cycle_id} className="text-gray-800">
                        {cycle.cycle_year}{" "}
                        <span className="text-xs text-gray-400">
                          ({cycle.status})
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {!selectedCycleId ? (
                <div className="text-sm text-gray-500">
                  No appraisal cycles found. Create a cycle to manage phases.
                </div>
              ) : currentPhases.length === 0 ? (
                <div className="text-sm text-gray-500">
                  No phases configured for this cycle yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {currentPhases.map((phase) => (
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
                          Period: {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
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
                            disabled={!isAdmin}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300 hover:bg-[#1a1d29]"
                          disabled={!isAdmin}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Directorates Tab */}
        <TabsContent value="directorates">
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-800">Directorates</CardTitle>
              {isDirectorateAdmin ? (
                <DirectorateDialog
                  mode="add"
                  onCreate={async (payload) => {
                    await createDirectorate(payload);
                  }}
                  trigger={
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Directorate
                    </Button>
                  }
                />
              ) : null}
            </CardHeader>
            <CardContent>
              {directoratesError ? (
                <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {directoratesError}
                </div>
              ) : null}
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2d3a] hover:bg-[#252834]">
                    <TableHead className="text-gray-500">ID</TableHead>
                    <TableHead className="text-gray-500">Directorate</TableHead>
                    <TableHead className="text-gray-500">Created At</TableHead>
                    <TableHead className="text-gray-500">Options</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {directoratesLoading ? (
                    <TableRow className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-gray-400" colSpan={4}>
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : (
                    [...directorates]
                      .sort(
                        (a, b) =>
                          new Date(a.created_at).getTime() -
                          new Date(b.created_at).getTime()
                      )
                      .slice((directoratesPage - 1) * PAGE_SIZE, directoratesPage * PAGE_SIZE)
                      .map((directorate, index) => (
                        <TableRow key={directorate.directorate_id} className="border-gray-200 hover:bg-gray-50">
                          <TableCell className="text-gray-400">
                            {(directoratesPage - 1) * PAGE_SIZE + index + 1}
                          </TableCell>
                          <TableCell className="text-gray-500 font-medium">{directorate.name}</TableCell>
                          <TableCell className="text-gray-400">
                            {formatDate(directorate.created_at)}
                          </TableCell>
                          <TableCell>
                            {isDirectorateAdmin ? (
                              <div className="flex gap-2">
                                <DirectorateDialog
                                  mode="edit"
                                  initialName={directorate.name}
                                  onUpdate={async (payload) => {
                                    await updateDirectorate(directorate.directorate_id, payload);
                                  }}
                                  trigger={
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-blue-400 hover:text-blue-300 hover:bg-[#252834]"
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                  }
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-400 hover:text-red-300 hover:bg-[#252834]"
                                  onClick={async () => {
                                    setDeleteDirectorateId(directorate.directorate_id);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
              {directorates.length > PAGE_SIZE ? renderPagination(directoratesPage, setDirectoratesPage, directorates.length) : null}
            </CardContent>
          </Card>
          <AlertDialog
            open={!!deleteDirectorateId}
            onOpenChange={(open) => {
              if (!open) setDeleteDirectorateId(null);
            }}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Directorate?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove the directorate.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    if (!deleteDirectorateId) return;
                    await deleteDirectorate(deleteDirectorateId);
                    setDeleteDirectorateId(null);
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TabsContent>

        {/* Sections Tab */}
        <TabsContent value="sections">
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-800">Sections</CardTitle>
              {isSectionAdmin ? (
                <SectionDialog
                  mode="add"
                  directorates={directorates}
                  existingSections={sections}
                  disabled={directoratesLoading}
                  onCreate={async (payload) => {
                    await createSection(payload);
                  }}
                  trigger={
                    <Button className="bg-blue-600 hover:bg-blue-700" disabled={directoratesLoading}>
                      <Plus className="h-4 w-4 mr-2" />
                      {directoratesLoading ? "Loading directorates..." : "Add Section"}
                    </Button>
                  }
                />
              ) : null}
            </CardHeader>
            <CardContent>
              {sectionsError ? (
                <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {sectionsError}
                </div>
              ) : null}
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2d3a] hover:bg-[#252834]">
                    <TableHead className="text-gray-500">ID</TableHead>
                    <TableHead className="text-gray-500">Section</TableHead>
                    <TableHead className="text-gray-500">Directorate</TableHead>
                    <TableHead className="text-gray-500">Created At</TableHead>
                    <TableHead className="text-gray-500">Options</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sectionsLoading ? (
                    <TableRow className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-gray-400" colSpan={5}>
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : (
                    [...sections]
                      .sort(
                        (a, b) =>
                          new Date(a.created_at).getTime() -
                          new Date(b.created_at).getTime()
                      )
                      .slice((sectionsPage - 1) * PAGE_SIZE, sectionsPage * PAGE_SIZE)
                      .map((section, index) => (
                        <TableRow key={section.section_id} className="border-gray-200 hover:bg-gray-50">
                          <TableCell className="text-gray-400">
                            {(sectionsPage - 1) * PAGE_SIZE + index + 1}
                          </TableCell>
                          <TableCell className="text-gray-500 font-medium">{section.name}</TableCell>
                          <TableCell className="text-gray-400">
                            {directorateMap.get(section.directorate_id) || "—"}
                          </TableCell>
                          <TableCell className="text-gray-400">
                            {formatDate(section.created_at)}
                          </TableCell>
                          <TableCell>
                            {isSectionAdmin ? (
                              <div className="flex gap-2">
                                <SectionDialog
                                  mode="edit"
                                  directorates={directorates}
                                  existingSections={sections}
                                  initialName={section.name}
                                  initialDirectorateId={section.directorate_id}
                                  onUpdate={async (payload) => {
                                    await updateSection(section.section_id, payload);
                                  }}
                                  trigger={
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-blue-400 hover:text-blue-300 hover:bg-[#252834]"
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                  }
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-400 hover:text-red-300 hover:bg-[#252834]"
                                  onClick={async () => {
                                    setDeleteSectionId(section.section_id);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
              {sections.length > PAGE_SIZE ? renderPagination(sectionsPage, setSectionsPage, sections.length) : null}
            </CardContent>
          </Card>
          <AlertDialog
            open={!!deleteSectionId}
            onOpenChange={(open) => {
              if (!open) setDeleteSectionId(null);
            }}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Section?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove the section.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    if (!deleteSectionId) return;
                    await deleteSection(deleteSectionId);
                    setDeleteSectionId(null);
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TabsContent>

        {/* Grades Tab */}
        {/* <TabsContent value="grades">
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
        </TabsContent> */}

        {/* Staff Levels Tab */}
        <TabsContent value="positions">
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-gray-800">Staff Levels</CardTitle>
                {staffLevelsError ? (
                  <p className="text-sm text-red-600 mt-1">{staffLevelsError}</p>
                ) : null}
              </div>
              {isStaffLevelsAdmin ? (
                <StaffLevelDialog
                  mode="add"
                  existingLevels={staffLevels}
                  onCreate={async (payload) => {
                    await createStaffLevel(payload);
                    refetchStaffLevels();
                  }}
                  trigger={
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Staff Level
                    </Button>
                  }
                />
              ) : null}
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2d3a] hover:bg-[#252834]">
                    <TableHead className="text-gray-500">ID</TableHead>
                    <TableHead className="text-gray-500">Level Code</TableHead>
                    <TableHead className="text-gray-500">Rank</TableHead>
                    <TableHead className="text-gray-500">Name</TableHead>
                    <TableHead className="text-gray-500">Options</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffLevelsLoading ? (
                    <TableRow className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-gray-400" colSpan={5}>
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : (
                    [...staffLevels]
                      .sort((a, b) => a.level_rank - b.level_rank)
                      .slice((staffLevelsPage - 1) * PAGE_SIZE, staffLevelsPage * PAGE_SIZE)
                      .map((level, index) => (
                        <TableRow key={level.level_id} className="border-gray-200 hover:bg-gray-50">
                          <TableCell className="text-gray-400">
                            {(staffLevelsPage - 1) * PAGE_SIZE + index + 1}
                          </TableCell>
                          <TableCell className="text-gray-500 font-medium">{level.level_code}</TableCell>
                          <TableCell className="text-gray-400">{level.level_rank}</TableCell>
                          <TableCell className="text-gray-400">{level.level_name}</TableCell>
                          <TableCell>
                            {isStaffLevelsAdmin ? (
                              <div className="flex gap-2">
                                <StaffLevelDialog
                                  mode="edit"
                                  existingLevels={staffLevels}
                                  initialLevelCode={level.level_code}
                                  initialLevelRank={level.level_rank}
                                  initialLevelName={level.level_name}
                                  onUpdate={async (payload) => {
                                    await updateStaffLevel(level.level_id, payload);
                                    refetchStaffLevels();
                                  }}
                                  trigger={
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-blue-400 hover:text-blue-300 hover:bg-[#252834]"
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                  }
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-400 hover:text-red-300 hover:bg-[#252834]"
                                  disabled={deletingStaffLevelId === level.level_id}
                                  onClick={async () => {
                                    const confirmed = window.confirm("Delete this staff level? This cannot be undone.");
                                    if (!confirmed) return;
                                    setDeletingStaffLevelId(level.level_id);
                                    await deleteStaffLevel(level.level_id);
                                    setDeletingStaffLevelId(null);
                                    refetchStaffLevels();
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
              {staffLevels.length > PAGE_SIZE ? renderPagination(staffLevelsPage, setStaffLevelsPage, staffLevels.length) : null}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appraisal Route Tab */}
        <TabsContent value="routes">
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-800">Appraisal Route</CardTitle>
              {isRulesAdmin ? (
                <AppraisalRouteDialog
                  mode="add"
                  staffLevels={staffLevels}
                  existingRules={rules}
                  onSubmit={async (payload) => {
                    await createRule(payload);
                    refetchRules();
                  }}
                />
              ) : null}
            </CardHeader>
            <CardContent>
              {rulesError ? (
                <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {rulesError}
                </div>
              ) : null}
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2d3a] hover:bg-[#252834]">
                    <TableHead className="text-gray-500">ID</TableHead>
                    <TableHead className="text-gray-500">Appraisee Level</TableHead>
                    <TableHead className="text-gray-500">Appraiser Level</TableHead>
                    <TableHead className="text-gray-500">Status</TableHead>
                    <TableHead className="text-gray-500">Created</TableHead>
                    <TableHead className="text-gray-500">Options</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rulesLoading ? (
                    <TableRow className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-gray-400" colSpan={6}>
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : rules.length === 0 ? (
                    <TableRow className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-gray-400" colSpan={6}>
                        No appraisal routes found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    rules
                      .slice((routesPage - 1) * PAGE_SIZE, routesPage * PAGE_SIZE)
                      .map((rule, index) => (
                      <TableRow key={rule.rule_id} className="border-gray-200 hover:bg-gray-50">
                        <TableCell className="text-gray-400">
                          {(routesPage - 1) * PAGE_SIZE + index + 1}
                        </TableCell>
                        <TableCell className="text-gray-500 font-medium">
                          {staffLevelMap.get(rule.appraisee_level_id)?.level_code || "—"}
                        </TableCell>
                        <TableCell className="text-gray-500">
                          {staffLevelMap.get(rule.appraiser_level_id)?.level_code || "—"}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              rule.is_active
                                ? "bg-green-300/20 text-green-600"
                                : "bg-red-300/20 text-red-600"
                            }`}
                          >
                            {rule.is_active ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-500">
                          {formatDate(rule.created_at)}
                        </TableCell>
                        <TableCell>
                          {isRulesAdmin ? (
                            <div className="flex items-center gap-2">
                              <AppraisalRouteDialog
                                mode="edit"
                                staffLevels={staffLevels}
                                existingRules={rules}
                                initialRule={rule}
                                onSubmit={async (payload) => {
                                  await updateRule(rule.rule_id, payload);
                                  refetchRules();
                                }}
                              />
                              <Switch
                                checked={rule.is_active}
                                onCheckedChange={(next) =>
                                  updateRule(rule.rule_id, {
                                    appraisee_level_id: rule.appraisee_level_id,
                                    appraiser_level_id: rule.appraiser_level_id,
                                    is_active: next,
                                  })
                                }
                                className="data-[state=checked]:bg-green-600"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:text-red-300 hover:bg-[#252834]"
                                onClick={async () => {
                                  const confirmed = window.confirm("Delete this appraisal route? This cannot be undone.");
                                  if (!confirmed) return;
                                  await deleteRule(rule.rule_id);
                                  refetchRules();
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              {rules.length > PAGE_SIZE ? renderPagination(routesPage, setRoutesPage, rules.length) : null}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assign Heads Tab */}
        <TabsContent value="assign-heads">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <CardTitle className="text-gray-800">Assign Heads</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Select value={assignFilterType} onValueChange={(value) => setAssignFilterType(value as "all" | "directorates" | "sections")}>
                    <SelectTrigger className="w-[200px] bg-white border-gray-200 text-gray-800">
                      <SelectValue placeholder="Filter type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="directorates">Directorates only</SelectItem>
                      <SelectItem value="sections">Sections only</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={assignDirectorateFilter} onValueChange={setAssignDirectorateFilter}>
                    <SelectTrigger className="w-[220px] bg-white border-gray-200 text-gray-800">
                      <SelectValue placeholder="All directorates" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="all">All directorates</SelectItem>
                      {directorates
                        .slice()
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((dir) => (
                          <SelectItem key={dir.directorate_id} value={dir.directorate_id}>
                            {dir.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Search..."
                    className="w-[200px] bg-white border-gray-200 text-gray-800"
                    value={assignSearch}
                    onChange={(e) => setAssignSearch(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {(directoratesLoading || sectionsLoading || staffLoading || staffLevelsLoading || directorateHeadsLoading || sectionHeadsLoading) ? (
                <div className="text-sm text-gray-500">Loading...</div>
              ) : assignRows.length === 0 ? (
                <div className="text-sm text-gray-500">No results</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#2a2d3a] hover:bg-[#252834]">
                      {assignFilterType === "all" && <TableHead className="text-gray-500">Type</TableHead>}
                      <TableHead className="text-gray-500">Directorate</TableHead>
                      {assignFilterType !== "directorates" && <TableHead className="text-gray-500">Section</TableHead>}
                      <TableHead className="text-gray-500">Assigned Head</TableHead>
                      <TableHead className="text-gray-500">Level</TableHead>
                      <TableHead className="text-gray-500">Status</TableHead>
                      <TableHead className="text-gray-500">Assigned At</TableHead>
                      <TableHead className="text-gray-500">Options</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignRows.map((row, index) => {
                      const head = row.headStaff;
                      const levelCode = head ? levelMap.get(head.level_id)?.level_code : undefined;
                      const headName = head ? `${head.first_name} ${head.last_name}` : "—";
                      const headEmail = head?.email ? ` (${head.email})` : "";
                      const isDirectorate = row.type === "directorate";
                      const assignedLabel = head ? "Change" : "Assign";
                      return (
                        <TableRow key={`${row.type}-${row.directorate.directorate_id}-${row.section?.section_id ?? index}`} className="border-gray-200 hover:bg-gray-50">
                          {assignFilterType === "all" && (
                            <TableCell className="text-gray-400">
                              {isDirectorate ? "Directorate" : "Section"}
                            </TableCell>
                          )}
                          <TableCell className="text-gray-500 font-medium">{row.directorate.name}</TableCell>
                          {assignFilterType !== "directorates" && (
                            <TableCell className="text-gray-400">{row.section?.name || "—"}</TableCell>
                          )}
                          <TableCell className="text-gray-400">
                            {headName}
                            {headEmail}
                          </TableCell>
                          <TableCell className="text-gray-400">{levelCode || "—"}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                head?.is_active
                                  ? "bg-green-300/20 text-green-600"
                                  : "bg-red-300/20 text-red-600"
                              }`}
                            >
                              {head?.is_active ? "Active" : "Inactive"}
                            </span>
                          </TableCell>
                          <TableCell className="text-gray-400">
                            {row.assignedAt ? new Date(row.assignedAt).toLocaleString() : "—"}
                          </TableCell>
                          <TableCell>
                            {isDirectorate ? (
                              <AssignDirectorDialog
                                directorates={directorates}
                                staffLevels={staffLevels}
                                existingAssignments={directorateHeadMap}
                                initialDirectorateId={row.directorate.directorate_id}
                                onAssign={async (directorate_id, staff_id) => {
                                  const hasExisting = directorateHeadMap.has(directorate_id);
                                  if (hasExisting) {
                                    await updateDirectorateHead(directorate_id, { directorate_id, head_staff_id: staff_id });
                                  } else {
                                    await assignDirectorateHead({ directorate_id, head_staff_id: staff_id });
                                  }
                                  refetchDirectorateHeads();
                                }}
                                onRemove={async (directorate_id) => {
                                  await removeDirectorateHead(directorate_id);
                                  refetchDirectorateHeads();
                                }}
                                staffDirectory={staffDirectory}
                                trigger={
                                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    {assignedLabel}
                                  </Button>
                                }
                              />
                            ) : (
                              <AssignSectionHeadDialog
                                sections={sections}
                                staffLevels={staffLevels}
                                existingAssignments={sectionHeadMap}
                                initialSectionId={row.section?.section_id}
                                onAssign={async (section_id, staff_id) => {
                                  const hasExisting = sectionHeadMap.has(section_id);
                                  if (hasExisting) {
                                    await updateSectionHead(section_id, { section_id, head_staff_id: staff_id });
                                  } else {
                                    await assignSectionHead({ section_id, head_staff_id: staff_id });
                                  }
                                  refetchSectionHeads();
                                }}
                                onRemove={async (section_id) => {
                                  await removeSectionHead(section_id);
                                  refetchSectionHeads();
                                }}
                                staffDirectory={staffDirectory}
                                trigger={
                                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    {assignedLabel}
                                  </Button>
                                }
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Staff Tab */}
        <TabsContent value="staff">
          <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-800">Staff</CardTitle>
              {isStaffAdmin ? (
                <StaffDialog
                  mode="add"
                  sections={sections}
                  directorates={directorates}
                  staffLevels={staffLevels}
                  sectionsLoading={sectionsLoading}
                  directoratesLoading={directoratesLoading}
                  staffLevelsLoading={staffLevelsLoading}
                  onSubmit={async (payload) => {
                    await createStaff(payload);
                    refetchStaff();
                  }}
                  trigger={
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={sectionsLoading || directoratesLoading || staffLevelsLoading}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Staff
                    </Button>
                  }
                />
              ) : null}
            </CardHeader>
            <CardContent>
              {staffError ? (
                <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {staffError}{" "}
                  <Button variant="link" className="px-1" onClick={refetchStaff}>
                    Retry
                  </Button>
                </div>
              ) : null}
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2a2d3a] hover:bg-[#252834]">
                    <TableHead className="text-gray-500">ID</TableHead>
                    <TableHead className="text-gray-500">Staff No</TableHead>
                    <TableHead className="text-gray-500">Name</TableHead>
                    <TableHead className="text-gray-500">Email</TableHead>
                    <TableHead className="text-gray-500">Phone</TableHead>
                    <TableHead className="text-gray-500">Section</TableHead>
                    <TableHead className="text-gray-500">Level</TableHead>
                    <TableHead className="text-gray-500">Status</TableHead>
                    <TableHead className="text-gray-500">Created At</TableHead>
                    <TableHead className="text-gray-500">Options</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffLoading ? (
                    <TableRow className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-gray-400" colSpan={10}>
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : staff.length === 0 ? (
                    <TableRow className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-gray-400" colSpan={10}>
                        No staff found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    [...staff]
                      .sort((a, b) => {
                        if (a.is_active !== b.is_active) return a.is_active ? -1 : 1;
                        return a.last_name.localeCompare(b.last_name);
                      })
                      .slice((staffPage - 1) * PAGE_SIZE, staffPage * PAGE_SIZE)
                      .map((member, index) => (
                        <TableRow key={member.staff_id} className="border-gray-200 hover:bg-gray-50">
                          <TableCell className="text-gray-400">
                            {(staffPage - 1) * PAGE_SIZE + index + 1}
                          </TableCell>
                          <TableCell className="text-gray-400">{member.staff_no || "—"}</TableCell>
                          <TableCell className="text-gray-500 font-medium">
                            {member.first_name} {member.last_name}
                          </TableCell>
                          <TableCell className="text-gray-400">{member.email}</TableCell>
                          <TableCell className="text-gray-400">{member.phone || "—"}</TableCell>
                          <TableCell className="text-gray-400">
                            {directorateMap.get(member.directorate_id) || "—"}
                          </TableCell>
                          <TableCell className="text-gray-400">
                            {sectionMap.get(member.section_id) || "—"}
                          </TableCell>
                          <TableCell className="text-gray-400">
                            {levelMap.get(member.level_id)?.level_code || "—"}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                member.is_active
                                  ? "bg-green-300/20 text-green-600"
                                  : "bg-red-300/20 text-red-600"
                              }`}
                            >
                              {member.is_active ? "Active" : "Inactive"}
                            </span>
                          </TableCell>
                          <TableCell className="text-gray-400">
                            {formatDate(member.created_at)}
                          </TableCell>
                          <TableCell>
                            {isStaffAdmin ? (
                              <div className="flex gap-2">
                                <StaffDialog
                                  mode="edit"
                                  sections={sections}
                                  directorates={directorates}
                                  staffLevels={staffLevels}
                                  sectionsLoading={sectionsLoading}
                                  directoratesLoading={directoratesLoading}
                                  staffLevelsLoading={staffLevelsLoading}
                                  initialStaff={member}
                                  onSubmit={async (payload) => {
                                    await updateStaff(member.staff_id, payload);
                                    refetchStaff();
                                  }}
                                  trigger={
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-blue-400 hover:text-blue-300 hover:bg-[#252834]"
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                  }
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-400 hover:text-red-300 hover:bg-[#252834]"
                                  disabled={!member.is_active || deactivatingStaffId === member.staff_id}
                                  onClick={async () => {
                                    const confirmed = window.confirm("Deactivate this staff member? They will not be able to log in.");
                                    if (!confirmed) return;
                                    setDeactivatingStaffId(member.staff_id);
                                    await deactivateStaff(member.staff_id);
                                    setDeactivatingStaffId(null);
                                    refetchStaff();
                                  }}
                                  aria-label="Deactivate"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
              {staff.length > PAGE_SIZE ? renderPagination(staffPage, setStaffPage, staff.length) : null}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Directorate Dialog Component
function DirectorateDialog({
  mode,
  initialName = "",
  onCreate,
  onUpdate,
  onOpenChange,
  trigger,
}: {
  mode: "add" | "edit";
  initialName?: string;
  onCreate?: (payload: { name: string }) => Promise<void>;
  onUpdate?: (payload: { name: string }) => Promise<void>;
  onOpenChange?: (open: boolean) => void;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName, open]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        onOpenChange?.(next);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-[#1a1d29] border-[#2a2d3a] text-white">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Directorate" : "Edit Directorate"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter the details for the directorate
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="dir-name" className="text-gray-300">Directorate Name</Label>
            <Input
              id="dir-name"
              placeholder="e.g., Information Technology"
              className="bg-[#252834] border-[#2a2d3a] text-white"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-[#2a2d3a] text-gray-400 hover:bg-[#252834]">
            Cancel
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={async () => {
              if (!name.trim()) return;
              if (mode === "add") {
                await onCreate?.({ name: name.trim() });
              } else {
                await onUpdate?.({ name: name.trim() });
              }
              setOpen(false);
            }}
          >
            {mode === "add" ? "Add Directorate" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Section Dialog Component
function SectionDialog({
  mode,
  directorates,
  existingSections,
  initialName = "",
  initialDirectorateId = "",
  onCreate,
  onUpdate,
  trigger,
  disabled,
}: {
  mode: "add" | "edit";
  directorates: Directorate[];
  existingSections: Section[];
  initialName?: string;
  initialDirectorateId?: string;
  onCreate?: (payload: { name: string; directorate_id: string }) => Promise<void>;
  onUpdate?: (payload: { name: string; directorate_id: string }) => Promise<void>;
  trigger: React.ReactNode;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initialName);
  const [directorateId, setDirectorateId] = useState(initialDirectorateId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setName(initialName);
      setDirectorateId(initialDirectorateId);
      setError(null);
    }
  }, [open, initialName, initialDirectorateId]);

  const handleSave = async () => {
    if (!name.trim() || !directorateId) {
      setError("Please provide section name and directorate.");
      return;
    }
    const duplicate = existingSections.some(
      (s) =>
        s.directorate_id === directorateId &&
        s.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    if (duplicate) {
      setError("This section already exists in the selected directorate.");
      return;
    }
    if (mode === "add") {
      await onCreate?.({ name: name.trim(), directorate_id: directorateId });
    } else {
      await onUpdate?.({ name: name.trim(), directorate_id: directorateId });
    }
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (disabled) return;
        setOpen(next);
      }}
    >
      <DialogTrigger asChild disabled={disabled}>
        {trigger}
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
            <Label htmlFor="sec-name" className="text-gray-300">Section Name</Label>
            <Input
              id="sec-name"
              placeholder="e.g., Quality Assurance"
              className="bg-[#252834] border-[#2a2d3a] text-white"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sec-directorate" className="text-gray-300">Directorate</Label>
            <Select value={directorateId} onValueChange={setDirectorateId}>
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
          {error ? (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          ) : null}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-[#2a2d3a] text-gray-400 hover:bg-[#252834]">
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
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
function StaffLevelDialog({
  mode,
  existingLevels,
  initialLevelCode = "",
  initialLevelRank = 1,
  initialLevelName = "",
  onCreate,
  onUpdate,
  trigger,
}: {
  mode: "add" | "edit";
  existingLevels: StaffLevel[];
  initialLevelCode?: string;
  initialLevelRank?: number;
  initialLevelName?: string;
  onCreate?: (payload: { level_code: string; level_rank: number; level_name: string }) => Promise<void>;
  onUpdate?: (payload: { level_code: string; level_rank: number; level_name: string }) => Promise<void>;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [levelCode, setLevelCode] = useState(initialLevelCode);
  const [levelRank, setLevelRank] = useState<number>(initialLevelRank);
  const [levelName, setLevelName] = useState(initialLevelName);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setLevelCode(initialLevelCode);
      setLevelRank(initialLevelRank);
      setLevelName(initialLevelName);
      setError(null);
    }
  }, [open, initialLevelCode, initialLevelRank, initialLevelName]);

  const handleSave = async () => {
    const code = levelCode.trim().toUpperCase();
    if (!code || !levelName.trim() || !Number.isInteger(levelRank) || levelRank <= 0) {
      setError("All fields are required and rank must be a positive integer.");
      return;
    }
    const duplicateCode = existingLevels.some(
      (l) => l.level_code.toUpperCase() === code && l.level_code !== initialLevelCode
    );
    const duplicateRank = existingLevels.some(
      (l) => l.level_rank === levelRank && l.level_rank !== initialLevelRank
    );
    if (duplicateCode) {
      setError("Level code already exists.");
      return;
    }
    if (duplicateRank) {
      setError("Level rank already exists.");
      return;
    }
    const payload = { level_code: code, level_rank: levelRank, level_name: levelName.trim() };
    if (mode === "add") {
      await onCreate?.(payload);
    } else {
      await onUpdate?.(payload);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-[#1a1d29] border-[#2a2d3a] text-white">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add Staff Level" : "Edit Staff Level"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter the staff level details
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="level-code" className="text-gray-300">Level Code</Label>
            <Input
              id="level-code"
              placeholder="e.g., OFFICER"
              className="bg-[#252834] border-[#2a2d3a] text-white"
              value={levelCode}
              onChange={(event) => setLevelCode(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="level-rank" className="text-gray-300">Rank</Label>
            <Input
              id="level-rank"
              type="number"
              min={1}
              className="bg-[#252834] border-[#2a2d3a] text-white"
              value={levelRank}
              onChange={(event) => setLevelRank(Number(event.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="level-name" className="text-gray-300">Name</Label>
            <Input
              id="level-name"
              placeholder="e.g., Officer"
              className="bg-[#252834] border-[#2a2d3a] text-white"
              value={levelName}
              onChange={(event) => setLevelName(event.target.value)}
            />
          </div>
          {error ? (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          ) : null}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-[#2a2d3a] text-gray-400 hover:bg-[#252834]">
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
            {mode === "add" ? "Add Staff Level" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StaffDialog({
  mode,
  sections,
  directorates,
  staffLevels,
  sectionsLoading,
  directoratesLoading,
  staffLevelsLoading,
  initialStaff,
  onSubmit,
  trigger,
}: {
  mode: "add" | "edit";
  sections: Section[];
  directorates: Directorate[];
  staffLevels: StaffLevel[];
  sectionsLoading: boolean;
  directoratesLoading: boolean;
  staffLevelsLoading: boolean;
  initialStaff?: StaffMember;
  onSubmit: (payload: {
    staff_no?: string | null;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string | null;
    directorate_id: string;
    section_id: string;
    level_id: number;
    password?: string;
  }) => Promise<void>;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [staffNo, setStaffNo] = useState(initialStaff?.staff_no || "");
  const [firstName, setFirstName] = useState(initialStaff?.first_name || "");
  const [lastName, setLastName] = useState(initialStaff?.last_name || "");
  const [email, setEmail] = useState(initialStaff?.email || "");
  const [phone, setPhone] = useState(initialStaff?.phone || "");
  const [directorateId, setDirectorateId] = useState(initialStaff?.directorate_id || "");
  const [sectionId, setSectionId] = useState(initialStaff?.section_id || "");
  const [levelId, setLevelId] = useState(
    initialStaff?.level_id ? String(initialStaff.level_id) : ""
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const filteredSections = useMemo(
    () => sections.filter((s) => s.directorate_id === directorateId),
    [sections, directorateId]
  );

  const resetForm = () => {
    setStaffNo(initialStaff?.staff_no || "");
    setFirstName(initialStaff?.first_name || "");
    setLastName(initialStaff?.last_name || "");
    setEmail(initialStaff?.email || "");
    setPhone(initialStaff?.phone || "");
    const inferredDirectorateId =
      initialStaff?.directorate_id ||
      sections.find((s) => s.section_id === initialStaff?.section_id)?.directorate_id ||
      "";
    setDirectorateId(inferredDirectorateId);
    setSectionId(initialStaff?.section_id || "");
    setLevelId(initialStaff?.level_id ? String(initialStaff.level_id) : "");
    setPassword("");
    setError(null);
    setSubmitError(null);
  };

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open, initialStaff, sections]);

  const handleSave = async () => {
    setSubmitError(null);
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!firstName.trim() || !lastName.trim() || !emailOk || !directorateId || !sectionId || !levelId) {
      setError("Please complete all required fields with a valid email.");
      return;
    }
    const sectionMatches = sections.find(
      (s) => s.section_id === sectionId && s.directorate_id === directorateId
    );
    if (!sectionMatches) {
      setError("Selected section does not belong to the chosen directorate.");
      return;
    }
    if (mode === "add" && !password.trim()) {
      setError("Password is required for new staff.");
      return;
    }

    const payload = {
      staff_no: staffNo.trim() || null,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      directorate_id: directorateId,
      section_id: sectionId,
      level_id: Number(levelId),
      ...(password.trim() ? { password: password.trim() } : {}),
    };
    try {
      setSaving(true);
      await onSubmit(payload);
      setOpen(false);
      resetForm();
    } catch (err: any) {
      setSubmitError(err?.message || "Failed to save staff");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (saving) return;
        setOpen(next);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-[#1a1d29] border-[#2a2d3a] text-white">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add Staff" : "Edit Staff"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter staff details below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {(sectionsLoading || directoratesLoading || staffLevelsLoading) ? (
            <div className="text-xs text-gray-400">
              Loading data...
            </div>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="staff-no" className="text-gray-300">Staff No</Label>
            <Input
              id="staff-no"
              className="bg-[#252834] border-[#2a2d3a] text-white"
              value={staffNo}
              onChange={(e) => setStaffNo(e.target.value)}
              disabled={saving}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name" className="text-gray-300">First Name</Label>
            <Input
              id="first-name"
              className="bg-[#252834] border-[#2a2d3a] text-white"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={saving}
            />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name" className="text-gray-300">Last Name</Label>
            <Input
              id="last-name"
              className="bg-[#252834] border-[#2a2d3a] text-white"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={saving}
            />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              className="bg-[#252834] border-[#2a2d3a] text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={saving}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-300">Phone</Label>
            <Input
              id="phone"
              className="bg-[#252834] border-[#2a2d3a] text-white"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={saving}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="directorate" className="text-gray-300">Directorate</Label>
            <Select
              value={directorateId}
              onValueChange={(value) => {
                setDirectorateId(value);
                setSectionId("");
              }}
              disabled={directoratesLoading || saving}
            >
              <SelectTrigger className="bg-[#252834] border-[#2a2d3a] text-white">
                <SelectValue placeholder={directoratesLoading ? "Loading directorates..." : "Select directorate"} />
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
            <Label htmlFor="section" className="text-gray-300">Section</Label>
            <Select
              value={sectionId}
              onValueChange={setSectionId}
              disabled={sectionsLoading || !directorateId || saving}
            >
              <SelectTrigger className="bg-[#252834] border-[#2a2d3a] text-white">
                <SelectValue
                  placeholder={
                    sectionsLoading
                      ? "Loading sections..."
                      : directorateId
                        ? "Select section"
                        : "Select directorate first"
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1d29] border-[#2a2d3a]">
                {filteredSections.map((section) => (
                  <SelectItem key={section.section_id} value={section.section_id} className="text-white hover:bg-[#252834]">
                    {section.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="level" className="text-gray-300">Staff Level</Label>
            <Select value={levelId} onValueChange={setLevelId} disabled={staffLevelsLoading || saving}>
              <SelectTrigger className="bg-[#252834] border-[#2a2d3a] text-white">
                <SelectValue placeholder={staffLevelsLoading ? "Loading levels..." : "Select level"} />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1d29] border-[#2a2d3a]">
                {[...staffLevels]
                  .sort((a, b) => a.level_rank - b.level_rank)
                  .map((level) => (
                    <SelectItem key={level.level_id} value={String(level.level_id)} className="text-white hover:bg-[#252834]">
                      {level.level_code} - {level.level_name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">Password {mode === "edit" ? "(optional)" : ""}</Label>
            <Input
              id="password"
              type="password"
              className="bg-[#252834] border-[#2a2d3a] text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={saving}
            />
          </div>
          {error ? (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          ) : null}
          {submitError ? (
            <p className="text-sm text-red-600">{submitError}</p>
          ) : null}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-[#2a2d3a] text-gray-400 hover:bg-[#252834]"
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSave}
            disabled={saving || sectionsLoading || directoratesLoading || staffLevelsLoading}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {mode === "add" ? "Adding staff..." : "Saving changes..."}
              </>
            ) : mode === "add" ? (
              "Add Staff"
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AssignDirectorDialog({
  directorates,
  staffLevels,
  existingAssignments,
  initialDirectorateId,
  onAssign,
  onRemove,
  trigger,
  staffDirectory,
}: {
  directorates: Directorate[];
  staffLevels: StaffLevel[];
  existingAssignments: Map<string, DirectorateHead>;
  initialDirectorateId?: string;
  onAssign: (directorate_id: string, staff_id: number) => Promise<void>;
  onRemove: (directorate_id: string) => Promise<void>;
  trigger: React.ReactNode;
  staffDirectory: ReturnType<typeof useStaffDirectory>;
}) {
  const [open, setOpen] = useState(false);
  const [directorateId, setDirectorateId] = useState(initialDirectorateId || "");
  const [staffId, setStaffId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const staffLevelMap = useMemo(
    () => new Map(staffLevels.map((l) => [l.level_id, l.level_code])),
    [staffLevels]
  );
  const eligibleStaff = staffDirectory.results.filter(
    (s) => s.is_active && staffLevelMap.get(s.level_id) === "DIRECTOR"
  );
  const alreadyAssigned = staffId
    ? Array.from(existingAssignments.values()).some(
        (h) => h.head_staff_id === Number(staffId)
      )
    : false;
  const hasAssignment = directorateId ? existingAssignments.has(directorateId) : false;

  const handleSave = async () => {
    if (!directorateId || !staffId) {
      setError("Please select both directorate and staff.");
      return;
    }
    await onAssign(directorateId, Number(staffId));
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          staffDirectory.prefetchAll();
          staffDirectory.setQuery("");
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-[#1a1d29] border-[#2a2d3a] text-white">
        <DialogHeader>
          <DialogTitle>Assign Director</DialogTitle>
          <DialogDescription className="text-gray-400">
            Select a directorate and an active director.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Directorate</Label>
            <Select value={directorateId} onValueChange={setDirectorateId}>
              <SelectTrigger className="bg-[#252834] border-[#2a2d3a] text-white">
                <SelectValue placeholder="Select directorate" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1d29] border-[#2a2d3a]">
                {directorates
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((dir) => (
                    <SelectItem key={dir.directorate_id} value={dir.directorate_id} className="text-white hover:bg-[#252834]">
                      {dir.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">Staff</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-[#252834] border-[#2a2d3a] text-white"
                >
                  {staffId
                    ? eligibleStaff.find((s) => s.staff_id === Number(staffId))?.first_name +
                      " " +
                      eligibleStaff.find((s) => s.staff_id === Number(staffId))?.last_name
                    : "Select staff"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 bg-[#1a1d29] border-[#2a2d3a] text-white w-[320px]">
                <Command>
                  <CommandInput
                    placeholder="Search staff..."
                    value={staffDirectory.query}
                    onValueChange={staffDirectory.setQuery}
                  />
                  <CommandList>
                    {staffDirectory.loading ? (
                      <CommandEmpty>Loading...</CommandEmpty>
                    ) : staffDirectory.query.trim().length < 2 ? (
                      <CommandEmpty>Type at least 2 characters...</CommandEmpty>
                    ) : eligibleStaff.length === 0 ? (
                      <CommandEmpty>No results</CommandEmpty>
                    ) : (
                      eligibleStaff.slice(0, 50).map((s) => (
                        <CommandItem
                          key={s.staff_id}
                          value={`${s.first_name} ${s.last_name}`}
                          onSelect={() => setStaffId(String(s.staff_id))}
                        >
                          {s.first_name} {s.last_name} — {s.email}
                        </CommandItem>
                      ))
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {alreadyAssigned ? (
              <p className="text-xs text-amber-400">This staff is already assigned as a head elsewhere.</p>
            ) : null}
          </div>
          {error ? (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          ) : null}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-[#2a2d3a] text-gray-400 hover:bg-[#252834]">
            Cancel
          </Button>
          {hasAssignment ? (
            <Button
              variant="destructive"
              onClick={async () => {
                if (!directorateId) return;
                await onRemove(directorateId);
                setOpen(false);
              }}
            >
              Remove
            </Button>
          ) : null}
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AssignSectionHeadDialog({
  sections,
  staffLevels,
  existingAssignments,
  initialSectionId,
  onAssign,
  onRemove,
  trigger,
  staffDirectory,
}: {
  sections: Section[];
  staffLevels: StaffLevel[];
  existingAssignments: Map<string, SectionHead>;
  initialSectionId?: string;
  onAssign: (section_id: string, staff_id: number) => Promise<void>;
  onRemove: (section_id: string) => Promise<void>;
  trigger: React.ReactNode;
  staffDirectory: ReturnType<typeof useStaffDirectory>;
}) {
  const [open, setOpen] = useState(false);
  const [sectionId, setSectionId] = useState(initialSectionId || "");
  const [staffId, setStaffId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const staffLevelMap = useMemo(
    () => new Map(staffLevels.map((l) => [l.level_id, l.level_code])),
    [staffLevels]
  );
  const eligibleStaff = staffDirectory.results.filter(
    (s) => s.is_active && staffLevelMap.get(s.level_id) === "SECTIONAL_HEAD"
  );
  const alreadyAssigned = staffId
    ? Array.from(existingAssignments.values()).some(
        (h) => h.head_staff_id === Number(staffId)
      )
    : false;
  const hasAssignment = sectionId ? existingAssignments.has(sectionId) : false;

  const handleSave = async () => {
    if (!sectionId || !staffId) {
      setError("Please select both section and staff.");
      return;
    }
    await onAssign(sectionId, Number(staffId));
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          staffDirectory.prefetchAll();
          staffDirectory.setQuery("");
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-[#1a1d29] border-[#2a2d3a] text-white">
        <DialogHeader>
          <DialogTitle>Assign Sectional Head</DialogTitle>
          <DialogDescription className="text-gray-400">
            Select a section and an active sectional head.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Section</Label>
            <Select value={sectionId} onValueChange={setSectionId}>
              <SelectTrigger className="bg-[#252834] border-[#2a2d3a] text-white">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1d29] border-[#2a2d3a]">
                {sections
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((sec) => (
                    <SelectItem key={sec.section_id} value={sec.section_id} className="text-white hover:bg-[#252834]">
                      {sec.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">Staff</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-[#252834] border-[#2a2d3a] text-white"
                >
                  {staffId
                    ? eligibleStaff.find((s) => s.staff_id === Number(staffId))?.first_name +
                      " " +
                      eligibleStaff.find((s) => s.staff_id === Number(staffId))?.last_name
                    : "Select staff"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 bg-[#1a1d29] border-[#2a2d3a] text-white w-[320px]">
                <Command>
                  <CommandInput
                    placeholder="Search staff..."
                    value={staffDirectory.query}
                    onValueChange={staffDirectory.setQuery}
                  />
                  <CommandList>
                    {staffDirectory.loading ? (
                      <CommandEmpty>Loading...</CommandEmpty>
                    ) : staffDirectory.query.trim().length < 2 ? (
                      <CommandEmpty>Type at least 2 characters...</CommandEmpty>
                    ) : eligibleStaff.length === 0 ? (
                      <CommandEmpty>No results</CommandEmpty>
                    ) : (
                      eligibleStaff.slice(0, 50).map((s) => (
                        <CommandItem
                          key={s.staff_id}
                          value={`${s.first_name} ${s.last_name}`}
                          onSelect={() => setStaffId(String(s.staff_id))}
                        >
                          {s.first_name} {s.last_name} — {s.email}
                        </CommandItem>
                      ))
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {alreadyAssigned ? (
              <p className="text-xs text-amber-400">This staff is already assigned as a head elsewhere.</p>
            ) : null}
          </div>
          {error ? (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          ) : null}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-[#2a2d3a] text-gray-400 hover:bg-[#252834]">
            Cancel
          </Button>
          {hasAssignment ? (
            <Button
              variant="destructive"
              onClick={async () => {
                if (!sectionId) return;
                await onRemove(sectionId);
                setOpen(false);
              }}
            >
              Remove
            </Button>
          ) : null}
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
// Appraisal Route Dialog Component
function AppraisalRouteDialog({
  mode,
  staffLevels,
  existingRules,
  initialRule,
  onSubmit,
}: {
  mode: "add" | "edit";
  staffLevels: StaffLevel[];
  existingRules: AppraisalRouteRule[];
  initialRule?: AppraisalRouteRule;
  onSubmit: (payload: {
    appraisee_level_id: number;
    appraiser_level_id: number;
    is_active: boolean;
  }) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [appraiseeId, setAppraiseeId] = useState<string>("");
  const [appraiserId, setAppraiserId] = useState<string>("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setAppraiseeId(initialRule ? String(initialRule.appraisee_level_id) : "");
      setAppraiserId(initialRule ? String(initialRule.appraiser_level_id) : "");
      setIsActive(initialRule ? initialRule.is_active : true);
      setError(null);
    }
  }, [open, initialRule]);

  const handleSave = async () => {
    if (!appraiseeId || !appraiserId) {
      setError("Please select both levels.");
      return;
    }
    if (appraiseeId === appraiserId) {
      setError("Appraisee and appraiser levels cannot be the same.");
      return;
    }
    const appraiseeLevelId = Number(appraiseeId);
    const appraiserLevelId = Number(appraiserId);

    const conflict = existingRules.some((rule) => {
      if (mode === "edit" && initialRule && rule.rule_id === initialRule.rule_id) {
        return false;
      }
      return rule.appraisee_level_id === appraiseeLevelId;
    });
    if (conflict) {
      setError("An appraiser already exists for the selected appraisee level.");
      return;
    }

    await onSubmit({
      appraisee_level_id: appraiseeLevelId,
      appraiser_level_id: appraiserLevelId,
      is_active: isActive,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={
            mode === "add"
              ? "bg-blue-600 hover:bg-blue-700"
              : "text-blue-400 hover:text-blue-300 hover:bg-[#252834]"
          }
          variant={mode === "add" ? "default" : "ghost"}
          size={mode === "add" ? "default" : "sm"}
        >
          {mode === "add" ? (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add Appraisal Route
            </>
          ) : (
            <Pencil className="h-4 w-4" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1d29] border-[#2a2d3a] text-white">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add Appraisal Route" : "Edit Appraisal Route"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Define the appraisal workflow by selecting appraisee and appraiser levels.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="appraisee-level" className="text-gray-300">
              Appraisee Level
            </Label>
            <Select value={appraiseeId} onValueChange={setAppraiseeId}>
              <SelectTrigger className="bg-[#252834] border-[#2a2d3a] text-white">
                <SelectValue placeholder="Select appraisee level" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1d29] border-[#2a2d3a]">
                {[...staffLevels]
                  .sort((a, b) => a.level_rank - b.level_rank)
                  .map((level) => (
                    <SelectItem
                      key={level.level_id}
                      value={String(level.level_id)}
                      className="text-white hover:bg-[#252834]"
                    >
                      {level.level_code}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="appraiser-level" className="text-gray-300">
              Appraiser Level
            </Label>
            <Select value={appraiserId} onValueChange={setAppraiserId}>
              <SelectTrigger className="bg-[#252834] border-[#2a2d3a] text-white">
                <SelectValue placeholder="Select appraiser level" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1d29] border-[#2a2d3a]">
                {[...staffLevels]
                  .sort((a, b) => a.level_rank - b.level_rank)
                  .map((level) => (
                    <SelectItem
                      key={level.level_id}
                      value={String(level.level_id)}
                      className="text-white hover:bg-[#252834]"
                    >
                      {level.level_code}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
              className="data-[state=checked]:bg-green-600"
            />
            <span className="text-sm text-gray-300">Active</span>
          </div>
          {error ? (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          ) : null}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-[#2a2d3a] text-gray-400 hover:bg-[#252834]"
          >
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
            Save Route
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function Page() {
  return <OrganizationSetup />;
}
