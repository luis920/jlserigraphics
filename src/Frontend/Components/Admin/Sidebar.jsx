import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      icon: <FontAwesomeIcon className="icon-sesion" icon={faHouse} />,
      label: "Dashboard",
      path: "/admin-dashboard",
    },
  ];

  return (
    <>
      {menuItems.map((item, index) => (
        <Link key={index} className="text-light" to={item.path}>
          {item.icon}
          {item.label}
        </Link>
      ))}
    </>
  );
};

export default Sidebar;
