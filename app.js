let carrito;
let total = 0;


carrito = JSON.parse(localStorage.getItem('carrito')) || []
listarEnCarro()

//Renderizar productos
fetch('datos.json')
    .then((resinicial)=>resinicial.json())
    .then((res)=>{
        const producto = res;
        let aux = "";
        producto.map( producto => {
          aux += `
          <div class="product-box">
              <img src="${producto.img}" class="product-img" alt="">
              <h2 class="product-title">${producto.nombre}</h2>
              <span class="price">$ ${producto.precio}</span>
              <i onclick="agregarAlCarrito({id: ${producto.id}, nombre: '${producto.nombre}', img: '${producto.img}', precio: ${producto.precio}})" class='bx bxs-cart-add add-cart' ></i>
          </div>
          `;
        })
        document.getElementById("shop-content").innerHTML = aux;
    })
    .catch((e)=>{
        console.log(e)
    });

//Agregar al carrito
function agregarAlCarrito(objetoProd){
    if (carrito.some(item => item.id === objetoProd.id)){
        Toastify({
            text: 'The product is already at the shopping cart, change the quantity form it',
            position: 'left',
            gravity: "bottom",
            duration: '5000',
            style: {
                background: "linear-gradient(to right, #a34747, #ad3737)",
              },
        }).showToast();
    }else{
        Toastify({
            text: 'you have just added a product to the shopping cart!',
            position: 'left',
            gravity: 'bottom',
            duration: '5000',
            style: {
                background: "linear-gradient(to right, #5ac95a, #399431)",
              },
        }).showToast();
        carrito = [...carrito, objetoProd]
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    listarEnCarro() 
}
    
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

//eliminar del carro
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
    document.getElementById('total-price').innerHTML = '$ ' + total
}

// darkmode
let modo = document.getElementById("modo");
let body = document.body;

modo.addEventListener('click', () => {
    let bodyStorage = body.classList.toggle("dark")   
    localStorage.setItem("modo", bodyStorage)
})
let valor = localStorage.getItem("modo")
const darkMode = (valor == "true")? body.classList.add("dark") : body.classList.remove("dark")

// boton comprar
const comprar = document.getElementById('comprar')
comprar.addEventListener('click', () => {
    if (carrito.length === 0){
        Swal.fire({
            title: 'Cart empty',
            text: 'Add products to the cart!',
            icon: 'warning',
            confirmButtonText: 'Cool'
        });
    }else{
        Swal.fire({
            title: 'Purchase made',
            text: 'Thanks for trust on us',
            icon: 'success',
            confirmButtonText: 'Cool'
        });
    }
    
})

