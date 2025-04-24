const { sql } = require('../config/db.js');
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.post('/login', async (req, res) => {
    const { login, senha } = req.body;

    if (!login || !senha) {
        return res.status(400).send('Login e senha são obrigatórios.');
    }

    try {
        await sql.connect(config);

        const resultado = await sql.query`
            SELECT * FROM Usuarios WHERE login = ${login}
        `;

        const usuario = resultado.recordset[0];

        if (!usuario) {
            return res.status(401).send('Login ou senha incorretos.');
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (senhaCorreta) {
            res.send(`Login bem-sucedido! Bem-vindo, ${login}.`);
        } else {
            res.status(401).send('Login ou senha incorretos.');
        }

    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).send('Erro interno no servidor.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});