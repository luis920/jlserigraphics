const Register = () => {
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
                <input placeholder="Nombre Completo" type="text" required />
              </div>
              <div className="d-flex">
                <div className="form-inp w-100">
                  <input placeholder="Telefono" type="text" required />
                </div>
                <div className="form-inp w-100 ">
                  <input placeholder="Email" type="email" required />
                </div>
              </div>

              <div className="d-flex ">
                <div className="form-inp w-100">
                  <input placeholder="Contraseña" type="password" required />
                </div>
                <div className="form-inp w-100">
                  <input
                    placeholder="Confirmar contraseña"
                    type="password"
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
