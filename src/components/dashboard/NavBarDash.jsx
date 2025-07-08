import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import "../../styles/dashboard/dashboard.css";

const NavBarDash = () => {
  const [activeNavItem, setActiveNavItem] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userData } = useContext(UserContext);
  const location = useLocation();

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { icon: "fa-house", to: "/Dashboard", text: "Inicio" },
    { icon: "fa-user", to: "/Perfil", text: "Perfil" },
    { icon: "fa-chart-bar", to: "/Informe", text: "Informe" },
    { icon: "fa-calendar", to: "/Calendario", text: "Calendario" },
    { icon: "fa-star", to: "/Favoritos", text: "Favoritos" },
    { icon: "fa-building", to: "/NegociosDash", text: "Negocios" },
  ];

  // Solo agregar el ítem de Admin si el usuario es administrador
  if (userData && userData.role === "admin") {
    menuItems.push({ icon: "fa-user-tie", to: "/Admin", text: "Administrador" });
  }

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
      <Link to="/">
        <img
          src="/images/logos/v.png"
          alt="Logo Vefrek"
          className="logo-dash"
        />
      </Link>
      <ul className={isMenuOpen ? "active" : ""}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`nav-item ${
              location.pathname.endsWith(item.to) ? "active" : ""
            }`}
            onClick={() => handleNavItemClick(index)}
          >
            <Link to={item.to}>
              <i className={`fa ${item.icon} nav-icon`} title={item.text}></i>
              <span className="nav-text">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBarDash;
