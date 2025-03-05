import algodon1 from "../img/algodon1.jpg";
import algodon2 from "../img/algodon2.jpg";

const Size = () => {
  return (
    <div>
      <h1>Playera de algodon </h1>
      <div>
        <div className="card-infantil-juvenil">
          <img src={algodon2} alt="infantil-juvenil" />
        </div>
        <div className="card-dama-caballero">
          <img src={algodon1} alt="dama-caballero" />
        </div>
      </div>
    </div>
  );
};
export default Size;
