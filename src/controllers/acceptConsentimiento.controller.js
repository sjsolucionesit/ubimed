const path = require('path');
const { pool } = require('../config/db.config');
const { CrearPdfConsentimiento } = require('../models/consentimiento.model');

async function acceptConsentimiento(datos, res){
    const DatosFirmaConsentimiento = {
        nombrePaciente: datos.nombrePaciente || false,
        apellidoPaciente: datos.apellidoPaciente || false,
        tipoDocPaciente: datos.tipoDocPaciente || false,
        cedulaPaciente: datos.cedulaPaciente || false,
        emailPaciente: datos.emailPaciente || false,
        nombreDoctor: datos.nombreDoctor || false,
        apellidoDoctor: datos.apellidoDoctor || false,
        profesionDoctor: datos.profesionDoctor || false,
        especialidadDoctor: datos.especilidadDoctor || false,
        tarjetaProfesional: datos.tarjetaProfesional || false,
        emailDoctor: datos.emailDoctor || false,
        id_consulta: datos.id_consulta || false
    };

    let verificadorDatos = {};

    for(let key in DatosFirmaConsentimiento){
        if(DatosFirmaConsentimiento[key] === false){
            verificadorDatos[key] = `Dato obligatorio no encontrado -> ${key}`;
        }
    }

    if(JSON.stringify(verificadorDatos) === '{}'){
        console.log('Datos para firmar consentimiento, validos');
        DatosFirmaConsentimiento.ruta = path.join(__dirname, `../docs/consentimiento/consentimiento-${DatosFirmaConsentimiento.cedulaPaciente}-${DatosFirmaConsentimiento.id_consulta}.pdf`);
        pool.query('INSERT INTO consentimiento SET ?', [DatosFirmaConsentimiento], async (err, resultado) => {
            if(err){
                if(err.code === 'ER_DUP_ENTRY'){
                    console.log('El consentimiento informado ya estaba firmado');
                    CrearPdfConsentimiento(DatosFirmaConsentimiento, DatosFirmaConsentimiento.ruta, res);
                } else {
                    console.log('Error en sql para firmar consentimiento: ' + err);
                    return res.status(400).json({ auth: true, firma: false, message: err});
                }
            }
            if(resultado){
                console.log(`El paciente ${DatosFirmaConsentimiento.emailPaciente} firmo el consentimiento`);
                CrearPdfConsentimiento(DatosFirmaConsentimiento, DatosFirmaConsentimiento.ruta, res);
            }
        });
    } else {
        console.log('Faltan datos obligatorios para firmar consentimiento');
        return res.status(404).json({
            auth: true,
            message: 'Faltan datos obligatorios, descripción en DataNotFound',
            DataNotFound: verificadorDatos
        });
    }
}

module.exports = {
    acceptConsentimiento
}