import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Download, FileText, PieChart, Users } from "lucide-react";
import { Progress } from "../components/ui/progress";

export function Reports() {
  const completionRates = [
    { department: "Data Collection", rate: 85, total: 20, completed: 17 },
    { department: "Statistical Analysis", rate: 92, total: 25, completed: 23 },
    { department: "Research", rate: 78, total: 15, completed: 12 },
    { department: "IT Services", rate: 88, total: 12, completed: 11 },
    { department: "Administration", rate: 95, total: 18, completed: 17 },
  ];

  const ratingDistribution = [
    { rating: "Exceptional (90-100%)", count: 12, percentage: 12 },
    { rating: "Exceeded (80-89%)", count: 45, percentage: 45 },
    { rating: "Met (70-79%)", count: 38, percentage: 38 },
    { rating: "Below (60-69%)", count: 4, percentage: 4 },
    { rating: "Unacceptable (<60%)", count: 1, percentage: 1 },
  ];

  const promotionReadiness = [
    { category: "Promote Immediately", count: 8 },
    { category: "Suitable for Promotion", count: 15 },
    { category: "Ready in 2-3 Years", count: 42 },
    { category: "Not Ready", count: 28 },
    { category: "Unlikely", count: 7 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Reports & Analytics</h1>
        <p className="text-muted-foreground">HR analytics and performance insights</p>
      </div>

      {/* Report Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select defaultValue="2026">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="data">Data Collection</SelectItem>
                <SelectItem value="analysis">Statistical Analysis</SelectItem>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="it">IT Services</SelectItem>
                <SelectItem value="admin">Administration</SelectItem>
              </SelectContent>
            </Select>

            <Button className="gap-2 bg-[#382873] hover:bg-[#4A3599]">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-[#382873]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">100</div>
            <p className="text-xs text-muted-foreground mt-1">Active employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Completion Rate</CardTitle>
            <PieChart className="h-4 w-4 text-[#17B8A6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">87%</div>
            <Progress value={87} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Avg Performance</CardTitle>
            <FileText className="h-4 w-4 text-[#DB2988]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">78.5%</div>
            <p className="text-xs text-muted-foreground mt-1">Organization-wide</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Promotion Ready</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">23</div>
            <p className="text-xs text-muted-foreground mt-1">Staff members</p>
          </CardContent>
        </Card>
      </div>

      {/* Completion Rates by Department */}
      <Card>
        <CardHeader>
          <CardTitle>Completion Rates by Department</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completionRates.map((dept) => (
              <div key={dept.department}>
                <div className="flex justify-between mb-2">
                  <span>{dept.department}</span>
                  <span className="text-sm text-muted-foreground">
                    {dept.completed}/{dept.total} ({dept.rate}%)
                  </span>
                </div>
                <Progress value={dept.rate} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rating Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ratingDistribution.map((item) => (
              <div
                key={item.rating}
                className="flex items-center justify-between p-3 border border-border rounded-lg"
              >
                <div className="flex-1">
                  <span>{item.rating}</span>
                  <Progress value={item.percentage} className="mt-2" />
                </div>
                <div className="ml-4 text-right">
                  <div>{item.count} staff</div>
                  <div className="text-sm text-muted-foreground">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Promotion Readiness Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Promotion Readiness Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {promotionReadiness.map((item, index) => {
              const colors = [
                "bg-green-500",
                "bg-[#17B8A6]",
                "bg-blue-500",
                "bg-amber-500",
                "bg-red-500",
              ];
              return (
                <div key={item.category} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                  <div className="flex-1">{item.category}</div>
                  <div className="text-right">
                    <span>{item.count} staff</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="gap-2 justify-start">
              <FileText className="h-4 w-4" />
              View as PSC Form (PDF)
            </Button>
            <Button variant="outline" className="gap-2 justify-start">
              <Download className="h-4 w-4" />
              Export All Appraisals
            </Button>
            <Button variant="outline" className="gap-2 justify-start">
              <PieChart className="h-4 w-4" />
              Analytics Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Page() {
  return <Reports />;
}
