import Sidebar from "./Sidebar";
import "../../Styles/Orders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { Context } from "../../Store/appContext.jsx";

const Orders = () => {
  const { store, actions } = useContext(Context);
  const [filtro, setFiltro] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [nuevaCompra, setNuevaCompra] = useState({
    proveedor: "",
    fecha: "",
    producto: "",
    precio_unitario: "",
    cantidad: "",
    factura: "",
  });

  useEffect(() => {
    actions.obtenerPedidos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaCompra({ ...nuevaCompra, [name]: value });
  };
  const handleAddBuy = async (e) => {
    if (
      !nuevaCompra.proveedor ||
      !nuevaCompra.fecha ||
      !nuevaCompra.producto ||
      !nuevaCompra.precio_unitario ||
      !nuevaCompra.cantidad ||
      !nuevaCompra.factura
    ) {
      Swal.fire("Error", "Por favor, completa todos los campos", "error");
      return;
    }

    const confirmSubmit = await Swal.fire({
      title: "Estas seguro?",
      text: "Quieres agregar una nueva compra?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, agregar!",
      cancelButtonText: "No, cancelar",
    });

    if (!confirmSubmit.isConfirmed) {
      return;
    }

    try {
      const result = await actions.agregarCompra(nuevaCompra);

      if (result) {
        Swal.fire({
          icon: "success",
          title: "Compra Agregado",
          text: "Una nuevoa compra a sido agregado!",
        });
        actions.obtenerCompras();
        setNuevaCompra({
          proveedor: "",
          fecha: "",
          producto: "",
          precio_unitario: "",
          cantidad: "",
          factura: "",
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
      console.error("Error en handleAddBuy:", error);
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
            Agregar nuevo pedido
          </button>
        </div>

        {/* Tabla de pedidos */}
        <div className="table-responsive">
          <h1 className="text-light">Historial de compras</h1>
          <table className="table table-bordered bg-light">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Proveedor</th>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Precio unitario</th>
                <th>Cantidad</th>
                <th>Factura</th>
              </tr>
            </thead>
            <tbody>
              {store.compras.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.proveedor}</td>
                  <td>{pedido.fecha}</td>
                  <td>{pedido.producto}</td>
                  <td>{pedido.precio_unitario}</td>
                  <td>${pedido.cantidad}</td>
                  <td>${pedido.total}</td>
                  <td>${pedido.factura}</td>
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
              <h2 className="">Nueva Compra</h2>
              <form className="contacto-formulario ">
                <div className="d-flex">
                  <div className="d-flex column ">
                    <label htmlFor="proveedor">Proveedor</label>
                    <input
                      onChange={handleInputChange}
                      type="text"
                      id="proveedor"
                      name="proveedor"
                      value={nuevaCompra.proveedor}
                      required
                    />
                  </div>
                  <div className="d-flex column ">
                    <label className="mx-2" htmlFor="fecha ">
                      Fecha
                    </label>
                    <input
                      onChange={handleInputChange}
                      className="mx-2"
                      type="date"
                      id="fecha"
                      name="fecha"
                      value={nuevaCompra.fecha}
                      required
                    />
                  </div>
                </div>
                <div className="d-flex">
                  <div className="d-flex column ">
                    <label htmlFor="producto">Producto</label>
                    <input
                      onChange={handleInputChange}
                      type="text"
                      id="producto"
                      name="producto"
                      value={nuevaCompra.producto}
                      required
                    />
                  </div>
                  <div className="d-flex column ">
                    <label className="mx-2" htmlFor="precio_unitario ">
                      Precio unitario
                    </label>
                    <input
                      onChange={handleInputChange}
                      className="mx-2"
                      type="number"
                      id="precio_unitario"
                      name="precio_unitario"
                      value={nuevaCompra.precio_unitario}
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
                      value={nuevaCompra.cantidad}
                      required
                    />
                  </div>
                  <div className="d-flex column ">
                    <label className="mx-2" htmlFor="factura ">
                      Factura
                    </label>
                    <select
                      onChange={handleInputChange}
                      className="mx-2"
                      type="text"
                      id="factura"
                      name="factura"
                      value={nuevaCompra.factura}
                      required
                    >
                      <option value="entregado">Selecciona una opcion</option>
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
        )}
      </div>
    </div>
  );
};

export default Orders;
