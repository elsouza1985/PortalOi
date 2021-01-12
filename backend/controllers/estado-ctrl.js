const Estado = require('../models/estado-model')


createEstado = (req, res) => {
    const body = req.body

    const estado = new Estado(body)

    if (!estado) {
        return res.status(400).json({ success: false, error: err })
    }

    estado
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: estado._id,
                message: 'Ok',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Error',
            })
        })
}





getEstadoById = async (req, res) => {
    await Estado.findOne({ _id: req.params.id }, (err, estado) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!estado) {
            return res
                .status(404)
                .json({ success: false, error: `estado não encontrado` })
        }
        return res.status(200).json({ success: true, data: estado })
    }).catch(err => console.log(err))
}

getEstados = async (req, res) => {
    await Estado.find({}, (err, estados) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!estados.length) {
            return res
                .status(404)
                .json({ success: false, error: `estado não encontrado` })
        }
        return res.status(200).json({ success: true, data: estados })
    }).catch(err => console.log(err))
}

module.exports = {
    createEstado,
    getEstados,
    getEstadoById
   
}