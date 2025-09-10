import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function CertificateFilters({ filters, onFilterChange, students }) {
  const handleFilterChange = (type, value) => {
    onFilterChange({ ...filters, [type]: value });
  };

  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-slate-400" />
        <Select 
          value={filters.type} 
          onValueChange={(value) => handleFilterChange("type", value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Certificate Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Academic">Academic</SelectItem>
            <SelectItem value="Achievement">Achievement</SelectItem>
            <SelectItem value="Participation">Participation</SelectItem>
            <SelectItem value="Course Completion">Course Completion</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
            <SelectItem value="Project">Project</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Select 
        value={filters.student} 
        onValueChange={(value) => handleFilterChange("student", value)}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select Student" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Students</SelectItem>
          {students.map((student) => (
            <SelectItem key={student.roll_no} value={student.roll_no}>
              {student.name} (#{student.roll_no})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}