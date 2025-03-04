import "../src/Styles/Home.css";
import Navbar from "./Components/Navbar";
import Quote from "./Components/Quote";
import Follow from "./Components/Follow";
import About from "./Components/About";
import Footer from "./Components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Quote />
      <Follow />
      <About />
      <Footer />
    </div>
  );
}

export default App;
