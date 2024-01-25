import React, { useState } from "react";
import { Link } from "react-router-dom";

const Configuracion = () => {
  const [activeNavItem, setActiveNavItem] = useState(7);

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  const menuItems = [
    { icon: "fa-house", text: "Inicio", to: "/Dashboard" },
    { icon: "fa-user", text: "Perfil", to: "/PerfilDash" },
    { icon: "fa-chart-bar", text: "Informe", to: "/Informe" },
    { icon: "fa-calendar", text: "Calendario", to: "/Calendario" },
    { icon: "fa-star", text: "Favoritos", to: "/Favoritos" },
    { icon: "fa-building", text: "Negocios", to: "/NegociosDash" },
    { icon: "fa-envelope", text: "Mensajes", to: "/Mensajes" },
    { icon: "fa-sliders", text: "Configuracion", to: "/Configuracion" },
    { icon: "fa-user-tie", text: "Administrador", to: "/Admin" },
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
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`nav-item ${activeNavItem === index ? "active" : ""}`}
            onClick={() => handleNavItemClick(index)}
          >
            <Link to={item.to}>
              <i className={`fa ${item.icon} nav-icon`}></i>
              <span className="nav-text">{item.text}</span>
            </Link>
          </li>
        ))}
      </nav>

      <section className="content">
        <div className="left-content">
          <div className="activities">
            <h1>CONFIGURACION</h1>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Configuracion;
