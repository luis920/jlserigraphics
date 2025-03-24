import Sidebar from "./Sidebar";
import "../../Styles/Orders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { Context } from "../../Store/appContext.jsx";

const Messages = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.obtenerMensajes();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5 mx-4">
        <div className="mb-4">
          <button className="btn btn-primary">
            <FontAwesomeIcon
              className="icon-sidebar text-light"
              icon={faPlus}
            />
          </button>
        </div>

        {/* Tabla de clientes */}
        <div className="table-responsive">
          <h1 className="text-light">Historial de mensajes</h1>
          <table className="table table-bordered bg-light">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {store.clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        {showModal && (
          <div className={`modal-container ${showModal ? "show" : ""}`}>
            <div className="modal-content">
              <h2 className="">Nuevo Cliente</h2>
              <form className="contacto-formulario ">
                <div className="d-flex column ">
                  <label htmlFor="nombre">Nombre del cliente</label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={nuevoCliente.nombre}
                    required
                  />
                </div>
                <div className="d-flex column ">
                  <label className="mx-2" htmlFor="tipo_prenda ">
                    Direccion
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={nuevoCliente.direccion}
                    required
                  />
                </div>

                <div className="d-flex column ">
                  <label htmlFor="telefono">Telefono</label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={nuevoCliente.telefono}
                    required
                  />
                </div>
              </form>
              <button
                onClick={() => handleAddClient()}
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
        )}
      </div>
    </div>
  );
};

export default Messages;
