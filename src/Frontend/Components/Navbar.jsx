import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logotipo from "../img/nombrelogo.png";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-dark">
        <div className="container-fluid">
          {/* Contenedor flex para logo, toggle y icono de usuario */}
          <div className="d-flex justify-content-between w-100 align-items-center">
            <Link to={"/"} className="navbar-brand text-light">
              <img src={logotipo} alt="logo" className="logotipo" />
            </Link>

            {/* Botón toggle de menú solo visible en pantallas pequeñas */}
            <button
              className="navbar-toggler bg-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="true"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Icono de usuario fijo a la derecha solo en dispositivos pequeños */}
            <div className="d-lg-none">
              <Link to={"/iniciarsesion"}>
                <FontAwesomeIcon
                  className="icon-sesion fs-2 text-light"
                  icon={faUser}
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-link text-light" to={"/ofertas"}>
            Ofertas
          </Link>
          <Link className="nav-link text-light" to={"/catalogo"}>
            Catalogo
          </Link>
          <Link
            className="nav-link active text-light"
            aria-current="page"
            to={"/tallas"}
          >
            Guia de tallas
          </Link>
          <Link className="nav-link text-light" to={"/contactanos"}>
            Contactanos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
