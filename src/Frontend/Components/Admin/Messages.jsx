import Sidebar from "./Sidebar";
import Navbar from "../Navbar.jsx";
import "../../Styles/Message.css";
import React, { useContext, useEffect } from "react";
import { Context } from "../../Store/appContext.jsx";

const Messages = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.obtenerMensajes();
  }, []);

  // const messages = [
  //   {
  //     id: 1,
  //     nombre: "Juan Ramirez",
  //     email: "prueba1@hotmail.com",
  //     mensaje: "informes sobre impresion de playeras de algodon",
  //     fecha: "21 / feb / 2025",
  //   },
  //   {
  //     id: 2,
  //     nombre: "Juan Ramirez",
  //     email: "prueba2@hotmail.com",
  //     mensaje: "informes sobre sobre bordado en camisa",
  //     fecha: "21 / feb / 2025",
  //   },
  //   {
  //     id: 3,
  //     nombre: "Juan Ramirez",
  //     email: "prueba3@hotmail.com",
  //     mensaje: "me interesa bordar unas gorras con mi logo",
  //     fecha: "21 / feb / 2025",
  //   },
  //   {
  //     id: 1,
  //     nombre: "Juan Ramirez",
  //     email: "prueba1@hotmail.com",
  //     mensaje: "informes sobre impresion de playeras de algodon",
  //     fecha: "21 / feb / 2025",
  //   },
  //   {
  //     id: 2,
  //     nombre: "Juan Ramirez",
  //     email: "prueba2@hotmail.com",
  //     mensaje: "informes sobre sobre bordado en camisa ",
  //     fecha: "21 / feb / 2025",
  //   },
  //   {
  //     id: 3,
  //     nombre: "Juan Ramirez",
  //     email: "prueba3@hotmail.com",
  //     mensaje: "me interesa bordar unas gorras con mi logo",
  //     fecha: "21 / feb / 2025",
  //   },
  // ];

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="container">
          <h1 className="text-center text-light mx-5">Historial de mensajes</h1>
          <div className="row">
            {store.mensajes.map((mensaje) => (
              <div className="col-md-4 mb-4 " key={mensaje.id}>
                <div className="card-message p-3">
                  <div className="header-message">
                    <span className="icon-message">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <p className="alert-message">Nuevo mensaje! </p>
                  </div>
                  <div className="text-light d-flex">
                    <p className="text-light mx-2">
                      <strong className="nombre-mensaje">
                        {mensaje.nombre}
                      </strong>
                    </p>
                    <p className="fecha-mensaje">{mensaje.fecha}</p>
                  </div>
                  <p className="message">{mensaje.email}</p>
                  <div className="actions-message">
                    <a className="read-message" href="">
                      {mensaje.mensaje}
                    </a>
                    <a className="mark-as-read" href="">
                      responder
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
