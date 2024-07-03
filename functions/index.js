const functions = require("firebase-functions");
const cors = require("cors");
const nodeMailer = require("nodemailer");
var express = require("express");
var app = express();
app.use(cors({ origin: true }));

/* Test del backend */
app.get("/", (req, res) => {
  console.log("si funciona");
  return res.json({ ok: "ok" });
});

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

app.post("/sendRegisterMail", async (req, res) => {
  var body = req.body;
  if (
    body.name == null ||
    body.name == "" ||
    body.name == undefined ||
    body.name.length > 100 ||
    body.name.length < 2
  ) {
    return res.status(500).json({
      sucess: false,
      err: "Ocurrió un problema con el campo name.",
    });
  }
  //Validar el campo lastName
  /* if (
    body.lastName == null ||
    body.lastName == "" ||
    body.lastName == undefined ||
    body.lastName.length > 100 ||
    body.lastName.length < 2
  ) {
    return res.status(500).json({
      sucess: false,
      err: "Ocurrió un problema con el campo lastName.",
    });
  } */

  //Validar el campo email
  if (
    body.email == null ||
    body.email == "" ||
    body.email == undefined ||
    body.email.length > 100 ||
    body.email.length < 2
  ) {
    return res.status(500).json({
      err: "Ocurrió un problema con el campo email.",
    });
  }

  //Validar el campo company
  if (
    body.company == null ||
    body.company == "" ||
    body.company == undefined ||
    body.company.length > 100 ||
    body.company.length < 2
  ) {
    return res.status(500).json({
      sucess: false,
      err: "Ocurrió un problema con el campo company.",
    });
  }

   //Validar el campo phoneNumber
   if (
    body.phoneNumber == null ||
    body.phoneNumber == "" ||
    body.phoneNumber == undefined ||
    body.phoneNumber.length > 100 ||
    body.phoneNumber.length < 2
  ) {
    return res.status(500).json({
      sucess: false,
      err: "Ocurrió un problema con el campo phoneNumber.",
    });
  }

  //Enviar mail
  try {
    var transporter = await setTransporter();
    var statusEnvio = await transporter.sendMail({
      from: "Grupo Sonríe <noreply@gruposonrie.com>",
      to: "italianomariano198@gmail.com",  //Aqui va el email que va a llegar toda la info
      subject: "Nueva peticion de registro",
      text: "texto del cuerpo del email plano",
      html: `<strong>Nombre:</strong> ${req.body.name}<br> <strong>Email: ${req.body.email}</strong> <br> <strong>Compañia: <strong/>${req.body.company} <br> <strong>Teléfono: <strong/>${req.body.phoneNumber} `,
    });
    //Verificar si se envio el correo
    if (statusEnvio.rejected.length > 0) {
      return res.status(500).json({
        sucess: false,
        err: "Ocurrió un problema el enviar el correo. V-55",
      });
    }
    return res.json({
      success: true,
      msg: "Mensaje enviado con exito",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      err: "Ocurrió un problema el enviar el correo. V-66",
    });
  }
});

//Funcion que envia el mail para recuperar la contraseña
app.post('/sendRecoverPassword', async (req, res) => {
  var body = req.body
  //Validar el campo email
  if(body.email == null || body.email == '' || body.email == undefined || body.email.length > 100 || body.email.length < 2) {
    return res.status(500).json({
      err: 'Ocurrió un problema con el campo email.'
    })
  }

  //Enviar mail
  try {
    var transporter = await setTransporter();
    var statusEnvio = await transporter.sendMail({
      from: "Grupo Sonríe <noreply@gruposonrie.com>",
      to: "italianomariano198@gmail.com",  //Aqui va el email que va a llegar toda la info
      subject: "Nueva peticion de recuperación de contraseña",
      text: "texto del cuerpo del email plano",
      html: `<strong>Email: ${req.body.email}</strong> ha solicitado recuperar su contraseña`,
    });
    //Verificar si se envio el correo
    if (statusEnvio.rejected.length > 0) {
      return res.status(500).json({
        sucess: false,
        err: "Ocurrió un problema el enviar el correo. V-55",
      });
    }
    return res.json({
      success: true,
      msg: "Mensaje enviado con exito",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      err: "Ocurrió un problema el enviar el correo. V-66",
    });
  }
})

//Funcion para crear el transporter
async function setTransporter() {
  try {
    let transporter = nodeMailer.createTransport({
      host: "c1971935.ferozo.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@gruposonrie.com",
        pass: "sonrisaDe10@",
      },
      from: "Grupo Sonríe <noreply@gruposonrie.com>",
    });
    return transporter;
  } catch (error) {}
}

exports.api = functions.https.onRequest(app);
