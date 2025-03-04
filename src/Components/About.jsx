import serigrafia from "../img/serigrafia1.jpg";
import "../Styles/About.css";
const About = () => {
  return (
    <div>
      <h1 className="text-light mx-5 mt-5">Sobre nosotros</h1>
      <hr className="mb-5" />
      <div className="servicios-container row">
        <div className="col-12 col-md-6">
          <img className="img-services w-100" src={serigrafia} alt="" />
        </div>
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
          <h3 className="text-light">𝗦 𝗘 𝗥 𝗩 𝗜 𝗖 𝗜 𝗢 𝗦 </h3>
          <p className="text-light">
            En JL Serigraphics ofrecemos servicios de serigrafía y bordado de
            alta calidad para satisfacer todas tus necesidades. Ya sea para
            escuelas, eventos, uniformes de trabajo, marcas de ropa o cualquier
            otro proyecto, ¡nos encargamos de todo
          </p>
        </div>
      </div>
    </div>
  );
};
export default About;
