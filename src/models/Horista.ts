import mongoose from "mongoose";
import Funcionario from "./Funcionario";
const {Schema} = mongoose;

const HoristaSchema = new Schema({
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
    horas:{
        type: Number,
        required: true,
    },
    funcao:{
        type: String,
        required: true,
    }
});

export default mongoose.model("Horista", HoristaSchema, "horistas");