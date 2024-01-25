import React, { useState } from "react";
import "./dashboard.css";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const [activeNavItem, setActiveNavItem] = useState(0);
  const navigate = useNavigate();

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

  const activityData = [
    {
      name: "BiWeb",
      image: "/images/biason.jpg",
    },
    {
      name: "Biason Automotores",
      image: "/images/portfolio/ba (1).jpeg",
    },
    {
      name: "YPF San Cristobal",
      image: "/images/portfolio/ba (2).jpeg",
    },
    {
      name: "Chapista Carlos",
      image: "/images/valores-prueba.png",
    },
    {
      name: "Mecanica Rufus",
      image: "/images/elfarohome.webp",
    },
  ];

  const scheduleData = [
    {
      day: "25",
      dayName: "Jueves",
      activity: "2x1 en Autopartes",
      empresa: "YPF",
      participants: [],
    },
    {
      day: "26",
      dayName: "Viernes",
      activity: "Descuento 50% Inifinia",
      empresa: "BiWeb",
      participants: [],
    },
    {
      day: "29",
      dayName: "Lunes",
      activity: "Chapista 30% off",
      empresa: "Biason Automotores",
      participants: [],
    },
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
            <h1>Negocios más consultados</h1>
            <div className="activity-container">
              {activityData.map((activity, index) => (
                <div key={index} className={`image-container img-${index + 1}`}>
                  <img src={activity.image} alt={activity.name} />
                  <div className="overlay">
                    <h3>{activity.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="left-bottom">
            <div className="weekly-schedule">
              <h1>Próximos descuentos</h1>
              <div className="calendar">
                {scheduleData.map((item, index) => (
                  <div
                    key={index}
                    className={`day-and-activity activity-${index + 1}`}
                  >
                    <div className="day">
                      <h1>{item.day}</h1>
                      <p>{item.dayName}</p>
                    </div>
                    <div className="activity">
                      <h2>{item.activity}</h2>
                      <p>{item.empresa}</p>
                      <div className="participants"></div>
                    </div>
                    <button className="btn-descuentos">Más info</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="right-content">
          <div className="user-info">
            <div className="icon-container">
              <i className="fa fa-bell nav-icon"></i>
            </div>
            <h5>Usuario1</h5>
            <img src="/images/biason.jpg" alt="user" />
            <button className="dashboardClose" onClick={() => navigate(-1)}>
              Cerrar
            </button>
          </div>
          <div className="active-calories">
            <h1 style={{ alignSelf: "flex-start" }}>Actividad</h1>

            <div className="active-calories-container">
              <div className="box" style={{ "--i": "85%" }}>
                <div className="circle">
                  <h2>
                    85<small>%</small>
                  </h2>
                </div>
              </div>
              <div className="calories-content">
                <p>
                  <span>Favoritos:</span> 10
                </p>
                <p>
                  <span>Comentarios:</span> 0
                </p>
                <p>
                  <span>Negocios Cargados:</span> 14
                </p>
              </div>
            </div>
          </div>

          <div className="friends-activity">
            <h1>Recomendaciones</h1>
            <div className="card-container">
              <div className="card">
                <div className="card-user-info">
                  <img src="/images/portfolio/biasonautomotores.jpeg" alt="" />
                  <h2>Biason Automotores</h2>
                </div>
                <img
                  className="card-img"
                  src="/images/portfolio/biasonautomotores.jpeg"
                  alt=""
                />
                <p>¿Qué esperas para cambiar tu vehículo? 🏃‍♀️🎉</p>
              </div>

              <div className="card card-two">
                <div className="card-user-info">
                  <img src="/images/biason.jpg" alt="" />
                  <h2>BiWeb</h2>
                </div>
                <img
                  className="card-img"
                  src="/images/portfolio/biasonautomotores.jpeg"
                  alt=""
                />
                <p>¿Qué esperas para cambiar tu vehículo? 🏃‍♀️🎉</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
