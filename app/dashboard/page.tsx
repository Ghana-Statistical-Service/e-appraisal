"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { StatusBadge } from "../components/status-badge";
import { 
  Users, 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle,
  FileText,
  Target,
  Star,
  BarChart3
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface DashboardProps {
  userRole: "staff" | "sectional_head" | "director" | "hr";
}

function Dashboard({ userRole }: DashboardProps) {
  // Top stats data
  const stats = [
    {
      title: "Total Employees",
      value: "350",
      icon: Users,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/20",
    },
    {
      title: "Appraisals Started",
      value: "200",
      subtitle: "Active",
      icon: ClipboardList,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/20",
    },
    {
      title: "Pending Approval",
      value: "48",
      subtitle: "Reviews",
      icon: Clock,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-500/20",
    },
    {
      title: "Completion Rate",
      value: "65%",
      icon: CheckCircle2,
      iconColor: "text-green-500",
      iconBg: "bg-green-500/20",
    },
  ];

  // Appraisal progress stages
  const progressStages = [
    { name: "Objective Setting", status: "completed" },
    { name: "Self Assessment", status: "completed" },
    { name: "Manager Review", status: "completed" },
    { name: "Completed", subtitle: "55%", status: "current" },
    { name: "Completed", status: "pending" },
  ];

  // Pending appraisals data
  const pendingAppraisals = [
    {
      employee: "Ahmed Salim Adam",
      position: "Application & Database Officer",
      department: "Digital Services & Technology",
      status: "pending" as const,
    },
    {
      employee: "Afisu Ganiyu",
      position: "Systems Analyst",
      department: "Digital Services & Technology",
      status: "pending" as const,
    },
    {
      employee: "Kwesi Eshun",
      position: "Head, Application & Database",
      department: "Digital Services & Technology",
      status: "pending" as const,
    },
    {
      employee: "Kwadwo Asante",
      position: "Director, Administration",
      department: "Administration",
      status: "in-review" as const,
    },
  ];

  // Employment overview data
  const employmentData = [
    { name: "Full-Time", value: 70, color: "#3b82f6" },
    { name: "Part-Time", value: 30, color: "#8b5cf6" },
  ];

  const employmentStats = [
    { label: "Completed", percentage: "33%", color: "bg-green-500" },
    { label: "In Progress", percentage: "14%", color: "bg-yellow-500" },
    { label: "Not Started", percentage: "19%", color: "bg-blue-500" },
  ];

  // Recent comments data
  const recentComments = [
    {
      name: "Isaac Odoom",
      avatar: "IO",
      time: "10 minutes ago",
      comment: "Reviewed the HR dashboard summaries for this cycle.",
    },
    {
      name: "Ahmed Salim Adam",
      avatar: "AA",
      time: "1 hour ago",
      comment: "Completed my self-assessment and submitted for review.",
    },
    {
      name: "Afisu Ganiyu",
      avatar: "AG",
      time: "2 hours ago",
      comment: "Shared updates on DST priorities for Q2 planning.",
    },
    {
      name: "Mark Abuabu-Dadzie",
      avatar: "MA",
      time: "3 hours ago",
      comment: "Awaiting directorate review on submitted objectives.",
    },
  ];

  // Quick action cards
  const quickActions = [
    {
      title: "Manage Appraisals",
      icon: FileText,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/20",
    },
    {
      title: "Performance Planning",
      icon: Target,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-500/20",
    },
    {
      title: "Core Competencies",
      icon: Star,
      iconColor: "text-yellow-500",
      iconBg: "bg-yellow-500/20",
    },
    {
      title: "Reports",
      icon: BarChart3,
      iconColor: "text-green-500",
      iconBg: "bg-green-500/20",
    },
  ];

  return (
    <div className="space-y-6 pb-20 bg-[#0f1117] min-h-screen -m-6 p-6">
      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-pointer bg-[#1a1d29] border-[#2a2d3a]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-2">{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl text-white">{stat.value}</h3>
                    {stat.subtitle && (
                      <span className="text-sm text-gray-400">{stat.subtitle}</span>
                    )}
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.iconBg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-500 mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Appraisal Progress */}
      <Card className="bg-[#1a1d29] border-[#2a2d3a]">
        <CardHeader>
          <CardTitle className="text-white">Appraisal Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Stepper */}
          <div className="relative">
            <div className="flex justify-between items-start">
              {progressStages.map((stage, index) => (
                <div key={index} className="flex flex-col items-center flex-1 relative">
                  {/* Connecting Line */}
                  {index < progressStages.length - 1 && (
                    <div
                      className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 ${
                        stage.status === "completed"
                          ? "bg-blue-500"
                          : "bg-gray-700"
                      }`}
                    />
                  )}
                  
                  {/* Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      stage.status === "completed"
                        ? "bg-blue-500 border-blue-500 text-white"
                        : stage.status === "current"
                        ? "bg-[#1a1d29] border-blue-500 text-blue-500"
                        : "bg-[#1a1d29] border-gray-700 text-gray-500"
                    }`}
                  >
                    {stage.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : stage.status === "current" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-gray-600" />
                    )}
                  </div>
                  
                  {/* Label */}
                  <div className="mt-3 text-center">
                    <p className="text-sm font-medium text-gray-300">{stage.name}</p>
                    {stage.subtitle && (
                      <p className="text-xs text-gray-500">{stage.subtitle}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Action Banner */}
          <div className="flex items-center justify-between p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-blue-400" />
              <div>
                <p className="font-medium text-white">Pending Action</p>
                <p className="text-sm text-gray-400">
                  48 Completed Self Assessments waiting for manager review.
                </p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Review Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Three Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Appraisals */}
        <Card className="lg:col-span-1 bg-[#1a1d29] border-[#2a2d3a]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Pending Appraisals</CardTitle>
            <Button variant="link" className="text-blue-400 p-0 hover:text-blue-300">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-500 pb-2 border-b border-gray-700">
                <div>Employee</div>
                <div>Position</div>
                <div>Department</div>
                <div>Status</div>
              </div>
              
              {/* Table Rows */}
              {pendingAppraisals.map((appraisal, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 text-sm items-center">
                  <div className="font-medium truncate text-gray-300">{appraisal.employee}</div>
                  <div className="text-gray-400 truncate">{appraisal.position}</div>
                  <div className="text-gray-400 truncate">{appraisal.department}</div>
                  <div>
                    <StatusBadge status={appraisal.status} />
                  </div>
                </div>
              ))}
              
              <Button variant="link" className="text-blue-400 p-0 w-full justify-center mt-4 hover:text-blue-300">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Employment Overview */}
        <Card className="lg:col-span-1 bg-[#1a1d29] border-[#2a2d3a]">
          <CardHeader>
            <CardTitle className="text-white">Employment Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Pie Chart */}
              <div className="relative h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={employmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {employmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Full-Time</p>
                    <p className="text-2xl font-semibold text-white">70%</p>
                  </div>
                </div>
              </div>

              {/* Employment Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">Full-Time</span>
                  <span className="text-sm text-gray-400">70%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">Part-Time</span>
                  <span className="text-sm text-gray-400">30%</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-700 pt-4 space-y-2">
                {employmentStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                      <span className="text-sm text-gray-300">{stat.label}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-300">{stat.percentage}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Comments */}
        <Card className="lg:col-span-1 bg-[#1a1d29] border-[#2a2d3a]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Recent Comments</CardTitle>
            <Button variant="link" className="text-blue-400 p-0 hover:text-blue-300">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComments.map((comment, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-medium">
                    {comment.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-medium text-sm text-gray-300">{comment.name}</p>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {comment.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card
            key={index}
            className="hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-pointer bg-[#1a1d29] border-[#2a2d3a]"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className={`p-4 rounded-lg ${action.iconBg} mb-4`}>
                <action.icon className={`h-8 w-8 ${action.iconColor}`} />
              </div>
              <p className="font-medium text-gray-300">{action.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1d29] border-t border-[#2a2d3a] shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="flex items-center justify-center gap-2 h-12 text-gray-400 hover:text-white hover:bg-[#252834]"
              >
                <action.icon className={`h-5 w-5 ${action.iconColor}`} />
                <span className="text-sm hidden md:inline">{action.title}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return <Dashboard userRole="hr" />;
}
