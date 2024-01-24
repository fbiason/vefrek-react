import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardNegocio from "../CardNegocio";

const Favoritos = () => {
  const [activeNavItem, setActiveNavItem] = useState(0);

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  const menuItems = [
    { icon: "fa-house", text: "Inicio" },
    { icon: "fa-user", text: "Perfil" },
    { icon: "fa-chart-bar", text: "Informe" },
    { icon: "fa-calendar", text: "Calendario" },
    { icon: "fa-star", text: "Favoritos" },
    { icon: "fa-building", text: "Negocios" },
    { icon: "fa-envelope", text: "Mensajes" },
    { icon: "fa-sliders", text: "Configuracion" },
    { icon: "fa-user-tie", text: "Administrador" },
  ];

  return (
    <main className="dashboardCont">
      <nav className="main-menu">
        <Link to="/Dashboard">
          <img
            src="/images/logos/logo-vefrek.png"
            alt="Logo Vefrek"
            className="logo-dash"
          />
        </Link>
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`nav-item ${activeNavItem === index ? "active" : ""}`}
              onClick={() => handleNavItemClick(index)}
            >
              <Link to={index === 5 ? "/Favoritos" : "#"}>
                {" "}
                <i className={`fa ${item.icon} nav-icon`}></i>
                <span className="nav-text">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="content">
        <div className="left-content">
          <div className="activities">
            <h1>FAVORITOS</h1>
            <div className="row container">
              <div className="col-3">
                <CardNegocio />
              </div>
              <div className="col-3">
                <CardNegocio />
              </div>
              <div className="col-3">
                <CardNegocio />
              </div>
              <div className="col-3">
                <CardNegocio />
              </div>
            </div>
            <div className="row container mt-4">
              <div className="col-3">
                <CardNegocio />
              </div>
              <div className="col-3">
                <CardNegocio />
              </div>
              <div className="col-3">
                <CardNegocio />
              </div>
              <div className="col-3">
                <CardNegocio />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Favoritos;
