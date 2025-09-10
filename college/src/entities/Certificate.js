export const Certificate={
  "name": "Certificate",
  "type": "object",
  "properties": {
    "student_roll_no": {
      "type": "string",
      "description": "Student roll number"
    },
    "certificate_name": {
      "type": "string",
      "description": "Name of the certificate"
    },
    "certificate_type": {
      "type": "string",
      "enum": [
        "Academic",
        "Achievement",
        "Participation",
        "Course Completion",
        "Internship",
        "Project",
        "Other"
      ],
      "description": "Type of certificate"
    },
    "issued_by": {
      "type": "string",
      "description": "Institution or authority that issued the certificate"
    },
    "issue_date": {
      "type": "string",
      "format": "date",
      "description": "Date when certificate was issued"
    },
    "description": {
      "type": "string",
      "description": "Description of the certificate"
    },
    "file_url": {
      "type": "string",
      "description": "URL of the certificate file"
    }
  },
  "required": [
    "student_roll_no",
    "certificate_name",
    "certificate_type"
  ]
}