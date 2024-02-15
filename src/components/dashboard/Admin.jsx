import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBarDash from "./NavBarDash";

const Admin = () => {
  const [activeNavItem, setActiveNavItem] = useState(8);

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  const menuItems = [
    { icon: "fa-house", text: "Inicio", to: "/Dashboard" },
    { icon: "fa-user", text: "Perfil", to: "/Perfil" },
    { icon: "fa-chart-bar", text: "Informe", to: "/Informe" },
    { icon: "fa-calendar", text: "Calendario", to: "/Calendario" },
    { icon: "fa-star", text: "Favoritos", to: "/Favoritos" },
    { icon: "fa-building", text: "Negocios", to: "/NegociosDash" },
    { icon: "fa-user-tie", text: "Administrador", to: "/Admin" },
  ];
  return (
    <main className="dashboardCont">
      <NavBarDash></NavBarDash>

      <section className="content">
        <div className="left-content">
          <div className="activities">
            <h1>Admin</h1>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Admin;
