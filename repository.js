const { request, response } = require('express');
const { Pool } = require('pg');
const moment = require('moment');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const getUsuarios = (request, response) => {
    pool.query('SELECT * FROM usuarios ORDER BY id_usuario', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUsuariosById = (request, response) => {
    const id = (request.params.id)

    pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

const createUsuario = (request, response) => {
    const { nome, email, senha, data_nascimento, data_filiacao } = request.body;
    const DataNascimentoFormatada = moment(data_nascimento, 'DD-MM-YYYY').format('YYYY-MM-DD');
    const DataFiliacaoFormatada = moment(data_filiacao, 'DD-MM-YYYY').format('YYYY-MM-DD');

    pool.query(
        'INSERT INTO usuarios (nome, email, senha, data_nascimento, data_filiacao) VALUES ($1, $2, $3, $4, $5)',
        [nome, email, senha, DataNascimentoFormatada, DataFiliacaoFormatada],
        (error, results) => {
            if (error) {
                console.error('Database insert error:', error.message);
                return response.status(500).json({ error: 'Database insert error', details: error.message });
            }
            response.status(201).json({ message: 'Usuario cadastrado com sucesso' });
        }
    );
};

const updateUsuario = (request, response) => {
    const id_usuario = parseInt(request.params.id)
    const { nome, email, senha, data_nascimento, data_filiacao } = request.body;
    console.log(id_usuario);
    const DataNascimentoFormatada = moment(data_nascimento, 'DD-MM-YYYY').format('YYYY-MM-DD');
    const DataFiliacaoFormatada = moment(data_filiacao, 'DD-MM-YYYY').format('YYYY-MM-DD');

    pool.query(
        'UPDATE usuarios SET nome = $1, email = $2, senha = $3, data_nascimento = $4, data_filiacao = $5 WHERE id_usuario = $6',
        [nome, email, senha, DataNascimentoFormatada, DataFiliacaoFormatada, id_usuario],
        (error, result) => {
            if (error) {
                console.error('Database insert error:', error.message);
                return response.status(500).json({ error: 'Database insert error', details: error.message });
            }
            response.status(200).json({ message: 'Usuário atualizado com sucesso' });
        }
    );
};



module.exports = {
    getUsuarios,
    getUsuariosById,
    createUsuario,
    updateUsuario
};