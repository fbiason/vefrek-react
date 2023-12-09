import React from "react";
import "./valores.css";

const Valores = () => {
  return (
    <section id="features" className="features">
      <div className="container" data-aos="fade-up">
        <div className="row container-fluid">
          <div
            className="image col-lg-6"
            style={{ backgroundImage: "url('images/valores-prueba.png')" }}
            data-aos="fade-right"
          ></div>
          <div className="col-lg-6" data-aos="fade-left" data-aos-delay="100">
            <div
              className="icon-box mt-5 mt-lg-0"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <i className="bx bx-user"></i>
              <h4>Responsabilidad</h4>
              <p>
                Cumplimos con todas las obligaciones que nos comprometemos a
                realizar tanto con nuestro empleados como con nuestros clientes.
              </p>
            </div>
            <div
              className="icon-box mt-5"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <i className="bx bx-cube-alt"></i>
              <h4>Simplicidad</h4>
              <p>Ofrecemos un servicio claro y de fácil acceso.</p>
            </div>
            <div
              className="icon-box mt-5"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <i className="bx bx-compass"></i>
              <h4>Orientación al cliente</h4>
              <p>
                Trabajamos para que las empresas puedan mejorar la difusión de
                sus negocios y logren un mayor alcance.
              </p>
            </div>
            <div
              className="icon-box mt-5"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <i className="bx bx-star"></i>
              <h4>Excelencia</h4>
              <p>
                Buscamos superarnos día a día y que los resultados se reflejen
                en la calidad de atención a los clientes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Valores;
