import Sidebar from "./Sidebar";
import "../../Styles/Buys.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { Context } from "../../Store/appContext.jsx";

const Buys = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [editingBuy, setEditingBuy] = useState(null);
  const [nuevaCompra, setNuevaCompra] = useState({
    proveedor: "",
    fecha: "",
    producto: "",
    precio_unitario: "",
    cantidad: "",
    factura: "",
  });

  useEffect(() => {
    actions.obtenerCompras();
  }, []);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNuevaCompra({ ...nuevaCompra, [name]: value });
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingBuy) {
      setNuevaCompra({ ...nuevaCompra, [name]: value });
    } else {
      setNuevaCompra({ ...nuevaCompra, [name]: value });
    }
  };
  // const handleAddBuy = async (e) => {
  //   if (
  //     !nuevaCompra.proveedor ||
  //     !nuevaCompra.fecha ||
  //     !nuevaCompra.producto ||
  //     !nuevaCompra.precio_unitario ||
  //     !nuevaCompra.cantidad ||
  //     !nuevaCompra.factura
  //   ) {
  //     Swal.fire("Error", "Por favor, completa todos los campos", "error");
  //     return;
  //   }

  //   const confirmSubmit = await Swal.fire({
  //     title: "Estas seguro?",
  //     text: "Quieres agregar una nueva compra?",
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonText: "Si, agregar!",
  //     cancelButtonText: "No, cancelar",
  //   });

  //   if (!confirmSubmit.isConfirmed) {
  //     return;
  //   }

  //   try {
  //     const result = await actions.agregarCompra(nuevaCompra);

  //     if (result) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Compra Agregado",
  //         text: "Una nuevoa compra a sido agregado!",
  //       });
  //       actions.obtenerCompras();
  //       setNuevaCompra({
  //         proveedor: "",
  //         fecha: "",
  //         producto: "",
  //         precio_unitario: "",
  //         cantidad: "",
  //         factura: "",
  //       });
  //       setShowModal(false);
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: `ah ocurrido un error: ${result.error}`,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error en handleAddBuy:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Submission Error",
  //       text: "ah ocurrido un error al enviar el formulario,porfavor intente de nuevo.",
  //     });
  //   }
  // };
  const handleSaveBuy = async (e) => {
    e.preventDefault();

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
      title: editingBuy ? "¿Actualizar compra?" : "¿Agregar compra?",
      text: editingBuy
        ? "Se actualizarán los datos de la compra."
        : "Se agregará una nueva compra.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: editingBuy ? "Sí, actualizar" : "Sí, agregar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmSubmit.isConfirmed) return;

    try {
      let result;
      if (editingBuy) {
        result = await actions.actualizarCompra(editingBuy.id, nuevaCompra);
      } else {
        result = await actions.agregarCompra(nuevaCompra);
      }

      if (result?.error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Ha ocurrido un error: ${result.error}`,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: editingBuy ? "Compra actualizada" : "Compra agregada",
          text: editingBuy
            ? "Los datos se han actualizado correctamente."
            : "¡Una nueva compra ha sido agregada!",
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
        setEditingBuy(null);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error en handleSaveBuy:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al enviar el formulario. Intente nuevamente.",
      });
    }
  };

  const handleDeleteBuy = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const result = await actions.eliminarCompra(id);

        if (result) {
          Swal.fire({
            icon: "success",
            title: "Compra eliminada",
            text: "La compra ha sido eliminada con éxito.",
          });
          actions.obtenerCompras();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al eliminar la compra.",
          });
        }
      } catch (error) {
        console.error("Error en handleDeleteBuy:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al intentar eliminar la compra. Intenta nuevamente.",
        });
      }
    }
  };

  const handleEditBuy = (compra) => {
    setEditingBuy(compra);
    setNuevaCompra(compra);
    setShowModal(true);
  };

  // const handleUpdateBuy = async (e) => {
  //   e.preventDefault();
  //   await actions.actualizarCompra(editingBuy.id, editingBuy);
  //   setShowModal(false);
  //   setEditingBuy(null);
  // };

  const handleOpenModal = () => {
    setEditingBuy(null); // Asegurar que no está editando
    setNuevaCompra({
      proveedor: "",
      fecha: "",
      producto: "",
      precio_unitario: "",
      cantidad: "",
      factura: "",
    });
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
            Agregar nueva compra
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
                <th>Total</th>
                <th>Factura</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {store.compras.map((compra) => (
                <tr key={compra.id}>
                  <td>{compra.id}</td>
                  <td>{compra.proveedor}</td>
                  <td>{compra.fecha}</td>
                  <td>{compra.producto}</td>
                  <td>${compra.precio_unitario}</td>
                  <td>{compra.cantidad}</td>
                  <td>${compra.total}</td>
                  <td>{compra.factura}</td>
                  <td>
                    <button
                      className="Btn"
                      onClick={() => handleEditBuy(compra)}
                    >
                      <FontAwesomeIcon
                        className="icon-actions-pen"
                        icon={faPencil}
                      />
                    </button>
                    <button
                      className="Btn"
                      onClick={() => handleDeleteBuy(compra.id)}
                    >
                      <FontAwesomeIcon
                        className="icon-actions-trash"
                        icon={faTrash}
                      />
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
              <h2 className="">Nueva Compra</h2>
              <form className="contacto-formulario " onSubmit={handleSaveBuy}>
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
                      <option value="Selecciona una opcion">
                        Selecciona una opcion
                      </option>
                      <option value="entregado">entregado</option>
                      <option value="en proceso">en proceso</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="button-form btn btn-primary mt-5"
                >
                  {editingBuy ? "Actualizar" : "Agregar"}
                </button>
                <button
                  type="button"
                  className="button-form btn btn-secondary mt-2"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buys;
