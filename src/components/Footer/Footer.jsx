import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AvisoLegal from "./AvisoLegal";
import PoliticaPrivacidad from "./PoliticaPrivacidad";

const Footer = () => {
  const myModalAvisoRef = useRef(null);
  const myModalPoliticaRef = useRef(null);
  const myInputRef = useRef(null);

  useEffect(() => {
    const myModalAviso = myModalAvisoRef.current;
    const myInput = myInputRef.current;

    if (myModalAviso && myInput) {
      const handleModalShown = () => {
        myInput.focus();
      };

      myModalAviso.addEventListener("shown.bs.modal", handleModalShown);

      return () => {
        myModalAviso.removeEventListener("shown.bs.modal", handleModalShown);
      };
    }
  }, []);

  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <Link to="/">
              <img
                src="/images/logos/logo-vefrek-white.png"
                alt="Vefrek"
                className="vefrek-logo-footer"
              />
            </Link>
            <div className="col-lg-3 col-md-6">
              <div className="footer-info">
                <p className="mt-3">
                  Cacique Yatel 1895
                  <br />
                  Rio Gallegos, Santa Cruz
                  <br />
                  <br />
                  <strong>Teléfono:</strong> 2966 15 23-1074
                  <br />
                  <strong>Email:</strong> administracion@vefrek.com
                  <br />
                </p>
                <div className="social-links mt-3">
                  <a
                    href="https://www.facebook.com/vefrek?mibextid=ZbWKwL"
                    className="facebook"
                  >
                    <i className="bx bxl-facebook"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/vefrek.oficial/?next=https%3A%2F%2Fwww.instagram.com%2F&hl=es-es"
                    className="instagram"
                  >
                    <i className="bx bxl-instagram"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h4 className="text-start">Links útiles</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <Link to="/home/Home#about">Nosotros</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <Link to="/home/Home#contact">Contacto</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <a
                    href="/"
                    data-bs-toggle="modal"
                    data-bs-target="#avisoLegalModal"
                  >
                    Aviso Legal
                  </a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <a
                    href="/"
                    data-bs-toggle="modal"
                    data-bs-target="#ModalPrivacidad"
                  >
                    Política de Privacidad
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4 className="text-start">Servicios más consultados</h4>
              <ul>
                <li>
                  <Link to="/Reparacion">
                    <i className="bx bx-chevron-right"></i> Mecánicos
                  </Link>
                </li>
                <li>
                  <Link to="/Reparacion">
                    <i className="bx bx-chevron-right"></i> Gomerías
                  </Link>
                </li>
                <li>
                  <Link to="/OtrosServicios">
                    <i className="bx bx-chevron-right"></i> Serv. Emergencia
                  </Link>
                </li>
                <li>
                  <Link to="/Reparacion">
                    <i className="bx bx-chevron-right"></i> Repuestos
                  </Link>
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
                className="form-control mt-3"
                placeholder="Ingresa tu correo para suscribirte"
              />
              <button type="submit" className="btn-news ml-2">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; Copyright 2024{" "}
          <strong>
            <span>Vefrek</span>
          </strong>
          . Todos los derechos reservados.
        </div>
      </div>

      {/* Componentes de modales */}
      <AvisoLegal />
      <PoliticaPrivacidad />
    </footer>
  );
};

export default Footer;
