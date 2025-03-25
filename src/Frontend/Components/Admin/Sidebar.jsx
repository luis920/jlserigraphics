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
  faCreditCard,
  faTruckFieldUn,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../Styles/Sidebar.css";
import logotipo from "../../img/nombrelogo.png";
import mano from "../../img/mano.png";
const Sidebar = () => {
  const menuItems = [
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faShirt} />,
      label: "Gestion de pedidos",
      path: "pedidos",
    },
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faCreditCard} />,
      label: "Compras",
      path: "compras",
    },
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faUser} />,
      label: "Clientes",
      path: "clientes",
    },
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faTruckFieldUn} />,
      label: "Proveedores",
      path: "proveedores",
    },
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faCartFlatbed} />,
      label: "Cotizaciones",
      path: "cotizaciones",
    },
    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faFileLines} />,
      label: "Reportes",
      path: "reportes",
    },

    {
      icon: <FontAwesomeIcon className="icon-sidebar" icon={faMessage} />,
      label: "Mensajes",
      path: "mensajes",
    },
  ];

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
      </div>
    </>
  );
};

export default Sidebar;
