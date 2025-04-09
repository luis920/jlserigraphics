import serigrafia from "../img/serigrafia1.jpg";
import bordado from "../img/bordado1.jpg";
import compromiso from "../img/compromiso.jpeg";
import "../Styles/About.css";
const About = () => {
  return (
    <div>
      <h1 className="fs-3 mx-5 mt-5 title ">SOBRE NOSOTROS</h1>
      <hr className="mb-5" />
      <div className="servicios-container row">
        <div className="col-12 col-md-6">
          <img className="img-services w-100 " src={serigrafia} alt="" />
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
        <div className=" img-calidad col-12 col-md-6 d-flex flex-column justify-content-center mt-5 ">
          <h3 className="text-light ">𝗖 𝗔 𝗟 𝗜 𝗗 𝗔 𝗗 </h3>
          <p className="text-light">
            Con más de 5 años de experiencia, ofrecemos calidad y servicio
            incomparables. Nos aseguramos de cuidar todos los detalles para que
            tu proyecto no le falte nada. ¿Tienes alguna pregunta sobre tu
            proyecto? Estaremos encantados de ayudarte en todo el proceso.
          </p>
        </div>
        <div className="col-12 col-md-6 mt-5">
          <img className="img-services w-100 " src={bordado} alt="" />
        </div>
        <div className="col-12 col-md-6">
          <img className="img-services w-100 mt-5" src={compromiso} alt="" />
        </div>

        <div className="col-12 col-md-6 d-flex flex-column justify-content-center mt-5">
          <h3 className="text-light">𝗖 𝗢 𝗠 𝗣 𝗥 𝗢 𝗠 𝗜 𝗦 𝗢</h3>
          <p className="text-light">
            Nos encanta ver cómo tus productos cobran vida tal como los
            imaginaste. Nos esforzamos al máximo con el control de calidad para
            asegurarnos de que recibas un producto excelente y a tiempo.
          </p>
        </div>
      </div>
    </div>
  );
};
export default About;
