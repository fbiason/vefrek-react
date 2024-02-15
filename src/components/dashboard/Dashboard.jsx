import React, { useState } from "react";
import "./dashboard.css";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Dashboard = () => {
  const [activeNavItem, setActiveNavItem] = useState(0);
  const navigate = useNavigate();
  const thisLocation = useLocation();

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
    <main className="dashboardMain">
      <nav className="menuDash">
        <Link to="/Map">
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
        <div className="left-content col-xl-9 col-lg-12 col-md-12">
          <div className="container col-xl-12">
            <div className="row fila1">
              <div className="col-md-12">
                <div className="mas-consultados">
                  <h1>Negocios más consultados</h1>
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                    {activityData.map((activity, index) => (
                      <div key={index} className="col mb-4">
                        <div className={`image-container img-${index + 1}`}>
                          <img
                            src={activity.image}
                            alt={activity.name}
                            className="img-fluid"
                          />
                          <div className="overlay">
                            <h3 className="text-white">{activity.name}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row fila2">
                <div className="col-xl-12 col-xxl-6 order-md-1 order-2">
                  <div className="left-bottom d-flex">
                    <div className="descuentos">
                      <h1 className="mb-4">Próximos descuentos</h1>
                      <div className="calendar">
                        {scheduleData.map((item, index) => (
                          <div
                            key={index}
                            className="day-and-activity activity-1 mb-3"
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
                            <button className="btn btn-outline-primary btn-descuentos">
                              Más info
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-12 col-xxl-6 order-md-2 order-1">
                  <div className="notifi-box" id="box">
                    <h2>
                      Comentarios recibidos{" "}
                      <span className="badge bg-secondary">3</span>
                    </h2>
                    <div className="comentarios-container">
                      <div className="notifi-item mb-3">
                        <div className="text">
                          <h5>Biason Automotores</h5>
                          <h4>Biason Franco</h4>
                          <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Ratione, vel veritatis facilis, enim natus
                            debitis asperiores molestiae alias illo nulla,
                            quaerat optio repellendus! Dolorem temporibus
                            voluptates animi vero soluta illum.
                          </p>
                        </div>
                      </div>
                      <div className="notifi-item mb-3">
                        <div className="text">
                          <h5>BiWeb</h5>
                          <h4>Ariel Conrado</h4>
                          <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Voluptates odio ipsam, iste odit quis velit
                            eius voluptatem rerum error deleniti vero adipisci
                            minima voluptatum unde ex, veniam a quo nisi?
                          </p>
                        </div>
                      </div>
                      <div className="notifi-item mb-3">
                        <div className="text">
                          <h5>YPF</h5>
                          <h4>Reyes Denis</h4>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Magni eligendi dicta harum excepturi
                            voluptatem eveniet magnam, temporibus tenetur minima
                            voluptate quo assumenda quia repellendus cumque
                            modi. Placeat consequuntur dolores ea!
                          </p>
                        </div>
                      </div>
                      <h5 className="p-3">Ver más comentarios...</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="right-content col-xl-3 col-lg-12 col-md-12">
          <div className="col-xl-12">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-4 mx-auto">
                  <div className="user-info d-flex align-items-center">
                    <h5>Usuario1</h5>
                  </div>
                </div>
                <div className="col-12 col-md-4 mx-auto p-4">
                  <div className="user-info align-items-center justify-content-center">
                    <img
                      src="/images/biason.jpg"
                      alt="user"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-4 mx-auto">
                  <div className="user-info d-flex align-items-center justify-content-center">
                    <button
                      className="btn btn-primary dashboardClose"
                      onClick={() => {
                        const previousSaved =
                          localStorage.getItem("previousPathToDash");
                        previousSaved
                          ? navigate(localStorage.getItem("previousPathToDash"))
                          : navigate("/");
                      }}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="recomendaciones mt-4">
              <h1>Recomendaciones</h1>
              <div className="card-container">
                <div className="card">
                  <div className="card-user-info">
                    <img
                      src="/images/portfolio/biasonautomotores.jpeg"
                      alt=""
                    />
                    <h2>Biason Automotores</h2>
                  </div>
                  <img
                    className="card-img"
                    src="/images/portfolio/biasonautomotores.jpeg"
                    alt=""
                  />
                  <p>¿Qué esperas para cambiar tu vehículo? 🏃‍♀️🎉</p>
                </div>

                <div className="card card-two mt-3">
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
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
