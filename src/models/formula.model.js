const pdf = require('html-pdf');
const moment = require('moment');

//configurar moment para idioma español
moment.locale('es');

const aparienciaPdf = {
    format: 'Letter',
    border: '2cm'
};

async function crearPdfFormula(datosFormula, rutaSave, res){
    pdf.create(modelFormula(datosFormula)).toFile(rutaSave, (err, file) => {
        if(err) return res.status(400).json({auth: true, formula: false, message: err});
        console.log('Formula medica creada con satisfactoriamente');
        return res.status(201).json({auth: true, formula: true, message: 'Formula creada con satisfactoriamente'});
    });
}

function modelFormula(datosFormula){
    let prescripción = '';
    const medicamentos = String(datosFormula.medicamentos).split('-*-*-');
    medicamentos.forEach( (item, index) => {
        prescripción += `
            <table style="width: 100%; margin-top: 5px;">
                <tr style="width: 100%;">
                    <th style="30%">Medicamento</th>
                    <th style="30%">Farmacéutica</th>
                    <th style="30%">Presentación</th>
                    <th style="10%">Cantidad</th>
                </tr>
                <tr style="width: 100%;">
                    <th style="30%">${String(datosFormula.medicamentos).split('-*-*-')[index]}</th>
                    <th style="30%">${String(datosFormula.farmaceutica).split('-*-*-')[index]}</th>
                    <th style="30%">${String(datosFormula.cantidades).split('-*-*-')[index]}</th>
                    <th style="10%">${String(datosFormula.presentacion).split('-*-*-')[index]}</th>
                </tr>
            </table>
            <table style="width: 100%; margin-top: 3px;">
                <tr style="width: 100%;">
                    <th style="30%">Descripción</th>
                </tr>
                <tr style="width: 100%;">
                    <th style="30%">${String(datosFormula.descripciones).split('-*-*-')[index]}</th>
                </tr>
            </table>
        `;
    });
    const content = `
    <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Historia Clinica | Ubimed</title>
            <style>
                *{
                    font-size: .88em;
                }
                table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 2px 4px;
                    text-align: left;    
                }
            </style>
        </head>

        <body>
        <div style="width: 90%; margin: 10px auto; padding: 25px; position: relative;">
            <img src="http://app.ubimed.com.co/img/logo.png" width="100px" style="position: absolute; top: 10px; left: 10px;" alt="">
            <br>
            <h3 style="width: 100%; text-align: center;">Formula Medica</h3>
            <br>
            <table style="width: 100%; border: none !important;">
                <tr style="width: 40%; border: none !important;">
                    <th style="width: 20%; border: none !important;">No. Historia Clinica</th>
                    <th style="width: 40%;font-weight: 400; border: none !important;">${datosFormula.cedula}-${datosFormula.id_consulta}</th>
                    <th style="width: 40%;font-weight: 400; border: none !important;"><strong>Fecha: </strong>${moment().format('LL')}</th>
                </tr>
            </table>
            <h3 style="width: 100%; text-align: center; margin-top: 10px">Identificación de paciente</h3>
            <table class="mt-2" style="width: 100%; margin-top: 10px">
                <tr>
                    <th style="witdh: 20%">Paciente</th>
                    <th style="font-weight: 400;">${datosFormula.nombre} ${datosFormula.apellido}</th>
                    <th style="witdh: 20%">No. Documento:</th>
                    <th style="font-weight: 400;">${datosFormula.cedula}</th>
                </tr>
                <tr>
                    <th>Lugar Nacimiento</th>
                    <th style="font-weight: 400;">${datosFormula.lugarNacimiento}</th>
                    <th>Fecha Nacimiento</th>
                    <th style="font-weight: 400;">${moment(datosFormula.fechaNacimiento).format('LL')}</th>
                </tr>
                <tr>
                    <th>Ocupación</th>
                    <th style="font-weight: 400;">${datosFormula.ocupacion}</th>
                    <th>Genero</th>
                    <th style="font-weight: 400;">${datosFormula.genero}</th>
                </tr>
                <tr>
                    <th>Pais</th>
                    <th style="font-weight: 400;">${datosFormula.pais}</th>
                    <th>Ciudad</th>
                    <th style="font-weight: 400;">${datosFormula.ciudad}</th>
                </tr>
                <tr>
                    <th>Dirección</th>
                    <th style="font-weight: 400;">${datosFormula.direccion}</th>
                    <th>Teléfono</th>
                    <th style="font-weight: 400;">${datosFormula.telefono}</th>
                </tr>
                <tr style="width: 100%;">
                    <th>Tutor Legal: </th>
                    <th style="font-weight: 400;">${datosFormula.nombreTutor}</th>
                    <th>No. Documento:</th>
                    <th style="font-weight: 400;">${datosFormula.cedulaTutor}</th>
                </tr>
                <tr style="width: 100%;">
                    <th>Empresa</th>
                    <th style="font-weight: 400; width: 25%;">${datosFormula.empresaSalud}</th>
                    <th>No. Autorización</th>
                    <th style="font-weight: 400; width: 25%;">${datosFormula.autorizacion}</th>
                </tr>
                <tr style="width: 100%;">
                    <th>Tipo usuario</th>
                    <th style="font-weight: 400; width: 25%;">${datosFormula.tipoUsuario}</th>
                    <th>Tipo afiliación</th>
                    <th style="font-weight: 400; width: 25%;">${datosFormula.tipoAfiliacion}</th>
                </tr>
            </table>
            <h3 style="width: 100%; text-align: center; margin: 3px 0px;">Medicamentos</h3>
            ${ prescripción }
            <table class="mt-2" style="margin-top: 10px">
                <tr>
                    <th>${datosFormula.nombreDoctor} ${datosFormula.apellidoDoctor}</th>
                </tr>
                <tr>
                    <th>Numero Prof.</th>
                    <th style="font-weight: 400;">${datosFormula.tarjetaProfesional}</th>
                </tr>
                <tr>
                    <th>Especialización:</th>
                    <th style="font-weight: 400;">${datosFormula.especialidadDoctor}</th>
                </tr>
            </table>
        </div>
        <small>Firmado digitalmente por ${datosFormula.nombreDoctor} ${datosFormula.apellidoDoctor}.</small>

        <div style="font-size: .7em; position: absolute; bottom: 30px; right: 30px; text-align: right;">
            <p style="margin: 0px;">Clinica Oftalmologica Unigarro</p>
            <p style="margin: 0px;">Cra. 26 # 15-62 CC Zaguan del lago 4to piso.</p>
            <p style="margin: 0px;">Pasto, Nariño</p>
            <p style="margin: 0px;">PBX: (57)(2)7244427</p>
        </div>
        </body>

        </html>
    `;
    return content;
}

module.exports = {
    crearPdfFormula
}