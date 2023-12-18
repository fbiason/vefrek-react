import React from "react";
import "./publicacion.css";

const Publicacion = () => {
  return (
    <section id="hero-publicacion" className="d-flex background">
      <div className="container" data-aos="fade-up">
        <div
          className="row justify-content-center"
          data-aos="fade-up"
          data-aos-delay="160"
        >
          <div className="col-xl-6 col-lg-8">
            <img
              src="../assets/img/logos/logo-vefrek-white.png"
              width="480px"
              alt=""
            />
            <div>&nbsp;</div>
            <h2>REALIZA UNA PUBLICACION</h2>
            <div>&nbsp;</div>
            <h3>¿Qué desea publicar?</h3>
          </div>
        </div>

        <div
          className="row gy-4 mt-5 justify-content-center"
          data-aos="zoom-in"
          data-aos-delay="250"
        >
          <div className="col-xl-2 col-md-4">
            <div className="icon-box">
              <i className="ri-car-line"></i>
              <h3>
                <a href="">Vehiculo</a>
              </h3>
            </div>
          </div>
          <div className="col-xl-2 col-md-4">
            <div className="icon-box">
              <i className="ri-building-line"></i>
              <h3>
                <a href="">Empresa</a>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publicacion;
