import Sidebar from "./Sidebar";
import Navbar from "../Navbar.jsx";
import "../../Styles/Orders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Context } from "../../Store/appContext.jsx";

const Quote = () => {
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="container mt-5 mx-4">
          <div className="mb-4">
            <button className="btn btn-primary">
              <FontAwesomeIcon
                className="icon-sidebar text-light"
                icon={faPlus}
              />
              Generar nueva cotizacion
            </button>
          </div>

          {/* Tabla de pedidos */}
          <div className="table-responsive">
            <h1 className="text-light">Cotizaciones</h1>
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
              {/* <tbody>
                {pedidosFiltrados.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.id}</td>
                    <td>{pedido.cliente}</td>
                    <td>{pedido.tipo_prenda}</td>
                    <td>{pedido.cantidad}</td>
                    <td>{pedido.fecha_entrega}</td>
                    <td>${pedido.precio}</td>
                    <td>${pedido.total}</td>
                    <td
                      className={
                        pedido.estado_pedido === "en proceso"
                          ? "text-danger fw-bold"
                          : "text-success fw-bold"
                      }
                    >
                      {pedido.estado_pedido}

                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={pedido.estado_pedido === "entregado"}
                          onChange={() => handleEstadoToggle(pedido)}
                        />
                        <div className="slider"></div>
                        <div className="slider-card">
                          <div className="slider-card-face slider-card-front"></div>
                          <div className="slider-card-face slider-card-back"></div>
                        </div>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody> */}
            </table>
          </div>
        </div>
        <div>
          {/* {showModal && (
            <div className={`modal-container ${showModal ? "show" : ""}`}>
              <div className="modal-content">
                <h2 className="">Nuevo Pedido</h2>
                <form className="contacto-formulario ">
                  <div className="d-flex">
                    <div className="d-flex column ">
                      <label htmlFor="cliente">Nombre del cliente</label>
                      <input
                        onChange={handleInputChange}
                        type="text"
                        id="cliente"
                        name="cliente"
                        value={nuevoPedido.cliente}
                        required
                      />
                    </div>
                    <div className="d-flex column ">
                      <label className="mx-2" htmlFor="tipo_prenda ">
                        Tipo de prenda
                      </label>
                      <input
                        onChange={handleInputChange}
                        className="mx-2"
                        type="text"
                        id="tipo_prenda"
                        name="tipo_prenda"
                        value={nuevoPedido.tipo_prenda}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="d-flex column ">
                      <label htmlFor="cantidad">Cantidad</label>
                      <input
                        onChange={handleInputChange}
                        type="number"
                        id="cantidad"
                        name="cantidad"
                        value={nuevoPedido.cantidad}
                        required
                      />
                    </div>
                    <div className="d-flex column ">
                      <label className="mx-2" htmlFor="fecha_entrega ">
                        Fecha de entrega
                      </label>
                      <input
                        onChange={handleInputChange}
                        className="mx-2"
                        type="date"
                        id="fecha_entrega"
                        name="fecha_entrega"
                        value={nuevoPedido.fecha_entrega}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="d-flex column ">
                      <label htmlFor="precio">Precio</label>
                      <input
                        onChange={handleInputChange}
                        type="number"
                        id="precio"
                        name="precio"
                        value={nuevoPedido.precio}
                        required
                      />
                    </div>
                    <div className="d-flex column ">
                      <label className="mx-2" htmlFor="estado_pedido ">
                        Estado del pedido
                      </label>
                      <select
                        onChange={handleInputChange}
                        className="mx-2"
                        type="text"
                        id="estado_pedido"
                        name="estado_pedido"
                        value={nuevoPedido.estado_pedido}
                        required
                      >
                        <option value="entregado">entregado</option>
                        <option value="en proceso">en proceso</option>
                      </select>
                    </div>
                  </div>
                </form>
                <button
                  onClick={() => handleAddOrder()}
                  className="button-form btn btn-primary mt-5"
                >
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
          )} */}
        </div>
      </div>
    </>
  );
};

export default Quote;
