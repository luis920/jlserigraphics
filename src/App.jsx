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
        <Route path="/dashboard-admin/pedidos" element={<Orders />} />
        <Route path="/dashboard-admin/clientes" element={<Clients />} />
        <Route path="/dashboard-admin/compras" element={<Buys />} />
        <Route path="/dashboard-admin/proveedores" element={<Supplier />} />
        <Route path="/dashboard-admin/reportes" element={<Reports />} />
        <Route path="/dashboard-admin/mensajes" element={<Messages />} />

        {/* CLIENTE DASHBOARD */}
        <Route path="/dashboard-cliente/pedidos" element={<MyBuys />} />
        <Route path="/dashboard-cliente/mensajes" element={<ClientMessage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default injectContext(App);
