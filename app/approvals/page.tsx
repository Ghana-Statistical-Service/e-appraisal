"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { StatusBadge } from "../components/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { CheckCircle, XCircle, MessageSquare, Eye } from "lucide-react";

interface ApprovalItem {
  id: string;
  appraisee: string;
  role: string;
  stage: string;
  submittedDate: string;
  status: "pending" | "approved" | "returned";
}

function Approvals() {
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null);
  const [actionType, setActionType] = useState<"approve" | "return" | "clarify" | null>(null);
  const [remarks, setRemarks] = useState("");

  const pendingApprovals: ApprovalItem[] = [
    {
      id: "1",
      appraisee: "Ahmed Salim Adam",
      role: "Application & Database Officer",
      stage: "End-Year Review",
      submittedDate: "2026-01-03",
      status: "pending",
    },
    {
      id: "2",
      appraisee: "Afisu Ganiyu",
      role: "Systems Analyst",
      stage: "Mid-Year Review",
      submittedDate: "2026-01-02",
      status: "pending",
    },
    {
      id: "3",
      appraisee: "Kwesi Eshun",
      role: "Head, Application & Database",
      stage: "Competency Assessment",
      submittedDate: "2026-01-01",
      status: "pending",
    },
  ];

  const handleAction = (item: ApprovalItem, type: "approve" | "return" | "clarify") => {
    setSelectedItem(item);
    setActionType(type);
    setRemarks("");
  };

  const closeDialog = () => {
    setSelectedItem(null);
    setActionType(null);
    setRemarks("");
  };

  const submitAction = () => {
    // Handle the action submission
    console.log("Action:", actionType, "Item:", selectedItem, "Remarks:", remarks);
    closeDialog();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Approvals</h1>
        <p className="text-muted-foreground">Review and approve pending appraisals</p>
      </div>

      {/* Approval Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-[#382873]/5 border border-[#382873]/20 rounded-lg">
              <p className="text-sm">
                <strong>For Staff:</strong> Appraisee → Sectional Head → Director → Director HR
              </p>
            </div>
            <div className="p-3 bg-[#17B8A6]/5 border border-[#17B8A6]/20 rounded-lg">
              <p className="text-sm">
                <strong>For Sectional Heads:</strong> Sectional Head → Director → Director HR
              </p>
            </div>
            <div className="p-3 bg-[#DB2988]/5 border border-[#DB2988]/20 rounded-lg">
              <p className="text-sm">
                <strong>For Directors:</strong> Director → Government Statistician
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Approvals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals ({pendingApprovals.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Appraisee</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Current Stage</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingApprovals.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.appraisee}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>{item.stage}</TableCell>
                  <TableCell>{new Date(item.submittedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 gap-1"
                        onClick={() => handleAction(item, "approve")}
                      >
                        <CheckCircle className="h-3 w-3" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="gap-1"
                        onClick={() => handleAction(item, "return")}
                      >
                        <XCircle className="h-3 w-3" />
                        Return
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                        onClick={() => handleAction(item, "clarify")}
                      >
                        <MessageSquare className="h-3 w-3" />
                        Clarify
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" && "Approve Appraisal"}
              {actionType === "return" && "Return for Correction"}
              {actionType === "clarify" && "Request Clarification"}
            </DialogTitle>
            <DialogDescription>
              {selectedItem && `For: ${selectedItem.appraisee} - ${selectedItem.stage}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="action-remarks">
                {actionType === "approve" ? "Approval Comments (Optional)" : "Remarks *"}
              </Label>
              <Textarea
                id="action-remarks"
                placeholder={
                  actionType === "approve"
                    ? "Add any comments or commendations..."
                    : "Provide specific details on what needs to be addressed..."
                }
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={4}
              />
            </div>

            {actionType === "return" && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  The appraisal will be returned to the appraisee for corrections. They will be
                  notified of the required changes.
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              className={
                actionType === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : actionType === "return"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-[#382873] hover:bg-[#4A3599]"
              }
              onClick={submitAction}
            >
              {actionType === "approve" && "Approve"}
              {actionType === "return" && "Return"}
              {actionType === "clarify" && "Send Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function Page() {
  return <Approvals />;
}
