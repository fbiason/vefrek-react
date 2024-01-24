import React, { useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
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

  const personalBestsData = [
    {
      label: "Fastest 5K Run",
      value: "22min",
      image:
        "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/242bbd8c-aaf8-4aee-a3e4-e0df62d1ab27",
    },
    {
      label: "Longest Distance Cycling",
      value: "4 miles",
      image:
        "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/a3b3cb3a-5127-498b-91cc-a1d39499164a",
    },
    {
      label: "Longest Roller-Skating",
      value: "2 hours",
      image:
        "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e0ee8ffb-faa8-462a-b44d-0a18c1d9604c",
    },
  ];

  return (
    <main>
      <nav className="main-menu">
        <img
          className="logo-dash"
          src="/images/logos/logo-vefrek.png"
          alt="vefrek"
        />
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`nav-item ${activeNavItem === index ? "active" : ""}`}
              onClick={() => handleNavItemClick(index)}
            >
              <b></b>
              <b></b>
              <a href="#">
                <i className={`fa ${item.icon} nav-icon`}></i>
                <span className="nav-text">{item.text}</span>
              </a>
            </li>
          ))}
        </ul>
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
                    <button className="btn">Más info</button>
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
              <i className="fa fa-message nav-icon"></i>
            </div>
            <h4>Usuario1</h4>
            <img src="/images/biason.jpg" alt="user" />
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
          <div className="mobile-personal-bests">
            <h1>Personal Bests</h1>
            <div className="personal-bests-container">
              <div className="best-item box-one">
                <p>Fastest 5K Run: 22min</p>
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/05dfc444-9ed3-44cc-96af-a9cf195f5820"
                  alt=""
                />
              </div>
              <div className="best-item box-two">
                <p>Longest Distance Cycling: 4 miles</p>
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/9ca170e9-1252-4fa6-8677-36493540c1f2"
                  alt=""
                />
              </div>
              <div className="best-item box-three">
                <p>Longest Roller-Skating: 2 hours</p>
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/262d1611-ed4c-4297-981c-480cf7f95714"
                  alt=""
                />
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
