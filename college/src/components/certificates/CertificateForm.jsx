import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { UploadFile } from "@/integrations/Core";
import { Award, X, Upload, FileText } from "lucide-react";

export default function CertificateForm({ certificate, students, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(certificate || {
    student_roll_no: "",
    certificate_name: "",
    certificate_type: "",
    issued_by: "",
    issue_date: "",
    description: "",
    file_url: ""
  });
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setFileName(file.name);

    try {
    //   const { file_url } = await UploadFile({ file });
      handleChange("file_url", file_url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    
    setUploading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-6"
    >
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="border-b border-slate-200">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Award className="w-6 h-6 text-green-600" />
              {certificate ? "Edit Certificate" : "Add New Certificate"}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="student_roll_no">Student *</Label>
                <Select 
                  value={formData.student_roll_no} 
                  onValueChange={(value) => handleChange("student_roll_no", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.roll_no} value={student.roll_no}>
                        {student.name} (#{student.roll_no})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="certificate_name">Certificate Name *</Label>
                <Input
                  id="certificate_name"
                  value={formData.certificate_name}
                  onChange={(e) => handleChange("certificate_name", e.target.value)}
                  placeholder="Enter certificate name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certificate_type">Certificate Type *</Label>
                <Select 
                  value={formData.certificate_type} 
                  onValueChange={(value) => handleChange("certificate_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
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

              <div className="space-y-2">
                <Label htmlFor="issued_by">Issued By</Label>
                <Input
                  id="issued_by"
                  value={formData.issued_by}
                  onChange={(e) => handleChange("issued_by", e.target.value)}
                  placeholder="Institution or authority"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issue_date">Issue Date</Label>
                <Input
                  id="issue_date"
                  type="date"
                  value={formData.issue_date}
                  onChange={(e) => handleChange("issue_date", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file_upload">Certificate File</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="file_upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {uploading && (
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <Upload className="w-4 h-4 animate-pulse" />
                      Uploading...
                    </div>
                  )}
                  {formData.file_url && !uploading && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <FileText className="w-4 h-4" />
                      {fileName || "File uploaded"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter certificate description"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {certificate ? "Update Certificate" : "Add Certificate"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}