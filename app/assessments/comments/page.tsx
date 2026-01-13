"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Lock, Save, Send } from "lucide-react";

export function Comments() {
  const [appraiseeComments, setAppraiseeComments] = useState("");
  const [hodComments, setHodComments] = useState("");
  const [directorComments, setDirectorComments] = useState("");
  const [isApproved, setIsApproved] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1>Comments</h1>
        <p className="text-muted-foreground">Additional comments from stakeholders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appraisee Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="appraisee-comments">
              Your Comments on the Appraisal Process
            </Label>
            <Textarea
              id="appraisee-comments"
              placeholder="Share your thoughts on the appraisal process, achievements, challenges, or any additional information..."
              value={appraiseeComments}
              onChange={(e) => setAppraiseeComments(e.target.value)}
              rows={5}
              disabled={isApproved}
            />
            {isApproved && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                Locked - Appraisal has been approved
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Head of Department Comments</CardTitle>
            {isApproved && <Lock className="h-4 w-4 text-green-600" />}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="hod-comments">HOD/Sectional Head Remarks</Label>
            <Textarea
              id="hod-comments"
              placeholder="HOD comments on staff performance..."
              value={hodComments}
              onChange={(e) => setHodComments(e.target.value)}
              rows={5}
              disabled={isApproved}
            />
            {isApproved && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm">Reviewed by: Kwesi Eshun (HOD)</p>
                <p className="text-xs text-muted-foreground">Date: January 15, 2026</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Director Comments</CardTitle>
            {isApproved && <Lock className="h-4 w-4 text-green-600" />}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="director-comments">Director Remarks</Label>
            <Textarea
              id="director-comments"
              placeholder="Director's assessment and recommendations..."
              value={directorComments}
              onChange={(e) => setDirectorComments(e.target.value)}
              rows={5}
              disabled={isApproved}
            />
            {isApproved && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm">Reviewed by: Mark Abuabu-Dadzie (Director, DST)</p>
                <p className="text-xs text-muted-foreground">Date: January 20, 2026</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {!isApproved && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" className="gap-2">
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button className="bg-[#382873] hover:bg-[#4A3599] gap-2">
            <Send className="h-4 w-4" />
            Submit Comments
          </Button>
        </div>
      )}

      {isApproved && (
        <div className="p-4 bg-green-50 border border-green-300 rounded-lg text-center">
          <Lock className="h-5 w-5 mx-auto mb-2 text-green-600" />
          <p className="text-green-700">
            This appraisal has been approved and all comments are now read-only
          </p>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return <Comments />;
}
