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
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a
                className="nav-link active text-light"
                aria-current="page"
                href="#"
              >
                Inicio
              </a>
              <a className="nav-link" href="#"></a>
              <Link className="nav-link text-light" to={"/ofertas"}>
                Ofertas
              </Link>
              <a className="nav-link text-light" href="#">
                Catalogo
              </a>
              <a className="nav-link text-light" href="#" aria-current="true">
                Contactanos
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
