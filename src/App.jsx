import "../src/Styles/Home.css";
import Navbar from "./Components/Navbar";
import Quote from "./Components/Quote";
import Follow from "./Components/Follow";
import About from "./Components/About";

function App() {
  return (
    <div>
      <Navbar />
      <Quote />
      <Follow />
      <About />
    </div>
  );
}

export default App;
