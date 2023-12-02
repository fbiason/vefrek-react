import React from "react";
import "./hero.css";

const Hero = () => {
  return (
    <section
      id="hero"
      className="d-flex align-items-center justify-content-center"
    >
      <div className="container" data-aos="fade-up">
        <div
          className="row justify-content-center"
          data-aos="fade-up"
          data-aos-delay="160"
        >
          <div className="col-xl-6 col-lg-8">
            <img
              src="assets/img/logos/logo-vefrek-white.png"
              width="480px"
              alt=""
            />
            <div>&nbsp;</div>
            <h2>La guía más completa del rubro automotor</h2>
            <div>&nbsp;</div>
            <h3>Todos los servicios en un solo lugar.</h3>
          </div>
        </div>

        <div
          className="row gy-4 mt-5 justify-content-center"
          data-aos="zoom-in"
          data-aos-delay="250"
        >
          <div className="col-xl-2 col-md-4">
            <div className="icon-box">
              <i className="ri-store-2-line"></i>
              <h3>
                <a href="">Clasificados</a>
              </h3>
            </div>
          </div>
          <div className="col-xl-2 col-md-4">
            <div className="icon-box">
              <i className="ri-tools-line"></i>
              <h3>
                <a href="">Reparación y Mantenimiento</a>
              </h3>
            </div>
          </div>
          <div className="col-xl-2 col-md-4">
            <div className="icon-box">
              <i className="ri-car-line"></i>
              <h3>
                <a href="">Venta y Alquiler de Vehículos</a>
              </h3>
            </div>
          </div>
          <div className="col-xl-2 col-md-4">
            <div className="icon-box">
              <i className="ri-gas-station-line"></i>
              <h3>
                <a href="">Otros Servicios</a>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
