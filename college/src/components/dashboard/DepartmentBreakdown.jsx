import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DepartmentBreakdown({ students, isLoading }) {
  const getDepartmentStats = () => {
    const departmentCounts = {};
    students.forEach(student => {
      departmentCounts[student.department] = (departmentCounts[student.department] || 0) + 1;
    });
    
    const total = students.length;
    return Object.entries(departmentCounts)
      .map(([dept, count]) => ({
        department: dept,
        count,
        percentage: total > 0 ? (count / total) * 100 : 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  };

  const departmentStats = getDepartmentStats();

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="border-b border-slate-200">
        <CardTitle className="flex items-center gap-2 text-xl">
          <BookOpen className="w-6 h-6 text-purple-600" />
          Department Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        ) : departmentStats.length > 0 ? (
          <div className="space-y-4">
            {departmentStats.map((stat) => (
              <div key={stat.department} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">
                    {stat.department}
                  </span>
                  <span className="text-sm text-slate-500">
                    {stat.count} ({stat.percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={stat.percentage} className="h-2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500 py-8">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p>No department data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}