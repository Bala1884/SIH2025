import { Router } from "express";
import certificateController from "../controllers/certificate.controller.js";

const router = Router();

router.get("/", certificateController.getAll);
router.get("/:id", certificateController.getOne);
router.post("/", certificateController.create);
router.put("/:id", certificateController.update);
router.delete("/:id", certificateController.delete);

export default router;
