import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import SearchBar from "../../components/searchBar/SearchBar";
import Negocios from "../negocios/Negocios";

const Home = () => {
  return (
    <>
      <section
        id="hero"
        className="align-items-center justify-content-center home-section"
      >
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

          <div className="row justify-content-center">
            <div className="col-md-4 mb-3 mb-md-0 d-flex justify-content-center searchBarCont mt-5">
              {<SearchBar />}
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
      <Negocios />
      <section id="features" className="features home-section">
        <div data-aos="fade-up">
          <div className="row container container-fluid">
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
                  realizar tanto con nuestro empleados como con nuestros
                  clientes.
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
      <section id="ppc" className="ppc home-section">
        <div className="container-fluid" data-aos="zoom-in">
          <div className="text-center">
            <h3>POTENCIA AÚN MÁS A TU EMPRESA</h3>
            <p>
              Te brindamos la posibilidad de difundir más a tu negocio e
              incrementar el alcance de los vehículos que publiques para la
              venta
            </p>
            <Link to="/publicacion">
              <div className="ppc-btn">PUBLICITÁ AHORA</div>
            </Link>
          </div>
        </div>
      </section>
      <section id="about" className="about home-section">
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
                  clasificados, donde los usuarios podrán publicar los rodados
                  que deseen vender.
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
                mismas, asesorándolas para que estas puedan generar un
                incremento en sus visitas, siempre demostrando nuestro
                profesionalismo y transparencia. Asimismo, nos encargamos de
                mantener los datos de las empresas, los vehículos para las
                ventas y la lista de precios constantemente actualizados, ya sea
                de forma anual (para las empresas), semestral (para la sección
                clasificados) y mensual (en la lista de precios).
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="contact home-section">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Comunícate con nosotros</h2>
            <p>CONTACTANOS</p>
          </div>

          <div className="row">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2477.5367865926187!2d-69.230385!3d-51.6133755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbdb6fea979bfadd3%3A0x40864ca79df574a8!2sAlberdi%201118%20Depto%204%2C%20R%C3%ADo%20Gallegos%2C%20Santa%20Cruz!5e0!3m2!1ses-419!2sar!4v1654740207616!5m2!1ses-419!2sar"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="row mt-5">
            <div className="col-lg-4">
              <div className="info">
                <div className="address">
                  <i className="bi bi-geo-alt"></i>
                  <h4>Dirección:</h4>
                  <p>Alberdi 1144, Depto 4, Río Gallegos, Santa Cruz</p>
                </div>

                <div className="email">
                  <i className="bi bi-envelope"></i>
                  <h4>Email:</h4>
                  <p>administracion@vefrek.com</p>
                </div>

                <div className="phone">
                  <i className="bi bi-phone"></i>
                  <h4>Teléfono:</h4>
                  <p>+011 5320 0080</p>
                </div>
              </div>
            </div>

            <div className="col-lg-8 mt-5 mt-lg-0">
              <form
                action="forms/contact.php"
                method="post"
                role="form"
                className="php-email-form"
              >
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      placeholder="Nombre"
                      required
                    />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    id="subject"
                    placeholder="Asunto"
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <textarea
                    className="form-control"
                    name="message"
                    rows="5"
                    placeholder="Mensaje"
                    required
                  ></textarea>
                </div>
                <div className="my-3">
                  <div className="loading">Espere...</div>
                  <div className="error-message"></div>
                  <div className="sent-message">
                    Tu mensaje ha sido enviado. ¡Muchas gracias!
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit">Enviar mensaje</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
