const pdf = require('html-pdf');
const moment = require('moment');

//configurar moment para idioma español
moment.locale('es');

const aparienciaPdf = {
    format: 'Letter',
    border: '2cm'
};

function CrearPdfConsentimiento(DatosCreatePdf, rutaSave, res){
    pdf.create(DinamizarConsentimiento(DatosCreatePdf), aparienciaPdf).toFile(rutaSave, (err) => {
        if(err) return res.status(400).json({auth: true, firma: false, message: err});
        return res.status(201).json({auth: true, firma: true, message: 'Documento Pdf de consentimiento informado creado y firmado con éxito'});
    });
}

function DinamizarConsentimiento(DatosConsentimiento){
    const consentimientoHTML = `
    <!DOCTYPE html>
    <html lang="es">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Consentimiento Informado | Paciente</title>
    </head>
    
    <body style="font-size: .8em;">
        <h1 style="text-align: center; margin: 10px auto;">Consentimiento Informado</h1>
        <br>
        <br>
        <small>
            Fecha: Dia ${ moment().format('LLLL') }
        </small>
        <br>
        <br>
        <p style="text-align: justify;">
            Yo, ${DatosConsentimiento.nombrePaciente} ${DatosConsentimiento.apellidoPaciente}, Identificado con ${DatosConsentimiento.tipoDocPaciente} No,
            ${DatosConsentimiento.cedulaPaciente}, en
            pleno uso de mis facultades mentales, otorgo de forma libre mi consentimiento al profesiónal en ${DatosConsentimiento.profesionDoctor} y
            con especialización en ${DatosConsentimiento.especializacionDoctor}, nombre ${DatosConsentimiento.nombreDoctor} ${DatosConsentimiento.apellidoDoctor}, con numero de tarjeta profesional:
            ${DatosConsentimiento.numeroTarjetaProfesionalDoctor} para realizar la
            videoconsulta en modalidad de Telemedicina interactiva/Teleapoyo ó Teleorientación, mediante el
            uso de una aplicación web llamada Ubimed, siguiendo con los lineamientos de Historia clínica
            dados en la resolución 1995 de 1999 y el manual de habilitación resolución 3100 de 2019, para tal
            fin acepto que se me ha informado el link de acceso a la plataforma a través del correo
            electrónico, vía WhatsApp, mensaje de texto ó llamada telefónica para registrar mis datos y recibir
            la atención.
        </p>
        <p style="text-align: justify;">
            Declaro que se me ha informado que para acceder al servicio de videoconsulta en modalidad de
            telemedicina es necesario la comunicación a través de las tecnologías de información y
            comunicación (TIC), lo cual significa el uso de equipos que permitan la telecomunicación de forma
            sincrónica o tiempo real, a través de internet y de equipos de audio y video como el celular o el
            computador, permitiendo la interacción bidireccional entre el profesional de la salud y el paciente.
            Acepto y entiendo que la telemedicina es una modalidad de atención por medio de la cual se
            permite la comunicación entre el paciente y los proveedores de servicios de salud previamente
            habilitados por un ente territorial y registrados ante el REPS (registro especial de prestadores de
            servicios )
        </p>
        <p style="text-align: justify;">
            Declaro que se me ha informado, que la videoconsulta se realizara de manera habitual, como
            ocurre en cualquier interacción, entrevista o consulta presencial, entre un paciente y un
            profesional de la salud. Acepto que el concepto, comentario o sugerencia será emitido en la
            distancia a través de la plataforma Ubimed, y que estos serán transmitidos por medios
            electrónicos (En formatos de texto, audio, videos) y pasarán a formar parte de mi historia Clínica.
        </p>
        <p style="text-align: justify;">
            Comprendo y acepto que hago uso de la videoconsulta en modalidad de telemedicina como parte
            del diagnóstico, plan o tratamiento médico recibido, declaro que me han informado que esta
            videoconsulta será grabada por la plataforma Ubimed y pasara a ser parte integral de la
            historia clínica o de su expediente médico y que esta no reemplaza la consulta presencial dentro
            de un consultorio o institución habilitado y registrado ante el REPS (Registro Especial de
            Prestadores de Servicios), y que por tanto pueden existir limitantes al momento de dar una
            impresión diagnostica por parte del profesional de la salud y este podrá generar una remisión o
            derivación para una consulta presencial y/o apoyo diagnóstico.
        </p>
        <p style="text-align: justify;">
            Declaro que se me ha informado que al igual que con cualquier procedimiento médico, hay
            beneficios esperados y riesgos potenciales asociados con el uso de la modalidad de Telemedicina;
            entre los beneficios están:
        </p>
        <p style="text-align: justify;">
        <ul>
            <li>
                a) Mejorar del acceso, oportunidad, continuidad, cobertura y calidad de la atención.
            </li>
            <li>
                b) Minimizar los desplazamientos innecesarios de los pacientes.
            </li>
            <li>
                c) Facilita la lectura de resultados complementarios (análisis de laboratorio, estudio de imágenes
                médicas, etc).
            </li>
            <li>
                d) Cumplimiento de las medidas de aislamiento preventivo establecidas por el gobierno nacional
                declarado por el COVID-19
            </li>
            <li>
                e) Implementación de medidas de prevención y minimización del riesgo de contagio.
            </li>
            <li>
                f) Disminución del tiempo de contacto personal.
            </li>
        </ul>
        Entre los posibles riesgos están:
        <ul>
            <li>
                a) A pesar de los protocolos y estándares de informática medica implementados para garantizar la
                confidencialidad, seguridad e integralidad de la información médica, esta podría verse alterada o
                distorsionada por fallas técnicas que podrían ocasionar problemas en el momento de emitir un
                concepto, comentario y/o observación en la videoconsulta.
            </li>
            <li>
                b) La transmisión de mi información médica, así como el servidor donde se custodia la Historia
                clínica podría ser víctima de un ataque cibernético o interrumpida por un tercero sin autorización,
                los protocolos pueden fallar lo que provocaría una violación de la privacidad de la información
                médica.
            </li>
            <li>
                c) En algunos casos la información transmitida o suministrada en el momento de la videoconsulta
                puede ser insuficiente (ejemplo: mala resolución en la imagen o ausencia de estas) para la toma de
                decisiones apropiadas por parte del profesional de la salud.
            </li>
            <li>
                d) En algunos casos la falta de información médica completa y/o precisa puede ocasionar
                reacciones adversas a medicamentos, reacciones alérgicas u otros errores de juicio.
            </li>
            <li>
                e) Habrá diagnósticos de certeza, pero algunos serán presuntivos y se deberá hacer un seguimiento
                con nuevas videoconsulta o derivar en una consulta presencial tradicional.
            </li>
            <li>
                f) Posibilidad de cometer errores de digitación al escribir en el teclado y verificar que el corrector
                de texto no cambie nuestras palabras.
            </li>
        </ul>
        </p>
        <p style="text-align: justify;">
            Declaro que me han informado las responsabilidades del profesional de la salud, las cuales son:
        </p>
        <p style="text-align: justify;">
        <ul>
            <li>
                a) Brindar la orientación, asesoría o consejería en el marco del modelo de atención
                telemedicina/telesalud de acuerdo con la información que sea brindada por el paciente o usuario,
                y, con base en ello definir el manejo médico indicado.
            </li>
            <li>
                b) En caso de considerarlo necesario el profesional de la salud puede cancelar o abstenerse de
                realizar la atención justificando las razones de su decisión las cuales serán oportunamente
                informadas al paciente o usuario.
            </li>
        </ul>
        </p>
        <p style="text-align: justify;">
            Entiendo y acepto mis responsabilidades como paciente al momento de tomar una videoconsulta
            en modalidad de Telemedicina/telesalud entre las cuales están:
        </p>
        <p style="text-align: justify;">
        <ul>
            <li>
                a) Atender la videoconsulta en la hora y por la vía definida por el profesional de la salud.
            </li>
            <li>
                b) Brindar información completa, precisa y suficiente con el propósito de suministrar al profesional
                los datos clínicos y la información relevante y necesaria para ajustar la indicación u orientaciones a
                su condición clínica particular.
            </li>
            <li>
                c) Atender las recomendaciones brindadas por el profesional de la salud y adherir a los planes de
                tratamiento que se hayan fijado.
            </li>
            <li>
                d) Informar oportunamente la imposibilidad de conectarse o vincularse a la cita para la orientación
                programada.
            </li>
            <li>
                e) Tener disponibilidad de los medios tecnológicos necesarios para llevar a cabo la atención en
                modalidad de Telemedicina/telesalud
            </li>
            <li>
                f) Solicitar la cita prioritaria o acudir a los servicios de urgencia en caso de presentarse signos de
                alarma identificados por el profesional de la salud.
            </li>
        </ul>
        </p>
        <p style="text-align: justify;">
            Entiendo que tengo el derecho de negar mi consentimiento informado para la prestación del
            servicio por videoconsulta en modalidad de telemedicina y que esto no afectara mi derecho
            constitucional de recibir servicios de salud en una modalidad de atención diferente.
            Entiendo y acepto los beneficios de la videoconsulta en modalidad de telemedicina sin embargo no
            se puede garantizar ni asegurar los resultados
        </p>
        <p style="text-align: justify;">
            Se me ha informado que la plataforma Ubimed garantiza la privacidad de los datos como lo
            contempla la ley 1581 del 2012, es decir que no se compartirá el nombre, identificación,
            dirección, correo electrónico, ni cualquier otra información del usuario sin su previa autorización.
            Así mismo manifiesto que me han sido explicados los derechos que me asisten como titular de los
            datos personales, en especial los relacionados con conocer, actualizar y rectificar los datos
            personales, solicitar prueba de la autorización otorgada para su tratamiento, ser informado, previa
            solicitud, del uso que se les ha dado a los datos, revocar la autorización y los demás derechos
            consagrados en el artículo 8 de la ley 1581 de 2012.
        </p>
        <p style="text-align: justify;">
            La plataforma garantiza la confidencialidad, integridad, autenticidad y veracidad de la
            información a través de la implementación de estándares y protocolos de seguridad informática
            nacionales e internacional como son la ley HIPPA y la ley 2015 del 2020, respetando el habeas data
            y la reserva de la información. Sin embargo, existen excepciones, ya que todos los proveedores de
            servicios de salud registrados ante el REPS en la Republica de Colombia, están obligados a reportar,
            denuncia de abuso infantil, de personas de la tercera edad y de población vulnerable, entre otras.
        </p>
        <p style="text-align: justify;">
            Autorizo a mi médico para que comunique a los médicos especialistas cualquier información sobre
            mi salud en formatos de texto, audio, video e imágenes, incluyendo antecedentes, síntomas y
            signos actuales, así como datos de laboratorio, que crea necesarios para permitirles que le asistan
            en este procedimiento. Además, autorizo a los médicos y demás profesionales de la salud que
            participen como especialistas para que tengan acceso a mi expediente o historia clínica si fuera
            necesario para ayudarles a proporcionar servicios de asistencia a mi médico(a) en esta consulta
            mediante la modalidad de Telemedicina.
        </p>
        <p style="text-align: justify;">
            Declaro que se me ha informado que al realizar el registro de mis datos personales en la
            plataforma Ubimed se implementara mi firma digital y acepto que se me ha informado que mi
            firma digital es un valor numérico que se adhiere a un mensaje de datos que permite determinar
            que se ha obtenido exclusivamente por mí al momento de ingresar a la plataforma Ubimed,
            que esta no se pude modificar después de efectuada la videoconsulta, tal como lo indica la
            resolución 2654 del 2019 en su numeral 4.7.
        </p>
        <p style="text-align: justify;">
            Certifico que el presente documento ha sido leído y entendido por mí en su integridad y que he
            tenido la oportunidad de recibir explicaciones satisfactorias por parte del profesional de la salud
            con respecto a los beneficios y los riesgos derivados de la atención por videollamada.
        </p>
        <p style="text-align: justify;">
            Dado el artículo 7 de la resolución 2654 del 2019, se me ha informado que para efectos de
            aceptación del consentimiento informado en la plataforma de Ubimed, se está haciendo uso de
            mi firma digital implementada por la plataforma, para garantizar la idoneidad, autenticidad e
            integridad de este documento.
        </p>
        <p style="text-align: justify;">
            NOTA: Cuando el paciente no tenga capacidad para otorgar el consentimiento, las manifestaciones
            del contenido en el presente documento las podrá aceptar su tutor legar o cuidador.
        </p>
        <br>
        <div>
            <p style="margin: 0px; font-size: 1.2em;">
                ${DatosConsentimiento.nombrePaciente} ${DatosConsentimiento.apellidoPaciente}
            </p>
            <p style="margin: 0px; font-size: 1em;">
                ${DatosConsentimiento.tipoDocPaciente}: ${DatosConsentimiento.cedulaPaciente}
            </p>
        </div>
        <br>
        <p style="text-decoration: underline">
            Firmado digitalmente por: ${DatosConsentimiento.nombrePaciente} ${DatosConsentimiento.apellidoPaciente} ,By Tech Ubimed
        </p>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <h1 style="text-align: center;">
            Autorización para el tratamiento de datos personales.
        </h1>
        <p style="text-align: justify">
            Que en el marco de la atención no presencial serán almacenados sus datos personales con el fin de garantizar la
            oportunidad, pertinencia y calidad de la atención en salud brindada.
        </p>
        <p style="text-align: justify">
            En atención a que en el marco de la atención brindada se pueden recoger datos sensibles por tratarse de datos
            relativos a la salud, puede abstenerse de brindar la información solicitada.
        </p>
        <p style="text-align: justify">
            Como responsable de la información personal de los usuarios, se tratarán los datos personales conforme a las
            finalidades autorizadas y según lo señalado en la política de tratamiento de datos personales, que se encuentra
            disponible en el siguiente enlace: www.clinicaoftalmologicaunigarro.com.
        </p>
        <p style="text-align: justify">
            Así mismo manifiesto que me han sido explicados los derechos que me asisten como titular de los datos
            personales, en especial los relacionados con conocer, actualizar y rectificar los datos personales, solicitar
            prueba de la autorización otorgada para su tratamiento, ser informado, previa solicitud, del uso que se les ha
            dado a los datos, revocar la autorización y los demás derechos consagrados en el artículo 8 de la ley 1581 de
            2012.
        </p>
        <p style="text-align: justify">
            Así mismo, se han implementado mecanismos para asegurar la confidencialidad y reserva de la historia clínica de
            conformidad con lo dispuesto en la Resolución 1995 de 1999 y normas concordantes, y en general para el
            tratamiento de datos de salud considerados como información sensible.
            Finalmente, manifiesto que otorgó autorización al Dr. ${DatosConsentimiento.nombreDoctor} ${DatosConsentimiento.apellidoDoctor} para el tratamiento de mis datos
            personales en el marco de las finalidades previstas en la presente autorización.
            El responsable de los datos personales será la Clínica Oftalmológica Unigarro domiciliado en la ciudad de
            Pasto(N). El correo electrónico es clinicaoftalunigarro@hotmail.com y el número telefónico de contacto es
            (+57)(2)7244427
        </p>
        <br>
        <div>
            <p style="margin: 0px; font-size: 1.2em;">
                ${DatosConsentimiento.nombrePaciente} ${DatosConsentimiento.apellidoPaciente}
            </p>
            <p style="margin: 0px; font-size: 1em;">
                ${DatosConsentimiento.tipoDocPaciente}: ${DatosConsentimiento.cedulaPaciente}
            </p>
        </div>
        <br>
        <p style="text-decoration: underline">
            Firmado digitalmente por: ${DatosConsentimiento.nombrePaciente} ${DatosConsentimiento.apellidoPaciente} ,By Tech Ubimed
        </p>
    </body>
    
    </html>
    `;
    return consentimientoHTML;
}

module.exports = {
    CrearPdfConsentimiento
}