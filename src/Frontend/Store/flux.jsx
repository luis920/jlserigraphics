// import { se } from "date-fns/locale/se";
// import { set } from "date-fns/set";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      clientes: [],
      pedidos: [],
      cotizaciones: [],
      compras: [],
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
      obtenerClientes: async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/clientes", {});
          if (response.ok) {
            const data = await response.json();
            setStore({ clientes: data });
            return data;
          } else {
            console.error("Error al obtener clientes:", response.status);
          }
        } catch (error) {
          console.error("Error al obtener clientes:", error);
          return null;
        }
      },
      agregarCliente: async (nuevoCliente) => {
        try {
          const response = await fetch("http://127.0.0.1:5000/cliente", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoCliente),
          });

          if (response.ok) {
            const nuevoCliente = await response.json();
            const store = getStore();
            setStore({ clientes: [...store.clientes, nuevoCliente] });
            return nuevoCliente;
          } else {
            console.error("Error al agregar cliente:", response.status);
          }
        } catch (error) {
          console.error("Error al agregar cliente:", error);
        }
      },
      obtenerCotizaciones: async () => {
        try {
          const response = await fetch(
            "http://127.0.0.1:5000/cotizaciones",
            {}
          );
          if (response.ok) {
            const data = await response.json();
            setStore({ cotizaciones: data });
          } else {
            console.error("Error al obtener cotizaciones:", response.status);
          }
        } catch (error) {
          console.error("Error al obtener cotizaciones:", error);
          return null;
        }
      },
      agregarCotizacion: async (nuevaCotizacion) => {
        try {
          const response = await fetch("http://127.0.0.1:5000/cotizacion", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevaCotizacion),
          });

          if (response.ok) {
            const nuevaCotizacion = await response.json();
            const store = getStore();
            setStore({
              cotizaciones: [...store.cotizaciones, nuevaCotizacion],
            });
            return nuevaCotizacion;
          } else {
            console.error("Error al generar cotizacion:", response.status);
          }
        } catch (error) {
          console.error("Error al generar cotizacion:", error);
        }
      },
      obtenerCompras: async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/compras", {});
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setStore({ compras: data });
          } else {
            console.error("Error al obtener cotizaciones:", response.status);
          }
        } catch (error) {
          console.error("Error al obtener cotizaciones:", error);
          return null;
        }
      },
      agregarCompra: async (nuevaCompra) => {
        try {
          const response = await fetch("http://127.0.0.1:5000/compra", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevaCompra),
          });

          if (response.ok) {
            const nuevaCompra = await response.json();
            const store = getStore();
            setStore({
              compras: [...store.cotizaciones, nuevaCompra],
            });
            return nuevaCompra;
          } else {
            console.error("Error al agregar compra:", response.status);
          }
        } catch (error) {
          console.error("Error al agregar compra:", error);
        }
      },
      eliminarCompra: async (id) => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/compras/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            setStore((prevStore) => ({
              compras: prevStore.compras.filter((compra) => compra.id !== id),
            }));
            return true; // ✅ Devuelve `true` si se eliminó correctamente
          } else {
            console.error(
              "Error en la respuesta del servidor:",
              response.status
            );
            return false; // ✅ Devuelve `false` si falló
          }
        } catch (error) {
          console.error("Error al eliminar compra:", error);
          return false; // ✅ Devuelve `false` si hubo un error
        }
      },
    },
  };
};

export default getState;
