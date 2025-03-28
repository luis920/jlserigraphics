import React, { useContext, useEffect } from "react";
import { Context } from "../../Store/appContext";

const ClientMessage = () => {
  //   const { store, actions } = useContext(Context);

  //   useEffect(() => {
  //     actions.obtenerMensajes();
  //   }, []);

  //   const user = JSON.parse(localStorage.getItem("usuario"));
  //   const userEmail = usuario?.email;
  //   console.log(store.emails)
  //   const filteredMessages =
  //     store.emails?.filter((message) => message.email === userEmail) || [];
  const message = [
    {
      message: "hola",
      content: "este mensaje es de prueba",
      date: "22-12-2025",
    },
  ];

  return (
    <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-md tw-max-w-4xl tw-mx-auto">
      <h2 className="tw-text-xl tw-font-bold tw-text-gray-800 tw-mb-4">
        Parent Messages
      </h2>
      <ul className="tw-space-y-4">
        {message.map((message, index) => (
          <li
            key={index}
            className="tw-bg-gray-100 tw-p-4 tw-rounded-lg tw-shadow-sm"
          >
            <h3 className="tw-text-lg tw-font-semibold tw-text-gray-700">
              {message.message}
            </h3>
            <p className="tw-text-gray-600">{message.content}</p>
            <span className="tw-text-gray-500 tw-text-sm">{message.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientMessage;
