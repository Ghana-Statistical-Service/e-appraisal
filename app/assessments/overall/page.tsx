import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";

function OverallAssessment() {
  // Mock scores
  const M = 78.5; // Performance Plan Score
  const N = 4.2; // Core Competencies Average
  const O = 4.1; // Non-Core Competencies Average
  const T = M + N + O; // Total
  const Z = (T / 3).toFixed(2); // Overall Score Percentage

  const getRating = (score: number) => {
    if (score >= 90) return { label: "Exceptional", color: "bg-green-600" };
    if (score >= 80) return { label: "Exceeded Expectations", color: "bg-green-500" };
    if (score >= 70) return { label: "Met Expectations", color: "bg-blue-500" };
    if (score >= 60) return { label: "Below Expectations", color: "bg-amber-500" };
    return { label: "Unacceptable", color: "bg-red-500" };
  };

  const rating = getRating(parseFloat(Z));

  return (
    <div className="space-y-6">
      <div>
        <h1>Overall Assessment</h1>
        <p className="text-muted-foreground">Summary of performance evaluation</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#382873]/5 border border-[#382873]/20 rounded-lg text-center">
              <Label className="text-sm text-muted-foreground">Performance Plan (M)</Label>
              <div className="text-4xl mt-2">{M}</div>
            </div>

            <div className="p-6 bg-[#17B8A6]/5 border border-[#17B8A6]/20 rounded-lg text-center">
              <Label className="text-sm text-muted-foreground">Core Competencies (N)</Label>
              <div className="text-4xl mt-2">{N}</div>
            </div>

            <div className="p-6 bg-[#DB2988]/5 border border-[#DB2988]/20 rounded-lg text-center">
              <Label className="text-sm text-muted-foreground">Non-Core Competencies (O)</Label>
              <div className="text-4xl mt-2">{O}</div>
            </div>

            <div className="p-6 bg-gray-100 border border-gray-300 rounded-lg text-center">
              <Label className="text-sm text-muted-foreground">Total (T)</Label>
              <div className="text-4xl mt-2">{T.toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Overall Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div>
              <Label className="text-lg text-muted-foreground">Overall Score (Z%)</Label>
              <div className="text-6xl mt-4">{Z}%</div>
            </div>

            <div className="flex justify-center mt-6">
              <div className={`${rating.color} text-white px-8 py-4 rounded-lg text-xl`}>
                {rating.label}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rating Scale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-32 px-3 py-2 bg-green-600 text-white rounded text-center text-sm">
                90 - 100%
              </div>
              <span>Exceptional</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 px-3 py-2 bg-green-500 text-white rounded text-center text-sm">
                80 - 89%
              </div>
              <span>Exceeded Expectations</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 px-3 py-2 bg-blue-500 text-white rounded text-center text-sm">
                70 - 79%
              </div>
              <span>Met Expectations</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 px-3 py-2 bg-amber-500 text-white rounded text-center text-sm">
                60 - 69%
              </div>
              <span>Below Expectations</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 px-3 py-2 bg-red-500 text-white rounded text-center text-sm">
                Below 60%
              </div>
              <span>Unacceptable</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Page() {
  return <OverallAssessment />;
}
