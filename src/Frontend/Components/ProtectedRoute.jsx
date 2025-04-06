import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../Store/appContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { store } = useContext(Context);
  const usuario = store.usuario;

  if (!usuario) {
    return <Navigate to="/iniciarsesion" replace />;
  }

  if (requiredRole && usuario.rol !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
