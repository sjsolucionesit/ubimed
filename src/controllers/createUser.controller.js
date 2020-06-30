const { PORT_CREATE_USER } = require('../config/index.config');
const fetch = require('node-fetch');

async function CreateUser(req, res, token){
    console.log(token);
    fetch(`http://127.0.0.1:${PORT_CREATE_USER}/CreateUser/Crear/usuario`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(req.body)
    }).then(
        (result) => {
            return res.status(201).json(result);
        }
    ).catch(
        (err) => {
            return res.status(400).json(err);
        }
    )
}

module.exports = {
    CreateUser
}