import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logotipo from "../img/nombrelogo.png";
import { useContext } from "react";
import { Context } from "../Store/appContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const usuarioLogueado = store.usuario && store.token;

  const handleLogout = () => {
    actions.cerrarSesion();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-dark">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand text-light">
          <img src={logotipo} alt="logo" className="logotipo" />
        </Link>

        {!usuarioLogueado && (
          <>
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

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-link text-light" to={"/ofertas"}>
                  Ofertas
                </Link>
                <Link className="nav-link text-light" to={"/catalogo"}>
                  Catálogo
                </Link>
                <Link className="nav-link text-light" to={"/tallas"}>
                  Guía de tallas
                </Link>
                <Link className="nav-link text-light" to={"/contactanos"}>
                  Contáctanos
                </Link>
              </div>
            </div>
          </>
        )}

        <div className="d-flex">
          {usuarioLogueado ? (
            <div className="d-flex align-items-center gap-3">
              <span className="text-light fw-bold">
                Bienvenido, {store.usuario.nombre_completo || "Usuario"}
              </span>
              <button className="btn btn-danger" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link to={"/iniciarsesion"}>
              <FontAwesomeIcon className="icon-sesion" icon={faUser} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
