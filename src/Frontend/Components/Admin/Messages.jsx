import Sidebar from "./Sidebar";
import Navbar from "../Navbar.jsx";
import "../../Styles/Message.css";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Store/appContext.jsx";
import emailjs from "@emailjs/browser";

const Messages = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [destinatario, setDestinatario] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    actions.obtenerMensajesContactanos();
  }, []);

  const handleEnviarEmail = () => {
    console.log("Correo destinatario:", destinatario);

    if (!destinatario || destinatario.trim() === "") {
      alert("El correo destinatario está vacío.");
      return;
    }

    emailjs
      .send(
        "service_9mrx7p7",
        "template_qhpzb5s",
        {
          user_email: destinatario,
          message: mensaje,
        },
        "DXp2MF0wEeq9kKBK2"
      )
      .then(
        (result) => {
          alert("Mensaje enviado correctamente");
          setShowModal(false);
          setMensaje("");
        },
        (error) => {
          alert("Error al enviar el mensaje");
          console.log(error);
        }
      );
  };

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="container">
          <h1 className="text-center text-light mx-5 ">Mensajes recibidos</h1>
          <div className="row">
            {store.contactanos.map((mensaje) => (
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
                  <p className="message">{mensaje.correo}</p>
                  <div className="actions-message">
                    <a className="read-message" href="">
                      {mensaje.mensaje}
                    </a>
                    <a
                      className="mark-as-read"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(
                          "Correo del destinatario al hacer clic:",
                          mensaje.correo
                        );
                        setDestinatario(mensaje.correo);
                        setShowModal(true);
                      }}
                    >
                      responder
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content p-4 bg-dark text-light rounded">
                <h5>Responder mensaje</h5>
                <p>
                  <strong>Para:</strong> {destinatario}
                </p>
                <textarea
                  className="form-control my-3"
                  rows="5"
                  placeholder="Escribe tu respuesta aquí..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                ></textarea>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEnviarEmail(destinatario)}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Messages;
