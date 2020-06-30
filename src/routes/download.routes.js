const express = require('express');
const routes = express.Router();

// controladores
const { downloadController } = require('../controllers/download.controller');

// middlewares
const { authenticated } = require('../middlewares/index.middlewares');

routes.get('/download/:tipo/:id_consulta', authenticated, (req, res) => {
    const { id_consulta, tipo } = req.params;
    console.log(`peticion de cliente para descargar ${tipo} con id de consulta ${id_consulta}`);
    downloadController(id_consulta, tipo, res);
});

module.exports = routes;