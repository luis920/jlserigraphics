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
        <Link
          key={index}
          className="tw-inline-flex tw-items-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 tw-disabled:tw-pointer-events-none tw-disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0 hover:tw-bg-accent hover:tw-text-accent-foreground tw-h-10 tw-px-4 tw-py-2 tw-w-full tw-justify-start"
          to={item.path}
          onClick={() => setIsOpen(false)}
        >
          <item.icon className="tw-mr-2 tw-h-4 tw-w-4" />
          {item.label}
        </Link>
      ))}
    </>
  );
};

export default Sidebar;
