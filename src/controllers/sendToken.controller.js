const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { API_MATCH } = require('../config/index.config');

async function GetToken(req, res){
    if(!req.body.apiSecret){
        console.log('Not found apiSecret on body');
        return res.status(404).json({
            message: 'apiSecret no encontrada en cuerpo de post'
        });
    } else {
        const match = await bcrypt.compare(req.body.apiSecret, API_MATCH).catch(reason => {
            console.log('Error comparando api' + reason);
        });
        if(!match){
            console.log('apiSecret Incorrected');
            return res.status(401).json({
                message: 'EL apiSecret es falsa'
            })
        } else{
            console.log('Login Success');
            const token = await jwt.sign({
                empresa: 'UbimedServices'
            }, req.body.apiSecret, {
                expiresIn: 60 * 60 * 12 // en 12 horas expira el token
            });
            return res.status(200).json({
                token,
                message: 'Login por jwt exitoso'
            });
        }
    }
} 

module.exports = {
    GetToken
}