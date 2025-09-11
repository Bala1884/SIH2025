import db from "../models/index.js";
const { Certificate } = db;

export default {
  create: data => Certificate.create(data),
  findAll: () => Certificate.findAll(),
  findById: id => Certificate.findByPk(id),
  update: (id, data) => Certificate.update(data, { where: { id } }),
  delete: id => Certificate.destroy({ where: { id } }),
};
