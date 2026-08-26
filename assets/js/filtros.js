document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaActiva = urlParams.get("cat");
    const panelFiltros = document.getElementById("panel-filtros-categoria");

    // 1. Mostrar u ocultar el panel según la categoría de la URL
    if (panelFiltros) {
        if (categoriaActiva && categoriaActiva !== "ofertas") {
            panelFiltros.style.display = "block";
        } else {
            panelFiltros.style.display = "none";
        }
    }

    // 2. Lógica de filtrado avanzado (Precio, Marca, Color)
    const selectPrecio = document.getElementById("filtro-precio");
    const selectMarca = document.getElementById("filtro-marca");
    const selectColor = document.getElementById("filtro-color");

    if (selectPrecio && selectMarca && selectColor) {
        const ejecutarFiltros = () => {
            const precioVal = selectPrecio.value;
            const marcaVal = selectMarca.value.toLowerCase();
            const colorVal = selectColor.value.toLowerCase();

            // Verificamos que exista la base de datos de productos global
            if (typeof productosData === "undefined") return;

            // Partimos de la categoría actual de forma inteligente (compatible con subcategorías y filtros especiales)
            let lista = productosData;
            if (categoriaActiva && categoriaActiva !== "todo" && categoriaActiva !== "todos") {
                const catLimpia = categoriaActiva.toLowerCase().trim();
                if (catLimpia === "ofertas") {
                    lista = productosData.filter(p => p.precioTachado || p.categoria === "ofertas");
                } else if (catLimpia === "licores") {
                    const licoresValidos = ["rones", "whiskeys", "cervezas", "vinos"];
                    lista = productosData.filter(p => p.categoria && licoresValidos.includes(p.categoria.toLowerCase()));
                } else {
                    lista = productosData.filter(p => {
                        if (!p.categoria) return false;
                        const catProd = p.categoria.toLowerCase();
                        return catProd === catLimpia || catProd.startsWith(catLimpia + "-");
                    });
                }
            }

            // Aplicamos los filtros seleccionados de manera segura
            const filtradosFinales = lista.filter(prod => {
                // Filtro de Precio
                let cumplePrecio = true;
                if (precioVal === "bajo") cumplePrecio = prod.precio < 20;
                if (precioVal === "medio") cumplePrecio = prod.precio >= 20 && prod.precio <= 50;
                if (precioVal === "alto") cumplePrecio = prod.precio > 50;

                // Filtro de Marca (Valida que el producto tenga marca y coincida)
                let cumpleMarca = true;
                if (marcaVal !== "todas") {
                    cumpleMarca = prod.marca && prod.marca.toLowerCase() === marcaVal;
                }

                // Filtro de Color (Revisa tanto la propiedad color o el arreglo de colores)
                let cumpleColor = true;
                if (colorVal !== "todos") {
                    let coincideColorSimple = prod.color && prod.color.toLowerCase() === colorVal;
                    let coincideEnArray = prod.colores && prod.colores.some(c => c.nombre.toLowerCase() === colorVal);
                    cumpleColor = coincideColorSimple || coincideEnArray;
                }

                return cumplePrecio && cumpleMarca && cumpleColor;
            });

            // Llamamos a la función de renderizado que ya usa tu página
            if (typeof mostrarProductos === 'function') {
                mostrarProductos(filtradosFinales);
            }
        };

        selectPrecio.addEventListener("change", ejecutarFiltros);
        selectMarca.addEventListener("change", ejecutarFiltros);
        selectColor.addEventListener("change", ejecutarFiltros);
    }
});

// --- LÓGICA DEL PANEL DESPLEGABLE DE FILTROS ---
document.addEventListener("DOMContentLoaded", function() {
    const btnToggle = document.getElementById("btn-toggle-filtros");
    const cajaSelects = document.getElementById("caja-selects-filtros");
    const iconoFlecha = document.getElementById("icono-flecha");

    if (btnToggle && cajaSelects) {
        btnToggle.addEventListener("click", function() {
            if (cajaSelects.style.display === "none" || cajaSelects.style.display === "") {
                cajaSelects.style.display = "block";
                if (iconoFlecha) iconoFlecha.textContent = "▲";
            } else {
                cajaSelects.style.display = "none";
                if (iconoFlecha) iconoFlecha.textContent = "▼";
            }
        });
    }
});