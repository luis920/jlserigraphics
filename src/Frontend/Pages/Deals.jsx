import "../Styles/Deals.css";
import playera from "../img/playera1.webp";

const Deals = () => {
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

      <div class="card">
        <div class="image">
          <img src={playera} alt="" className="img-deals" />
        </div>
        <span class="title">Cool Chair</span>
        <span class="price">$100</span>
      </div>
    </div>
  );
};
export default Deals;
