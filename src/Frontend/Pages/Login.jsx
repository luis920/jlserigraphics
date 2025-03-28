import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Context } from "../Store/appContext.jsx";
import "../Styles/Login.css";

const Login = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      Swal.fire("Error", "Por favor completa todos los campos", "error");
      return;
    }

    try {
      const result = await actions.login(user.email, user.password);

      if (!result || !result.access_token || !result.usuario) {
        Swal.fire("Error", "Correo o contraseña incorrectos", "error");
        return;
      }

      const { rol } = result.usuario;

      Swal.fire({
        title: "¡Inicio de sesión exitoso!",
        text: "Redirigiendo...",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        if (rol.toLowerCase() === "admin") {
          navigate("/dashboard-admin/pedidos");
        } else if (rol.toLowerCase() === "cliente") {
          navigate("/dashboard-cliente/compras");
        } else {
          Swal.fire("Error", "Rol desconocido. Acceso denegado.", "error");
        }
      }, 1500);
    } catch (error) {
      console.error("Error en el login:", error);
      Swal.fire(
        "Error",
        "Hubo un problema al iniciar sesión, intenta de nuevo.",
        "error"
      );
    }
  };

  return (
    <div>
      <div id="form-ui">
        <form id="form" onSubmit={handleLogin}>
          <div id="form-body">
            <div id="welcome-lines">
              <div id="welcome-line-1">Bienvenido</div>
              <div id="welcome-line-2">
                Por favor introduce tus credenciales para iniciar sesión
              </div>
            </div>
            <div id="input-area">
              <div className="form-inp">
                <input
                  name="email"
                  placeholder="Email Address"
                  type="text"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-inp">
                <input
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
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
                  <p>Regístrate aquí</p>
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
