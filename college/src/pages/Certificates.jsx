import React, { useState, useEffect } from "react";
import { Student } from "@/entities/Student";
import { Certificate } from "@/entities/Certificate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Upload } from "lucide-react";
import { AnimatePresence } from "framer-motion";

import CertificateForm from "../components/certificates/CertificateForm";
import CertificateList from "../components/certificates/CertificateList";
import CertificateFilters from "../components/certificates/CertificateFilters";

export default function Certificates() {
  const [students, setStudents] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ type: "all", student: "all" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [studentsData, certificatesData] = await Promise.all([
        Student.list(),
        Certificate.list("-created_date")
      ]);
      setStudents(studentsData);
      setCertificates(certificatesData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (certificateData) => {
    try {
      if (editingCertificate) {
        await Certificate.update(editingCertificate.id, certificateData);
      } else {
        await Certificate.create(certificateData);
      }
      setShowForm(false);
      setEditingCertificate(null);
      await loadData();
    } catch (error) {
      console.error("Error saving certificate:", error);
    }
  };

  const handleEdit = (certificate) => {
    setEditingCertificate(certificate);
    setShowForm(true);
  };

  const filteredCertificates = certificates.filter(certificate => {
    const student = students.find(s => s.roll_no === certificate.student_roll_no);
    const studentName = student?.name || "";
    
    const matchesSearch = certificate.certificate_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         certificate.student_roll_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         certificate.issued_by?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filters.type === "all" || certificate.certificate_type === filters.type;
    const matchesStudent = filters.student === "all" || certificate.student_roll_no === filters.student;
    
    return matchesSearch && matchesType && matchesStudent;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
              Certificate Management
            </h1>
            <p className="text-slate-600">Upload and manage student certificates</p>
          </div>
          <Button 
            onClick={() => {
              setShowForm(!showForm);
              setEditingCertificate(null);
            }}
            className="bg-green-600 hover:bg-green-700 w-full lg:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Certificate
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search certificates by name, student, or issuer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 text-base"
            />
          </div>
          <div className="lg:w-auto">
            <CertificateFilters
              filters={filters}
              onFilterChange={setFilters}
              students={students}
            />
          </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence>
            {showForm && (
              <CertificateForm
                certificate={editingCertificate}
                students={students}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingCertificate(null);
                }}
              />
            )}
          </AnimatePresence>

          <CertificateList
            certificates={filteredCertificates}
            students={students}
            isLoading={isLoading}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
}