import "../Styles/Quote.css";

const Quote = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="w-100 p-4 text-light">
        <h1 className="text-center text-light mb-4">Solicitar Cotización</h1>
        <form>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input type="text" name="nombre" className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Apellido</label>
              <input type="text" name="apellido" className="form-control" />
            </div>
            <div className="col-md-6 mt-2">
              <label className="form-label">Email</label>
              <input type="text" name="email" className="form-control" />
            </div>
            <div className="col-md-6 mt-2">
              <label className="form-label">Telefono</label>
              <input type="text" name="telefono" className="form-control" />
            </div>
            <div className="col-md-12 mt-2">
              <label className="form-label">Mensaje</label>
              <textarea type="text" name="mensaje" className="form-control" />
            </div>
          </div>
          <div>
            <p className="mt-3">Que tipo de tecnica estas buscando?</p>
            <label className="m-2">
              <input
                type="radio"
                className="inputserigrafia "
                name="serigrafia"
                value="serigrafia"
              />
              <span className="p-1">Serigrafia</span>
            </label>
            <label className="">
              <input
                type="radio"
                className="inputserigrafia"
                name="serigrafia"
                value="serigrafia"
              />
              <span className="p-1">Bordado</span>
            </label>
          </div>

          <div className="mt-3">
            <button type="submit" className="btn btn-danger w-100">
              Enviar Mensaje
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Quote;
