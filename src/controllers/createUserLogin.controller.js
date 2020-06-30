const { pool } = require('../config/db.config');
const { Encriptar } = require('../models/encrypt.model');

async function CreateUserLogin(req, res){
    if(req.body.password){
        const passEncrypt = await Encriptar(req.body.password);
    }

    const CreateUserLogin = {
        email: req.body.email || false,
        password: passEncrypt || false,
        rol: req.body.rol || false,
        estado: '0',
        complete: 'false',
    }

    let verificadorDatos = {};

    for(let key in CreateUserLogin){
        if(CreateUserLogin[key] === false){
            verificadorDatos[key] = `Dato obligatorio no encontrado -> ${key}`;
        }
    }

    if(JSON.stringify(verificadorDatos) === '{}'){
        pool.query(`INSERT INTO usuarios SET ?`, [CreateUserLogin], (err, result) => {
            if(err) {
                console.log('Error creando usuario');
                return res.status(400).json({
                    auth: true,
                    create: false,
                    message: err
                });
            }
            if(result){
                console.log('Datos de usuario guardados con éxito');
                return res.status(201).json({
                    auth: true,
                    create: true,
                    message: result
                });
            }
        });
    }else{
        console.log('Faltan datos obligatorios para crear usuario');
        return res.status(404).json({
            auth: true,
            create: false,
            message: 'Faltan datos obligatorios, descripción en DataNotFound',
            DataNotFound: verificadorDatos
        });
    }
}

module.exports ={
    CreateUserLogin
}