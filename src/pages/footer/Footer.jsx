import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/style.css";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  const myModalAvisoRef = useRef(null);
  const myModalPoliticaRef = useRef(null);
  const myInputRef = useRef(null);

  useEffect(() => {
    const myModalAviso = myModalAvisoRef.current;
    // const myModalPolitica = myModalPoliticaRef.current;
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
              {" "}
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
                  {" "}
                  <i className="bx bx-chevron-right"></i>{" "}
                  <HashLink smooth to="/home/Home#about">
                    Nosotros
                  </HashLink>
                </li>

                <li>
                  {" "}
                  <i className="bx bx-chevron-right"></i>{" "}
                  <HashLink smooth to="/home/Home#contact">
                    Contacto
                  </HashLink>
                </li>

                <li>
                  {" "}
                  <i className="bx bx-chevron-right"></i>{" "}
                  <>
                    <a
                      href="/"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Aviso Legal
                    </a>

                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                      ref={myModalAvisoRef}
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">
                              AVISO LEGAL
                            </h3>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <h5 className="modal-title2">
                              1. Titularidad del Sitio:
                            </h5>
                            <li>Titular: Biason Franco</li>
                            <li>Domicilio: Cacique Yatel 1895</li>
                            <li>Email: administracion@vefrek.com</li>
                            <li>Teléfono: 2966 23-1074</li>
                            <h5 className="modal-title2">
                              2. Propiedad Intelectual:
                            </h5>
                            <p>
                              Todo el contenido presente en este sitio web,
                              incluyendo pero no limitado a textos, imágenes,
                              logotipos, gráficos, videos y diseños, está
                              protegido por derechos de autor y otras leyes de
                              propiedad intelectual. Está prohibido el uso no
                              autorizado de cualquier parte del contenido sin el
                              consentimiento previo por escrito de Vefrek.
                            </p>
                            <h5 className="modal-title2">
                              3. Limitación de Responsabilidad:
                            </h5>
                            <p>
                              Nos esforzamos por proporcionar información
                              precisa y actualizada en nuestro sitio web. Sin
                              embargo, no garantizamos la precisión, integridad
                              o actualidad de la información proporcionada. No
                              seremos responsables de ningún daño directo,
                              indirecto, incidental, especial o consecuente que
                              surja del uso o la imposibilidad de utilizar
                              nuestro sitio web.
                            </p>
                            <h5 className="modal-title2">
                              4. Enlaces a Terceros:
                            </h5>
                            <p>
                              Nuestro sitio web puede contener enlaces a sitios
                              web de terceros. Estos enlaces son proporcionados
                              únicamente para tu conveniencia. No tenemos
                              control sobre el contenido de estos sitios web de
                              terceros y no asumimos ninguna responsabilidad por
                              su contenido o prácticas de privacidad.
                            </p>
                            <h5 className="modal-title2">
                              5. Jurisdicción y Ley Aplicable:
                            </h5>
                            <p>
                              Este Aviso Legal se regirá e interpretará de
                              acuerdo con las leyes de la República Argentina.
                              Cualquier disputa que surja en relación con este
                              Aviso Legal estará sujeta a la jurisdicción
                              exclusiva de los tribunales de la ciudad de Rio
                              Gallegos, provincia Santa Cruz.
                            </p>
                            <h5 className="modal-title2">6. Modificaciones:</h5>
                            <p>
                              Nos reservamos el derecho de modificar este Aviso
                              Legal en cualquier momento. Cualquier cambio
                              entrará en vigencia inmediatamente después de su
                              publicación en este sitio web. Al acceder y
                              utilizar nuestro sitio web, aceptas los términos y
                              condiciones establecidos en este Aviso Legal. Si
                              no estás de acuerdo con estos términos, por favor,
                              abstente de usar nuestro sitio web. Si tienes
                              alguna pregunta sobre este Aviso Legal,
                              contáctanos a nuestro correo oficial
                              administracion@vefrek.com.
                            </p>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Cerrar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </li>
                <li>
                  {" "}
                  <i className="bx bx-chevron-right"></i>{" "}
                  <>
                    <a
                      href="/"
                      className="text-start"
                      data-bs-toggle="modal"
                      data-bs-target="#ModalPrivacidad"
                    >
                      Política de Privacidad
                    </a>

                    <div
                      className="modal fade"
                      id="ModalPrivacidad" // Cambiado el ID del modal
                      tabIndex="-1"
                      aria-labelledby="ModalPrivacidadLabel"
                      aria-hidden="true"
                      ref={myModalPoliticaRef} // Asignado el ref correcto
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">
                              POLITICA DE PRIVACIDAD
                            </h3>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <p>
                              Gracias por visitar Vefrek. Tu privacidad es
                              importante para nosotros. Esta Política de
                              Privacidad explica cómo recopilamos, usamos,
                              divulgamos y protegemos la información personal
                              que obtenemos a través de nuestro sitio web
                              https://vefrek.com. Al usar el Sitio, aceptas los
                              términos de esta Política de Privacidad.
                            </p>
                            <h5 className="modal-title2">
                              1. Información que recopilamos:
                            </h5>
                            <p>
                              a. Información que nos proporcionas: Podemos
                              recopilar información personal que nos
                              proporcionas voluntariamente al interactuar con el
                              Sitio, como tu nombre, dirección de correo
                              electrónico, número de teléfono y cualquier otra
                              información que decidas proporcionar al utilizar
                              nuestros servicios, como al dejar reseñas o
                              calificaciones de las empresas listadas en nuestro
                              sitio.
                            </p>
                            <p>
                              b. Información recopilada automáticamente: Cuando
                              visitas nuestro Sitio, podemos recopilar cierta
                              información automáticamente, como tu dirección IP,
                              tipo de navegador, proveedor de servicios de
                              Internet, páginas de referencia/salida, sistema
                              operativo, marca de tiempo y/o datos de
                              navegación. También podemos recopilar información
                              sobre cómo interactúas con nuestro Sitio, como las
                              páginas que visitas y las acciones que realizas.
                            </p>

                            <h5 className="modal-title2">
                              2. Uso de la información:
                            </h5>
                            <p>
                              a. Utilizamos la información que recopilamos para
                              proporcionar y mantener nuestro Sitio, mejorar y
                              personalizar tu experiencia, comunicarnos contigo,
                              responder a tus consultas y proporcionarte
                              información relevante sobre las empresas y
                              servicios relacionados con el sector automotor que
                              ofrecemos en nuestro Sitio.
                            </p>
                            <p>
                              b. Podemos utilizar información no identificable
                              para fines analíticos, estadísticos o de
                              investigación, con el fin de mejorar nuestros
                              servicios y la experiencia de usuario en nuestro
                              Sitio.
                            </p>
                            <h5 className="modal-title2">
                              3. Divulgación de la información:
                            </h5>
                            <p>
                              a. No vendemos, intercambiamos ni transferimos tu
                              información personal a terceros sin tu
                              consentimiento, excepto según lo permita esta
                              Política de Privacidad.
                            </p>
                            <p>
                              b. Podemos divulgar tu información personal a
                              terceros que nos ayuden a operar nuestro Sitio o a
                              llevar a cabo nuestro negocio, como proveedores de
                              servicios de alojamiento web, procesadores de
                              pagos y servicios de análisis, siempre y cuando
                              esos terceros acepten mantener la confidencialidad
                              de tu información.
                            </p>
                            <p>
                              c. También podemos divulgar tu información cuando
                              consideremos que la divulgación es apropiada para
                              cumplir con la ley, hacer cumplir las políticas de
                              nuestro Sitio o proteger nuestros derechos,
                              propiedad o seguridad, o los de otros.
                            </p>
                            <h5 className="modal-title2">
                              4. Cookies y tecnologías similares:
                            </h5>
                            <p>
                              Utilizamos cookies y tecnologías similares para
                              recopilar cierta información automáticamente y
                              mejorar la funcionalidad de nuestro Sitio. Puedes
                              configurar tu navegador para que te notifique
                              cuando se utilicen cookies y para rechazarlas si
                              lo deseas. Sin embargo, ten en cuenta que algunas
                              partes de nuestro Sitio pueden no funcionar
                              correctamente si desactivas las cookies.
                            </p>
                            <h5 className="modal-title2">
                              5. Enlaces a otros sitios web:
                            </h5>
                            <p>
                              Nuestro Sitio puede contener enlaces a sitios web
                              de terceros. No somos responsables de las
                              prácticas de privacidad o el contenido de dichos
                              sitios web. Te recomendamos que leas las políticas
                              de privacidad de cualquier sitio web al que
                              accedas desde nuestro Sitio.
                            </p>

                            <h5 className="modal-title2">6. Seguridad:</h5>
                            <p>
                              Implementamos medidas de seguridad para proteger
                              tu información personal. Sin embargo, debes tener
                              en cuenta que ninguna medida de seguridad es
                              completamente infalible y que no podemos
                              garantizar la seguridad de tu información.
                            </p>

                            <h5 className="modal-title2">
                              7. Cambios en esta Política de Privacidad:
                            </h5>
                            <p>
                              Nos reservamos el derecho de actualizar esta
                              Política de Privacidad en cualquier momento. Te
                              notificaremos cualquier cambio publicando la nueva
                              Política de Privacidad en esta página. Te
                              recomendamos que revises periódicamente esta
                              página para estar al tanto de cualquier cambio.
                            </p>

                            <h5 className="modal-title2">8. Contacto:</h5>
                            <p>
                              Si tienes alguna pregunta sobre esta Política de
                              Privacidad, contáctanos a nuestro correo
                              electrónico administracion@vefrek.com.
                            </p>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Cerrar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4 className="text-start">Servicios más consultados</h4>
              <ul>
                <li>
                  {" "}
                  <Link to="/Reparacion">
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Mecánicos</a>
                  </Link>
                </li>
                <li>
                  <Link to="/Reparacion">
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Gomerías</a>
                  </Link>
                </li>
                <li>
                  <Link to="/OtrosServicios">
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Serv. Emergencia</a>
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link to="/Reparacion">
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="#">Repuestos</a>
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
    </footer>
  );
};

export default Footer;
