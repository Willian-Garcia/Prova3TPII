// routes/cargoRoutes.ts
import { Router } from "express";
import CargoController from "../controllers/CargoController";

const router = Router();

router.post("/", CargoController.create);
router.get("/", CargoController.list);
router.put("/:id", CargoController.update);
router.delete("/:id", CargoController.delete);

export default router;
