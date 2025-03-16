import Sidebar from "./Sidebar.jsx";
import "../../Styles/QuoteAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { Context } from "../../Store/appContext.jsx";

const Quote = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [nuevaCotizacion, setNuevaCotizacion] = useState({
    nombre_del_cliente: "",
    direccion_cliente: "",
    telefono_cliente: "",
    tipo_de_prenda: "",
    cantidad_piezas: "",
  });
  const Quote = [
    {
      nombre_del_cliente: "Juan Ramirez",
      direccion_cliente: "Calle 30 #1200",
      telefono_cliente: "123-456-789",
      tipo_de_prenda: "algodon",
      cantidad_piezas: "120",
    },
  ];
  useEffect(() => {
    actions.obtenerClientes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaCotizacion({ ...nuevaCotizacion, [name]: value });
  };
  const handleGenerateQuote = async (e) => {
    if (
      !nuevaCotizacion.nombre_del_cliente ||
      !nuevaCotizacion.direccion_cliente ||
      !nuevaCotizacion.telefono_cliente ||
      !nuevaCotizacion.tipo_de_prenda ||
      !nuevaCotizacion.cantidad_piezas
    ) {
      Swal.fire("Error", "Por favor, completa todos los campos", "error");
      return;
    }

    const confirmSubmit = await Swal.fire({
      title: "Estas seguro?",
      text: "Quieres generar una nueva cotizacion?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, generar!",
      cancelButtonText: "No, cancelar",
    });

    if (!confirmSubmit.isConfirmed) {
      return;
    }

    try {
      const result = await actions.agregarCliente(nuevaCotizacion);

      if (result) {
        Swal.fire({
          icon: "success",
          title: "Cotizacion Generada",
          text: "Una nueva cotizacion ah sido generada!",
        });
        actions.obtenerClientes();
        setNuevoCliente({
          nombre_del_cliente: "",
          direccion_cliente: "",
          telefono_cliente: "",
          tipo_de_prenda: "",
          cantidad_piezas: "",
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
      console.error("Error en handleGenerateQuote:", error);
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
            Generar nueva cotizacion
          </button>
        </div>

        {/* Tabla de clientes */}
        <div className="table-responsive">
          <h1 className="text-light">Historial de cotizaciones</h1>
          <table className="table table-bordered bg-light">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre del Cliente</th>
                <th>Direccion</th>
                <th>Telefono</th>
                <th>Tipo de prenda</th>
                <th>Cantidad de piezas</th>
                <th>Descargar</th>
              </tr>
            </thead>
            <tbody>
              {Quote.map((cotizacion) => (
                <tr key={cotizacion.id}>
                  <td>{cotizacion.id}</td>
                  <td>{cotizacion.nombre_del_cliente}</td>
                  <td>{cotizacion.direccion_cliente}</td>
                  <td>{cotizacion.telefono_cliente}</td>
                  <td>{cotizacion.tipo_de_prenda}</td>
                  <td>{cotizacion.cantidad_piezas}</td>
                  <td>
                    <button class="Btn">
                      <svg
                        class="svgIcon"
                        viewBox="0 0 384 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                      </svg>
                      <span class="icon2"></span>
                      <span class="tooltip">Download</span>
                    </button>
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
              <h2 className="">Nueva Cotizacion</h2>
              <form className="contacto-formulario ">
                <div className="d-flex column ">
                  <label htmlFor="nombre_del_cliente">Nombre del cliente</label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    id="nombre_del_cliente"
                    name="nombre_del_cliente"
                    value={nuevaCotizacion.nombre_del_cliente}
                    required
                  />
                </div>
                <div className="d-flex column ">
                  <label className="mx-2" htmlFor="direccion_cliente ">
                    Direccion
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    id="direccion_cliente"
                    name="direccion_cliente"
                    value={nuevaCotizacion.direccion_cliente}
                  />
                </div>

                <div className="d-flex column ">
                  <label htmlFor="telefono_cliente">Telefono</label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    id="telefono_cliente"
                    name="telefono_cliente"
                    value={nuevaCotizacion.telefono_cliente}
                    required
                  />
                </div>
                <div className="d-flex column ">
                  <label htmlFor="tipo_de_prenda">Tipo de prenda</label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    id="tipo_de_prenda"
                    name="tipo_de_prenda"
                    value={nuevaCotizacion.tipo_de_prenda}
                    required
                  />
                </div>
                <div className="d-flex column ">
                  <label htmlFor="cantidad_piezas">Cantidad de piezas</label>
                  <input
                    onChange={handleInputChange}
                    type="number"
                    id="cantidad_piezas"
                    name="cantidad_piezas"
                    value={nuevaCotizacion.cantidad_piezas}
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

export default Quote;
