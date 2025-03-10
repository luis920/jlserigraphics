import "../src/Frontend/Styles/Home.css";
import Navbar from "./Frontend/Components/Navbar";
import Footer from "./Frontend/Components/Footer";
import Home from "./Frontend/Components/Home";
import Deals from "./Frontend/Pages/Deals";
import Size from "./Frontend/Pages/Size";
import Catalog from "./Frontend/Pages/Catalog";
import { Routes, Route } from "react-router-dom";
import ContactUs from "./Frontend/Pages/ContactUs";
import Login from "./Frontend/Pages/Login";
import Register from "./Frontend/Pages/Register";
import Sidebar from "./Frontend/Components/Admin/Sidebar";
import Admin from "./Frontend/Pages/Admin";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/ofertas" element={<Deals />} />
        <Route index path="/tallas" element={<Size />} />
        <Route index path="/catalogo" element={<Catalog />} />
        <Route index path="/contactanos" element={<ContactUs />} />
        <Route index path="/iniciarsesion" element={<Login />} />
        <Route index path="/registro" element={<Register />} />

        {/* ADMIN DASHBOARD */}
        <Route index path="/dashboard-admin" element={<Admin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
