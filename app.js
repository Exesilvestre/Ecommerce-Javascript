let carrito;
let total = 0;

let aux = localStorage.getItem('carrito')

if(!aux){
    carrito = []
}else{
    carrito = JSON.parse(aux);
    listarEnCarro()
}

function agregarAlCarrito(objetoProd){

    carrito.push(objetoProd)
    localStorage.setItem('carrito', JSON.stringify(carrito));
    listarEnCarro()  
}

function iniciarProductos() {
  let aux = "";
  productos.map(producto => {
    aux += `
    <div class="product-box">
        <img src="${producto.img}" class="product-img" alt="">
        <h2 class="product-title">${producto.nombre}</h2>
        <span class="price">${producto.precio}</span>
        <i onclick="agregarAlCarrito({id: ${producto.id}, nombre: '${producto.nombre}', img: '${producto.img}', precio: ${producto.precio}})" class='bx bxs-cart-add add-cart' ></i>
    </div>
    `;
  })
  document.getElementById("shop-content").innerHTML = aux;
}
iniciarProductos();


function listarEnCarro(){
  let aux2 = "";
  carrito.map(prod => {
    aux2 += `
    <div class="cart-box">
        <img src="${prod.img}" alt="" class="cart-img">
        <div class="detail-box">
        <div class="cart-product-title">${prod.nombre}</div>
        <div class="cart-price">${prod.precio}</div>
            <input onchange="actualizarTotal()" type="number" value="1" class="cart-quantity" id="cart-quantity">
        </div>
        <i onclick="eliminarDelCarrito(${prod.id})" class="bx bxs-trash-alt cart-remove"></i>
    </div>
    `;
  })
  document.getElementById("cart-content").innerHTML = aux2;
  actualizarTotal()
}

function eliminarDelCarrito(prodId){
  const indice = carrito.filter((item) => item.id != prodId);
  carrito.splice(indice, 1);

  localStorage.setItem('carrito', JSON.stringify(carrito));
  listarEnCarro();
}

//carrito mostrar
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

cartIcon.onclick = () =>{
    cart.classList.add("active");
};
closeCart.onclick = () =>{
    cart.classList.remove("active");
};



//actualizar total

function actualizarTotal(){
    total = 0
    let contenidoCarro = document.getElementsByClassName('cart-content')[0];
    let cartasProducto = contenidoCarro.getElementsByClassName('cart-box');
    for ( let i = 0; i < cartasProducto.length; i++){
        let cartaProducto = cartasProducto[i]
        let cantidadElemento = cartaProducto.getElementsByClassName('cart-quantity')[0];
        let cantidad = cantidadElemento.value;
        let precioElemento = cartaProducto.getElementsByClassName('cart-price')[0];
        let precio = parseFloat(precioElemento.innerText.replace("$ ", ""));
        total += cantidad * precio 
    }
    actualizarTotalDom();
}

function actualizarTotalDom(){
    document.getElementById('total-price').innerHTML = '$ ' + total    
}

// darkmode
let modo = document.getElementById("modo");
let body = document.body;
let header = document.getElementById('header')

modo.addEventListener('click', () => {
    let bodyStorage = body.classList.toggle("dark")
    let headerStorage = header.classList.toggle("dark")
    localStorage.setItem("modo", bodyStorage)
    localStorage.setItem("modo2", headerStorage)
})
let valor = localStorage.getItem("modo")
let valor2 =localStorage.getItem("modo2")

if (valor == "true" &&  valor2 == "true"){
    body.classList.add("dark")
    header.classList.add("dark")
}else{
    body.classList.remove("dark")
    header.classList.remove("dark")
}


