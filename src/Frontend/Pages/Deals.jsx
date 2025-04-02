import "../Styles/Deals.css";
import PlayeraAlgodon from "../img/PlayeraAlgodon.png";
import PlayeraDryfit from "../img/PlayeraDryfit.png";
import Gorras from "../img/Gorras.png";
import Hoodies from "../img/Hoodies.png";
import Camisas from "../img/Camisas.png";
import { Link } from "react-router-dom";

const Deals = () => {
  const ofertas = [
    {
      titulo: "Playera de algodon",
      precio: "115 c/u",
      imagen: PlayeraAlgodon,
    },
    {
      titulo: "Playera Dry-fit",
      precio: "165 c/",
      imagen: PlayeraDryfit,
    },
    {
      titulo: "Camisa de vestir manga larga con logo y nombre bordado",
      precio: "430 c/u",
      imagen: Camisas,
    },
    {
      titulo: "Sudadera con gorro y cangurera",
      precio: "350 c/u",
      imagen: Hoodies,
    },
    {
      titulo: "Gorra de malla con bordado de 1 a 2 colores",
      precio: "135 c/u",
      imagen: Gorras,
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

      <div className="row  justify-content-center mx-5">
        {ofertas.map((item, index) => (
          <div key={index} className="col-md-4 mt-3">
            <Link to={"/contactanos"}>
              <div className="card">
                <div className="image">
                  <img src={item.imagen} alt="" className="img-deals" />
                </div>

                <span className="title">{item.titulo}</span>
                <span className="price">${item.precio}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Deals;
