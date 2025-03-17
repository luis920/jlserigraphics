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
    precio: "",
  });
  const pdfRef = useRef();

  useEffect(() => {
    actions.obtenerCotizaciones();
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
      const result = await actions.agregarCotizacion(nuevaCotizacion);

      if (result) {
        Swal.fire({
          icon: "success",
          title: "Cotización Generada",
          text: "¡Una nueva cotización ha sido generada!",
        });
        actions.obtenerCotizaciones();
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

  const generatePDF = async () => {
    const content = pdfRef.current;
    const pdfBlob = await html2pdf()
      .set({
        margin: 10,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(content)
      .outputPdf("blob");

    const formData = new FormData();
    formData.append("nombre_del_cliente", nuevaCotizacion.nombre_del_cliente);
    formData.append("direccion_cliente", nuevaCotizacion.direccion_cliente);
    formData.append("telefono_cliente", nuevaCotizacion.telefono_cliente);
    formData.append("tipo_de_prenda", nuevaCotizacion.tipo_de_prenda);
    formData.append("cantidad_piezas", nuevaCotizacion.cantidad_piezas);
    formData.append("precio", nuevaCotizacion.precio);
    formData.append(
      "pdf",
      pdfBlob,
      `Cotizacion-${nuevaCotizacion.nombre_del_cliente}.pdf`
    );

    try {
      const response = await fetch("http://localhost:5000/guardar_cotizacion", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        Swal.fire("Éxito", "Cotización guardada correctamente", "success");
      } else {
        Swal.fire("Error", "No se pudo guardar la cotización", "error");
      }
    } catch (error) {
      console.error("Error al guardar la cotización:", error);
      Swal.fire("Error", "Hubo un problema al guardar la cotización", "error");
    }
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
                <th>Descargar</th>
              </tr>
            </thead>
            <tbody>
              {store.cotizaciones.map((cotizacion) => (
                <tr key={cotizacion.id}>
                  <td>{cotizacion.id}</td>
                  <td>{cotizacion.nombre_del_cliente}</td>

                  <td>
                    <button
                      className="Btn"
                      onClick={() => generatePDF(cotizacion)}
                    >
                      <svg
                        className="svgIcon"
                        viewBox="0 0 384 512"
                        height="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                      </svg>
                      <span className="icon2"></span>
                      <span className="tooltip">Download</span>
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
              <label>Precio</label>
              <input
                type="text"
                name="precio"
                value={nuevaCotizacion.precio}
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

      <div style={{ display: "none" }}>
        <div ref={pdfRef}>
          <h2>Cotización</h2>
          <p>Nombre del Cliente: {store.nombre_del_cliente}</p>
          <p>Dirección: {store.direccion_cliente}</p>
          <p>Teléfono: {store.telefono_cliente}</p>
          <p>Tipo de Prenda: {store.tipo_de_prenda}</p>
          <p>Cantidad de Piezas: {store.cantidad_piezas}</p>
          <p>Precio: {store.precio}</p>
          <p>Subtotal: {store.subtotal}</p>
          <p>Total: {store.total}</p>
        </div>
      </div>
    </div>
  );
};

export default Quote;
