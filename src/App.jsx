import "../src/Styles/Home.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Deals from "./Pages/Deals";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/ofertas" element={<Deals />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
