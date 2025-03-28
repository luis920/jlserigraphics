import React, { useState, useContext } from "react";
import { Context } from "../../Store/appContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShirt,
  faUser,
  faMessage,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../Styles/Sidebar.css";
import logotipo from "../../img/nombrelogo.png";

const SidebarClients = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const menuItems = [
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faShirt} />,
      label: "Historial de pedidos",
      path: "/dashboard-cliente/pedidos",
    },
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faCreditCard} />,
      label: "Metodos de pago",
      path: "/dashboard-cliente/pagos",
    },
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faMessage} />,
      label: "Mensajes",
      path: "/dashboard-cliente/mensajes",
    },
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faUser} />,
      label: "Configuracion",
      path: "/dashboard-cliente/configuracion",
    },
  ];

  const handleLogout = () => {
    actions.cerrarSesion();
    navigate("/");
  };

  return (
    <>
      <div className="container-sidebar mx-1 d-flex flex-column">
        <img src={logotipo} alt="" />

        <h1 className="text-light fs-bold">Cliente</h1>
        {/* Contenedor único */}
        {menuItems.map((item, index) => (
          <Link
            key={index}
            className="text-decoration-none label-name"
            to={item.path}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
        <button className="btn-sesion" onClick={handleLogout}>
          cerrar sesion
        </button>
      </div>
    </>
  );
};

export default SidebarClients;
