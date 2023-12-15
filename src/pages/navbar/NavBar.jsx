import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-lg-between">
        <Link to="/" className="logo me-auto me-lg-0">
          <img
            src="/images/logos/logo vefrek.png"
            alt="Logo Vefrek"
            className="img-fluid"
          />
        </Link>
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
              <Link to="/" className="nav-link scrollto">
                Lista de Precios
              </Link>
            </li>
            <Link to="/login" className="nav-link scrollto">
              Ingresa
            </Link>
            <li>
              <Link to="/" className="nav-link scrollto">
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
        <Link to="/" className="get-started-btn scrollto">
          ¡PUBLICA AHORA!
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
