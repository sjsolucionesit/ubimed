const { pool } = require('../config/db.config');
const { validatePass } = require('../model/validatePass.model');

async function validarLogin(req, res){
    if(req.body.email){
        if(req.body.password){
            pool.query(`SELECT * FROM usuarios WHERE email='${req.body.email}'`, (err, result) => {
                if(err) return res.status(404).json({
                    auth: false,
                    message: 'Usuario no encontrado'
                });
                if(result){
                    const password = result.password;
                    const resultValidate = validatePass(req.body.password, password);
                    res.state(200).json({
                        auth: true,
                        message: 'autenticacion valida'
                    })
                }
            });
        } else {
            return res.status(404).json({
                auth: false,
                message: 'Falta enviar el password'
            });
        }
    } else {
        return res.status(404).json({
            auth: false,
            message: 'Falta enviar el email'
        });
    }
}