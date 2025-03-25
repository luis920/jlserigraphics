import { Link } from "react-router-dom";
import "../Styles/Login.css";

const Login = () => {
  return (
    <div>
      <div id="form-ui">
        <form action="" method="post" id="form">
          <div id="form-body">
            <div id="welcome-lines">
              <div id="welcome-line-1">Bienvenido</div>
              <div id="welcome-line-2">
                porfavor introduce tus credenciales para iniciar sesion
              </div>
            </div>
            <div id="input-area">
              <div className="form-inp">
                <input placeholder="Email Address" type="text" />
              </div>
              <div className="form-inp">
                <input placeholder="Password" type="password" />
              </div>
            </div>
            <div id="submit-button-cvr">
              <button id="submit-button" type="submit">
                Login
              </button>
            </div>
            <div id="forgot-pass">
              <p className="text-light">
                No tienes cuenta?
                <Link to={"/registro"}>
                  <p>registrate aqui</p>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
