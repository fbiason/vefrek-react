import React from "react";
import { Link } from "react-router-dom";
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
          <div className="col-xl-6 col-lg-8 logo-publicacion">
            <img
              src="/images/logos/logo-vefrek-white.png"
              alt="Vefrek"
              className="vefrek-logo"
            />{" "}
            <div>&nbsp;</div>
            <h2>REALIZA UNA PUBLICACION</h2>
          </div>
        </div>

        <div
          className="row gy-4 mt-5 justify-content-center"
          data-aos="zoom-in"
          data-aos-delay="250"
        >
          <div className="col-xl-2 col-md-4">
            <div className="icon-box">
              <i className="ri-building-line"></i>
              <h3>
                <Link to="/CargaEmpresa">
                  <a>Publica tu empresa</a>
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publicacion;
