import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { Context } from "../Store/appContext.jsx";

const Register = () => {
  const { store, actions } = useContext(Context);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre_completo: "",
    telefono: "",
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
  };
  const handleRegister = async (e) => {
    if (
      !nuevoUsuario.nombre_completo ||
      !nuevoUsuario.telefono ||
      !nuevoUsuario.email ||
      !nuevoUsuario.password
    ) {
      Swal.fire("Error", "Por favor, completa todos los campos", "error");
      return;
    }

    try {
      const result = await actions.agregarUsuario(nuevoUsuario);

      if (result) {
        Swal.fire({
          icon: "success",
          title: "En hora buena!",
          text: "Te has registrado con exito!",
        });
        setNuevoUsuario({
          nombre_completo: "",
          telefono: "",
          email: "",
          password: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `ah ocurrido un error: ${result.error}`,
        });
      }
    } catch (error) {
      console.error("Error en handleAddUser:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: "ah ocurrido un error al enviar el formulario,porfavor intente de nuevo.",
      });
    }
  };
  return (
    <div>
      <div id="form-ui">
        <form action="" method="post" id="form">
          <div id="form-body">
            <div id="welcome-lines">
              <div id="welcome-line-1">JL Serigraphics</div>
              <div id="welcome-line-2">Formulario de registro</div>
            </div>
            <div id="input-area">
              <div className="form-inp">
                <input
                  onChange={handleInputChange}
                  placeholder="nombre_completo"
                  type="text"
                  name="nombre_completo"
                  value={nuevoUsuario.nombre_completo}
                  required
                />
              </div>
              <div className="d-flex">
                <div className="form-inp w-100">
                  <input
                    onChange={handleInputChange}
                    placeholder="telefono"
                    type="text"
                    value={nuevoUsuario.telefono}
                    name="telefono"
                    required
                  />
                </div>
                <div className="form-inp w-100 ">
                  <input
                    onChange={handleInputChange}
                    placeholder="email"
                    type="email"
                    value={nuevoUsuario.email}
                    name="email"
                    required
                  />
                </div>
              </div>

              <div className="d-flex ">
                <div className="form-inp w-100">
                  <input
                    onChange={handleInputChange}
                    placeholder="Contraseña"
                    type="password"
                    value={nuevoUsuario.password}
                    name="password"
                    required
                  />
                </div>
                <div className="form-inp w-100">
                  <input
                    placeholder="Confirmar contraseña"
                    type="password"
                    name="password"
                    required
                  />
                </div>
              </div>
            </div>
            <div id="submit-button-cvr">
              <button id="submit-button" type="submit">
                Registrarse
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
