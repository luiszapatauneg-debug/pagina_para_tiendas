// --- LISTA MAESTRA DE PRODUCTOS ---

const productosData = [
    {
       id: "ron-cacique-500ml",
        nombre: "Ron Cacique 500 años 500ml",
        precio: 10.50,
        precioTachado: 15,
        categoria: "rones" ,
        imagen: "images/casique_500años.jpg", // Asegúrate de guardar la imagen en esa carpeta
        descripcion: "Ron añejo venezolano de excelente calidad, ideal para compartir.",
        detalles: [
            "Marca: Cacique",
            "Contenido: 500 ml",
            "Grado alcohólico: 40%",
            "Origen: Venezuela"
        ]
    },
    {
        id: "vino-tinto-sangre-de-cristo",
        nombre: "Vino Tinto Sangre de Cristo",
        precio: 10.00,
        precioTachado: 13,
        categoria: "vinos",
        imagen: "images/vino_sangre_de_cristo.png",
        descripcion: "Vino tinto suave, perfecto para acompañar cenas y carnes.",
        detalles: [
            "Contenido: 750 ml",
            "Tipo: Tinto"
        ]
    },
    {
        id: "vino-blanco-chardonnay",
        nombre: "Vino Blanco Chardonnay la castellana",
        precio: 11.00,
        categoria: "vinos",
        imagen: "images/vino_blanco chardonnay_la_castellana.jpg",
        descripcion: "Vino blanco fresco y frutal, ideal bien frío.",
        detalles: [
            
            "Contenido: 750 ml",
            "Tipo: Blanco"
        ]
    },
    {
        id: "whiskey-old-parr-750ml",
        nombre: "Whiskey Old Parr 12 Años",
        precio: 35.00,
        precioTachado: 40.00, // Este también saldrá en Ofertas
        categoria: "whiskeys",
        imagen: "images/Whiskey_Old_Parr_12_Años.jpg",
        descripcion: "Whisky escocés de alta gama, suave y complejo.",
        detalles: [
             "Marca: Old Parr ",
            "Contenido: 750 ml",
            "Añejamiento: 12 años"
        ]
    },
    {
        id: "pack-cerveza-polar-light",
        nombre: "Pack 24 Cervezas Polar Light",
        precio: 14.00,
        precioTachado: 16,
        categoria: "cervezas",
        imagen: "images/pack_polar_ligth.jpg",
        descripcion: "El pack ideal bien frío para la reunión del fin de semana.",
        detalles: [
            "Presentación: Pack de 24 latas",
            "Grado alcohólico: 4.5%"
        ]
    },


/* ========================================== */
             /* CABALLERO   */
/* ========================================== */

{
    id: "camisa-urbana-01",
    nombre: "Camisa t ",
    precio: 15.00,
    categoria: "caballero-camisas",
    marca: "zara", // <--- 1. Agrega la marca en minúsculas para que el filtro la detecte
    imagen: "images/ropa_uno.jpg",
    fotosExtras: ["images/ropa_dos.jpg", "images/ropa_tres.jpg", "images/ropa_uno.jpg"],
    tallas: ["S", "M", "L", "XL"],
    colores: [
        { nombre: "negro", hex: "#000000", foto: "images/ropa_uno.jpg" },  // <--- 2. Pon los nombres de los colores en minúsculas (ej: "negro", "blanco")
        { nombre: "blanco", hex: "#FFFFFF", foto: "images/ropa_dos.jpg" },
        { nombre: "azul", hex: "#132783", foto: "images/ropa_tres.jpg" }
    ],
    descripcion: "Algodón de alta densidad, corte boxy fit.",
    detalles: ["Material: 100% Algodón", "Peso: 250gsm"]
},

 {
    id: "camisa-prada-01",
    nombre: "camisa Oversize prada",
    precio: 28.00,
    categoria: "caballero-camisas",
    marca: "nike", // <--- 1. Agrega la marca en minúsculas para que el filtro la detecte
    imagen: "images/ropa_uno.jpg",
    fotosExtras: ["images/ropa_dos.jpg", "images/ropa_tres.jpg", "images/ropa_uno.jpg"],
    tallas: ["S", "M", "L", "XL"],
    colores: [
        { nombre: "negro", hex: "#000000", foto: "images/ropa_uno.jpg" },  // <--- 2. Pon los nombres de los colores en minúsculas (ej: "negro", "blanco")
        { nombre: "blanco", hex: "#FFFFFF", foto: "images/ropa_dos.jpg" },
        { nombre: "gris", hex: "#808080", foto: "images/ropa_tres.jpg" }
    ],
    descripcion: "Algodón de alta densidad, corte boxy fit.",
    detalles: ["Material: 100% Algodón", "Peso: 250gsm"]
},

{
    id: "zapato-urbano-01",
    nombre: "Zapatillas Urbanas Sport",
    precio: 35.00,
    categoria: "caballero-zapatos",
    marca: "nike",
    imagen: "images/ZAPATOS_UNO.jpg",
    fotosExtras: ["images/ZAPATOSUNO_BLANCO.jpg", "images/ZAPATOS_UNO.jpg"],
    tallas: ["40", "41", "42", "43"],
    colores: [
        { nombre: "negro", hex: "#000000", foto: "images/ZAPATOS_UNO.jpg" },
        { nombre: "blanco", hex: "#FFFFFF", foto: "images/ZAPATOSUNO_BLANCO.jpg" }
    ],
    descripcion: "Diseño ergonómico para máximo confort diario.",
    detalles: ["Suela de goma antideslizante", "Material sintético respirable"]
},
{
    id: "sueter-hoodie-01",
    nombre: "Suéter Hoodie Minimalista",
    precio: 32.00,
    categoria: "caballero-sueteres",
    marca: "zara",
    imagen: "images/SUETER_UNO_GRIS.jpg",
    fotosExtras: ["images/SUETER_UNO_NEGRO.jpg", "images/SUETER_UNO_GRIS.jpg"],
    tallas: ["M", "L", "XL"],
    colores: [
        { nombre: "gris", hex: "#808080", foto: "images/SUETER_UNO_GRIS.jpg" },
        { nombre: "negro", hex: "#000000", foto: "images/SUETER_UNO_NEGRO.jpg" }
    ],
    descripcion: "Suéter con capucha y franela perchada por dentro.",
    detalles: ["Algodón y poliéster", "Bolsillo tipo canguro"]
},
{
    id: "accesorio-gorra-01",
    nombre: "Gorra Trucker Casual",
    precio: 15.00,
    categoria: "caballero-accesorios",
    marca: "nike",
    imagen: "images/gorra_uno_negra.jpg",
    fotosExtras: ["images/gorra_uno_azul.jpg"],
    tallas: ["Única"],
    colores: [
        { nombre: "negro", hex: "#000000", foto:"images/gorra_uno_negra.jpg" },
        { nombre: "azul", hex: "#132783", foto:"images/gorra_uno_azul.jpg" }
    ],
    descripcion: "Gorra ajustable con malla trasera para mayor frescura.",
    detalles: ["Cierre ajustable de broche", "Panel frontal reforzado"]
}





];