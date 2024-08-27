const express = require('express')
const bodyParser = require('body-parser')
const repository = require('./repository')

const app = express()

require("dotenv").config();

const port = process.env.PORT;

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.listen(port, () => {
    console.log(`Servidor rodando na porta de conexão ${port}.`)
})


//rotas

app.get('/usuarios', repository.getUsuarios)
app.get('/usuarios/:id', repository.getUsuariosById)
app.post('/usuarios', repository.createUsuario)
app.put('/usuarios/:id', repository.updateUsuario)