const path = require('path');
const { pool } = require('../config/db.config'); 

async function downloadController(id, tipo, res){
    switch (tipo) {
        case 'consentimiento':
            if(typeof(Number(id)) == 'number'){
                const info = await pool.query(`SELECT cedulaPaciente FROM consentimiento WHERE id_consulta='${id}'`);
                if(info.length > 0){
                    const file = info[0];
                    res.download(path.join(__dirname, `../docs/consentimiento/consentimiento-${file.cedulaPaciente}-${id}.pdf`), err => {
                        if(err) return res.status(500).json({
                            auth: true,
                            download: false,
                            message: err
                        });
                    })
                }else{
                    return res.status(400).json({
                        auth: true,
                        download: false,
                        message: `No se encuentra ningún consentimiento con el id de consulta ${id}`
                    });
                }
            } else {
                return res.status(400).json({
                    auth: true,
                    download: false,
                    message: `Id de consulta erróneo, debe ser un Number -> ${id}`
                });
            }
            break;
        case 'hc':
            if(typeof(Number(id)) == 'number'){
                const info = await pool.query(`SELECT cedula FROM hcFile WHERE id_consulta='${id}'`);
                if(info.length > 0){
                    const file = info[0];
                    res.download(path.join(__dirname, `../docs/hc/hc-${file.cedula}-${id}.pdf`), err => {
                        if(err) return res.status(500).json({
                            auth: true,
                            download: false,
                            message: err
                        });
                    })
                }else{
                    return res.status(400).json({
                        auth: true,
                        download: false,
                        message: `No se encuentra ningúna hc con el id de consulta ${id}`
                    });
                }
            } else {
                return res.status(400).json({
                    auth: true,
                    download: false,
                    message: `Id de consulta erróneo, debe ser un Number -> ${id}`
                });
            }
            break;
        case 'formula':
            if(typeof(Number(id)) == 'number'){
                const info = await pool.query(`SELECT cedula FROM formula WHERE id_consulta='${id}'`);
                if(info.length > 0){
                    const file = info[0];
                    res.download(path.join(__dirname, `../docs/formula/formula-${file.cedula}-${id}.pdf`), err => {
                        if(err) return res.status(500).json({
                            auth: true,
                            download: false,
                            message: err
                        });
                    })
                }else{
                    return res.status(400).json({
                        auth: true,
                        download: false,
                        message: `No se encuentra ningúna formula con el id de consulta ${id}`
                    });
                }
            } else {
                return res.status(400).json({
                    auth: true,
                    download: false,
                    message: `Id de consulta erróneo, debe ser un Number -> ${id}`
                });
            }
            break;
        default:
            return res.status(400).json({
                auth: true,
                download: false,
                message: `Tipo de archivo erróneo o error de escritura -> ${tipo}`
            });
    }
}

module.exports = {
    downloadController
}