import React from "react";
import "./negocios.css";

const Negocios = () => {
  return (
    <section id="portfolio" className="portfolio">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Encontra lo que tu vehículo necesita</h2>
          <p>negocios recomendados</p>
        </div>

        <div className="row" data-aos="fade-up" data-aos-delay="100">
          <div className="col-lg-12 d-flex justify-content-center">
            <ul id="portfolio-flters">
              <li data-filter="*" className="filter-active">
                TODOS
              </li>
              <li data-filter=".filter-agencias">AGENCIAS</li>
              <li data-filter=".filter-rentacar">RENT A CAR</li>
              <li data-filter=".filter-gomerias">GOMERÍAS</li>
              <li data-filter=".filter-mecanicos">MECÁNICOS</li>
              <li data-filter=".filter-repuestos">REPUESTOS</li>
              <li data-filter=".filter-lubricentros">LUBRICENTROS</li>
              <li data-filter=".filter-aseguradoras">ASEGURADORAS</li>
              <li data-filter=".filter-estacionservicios">EST. DE SERV.</li>
              <li data-filter=".filter-estetica">ESTÉTICA AUTOMOTOR</li>
            </ul>
          </div>
        </div>

        <div
          className="row portfolio-container"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Negocio 1 */}
          <div className="col-lg-4 col-md-6 portfolio-item filter-agencias">
            <div className="portfolio-wrap">
              <img
                src="images/premium-rgl/consecionarias/biason-rgl.jpeg"
                className="img-fluid"
                alt=""
              />
              <div className="portfolio-info">
                <h4>BIASON AUTOMOTORES</h4>
                <p>más info...</p>
                <div className="portfolio-links">
                  <a
                    href="images/portfolio/portfolio-1.jpg"
                    data-gallery="portfolioGallery"
                    className="portfolio-lightbox"
                    title="App 1"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a href="portfolio-details.html" title="More Details">
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Negocio 2 */}
          <div className="col-lg-4 col-md-6 portfolio-item filter-web">
            <div className="portfolio-wrap">
              <img
                src="images/premium-rgl/gomerias/moster-rgl.jpg"
                className="img-fluid"
                alt=""
              />
              <div className="portfolio-info">
                <h4>GOMERÍA MOSTER</h4>
                <p>más info...</p>
                <div className="portfolio-links">
                  <a
                    href="images/portfolio/portfolio-2.jpg"
                    data-gallery="portfolioGallery"
                    className="portfolio-lightbox"
                    title="Web 3"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a href="portfolio-details.html" title="More Details">
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ... (resto de los Negocios) */}
        </div>
      </div>
    </section>
  );
};

export default Negocios;
