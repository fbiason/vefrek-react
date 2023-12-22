import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="login-container">
      <div className="container text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1
              className="my-5 display-5 fw-bold ls-tight"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              Accede a todos los beneficios de{" "}
              <img
                className="vefrek-logo img-fluid"
                src="/images/logos/logo-vefrek.png"
                alt="Vefrek"
              />{" "}
              para incrementar sus ventas
              <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                ¡TOTALMENTE GRATIS!
              </span>
            </h1>
          </div>

          <div className="bienvenido">
            <div className="container">
              <div className="row justify-content-center align-items-center h-100">
                <div
                  className="card shadow-2-strong"
                  style={{ borderRadius: "1rem" }}
                >
                  <div className="card-body p-4 text-center">
                    <h3 className="mb-5 fw-bold">Bienvenido</h3>

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
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Contraseña"
                      />
                    </div>

                    <div className="txt-form mb-4">
                      <label className="form-check-label text-center">
                        <a className="acepto1" href="#">
                          Acepto Términos y Condiciones
                        </a>{" "}
                        <input
                          type="checkbox"
                          id="connected"
                          name="connected"
                          className="form-check-input"
                        />
                      </label>
                    </div>

                    <div className="my-3 login">
                      <span>
                        ¿No tenes cuenta?{" "}
                        <a className="acepto2" href="#">
                          Registrate
                        </a>
                      </span>
                      <br />
                      <span>
                        <a className="acepto3" href="#">
                          Recueperar contraseña
                        </a>
                      </span>
                    </div>

                    <button
                      className="btn-inicio btn-lg btn-block"
                      type="submit"
                    >
                      Iniciar Sesión
                    </button>

                    <hr className="my-4" />

                    <div className="container w-100 my-3">
                      <div className="col">
                        <button className="facebook-button btn-outline-primary w-100 my-1">
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
                        <div className="col">
                          <button className="google-button mt-2">
                            <div className="row align-items-center">
                              <div className="col-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
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
        </div>
      </div>
    </section>
  );
};

export default Login;
