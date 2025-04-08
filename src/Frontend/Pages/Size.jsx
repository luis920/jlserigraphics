import algodon1 from "../img/algodon1.jpg";
import algodon2 from "../img/algodon2.jpg";
import dryfit from "../img/dry-fit.jpg";
import polos from "../img/polos.jpg";
import camisas from "../img/camisa.jpg";
import sudadera from "../img/sudadera.jpg";
import "../Styles/Size.css";

const Size = () => {
  return (
    <div>
      <h1 className="text-center title-size  mt-3 fw-bold">
        PLAYERA DE ALGODON{" "}
      </h1>
      <div className="d-flex flex-wrap justify-content-center">
        <div className="card-infantil-juvenil col-12 col-sm-6 col-md-4 col-lg-3">
          <img src={algodon2} alt="infantil-juvenil" className="w-100" />
        </div>
        <div className="card-dama-caballero col-12 col-sm-6 col-md-4 col-lg-3">
          <img src={algodon1} alt="dama-caballero" className="w-100" />
        </div>
      </div>
      <h1 className="text-center title-size mt-3 fw-bold">PLAYERA DRY-FIT </h1>
      <div className="d-flex flex-wrap justify-content-center">
        <div className="card-dama-caballero col-12 col-sm-6 col-md-4 col-lg-3">
          <img src={dryfit} alt="dry-fit adulto" className="w-100" />
        </div>
      </div>
      <h1 className="text-center title-size mt-3 fw-bold">TIPO POLO </h1>
      <div className="d-flex flex-wrap justify-content-center">
        <div className="card-dama-caballero col-12 col-sm-6 col-md-4 col-lg-3">
          <img src={polos} alt="dry-fit adulto" className="w-100" />
        </div>
      </div>
      <h1 className="text-center title-size mt-3 fw-bold">CAMISAS </h1>
      <div className="d-flex flex-wrap justify-content-center">
        <div className="card-dama-caballero col-12 col-sm-6 col-md-4 col-lg-3">
          <img src={camisas} alt="dry-fit adulto" className="w-100" />
        </div>
      </div>
      <h1 className="text-center title-size mt-3 fw-bold">SUDADERAS </h1>
      <div className="d-flex flex-wrap justify-content-center">
        <div className="card-dama-caballero col-12 col-sm-6 col-md-4 col-lg-3">
          <img src={sudadera} alt="dry-fit adulto" className="w-100" />
        </div>
      </div>
    </div>
  );
};
export default Size;
