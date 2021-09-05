const express = require("express");
const dotenv = require('dotenv');
const db = require('./db/db');
const midd = require('./middlewares/midd');

const app = express();

dotenv.config();

//Configuramos JSON como lenguaje de comunicación

app.use(express.json());

app.use(midd.log);

app.listen(process.env.PORT, function () {
    console.log(`Servidor iniciado en http://${process.env.HOST}:${process.env.PORT}`)
});

app.get('/', function (req, res) {
    db.respuesta.mensaje = "Inicio";
    res.send(db.respuesta);
})

//Endpoint para obtener productos de la DB
app.get('/productos', function (req, res) {
    res.send(db.Productos)
})

app.post('/prpductos',midd.Autenticar, function (req, res) {
    if (!req.body.nombre || !req.body.codigo) {
        db.respuesta = {
            codigo: 502,
            error: true,
            mensaje: 'Es indispensable enviar nombre y código del producto'
        }
    } else {
        if (db.buscaProducto(req.body.nombre)) {
            db.respuesta = {
                codigo: 503,
                error: true,
                mensaje: 'Producto registrado'
            }
        } else {
            db.nuevoProducto(req.body.nombre, req.body.codigo)

            db.respuesta = {
                codigo: 200,
                error: false,
                mensaje: '¨Producto creado'
            }
        }
    }
    res.send(db.respuesta)
})

app.delete('/productos/:producto', function (req, res) {

    if (!db.buscaProducto(req.params.producto)) {
        db.respuesta = {
            codigo: 500,
            error: true,
            mensaje: req.params.producto
        }
    } else {
        db.borraProducto(req.params.producto)
        db.respuesta = {
            codigo: 200,
            error: false,
            mensaje: '¨Producto eliminado'
        }
    }
    res.send(db.respuesta);
})
