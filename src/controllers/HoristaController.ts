// controllers/HoristaController.ts
import { Request, Response } from "express";
import Horista from "../models/Horista";
import Funcionario from "../models/Funcionario";

class HoristaController {
    // Create
    public async create(req: Request, res: Response): Promise<Response> {
        const { funcionario, horas, funcao } = req.body;
        try {
            // Verifica se o funcionário existe
            const funcionarioExistente = await Funcionario.findById(funcionario);
            if (!funcionarioExistente) {
                return res.status(400).json({ error: "Funcionário não encontrado." });
            }

            const horista = new Horista({
                funcionario,
                horas,
                funcao,
            });

            await horista.save();

            return res.status(201).json(horista);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Read (list)
    public async list(_: Request, res: Response): Promise<Response> {
        try {
            const horistas = await Horista.find().populate("funcionario");
            return res.json(horistas);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Update
    public async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { funcionario, horas, funcao } = req.body;
        try {
            const horistaExistente = await Horista.findById(id);
            if (!horistaExistente) {
                return res.status(400).json({ error: "Horista não encontrado." });
            }

            // Verifica se o funcionário existe
            const funcionarioExistente = await Funcionario.findById(funcionario);
            if (!funcionarioExistente) {
                return res.status(400).json({ error: "Funcionário não encontrado." });
            }

            // Atualiza os dados do horista
            horistaExistente.funcionario = funcionario;
            horistaExistente.horas = horas;
            horistaExistente.funcao = funcao;

            await horistaExistente.save();

            return res.json(horistaExistente);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Delete
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const horista = await Horista.findByIdAndDelete(id);
            if (!horista) {
                return res.status(400).json({ error: "Horista não encontrado." });
            }
            return res.json({ message: "Horista deletado com sucesso." });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new HoristaController();
