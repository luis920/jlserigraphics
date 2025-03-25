const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      usuarios: [],
      clientes: [],
      pedidos: [],
      cotizaciones: [],
      compras: [],
      proveedores: [],
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
            return true;
          } else {
            console.error(
              "Error en la respuesta del servidor:",
              response.status
            );
            return false;
          }
        } catch (error) {
          console.error("Error al eliminar compra:", error);
          return false;
        }
      },
      actualizarCompra: async (id, compraActualizada) => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/compra/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(compraActualizada),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error al actualizar:", errorData);
            return {
              error: errorData.message || "Error al actualizar la compra",
            };
          }

          const actualizarCompra = await response.json();
          const store = getStore();
          const actualizarCompras = store.compras.map((compra) =>
            compra.id === id ? actualizarCompra : compra
          );
          setStore({ compras: actualizarCompras });
          return actualizarCompra;
        } catch (error) {
          console.error("Error actualizando compra:", error);
          return { error: "Error de conexión con el servidor" };
        }
      },
      obtenerProveedores: async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/proveedores", {});
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setStore({ proveedores: data });
          } else {
            console.error("Error al obtener proveedores:", response.status);
          }
        } catch (error) {
          console.error("Error al obtener proveedores:", error);
          return null;
        }
      },
      agregarProveedor: async (nuevoProveedor) => {
        try {
          const response = await fetch("http://127.0.0.1:5000/proveedor", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoProveedor),
          });

          if (response.ok) {
            const nuevoProveedor = await response.json();
            const store = getStore();
            setStore({
              proveedores: [...store.proveedores, nuevoProveedor],
            });
            return nuevoProveedor;
          } else {
            console.error("Error al agregar proveedor:", response.status);
          }
        } catch (error) {
          console.error("Error al agregar proveedor:", error);
        }
      },
      eliminarProveedor: async (id) => {
        try {
          const response = await fetch(
            `http://127.0.0.1:5000/proveedor/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            setStore((prevStore) => ({
              proveedores: prevStore.proveedores.filter(
                (proveedor) => proveedor.id !== id
              ),
            }));
            return true;
          } else {
            console.error(
              "Error en la respuesta del servidor:",
              response.status
            );
            return false;
          }
        } catch (error) {
          console.error("Error al eliminar proveedor:", error);
          return false;
        }
      },
      actualizarProveedor: async (id, proveedorActualizado) => {
        try {
          const response = await fetch(
            `http://127.0.0.1:5000/proveedor/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(proveedorActualizado),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error al actualizar:", errorData);
            return {
              error: errorData.message || "Error al actualizar el proveedor",
            };
          }

          const actualizarProveedor = await response.json();
          const store = getStore();
          const actualizarProveedores = store.proveedores.map((proveedor) =>
            proveedor.id === id ? actualizarProveedor : proveedor
          );
          setStore({ proveedores: actualizarProveedores });
          return actualizarProveedor;
        } catch (error) {
          console.error("Error actualizando proveedor:", error);
          return { error: "Error de conexión con el servidor" };
        }
      },
      agregarUsuario: async (nuevoUsuario) => {
        try {
          const response = await fetch("http://127.0.0.1:5000/nuevousuario", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoUsuario),
          });

          if (response.ok) {
            const nuevoUsuario = await response.json();
            const store = getStore();
            setStore({
              usuarios: [...store.usuarios, nuevoUsuario],
            });
            return nuevoUsuario;
          } else {
            console.error("Error al registrarse:", response.status);
          }
        } catch (error) {
          console.error("Error al registrarse:", error);
        }
      },
      obtenerMensajes: async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/mensajes", {});
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setStore({ mensajes: data });
          } else {
            console.error("Error al obtener mensajes:", response.status);
          }
        } catch (error) {
          console.error("Error al obtener mensajes:", error);
          return null;
        }
      },
    },
  };
};

export default getState;
