const path = require('path');
const { pool } = require('../config/db.config'); 
const { createHc } = require('../models/hc.model');

async function getDataForHc(datosHc, res){
    
    const DatosRenderHc = {
        id_consulta: datosHc.id_consulta || false,
        nombre: datosHc.nombre || false,
        apellido: datosHc.apellido || false,
        tipoDoc: datosHc.tipoDoc || false,
        cedula: datosHc.cedula || false,
        fechaNacimiento: datosHc.fechaNacimiento || false,
        lugarNacimiento: datosHc.lugarNacimiento || false,
        ocupacion: datosHc.descripcionOcupacion || ' ',
        genero: datosHc.genero || false,
        pais: datosHc.pais || false,
        ciudad: datosHc.ciudad || false,
        direccion: datosHc.direccion || false,
        telefono: datosHc.telefono || false,
        nombreTutor: datosHc.nombreTutor || ' ',
        cedulaTutor: datosHc.cedulaTutor || ' ',
        empresaSalud: datosHc.empresaSalud || false,
        autorizacion: datosHc.autorizacion || ' ',
        tipoUsuario: datosHc.tipoUsuario || ' ',
        tipoAfiliacion: datosHc.tipoAfiliacion || ' ',
        motivoConsulta: datosHc.motivoConsulta || false,
        enfermedadActual: datosHc.enfermedadActual || false,
        antecedentesAlergicos: datosHc.antecedentesAlergicos || ' ',
        otrosAntecedentes: datosHc.otrosAntecedentes || ' ',
        hallazgos: datosHc.hallazgos || false,
        paraclinicos: datosHc.paraclinicos || false,
        cie10: datosHc.cie10 || false,
        diagnostico: datosHc.diagnostico || false,
        plan: datosHc.plan || false,
        nombreDoctor: datosHc.nombreDoctor || false,
        apellidoDoctor: datosHc.apellidoDoctor || false,
        especialidadDoctor: datosHc.especialidadDoctor || false,
        profesionDoctor: datosHc.profesionDoctor || false,
        tarjetaProfesional: datosHc.tarjetaProfesional || false
    };
    
    let verificadorDatos = {};

    for(let key in DatosRenderHc){
        if(DatosRenderHc[key] === false){
            verificadorDatos[key] = `Dato obligatorio no encontrado -> ${key}`;
        }
    }

    if(JSON.stringify(verificadorDatos) === '{}'){
        const verificarFirma = await pool.query(`SELECT * FROM consentimiento WHERE id_consulta = '${DatosRenderHc.id_consulta}'`);
        if(verificarFirma.length > 0){
            DatosRenderHc.ruta = path.join(__dirname, `../docs/hc/hc-${DatosRenderHc.cedula}-${DatosRenderHc.id_consulta}.pdf`);
            pool.query('INSERT INTO hcFile SET ?', [DatosRenderHc], (err, result) => {
                if(err){ 
                    if(err.code === 'ER_DUP_ENTRY'){
                        pool.query('UPDATE hcFile SET ?', [DatosRenderHc], (err, resultado) => {
                                if(err){
                                    console.log(err);
                                    return res.status(400).json({
                                        auth: true,
                                        hc: false,
                                        message: err
                                    });
                                }
                                if(resultado){
                                    console.log('Historia clínica actualizada');
                                    createHc(DatosRenderHc, DatosRenderHc.ruta, res);
                            }
                        });
                    } else {
                        console.log(err);
                        return res.status(400).json({
                            auth: true,
                            hc: false,
                            message: err
                        });
                    }
                }
                if(result){
                    console.log('Historia clínica creada');
                    createHc(DatosRenderHc, DatosRenderHc.ruta, res);
                }
            });
        } else {
            console.log('El profesional de la salud no puede generar historia clinica si el paciente no ha firmado el consentimiento');
            return res.status(404).json({
                auth: true,
                hc: false,
                message: 'El paciente no ha firmado el consentimiento informado',
            });
        }
    } else {
        console.log('Faltan datos obligatorios para crear historia clínica');
        return res.status(404).json({
            auth: true,
            hc: false,
            message: 'Faltan datos obligatorios, descripción en DataNotFound',
            DataNotFound: verificadorDatos
        });
    }
}

module.exports = {
    getDataForHc
}