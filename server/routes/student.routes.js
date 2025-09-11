import { Router } from "express";
import studentController from "../controllers/student.controller.js";

const router = Router();

router.get("/", studentController.getAll);
router.get("/:roll_no", studentController.getOne);
router.post("/", studentController.create);
router.put("/:roll_no", studentController.update);
router.delete("/:roll_no", studentController.delete);

export default router;
