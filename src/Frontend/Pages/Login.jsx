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
      Swal.fire("Error", "Por favor, completa todos los campos", "error");
      return;
    }

    try {
      const response = await actions.login(user.email, user.password);
      console.log("Respuesta del login:", response);

      if (!response.success) {
        Swal.fire(
          "Error",
          response.message || "Credenciales incorrectas",
          "error"
        );
        return;
      }

      // Accedemos correctamente a "usuario" en singular
      const rol = response.data.rol?.toLowerCase();

      if (rol === "admin") {
        navigate("/pedidos");
      } else if (rol === "cliente") {
        navigate("/compras");
      } else {
        Swal.fire("Error", "Rol desconocido. Acceso denegado.", "error");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      Swal.fire("Error", "Ocurrió un error, intenta de nuevo", "error");
    }
  };

  // if (result) {
  //   const { rol } = result.usuarios

  //   if (rol === "admin" || rol === "Admin") {
  //     navigate("/pedidos")
  //   } else if (rol === "cliente" || rol === "cliente") {
  //     navigate("/miscompras")
  //   } else {
  //     setError("Unknown role. Access denied.")
  //   }
  // } else {
  //   setError("Incorrect credentials.")
  // }

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
