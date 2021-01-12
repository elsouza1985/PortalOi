const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Pessoa = new Schema(
    {
        tipo: { type: String, required: true },
        nomerazaosocial: { type: String, required: true },
        cpfcnpj: { type: String, required: true },
        telefone: { type: String, required: true },
        cidade: { type: String, required: true },
        estado:{type:String, required:true},
        datanasc: { type: Date, required: false }
    },
    { timestamps: true },
)

module.exports = mongoose.model('pessoas', Pessoa)