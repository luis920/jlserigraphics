import "../Styles/Follow.css";
import Slider from "react-slick";

const Follow = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: (
      <div className="custom-arrow next-arrow">
        <i className="fas fa-chevron-right bg-light"></i>
      </div>
    ),
    prevArrow: (
      <div className="custom-arrow prev-arrow">
        <i className="fas fa-chevron-left bg-light"></i>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <h1 className="text-light mx-5  ">Siguenos en Instagram</h1>
      <hr className="mb-5" />
      <div className="instaImgContainer flex">
        <div className="instaImg1">
          <h1>imagen 1</h1>
        </div>
        <div className="instaImg2">
          <h1>imagen 2</h1>
        </div>
        <div className="instaImg3">
          <h1>imagen 3</h1>
        </div>
        <div className="instaImg4">
          <h1>imagen 4</h1>
        </div>
      </div>
      <a
        href="https://www.instagram.com"
        className="d-block text-center text-decoration-none text-light fs-2"
      >
        Visita nuestro Instagram{" "}
      </a>
    </div>
  );
};

export default Follow;
