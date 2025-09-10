import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Award,
  Users,
  ExternalLink
} from "lucide-react";
import { format } from "date-fns";

const statusColors = {
  Active: "bg-green-100 text-green-800 border-green-200",
  Inactive: "bg-gray-100 text-gray-800 border-gray-200",
  Graduated: "bg-blue-100 text-blue-800 border-blue-200", 
  Suspended: "bg-red-100 text-red-800 border-red-200"
};

const certificateTypeColors = {
  Academic: "bg-blue-100 text-blue-800",
  Achievement: "bg-green-100 text-green-800",
  Participation: "bg-purple-100 text-purple-800",
  "Course Completion": "bg-orange-100 text-orange-800",
  Internship: "bg-indigo-100 text-indigo-800",
  Project: "bg-pink-100 text-pink-800",
  Other: "bg-gray-100 text-gray-800"
};

export default function StudentDetails({ student, certificates, onClose }) {
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="border-b border-slate-200">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <User className="w-6 h-6 text-blue-600" />
            Student Details
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-slate-800">{student.name}</h2>
              <span className="text-sm font-mono text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                #{student.roll_no}
              </span>
            </div>
            <Badge className={`${statusColors[student.status]} border mb-4`}>
              {student.status}
            </Badge>
          </div>

          {/* Academic Info */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Academic Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="font-medium">Department:</span>
                  {student.department}
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="font-medium">Academic Year:</span>
                  {student.year}
                </div>
                {student.admission_date && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">Admission Date:</span>
                    {format(new Date(student.admission_date), "MMMM d, yyyy")}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-slate-700 mb-3">Contact Information</h3>
            <div className="space-y-3">
              {student.email && (
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-4 h-4" />
                  {student.email}
                </div>
              )}
              {student.phone && (
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4" />
                  {student.phone}
                </div>
              )}
              {student.address && (
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  {student.address}
                </div>
              )}
            </div>
          </div>

          {/* Guardian Info */}
          {(student.guardian_name || student.guardian_phone) && (
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Guardian Information</h3>
              <div className="space-y-3">
                {student.guardian_name && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">Name:</span>
                    {student.guardian_name}
                  </div>
                )}
                {student.guardian_phone && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">Phone:</span>
                    {student.guardian_phone}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Certificates */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-slate-700">
                Certificates ({certificates.length})
              </h3>
            </div>
            {certificates.length > 0 ? (
              <div className="space-y-3">
                {certificates.map((certificate) => (
                  <div key={certificate.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-800">
                        {certificate.certificate_name}
                      </h4>
                      {certificate.file_url && (
                        <a
                          href={certificate.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={certificateTypeColors[certificate.certificate_type]}>
                        {certificate.certificate_type}
                      </Badge>
                      {certificate.issue_date && (
                        <span className="text-sm text-slate-500">
                          {format(new Date(certificate.issue_date), "MMM d, yyyy")}
                        </span>
                      )}
                    </div>
                    {certificate.issued_by && (
                      <p className="text-sm text-slate-600">
                        Issued by: {certificate.issued_by}
                      </p>
                    )}
                    {certificate.description && (
                      <p className="text-sm text-slate-600 mt-2">
                        {certificate.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-4">
                No certificates found for this student
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}