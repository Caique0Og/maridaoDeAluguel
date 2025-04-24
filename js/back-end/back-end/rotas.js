const express = require('express');
const router = express.Router();
const controllerProfissionais = require('./controllers/controllerProfissionais')


router.get('/profissionais/servico/:serivcoId',controllerProfissionais.filterService)

router.get('/profissionais/avaliacoes',controllerProfissionais.filterAvaliation);

module.exports =router;