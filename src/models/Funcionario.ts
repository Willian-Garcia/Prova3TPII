import mongoose from "mongoose";
const { Schema } = mongoose;

const FuncionarioSchema = new Schema({
    nome: {
        type: String,
        maxLength: 50,
        required: true,
    },
    idade: {
        type: Number,
        maxLength: 3,
        required: true
    },
    email: {
        type: String,
        maxLength: 100,
        required: true,
        validate: {
            validator: function (value: string) {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return (
                    regex.test(value) &&
                    (value.endsWith("@adm.xpto.tec.br") ||
                        value.endsWith("@fiscal.xpto.tec.br") ||
                        value.endsWith("@dev.xpto.tec.br"))
                );
            },
            message: "Email do funcionário esta inválido.",
        },
        unique: true,
    },
    fone: {
        type: Number,
        maxLength: 11,
        required: true,
        validate: {
            validator: function isValidFone(value: number) {
                return /^[0-9]{11}$/.test(value.toString());
            },
            message: (props: { value: string }) =>
                `${props.value} não é um número de telefone válido!`,
        },
    }
});

export default mongoose.model("Funcionário", FuncionarioSchema, "funcionarios");