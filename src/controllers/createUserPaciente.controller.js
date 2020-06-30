const { pool } = require('../config/db.config');

async function CreateUserPacient(req, res){
    const DatosCreatePacient = {
        email: req.body.email || false,
        nombres: req.body.nombres || false,
        apellidos: req.body.apellidos || false,
        tipoDoc: req.body.tipoDoc || false,
        cedula: req.body.cedula || false,
        fechaNacimiento: req.body.fechaNacimiento || false,
        lugarNacimiento: req.body.lugarNacimiento || false,
        estadoCivil: req.body.estadoCivil || false,
        genero: req.body.genero || false,
        rh: req.body.rh || false,
        telefono: req.body.telefono || false,
        direccion: req.body.direccion || false,
        pais: req.body.pais || false,
        ciudad: req.body.ciudad || false,
        nombreTutor: req.body.nombreTutor || 'No registra',
        parentesco: req.body.parentesco || 'No registra',
        numeroId: req.body.numeroId || 'No registra',
    } 

    let verificadorDatos = {};

    for(let key in DatosCreatePacient){
        if(DatosCreatePacient[key] === false){
            verificadorDatos[key] = `Dato obligatorio no encontrado -> ${key}`;
        }
    }

    if(JSON.stringify(verificadorDatos) === '{}'){
        const infoUser = await pool.query(`SELECT * FROM usuarios WHERE email='${DatosCreatePacient.email}' AND rol='paciente'`);
        if(infoUser.length > 0){
            pool.query(`INSERT INTO pacientes SET ?`, [DatosCreatePacient], (err, result) => {
                if(err) {
                    console.log('Error creando cuenta como paciente');
                    return res.status(400).json({
                        auth: true,
                        create: false,
                        message: err
                    });
                }
                if(result){
                    pool.query(`UPDATE usuarios SET complete='true' WHERE email='${DatosCreatePacient.email}'`, (err, result) => {
                        if(err){
                            console.log('Error desconocido actualizando datos de usuario');
                            return res.status(500).json({
                                auth: true,
                                create: false,
                                message: err
                            });
                        }
                        if(result){
                            console.log('Datos de paciente guardados con éxito');
                            return res.status(201).json({
                                auth: true,
                                create: true,
                                message: result
                            });
                        }
                    });
                }
            });
        }else{
            console.log('No hay un usuario registrado con esos datos');
            return res.status(404).json({
                auth: true,
                create: false,
                message: 'No hay un usuario con estos datos',
            });
        }
    }else{
        console.log('Faltan datos obligatorios para crear cuenta como paciente');
        return res.status(404).json({
            auth: true,
            create: false,
            message: 'Faltan datos obligatorios, descripción en DataNotFound',
            DataNotFound: verificadorDatos
        });
    }
}

module.exports ={
    CreateUserPacient
}