import mongoose from "mongoose";
const {Schema} = mongoose;

const CargoSchema = new Schema({
    cbo:{
        type: String,
        required: true,
        unique: true,
    },
    descricao:{
        type: String,
        maxLength: 45,
        required: true,
    }
})

export default mongoose.model("Cargo", CargoSchema, "cargos");