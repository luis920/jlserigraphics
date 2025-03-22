import "../../Styles/Reports.css";
import Sidebar from "./Sidebar";

const Reports = () => {
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="stadistics-container">
        <div className=" selector d-flex justify-content-center  mt-5 ">
          <select className="bg-dark" name="elige un mes" id="">
            <option value="enero">Enero</option>
            <option value="febrero">Febrero</option>
            <option value="marzo">Marzo</option>
            <option value="abril">Abril</option>
            <option value="mayo">Mayo</option>
            <option value="junio">Junio</option>
            <option value="agost">Agosto</option>
            <option value="septiembre">Septiembre</option>
            <option value="octubre">Octubre</option>
            <option value="noviembre">Noviembre</option>
            <option value="diciembre">Diciembre</option>
          </select>
        </div>
        <div className="stadistics d-flex">
          <div className="ingresosTotales bg-dark ">
            <h3>Ventas</h3>
            <p>
              <strong>$45000</strong>
            </p>
          </div>
          <div className="gastosTotales bg-dark">
            <h3>Gastos</h3>
            <p>
              <strong>$23000</strong>
            </p>
          </div>
          <div className="gananciaNeta bg-dark">
            <h3>Ganancias</h3>
            <p>
              <strong>$22000</strong>
            </p>
          </div>
          <div className="numeroDePedidos bg-dark">
            <h3>Pedidos</h3>
            <p>23 pedidos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
