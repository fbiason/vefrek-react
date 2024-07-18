import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";
import SearchBar from "../components/searchBar/SearchBar";
import Negocios from "./Negocios";
import { useEffect, useState } from "react";
import { swalPopUpWithCallbacks } from "../utils/swal";

const Home = () => {
  const [negocios, setNegocios] = useState(<></>);

  useEffect(() => {
    const setNegociosUpTo300Km = (opc) => {
      if (opc) {
        setNegocios(<Negocios limitedTo300Km={true} />);
        localStorage.setItem("negociosUpTo300Km", true);
      } else {
        setNegocios(<Negocios limitedTo300Km={false} />);
        localStorage.setItem("negociosUpTo300Km", false);
      }
    };

    const optionCompanysUpTo300Km = JSON.parse(
      localStorage.getItem("negociosUpTo300Km")
    );

    if (optionCompanysUpTo300Km === null) {
      swalPopUpWithCallbacks(
        "Quieres compartir tu ubicación?",
        "Filtraremos los anuncios por cercanía",
        "info",
        () => setNegociosUpTo300Km(true),
        () => setNegociosUpTo300Km(false)
      );
    } else if (optionCompanysUpTo300Km === true) {
      setNegociosUpTo300Km(true);
    } else if (optionCompanysUpTo300Km === false) {
      setNegociosUpTo300Km(false);
    }
  }, []);

  return (
    <>
      <section
        id="hero"
        className="align-items-center justify-content-center hero-section text-center"
      >
        <div className="container-fluid" data-aos="fade-up">
          <div
            className="row justify-content-center"
            data-aos="fade-up"
            data-aos-delay="160"
          >
            <div className="col-xl-8 col-lg-10 logo-hero ">
              <img
                src="/images/logos/logo-vefrek-white.png"
                alt="Vefrek"
                className="img-fluid"
              />
              <div className="mt-3">
                <h2>La guía más completa del rubro automotor</h2>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4">
            <div className="col-md-6 d-flex justify-content-center searchBarCont">
              {<SearchBar />}
            </div>
          </div>

          <div
            className="row justify-content-center mt-5"
            data-aos="zoom-in"
            data-aos-delay="250"
          >
            <div className="col-xl-3 col-md-6 cat-hero mb-4">
              <Link to="/Reparacion">
                <div className="btn-categoria icon-box">
                  <i className="ri-tools-line"></i>
                  <h3>Reparación y Mantenimiento</h3>
                </div>
              </Link>
            </div>

            <div className="col-xl-3 col-md-6 cat-hero mb-4">
              <Link to="/Venta">
                <div className="btn-categoria icon-box">
                  <i className="ri-car-line"></i>
                  <h3>Venta y Alquiler de Vehículos</h3>
                </div>
              </Link>
            </div>

            <div className="col-xl-3 col-md-6 cat-hero mb-4">
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

      {negocios}

      <section id="about" className="about">
        <div className="container-about" data-aos="fade-up">
          <div className="row-about">
            <div
              className="col-lg-6-about order-lg-1-about"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <img
                src="images/about.png"
                className="img-fluid"
                alt="Sobre Vefrek"
              />
            </div>
            <div
              className="col-lg-6-about pt-4-about pt-lg-0-about order-lg-2-about"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <h3 className="mt-3">¿Qué es VEFREK?</h3>
              <p className="mt-3">
                Somos una plataforma especializada en proporcionarte información
                detallada, relevante y actualizada sobre una amplia gama de
                empresas relacionadas con el sector automotor.
              </p>
              <p>
                Desde agencias de automóviles hasta talleres mecánicos,
                gomerías, rent a car, casas de repuestos, lubricentros,
                aseguradoras, estaciones de servicio y servicios de estética
                automotriz, nuestro objetivo es ofrecerte un catálogo completo
                que cubra todas tus necesidades en un solo lugar.
              </p>
              <p>
                Trabajamos día a día para mejorar la experiencia de nuestros
                usuarios y potenciar el posicionamiento de las empresas dando
                una mayor difusión de las mismas, asesorándolas para que estas
                puedan generar un incremento en sus visitas, siempre demostrando
                nuestro profesionalismo y transparencia.
              </p>
              <p>
                Te invitamos a explorar nuestro sitio y descubrir la amplia
                variedad de empresas que tenemos para ofrecerte. Somos Vefrek,
                la guía más completa del rubro automotor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="ppc" className="ppc mt-5">
        <div className="container-fluid" data-aos="zoom-in">
          <div className="text-center">
            <h3>POTENCIA AÚN MÁS A TU EMPRESA</h3>
            <p>
              Te brindamos la posibilidad de difundir a tu empresa e incrementar
              el alcance totalmente GRATIS
            </p>
            <Link to="/publicacion">
              <div className="ppc-btn">PUBLICITÁ AHORA</div>
            </Link>
          </div>
        </div>
      </section>

      <section id="values" className="values container-values">
        <div data-aos="fade-up">
          <div className="row-values">
            <div className="col-lg-6-values">
              <div
                className="icon-box-values"
                data-aos="zoom-in"
                data-aos-delay="150"
              >
                <div className="icon">
                  <i className="bx bx-user"></i>
                </div>
                <div className="text">
                  <h4>Responsabilidad</h4>
                  <p>
                    Cumplimos con todas las obligaciones que nos comprometemos a
                    realizar tanto con nuestros empleados como con nuestros
                    clientes.
                  </p>
                </div>
              </div>
              <div
                className="icon-box-values"
                data-aos="zoom-in"
                data-aos-delay="150"
              >
                <div className="icon">
                  <i className="bx bx-cube-alt"></i>
                </div>
                <div className="text">
                  <h4>Simplicidad</h4>
                  <p>Ofrecemos un servicio claro y de fácil acceso.</p>
                </div>
              </div>
              <div
                className="icon-box-values"
                data-aos="zoom-in"
                data-aos-delay="150"
              >
                <div className="icon">
                  <i className="bx bx-compass"></i>
                </div>
                <div className="text">
                  <h4>Orientación al cliente</h4>
                  <p>
                    Trabajamos para que las empresas puedan mejorar la difusión
                    de sus negocios y logren un mayor alcance.
                  </p>
                </div>
              </div>
              <div
                className="icon-box-values"
                data-aos="zoom-in"
                data-aos-delay="150"
              >
                <div className="icon">
                  <i className="bx bx-star"></i>
                </div>
                <div className="text">
                  <h4>Excelencia</h4>
                  <p>
                    Buscamos superarnos día a día y que los resultados se
                    reflejen en la calidad de atención a los clientes.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6-about order-lg-1-about"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <img
                src="images/valores.jpg"
                className="img-fluid"
                alt="Sobre Vefrek"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Comunícate con nosotros</h2>
            <p>CONTACTANOS</p>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2477.5367865926187!2d-69.230385!3d-51.6133755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbdb6fea979bfadd3%3A0x40864ca79df574a8!2sAlberdi%201118%20Depto%204%2C%20R%C3%ADo%20Gallegos%2C%20Santa%20Cruz!5e0!3m2!1ses-419!2sar!4v1654740207616!5m2!1ses-419!2sar"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map"
              ></iframe>

              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="info-contacto">
                    <div className="address">
                      <i className="bi bi-geo-alt"></i>
                      <h4>Dirección:</h4>
                      <p>Alberdi 1144, Depto 4, Río Gallegos, Santa Cruz</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="info-contacto">
                    <div className="email">
                      <i className="bi bi-envelope"></i>
                      <h4>Email:</h4>
                      <p>administracion@vefrek.com</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="info-contacto">
                    <div className="phone">
                      <i className="bi bi-phone"></i>
                      <h4>Teléfono:</h4>
                      <p>2966 15 23-1074</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mt-5 mt-lg-0">
              <form
                action="mailto:administracion@vefrek.com"
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
                  <div className="col-md-6 form-group">
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
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    id="subject"
                    placeholder="Asunto"
                    required
                  />
                </div>
                <div className="form-group">
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
