const express = require('express');
const routes = express.Router();

// controladores
const { GetToken } = require('../controllers/sendToken.controller');
const { getDataForHc } = require('../controllers/createHc.controller');
const { acceptConsentimiento } = require('../controllers/acceptConsentimiento.controller');
const { crearFormula } = require('../controllers/createFormula.controller');

// middlewares
const { authenticated } = require('../middlewares/index.middlewares');

routes.get('/verifyAuth', authenticated, (req, res) => {
    console.log('Cliente verifico token con éxito');
    res.json({
        auth: 'true',
        message: 'Token Valido para realizar peticiones al servicio'
    });
});

routes.post('/getToken', async (req, res)=>{
    console.log('Cliente esta solicitando un token');
    GetToken(req, res);
});

routes.post('/acceptConsentimiento', authenticated, async(req, res)=>{
    console.log('Cliente pide firmar el consentimiento');
    acceptConsentimiento(req.body, res);
});

routes.post('/createHc', authenticated, async (req, res) => {
    console.log('Cliente creando historia clinica');
    getDataForHc(req.body, res);
});

routes.post('/createFormula', authenticated, async (req, res) => {
    console.log('Cliente creando Formula Medica');
    crearFormula(req.body, res);
});

module.exports = routes;