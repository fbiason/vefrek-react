import React from "react";
import { Link } from "react-router-dom";
import "./hero.css";

const Hero = () => {
  return (
    <section id="hero" className="align-items-center justify-content-center">
      <div className="container-fluid container;" data-aos="fade-up">
        <div
          className="row justify-content-center"
          data-aos="fade-up"
          data-aos-delay="160"
        >
          <div className="col-xl-6 col-lg-8 logo-hero">
            <img src="/images/logos/logo-vefrek-white.png" alt="Vefrek" />
            <div>&nbsp;</div>
            <h2>La guía más completa del rubro automotor</h2>
          </div>
        </div>

        <div
          className="row justify-content-center mt-5"
          data-aos="zoom-in"
          data-aos-delay="250"
        >
          <div className="col-xl-2 col-md-4 cat-hero">
            <Link to="/Reparacion">
              <div className="btn-categoria  icon-box">
                <i className="ri-tools-line"></i>
                <h3>Reparación y Mantenimieto</h3>
              </div>
            </Link>
          </div>

          <div className="col-xl-2 col-md-4 cat-hero">
            <Link to="/Venta">
              <div className="btn-categoria icon-box">
                <i className="ri-car-line"></i>
                <h3>Venta y Alquiler de Vehículos</h3>
              </div>
            </Link>
          </div>

          <div className="col-xl-2 col-md-4 cat-hero">
            <Link to="/OtrosServicios">
              <div className="btn-categoria icon-box">
                <i className="ri-gas-station-line"></i>
                <h3>Otros Servicios</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
