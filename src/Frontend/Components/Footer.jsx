import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebook,
  faSquareInstagram,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "../Styles/Footer.css";
const Footer = () => {
  return (
    <>
      <hr className="mt-5" />
      <footer className=" text-dark py-4">
        <div className="container">
          <div className="row col-md-12 mx-5">
            <div className="col-12 col-md-4 ">
              <h5 className=" title-footer text-center presentacion-container ">
                JL SERIGRAPHICS
              </h5>
              <p className="text-light text-center">
                Tu aliado en serigrafía y bordado de alta calidad. Con más de 5
                años de experiencia, ofrecemos productos personalizados para
                todo tipo de proyectos.
              </p>
            </div>

            <div className="col-12 col-md-4 contacto-container">
              <h5 className=" title-footer text-center ">CONTACTO</h5>
              <ul className="list-unstyled text-center text-light">
                <li>
                  <strong>Dirección:</strong> Calle 18 #1510 col.Emiliano Zapata
                </li>
                <li>
                  <strong>Teléfono:</strong> (866) 642-7650
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:jlserigraphics@gmail.com"
                    className=" text-decoration-none"
                  >
                    jlserigraphics@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-4 redes-container ">
              <h5 className=" title-footer text-center mx-1 ">
                REDES SOCIALES
              </h5>

              <ul className="list-inline text-center">
                <li className="list-inline-item">
                  <a
                    href="https://facebook.com/jlserigraphics"
                    className="text-decoration-none"
                  >
                    <FontAwesomeIcon
                      className="icon-sidebar text-light"
                      icon={faFacebook}
                    />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://instagram.com/jlserigraphics"
                    className=" text-decoration-none"
                  >
                    <FontAwesomeIcon
                      className="icon-sidebar text-light "
                      icon={faSquareInstagram}
                    />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://twitter.com/jlserigraphics"
                    className=" text-decoration-none"
                  >
                    <FontAwesomeIcon
                      className="icon-sidebar text-light"
                      icon={faSquareXTwitter}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-light" />

          <div className="text-center text-light">
            <p>&copy; 2025 JL Serigraphics. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
