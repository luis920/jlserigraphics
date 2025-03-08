import "../Styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-dark">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand text-light">
            Navbar
          </Link>
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
          <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
            <div className="navbar-nav  ">
              <Link className="nav-link text-light" to={"/ofertas"}>
                Ofertas
              </Link>
              <Link className="nav-link text-light" to={"/catalogo"}>
                Catalogo
              </Link>
              <Link
                className="nav-link active text-light "
                aria-current="page"
                to={"/tallas"}
              >
                Guia de tallas
              </Link>
              <Link
                className="nav-link text-light"
                to={"/contactanos"}
                aria-current="true"
              >
                Contactanos
              </Link>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <Link to={"/iniciarsesion"}>
            <button className="btn-login">
              <strong>Login</strong>
            </button>
          </Link>

          <button className="btn-login">
            <strong>Register </strong>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
