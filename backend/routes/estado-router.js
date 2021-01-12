const express = require('express')

const EstadoCtrl = require('../controllers/estado-ctrl')

const router = express.Router()

router.post('/estado', EstadoCtrl.createEstado)
router.get('/estado/:id', EstadoCtrl.getEstadoById)
router.get('/estados', EstadoCtrl.getEstados)

module.exports = router