import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container">
      <div className="benefits">
        <p>
          Acceda a todos los beneficios de{" "}
          <img
            src="/images/logos/logo-vefrek.png"
            alt="Vefrek"
            className="vefrek-logo"
          />{" "}
          para incrementar sus ventas ¡TOTALMENTE GRATIS!
        </p>
      </div>
      <div className="login-card">
        <h2>Bienvenido</h2>
        <form>
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" />

          <div className="terms">
            <input type="checkbox" id="terms" name="terms" />
            <label htmlFor="terms">Acepto Términos y Condiciones</label>
          </div>

          <button type="submit">Iniciar Sesión</button>
        </form>

        <div className="additional-options">
          <p>
            No tienes cuenta? <span className="register-link">Registrate</span>
          </p>
          <p>Recuperar contraseña</p>
        </div>

        <hr className="divider" />

        <div className="social-buttons">
          <Link to={`${process.env.REACT_APP_API_URL}api/auth/facebook`}>
            <button className="facebook-button">
              Iniciar sesión con Facebook
            </button>
          </Link>
          <button className="google-button">Iniciar sesión con Google</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
