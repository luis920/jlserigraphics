import Sidebar from "./Sidebar";
import "../../Styles/Orders.css";

const Orders = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="mt-5 mx-2">
        <button className="order-btn">
          <span class="order-shadow"></span>
          <span class="order-edge"></span>
          <span class="order-front order-text"> Pedidos pendientes</span>
        </button>
        <button>
          <span class="order-shadow"></span>
          <span class="order-edge"></span>
          <span class="order-front order-text"> Pedidos entregados</span>
        </button>
      </div>
      <div className="mt-5 mx-4">
        <button className="btn btn-primary">Agregar nuevo pedido</button>
      </div>
    </div>
  );
};
export default Orders;
