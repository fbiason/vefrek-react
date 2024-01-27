import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./informe.css";

const Informe = () => {
  const [activeNavItem, setActiveNavItem] = useState(2);

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
          <div className="container card-informe">
            <div className="panel post">
              <a href="javascript:void();">
                <span>8 </span>Posts
              </a>
            </div>
            <div className="panel comment">
              <a href="javascript:void();">
                <span>39 </span>Comentarios
              </a>
            </div>
            <div className="panel page">
              <a href="javascript:void();">
                <span>5 </span>Valoraciones recibidas
              </a>
            </div>
            <div className="panel user">
              <a href="javascript:void();">
                <span>400 </span>Total de visitas
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Informe;
