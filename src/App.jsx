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
import Quote from "./Frontend/Components/Admin/QuoteAdmin";
import Buys from "./Frontend/Components/Admin/Buys";
import Supplier from "./Frontend/Components/Admin/Supplier";
import Reports from "./Frontend/Components/Admin/Reports";
import Messages from "./Frontend/Components/Admin/Messages";

function App() {
  const location = useLocation();

  const noNavbarRoutes = [
    "/pedidos",
    "/clientes",
    "/cotizaciones",
    "/compras",
    "/proveedores",
    "/reportes",
    "/mensajes",
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
        <Route path="/dashboard-admin/cotizaciones" element={<Quote />} />
        <Route path="/dashboard-admin/compras" element={<Buys />} />
        <Route path="/dashboard-admin/proveedores" element={<Supplier />} />
        <Route path="/dashboard-admin/reportes" element={<Reports />} />
        <Route path="/dashboard-admin/mensajes" element={<Messages />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default injectContext(App);
