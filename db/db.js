let Productos = {};
let Id = {
    cont: 0
}

let respuesta = {
    codigo: 200,
    error: false,
    mensaje:''
}

class Producto {
    constructor(nombre,codigo_producto){
        this.nombre = nombre
        this.codigo_producto = codigo_producto
        this.Id = Id.cont
    }
}

const nuevoProducto = function(nombre, codigo_producto){
    Productos[nombre] = new Producto(nombre,codigo_producto);
    Id.cont++
}

const buscaProducto = function (nombre) {
    if(Productos.hasOwnProperty(nombre)){
        return true;
    }else{
        return false;
    } 
}

const borraProducto = function (nombre) {
    delete Productos[nombre]
}

module.exports = {Productos,respuesta,nuevoProducto,buscaProducto,borraProducto}