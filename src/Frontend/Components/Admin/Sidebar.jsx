import React, { useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../Styles/Sidebar.css";
const Sidebar = () => {
  const menuItems = [
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faShirt} />,
      label: "Gestion de pedidos",
      path: "/pedidos",
    },
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faUser} />,
      label: "Clientes",
      path: "/admin-dashboard",
    },
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faCartFlatbed} />,
      label: "Inventario",
      path: "/admin-dashboard",
    },
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faFileLines} />,
      label: "Reportes",
      path: "/admin-dashboard",
    },
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faAddressCard} />,
      label: "Contactanos",
      path: "/admin-dashboard",
    },
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faMessage} />,
      label: "Mensajes",
      path: "/admin-dashboard",
    },
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faGear} />,
      label: "Configuracion",
      path: "/admin-dashboard",
    },
  ];

  return (
    <>
      <div className="container-sidebar mx-1 d-flex flex-column">
        <h1 className="text-light fs-bold">Administrador</h1>
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
      </div>
    </>
  );
};

export default Sidebar;
