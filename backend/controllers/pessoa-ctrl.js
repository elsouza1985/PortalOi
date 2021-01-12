const Pessoa = require('../models/pessoa-model')

createPessoa = (req, res) => {
    const body = req.body
console.log(body);
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Você deve enviar uma pessoa',
        })
    }

    const pessoa = new Pessoa(body)

    if (!pessoa) {
        return res.status(400).json({ success: false, error: err })
    }

    pessoa
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: pessoa._id,
                message: 'pessoa criada!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Erro ao criar pessoa!',
            })
        })
}

updatePessoa = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Você deve preencher o body da requisição',
        })
    }

    Pessoa.findOne({ _id: req.params.id }, (err, pessoa) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'pessoa não encontrada!',
            })
        }
        pessoa.nomerazaosocial = body.nomerazaosocial
        pessoa.cpfcnpj = body.cpfcnpj
        pessoa.cidade = body.cidade
        pessoa.telefone = body.telefone
        pessoa.cidade = body.cidade
        pessoa.estado = body.estado
        pessoa.datanasc = body.datanasc
        pessoa
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: pessoa._id,
                    message: 'pessoa updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Ocorreu um erro ao atualizar!',
                })
            })
    })
}
getPessoaById = async (req, res) => {
    await Pessoa.findOne({ _id: req.params.id }, (err, pessoa) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!pessoa) {
            return res
                .status(404)
                .json({ success: false, error: `pessoa not found` })
        }
        return res.status(200).json({ success: true, data: pessoa })
    }).catch(err => console.log(err))
}
deletePessoa = async (req, res) => {
    await Pessoa.findOneAndDelete({ _id: req.params.id }, (err, pessoa) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!pessoa) {
            return res
                .status(404)
                .json({ success: false, error: `registro não encontrado` })
        }

        return res.status(200).json({ success: true, data: pessoa })
    }).catch(err => console.log(err))
}

getPessoa = async (req, res) => {

    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Você deve preencher o body da requisição',
        })
    }
    console.log(req);
  
    await Pessoa.findOne({tipo:body.tipo, cpfcnpj:body.cpfcnpj,cidade:body.cidade }  , (err, pessoa) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!pessoa) {
            return res
                .status(404)
                .json({ success: false, error: `registro não encontrado` })
        }
        return res.status(200).json({ success: true, data: pessoa })
    }).catch(err => console.log(err))
}

getPessoas = async (req, res) => {

  const pessoas =   await Pessoa.find({}).sort({nomerazaosocial:1})
  if(!pessoas.length)
  res.status(200).json({ success: true, data: `Lista vazia` })
  if(pessoas)
    return res.status(200).json({ success: true, data: pessoas })


  /*.sort({"nomerazaosocial":1}, (err, pessoas) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!pessoas.length) {
            return res
                .status(404)
                .json({ success: false, error: `registro não encontrado` })
        }
        return res.status(200).json({ success: true, data: pessoas })
    }).catch(err => console.log(err))*/
}

module.exports = {
    createPessoa,
    updatePessoa,
    deletePessoa,
    getPessoas,
    getPessoa,
    getPessoaById
}