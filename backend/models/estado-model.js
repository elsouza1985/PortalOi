const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Estado = new Schema(
    {
        nome: { type: String, required: true },
        cidade: { type: [String], required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('estados', Estado)