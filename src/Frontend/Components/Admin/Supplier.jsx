import Sidebar from "./Sidebar";
import "../../Styles/Buys.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { Context } from "../../Store/appContext.jsx";

const Supplier = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [editarProveedor, setEditarProveedor] = useState(null);
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre_del_proveedor: "",
    telefono: "",
    correo_electronico: "",
    suministros_otorgados: "",
  });

  useEffect(() => {
    actions.obtenerProveedores();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editarProveedor) {
      setNuevoProveedor({ ...nuevoProveedor, [name]: value });
    } else {
      setNuevoProveedor({ ...nuevoProveedor, [name]: value });
    }
  };

  const handleProveedor = async (e) => {
    e.preventDefault();

    if (
      !nuevoProveedor.nombre_del_proveedor ||
      !nuevoProveedor.telefono ||
      !nuevoProveedor.correo_electronico ||
      !nuevoProveedor.suministros_otorgados
    ) {
      Swal.fire("Error", "Por favor, completa todos los campos", "error");
      return;
    }

    const confirmSubmit = await Swal.fire({
      title: editarProveedor ? "¿Actualizar proveedor?" : "¿Agregar proveedor?",
      text: editarProveedor
        ? "Se actualizarán los datos del proveedor."
        : "Se agregará un nuevo proveedor.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: editarProveedor ? "Sí, actualizar" : "Sí, agregar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmSubmit.isConfirmed) return;

    try {
      let result;
      if (editarProveedor) {
        result = await actions.actualizarProveedor(
          editarProveedor.id,
          nuevoProveedor
        );
      } else {
        result = await actions.agregarProveedor(nuevoProveedor);
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
          title: editarProveedor
            ? "Proveedor actualizado"
            : "Proveedor agregado",
          text: editarProveedor
            ? "Los datos se han actualizado correctamente."
            : "¡Un nuevo proveedor ha sido agregado!",
        });

        actions.obtenerProveedores();
        setNuevoProveedor({
          nombre_del_proveedor: "",
          telefono: "",
          correo_electronico: "",
          suministros_otorgados: "",
        });
        setEditarProveedor(null);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error en handleCompras:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al enviar el formulario. Intente nuevamente.",
      });
    }
  };

  const handleEliminarProveedor = async (id) => {
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
        const result = await actions.eliminarProveedor(id);

        if (result) {
          Swal.fire({
            icon: "success",
            title: "Proveedor eliminada",
            text: "El proveedor ha sido eliminada con éxito.",
          });
          actions.obtenerProveedores();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al eliminar el proveedor.",
          });
        }
      } catch (error) {
        console.error("Error en EliminarProveedor:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al intentar eliminar el proveedor. Intenta nuevamente.",
        });
      }
    }
  };

  const handleEditarProveedor = (proveedor) => {
    setEditarProveedor(proveedor);
    setNuevoProveedor(proveedor);
    setShowModal(true);
  };

  const handleOpenModal = () => {
    setEditarProveedor(null);
    setNuevoProveedor({
      nombre_del_proveedor: "",
      telefono: "",
      correo_electronico: "",
      suministros_otorgados: "",
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
            Agregar nuevo Proveedor
          </button>
        </div>

        {/* Tabla de pedidos */}
        <div className="table-responsive">
          <h1 className="text-light">Proveedores disponibles</h1>
          <table className="table table-bordered bg-light">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Proveedor</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Productos que suministra</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {store.proveedores.map((proveedor) => (
                <tr key={proveedor.id}>
                  <td>{proveedor.id}</td>
                  <td>{proveedor.nombre_del_proveedor}</td>
                  <td>{proveedor.telefono}</td>
                  <td>{proveedor.correo}</td>
                  <td>${proveedor.suministros_otorgados}</td>

                  <td>
                    <button
                      className="Btn"
                      onClick={() => handleEditarProveedor(proveedor.id)}
                    >
                      <FontAwesomeIcon
                        className="icon-actions-pen"
                        icon={faPencil}
                      />
                    </button>
                    <button
                      className="Btn"
                      onClick={() => handleEliminarProveedor(proveedor.id)}
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
              <h2 className="">Nuevo Proveedor</h2>
              <form className="contacto-formulario " onSubmit={handleProveedor}>
                <div className="d-flex">
                  <div className="d-flex column ">
                    <label htmlFor="nombre_del_proveedor">
                      nombre del proveedor
                    </label>
                    <input
                      onChange={handleInputChange}
                      type="text"
                      id="nombre_del_proveedor"
                      name="nombre_del_proveedor"
                      value={nuevoProveedor.nombre_del_proveedor}
                      required
                    />
                  </div>
                  <div className="d-flex column ">
                    <label className="mx-2" htmlFor="telefono ">
                      Telefono
                    </label>
                    <input
                      onChange={handleInputChange}
                      className="mx-2"
                      type="text"
                      id="telefono"
                      name="telefono"
                      value={nuevoProveedor.telefono}
                      required
                    />
                  </div>
                </div>
                <div className="d-flex">
                  <div className="d-flex column ">
                    <label htmlFor="correo_electronico">Correo</label>
                    <input
                      onChange={handleInputChange}
                      type="mail"
                      id="correo_electronico"
                      name="correo_electronico"
                      value={nuevoProveedor.correo_electronico}
                      required
                    />
                  </div>
                  <div className="d-flex column ">
                    <label className="mx-2" htmlFor="suministros_otorgados ">
                      Producto suministrado
                    </label>
                    <input
                      onChange={handleInputChange}
                      className="mx-2"
                      type="text"
                      id="suministros_otorgados"
                      name="suministros_otorgados"
                      value={nuevoProveedor.suministros_otorgados}
                      required
                    />
                  </div>
                </div>

                <div className="d-flex">
                  <button
                    type="submit"
                    className="button-form btn btn-primary w-50 "
                  >
                    {editarProveedor ? "Actualizar" : "Agregar"}
                  </button>
                  <button
                    type="button"
                    className="button-form btn btn-secondary w-50 "
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Supplier;
