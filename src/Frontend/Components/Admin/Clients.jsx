import Sidebar from "./Sidebar";
import "../../Styles/Orders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { Context } from "../../Store/appContext.jsx";

const Clients = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
  });

  useEffect(() => {
    actions.obtenerPedidos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoPedido({ ...nuevoPedido, [name]: value });
  };
  const handleAddClient = async (e) => {
    if (
      !nuevoPedido.nombre ||
      !nuevoPedido.telefono ||
      !nuevoPedido.direccion
    ) {
      Swal.fire("Error", "Por favor, completa todos los campos", "error");
      return;
    }

    const confirmSubmit = await Swal.fire({
      title: "Estas seguro?",
      text: "Quieres agregar un nuevo cliente?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, agregar!",
      cancelButtonText: "No, cancelar",
    });

    if (!confirmSubmit.isConfirmed) {
      return;
    }

    try {
      const result = await actions.agregarPedido(nuevoPedido);

      if (result) {
        Swal.fire({
          icon: "success",
          title: "Cliente Agregado",
          text: "Un nuevo cliente a sido agregado!",
        });
        actions.obtenerPedidos();
        setNuevoPedido({
          nombre: "",
          telefono: "",
          direccion: "",
        });
        setShowModal(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `ah ocurrido un error: ${result.error}`,
        });
      }
    } catch (error) {
      console.error("Error en handleAddClient:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: "ah ocurrido un error al enviar el formulario,porfavor intente de nuevo.",
      });
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5 mx-4">
        <div className="mb-4">
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            <FontAwesomeIcon
              className="icon-sidebar text-light"
              icon={faPlus}
            />
            Agregar nuevo cliente
          </button>
        </div>

        {/* Tabla de clientes */}
        <div className="table-responsive">
          <h1 className="text-light">Clientes</h1>
          <table className="table table-bordered bg-light">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre del Cliente</th>
                <th>Telefono</th>
                <th>Direccion</th>
                <th>Historial de pedidos</th>
              </tr>
            </thead>
            <tbody>
              {store.clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.direccion}</td>
                  <td>
                    <button>ver</button>
                  </td>
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

export default Clients;
