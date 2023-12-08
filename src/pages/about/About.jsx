import React from "react";
import "./about.css";

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div
            className="col-lg-6 order-1 order-lg-2"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <img src="images/about.jpg" className="img-fluid" alt="" />
          </div>
          <div
            className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <h3>¿Qué es VEFREK?</h3>
            <p className="fst-italic">
              Vefrek es una empresa que busca unificar toda la información
              referida al rubro automotor en un solo lugar, todo de una forma
              fácil, confiable y gratuita.
            </p>
            <p className="fst-italic">
              En nuestro sitio web podrás encontrar la siguiente información:
            </p>
            <ul>
              <li>
                <i className="ri-check-double-line"></i> Todo tipo de negocios
                referidos a la industria automotriz.
              </li>
              <li>
                <i className="ri-check-double-line"></i> Una sección de
                clasificados, donde los usuarios podrán publicar los rodados que
                deseen vender.
              </li>
              <li>
                <i className="ri-check-double-line"></i> Precios de los
                vehículos actualizados.
              </li>
            </ul>
            <p>
              Trabajamos día a día para mejorar la experiencia de nuestros
              usuarios en el sitio web, como así también buscamos potenciar el
              posicionamiento de las empresas dando una mayor difusión de las
              mismas, asesorándolas para que estas puedan generar un incremento
              en sus visitas, siempre demostrando nuestro profesionalismo y
              transparencia. Asimismo, nos encargamos de mantener los datos de
              las empresas, los vehículos para las ventas y la lista de precios
              constantemente actualizados, ya sea de forma anual (para las
              empresas), semestral (para la sección clasificados) y mensual (en
              la lista de precios).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
