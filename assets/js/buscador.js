document.addEventListener('DOMContentLoaded', () => {
    const inputBusqueda = document.getElementById('query');
    const tituloSeccion = document.querySelector('section > header.major > h2');
    const formulario = inputBusqueda ? inputBusqueda.closest('form') : null;

    if (!inputBusqueda) return;

    // Función auxiliar para cerrar cualquier panel o menú flotante de búsqueda abierto
    function cerrarMenuBusqueda() {
        inputBusqueda.blur();
        
        // Intentamos cerrar contenedores comunes de plantillas móviles
        // (Busca elementos que controlen la visibilidad del buscador o menús flotantes)
        const panelBusqueda = inputBusqueda.closest('.search-panel, #searchPanel, .search-modal, form');
        if (panelBusqueda) {
            panelBusqueda.classList.remove('active', 'visible', 'open');
        }

        // Por si la plantilla usa un botón de cierre general o clases en el body/header
        document.body.classList.remove('search-visible', 'is-search-visible');
        
        // Disparar un clic simulado en el fondo o body para quitar el foco de la interfaz móvil
        document.body.click();
    }

    // --- SOLUCIÓN AL ENTER Y AL PANEL FLOTANTE ---
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que recargue la página
            cerrarMenuBusqueda(); // Cierra teclado y oculta el panel flotante
        });
    }

    // Por si acaso presionan Enter directamente en el input
    inputBusqueda.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            cerrarMenuBusqueda(); // Cierra teclado y oculta el panel flotante
        }
    });
    
    inputBusqueda.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase().trim();
        
        // Si borra la búsqueda, recargamos la página o restauramos el estado inicial de la categoría
        if (termino === "") {
            const params = new URLSearchParams(window.location.search);
            const categoriaFiltro = params.get('cat');
            
            // Recargamos los productos de la categoría actual o todos
            let productosAMostrar = categoriaFiltro ? productosData.filter(p => p.categoria === categoriaFiltro) : productosData;
            
            // Restaurar título original
            if (tituloSeccion) {
                const nombresCategorias = {
                    "cpus": "🖥️ CPUs y Computadoras de Escritorio",
                    "laptops": "💻 Laptops Disponibles",
                    "procesadores": "⚙️ Procesadores",
                    "rones": "🍾 Rones y Bebidas",
                    "combos": "🔥 Combos Especiales"
                };
                tituloSeccion.textContent = (categoriaFiltro && nombresCategorias[categoriaFiltro]) ? nombresCategorias[categoriaFiltro] : "🔥 Ofertas Destacadas y Disponibles";
            }
            
            if (typeof mostrarProductos === 'function') {
                mostrarProductos(productosAMostrar);
            }
            return;
        }

        // --- BÚSQUEDA INTELIGENTE Y GLOBAL ---
        // Ahora busca en nombre, descripción, tags Y en la lista de detalles del producto
        const filtrados = productosData.filter(prod => {
            let textoDetalles = prod.detalles ? prod.detalles.join(' ') : '';
            const textoCompleto = `${prod.nombre} ${prod.descripcion} ${prod.tags} ${textoDetalles}`.toLowerCase();
            
            return textoCompleto.includes(termino);
        });

        // Cambiar el título dinámicamente al buscar
        if (tituloSeccion) {
            tituloSeccion.textContent = `🔍 Resultados para: "${termino}"`;
        }

        // Mostrar resultados usando la función global
        if (typeof mostrarProductos === 'function') {
            mostrarProductos(filtrados);
        }
    });
});