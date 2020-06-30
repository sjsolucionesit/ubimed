const path = require('path');
const resizeOptimizeImages = require('resize-optimize-images');

async function uploadsPhotosPerfil(req, res){
    const { cedula } = req.body;
    const photos = req.files.perfil;
    console.log('El cliente esta cargando una foto de perfil');
    if(photos && cedula){
        const nameImg = `perfil-${cedula}.${String(photos.mimetype).split('/')[1]}`;
        const rutaImg = path.join(__dirname, `../images/perfil-${cedula}.${String(photos.mimetype).split('/')[1]}`);
        photos.mv(rutaImg, err => {
            if(err){
                console.log('Error cargando foto de perfil ' + err);
                return res.status(500).json({
                    auth: true,
                    uploads: false,
                    message: err
                });
            }
            const options = {
                images: [rutaImg, rutaImg],
                width: 1000,
                height: 1000,
                quality: 80
            };
            resizeOptimizeImages(options).then( resultado => {
                console.log('El cliente cargo y dimensiono una foto de perfil con éxito');
                return res.status(201).json({
                    auth: true,
                    uploads: true,
                    nameImg,
                    ruta: rutaImg,
                    message: 'Imagen Subida y dimensionada con éxito',
                    code: resultado
                });
            }).catch( err => {
                console.log('Error dimensionando la imagen ' + err);
                return res.status(201).json({
                    auth: true,
                    uploads: false,
                    message: 'Imagen Subida pero no se dimensiono'
                });
            })
        });
    } else {
        if(!photos){
            console.log('No se detectaron archivos en la peticion del cliente');
            return res.status(400).json({
                auth: true,
                uploads: false,
                message: 'No se encontraron archivos en la petición'
            });
        }
        if(!cedula){
            console.log('El cliente no registra la cedula de la foto de perfil');
            return res.status(400).json({
                auth: true,
                uploads: false,
                message: 'No se encontró la cedula de la foto de perfil en cuestión'
            });
        }
    }
}

async function uploadsTarjetas(req, res){
    const { tarjetaProfesional } = req.body;
    const photos = req.files.tarjeta;
    console.log('El cliente esta cargando una foto de tarjetaProfesional');
    if(photos && tarjetaProfesional){
        const rutaImg = path.join(__dirname, `../images/tarjetaProfesional-${tarjetaProfesional}.${String(photos.mimetype).split('/')[1]}`);
        photos.mv(rutaImg, err => {
            if(err){
                console.log('Error cargando foto de tarjetaProfesional ' + err);
                return res.status(500).json({
                    auth: true,
                    uploads: false,
                    message: err
                });
            }
            return res.status(201).json({
                auth: true,
                uploads: true,
                ruta: rutaImg,
                message: 'Imagen Subida',
            });
        });
    } else {
        if(!photos){
            console.log('No se detectaron archivos en la peticion del cliente');
            return res.status(400).json({
                auth: true,
                uploads: false,
                message: 'No se encontraron archivos en la petición'
            });
        }
        if(!tarjetaProfesional){
            console.log('El cliente no registra el numero de tarjeta profesional de la foto del mismo');
            return res.status(400).json({
                auth: true,
                uploads: false,
                message: 'no registra el numero de tarjeta profesional de la foto del mismo'
            });
        }
    }
}

module.exports = {
    uploadsPhotosPerfil,
    uploadsTarjetas
}