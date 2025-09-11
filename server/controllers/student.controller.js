import studentService from "../services/student.service.js";

export default {
  getAll: async (req, res) => {
    res.json(await studentService.getStudents());
  },
  getOne: async (req, res) => {
    const student = await studentService.getStudent(req.params.roll_no);
    if (!student) return res.status(404).json({ message: "Not found" });
    res.json(student);
  },
  create: async (req, res) => {
    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
  },
  update: async (req, res) => {
    await studentService.updateStudent(req.params.roll_no, req.body);
    res.json({ message: "Updated" });
  },
  delete: async (req, res) => {
    await studentService.deleteStudent(req.params.roll_no);
    res.json({ message: "Deleted" });
  },
};
