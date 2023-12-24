import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { swalPopUp } from "../../utils/swal";

const Footer = () => {
  const toTerminos = (e) => {
    e.preventDefault();
    swalPopUp("Ups!", "Tienes que loguerte para puclicar");
  };

  const toPolitica = (e) => {
    e.preventDefault();
    swalPopUp("Ups!", "Tienes que loguerte para puclicar");
  };

  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-info">
                <Link to="/PruebaCarga">
                  {" "}
                  <img
                    src="/images/logos/logo-vefrek-white.png"
                    alt="Vefrek"
                    className="vefrek-logo"
                  />
                </Link>
                <p className="mt-3">
                  Alberdi 1144, Depto 4 <br />
                  Rio Gallegos, Santa Cruz
                  <br />
                  <br />
                  <strong>Teléfono:</strong> +011 5320 0080
                  <br />
                  <strong>Email:</strong> administracion@vefrek.com
                  <br />
                </p>
                <div className="social-links mt-3">
                  <a href="#" className="facebook">
                    <i className="bx bxl-facebook"></i>
                  </a>
                  <a href="#" className="instagram">
                    <i className="bx bxl-instagram"></i>
                  </a>
                  <a href="#" className="linkedin">
                    <i className="bx bxl-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Links útiles</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="#">Servicios</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="#">Nosotros</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="/">
                    <a onClick={toTerminos}>Términos y Condiciones</a>
                  </a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="/">
                    <a onClick={toPolitica}>Politica de Privacidad</a>
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Servicios más consultados</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="#">Mecánicos</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="#">Gomerías</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="#">Serv. Emergencia</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="#">Repuestos</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Suscríbete a nuestro Newsletter</h4>
              <p>
                Suscríbete para que te enviemos todas las noticias de nuestro
                sitio
              </p>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Ingresa tu correo para suscribirte"
              />
              <button type="submit" className="btn ml-2">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; Copyright 2023{" "}
          <strong>
            <span>Vefrek</span>
          </strong>
          . Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
