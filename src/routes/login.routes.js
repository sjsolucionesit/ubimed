const express = require('express');
const routes = express.Router();
const {} = require('../middlewares/index.middlewares');
const { GetToken } = require('../controllers/sendToken.controller');
const { CreateUser } = require('../controllers/createUser.controller');

routes.post('/auth', (req, res) =>{
    console.log('Petición de cliente para adquirir token');
    GetToken(req, res);
});

routes.post('/signup', (req, res) =>{
    GetToken(req, res).then(
        getToken => {
            CreateUser(req, res, getToken.token).then(
                result => {
                    return result;
                }
            ).catch(
                err => {
                    return err;
                }
            );
        }
    ).catch(
        err => {
            console.log(err);
            return res.status(400).json({
                auth: false,
                message: err
            });
        }
    );
});

module.exports = routes;