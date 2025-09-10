import React, { useState, useEffect } from "react";
import { Student } from "@/entities/Student";
import { Certificate } from "@/entities/Certificate";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Users, 
  Award, 
  TrendingUp, 
  Calendar,
  Plus,
  Search,
  GraduationCap,
  BookOpen
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import StatsCard from "../components/dashboard/StatsCard";
import RecentStudents from "../components/dashboard/RecentStudents";
import DepartmentBreakdown from "../components/dashboard/DepartmentBreakdown";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [studentsData, certificatesData] = await Promise.all([
        Student.list("-created_date", 50),
        Certificate.list("-created_date", 50)
      ]);
      setStudents(studentsData);
      setCertificates(certificatesData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const activeStudents = students.filter(s => s.status === "Active").length;
  const recentCertificates = certificates.filter(c => {
    const issueDate = new Date(c.issue_date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return issueDate >= thirtyDaysAgo;
  }).length;

  return (
    <div className="p-6 lg:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
              College Dashboard
            </h1>
            <p className="text-slate-600">
              Manage students and certificates efficiently
            </p>
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            <Link to={createPageUrl("Search")} className="flex-1 lg:flex-none">
              <Button variant="outline" className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Quick Search
              </Button>
            </Link>
            <Link to={createPageUrl("Students")} className="flex-1 lg:flex-none">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Student
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Students"
            value={students.length}
            icon={Users}
            bgColor="bg-blue-500"
            trend={`${activeStudents} active`}
          />
          <StatsCard
            title="Total Certificates"
            value={certificates.length}
            icon={Award}
            bgColor="bg-green-500"
            trend={`${recentCertificates} this month`}
          />
          <StatsCard
            title="Departments"
            value={new Set(students.map(s => s.department)).size}
            icon={BookOpen}
            bgColor="bg-purple-500"
          />
          <StatsCard
            title="Recent Activity"
            value={students.filter(s => {
              const created = new Date(s.created_date);
              const sevenDaysAgo = new Date();
              sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
              return created >= sevenDaysAgo;
            }).length}
            icon={TrendingUp}
            bgColor="bg-orange-500"
            trend="Last 7 days"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentStudents students={students} isLoading={isLoading} />
          </div>
          <div>
            <DepartmentBreakdown students={students} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}