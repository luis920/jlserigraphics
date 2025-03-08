import { useState } from "react";
import "../Styles/ContactUs.css";
import Mapa from "../Components/Map.jsx";

const ContactUs = () => {
  const [showModal, SetShowModal] = useState(false);
  const handleOpenModal = () => {
    SetShowModal(true);
  };
  const handleCloseModal = () => {
    SetShowModal(false);
  };

  return (
    <div className="d-flex">
      <div className="contactanos-container">
        <h1 className="text-light text-center">Contactanos</h1>
        <hr className="hr-contactanos" />
        <h1 className="mx-5 text-light fw-bold">JL Serigraphics</h1>
        <p className=" p-contactanos mx-5">
          Calle 18 #1510 colonia Emiliano Zapata, Monclova, Coahuila
        </p>
        <br />
        <p className="text-light mx-5">jlserigraphics@gmail.com</p>
        <p className="text-light mx-5">+52 866 642 76 50</p>
        <h2 className="fw-bold text-light mx-5">Horario</h2>
        <p className="p-contactanos mx-5">
          Lunes a viernes de 9 am a 6pm <br />
          Sabados de 9 am a 2pm{" "}
        </p>
        <button className=" button mx-5" onClick={() => handleOpenModal()}>
          Enviar Email
        </button>
      </div>
      <div>
        {showModal && (
          <div className={`modal-container ${showModal ? "show" : ""}`}>
            <div className="modal-content">
              <h2 className="">Formulario de Contacto</h2>
              <form className="contacto-formulario ">
                <div className="d-flex column ">
                  <label htmlFor="name">Nombre:</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="d-flex column ">
                  <label htmlFor="email ">Correo:</label>
                  <input
                    className="my-2"
                    type="email"
                    id="email"
                    name="email"
                    required
                  />
                </div>
                <div className="d-flex column  ">
                  <label htmlFor="message">Mensaje:</label>
                  <textarea
                    className=""
                    id="message"
                    name="message"
                    required
                  ></textarea>
                </div>
              </form>
              <button className="button-form btn btn-primary mt-5">
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

      <Mapa />
    </div>
  );
};
export default ContactUs;
