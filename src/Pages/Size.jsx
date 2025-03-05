import algodon1 from "../img/algodon1.jpg";
import algodon2 from "../img/algodon2.jpg";
import dryfit from "../img/dry-fit.jpg";
import polos from "../img/polos.jpg";
import camisas from "../img/camisa.jpg";
import "../Styles/Size.css";

const Size = () => {
  return (
    <div>
      <h1 className="text-center text-light mt-3 fw-bold">
        Playera de algodón{" "}
      </h1>
      <div className="d-flex flex-wrap justify-content-center">
        <div className="card-infantil-juvenil col-6 col-12">
          <img src={algodon2} alt="infantil-juvenil" className="w-100" />
        </div>
        <div className="card-dama-caballero col-6 col-12">
          <img src={algodon1} alt="dama-caballero" className="w-100" />
        </div>
      </div>
      <h1 className="text-center text-light mt-3 fw-bold">Playera Dry-fit </h1>
      <div className="d-flex flex-wrap justify-content-center">
        <div className="card-dama-caballero col-6 col-12">
          <img src={dryfit} alt="dry-fit adulto" className="w-100" />
        </div>
      </div>
      <h1 className="text-center text-light mt-3 fw-bold">Tipo polo </h1>
      <div className="d-flex flex-wrap justify-content-center">
        <div className="card-dama-caballero col-6 col-12">
          <img src={polos} alt="dry-fit adulto" className="w-100" />
        </div>
      </div>
      <h1 className="text-center text-light mt-3 fw-bold">Camisas </h1>
      <div className="d-flex flex-wrap justify-content-center">
        <div className="card-dama-caballero col-6 col-12">
          <img src={polos} alt="dry-fit adulto" className="w-100" />
        </div>
      </div>
    </div>
  );
};
export default Size;
