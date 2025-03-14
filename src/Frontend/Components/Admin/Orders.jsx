import Sidebar from "./Sidebar";
import "../../Styles/Orders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Orders = () => {
  const [filtro, setFiltro] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [nuevoPedido, setNuevoPedido] = useState({
    cliente: "",
    tipo_prenda: "",
    cantidad: "",
    fecha_entrega: "",
    precio: "",
    estado_pedido: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setNuevoPedido({ ...nuevoPedido, [name]: value });
  };
  const handleAddOrder = async () => {
    // Validación básica de los campos
    if (
      !nuevoPedido.cliente ||
      !nuevoPedido.tipo_prenda ||
      !nuevoPedido.cantidad ||
      !nuevoPedido.fecha_entrega ||
      !nuevoPedido.precio ||
      !nuevoPedido.estado_pedido
    ) {
      Swal.fire("Error", "Por favor, completa todos los campos", "error");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/pedido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoPedido),
      });

      if (response.ok) {
        const data = await response.json();
        // Si la respuesta es exitosa, puedes mostrar una alerta
        Swal.fire("Éxito", "Pedido agregado correctamente", "success");

        // Cerrar el modal
        setShowModal(false);

        // Limpiar el formulario
        setNuevoPedido({
          cliente: "",
          tipo_prenda: "",
          cantidad: "",
          fecha_entrega: "",
          precio: "",
          estado_pedido: "",
        });
      } else {
        // Si la respuesta no es exitosa, mostrar un mensaje de error
        Swal.fire("Error", "Hubo un problema al agregar el pedido", "error");
      }
    } catch (error) {
      // Manejo de errores en caso de fallo en la solicitud
      console.error("Error al agregar el pedido:", error);
      Swal.fire("Error", "Hubo un error al conectar con el servidor", "error");
    }
  };

  const obtenerPedidos = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/pedidos", {});
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error("Error al obtener pedidos:", response.status);
      }
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchPedidos = async () => {
      const data = await obtenerPedidos();
      if (data) setPedidos(data);
    };

    fetchPedidos();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // const data = [
  //   {
  //     id: 1,
  //     nombre_cliente: "Juan Garcia",
  //     tipo_prenda: "Playera algodon",
  //     cantidad_piezas: 35,
  //     fecha_entrega: "12-Abril-2025",
  //     costo: 130,
  //     total: 4550,
  //     estado_pedido: "entregado",
  //   },
  //   {
  //     id: 2,
  //     nombre_cliente: "Mario Perez",
  //     tipo_prenda: "Playera dryfit",
  //     cantidad_piezas: 20,
  //     fecha_entrega: "13-Abril-2025",
  //     costo: 150,
  //     total: 3000,
  //     estado_pedido: "en proceso",
  //   },
  //   {
  //     id: 3,
  //     nombre_cliente: "David Garcia",
  //     tipo_prenda: "Camisa manga larga",
  //     cantidad_piezas: 15,
  //     fecha_entrega: "14-Abril-2025",
  //     costo: 450,
  //     total: 6750,
  //     estado_pedido: "en proceso",
  //   },
  //   {
  //     id: 4,
  //     nombre_cliente: "Antonio Gaytan",
  //     tipo_prenda: "Playera de algodon",
  //     cantidad_piezas: 50,
  //     fecha_entrega: "15-Abril-2025",
  //     costo: 125,
  //     total: 6250,
  //     estado_pedido: "en proceso",
  //   },
  // ];

  const pedidosFiltrados =
    filtro === ""
      ? pedidos
      : pedidos.filter(
          (
            pedido // Aquí usas "pedido", no "pedidos"
          ) =>
            filtro === "pendientes"
              ? pedido.estado_pedido !== "entregado" // Aquí también debe ser "pedido"
              : pedido.estado_pedido === "entregado"
        );

  const titulo =
    filtro === "pendientes"
      ? "Pedidos pendientes"
      : filtro === "entregados"
      ? "Pedidos entregados"
      : "Historial de pedidos";

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5 mx-4">
        <div className="d-flex  gap-2 mb-4">
          <button
            className="order-btn w-50"
            onClick={() => setFiltro("pendientes")}
          >
            <span className="order-shadow"></span>
            <span className="order-edge"></span>
            <span className="order-front order-text">Pedidos pendientes</span>
          </button>
          <button
            className="order-btn w-50"
            onClick={() => setFiltro("entregados")}
          >
            <span className="order-shadow"></span>
            <span className="order-edge"></span>
            <span className="order-front order-text">Pedidos entregados</span>
          </button>
        </div>

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
          <h1 className="text-light">{titulo}</h1>
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
            <tbody>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(filtro === "pendientes" || filtro === "entregados") && (
          <button
            className="btn btn-secondary mt-3"
            onClick={() => setFiltro("")}
          >
            Mostrar todos los pedidos
          </button>
        )}
      </div>
      <div>
        {showModal && (
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
        )}
      </div>
    </div>
  );
};

export default Orders;
