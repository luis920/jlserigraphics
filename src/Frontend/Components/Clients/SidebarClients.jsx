import React, { useState, useContext } from "react";
import { Context } from "../../Store/appContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faShirt,
  faUser,
  faCartFlatbed,
  faFileLines,
  faAddressCard,
  faMessage,
  faGear,
  faCreditCard,
  faTruckFieldUn,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../Styles/Sidebar.css";
import logotipo from "../../img/nombrelogo.png";
import mano from "../../img/mano.png";
const SidebarClients = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const menuItems = [
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faShirt} />,
      label: "Historial de compras",
      path: "/dashboard-cliente/compras",
    },
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faCreditCard} />,
      label: "Metodos de pago",
      path: "/dashboard-cliente/pago",
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

        <h1 className="text-light fs-bold">Admin</h1>
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
