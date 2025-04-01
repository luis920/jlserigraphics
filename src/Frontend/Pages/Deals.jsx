import "../Styles/Deals.css";
import playera from "../img/playera1.webp";

const Deals = () => {
  const ofertas = [
    {
      titulo: "Playera algodon estampada a 1 tinta",
      precio: 105,
      imagen:
        "https://i5.walmartimages.com/asr/78f3e13f-b452-45fb-a4af-9f578eb0ff0f.da696bdb2fc1e486023ee83b27385f4c.jpeg",
    },
    {
      titulo: "Playera algodon estampada a 1 tinta",
      precio: 105,
      imagen:
        "https://i5.walmartimages.com/asr/78f3e13f-b452-45fb-a4af-9f578eb0ff0f.da696bdb2fc1e486023ee83b27385f4c.jpeg",
    },
    {
      titulo: "Playera algodon estampada a 1 tinta",
      precio: 105,
      imagen:
        "https://i5.walmartimages.com/asr/78f3e13f-b452-45fb-a4af-9f578eb0ff0f.da696bdb2fc1e486023ee83b27385f4c.jpeg",
    },
    {
      titulo: "Playera algodon estampada a 1 tinta",
      precio: 105,
      imagen:
        "https://i5.walmartimages.com/asr/78f3e13f-b452-45fb-a4af-9f578eb0ff0f.da696bdb2fc1e486023ee83b27385f4c.jpeg",
    },
    {
      titulo: "Playera algodon estampada a 1 tinta",
      precio: 105,
      imagen:
        "https://i5.walmartimages.com/asr/78f3e13f-b452-45fb-a4af-9f578eb0ff0f.da696bdb2fc1e486023ee83b27385f4c.jpeg",
    },
    {
      titulo: "Playera algodon estampada a 1 tinta",
      precio: 105,
      imagen:
        "https://i5.walmartimages.com/asr/78f3e13f-b452-45fb-a4af-9f578eb0ff0f.da696bdb2fc1e486023ee83b27385f4c.jpeg",
    },
  ];
  return (
    <div className="">
      <div className="text-center bg-dark p-2">
        <h1 className="text-light fw-bold">¡TE AYUDAMOS A AHORRAR!</h1>
        <p className="text-light">
          <br />
          Estas ofertas son una excelente oportunidad para reducir costos en
          compras al por mayor. <br />
          Si tiene alguna duda, no dude en ponerse en contacto con nosotros.{" "}
          <br />
          jlserigraphics@gmail.com +52 866 642 76 50
        </p>
      </div>
      <h1 className="text-light fw-bold text-center fs-1 mt-3">
        ¡Grandes descuentos te esperan! Mira nuestras ofertas.
      </h1>
      <div className="row">
        {ofertas.map((item, index) => (
          <div key={index} className="col-md-4 mt-3">
            <div className="card">
              <div className="image">
                <img src={item.imagen} alt="" className="img-deals" />
              </div>
              <span className="title">{item.titulo}</span>
              <span className="price">${item.precio}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Deals;
