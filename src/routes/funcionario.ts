import { Router } from "express";
import FuncionarioController from "../controllers/FuncionarioController";

const router = Router();

router.post("/", FuncionarioController.create);
router.get("/", FuncionarioController.list);
router.put("/", FuncionarioController.update);
router.delete("/", FuncionarioController.delete);

export default router;
