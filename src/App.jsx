import "../src/Styles/Home.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Deals from "./Pages/Deals";
import Size from "./Pages/Size";
import Catalog from "./Pages/Catalog";
import { Routes, Route } from "react-router-dom";
import ContactUs from "./Pages/ContactUs";

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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
