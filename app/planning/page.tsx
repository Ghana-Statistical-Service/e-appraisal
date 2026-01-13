"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Plus, Trash2, Lock, Save, Send } from "lucide-react";
import { Separator } from "../components/ui/separator";

interface KRA {
  id: string;
  area: string;
  targets: string;
  resources: string;
}

function PerformancePlanning() {
  const [kras, setKras] = useState<KRA[]>([
    { id: "1", area: "", targets: "", resources: "" },
  ]);
  const [appraiseeSign, setAppraiseeSign] = useState(false);
  const [appraiserSign, setAppraiserSign] = useState(false);

  const addKRA = () => {
    if (kras.length < 5) {
      setKras([...kras, { id: Date.now().toString(), area: "", targets: "", resources: "" }]);
    }
  };

  const removeKRA = (id: string) => {
    setKras(kras.filter((kra) => kra.id !== id));
  };

  const updateKRA = (id: string, field: keyof KRA, value: string) => {
    setKras(kras.map((kra) => (kra.id === id ? { ...kra, [field]: value } : kra)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Performance Planning</h1>
        <p className="text-muted-foreground">Section 2: Define your Key Result Areas and targets</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Key Result Areas (KRAs)</CardTitle>
            <div className="text-sm text-muted-foreground">
              Maximum 5 KRAs | Current: {kras.length}/5
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {kras.map((kra, index) => (
            <div key={kra.id} className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
              <div className="flex justify-between items-center">
                <h3>KRA {index + 1}</h3>
                {kras.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeKRA(kra.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`area-${kra.id}`}>Key Result Area</Label>
                <Input
                  id={`area-${kra.id}`}
                  placeholder="E.g., Data Collection and Analysis"
                  value={kra.area}
                  onChange={(e) => updateKRA(kra.id, "area", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`targets-${kra.id}`}>Targets</Label>
                <Textarea
                  id={`targets-${kra.id}`}
                  placeholder="Define specific, measurable targets for this KRA"
                  value={kra.targets}
                  onChange={(e) => updateKRA(kra.id, "targets", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`resources-${kra.id}`}>Resources Required</Label>
                <Textarea
                  id={`resources-${kra.id}`}
                  placeholder="List resources, tools, or support needed"
                  value={kra.resources}
                  onChange={(e) => updateKRA(kra.id, "resources", e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          ))}

          {kras.length < 5 && (
            <Button onClick={addKRA} variant="outline" className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Add Another KRA
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Digital Signatures */}
      <Card>
        <CardHeader>
          <CardTitle>Digital Signatures</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Label>Appraisee Signature</Label>
                {appraiseeSign && <Lock className="h-4 w-4 text-green-600" />}
              </div>
              {!appraiseeSign ? (
                <Button
                  onClick={() => setAppraiseeSign(true)}
                  variant="outline"
                  className="w-full"
                >
                  Sign Document
                </Button>
              ) : (
                <div className="p-3 bg-green-50 border border-green-200 rounded text-center">
                  <p className="text-sm">Signed by Ahmed Salim Adam</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Label>Appraiser Signature</Label>
                {appraiserSign && <Lock className="h-4 w-4 text-green-600" />}
              </div>
              {!appraiserSign ? (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded text-center">
                  <p className="text-sm text-muted-foreground">Awaiting appraiser signature</p>
                </div>
              ) : (
                <div className="p-3 bg-green-50 border border-green-200 rounded text-center">
                  <p className="text-sm">Signed by Kwesi Eshun</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
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
          Submit to Appraiser
        </Button>
      </div>
    </div>
  );
}

export default function Page() {
  return <PerformancePlanning />;
}
