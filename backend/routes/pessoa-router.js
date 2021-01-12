const express = require('express')

const PessoaCtrl = require('../controllers/Pessoa-ctrl')

const router = express.Router()

router.post('/pessoa', PessoaCtrl.createPessoa)
router.post('/pessoa1', PessoaCtrl.getPessoa)
router.get('/pessoas', PessoaCtrl.getPessoas)
router.get('/pessoa/:id', PessoaCtrl.getPessoaById)
router.delete('/pessoa/:id',PessoaCtrl.deletePessoa)
router.put('/pessoa/:id',PessoaCtrl.updatePessoa)
module.exports = router