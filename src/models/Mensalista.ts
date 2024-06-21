import mongoose from "mongoose";
import Funcionario from "./Funcionario";

const {Schema} = mongoose;

const MensalistaSchema = new Schema({
    funcionario:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Funcionario",
        required: true,
        validate:{
            validator: async function (id:string){
                const funcionario = await Funcionario.findById(id);
                return !!funcionario;
            },
            message: "O Funcionário não existe !",
        }
    },
    matricula:{
        type: Number,
        maxLength: 10,
        required: true,
        unique: true
    },
    salario:{
        type: Number,
        minLength: 0,
        required: true,
    },
});

export default mongoose.model("Mensalista", MensalistaSchema, "mensalistas");