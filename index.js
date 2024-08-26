const express = require('express')
const bodyParser = require('body-parser')
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

app.get('/', (request, response) => {
    console.log("Hello World!")
})