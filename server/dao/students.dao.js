import db from "../models/index.js";
const { Student } = db;

export default {
  create: data => Student.create(data),
  findAll: () => Student.findAll(),
  findById: roll_no => Student.findOne({ where: { roll_no } }),
  update: (roll_no, data) => Student.update(data, { where: { roll_no } }),
  delete: roll_no => Student.destroy({ where: { roll_no } }),
};
