import React from "react";
import "./counts.css";

const Counts = () => {
  return (
    <section id="counts" className="counts">
      <div className="container" data-aos="fade-up">
        <div className="row no-gutters">
          <div
            className="image col-xl-5 d-flex align-items-stretch justify-content-center justify-content-lg-start"
            data-aos="fade-right"
            data-aos-delay="100"
          ></div>
          <div
            className="col-xl-7 ps-0 ps-lg-5 pe-lg-1 d-flex align-items-stretch"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <div className="content d-flex flex-column justify-content-center">
              <h3>LA GUÍA MÁS COMPLETA DEL RUBRO AUTOMOTOR</h3>
              <p>
                ¡Poseemos una gran cantidad de negocios cargados en nuestro
                sitio, lo cuales siguen incrementando día a día!
              </p>
              <div className="row">
                <div className="col-md-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                    <i className="bi bi-emoji-smile"></i>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="65"
                      data-purecounter-duration="2"
                      className="purecounter"
                    ></span>
                    <p>
                      <strong>Usuario registrados</strong> el registro y acceso
                      a la información es totalmente gratuito.
                    </p>
                  </div>
                </div>

                <div className="col-md-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                    <i className="bi bi-journal-richtext"></i>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="85"
                      data-purecounter-duration="2"
                      className="purecounter"
                    ></span>
                    <p>
                      <strong>Negocios cargados</strong> poseemos una amplia
                      cantidad de empresas cargadas y anualmente se verifica que
                      las mismas sigan en funcionamiento.
                    </p>
                  </div>
                </div>

                <div className="col-md-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                    <i className="bi bi-cart2"></i>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="35"
                      data-purecounter-duration="4"
                      className="purecounter"
                    ></span>
                    <p>
                      <strong>Vehículos ofrecidos</strong> podes ofrecer tu
                      vehículo en nuestro sitio, ¡Gratis y sin Comisión! Los
                      mismos son actualizados semestralmente.
                    </p>
                  </div>
                </div>

                <div className="col-md-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                    <i className="bi bi-award"></i>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="20"
                      data-purecounter-duration="4"
                      className="purecounter"
                    ></span>
                    <p>
                      <strong>Usuarios premium</strong> cada vez más usuarios
                      confían en nosotros y desean acceder a nuevos beneficios
                      que ofrece el Faro Automotor.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counts;
