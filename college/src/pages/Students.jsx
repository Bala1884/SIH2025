import React, { useState, useEffect } from "react";
import { Student } from "@/entities/Student";
import { Certificate } from "@/entities/Certificate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Eye } from "lucide-react";
import { AnimatePresence } from "framer-motion";

import StudentForm from "../components/students/StudentForm";
import StudentList from "../components/students/StudentList";
import StudentDetails from "../components/students/StudentDetails";
import StudentFilters from "../components/students/StudentFilters";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ department: "all", year: "all", status: "all" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [studentsData, certificatesData] = await Promise.all([
        Student.list("-created_date"),
        Certificate.list()
      ]);
      setStudents(studentsData);
      setCertificates(certificatesData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (studentData) => {
    try {
      if (editingStudent) {
        await Student.update(editingStudent.id, studentData);
      } else {
        await Student.create(studentData);
      }
      setShowForm(false);
      setEditingStudent(null);
      await loadData();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
    setSelectedStudent(null);
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setShowForm(false);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.roll_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filters.department === "all" || student.department === filters.department;
    const matchesYear = filters.year === "all" || student.year === filters.year;
    const matchesStatus = filters.status === "all" || student.status === filters.status;
    
    return matchesSearch && matchesDepartment && matchesYear && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
              Student Management
            </h1>
            <p className="text-slate-600">Add and manage student records</p>
          </div>
          <Button 
            onClick={() => {
              setShowForm(!showForm);
              setEditingStudent(null);
              setSelectedStudent(null);
            }}
            className="bg-blue-600 hover:bg-blue-700 w-full lg:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Student
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search students by name, roll number, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 text-base"
            />
          </div>
          <div className="lg:w-auto">
            <StudentFilters filters={filters} onFilterChange={setFilters} />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className={selectedStudent ? "lg:col-span-2" : "lg:col-span-3"}>
            <AnimatePresence>
              {showForm && (
                <StudentForm
                  student={editingStudent}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingStudent(null);
                  }}
                />
              )}
            </AnimatePresence>

            <StudentList
              students={filteredStudents}
              isLoading={isLoading}
              onEdit={handleEdit}
              onView={handleView}
              selectedStudent={selectedStudent}
            />
          </div>

          {selectedStudent && (
            <div>
              <StudentDetails
                student={selectedStudent}
                certificates={certificates.filter(c => c.student_roll_no === selectedStudent.roll_no)}
                onClose={() => setSelectedStudent(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}