const express = require("express");
const app = express();
require('dotenv').config();
const db = require('./db/db');
//Configuramos JSON como lenguaje de comunicación
app.use(express.json());

app.listen(process.env.PORT, function () {
    console.log(`Servidor iniciado en http://${process.env.HOST}:${process.env.PORT}`)
});