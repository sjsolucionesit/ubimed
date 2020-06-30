const path = require('path');
const uniq = require('uniqid');

async function uploadsSupport(req, res){
    let nombresFicheros = [];
    let rutasFicheros = [];
    if(req.files){
        const soporte = req.files.supports;
        if(soporte){
            if(typeof(soporte.length) == 'undefined'){
                const nameFichero = uniq() + '-' + soporte.name;
                const rutaSave = path.join(__dirname, `../docs/${nameFichero}`);
                soporte.mv(rutaSave, err => {
                    if(err) {
                        return res.status(400).json({
                            auth: true,
                            uploads: true,
                            message: err
                        });
                    }
                    return res.status(201).json({
                        auth: true,
                        uploads: true,
                        nameFichero,
                        rutaSave,
                        message: 'Fichero cargado con éxito'
                    });
                });
            } else {
                soporte.forEach(fichero => {
                    const nameFichero = uniq() + '-' + fichero.name;
                    const rutaSave = path.join(__dirname, `../docs/${nameFichero}`);
                    nombresFicheros.push(nameFichero);
                    rutasFicheros.push(rutaSave);
                    fichero.mv(rutaSave, err => {
                        if(err) {
                            return res.status(400).json({
                                auth: true,
                                uploads: true,
                                message: err
                            });
                        }
                    });
                });
                return res.status(201).json({
                    auth: true,
                    uploads: true,
                    nombresFicheros,
                    rutasFicheros,
                    message: 'Fichero cargado con éxito'
                });
            }
        }else{
            return res.status(404).json({
                auth: true,
                uploads: false,
                message: 'No se encontraron ficheros'
            });
        }
    }else{
        return res.status(404).json({
            auth: true,
            uploads: false,
            message: 'No se encontraron ficheros'
        });
    }
}

module.exports = {
    uploadsSupport
}