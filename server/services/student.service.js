import studentDao from "../dao/student.dao.js";

export default {
  // Fetch all students
  getStudents: () => studentDao.findAll(),

  // Fetch one student by roll_no
  getStudent: roll_no => studentDao.findById(roll_no),

  // Create a new student
  createStudent: data => studentDao.create(data),

  // Update student details
  updateStudent: (roll_no, data) => studentDao.update(roll_no, data),

  // Delete a student
  deleteStudent: roll_no => studentDao.delete(roll_no),
};
