import "../src/Frontend/Styles/Home.css";
import Navbar from "./Frontend/Components/Navbar";
import Footer from "./Frontend/Components/Footer";
import Home from "./Frontend/Components/Home";
import Deals from "./Frontend/Pages/Deals";
import Size from "./Frontend/Pages/Size";
import Catalog from "./Frontend/Pages/Catalog";
import { Routes, Route, useLocation } from "react-router-dom";
import ContactUs from "./Frontend/Pages/ContactUs";
import Login from "./Frontend/Pages/Login";
import Register from "./Frontend/Pages/Register";
import Orders from "./Frontend/Components/Admin/Orders";
import injectContext from "./Frontend/Store/appContext";
import Clients from "./Frontend/Components/Admin/Clients";
import Buys from "./Frontend/Components/Admin/Buys";
import Supplier from "./Frontend/Components/Admin/Supplier";
import Reports from "./Frontend/Components/Admin/Reports";
import Messages from "./Frontend/Components/Admin/Messages";
import MyBuys from "./Frontend/Components/Clients/MyBuys";
import ClientMessage from "./Frontend/Components/Clients/ClientsMessage";
import ProtectedRoute from "./Frontend/Components/ProtectedRoute";
import Quote from "./Frontend/Components/Admin/QuoteAdmin";

function App() {
  const location = useLocation();

  const noNavbarRoutes = [
    "/dashboard-admin/pedidos",
    "/dashboard-admin/clientes",
    "/dashboard-admin/compras",
    "/dashboard-admin/proveedores",
    "/dashboard-admin/reportes",
    "/dashboard-admin/mensajes",
    "/dashboard-cliente/pedidos",
    "/dashboard-cliente/mensajes",
  ];

  return (
    <div>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/ofertas" element={<Deals />} />
        <Route path="/tallas" element={<Size />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/contactanos" element={<ContactUs />} />
        <Route path="/iniciarsesion" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/dashboard-admin/pedidos"
          element={
            <ProtectedRoute requiredRole="admin">
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-admin/clientes"
          element={
            <ProtectedRoute requiredRole="admin">
              <Clients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-admin/compras"
          element={
            <ProtectedRoute requiredRole="admin">
              <Buys />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-admin/proveedores"
          element={
            <ProtectedRoute requiredRole="admin">
              <Supplier />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-admin/reportes"
          element={
            <ProtectedRoute requiredRole="admin">
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-admin/mensajes"
          element={
            <ProtectedRoute requiredRole="admin">
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-admin/cotizaciones"
          element={
            <ProtectedRoute requiredRole="admin">
              <Quote />
            </ProtectedRoute>
          }
        />

        {/* CLIENTE DASHBOARD */}
        <Route
          path="/dashboard-cliente/pedidos"
          element={
            <ProtectedRoute requiredRole="cliente">
              <MyBuys />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-cliente/mensajes"
          element={
            <ProtectedRoute requiredRole="cliente">
              <ClientMessage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default injectContext(App);
