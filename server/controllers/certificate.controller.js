import certificateService from "../services/certificate.service.js";

export default {
  getAll: async (req, res) => {
    res.json(await certificateService.getCertificates());
  },
  getOne: async (req, res) => {
    const cert = await certificateService.getCertificate(req.params.id);
    if (!cert) return res.status(404).json({ message: "Not found" });
    res.json(cert);
  },
  create: async (req, res) => {
    const cert = await certificateService.createCertificate(req.body);
    res.status(201).json(cert);
  },
  update: async (req, res) => {
    await certificateService.updateCertificate(req.params.id, req.body);
    res.json({ message: "Updated" });
  },
  delete: async (req, res) => {
    await certificateService.deleteCertificate(req.params.id);
    res.json({ message: "Deleted" });
  },
};
