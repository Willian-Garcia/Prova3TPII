import { Router } from "express";
import HoristaController from "../controllers/HoristaController";

const router = Router();

router.post("/", HoristaController.create);
router.get("/", HoristaController.list);
router.put("/:id", HoristaController.update);
router.delete("/:id", HoristaController.delete);

export default router;
