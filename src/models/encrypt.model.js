const bcrypt = require('bcryptjs');

async function Encriptar(pass){
    const salt = bcrypt.genSalt(10);
    const password = await bcrypt.hashSync(pass, salt);
    return password
}

module.exports = {
    Encriptar
}