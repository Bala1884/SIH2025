import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Edit, Eye, Mail, Phone, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const statusColors = {
  Active: "bg-green-100 text-green-800 border-green-200",
  Inactive: "bg-gray-100 text-gray-800 border-gray-200", 
  Graduated: "bg-blue-100 text-blue-800 border-blue-200",
  Suspended: "bg-red-100 text-red-800 border-red-200"
};

export default function StudentList({ students, isLoading, onEdit, onView, selectedStudent }) {
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="border-b border-slate-200">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Users className="w-6 h-6 text-blue-600" />
          Students ({students.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="space-y-0">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Skeleton className="h-5 w-48 mb-2" />
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : students.length > 0 ? (
          <div className="space-y-0">
            {students.map((student) => (
              <div 
                key={student.id} 
                className={`p-6 border-b border-slate-100 last:border-b-0 transition-all duration-200 ${
                  selectedStudent?.id === student.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-800 text-lg">{student.name}</h3>
                      <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        #{student.roll_no}
                      </span>
                      <Badge className={`${statusColors[student.status]} border`}>
                        {student.status}
                      </Badge>
                    </div>
                    
                    <p className="text-slate-600 mb-3 font-medium">
                      {student.department} • {student.year}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      {student.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {student.email}
                        </div>
                      )}
                      {student.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {student.phone}
                        </div>
                      )}
                      {student.admission_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Joined {format(new Date(student.admission_date), "MMM yyyy")}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(student)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(student)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">
            <Users className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <h3 className="text-lg font-medium mb-2">No students found</h3>
            <p>Add your first student to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}