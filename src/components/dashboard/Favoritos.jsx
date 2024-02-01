import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CardNegocio from "../CardNegocio";
import { UserContext } from "../../context/userContext";
import { swalPopUp } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";
import { findCompanys } from "../../utils/apiDb/apiDbAcions";

const Favoritos = () => {
  const { userData } = useContext(UserContext);
  const { showSpinner } = useContext(SpinnerContext);
  const [activeNavItem, setActiveNavItem] = useState(4);
  const [favoritesCompanys, setFavoritesCompanys] = useState([]);

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
    { icon: "fa-user-tie", text: "Administrador", to: "/Admin" },
  ];

  const getFavoritesCompanys = async () => {
    const matchJSON = JSON.stringify({ favorites: { $in: [userData.email] } });
    const aggregateQueryJSON = JSON.stringify([
      { $limit: 8 },
      {
        $project: {
          subcategory: 1,
          name: 1,
          "images.images": 1,
          location: 1,
          phone: 1,
          _id: 1,
          vefrek_website: 1,
          favorites: 1,
        },
      },
    ]);

    showSpinner(true);
    const response = await findCompanys(matchJSON, aggregateQueryJSON);
    if (response.success && response.companysData) {
      const jsxArr = response.companysData.map((company) => (
        <div className="col-md-3 card-portfolio" key={company._id}>
          <CardNegocio
            subcategory={company.subcategory}
            name={company.name}
            imgUrl={
              company.images.images[0] ? company.images.images[0].url : ""
            }
            location={company.location}
            phone={company.phone}
            id={company._id}
            vefrek_website={company.vefrek_website}
            favorites={company.favorites}
          />
        </div>
      ));
      setFavoritesCompanys(jsxArr);
    } else if (response.success && !response.companysData) {
      setFavoritesCompanys(<p>No hay resultados</p>);
    } else {
      swalPopUp("Ops!", response.message, "error");
    }
    showSpinner(false);
  };

  useEffect(() => {
    if (userData.isLogged) getFavoritesCompanys();
    // eslint-disable-next-line
  }, [userData.isLogged]);

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
            <h1>Favoritos</h1>
            <div className="row container">{favoritesCompanys}</div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Favoritos;
