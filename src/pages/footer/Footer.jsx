import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-info">
                <h3>VEFREK</h3>
                <p>
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
                  <i className="bx bx-chevron-right"></i> <a href="#">Home</a>
                </li>
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
                  <a href="html/termino-condiciones.html">
                    Términos y condiciones
                  </a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="html/politica-privacidad.html">
                    Política de Privacidad
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Servicios más consultados</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a href="#">Agencias</a>
                </li>
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
              <form action="" method="post">
                <input type="email" name="email" />
                <input type="submit" value="Subscribe" />
              </form>
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
