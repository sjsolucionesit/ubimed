const express = require('express');
const routes = express.Router();

const { GetToken } = require('../controllers/sendToken.controller');
const { authenticated} = require('../middlewares/index.middlewares');
const { uploadsPhotosPerfil, uploadsTarjetas } = require('../controllers/uploadPhotos.controller');
const { uploadsSupport } = require('../controllers/uploadsSupport.controller');

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

routes.post('/photoPerfil', async (req, res)=>{
    console.log('Cliente esta cargando una foto de perfil');
    uploadsPhotosPerfil(req, res);
});

routes.post('/photoTarjeta', async (req, res)=>{
    console.log('Cliente esta cargando foto de tarjeta profesional');
    uploadsTarjetas(req, res);
});

routes.post('/supports', async (req, res)=>{
    console.log('Cliente esta cargando documentos de apoyo');
    uploadsSupport(req, res);
});

module.exports = routes;