import "../Styles/Follow.css";
import panter from "../img/pinkpanter.png";
import snack from "../img/snack.png";
import weekend from "../img/weekend.png";
import younggroup from "../img/younggroup.png";

const Follow = () => {
  return (
    <div>
      <h1 className="text-light mx-5  ">Siguenos en Instagram</h1>
      <hr className="mb-5" />
      <div className="instaImgContainer flex">
        <div className="instaImg1 ">
          <img src={panter} alt="" className="img1" />
        </div>
        <div className="instaImg2 ">
          <img src={snack} alt="" className="img2" />
        </div>
        <div className="instaImg3 ">
          <img src={weekend} alt="" className="img3" />
        </div>
        <div className="instaImg4 ">
          <img src={younggroup} alt="" className="img4" />
        </div>
      </div>
      <a
        href="https://www.instagram.com/jlserigraphics"
        className="d-block text-center text-decoration-none text-light fs-2"
      >
        Visita nuestro Instagram{" "}
      </a>
    </div>
  );
};

export default Follow;
