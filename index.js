/* const mongoose = require('mongoose');
const express = require('express');
const sgMail = require('@sendgrid/mail')
const {logErrors, errorHandler, boomErrorHandler} = require('./src/handlers/errors.handler')
const app = express()
const routerApi = require("./src/routes");

require('dotenv').config();
const port = process.env.PORT;

app.listen(port, ()=>console.log('Active port', port));

mongoose
    .connect(process.env.MONGODB_STRING_CONNECTION)
    .then(() => console.log("Success Connection With Mongo"))
    .catch((error) => console.error(error));

//TWILIO
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'balles970412@gmail.com', // Change to your recipient
  from: 'jeanc.ballesterosz@autonoma.edu.co', // Change to your verified sender
  subject: 'Prueba Twilio Ing Software II',
  html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div class="row">
      <div class="col">
        <h3>Pruieba SendGrid</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        Información productos
        <table>
          <thead>
            <tr>
                <th>Name</th>
                <th>Item Name</th>
                <th>Item Price</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Alvin</td>
              <td>Eclair</td>
              <td>$0.87</td>
            </tr>
            <tr>
              <td>Alan</td>
              <td>Jellybean</td>
              <td>$3.76</td>
            </tr>
            <tr>
              <td>Jonathan</td>
              <td>Lollipop</td>
              <td>$7.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
  </html>`,
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })

client.messages
  .create({
      body: 'Prueba Twilio. Grupo Ing Software II',
      from: '+19478889422',
      to: '+573115660650'
    })
  .then(message => console.log(message.sid));



//Respuestas a solicitudes
app.use(express.json());
app.use(logErrors)
app.use(errorHandler)
app.use(boomErrorHandler)

//Permitir hacer el llamado de los request
routerApi(app); */


require('dotenv').config()

//Configurar listening del puerto para ver el proyecto en un navegador
const express = require('express')
const port = 3000 || process.env.port

//Librerías de sendgrid para envío de correos electrónicos
const email = require('./mail')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//Librerías de Twilio para mensajes de texto
const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

//Para realizar pruebas con postman
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Creación de la ruta del proyecto
//http://localhost:3000/
app.get('/',(req,res)=>{
  res.json({message:'Success'})
})

//Para poder ver la ruta en el navegador, se activa el listen()
app.listen(port,()=>{
  console.log(`Accede al sitio web dando clic aquí: http://localhost:${port}`)
})

app.post('/api/email/confirmacion', async(req,res,next)=>{
  //Llamamos función que estará en la clase mail.js y que require de unos parámetros que ingresan por Postman
  try{
    res.json(await email.sendOrder(req.body))
  }catch(err){
    next(err)
  }
})

//Validar el código que nos devuelve la ejecución del código, en caso de error mostrar todo el contenido del error
app.use((err,req,res,next)=>{

  const statusCode = err.statusCode || 500
  console.error(err.message, err.stack)
  res.status(statusCode).json({'message': error.message})
  return
})

function getMessage(){
  const body = 'Mensaje enviado el 04/08/2022 04:16 p.m.'
  return{
    to: 'balles970412@gmail.com',
    from: 'jeanc.ballesterosz@autonoma.edu.co',
    subject: 'Prueba SendGrid',
    text: body,
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div class="container section">
        <label for=""><strong>Paisaje</strong></label>
        <img src="https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg" width="400px">
      </div>
    </body>
    </html>`
  }
}

async function sendEmail() {
  try{
    await sgMail.send(getMessage())
    console.log('Correo ha sido enviado')
  }catch(err){
    console.error('No se pudo enviar el mensaje')
    console.error(err)
    if(err.response) console.error(err.response.body)
  }
}

(async()=>{
  console.log('Enviando correo electrónico')
  await sendEmail()
})