const path = require('path');
const { pool } = require('../config/db.config'); 
const { crearPdfFormula } = require('../models/formula.model'); 

async function crearFormula(datosFormula, res){
    const DatosRenderFormula = {
        id_consulta: datosFormula.id_consulta || false,
        nombre: datosFormula.nombre || false,
        apellido: datosFormula.apellido || false,
        tipoDoc: datosFormula.tipoDoc || false,
        cedula: datosFormula.cedula || false,
        fechaNacimiento: datosFormula.fechaNacimiento || false,
        lugarNacimiento: datosFormula.lugarNacimiento || false,
        ocupacion: datosFormula.descripcionOcupacion || ' ',
        genero: datosFormula.genero || false,
        pais: datosFormula.pais || false,
        ciudad: datosFormula.ciudad || false,
        direccion: datosFormula.direccion || false,
        telefono: datosFormula.telefono || false,
        nombreTutor: datosFormula.nombreTutor || ' ',
        cedulaTutor: datosFormula.cedulaTutor || ' ',
        empresaSalud: datosFormula.empresaSalud || false,
        autorizacion: datosFormula.autorizacion || ' ',
        tipoUsuario: datosFormula.tipoUsuario || ' ',
        tipoAfiliacion: datosFormula.tipoAfiliacion || ' ',
        nombreDoctor: datosFormula.nombreDoctor || false,
        apellidoDoctor: datosFormula.apellidoDoctor || false,
        especialidadDoctor: datosFormula.especialidadDoctor || false,
        profesionDoctor: datosFormula.profesionDoctor || false,
        tarjetaProfesional: datosFormula.tarjetaProfesional || false,
        medicamentos: datosFormula.medicamentos || false,
        farmaceutica: datosFormula.farmaceutica || false,
        cantidades: datosFormula.cantidades || false,
        presentaciones: datosFormula.presentaciones || false,
        descripciones: datosFormula.descripciones || false
    };

    let verificadorDatos = {};

    const validadorMedicamentos = String(DatosRenderFormula.medicamentos).split('-*-*-').length;

    if( validadorMedicamentos ==  String(DatosRenderFormula.farmaceutica).split('-*-*-').length &&
        validadorMedicamentos ==  String(DatosRenderFormula.cantidades).split('-*-*-').length &&
        validadorMedicamentos ==  String(DatosRenderFormula.presentaciones).split('-*-*-').length &&
        validadorMedicamentos ==  String(DatosRenderFormula.descripciones).split('-*-*-').length 
    ){
        for(let key in DatosRenderFormula){
            if(DatosRenderFormula[key] === false){
                verificadorDatos[key] = `Dato obligatorio no encontrado -> ${key}`;
            }
        }
    } else {
        verificadorDatos['medicamentos'] = DatosRenderFormula.medicamentos;
        verificadorDatos['farmaceutica'] = DatosRenderFormula.farmaceutica;
        verificadorDatos['cantidades'] = DatosRenderFormula.cantidades;
        verificadorDatos['presentaciones'] = DatosRenderFormula.presentaciones;
        verificadorDatos['descripciones'] = DatosRenderFormula.descripciones;
    }

    if(JSON.stringify(verificadorDatos) === '{}'){
        DatosRenderFormula.ruta = path.join(__dirname, `../docs/formula/formula-${DatosRenderFormula.cedula}-${DatosRenderFormula.id_consulta}.pdf`);
        const historiaClinica = await pool.query(`SELECT * FROM hcFile WHERE id_consulta='${DatosRenderFormula.id_consulta}'`);
        if(historiaClinica.length > 0){
            pool.query(`INSERT INTO formula SET ?`, [DatosRenderFormula], (err, result) => {
                if(err){
                    if(err.code === 'ER_DUP_ENTRY'){
                        pool.query(`UPDATE formula SET ?`, [DatosRenderFormula], (err, result) => {
                            if(err){
                                console.log('Error creando consulta medica ' + err);
                                return res.status(400).json({
                                    auth: true,
                                    formula: false,
                                    message: err
                                });
                            }
                            if(result){
                                crearPdfFormula(DatosRenderFormula, DatosRenderFormula.ruta, res);
                            }
                        })
                    } else {
                        console.log('Error creando consulta medica ' + err);
                        return res.status(400).json({
                            auth: true,
                            formula: false,
                            message: err
                        });
                    }
                }
                if(result){
                    crearPdfFormula(DatosRenderFormula, DatosRenderFormula.ruta, res);
                }
            })
        }else{
            console.log('El cliente no puede generar una formula medica por falta de historia clínica');
            return res.status(404).json({
                auth: true,
                formula: false,
                message: 'Para generar formula medica, debe tener una historia clínica previamente generada'
            })
        }
    }else{
        console.log('Faltan datos obligatorios para generar formula');
        return res.status(404).json({
            auth: true,
            message: 'Faltan datos obligatorios, descripción en DataNotFound',
            DataNotFound: verificadorDatos
        });
    }
}

module.exports = {
    crearFormula
}