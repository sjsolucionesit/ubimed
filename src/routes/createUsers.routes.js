const express = require('express');
const routes = express.Router();
const { GetToken } = require('../controllers/sendToken.controller');
const { CreateUserPacient } = require('../controllers/createUserPaciente.controller');
const { CreateUserDoctor } = require('../controllers/createUserDoctor.controller');
const { CreateUserLogin } = require('../controllers/createUserLogin.controller');

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

routes.post('/Crear/usuario', authenticated, (req, res) => {
    console.log('Cliente creando cuenta como usuario');
    CreateUserLogin(req, res);
});

routes.post('/Crear/paciente', authenticated, (req, res) => {
    console.log('Cliente creando cuenta como paciente');
    CreateUserPacient(req, res);
});

routes.post('/Crear/doctor', authenticated, (req, res) => {
    console.log('Cliente creando cuenta como doctor');
    CreateUserDoctor(req, res);
});

module.exports = routes;