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