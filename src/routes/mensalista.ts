import { Router } from "express";
import controller from "../controllers/MensalistaController";

const routes = Router();

routes.get("/", controller.list);
routes.post("/", controller.create);
routes.delete("/", controller.delete);
routes.put("/", controller.update);

export default routes;