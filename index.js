
const cambiarContraseña = document.getElementById("cambiarC");
cambiarContraseña.addEventListener("click", contraseña);

const botonIndex = document.getElementById('botonIndex');
botonIndex.addEventListener("click", IngresoWeb);

const crearCuenta = document.getElementById("crearC");
crearCuenta.addEventListener("click", contraseña);

//FUNCIONES 
function contraseña(){
    
    Swal.fire({
        title: 'No Contamos con Bases de datos para registrarse o almacenar y cambiar contraseñas :(',
        showConfirmButton: false,
        timer:'2000'
    })
}

function IngresoWeb() {
    const email = document.getElementById('exampleInputEmail1')
    const emailError = document.getElementById('email_error')
    const password = document.getElementById('exampleInputPassword1')
    const passError = document.getElementById('password_error')
    if (email.value.length < 9){
        emailError.style.display = "block"
        email.focus()
    }
    else if (password.value.length < 6){
        passError.style.display = "block"
        pass.focus()
    }
    else{
        Swal.fire({
            title: 'Info submitted',
            text: 'Press Log In',
            icon: 'success',
            confirmButtonText: 'Cool'
        });
        usuario = email.value
        localStorage.setItem('usuario', JSON.stringify(usuario));
        const login = document.getElementById('login')
        login.style.display = "block"
    }
}




