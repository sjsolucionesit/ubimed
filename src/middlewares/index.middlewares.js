const jwt = require('jsonwebtoken');
const moment = require('moment');
const { API_MATCH } = require('../config/index.config');

module.exports = {
    authenticated: function(req, res, next){
        const token = req.headers['x-access-token'];
        if(!token){
            console.log('Peticion de usuario no valida, no tiene token auth');
            return res.status(404).json({
                auth: false,
                message: 'Token Not Found'
            });
        } else {
            const decode = jwt.decode(token, API_MATCH, (err) => {
                if (err) {
                    console.log('Error decodificando token');
                    return res.status(500).json({
                        auth: false,
                        message: "Error Server"
                    })
                }
            });
            if(decode.exp < moment().unix()){
                console.log('El token expiro');
                return res.status(401).json({
                    auth: false,
                    message: 'Token Expiro'
                });
            } else {
                next();
            }
        }
    }
}