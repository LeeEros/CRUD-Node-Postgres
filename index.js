const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const repository = require('./repository')

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

app.get('/pessoas', repository.getPessoas)