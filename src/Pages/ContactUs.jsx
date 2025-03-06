import { useState } from "react";
import map from "../img/serigrafia1.jpg";
import "../Styles/ContactUs.css";

const ContactUs = () => {
  const [showModal, SetShowModal] = useState(false);
  const handleOpenModal = () => {
    SetShowModal(true);
  };
  const handleCloseModal = () => {
    SetShowModal(false);
  };

  return (
    <div>
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
          <div>
            <div>
              <h2>Formulario de Contacto</h2>
              <form>
                <div>
                  <label htmlFor="name">Nombre:</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div>
                  <label htmlFor="email">Correo electrónico:</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div>
                  <label htmlFor="message">Mensaje:</label>
                  <textarea id="message" name="message" required></textarea>
                </div>
              </form>
              <button className=" btn-primary">Enviar</button>
              <button
                className="btn-secondary"
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
export default ContactUs;
