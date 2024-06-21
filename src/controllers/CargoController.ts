// controllers/CargoController.ts
import { Request, Response } from "express";
import Cargo from "../models/Cargo";

class CargoController {
    // Create
    public async create(req: Request, res: Response): Promise<Response> {
        const { cbo, descricao } = req.body;
        try {
            const cargo = new Cargo({
                cbo,
                descricao,
            });

            await cargo.save();

            return res.status(201).json(cargo);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Read (list)
    public async list(_: Request, res: Response): Promise<Response> {
        try {
            const cargos = await Cargo.find().sort({ descricao: "asc" });
            return res.json(cargos);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Update
    public async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { cbo, descricao } = req.body;
        try {
            const cargoExistente = await Cargo.findById(id);
            if (!cargoExistente) {
                return res.status(400).json({ error: "Cargo não encontrado." });
            }

            cargoExistente.cbo = cbo;
            cargoExistente.descricao = descricao;

            await cargoExistente.save();

            return res.json(cargoExistente);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Delete
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const cargo = await Cargo.findByIdAndDelete(id);
            if (!cargo) {
                return res.status(400).json({ error: "Cargo não encontrado." });
            }
            return res.json({ message: "Cargo deletado com sucesso." });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new CargoController();
