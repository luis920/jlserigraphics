// import { se } from "date-fns/locale/se";
// import { set } from "date-fns/set";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      clients: [],
      pedidos: [],
    },
    actions: {
      GetClients: async () => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/clients",
            {
              headers: getActions().getAuthHeaders(),
            }
          );
          if (response.ok) {
            const data = await response.json();
            setStore({ clients: data });

            // If the database is empty, load initial data
            if (data.length === 0) {
              getActions().loadInitialClientsData();
            }
          } else {
            console.error("Error fetching clients:", response.status);
          }
        } catch (error) {
          console.error("Error fetching clients:", error);
        }
      },

      addClient: async (clientData) => {
        try {
          const store = getStore();
          const token = store.token || localStorage.getItem("token");

          if (!token) {
            console.error("No token found");
            return;
          }
          const response = await fetch(
            process.env.BACKEND_URL + "/api/clients",
            {
              method: "POST",
              headers: getActions().getAuthHeaders(),
              body: JSON.stringify(clientData),
            }
          );

          if (response.ok) {
            const newClient = await response.json();
            const store = getStore();
            setStore({ clients: [...store.clients, newClient] });
            return newClient;
          } else {
            console.error("Error adding client:", response.status);
          }
        } catch (error) {
          console.error("Error adding client:", error);
        }
      },

      updateClient: async (id, clientData) => {
        try {
          const store = getStore();
          const token = store.token || localStorage.getItem("token");

          if (!token) {
            console.error("No token found");
            return;
          }
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/clients/${id}`,
            {
              method: "PUT",
              headers: getActions().getAuthHeaders(),
              body: JSON.stringify(clientData),
            }
          );

          if (response.ok) {
            const updatedClient = await response.json();
            const store = getStore();
            const updatedClients = store.clients.map((client) =>
              client.id === id ? updatedClient : client
            );
            setStore({ clients: updatedClients });
            return updatedClient;
          } else {
            console.error("Error updating client:", response.status);
          }
        } catch (error) {
          console.error("Error updating client:", error);
        }
      },

      deleteClient: async (id) => {
        try {
          const store = getStore();
          const token = store.token || localStorage.getItem("token");

          if (!token) {
            console.error("No token found");
            return;
          }
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/clients/${id}`,
            {
              method: "DELETE",
              headers: getActions().getAuthHeaders(),
            }
          );

          if (response.ok) {
            const store = getStore();
            const updatedClients = store.clients.filter(
              (client) => client.id !== id
            );
            setStore({ clients: updatedClients });
          } else {
            console.error("Error deleting client:", response.status);
          }
        } catch (error) {
          console.error("Error deleting client:", error);
        }
      },
      obtenerPedidos: async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/pedidos", {});
          if (response.ok) {
            const data = await response.json();
            setStore({ pedidos: data });
            return data;
          } else {
            console.error("Error al obtener pedidos:", response.status);
          }
        } catch (error) {
          console.error("Error al obtener pedidos:", error);
          return null;
        }
      },
      agregarPedido: async (nuevoPedido) => {
        try {
          const response = await fetch("http://127.0.0.1:5000/pedido", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoPedido),
          });

          if (response.ok) {
            const nuevoPedido = await response.json();
            const store = getStore();
            setStore({ pedidos: [...store.pedidos, nuevoPedido] });
            return nuevoPedido;
          } else {
            console.error("Error al agregar pedido:", response.status);
          }
        } catch (error) {
          console.error("Error al agregar pedido:", error);
        }
      },
    },
  };
};

export default getState;
