import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { swalPopUp } from "../../utils/swal";

const Footer = () => {
  const myModalRef = useRef(null);
  const myInputRef = useRef(null);

  useEffect(() => {
    const myModal = myModalRef.current;
    const myInput = myInputRef.current;

    if (myModal && myInput) {
      const handleModalShown = () => {
        myInput.focus();
      };

      myModal.addEventListener("shown.bs.modal", handleModalShown);

      return () => {
        myModal.removeEventListener("shown.bs.modal", handleModalShown);
      };
    }
  }, []);

  const toTerminos = (e) => {
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
              <h4 className="text-start">Links útiles</h4>
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
                      ref={myModalRef}
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
                              Identificación y Titularidad
                            </h5>
                            <li>Titular: Reyes, Denis Javier</li>
                            <li>Domicilio: Alberdi 1144, Depto 4</li>
                            <li>Email: administracion@vefrek.com</li>
                            <li>Teléfono: +011 5320 0080</li>
                            <h5 className="modal-title2">Finalidad</h5>
                            <p>
                              La finalidad del Sitio Web es brindar información
                              sobre negocios relacionados al rubro automotor.
                            </p>
                            <h5 className="modal-title2">Condiciones de Uso</h5>
                            <p>
                              La utilización del Sitio Web le otorga la
                              condición de Usuario, e implica la aceptación
                              completa de todas las cláusulas y condiciones de
                              uso incluidas en ésta página: «Aviso Legal». Si no
                              estuviera conforme con todas y cada una de estas
                              cláusulas y condiciones absténgase de utilizar el
                              Sitio Web. El acceso al Sitio Web no supone, en
                              modo alguno, el inicio de una relación comercial
                              con el Titular. A través del Sitio Web, el Titular
                              le facilita el acceso y la utilización de diversos
                              contenidos que el Titular y/o sus colaboradores
                              han publicado por medio de Internet. A tal efecto,
                              está obligado y comprometido a NO utilizar
                              cualquiera de los contenidos del Sitio Web con
                              fines o efectos ilícitos, prohibidos en este Aviso
                              Legal o por la legislación vigente, lesivos de los
                              derechos e intereses de terceros, o que de
                              cualquier forma puedan dañar, inutilizar,
                              sobrecargar, deteriorar o impedir la normal
                              utilización de los contenidos, los equipos
                              informáticos o los documentos, archivos y toda
                              clase de contenidos almacenados en cualquier
                              equipo informático propios o contratados por el
                              Titular, de otros usuarios o de cualquier usuario
                              de Internet.
                            </p>
                            <h5 className="modal-title2">
                              Medidas de seguridad
                            </h5>
                            <p>
                              Los datos personales que facilite al Titular son
                              almacenados en bases de datos, cuya titularidad
                              corresponde en exclusiva al Titular, que asume
                              todas las medidas de índole técnica, organizativa
                              y de seguridad que garantizan la confidencialidad,
                              integridad y calidad de la información contenida
                              en las mismas de acuerdo con lo establecido en la
                              normativa vigente en protección de datos. No
                              obstante, debe ser consciente de que las medidas
                              de seguridad de los sistemas informáticos en
                              Internet no son enteramente fiables y que, por
                              tanto el Titular no puede garantizar la
                              inexistencia de virus u otros elementos que puedan
                              producir alteraciones en los sistemas informáticos
                              (software y hardware) del Usuario o en sus
                              documentos electrónicos y ficheros contenidos en
                              los mismos aunque el Titular pone todos los medios
                              necesarios y toma las medidas de seguridad
                              oportunas para evitar la presencia de estos
                              elementos dañinos.
                            </p>
                            <h5 className="modal-title2">Contenidos</h5>
                            <p>
                              El Titular ha obtenido la información, el
                              contenido multimedia y los materiales incluidos en
                              el Sitio Web de fuentes que considera fiables,
                              pero, si bien ha tomado todas las medidas
                              razonables para asegurar que la información
                              contenida es correcta, el Titular no garantiza que
                              sea exacta, completa o actualizada. El Titular
                              declina expresamente cualquier responsabilidad por
                              error u omisión en la información contenida en las
                              páginas del Sitio Web. Queda prohibido transmitir
                              o enviar a través del Sitio Web cualquier
                              contenido ilegal o ilícito, virus informáticos, o
                              mensajes que, en general, afecten o violen
                              derechos del Titular o de terceros. Los contenidos
                              del Sitio Web tienen únicamente una finalidad
                              informativa y bajo ninguna circunstancia deben
                              usarse ni considerarse como oferta de venta,
                              solicitud de una oferta de compra ni recomendación
                              para realizar cualquier otra operación, salvo que
                              así se indique expresamente. El Titular se reserva
                              el derecho a modificar, suspender, cancelar o
                              restringir el contenido del Sitio Web, los
                              vínculos o la información obtenida a través del
                              Sitio Web, sin necesidad de previo aviso. El
                              Titular no es responsable de los daños y
                              perjuicios que pudieran derivarse de la
                              utilización de la información del Sitio Web o de
                              la contenida en las redes sociales del Titular.
                            </p>
                            <h5 className="modal-title2">
                              Política de cookies
                            </h5>
                            <p>
                              El Titular obtiene y conserva la siguiente
                              información acerca de los visitantes del Sitio
                              Web:{" "}
                            </p>{" "}
                            <li>
                              El nombre de dominio del proveedor (PSI) y/o
                              dirección IP que les da acceso a la red.
                            </li>
                            <li> La fecha y hora de acceso al sitio Web.</li>{" "}
                            <li>
                              {" "}
                              La dirección de Internet origen del enlace que
                              dirige al sitio Web.
                            </li>
                            <li>
                              El número de visitantes diarios de cada sección.
                            </li>
                            <li>
                              {" "}
                              La información obtenida es totalmente anónima, y
                              en ningún caso puede ser asociada a un Usuario
                              concreto e identificado.
                            </li>
                            <h5 className="modal-title2">
                              Enlaces a otros sitios web
                            </h5>
                            <p>
                              El Titular puede proporcionarle acceso a sitios
                              Web de terceros mediante enlaces con la finalidad
                              exclusiva de informar sobre la existencia de otras
                              fuentes de información en Internet en las que
                              podrá ampliar los datos ofrecidos en el Sitio Web.
                              Estos enlaces a otros sitios Web no suponen en
                              ningún caso una sugerencia o recomendación para
                              que usted visite las páginas web de destino, que
                              están fuera del control del Titular, por lo que el
                              Titular no es responsable del contenido de los
                              sitios web vinculados ni del resultado que obtenga
                              al seguir los enlaces. Asimismo, el Titular no
                              responde de los links o enlaces ubicados en los
                              sitios web vinculados a los que le proporciona
                              acceso. El establecimiento del enlace no implica
                              en ningún caso la existencia de relaciones entre
                              el Titular y el propietario del sitio en el que se
                              establezca el enlace, ni la aceptación o
                              aprobación por parte del Titular de sus contenidos
                              o servicios. Si accede a un sitio web externo
                              desde un enlace que encuentre en el Sitio Web
                              usted deberá leer la propia política de privacidad
                              del otro sitio web que puede ser diferente de la
                              de este sitio Web.
                            </p>
                            <h5 className="modal-title2">
                              Propiedad intelectual e industrial
                            </h5>
                            <p>
                              Todos los derechos están reservados. Todo acceso a
                              este Sitio Web está sujeto a las siguientes
                              condiciones: la reproducción, almacenaje
                              permanente y la difusión de los contenidos o
                              cualquier otro uso que tenga finalidad pública o
                              comercial queda expresamente prohibida sin el
                              consentimiento previo expreso y por escrito del
                              Titular.
                            </p>
                            <h5 className="modal-title2">
                              Limitación de responsabilidad
                            </h5>
                            <p>
                              El Titular declina cualquier responsabilidad en
                              caso de que existan interrupciones o un mal
                              funcionamiento de los Servicios o contenidos
                              ofrecidos en Internet, cualquiera que sea su
                              causa. Asimismo, el Titular no se hace responsable
                              por caídas de la red, pérdidas de negocio a
                              consecuencia de dichas caídas, suspensiones
                              temporales de fluido eléctrico o cualquier otro
                              tipo de daño indirecto que se deba por causas
                              ajenas a el Titular. Antes de tomar decisiones y/o
                              acciones con base a la información incluida en el
                              Sitio Web, el Titular le recomienda comprobar y
                              contrastar la información recibida con otras
                              fuentes.
                            </p>
                            <h5 className="modal-title2">Contacto</h5>
                            <p>
                              En caso de que usted tenga cualquier duda acerca
                              de este Aviso Legal o quiera realizar cualquier
                              comentario sobre el Sitio Web, puede enviar un
                              mensaje de correo electrónico a la dirección:
                              administracion@vefrek.com o comunicarte
                              telefónicamente al siguiente número: 2966449951.
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
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Política de Privacidad
                    </a>

                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                      ref={myModalRef}
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
                            <h5 className="modal-title2">Quienes somos</h5>
                            <p>
                              La direccion de nuestra web es: www.vefrek.com
                            </p>
                            <h5 className="modal-title2">Comentarios</h5>
                            <p>
                              Cuando los visitantes dejan comentarios en la web,
                              recopilamos los datos que se muestran en el
                              formulario de comentarios, así como la dirección
                              IP del visitante y la cadena de agentes de usuario
                              del navegador para ayudar a la detección de spam.
                            </p>
                            <h5 className="modal-title2">Cookies</h5>
                            <p>
                              Si dejas un comentario en nuestro sitio puedes
                              elegir guardar tu nombre, dirección de correo
                              electrónico y web en cookies. Esto es para que no
                              tengas que volver a rellenar tus datos cuando
                              dejes otro comentario. Estas cookies tendrán una
                              duración de un año. Cuando te conectes a este
                              sitio, instalaremos una cookie temporal para
                              determinar si tu navegador acepta cookies. Esta
                              cookie no contiene datos personales y se elimina
                              al cerrar el navegador. Cuando accedas, tambien
                              instalaremos varias cookies para guardar tu
                              información de acceso y tus opciones de
                              visualización de pantalla. Las cookies de acceso
                              duran dos días, y las cookies de opciones de
                              pantalla duran un año. Si seleccionas
                              «Recuérdarme», tu acceso perdurará durante dos
                              semanas. Los únicos datos que se podrán guardar
                              serán al momento de completar el formulario en
                              «Contacto».
                            </p>

                            <h5 className="modal-title2">
                              Contenido incrustado de otros sitios web
                            </h5>
                            <p>
                              Los articulos de este sitio pueden incluir
                              contenido incrustado (por ejemplo, vídeos,
                              imágenes, artículos, etc.). El contenido
                              incrustado de otras webs se comporta exactamente
                              de la misma manera que si el visitante hubiera
                              visitado la otra web. Estas web pueden recopilar
                              datos sobre ti, utilizar cookies, incrustar un
                              seguimiento adicional de terceros, y supervisar tu
                              interacción con ese contenido incrustado, incluido
                              el seguimiento de tu interacción con el contenido
                              incrustado si tienes una cuenta y estás conectado
                              a esa web.
                            </p>
                            <h5 className="modal-title2">
                              Cuanto tiempo conservamos tus datos
                            </h5>
                            <p>
                              Si dejas un comentario, el comentario y sus
                              metadatos se conservan indefinidamente. Esto es
                              para que podamos reconocer y aprobar comentarios
                              sucesivos automáticamente, en lugar de mantenerlos
                              en una cola de moderación.
                            </p>
                            <h5 className="modal-title2">
                              Que derechos tienes sobre tus datos
                            </h5>
                            <p>
                              Si tienes una cuenta o has dejado comentarios en
                              esta web, puedes solicitar recibir un archivo de
                              exportación de los datos personales que tenemos
                              sobre ti, incluyendo cualquier dato que nos hayas
                              proporcionado. También puedes solicitar que
                              eliminemos cualquier dato personal que tengamos
                              sobre ti. Esto no incluye ningún dato que estemos
                              obligados a conservar con fines administrativos,
                              legales o de seguridad.
                            </p>
                            <h5 className="modal-title2">
                              Donde enviamos tus datos
                            </h5>
                            <p>
                              Los comentarios de los visitantes puede que los
                              revise un servicio de detección automática de
                              spam.
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
