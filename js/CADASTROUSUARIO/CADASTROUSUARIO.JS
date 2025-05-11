const { sql } = require('../config/db.js');
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.post('/cadastrar', async (req, res) => {
    const { login, senha } = req.body;

    if (!login || !senha) {
        return res.status(400).json({ error: 'Login e senha são obrigatórios.' });
    }

    try {
        await sql.connect(config);

        const verificar = await sql.query`SELECT * FROM Usuarios WHERE login = ${login}`;
        if (verificar.recordset.length > 0) {
            return res.status(409).json({ error: 'Usuário já existe.' });
        }

        await sql.query`INSERT INTO Usuarios (login, senha) VALUES (${login}, ${senha})`;

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});