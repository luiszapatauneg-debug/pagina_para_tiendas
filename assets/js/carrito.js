// --- CARRITO DE COMPRAS - COMPUTADORAS VENEZUELA ---



// 1. Sincronizar todos los precios del carrito con la lista maestra (PRODUCTOS.JS)

function sincronizarPreciosCarrito() {

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    let carritoModificado = false;



    let listaProductos = typeof productosData !== 'undefined' ? productosData : (typeof productos !== 'undefined' ? productos : []);



    if (listaProductos.length > 0) {

        carrito.forEach(item => {

            let productoOficial = null;



            // 1. Primero intentamos buscar por ID (si el producto lo tiene guardado)

            if (item.id) {

                productoOficial = listaProductos.find(p => p.id === item.id);

            }



            // 2. Si no tiene ID o no se encontró, buscamos por nombre normalizando espacios/minúsculas

            if (!productoOficial && item.nombre) {

                let nombreItem = item.nombre.toLowerCase().trim();

                productoOficial = listaProductos.find(p => p.nombre.toLowerCase().trim() === nombreItem);

            }

           

            if (productoOficial) {

                let precioOficial = parseFloat(productoOficial.precio);

               

                // Si el precio o el nombre oficial cambiaron en la lista maestra, los actualizamos

                if (parseFloat(item.precio) !== precioOficial || item.nombre !== productoOficial.nombre) {

                    console.log(`Actualizando ${productoOficial.nombre}: precio viejo ${item.precio} -> nuevo ${precioOficial}`);

                    item.precio = precioOficial;

                    item.nombre = productoOficial.nombre; // Sincroniza el nombre automáticamente

                    item.id = productoOficial.id;         // Asegura que guarde el ID

                    carritoModificado = true;

                }

            } else {

                console.warn(`No se encontró el producto "${item.nombre}" en la lista maestra.`);

            }

        });

    }



    if (carritoModificado) {

        localStorage.setItem('carrito', JSON.stringify(carrito));

    }

}

// 2. Función unificada para agregar al carrito

function agregarAlCarrito(nombre, precio) {

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

   

    let precioFinal = parseFloat(precio);

    let nombreOficial = nombre;

    let idEncontrado = null;



    let listaProductos = typeof productosData !== 'undefined' ? productosData : (typeof productos !== 'undefined' ? productos : null);



    if (listaProductos && Array.isArray(listaProductos)) {

        let productoOficial = listaProductos.find(p =>

            (p.nombre && p.nombre.trim().toLowerCase() === nombre.trim().toLowerCase()) ||

            (p.id && p.id === nombre)

        );

       

        if (productoOficial) {

            nombreOficial = productoOficial.nombre;

            precioFinal = parseFloat(productoOficial.precio);

            idEncontrado = productoOficial.id || null;

        }

    }

   

    let productoExistente = carrito.find(item => item.nombre.trim().toLowerCase() === nombreOficial.trim().toLowerCase());

   

    if (productoExistente) {

        productoExistente.cantidad += 1;

        productoExistente.precio = precioFinal; // Actualizamos al precio actual

    } else {

        carrito.push({

            id: idEncontrado,

            nombre: nombreOficial,

            precio: precioFinal,

            cantidad: 1

        });

    }

   

    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert(`¡"${nombreOficial}" fue agregado al carrito! 🛒`);

}



// 3. Función por ID

function agregarAlCarritoPorId(idProducto) {

    let listaProductos = typeof productosData !== 'undefined' ? productosData : (typeof productos !== 'undefined' ? productos : null);

   

    if (!listaProductos) {

        console.error("No se encuentra la lista de productos.");

        return;

    }

    let productoOficial = listaProductos.find(p => p.id === idProducto);

    if (productoOficial) {

        agregarAlCarrito(productoOficial.nombre, productoOficial.precio);

    } else {

        alert("Producto no encontrado en la base de datos.");

    }

}



// 4. Disminuir cantidad

function disminuirCantidad(index) {

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito[index].cantidad > 1) {

        carrito[index].cantidad -= 1;

    } else {

        carrito.splice(index, 1);

    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    renderizarCarritoVisual();

}



// 5. Aumentar cantidad

function aumentarCantidad(index) {

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito[index].cantidad += 1;

    localStorage.setItem('carrito', JSON.stringify(carrito));

    renderizarCarritoVisual();

}



// 6. Eliminar producto

function eliminarDelCarrito(index) {

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito.splice(index, 1);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    renderizarCarritoVisual();

}



// 7. Renderizar carrito visualmente

function renderizarCarritoVisual() {

    let contenedor = document.getElementById('tabla-carrito-container');

    if (!contenedor) return;



    // Sincronizamos precios ANTES de pintar cualquier cosa

    sincronizarPreciosCarrito();



    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];



    if (carrito.length === 0) {

        contenedor.innerHTML = `<p style="text-align: center; color: #888;">Tu carrito está vacío actualmente. 🛒</p>`;

        return;

    }



    let html = `

        <div class="table-wrapper">

            <table class="alt">

                <thead>

                    <tr>

                        <th>Producto</th>

                        <th>Precio Unit.</th>

                        <th>Cantidad</th>

                        <th>Subtotal</th>

                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

    `;



    let totalGeneral = 0;



    carrito.forEach((item, index) => {

        let subtotal = item.precio * item.cantidad;

        totalGeneral += subtotal;



        html += `

            <tr>

                <td>${item.nombre}</td>

                <td>$${item.precio}</td>

                <td>

                    <div class="control-cantidad">

                        <button onclick="disminuirCantidad(${index})" class="btn-restar">-</button>

                        <span class="numero-cantidad">${item.cantidad}</span>

                        <button onclick="aumentarCantidad(${index})" class="btn-sumar">+</button>

                    </div>

                </td>

                <td>$${subtotal}</td>

                <td>

                    <button onclick="eliminarDelCarrito(${index})" class="btn-eliminar" title="Eliminar producto">🗑️</button>

                </td>

            </tr>

        `;

    });



    html += `

                </tbody>

                <tfoot>

                    <tr>

                        <td colspan="3" style="text-align: right; font-weight: bold;">Total a Pagar:</td>

                        <td colspan="2" style="font-weight: bold; color: #f56a6a; font-size: 1.2em;">$${totalGeneral} USD</td>

                    </tr>

                </tfoot>

            </table>

        </div>

    `;



    contenedor.innerHTML = html;

}



// 8. Finalizar compra por WhatsApp (Modificado para abrir el formulario modal)

let numeroWhatsAppGlobal = "";



function finalizarCompraWhatsApp(numeroWhatsApp) {

    sincronizarPreciosCarrito();

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

   

    if (carrito.length === 0) {

        alert("Tu carrito está vacío. ¡Agrega al menos un producto antes de pedir!");

        return;

    }



    numeroWhatsAppGlobal = numeroWhatsApp;



    // Verificar si en el carrito hay algún producto de licor (categorías "rones" o "licores")

    let listaProductos = typeof productosData !== 'undefined' ? productosData : [];

    const tieneLicores = carrito.some(item => {

        let prodOriginal = listaProductos.find(p => p.id === item.id || p.nombre === item.nombre);

        return prodOriginal && (prodOriginal.categoria === "rones" || prodOriginal.categoria === "licores");

    });



    const seccionEdad = document.getElementById('seccion-mayor-edad');

    const checkEdad = document.getElementById('wsp-edad');



    if (tieneLicores) {

        if (seccionEdad) seccionEdad.style.setProperty('display', 'block', 'important');

        if (checkEdad) checkEdad.required = true;

    } else {

        if (seccionEdad) seccionEdad.style.display = 'none';

        if (checkEdad) checkEdad.required = false;

    }



    // Mostrar modal de datos

    const modalWsp = document.getElementById('modal-whatsapp');

    if (modalWsp) modalWsp.style.display = 'flex';

}



// Ocultar/Mostrar campo de zona según el tipo de entrega

// Controlar visibilidad del delivery, zona y métodos de pago según la opción elegida

function actualizarOpcionesEntrega() {

    const tipo = document.getElementById('wsp-entrega').value;

    const contZona = document.getElementById('contenedor-zona');

    const avisoDelivery = document.getElementById('aviso-delivery');

    const opcionPuntoVenta = document.getElementById('opcion-punto-venta');

    const selectPago = document.getElementById('wsp-pago');



    if (tipo === 'Retirar en Tienda') {

        if (contZona) contZona.style.display = 'none';

        if (avisoDelivery) avisoDelivery.style.display = 'none';

       

        // Si elige retirar en tienda, mostramos el Punto de Venta

        if (opcionPuntoVenta) opcionPuntoVenta.style.display = 'block';

    } else {

        // Si elige Delivery

        if (contZona) contZona.style.display = 'block';

        if (avisoDelivery) avisoDelivery.style.display = 'block';

       

        // Si selecciona delivery y tenía seleccionado punto de venta, lo cambiamos a Pago Móvil o Efectivo para evitar errores

        if (selectPago && selectPago.value === 'Punto de Venta') {

            selectPago.value = 'Pago Móvil';

        }

       

        // Ocultamos la opción de Punto de Venta porque no aplica para delivery

        if (opcionPuntoVenta) opcionPuntoVenta.style.display = 'none';

    }

}



// Eventos para cerrar y enviar el formulario del modal de WhatsApp
document.addEventListener("DOMContentLoaded", () => {
    const btnCerrarWsp = document.getElementById('cerrar-modal-wsp');
    const modalWsp = document.getElementById('modal-whatsapp');
    const formWspDatos = document.getElementById('form-whatsapp-datos');

    if (btnCerrarWsp && modalWsp) {
        btnCerrarWsp.addEventListener('click', () => {
            modalWsp.style.display = 'none';
        });
    }
    if (formWspDatos) {
        formWspDatos.addEventListener('submit', (e) => {
            e.preventDefault();

            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            let listaProductos = typeof productosData !== 'undefined' ? productosData : [];

            const nombre = document.getElementById('wsp-nombre').value;
            const sucursalSeleccionada = document.getElementById('wsp-sucursal').value; // 📍 Captura la sucursal seleccionada
            const entrega = document.getElementById('wsp-entrega').value;
            const zona = document.getElementById('wsp-zona').value;
            const pago = document.getElementById('wsp-pago').value;
            const esMayor = document.getElementById('wsp-edad') ? document.getElementById('wsp-edad').checked : false;

            // 📍 DICCIONARIO DE GERENTES: Reemplaza estos números con los reales de cada tienda (con código de país)
            const numerosGerentes = {
                "Puerto Ordaz - villa colombia": "5804249081574",     // Cambia por el número real del gerente de Centro
                "Puerto Ordaz - Alta Vista": "5804249273967",  // Cambia por el número real del gerente de Alta Vista
                "Valencia - Carabobo": "584121111113"         // Cambia por el número real del gerente de Valencia
            };

            // Busca el número de la sucursal, si no encuentra usa el número global por defecto
            const numeroDestino = numerosGerentes[sucursalSeleccionada] || numeroWhatsAppGlobal;

            const tieneLicores = carrito.some(item => {
                let prodOriginal = listaProductos.find(p => p.id === item.id || p.nombre === item.nombre);
                return prodOriginal && (prodOriginal.categoria === "rones" || prodOriginal.categoria === "licores");
            });

            if (tieneLicores && !esMayor) {
                alert("Debes confirmar que eres mayor de edad para procesar el pedido de bebidas.");
                return;
            }

            // Construcción del mensaje indicando la sucursal de destino
            let mensaje = `*¡Hola! Nuevo Pedido Web 🛒*\n`;
            mensaje += `📍 *Sucursal Destino:* ${sucursalSeleccionada}\n\n`;
            mensaje += `👤 *Cliente:* ${nombre}\n`;
            mensaje += `🚚 *Método de Entrega:* ${entrega}\n`;
            
            if (entrega !== 'Retirar en Tienda') {
                mensaje += `📍 *Zona / Sector:* ${zona}\n`;
            }

            mensaje += `💳 *Método de Pago:* ${pago}\n`;

            if (tieneLicores) {
                mensaje += `🔞 *Verificación de edad:* Confirmado (18+)\n`;
            }

            mensaje += `\n*Detalle del pedido:*\n`;

            let totalGeneral = 0;
            carrito.forEach((item, index) => {
                let subtotal = item.precio * item.cantidad;
                totalGeneral += subtotal;
                mensaje += `${index + 1}. *${item.nombre}* x${item.cantidad} - $${subtotal}\n`;
            });

            mensaje += `\n💰 *Total a pagar: $${totalGeneral} USD*\n\n¿Me confirman disponibilidad y métodos de pago?`;

            let mensajeCodificado = encodeURIComponent(mensaje);
            let urlWhatsApp = `https://wa.me/${numeroDestino}?text=${mensajeCodificado}`;

           window.location.href = urlWhatsApp;
            if (modalWsp) modalWsp.style.display = 'none';
        });
    }
});



// 9. Auto-ejecutar al cargar la página del carrito

document.addEventListener("DOMContentLoaded", () => {

    renderizarCarritoVisual();

}); 

function verificarEdadOk() {
    const modalEdad = document.getElementById('modal-edad-inicio');
    if (modalEdad) {
        // Usamos setProperty con !important para vencer al CSS
        modalEdad.style.setProperty('display', 'none', 'important'); 
      // Opcional: guardamos en la memoria del navegador para que no le vuelva a preguntar cada vez que cambia de página
        localStorage.setItem('edadVerificada', 'true');
    }
}

// Al cargar la página, verificamos si ya había confirmado antes
document.addEventListener("DOMContentLoaded", () => {
    const verificado = localStorage.getItem('edadVerificada');
    const modalEdad = document.getElementById('modal-edad-inicio');
    
    if (verificado === 'true' && modalEdad) {
        // Forzamos el ocultamiento con !important para vencer al CSS
        modalEdad.style.setProperty('display', 'none', 'important');
    }
});