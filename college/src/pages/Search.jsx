import React, { useState, useEffect } from "react";
import { Student } from "@/entities/Student";
import { Certificate } from "@/entities/Certificate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, User, Award, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import StudentSearchResult from "../components/search/StudentSearchResult";

export default function SearchPage() {
  const [rollNumber, setRollNumber] = useState("");
  const [student, setStudent] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!rollNumber.trim()) {
      setError("Please enter a roll number");
      return;
    }

    setIsLoading(true);
    setError("");
    setStudent(null);
    setCertificates([]);

    try {
      // Search for student
      const students = await Student.filter({ roll_no: rollNumber.trim() });
      
      if (students.length === 0) {
        setError("No student found with this roll number");
        return;
      }

      const foundStudent = students[0];
      setStudent(foundStudent);

      // Get certificates for this student
      const studentCertificates = await Certificate.filter({ 
        student_roll_no: rollNumber.trim() 
      });
      setCertificates(studentCertificates);

    } catch (error) {
      console.error("Error searching:", error);
      setError("An error occurred while searching. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            Student Search
          </h1>
          <p className="text-slate-600 text-lg">
            Enter a student's roll number to view their details and certificates
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Search className="w-6 h-6 text-blue-600" />
              Quick Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter student roll number..."
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 py-6 text-base"
                disabled={isLoading}
              />
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 px-8"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Search Results */}
        {student && (
          <StudentSearchResult 
            student={student} 
            certificates={certificates}
          />
        )}
      </div>
    </div>
  );
}