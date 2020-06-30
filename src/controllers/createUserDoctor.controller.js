const { pool } = require('../config/db.config');

async function CreateUserDoctor(req, res){
    const DatosCreateDoctor = {
        email: req.body.email || false,
        nombres: req.body.nombres || false,
        apellidos: req.body.apellidos || false,
        profesion: req.body.profesion || false,
        especialidad: req.body.especialidad || false,
        tipoDoc: req.body.tipoDoc || false,
        cedula: req.body.cedula || false,
        fechaNacimiento: req.body.fechaNacimiento || false,
        genero: req.body.genero || false,
        telefono: req.body.telefono || false,
        direccion: req.body.direccion || false,
        pais: req.body.pais || false,
        ciudad: req.body.ciudad || false,
        tarjetaProfesional: req.body.tarjetaProfesional || false
    }

    let verificadorDatos = {};

    for(let key in DatosCreateDoctor){
        if(DatosCreateDoctor[key] === false){
            verificadorDatos[key] = `Dato obligatorio no encontrado -> ${key}`;
        }
    }

    if(JSON.stringify(verificadorDatos) === '{}'){
        const InfoUser = await pool.query(`SELECT * FROM usuarios WHERE email='${DatosCreateDoctor.email}' AND rol='doctor'`);
        if(InfoUser.length > 0){
            pool.query(`INSERT INTO doctores SET ?`, [DatosCreateDoctor], (err, result) => {
                if(err) {
                    console.log('Error creando cuenta como doctor');
                    return res.status(400).json({
                        auth: true,
                        create: false,
                        message: err
                    });
                }
                if(result){
                    pool.query(`UPDATE usuarios SET complete='true' WHERE email='${DatosCreateDoctor.email}'`, (err, result) => {
                        if(err){
                            console.log('Error desconocido actualizando datos de usuario');
                            return res.status(500).json({
                                auth: true,
                                create: false,
                                message: err
                            });
                        }
                        if(result){
                            console.log('Datos de doctor guardados con éxito');
                            return res.status(201).json({
                                auth: true,
                                create: true,
                                message: result
                            });
                        }
                    });
                }
            });
        } else {
            console.log('No hay un usuario con estos datos para almacenar información de perfil');
            return res.status(404).json({
                auth: true,
                create: false,
                message: 'No existe un usuario con este email',
            });
        }
    }else{
        console.log('Faltan datos obligatorios para crear cuenta como doctor');
        return res.status(404).json({
            auth: true,
            create: false,
            message: 'Faltan datos obligatorios, descripción en DataNotFound',
            DataNotFound: verificadorDatos
        });
    }
}

module.exports ={
    CreateUserDoctor
}