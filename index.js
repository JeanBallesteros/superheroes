const mongoose = require('mongoose');
const express = require('express');
const app = express()
const routerApi = require("./src/routes");

require('dotenv').config();
const port = process.env.PORT;

app.listen(port, ()=>console.log('Active port', port));

mongoose
    .connect(process.env.MONGODB_STRING_CONNECTION)
    .then(() => console.log("Success Connection With Mongo"))
    .catch((error) => console.error(error));

/* Respuestas a solicitudes */
app.use(express.json());
/* Permitir hacer el llamado de los request */
routerApi(app);