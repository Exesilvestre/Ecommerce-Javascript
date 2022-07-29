class Producto {
    constructor (cantidad, nombre, precio, tamaño, subtotalCompras){
        this.cantidad = parseInt(cantidad)
        this.nombre = nombre
        this.precio = parseFloat(precio)
        this.tamaño = tamaño
        this.subtotal = subtotalCompras
    }
}