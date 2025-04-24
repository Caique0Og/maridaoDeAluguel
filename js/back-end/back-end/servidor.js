const express = require('express');
const {connectDB} =require ('./config/db');
const profissionalRoutes =require('./rotas');

const app =express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use ('/api,profissionalRoutes');

connectDB().then (()=>{
    app.listen(PORT,()=>{
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err =>{
    console.error('Erro ao iniciar o servidor:',err)
 });