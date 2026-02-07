"use client";

import { useState, useEffect, use } from "react";
import { Button } from "../app/components/ui/button";
import { Input } from "../app/components/ui/input";
import { Label } from "../app/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../app/components/ui/select";

import { Plus, Pencil, Trash2 } from "lucide-react";
import type {
  AppraisalCycle,
  CreateAppraisalCyclePayload,
} from "./useAppraisalCycles";

interface AppraisalCycleDialogProps {
  mode: "add" | "edit";
  cycle?: AppraisalCycle;
  onCreate?: (data: CreateAppraisalCyclePayload) => Promise<void>;
  onUpdate?: (id: string, data: CreateAppraisalCyclePayload) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}

export function AppraisalCycleDialog({
  mode,
  cycle,
  onCreate,
  onUpdate,
  onDelete,
}: AppraisalCycleDialogProps) {
  const [open, setOpen] = useState(false);

  const [cycleData, setCycleData] = useState<CreateAppraisalCyclePayload>({
    cycle_year: "",
    start_date: "",
    end_date: "",
    status: "active",
  });

  function toDateInputValue(date: string) {
    return date ? date.split("T")[0] : "";
  }

  /* Sync data when editing */
  useEffect(() => {
    if (mode === "edit" && cycle) {
      setCycleData({
        cycle_year: cycle.cycle_year,
        start_date: toDateInputValue(cycle.start_date),
        end_date: toDateInputValue(cycle.end_date),
        status: cycle.status,
      });
    }
  }, [mode, cycle]);

  const isFormValid =
    cycleData.cycle_year &&
    cycleData.start_date &&
    cycleData.end_date;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      if (mode === "add") {
        await onCreate?.(cycleData);
      } else {
        await onUpdate?.(cycle!.cycle_id, cycleData);
      }
      setOpen(false);
    } catch {
      alert("Operation failed");
    }
  };

  const handleDelete = async () => {
    if (!cycle) return;

    try {
      await onDelete?.(cycle.cycle_id);
      setOpen(false);
    } catch {
      alert("Failed to delete cycle");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "add" ? ( 
        <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Appraisal Cycle
        </Button> 
        ) : (
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-400 hover:text-blue-300 hover:bg-[#252834]"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        )}
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
              required
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
                required
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
                required
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
                <SelectItem value="active" className="text-white hover:bg-[#2a2d3a]">Open</SelectItem>
                <SelectItem value="completed" className="text-white hover:bg-[#2a2d3a]">Closed</SelectItem>
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
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubmit} disabled={!isFormValid}>
            {mode === "add" ? "Create Cycle" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
