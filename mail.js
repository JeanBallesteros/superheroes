const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmailConfirmationHTML(customerName, orderNro) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div class="container section">
      <label for="">Paisaje</label>
      <img src="https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg" alt="">
      <img src="https://static1.diariosur.es/www/multimedia/201909/30/media/cortadas/imagensensible-kYzD-U90285421336FWD-624x385@Diario%20Sur.jpg" alt="">
    </div>
  </body>
  </html>`
}

function getMessage(emailParams) {
  return{
    to: emailParams.toEmail, // Change to your recipient
    from: 'jeanc.ballesterosz@autonoma.edu.co', // Change to your verified sender
    subject: 'Confirmación orden de compra Black Friday',
    text: `Hola ${emailParams.customerName}, te enviamos las emágenes de los productos comprados y la factura con número ${emailParams.orderNro}. Gracias por tu compra`,
    html: sendEmailConfirmationHTML(emailParams.customerName, emailParams.orderNro)
  }
}

async function sendOrder(emailParams) {
  try{
    await sgMail.send(getMessage(emailParams))
    return {message: 'Confirmación de compra enviada'}
  }catch(err){
    const message = 'No se pudo enviar la orden de compra. Valide los errores'
    console.error(message)
    console.error(err)
    if(err.response) console.error(err.response.body)
    return {message}
  }
}

module.exports={
  sendOrder
}