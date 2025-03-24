import Sidebar from "./Sidebar";
import "../../Styles/Orders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { Context } from "../../Store/appContext.jsx";

const Messages = () => {
  const { store, actions } = useContext(Context);

  //   useEffect(() => {
  //     actions.obtenerMensajes();
  //   }, []);

  return (
    <div className="card-message">
      <div className="header-message">
        <span className="icon-message">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </span>
        <p className="alert-message">New message!</p>
      </div>

      <p className="message">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea quo
        unde vel adipisci blanditiis voluptates eum. Nam, cum minima?
      </p>

      <div className="actions-message">
        <a className="read-message" href="">
          Take a Look
        </a>

        <a className="mark-as-read" href="">
          Mark as Read
        </a>
      </div>
    </div>
  );
};

export default Messages;
