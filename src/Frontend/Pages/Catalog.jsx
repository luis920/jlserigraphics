import "../Styles/Catalog.css";

const Catalog = () => {
  const productos = [
    {
      id: 1,
      nombre: "PLAYERA DE ALGODON MANGA CORTA",
      imagen:
        "https://www.codisamonterrey.com/images/products/C0300-playera-caballero-cr-mc-caballero-100algodon-canario_1.jpg",
      descripcion:
        "Playera 100% algodon, contamos con mas de 20 colores disponibles en este modelo, es ideal para reuniones, bautizos, cumpleaños y todo tipo de evento social",
    },
    {
      id: 2,
      nombre: "PLAYERA DE ALGODON MANGA LARGA",
      imagen:
        "https://www.codisamonterrey.com/images/products/C0304-playera-caballero-cr-ml-caballero-100algodon-rojo_1.jpg",
      descripcion:
        "Playera 100% algodón de manga larga, suave y cómoda, perfecta para climas frescos. Disponible en más de 10 colores",
    },
    {
      id: 3,
      nombre: "CAMISA DE VESTIR MANGA CORTA",
      imagen:
        "https://www.codisamonterrey.com/images/products/C0604-camisa-oxford-liso-mc-caballero-75algodon-25poliester-azul-cielo_1.jpg",
      descripcion:
        "Camisa de vestir para esos dias de oficina, disponible en color celeste y blanco",
    },
    {
      id: 4,
      nombre: "CAMISA DE GABARDINA MANGA LARGA",
      imagen:
        "https://www.codisamonterrey.com/images/products/C0607-camisa-gabardina-ml-caballero-50algodon-50poliester-beige_1.jpg",
      descripcion:
        "Camisa de gabardina manga larga, resistente y con un acabado elegante.Disponible en 8 colores",
    },
    {
      id: 5,
      nombre: " CAMISA DE MEZCLILLA MANGA LARGA",
      imagen:
        "https://www.codisamonterrey.com/images/products/C0601-camisa-mezclilla-ml-caballero-100algodon-indigo-claro_1.jpg",
      descripcion:
        "Camisa de mezclilla manga larga, con estilo clásico y corte cómodo. ",
    },
    {
      id: 6,
      nombre: "PLAYERA TIPO POLO DE ALGODON",
      imagen:
        "https://www.codisamonterrey.com/images/products/C0550-playera-polo-mc-caballero-50algodon-50poliester-fucsia_1%20-%20copia.jpg",
      descripcion:
        "Playera tipo polo piqué 100% algodón, con textura suave y fresca, ideal para un look casual o semiformal.  ",
    },
    {
      id: 7,
      nombre: "PLAYERA TIPO POLO DRY-FIT",
      imagen:
        "https://www.codisamonterrey.com/images/products/8adc3e0b-9d9c-478c-8e31-f2d6eee2b079.jpg",
      descripcion:
        "Playera tipo polo dry-fit, ligera y de secado rápido, diseñada para brindar frescura y comodidad durante todo el día. Ideal para actividades al aire libre.  ",
    },
    {
      id: 8,
      nombre: "PLAYERA DRY-FIT MANGA CORTA",
      imagen:
        "https://www.codisamonterrey.com/images/products/C1302-playera-cr-mc-caballero-100poliester-rojo_1.jpg",
      descripcion:
        "Playera dry-fit de cuello redondo, cómoda, ligera y con tecnología de secado rápido.Disponible en 6 distintos colores  ",
    },
    {
      id: 9,
      nombre: "SUDADER CON GORRO",
      imagen:
        "https://www.codisamonterrey.com/images/products/C0701lavanda.jpg",
      descripcion:
        "Sudadera con gorro y bolsa cangurera, cómoda, abrigadora y perfecta para el día a día.   ",
    },
    {
      id: 10,
      nombre: "SUDADERA BASICA",
      imagen:
        "https://www.codisamonterrey.com/images/products/C0700-sudadera-cr-unisex-adulto-50algodon-50poliester-royal_1.jpg",
      descripcion:
        " Sudadera básica de diseño sencillo y elegante, ideal para un look casual y cómodo.   ",
    },
    {
      id: 11,
      nombre: "GORRA BEISBOLERA",
      imagen:
        "https://miplayera.com.mx/images/pv/GORRAS/MCAPS/UNISEX/GORRAS-DE-LINEA/BEISBOLERA/C08000134.png",
      descripcion:
        " Gorra beisbolera, clásica y versátil, ideal para complementar cualquier look deportivo o casual.   ",
    },
    {
      id: 11,
      nombre: "GORRA DE MALLA",
      imagen:
        "https://miplayera.com.mx/images/pv/GORRAS/MCAPS/UNISEX/GORRAS-DE-LINEA/INDOMABLE/C08000202.png",
      descripcion:
        " Gorra de malla, ligera y transpirable, diseñada para mantenerte fresco mientras proteges tu rostro del sol.   ",
    },
  ];
  return (
    <div>
      <h1 className=" title text-center ">NUESTROS PRODUCTOS</h1>
      <div className="row  justify-content-center ">
        {productos.map((item) => (
          <div key={item.id} className="col-md-4 mt-3 book">
            <p className="descripcionDelProducto">{item.descripcion}</p>
            <div className="cover row">
              <img className="img-catalog" src={item.imagen} alt="playera" />
              <h3 className="text-dark fs-6 tituloCartaCatalogo text-center">
                {item.nombre}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
