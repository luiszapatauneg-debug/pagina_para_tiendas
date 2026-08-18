// --- LISTA MAESTRA DE PRODUCTOS ---

const productosData = [
    {
       id: "ron-cacique-500ml",
        nombre: "Ron Cacique 500 años 500ml",
        precio: 14.50,
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

    {
    id: "camisa-urbana-01",
    nombre: "Camisa Oversize Premium",
    precio: 25.00,
    categoria: "camisas",
    imagen: "images/ropa_uno.jpg",
    fotosExtras: ["images/ropa_dos.jpg", "images/ropa_tres.jpg", "images/ropa_uno.jpg"],
    tallas: ["S", "M", "L", "XL"],
    colores: [
       { nombre: "Negro", hex: "#000000", foto: "images/ropa_uno.jpg" },
        { nombre: "Blanco", hex: "#FFFFFF", foto: "images/ropa_dos.jpg" },
        { nombre: "Gris", hex: "#808080", foto: "images/ropa_tres.jpg" }
    ],
    descripcion: "Algodón de alta densidad, corte boxy fit.",
    detalles: ["Material: 100% Algodón", "Peso: 250gsm"]
},

 {
    id: "camisa-urbana-01",
    nombre: "Camisa Oversize Premium",
    precio: 25.00,
    categoria: "camisas",
    imagen: "images/ropa_uno.jpg",
    fotosExtras: ["images/ropa_dos.jpg", "images/ropa_tres.jpg", "images/ropa_uno.jpg"],
    tallas: ["S", "M", "L", "XL"],
    colores: [
       { nombre: "Negro", hex: "#000000", foto: "images/ropa_uno.jpg" },
        { nombre: "Blanco", hex: "#FFFFFF", foto: "images/ropa_dos.jpg" },
        { nombre: "Gris", hex: "#808080", foto: "images/ropa_tres.jpg" }
    ],
    descripcion: "Algodón de alta densidad, corte boxy fit.",
    detalles: ["Material: 100% Algodón", "Peso: 250gsm"]
}


];