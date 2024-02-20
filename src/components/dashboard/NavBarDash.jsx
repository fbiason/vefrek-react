import React, { useState } from "react";
import "./navbarDash.css";
import { Link } from "react-router-dom";

const NavBarDash = () => {
  const [activeNavItem, setActiveNavItem] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar si el menú está abierto o cerrado

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Cambia el estado de isMenuOpen al valor opuesto
  };

  const menuItems = [
    { icon: "fa-house", to: "/Dashboard", text: "Inicio" },
    { icon: "fa-user", to: "/Perfil", text: "Perfil" },
    { icon: "fa-chart-bar", to: "/Informe", text: "Informe" },
    { icon: "fa-calendar", to: "/Calendario", text: "Calendario" },
    { icon: "fa-star", to: "/Favoritos", text: "Favoritos" },
    { icon: "fa-building", to: "/NegociosDash", text: "Negocios" },
    { icon: "fa-user-tie", to: "/Admin", text: "Admin" },
  ];

  return (
    <nav className="menuDash">
      <input
        type="checkbox"
        id="menu-toggle"
        checked={isMenuOpen}
        onChange={handleMenuToggle}
      />
      <label htmlFor="menu-toggle" className="icon-burger">
        &#9776;
      </label>
      <Link to="/Home">
        <img
          src="/images/logos/v.png"
          alt="Logo Vefrek"
          className="logo-dash"
        />
      </Link>
      <div>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`nav-item ${activeNavItem === index ? "active" : ""}`}
            onClick={() => handleNavItemClick(index)}
          >
            <Link to={item.to}>
              <i className={`fa ${item.icon} nav-icon`} title={item.text}></i>
              <span className="nav-text">{item.text}</span>
            </Link>
          </li>
        ))}
      </div>
    </nav>
  );
};

export default NavBarDash;
