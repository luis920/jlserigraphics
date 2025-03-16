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
    direccion: "",
    telefono: "",
  });

  const Clients = [
    {
      nombre: "Juan Ramirez",
      direccion: "calle 1 entre 2 y3 #200",
      telefono: "866-260-53-20",
    },
  ];

  useEffect(() => {
    actions.obtenerPedidos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoCliente({ ...nuevoCliente, [name]: value });
  };
  const handleAddClient = async (e) => {
    if (
      !nuevoCliente.nombre ||
      !nuevoCliente.direccion ||
      !nuevoCliente.telefono
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
      const result = await actions.agregarPedido(nuevoCliente);

      if (result) {
        Swal.fire({
          icon: "success",
          title: "Cliente Agregado",
          text: "Un nuevo cliente a sido agregado!",
        });
        actions.obtenerPedidos();
        setNuevoCliente({
          nombre: "",
          direccion: "",
          telefono: "",
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
                <th>Direccion</th>
                <th>Telefono</th>
                <th>Historial de pedidos</th>
              </tr>
            </thead>
            <tbody>
              {Clients.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.telefono}</td>
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

export default Clients;
