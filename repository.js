const { request, response, query } = require('express');
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

const getUsuariosById = async (request, response) => {
    const id = request.params.id;

    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id]);
        response.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error.message);
        response.status(500).json({ erro: 'Erro ao consultar o banco de dados', detalhes: error.message });
    }
};


const createUsuario = async (request, response) => {
    const { nome, email, senha, data_nascimento, data_filiacao } = request.body;
    const DataNascimentoFormatada = moment(data_nascimento, 'DD-MM-YYYY').format('YYYY-MM-DD');
    const DataFiliacaoFormatada = moment(data_filiacao, 'DD-MM-YYYY').format('YYYY-MM-DD');

    try {
        await pool.query(
            'INSERT INTO usuarios (nome, email, senha, data_nascimento, data_filiacao) VALUES ($1, $2, $3, $4, $5)',
            [nome, email, senha, DataNascimentoFormatada, DataFiliacaoFormatada]
        );
        response.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        console.error('Erro ao inserir no banco de dados:', error.message);
        response.status(500).json({ erro: 'Erro ao inserir no banco de dados', detalhes: error.message });
    }
};


const updateUsuario = async (request, response) => {
    const id_usuario = parseInt(request.params.id);
    const { nome, email, senha, data_nascimento, data_filiacao } = request.body;
    const DataNascimentoFormatada = moment(data_nascimento, 'DD-MM-YYYY').format('YYYY-MM-DD');
    const DataFiliacaoFormatada = moment(data_filiacao, 'DD-MM-YYYY').format('YYYY-MM-DD');

    try {
        const result = await pool.query(
            'UPDATE usuarios SET nome = $1, email = $2, senha = $3, data_nascimento = $4, data_filiacao = $5 WHERE id_usuario = $6',
            [nome, email, senha, DataNascimentoFormatada, DataFiliacaoFormatada, id_usuario]
        );
        response.status(200).json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        console.error('Database update error:', error.message);
        response.status(500).json({ error: 'Database update error', details: error.message });
    }
};


const deleteUsuario = async (request, response) => {
    const id_usuario = parseInt(request.params.id);

    try {
        await pool.query('DELETE FROM usuarios WHERE id_usuario = $1', [id_usuario]);
        response.status(200).send(`Pessoa removida com sucesso, identificador: ${id_usuario}`);
    } catch (error) {
        console.error('Database erro:', error.message);
        response.status(500).json({ error: 'Database erro', details: error.message });
    }
};


module.exports = {
    getUsuarios,
    getUsuariosById,
    createUsuario,
    updateUsuario,
    deleteUsuario
};