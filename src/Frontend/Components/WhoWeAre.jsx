import mano from "../img/mano.png";
import "../Styles/WhoWeAre.css";

const WhoWeAre = () => {
  return (
    <div className="d-flex container">
      <div className="text-light  who-container ">
        <h1>QUIENES SOMOS?</h1>
        En <strong>JL SERIGRPAHICS</strong>, nos especializamos en la impresión
        y bordado en textiles, ofreciendo productos de alta calidad para
        empresas, emprendedores y clientes individuales. Con más de 5 años de
        experiencia en el mercado, hemos perfeccionado nuestras técnicas de
        serigrafía y bordado para garantizar acabados duraderos y de gran
        impacto visual. Nos enorgullece brindar un servicio personalizado,
        asesorando a nuestros clientes en cada paso del proceso para que sus
        ideas se conviertan en productos únicos. Ya sea para uniformes,
        promocionales o diseños personalizados, nos comprometemos a ofrecer
        soluciones creativas y eficientes. En Jl Serigraphics, la calidad y la
        satisfacción de nuestros clientes son nuestra prioridad. ¡Déjanos ser
        parte de tu próximo proyecto!
      </div>
      <div>
        <img src={mano} alt="mascota" className="mano-img" />
      </div>
    </div>
  );
};
export default WhoWeAre;
