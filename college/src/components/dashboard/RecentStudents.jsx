import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Phone, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const statusColors = {
  Active: "bg-green-100 text-green-800 border-green-200",
  Inactive: "bg-gray-100 text-gray-800 border-gray-200",
  Graduated: "bg-blue-100 text-blue-800 border-blue-200",
  Suspended: "bg-red-100 text-red-800 border-red-200"
};

export default function RecentStudents({ students, isLoading }) {
  const recentStudents = students.slice(0, 8);

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="border-b border-slate-200">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Users className="w-6 h-6 text-blue-600" />
          Recent Students
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {isLoading ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="p-6 border-b border-slate-100 last:border-b-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>
            ))
          ) : recentStudents.length > 0 ? (
            recentStudents.map((student) => (
              <div key={student.id} className="p-6 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-800">{student.name}</h3>
                      <span className="text-sm text-slate-500">#{student.roll_no}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{student.department} • {student.year}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      {student.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {student.email}
                        </div>
                      )}
                      {student.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {student.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge className={`${statusColors[student.status]} border`}>
                    {student.status}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p>No students found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}