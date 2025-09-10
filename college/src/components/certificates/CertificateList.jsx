import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Edit, ExternalLink, Calendar, Building2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const certificateTypeColors = {
  Academic: "bg-blue-100 text-blue-800 border-blue-200",
  Achievement: "bg-green-100 text-green-800 border-green-200",
  Participation: "bg-purple-100 text-purple-800 border-purple-200",
  "Course Completion": "bg-orange-100 text-orange-800 border-orange-200",
  Internship: "bg-indigo-100 text-indigo-800 border-indigo-200",
  Project: "bg-pink-100 text-pink-800 border-pink-200",
  Other: "bg-gray-100 text-gray-800 border-gray-200"
};

export default function CertificateList({ certificates, students, isLoading, onEdit }) {
  const getStudentName = (rollNo) => {
    const student = students.find(s => s.roll_no === rollNo);
    return student ? student.name : rollNo;
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="border-b border-slate-200">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Award className="w-6 h-6 text-green-600" />
          Certificates ({certificates.length})
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
        ) : certificates.length > 0 ? (
          <div className="space-y-0">
            {certificates.map((certificate) => (
              <div 
                key={certificate.id} 
                className="p-6 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-800 text-lg">
                        {certificate.certificate_name}
                      </h3>
                      <Badge className={`${certificateTypeColors[certificate.certificate_type]} border`}>
                        {certificate.certificate_type}
                      </Badge>
                    </div>
                    
                    <p className="text-blue-600 font-medium mb-3">
                      {getStudentName(certificate.student_roll_no)} 
                      <span className="text-slate-500 font-normal ml-2">
                        (#{certificate.student_roll_no})
                      </span>
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      {certificate.issued_by && (
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {certificate.issued_by}
                        </div>
                      )}
                      {certificate.issue_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(certificate.issue_date), "MMM d, yyyy")}
                        </div>
                      )}
                    </div>
                    
                    {certificate.description && (
                      <p className="text-slate-600 mt-2 text-sm">
                        {certificate.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {certificate.file_url && (
                      <a
                        href={certificate.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </a>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(certificate)}
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
            <Award className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <h3 className="text-lg font-medium mb-2">No certificates found</h3>
            <p>Add your first certificate to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}