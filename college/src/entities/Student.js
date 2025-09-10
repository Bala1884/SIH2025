export const Student={
  "name": "Student",
  "type": "object",
  "properties": {
    "roll_no": {
      "type": "string",
      "description": "Unique student roll number"
    },
    "name": {
      "type": "string",
      "description": "Full name of the student"
    },
    "email": {
      "type": "string",
      "format": "email",
      "description": "Student email address"
    },
    "phone": {
      "type": "string",
      "description": "Student phone number"
    },
    "department": {
      "type": "string",
      "enum": [
        "Computer Science",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Business Administration",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "Other"
      ],
      "description": "Student department"
    },
    "year": {
      "type": "string",
      "enum": [
        "1st Year",
        "2nd Year",
        "3rd Year",
        "4th Year",
        "Graduate"
      ],
      "description": "Academic year"
    },
    "admission_date": {
      "type": "string",
      "format": "date",
      "description": "Date of admission"
    },
    "address": {
      "type": "string",
      "description": "Student address"
    },
    "guardian_name": {
      "type": "string",
      "description": "Guardian's name"
    },
    "guardian_phone": {
      "type": "string",
      "description": "Guardian's phone number"
    },
    "status": {
      "type": "string",
      "enum": [
        "Active",
        "Inactive",
        "Graduated",
        "Suspended"
      ],
      "default": "Active",
      "description": "Student status"
    }
  },
  "required": [
    "roll_no",
    "name",
    "department",
    "year"
  ]
}