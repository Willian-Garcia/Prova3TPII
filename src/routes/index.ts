import { Router, Request, Response } from "express";
import funcionario from "./funcionario";
import mensalista from "./mensalista";
import horista from "./horista";
import cargo from "./cargo";

const routes = Router();

routes.use("/funcionario", funcionario);
routes.use("/mensalista", mensalista);
routes.use("/horista", horista);
routes.use("/cargo", cargo);

routes.use( (_:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;