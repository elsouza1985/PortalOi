const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = 3333

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
const db = require('./db')
const estadoRouter = require('./routes/estado-router')
const pessoaRouter = require('./routes/pessoa-router')
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('BackEnd started')
})
app.use('/api', estadoRouter)
app.use('/api', pessoaRouter)
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))