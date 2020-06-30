const bcrypt = require('bcrypt');

async function validatePass(pass, hash){
    bcrypt.compare(pass, hash, (err, result) => {
        if(err) return err;
        if(result) return result;
    })
}

module.exports = {
    validatePass
}