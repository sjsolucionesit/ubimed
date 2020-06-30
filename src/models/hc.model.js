const pdf = require('html-pdf');
const moment = require('moment');

//configurar moment para idioma español
moment.locale('es');

const aparienciaPdf = {
    format: 'Letter',
    border: '2cm'
};

async function createHc(datos, rutaSave, res){
    pdf.create(hcModel(datos), aparienciaPdf).toFile(rutaSave, (err) => {
        if(err){
            return res.status(400).json({
                auth: true,
                hc: false,
                message: err
            });
        }
        return res.status(201).json({
            auth: true,
            hc: true,
            message: 'Historia Clínica Actualizada'
        });
    });
}

function hcModel(datos){
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
            <h3 style="width: 100%; text-align: center;">Historia Videoconsulta</h3>
            <br>
            <table style="width: 100%; border: none !important;">
                <tr style="width: 40%; border: none !important;">
                    <th style="width: 20%; border: none !important;">No. Historia Clinica</th>
                    <th style="width: 40%;font-weight: 400; border: none !important;">${datos.cedula}-${datos.id_consulta}</th>
                    <th style="width: 40%;font-weight: 400; border: none !important;"><strong>Fecha: </strong>${moment().format('LL')}</th>
                </tr>
            </table>
            <h3 style="width: 100%; text-align: center; margin-top: 10px">Identificación de paciente</h3>
            <table class="mt-2" style="width: 100%; margin-top: 10px">
                <tr>
                    <th style="witdh: 20%">Paciente</th>
                    <th style="font-weight: 400;">${datos.nombre} ${datos.apellido}</th>
                    <th style="witdh: 20%">No. Documento:</th>
                    <th style="font-weight: 400;">${datos.cedula}</th>
                </tr>
                <tr>
                    <th>Lugar Nacimiento</th>
                    <th style="font-weight: 400;">${datos.lugarNacimiento}</th>
                    <th>Fecha Nacimiento</th>
                    <th style="font-weight: 400;">${moment(datos.fechaNacimiento).format('LL')}</th>
                </tr>
                <tr>
                    <th>Ocupación</th>
                    <th style="font-weight: 400;">${datos.ocupacion}</th>
                    <th>Genero</th>
                    <th style="font-weight: 400;">${datos.genero}</th>
                </tr>
                <tr>
                    <th>Pais</th>
                    <th style="font-weight: 400;">${datos.pais}</th>
                    <th>Ciudad</th>
                    <th style="font-weight: 400;">${datos.ciudad}</th>
                </tr>
                <tr>
                    <th>Dirección</th>
                    <th style="font-weight: 400;">${datos.direccion}</th>
                    <th>Teléfono</th>
                    <th style="font-weight: 400;">${datos.telefono}</th>
                </tr>
                <tr style="width: 100%;">
                    <th>Tutor Legal: </th>
                    <th style="font-weight: 400;">${datos.nombreTutor}</th>
                    <th>No. Documento:</th>
                    <th style="font-weight: 400;">${datos.cedulaTutor}</th>
                </tr>
                <tr style="width: 100%;">
                    <th>Empresa</th>
                    <th style="font-weight: 400; width: 25%;">${datos.empresaSalud}</th>
                    <th>No. Autorización</th>
                    <th style="font-weight: 400; width: 25%;">${datos.autorizacion}</th>
                </tr>
                <tr style="width: 100%;">
                    <th>Tipo usuario</th>
                    <th style="font-weight: 400; width: 25%;">${datos.tipoUsuario}</th>
                    <th>Tipo afiliación</th>
                    <th style="font-weight: 400; width: 25%;">${datos.tipoAfiliacion}</th>
                </tr>
            </table>
            <h4 style="width: 100%; text-align: center; margin: 10px auto;">Anamnesis</h4>
            <table style="width: 100%;">
                <tr>
                    <th style="width: 20%;">Motivo consulta</th>
                    <th style="font-weight: 400;">${datos.motivoConsulta}</th>
                </tr>
                <tr>
                    <th>Enfermedad actual</th>
                    <th style="font-weight: 400;">${datos.enfermedadActual}</th>
                </tr>
            </table>
            <table class="mt-2" style="width: 100%; margin-top: 10px">
                <tr>
                    <th style="text-align: letf;">Antecedentes alergicos</th>
                </tr>
                <tr style="height: 20px; vertical-align: top;">        
                    <th style="font-weight: 400;">${datos.antecedentesAlergicos}</th>
                </tr>
            </table>
            <table style="width: 100%; margin-top: 5px;">
                <tr>
                    <th style="text-align: left;">Antecedentes (Farmacológicos, Quirúrgicos, Familiares, Otros)</th>
                </tr>
                <tr style="height: 20px; vertical-align: top;">        
                    <th style="font-weight: 400;">${datos.otrosAntecedentes}</th>
                </tr>
            </table>
            <table class="mt-2" style="width: 100%; margin-top: 10px">
                <tr>
                    <th style="text-align: center;">Hallazgos</th>
                </tr>
                <tr style="height: 30px; vertical-align: top;">
                    <th style="font-weight: 400;">${datos.hallazgos}</th>
                </tr>
            </table>
            <table class="mt-2" style="width: 100%; margin-top: 10px">
                <tr>
                    <th style="width: 23%; vertical-align: top;">Evaluación paraclinicos:</th>
                    <th style="font-weight: 400; height: 30px; vertical-align: top;">${datos.paraclinicos}</th>
                </tr>
            </table>
            <table class="mt-2" style="width: 100%; margin-top: 10px">
                <tr>
                    <th style="width: 23%; vertical-align: top; vertical-align: top;">Diagnostico Cie10</th>
                    <th style="font-weight: 400; height: 10px; vertical-align: top;">${datos.cie10}</th>
                </tr>
                <tr>
                    <th style="width: 23%; vertical-align: top;">Diagnostico clínico</th>
                    <th style="font-weight: 400; height: 10px; vertical-align: top;">${datos.diagnostico}</th>
                </tr>
            </table>
            <table class="mt-2" style="width: 100%; margin-top: 10px">
                <tr>
                    <th style="width: 23%; vertical-align: top; text-align: center;">Recomendación y plan:</th>
                </tr>
                <tr style="width: 100%;">
                    <th style="font-weight: 400; height: 40px; vertical-align: top;">${datos.plan}</th>
                </tr>
            </table>
            <table class="mt-2" style="margin-top: 10px">
                <tr>
                    <th>${datos.nombreDoctor} ${datos.apellidoDoctor}</th>
                </tr>
                <tr>
                    <th>Numero Prof.</th>
                    <th style="font-weight: 400;">${datos.tarjetaProfesional}</th>
                </tr>
                <tr>
                    <th>Especialización:</th>
                    <th style="font-weight: 400;">${datos.especialidadDoctor}</th>
                </tr>
            </table>
        </div>
        <small>Firmado digitalmente por ${datos.nombreDoctor} ${datos.apellidoDoctor}.</small>

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
    createHc
}