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
    { icon: "fa-house", text: "Inicio", to: "/Dashboard" },
    { icon: "fa-user", text: "Perfil", to: "/Perfil" },
    { icon: "fa-chart-bar", text: "Informe", to: "/Informe" },
    { icon: "fa-calendar", text: "Calendario", to: "/Calendario" },
    { icon: "fa-star", text: "Favoritos", to: "/Favoritos" },
    { icon: "fa-building", text: "Negocios", to: "/NegociosDash" },
    { icon: "fa-user-tie", text: "Admin", to: "/Admin" },
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
      <Link to="/Map">
        <img
          src="/images/logos/logo-vefrek.png"
          alt="Logo Vefrek"
          className="logo-dash"
        />
      </Link>
      <ul className={isMenuOpen ? "active" : ""}>
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
      </ul>
    </nav>
  );
};

export default NavBarDash;
