import React, { useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/style.css";

const Login = () => {
  const myModalAvisoRef = useRef(null);
  const myInputRef = useRef(null);
  const thisLocation = useLocation();
  const navigate = useNavigate();

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

  const toTyC = (e) => {
    e.preventDefault();
    localStorage.setItem("previousPathToTyC", thisLocation.pathname);
    navigate("/Terminos");
  };

  return (
    <section className="background-section">
      <div className="container text-center text-lg-start my-5 mx-auto">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="login col-lg-6 mb-5 mb-lg-0">
            <h1 className="my-5 display-5 fw-bold ls-tight">
              Accede a los beneficios de{" "}
              <img
                className="vefrek-logo-login"
                src="/images/logos/logo-vefrek.png"
                alt="Vefrek"
              />{" "}
              para incrementar sus ventas
              <br />
              <span>¡TOTALMENTE GRATIS!</span>
            </h1>
          </div>

          <div className="col-lg-6">
            <div className="login-card shadow-2-strong mx-auto">
              <div className="card-body p-4 text-center">
                <h2>Bienvenido</h2>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Correo Electrónico"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Contraseña"
                  />
                </div>

                <div className="text-center mb-3">
                  <div className="form-check d-inline-flex align-items-center">
                    <label htmlFor="connected" className="mb-0 me-2">
                      <a
                        href="/"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Políticas de Privacidad
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
                              <h3
                                className="modal-title"
                                id="exampleModalLabel"
                              >
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
                                https://vefrek.com. Al usar el Sitio, aceptas
                                los términos de esta Política de Privacidad.
                              </p>
                              <h5 className="modal-title2">
                                1. Información que recopilamos:
                              </h5>
                              <p>
                                a. Información que nos proporcionas: Podemos
                                recopilar información personal que nos
                                proporcionas voluntariamente al interactuar con
                                el Sitio, como tu nombre, dirección de correo
                                electrónico, número de teléfono y cualquier otra
                                información que decidas proporcionar al utilizar
                                nuestros servicios, como al dejar reseñas o
                                calificaciones de las empresas listadas en
                                nuestro sitio.
                              </p>
                              <p>
                                b. Información recopilada automáticamente:
                                Cuando visitas nuestro Sitio, podemos recopilar
                                cierta información automáticamente, como tu
                                dirección IP, tipo de navegador, proveedor de
                                servicios de Internet, páginas de
                                referencia/salida, sistema operativo, marca de
                                tiempo y/o datos de navegación. También podemos
                                recopilar información sobre cómo interactúas con
                                nuestro Sitio, como las páginas que visitas y
                                las acciones que realizas.
                              </p>

                              <h5 className="modal-title2">
                                2. Uso de la información:
                              </h5>
                              <p>
                                a. Utilizamos la información que recopilamos
                                para proporcionar y mantener nuestro Sitio,
                                mejorar y personalizar tu experiencia,
                                comunicarnos contigo, responder a tus consultas
                                y proporcionarte información relevante sobre las
                                empresas y servicios relacionados con el sector
                                automotor que ofrecemos en nuestro Sitio.
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
                                a. No vendemos, intercambiamos ni transferimos
                                tu información personal a terceros sin tu
                                consentimiento, excepto según lo permita esta
                                Política de Privacidad.
                              </p>
                              <p>
                                b. Podemos divulgar tu información personal a
                                terceros que nos ayuden a operar nuestro Sitio o
                                a llevar a cabo nuestro negocio, como
                                proveedores de servicios de alojamiento web,
                                procesadores de pagos y servicios de análisis,
                                siempre y cuando esos terceros acepten mantener
                                la confidencialidad de tu información.
                              </p>
                              <p>
                                c. También podemos divulgar tu información
                                cuando consideremos que la divulgación es
                                apropiada para cumplir con la ley, hacer cumplir
                                las políticas de nuestro Sitio o proteger
                                nuestros derechos, propiedad o seguridad, o los
                                de otros.
                              </p>
                              <h5 className="modal-title2">
                                4. Cookies y tecnologías similares:
                              </h5>
                              <p>
                                Utilizamos cookies y tecnologías similares para
                                recopilar cierta información automáticamente y
                                mejorar la funcionalidad de nuestro Sitio.
                                Puedes configurar tu navegador para que te
                                notifique cuando se utilicen cookies y para
                                rechazarlas si lo deseas. Sin embargo, ten en
                                cuenta que algunas partes de nuestro Sitio
                                pueden no funcionar correctamente si desactivas
                                las cookies.
                              </p>
                              <h5 className="modal-title2">
                                5. Enlaces a otros sitios web:
                              </h5>
                              <p>
                                Nuestro Sitio puede contener enlaces a sitios
                                web de terceros. No somos responsables de las
                                prácticas de privacidad o el contenido de dichos
                                sitios web. Te recomendamos que leas las
                                políticas de privacidad de cualquier sitio web
                                al que accedas desde nuestro Sitio.
                              </p>

                              <h5 className="modal-title2">6. Seguridad:</h5>
                              <p>
                                Implementamos medidas de seguridad para proteger
                                tu información personal. Sin embargo, debes
                                tener en cuenta que ninguna medida de seguridad
                                es completamente infalible y que no podemos
                                garantizar la seguridad de tu información.
                              </p>

                              <h5 className="modal-title2">
                                7. Cambios en esta Política de Privacidad:
                              </h5>
                              <p>
                                Nos reservamos el derecho de actualizar esta
                                Política de Privacidad en cualquier momento. Te
                                notificaremos cualquier cambio publicando la
                                nueva Política de Privacidad en esta página. Te
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
                    </label>
                    <input type="checkbox" id="connected" name="connected" />
                  </div>
                </div>

                <div className="my-3 login">
                  <span>
                    ¿No tienes cuenta?{" "}
                    <a className="acepto2" href="#">
                      Registrate
                    </a>
                  </span>
                  <br />
                  <span>
                    {" "}
                    <a className="acepto3" href="#">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </span>
                </div>

                <button
                  className="btn-login btn-lg btn-block mb-3 mx-auto d-block"
                  type="submit"
                >
                  Iniciar Sesión
                </button>

                <hr className="my-4" />

                <div className="container-fluid">
                  <div className="row">
                    <div className="col">
                      <button className="btn btn-outline-primary w-100 btn-social mb-2">
                        <div className="row align-items-center">
                          <div className="col-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-facebook"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                            </svg>
                          </div>
                          <Link
                            className="col-10 text-center link-red"
                            to={`${process.env.REACT_APP_API_URL}api/auth/facebook`}
                          >
                            Iniciar sesión con Facebook
                          </Link>
                        </div>
                      </button>
                    </div>

                    <div className="col">
                      <button className="btn btn-outline-danger w-100 btn-social">
                        <div className="row align-items-center">
                          <div className="col-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="16"
                              fill="currentColor"
                              className="bi bi-google"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                            </svg>
                          </div>
                          <Link
                            className="col-10 text-center link-red"
                            to={`${process.env.REACT_APP_API_URL}api/auth/google`}
                          >
                            Iniciar sesión con Google
                          </Link>
                        </div>
                      </button>
                    </div>
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

export default Login;
