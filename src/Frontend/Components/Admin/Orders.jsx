import Sidebar from "./Sidebar";
import "../../Styles/Orders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  const data = [
    {
      id: 1,
      nombre_cliente: "Juan Garcia",
      tipo_prenda: "Playera algodon",
      cantidad_piezas: 35,
      fecha_entrega: "12-Abril-2025",
      costo: 130,
      total: 4550,
      estado_pedido: "entregado",
    },
    {
      id: 2,
      nombre_cliente: "Mario Perez",
      tipo_prenda: "Playera dryfit",
      cantidad_piezas: 20,
      fecha_entrega: "13-Abril-2025",
      costo: 150,
      total: 3000,
      estado_pedido: "en proceso",
    },
    {
      id: 3,
      nombre_cliente: "David Garcia",
      tipo_prenda: "Camisa manga larga",
      cantidad_piezas: 15,
      fecha_entrega: "14-Abril-2025",
      costo: 450,
      total: 6750,
      estado_pedido: "en proceso",
    },
    {
      id: 4,
      nombre_cliente: "Antonio Gaytan",
      tipo_prenda: "Playera de algodon",
      cantidad_piezas: 50,
      fecha_entrega: "15-Abril-2025",
      costo: 125,
      total: 6250,
      estado_pedido: "en proceso",
    },
  ];

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5 mx-4">
        <div className="d-flex  gap-2 mb-4">
          <button className="order-btn w-50">
            <span className="order-shadow"></span>
            <span className="order-edge"></span>
            <span className="order-front order-text">Pedidos pendientes</span>
          </button>
          <button className="order-btn w-50">
            <span className="order-shadow"></span>
            <span className="order-edge"></span>
            <span className="order-front order-text">Pedidos entregados</span>
          </button>
        </div>

        <div className="mb-4">
          <button className="btn btn-primary">
            <FontAwesomeIcon
              className="icon-sidebar text-light"
              icon={faPlus}
            />
            Agregar nuevo pedido
          </button>
        </div>

        {/* Tabla de pedidos */}
        <div className="table-responsive">
          <table className="table table-bordered bg-light">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre del Cliente</th>
                <th>Tipo de Prenda</th>
                <th>Cantidad</th>
                <th>Fecha de Entrega</th>
                <th>Precio Unitario</th>
                <th>Total</th>
                <th>Estado del Pedido</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nombre_cliente}</td>
                  <td>{item.tipo_prenda}</td>
                  <td>{item.cantidad_piezas}</td>
                  <td>{item.fecha_entrega}</td>
                  <td>${item.costo}</td>
                  <td>${item.total}</td>
                  <td>{item.estado_pedido}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
