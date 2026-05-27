// =======================================
// LOGIN
// =======================================

document.getElementById("loginForm")?.addEventListener("submit", function(e){

    e.preventDefault();

    let usuario = document.getElementById("usuario").value;

    let password = document.getElementById("password").value;

    if(usuario === "admin" && password === "1234"){

        alert("✅ Bienvenido");

        window.location.href = "index.html";

    }else{

        alert("❌ Datos incorrectos");

    }

});



// =======================================
// CALCULAR VENTA
// =======================================

function calcularVenta(){

    // ELEMENTOS
    let plato = document.getElementById("plato");

    let cantidad = document.getElementById("cantidad");

    let precio = document.getElementById("precio");

    let subtotal = document.getElementById("subtotal");

    let iva = document.getElementById("iva");

    let total = document.getElementById("total");

    // VALIDAR
    if(!plato || !cantidad){

        return;

    }

    // PRECIO DEL PLATO
    let precioUnitario = parseFloat(plato.value);

    // CANTIDAD
    let unidades = parseInt(cantidad.value);

    // VALIDAR NUMEROS
    if(isNaN(precioUnitario) || isNaN(unidades)){

        return;

    }

    // CALCULOS
    let subtotalCalculado = precioUnitario * unidades;

    let ivaCalculado = subtotalCalculado * 0.19;

    let totalCalculado = subtotalCalculado + ivaCalculado;

    // MOSTRAR
    precio.value = precioUnitario;

    subtotal.value = subtotalCalculado;

    iva.value = ivaCalculado.toFixed(2);

    total.value = totalCalculado.toFixed(2);

}



// =======================================
// EVENTOS AUTOMATICOS
// =======================================

document.getElementById("plato")?.addEventListener("change", calcularVenta);

document.getElementById("cantidad")?.addEventListener("input", calcularVenta);



// =======================================
// INICIAR CALCULO
// =======================================

calcularVenta();



// =======================================
// GUARDAR VENTA
// =======================================

document.getElementById("ventaForm")?.addEventListener("submit", function(e){

    e.preventDefault();

    let venta = {

        nombres: document.getElementById("nombres").value,

        apellidos: document.getElementById("apellidos").value,

        documento: document.getElementById("documento").value,

        direccion: document.getElementById("direccion").value,

        plato: document.getElementById("plato").options[
            document.getElementById("plato").selectedIndex
        ].text,

        precio: document.getElementById("precio").value,

        cantidad: document.getElementById("cantidad").value,

        subtotal: document.getElementById("subtotal").value,

        iva: document.getElementById("iva").value,

        total: document.getElementById("total").value

    };

    // OBTENER HISTORIAL
    let ventas = JSON.parse(localStorage.getItem("ventas")) || [];

    // AGREGAR
    ventas.push(venta);

    // GUARDAR
    localStorage.setItem("ventas", JSON.stringify(ventas));

    alert("✅ Venta registrada correctamente");

    // LIMPIAR
    this.reset();

    calcularVenta();

});



// =======================================
// MOSTRAR FACTURAS
// =======================================

let tablaFacturas = document.getElementById("tablaFacturas");

if(tablaFacturas){

    let ventas = JSON.parse(localStorage.getItem("ventas")) || [];

    ventas.forEach(v => {

        tablaFacturas.innerHTML += `

        <tr>

            <td>${v.nombres} ${v.apellidos}</td>

            <td>${v.documento}</td>

            <td>${v.plato}</td>

            <td>${v.cantidad}</td>

            <td>$ ${v.subtotal}</td>

            <td>$ ${v.iva}</td>

            <td>$ ${v.total}</td>

        </tr>

        `;

    });

}