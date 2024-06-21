import { Request, Response } from 'express';
import Funcionario from '../models/Funcionario';

class FuncionarioController {
    // Create
    public async create(req: Request, res: Response): Promise<Response> {
        const { nome, idade, email, fone } = req.body;
        try {
            const funcionario = new Funcionario({ nome, idade, email, fone });
            const resp = await funcionario.save();
            return res.json(resp);
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "Este e-mail já está em uso!" });
            } else if (error && error.errors["email"]) {
                return res.json({ message: error.errors["email"].message });
            } else if (error && error.errors["nome"]) {
                return res.json({ message: error.errors["nome"].message });
            } else if (error && error.errors["fone"]) {
                return res.json({ message: error.errors["fone"].message });
            } else if (error && error.errors["idade"]) {
                return res.json({ message: error.errors["idade"].message });
            }
            return res.json({ message: error.message });
        }
    }

    // Read
    public async list(_: Request, res: Response): Promise<Response> {
        try {
            const funcionarios = await Funcionario.find().sort({ nome: "asc" });
            return res.json(funcionarios);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // Update
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, nome, idade, email, fone } = req.body;
        try {
            const funcionario = await Funcionario.findById(id);
            if (!funcionario) {
                return res.json({ message: "Funcionário não encontrado!" });
            }
            funcionario.nome = nome;
            funcionario.idade = idade;
            funcionario.email = email;
            funcionario.fone = fone;
            const resp = await funcionario.save();
            return res.json(resp);
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "Este e-mail já está em uso!" });
            } else if (error && error.errors["email"]) {
                return res.json({ message: error.errors["email"].message });
            } else if (error && error.errors["nome"]) {
                return res.json({ message: error.errors["nome"].message });
            } else if (error && error.errors["fone"]) {
                return res.json({ message: error.errors["fone"].message });
            } else if (error && error.errors["idade"]) {
                return res.json({ message: error.errors["idade"].message });
            }
            return res.json({ message: error.message });
        }
    }

    // Delete
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;
        try {
            const funcionario = await Funcionario.findByIdAndDelete(id);
            if (funcionario) {
                return res.json({ message: "Funcionário excluído com sucesso!" });
            } else {
                return res.json({ message: "Funcionário não encontrado!" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
}

export default new FuncionarioController();
