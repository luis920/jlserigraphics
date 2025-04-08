import "../Styles/Catalog.css";

const Catalog = () => {
  const productos = [
    {
      id: 1,
      nombre: "Playera de algodon cuello redondo",
      imagen:
        "https://www.codisamonterrey.com/images/products/C0300-playera-caballero-cr-mc-caballero-100algodon-canario_1.jpg",
      descripcion:
        "Playera 100% algodon, contamos con mas de 20 colores disponibles en este modelo, es ideal para reuniones, bautizos, cumpleaños y todo tipo de evento social",
    },
  ];
  return (
    <div>
      <h1 className=" title text-center ">NUESTROS PRODUCTOS</h1>
      {productos.map((item) => (
        <div key={item.id} className="book">
          <p>{item.descripcion}</p>
          <div className="cover">
            <img className="img-catalog" src={item.imagen} alt="playera" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
