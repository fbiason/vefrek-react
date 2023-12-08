import React from "react";
import "./navbar.css";

const NavBar = () => {
  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-lg-between">
        <a href="index.html" className="logo me-auto me-lg-0">
          <img
            src="/images/logos/logo vefrek.png"
            alt="Logo Vefrek"
            className="img-fluid"
          />
        </a>
        <input
          type="text"
          name="buscar"
          id="buscar"
          size="35"
          placeholder="Buscar..."
        />
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li>
              <a className="nav-link scrollto" href="#hero">
                Lista de Precios
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="#services">
                Premium
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="html/login.html">
                Ingresa
              </a>
            </li>
            <li>
              <a
                className="nav-link scrollto"
                href="html/dashboard/dashboard.html"
              >
                Perfil
              </a>
            </li>
          </ul>
        </nav>
        <a href="html/publica-ahora.html" className="get-started-btn scrollto">
          ¡PUBLICA AHORA!
        </a>
      </div>
    </header>
  );
};

export default NavBar;
