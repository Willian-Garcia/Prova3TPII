import { Request, Response, response } from "express";
import Mensalista from "../models/Mensalista";

class MensalistaController {
  async create(req: Request, res: Response) {
    const { matricula, salario, funcionario } = req.body;
    try {
      const response = await Mensalista.create({
        matricula,
        salario,
        funcionario,
      });
      res.status(201).json(response);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const mensalistas = await Mensalista.find().populate("funcionario");
      res.status(200).json(mensalistas);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Mensalista.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const mensalista = await Mensalista.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(mensalista);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new MensalistaController();