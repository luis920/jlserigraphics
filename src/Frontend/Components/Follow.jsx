import "../Styles/Follow.css";

const Follow = () => {
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
        href="https://www.instagram.com/jlserigraphics"
        className="d-block text-center text-decoration-none text-light fs-2"
      >
        Visita nuestro Instagram{" "}
      </a>
    </div>
  );
};

export default Follow;
