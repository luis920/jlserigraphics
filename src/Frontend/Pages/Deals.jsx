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
  ];
  return (
    <div>
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
      {ofertas.map((item) => (
        <div key={item.id} class="card">
          <div class="image">
            <img src={item.imagen} alt="" className="img-deals" />
          </div>
          <span class="title">{item.titulo}</span>
          <span class="price">${item.precio}</span>
        </div>
      ))}
    </div>
  );
};
export default Deals;
