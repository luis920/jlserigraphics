import Sidebar from "./Sidebar";
import "../../Styles/Orders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const Orders = () => {
  const [filtro, setFiltro] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

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

  const pedidosFiltrados =
    filtro === ""
      ? data
      : data.filter((pedido) =>
          filtro === "pendientes"
            ? pedido.estado_pedido !== "entregado"
            : pedido.estado_pedido === "entregado"
        );

  const titulo =
    filtro === "pendientes"
      ? "Pedidos pendientes"
      : filtro === "entregados"
      ? "Pedidos entregados"
      : "Historial de pedidos";

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5 mx-4">
        <div className="d-flex  gap-2 mb-4">
          <button
            className="order-btn w-50"
            onClick={() => setFiltro("pendientes")}
          >
            <span className="order-shadow"></span>
            <span className="order-edge"></span>
            <span className="order-front order-text">Pedidos pendientes</span>
          </button>
          <button
            className="order-btn w-50"
            onClick={() => setFiltro("entregados")}
          >
            <span className="order-shadow"></span>
            <span className="order-edge"></span>
            <span className="order-front order-text">Pedidos entregados</span>
          </button>
        </div>

        <div className="mb-4">
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            <FontAwesomeIcon
              className="icon-sidebar text-light"
              icon={faPlus}
            />
            Agregar nuevo pedido
          </button>
        </div>

        {/* Tabla de pedidos */}
        <div className="table-responsive">
          <h1 className="text-light">{titulo}</h1>
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
            {pedidosFiltrados.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.nombre_cliente}</td>
                <td>{pedido.tipo_prenda}</td>
                <td>{pedido.cantidad_piezas}</td>
                <td>{pedido.fecha_entrega}</td>
                <td>${pedido.costo}</td>
                <td>${pedido.total}</td>
                <td
                  className={
                    pedido.estado_pedido === "en proceso"
                      ? "text-danger fw-bold"
                      : "text-success fw-bold"
                  }
                >
                  {pedido.estado_pedido}
                </td>
              </tr>
            ))}
          </table>
        </div>
        {(filtro === "pendientes" || filtro === "entregados") && (
          <button
            className="btn btn-secondary mt-3"
            onClick={() => setFiltro("")}
          >
            Mostrar todos los pedidos
          </button>
        )}
      </div>
      <div>
        {showModal && (
          <div className={`modal-container ${showModal ? "show" : ""}`}>
            <div className="modal-content">
              <h2 className="">Nuevo Pedido</h2>
              <form className="contacto-formulario ">
                <div className="d-flex">
                  <div className="d-flex column ">
                    <label htmlFor="nombre">Nombre del cliente</label>
                    <input type="text" id="nombre" name="nombre" required />
                  </div>
                  <div className="d-flex column ">
                    <label htmlFor="prenda ">Tipo de prenda</label>
                    <input
                      className="mx-2"
                      type="text"
                      id="prenda"
                      name="prenda"
                      required
                    />
                  </div>
                </div>
                <div className="d-flex">
                  <div className="d-flex column ">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                      type="number"
                      id="cantidad"
                      name="cantidad"
                      required
                    />
                  </div>
                  <div className="d-flex column ">
                    <label htmlFor="entrega ">fecha de entrega</label>
                    <input
                      className="mx-2"
                      type="text"
                      id="entrega"
                      name="entrega"
                      required
                    />
                  </div>
                </div>

                <div className="d-flex column  ">
                  <label htmlFor="precio">Precio</label>
                  <input className="" id="precio" name="precio" required />
                </div>
              </form>
              <button className="button-form btn btn-primary mt-5">
                Enviar
              </button>
              <button
                className=" button-form btn btn-secondary mt-2"
                onClick={() => handleCloseModal()}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
