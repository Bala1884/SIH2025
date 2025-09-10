import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function StudentFilters({ filters, onFilterChange }) {
  const handleFilterChange = (type, value) => {
    onFilterChange({ ...filters, [type]: value });
  };

  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-slate-400" />
        <Select 
          value={filters.department} 
          onValueChange={(value) => handleFilterChange("department", value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="Computer Science">Computer Science</SelectItem>
            <SelectItem value="Electrical Engineering">Electrical Eng.</SelectItem>
            <SelectItem value="Mechanical Engineering">Mechanical Eng.</SelectItem>
            <SelectItem value="Civil Engineering">Civil Eng.</SelectItem>
            <SelectItem value="Business Administration">Business Admin.</SelectItem>
            <SelectItem value="Mathematics">Mathematics</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Select 
        value={filters.year} 
        onValueChange={(value) => handleFilterChange("year", value)}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Years</SelectItem>
          <SelectItem value="1st Year">1st Year</SelectItem>
          <SelectItem value="2nd Year">2nd Year</SelectItem>
          <SelectItem value="3rd Year">3rd Year</SelectItem>
          <SelectItem value="4th Year">4th Year</SelectItem>
          <SelectItem value="Graduate">Graduate</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={filters.status} 
        onValueChange={(value) => handleFilterChange("status", value)}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Inactive">Inactive</SelectItem>
          <SelectItem value="Graduated">Graduated</SelectItem>
          <SelectItem value="Suspended">Suspended</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}