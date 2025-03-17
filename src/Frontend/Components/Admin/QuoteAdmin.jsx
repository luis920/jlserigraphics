import Sidebar from "./Sidebar.jsx";
import "../../Styles/QuoteAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useContext, useRef } from "react";
import Swal from "sweetalert2";
import { Context } from "../../Store/appContext.jsx";
import html2pdf from "html2pdf.js";

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
  const pdfRef = useRef(); // Referencia para el PDF

  const Quote = [
    {
      id: 1,
      nombre_del_cliente: "Juan Ramirez",
      direccion_cliente: "Calle 30 #1200",
      telefono_cliente: "123-456-789",
      tipo_de_prenda: "Algodón",
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
      title: "¿Estás seguro?",
      text: "¿Quieres generar una nueva cotización?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, generar!",
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
          title: "Cotización Generada",
          text: "¡Una nueva cotización ha sido generada!",
        });
        actions.obtenerClientes();
        setNuevaCotizacion({
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
          text: `Ha ocurrido un error: ${result.error}`,
        });
      }
    } catch (error) {
      console.error("Error en handleGenerateQuote:", error);
      Swal.fire({
        icon: "error",
        title: "Error de Envío",
        text: "Ha ocurrido un error al enviar el formulario. Intente de nuevo.",
      });
    }
  };

  const generatePDF = (cotizacion) => {
    const content = pdfRef.current;
    html2pdf()
      .set({
        margin: 10,
        filename: `Cotizacion-${cotizacion.nombre_del_cliente}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(content)
      .save();
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5 mx-4">
        <div className="mb-4">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <FontAwesomeIcon
              className="icon-sidebar text-light"
              icon={faPlus}
            />
            Generar nueva cotización
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
                <th>Dirección</th>
                <th>Teléfono</th>
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
                    <button class="Btn" onClick={() => generatePDF(cotizacion)}>
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

      {/* Modal para crear nueva cotización */}
      {showModal && (
        <div className="modal-container show">
          <div className="modal-content">
            <h2>Nueva Cotización</h2>
            <form className="contacto-formulario">
              <label>Nombre del cliente</label>
              <input
                type="text"
                name="nombre_del_cliente"
                value={nuevaCotizacion.nombre_del_cliente}
                onChange={handleInputChange}
                required
              />

              <label>Dirección</label>
              <input
                type="text"
                name="direccion_cliente"
                value={nuevaCotizacion.direccion_cliente}
                onChange={handleInputChange}
              />

              <label>Teléfono</label>
              <input
                type="text"
                name="telefono_cliente"
                value={nuevaCotizacion.telefono_cliente}
                onChange={handleInputChange}
                required
              />

              <label>Tipo de prenda</label>
              <input
                type="text"
                name="tipo_de_prenda"
                value={nuevaCotizacion.tipo_de_prenda}
                onChange={handleInputChange}
                required
              />

              <label>Cantidad de piezas</label>
              <input
                type="number"
                name="cantidad_piezas"
                value={nuevaCotizacion.cantidad_piezas}
                onChange={handleInputChange}
                required
              />
            </form>

            <button
              className="btn btn-primary mt-5"
              onClick={handleGenerateQuote}
            >
              Enviar
            </button>
            <button
              className="btn btn-secondary mt-2"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Contenedor oculto para generar el PDF */}
      {/* <div style={{ display: "none" }}>
        <div ref={pdfRef}>
          <h2>Cotización</h2>
          <p>Nombre del Cliente: {Quote[0]?.nombre_del_cliente}</p>
          <p>Dirección: {Quote[0]?.direccion_cliente}</p>
          <p>Teléfono: {Quote[0]?.telefono_cliente}</p>
          <p>Tipo de Prenda: {Quote[0]?.tipo_de_prenda}</p>
          <p>Cantidad de Piezas: {Quote[0]?.cantidad_piezas}</p>
        </div>
      </div> */}
    </div>
  );
};

export default Quote;
