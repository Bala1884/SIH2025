import certificateDao from "../dao/certificate.dao.js";

export default {
  getCertificates: () => certificateDao.findAll(),
  getCertificate: id => certificateDao.findById(id),
  createCertificate: data => certificateDao.create(data),
  updateCertificate: (id, data) => certificateDao.update(id, data),
  deleteCertificate: id => certificateDao.delete(id),
};
