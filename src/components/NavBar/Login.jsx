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
    <section className="background">
      <div className="container-login">
        <div className="row-login">
          <div className="col-logo">
            <h1>
              Accede a los beneficios de{" "}
              <img src="/images/logos/logo-vefrek.png" alt="Vefrek" /> para
              incrementar sus ventas
              <br />
              <span>¡TOTALMENTE GRATIS!</span>
            </h1>
          </div>

          <div className="col-logo">
            <div className="login-card">
              <div>
                <h2>Bienvenido</h2>
                <div>
                  <input
                    type="email"
                    name="email"
                    className="form-login"
                    placeholder="Correo Electrónico"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    className="form-login"
                    placeholder="Contraseña"
                  />
                </div>

                <div className="login-links">
                  <h4>
                    <a href="#">Registrate</a>
                  </h4>
                  <h5>
                    <a href="#">¿Olvidaste tu contraseña?</a>
                  </h5>
                </div>

                <button className="login-btn">Iniciar Sesión</button>

                <hr />

                <div className="social-login">
                  <button className="btn-social-facebook">
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
                    <Link
                      className="text-center link-red"
                      to={`${process.env.REACT_APP_API_URL}api/auth/facebook`}
                    >
                      Iniciar sesión con Facebook
                    </Link>
                  </button>
                  <button className="btn-social-google">
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
                    <Link
                      className="text-center link-red"
                      to={`${process.env.REACT_APP_API_URL}api/auth/google`}
                    >
                      Iniciar sesión con Google
                    </Link>
                  </button>
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