import React, { useState, useEffect } from "react";
import { Chart } from "chart.js/auto";
import { Link } from "react-router-dom";
import "./informe.css";

const Informe = () => {
  const [activeNavItem, setActiveNavItem] = useState(2);

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  useEffect(() => {
    // WidgetChart 1
    var ctx = document.getElementById("widgetChart1");
    if (ctx) {
      ctx.height = 130;
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          type: "line",
          datasets: [
            {
              data: [78, 81, 80, 45, 34, 12, 40],
              label: "Dataset",
              backgroundColor: "rgba(255,255,255,.1)",
              borderColor: "rgba(255,255,255,.55)",
            },
          ],
        },
        options: {
          maintainAspectRatio: true,
          legend: {
            display: false,
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
          responsive: true,
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: "transparent",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  fontSize: 2,
                  fontColor: "transparent",
                },
              },
            ],
            yAxes: [
              {
                display: false,
                ticks: {
                  display: false,
                },
              },
            ],
          },
          title: {
            display: false,
          },
          elements: {
            line: {
              borderWidth: 0,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
            },
          },
        },
      });
    }

    // WidgetChart 2
    var ctx2 = document.getElementById("widgetChart2");
    if (ctx2) {
      ctx2.height = 130;
      var myChart2 = new Chart(ctx2, {
        type: "line",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          type: "line",
          datasets: [
            {
              data: [1, 18, 9, 17, 34, 22],
              label: "Dataset",
              backgroundColor: "transparent",
              borderColor: "rgba(255,255,255,.55)",
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          // ... (opciones adicionales)
        },
      });
    }
  }, []); // El segundo argumento del useEffect es un array de dependencias, en este caso está vacío

  const menuItems = [
    { icon: "fa-house", text: "Inicio", to: "/Dashboard" },
    { icon: "fa-user", text: "Perfil", to: "/PerfilDash" },
    { icon: "fa-chart-bar", text: "Informe", to: "/Informe" },
    { icon: "fa-calendar", text: "Calendario", to: "/Calendario" },
    { icon: "fa-star", text: "Favoritos", to: "/Favoritos" },
    { icon: "fa-building", text: "Negocios", to: "/NegociosDash" },
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
        <div className="section__content section__content--p30">
          <div className="container-fluid">
            <div className="row"></div>
            <div className="row m-t-25">
              <div className="col-sm-6 col-lg-3">
                <div className="overview-item overview-item--c1">
                  <div className="overview__inner">
                    <div className="overview-box clearfix">
                      <div className="icon">
                        <i className="zmdi zmdi-account-o"></i>
                      </div>
                      <div className="text">
                        <h2>10368</h2>
                        <span>members online</span>
                      </div>
                    </div>
                    <div className="overview-chart">
                      <canvas id="widgetChart1"></canvas>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="overview-item overview-item--c2">
                  <div className="overview__inner">
                    <div className="overview-box clearfix">
                      <div className="icon">
                        <i className="zmdi zmdi-shopping-cart"></i>
                      </div>
                      <div className="text">
                        <h2>388,688</h2>
                        <span>items solid</span>
                      </div>
                    </div>
                    <div className="overview-chart">
                      <canvas id="widgetChart2"></canvas>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="overview-item overview-item--c3">
                  <div className="overview__inner">
                    <div className="overview-box clearfix">
                      <div className="icon">
                        <i className="zmdi zmdi-calendar-note"></i>
                      </div>
                      <div className="text">
                        <h2>1,086</h2>
                        <span>this week</span>
                      </div>
                    </div>
                    <div className="overview-chart">
                      <canvas id="widgetChart3"></canvas>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="overview-item overview-item--c4">
                  <div className="overview__inner">
                    <div className="overview-box clearfix">
                      <div className="icon">
                        <i className="zmdi zmdi-money"></i>
                      </div>
                      <div className="text">
                        <h2>$1,060,386</h2>
                        <span>total earnings</span>
                      </div>
                    </div>
                    <div className="overview-chart">
                      <canvas id="widgetChart4"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="au-card recent-report">
                  <div className="au-card-inner">
                    <h3 className="title-2">recent reports</h3>
                    <div className="chart-info">
                      <div className="chart-info__left">
                        <div className="chart-note">
                          <span className="dot dot--blue"></span>
                          <span>products</span>
                        </div>
                        <div className="chart-note mr-0">
                          <span className="dot dot--green"></span>
                          <span>services</span>
                        </div>
                      </div>
                      <div className="chart-info__right">
                        <div className="chart-statis">
                          <span className="index incre">
                            <i className="zmdi zmdi-long-arrow-up"></i>25%
                          </span>
                          <span className="label">products</span>
                        </div>
                        <div className="chart-statis mr-0">
                          <span className="index decre">
                            <i className="zmdi zmdi-long-arrow-down"></i>10%
                          </span>
                          <span className="label">services</span>
                        </div>
                      </div>
                    </div>
                    <div className="recent-report__chart">
                      <canvas id="recent-rep-chart"></canvas>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="au-card chart-percent-card">
                  <div className="au-card-inner">
                    <h3 className="title-2 tm-b-5">chart by %</h3>
                    <div className="row no-gutters">
                      <div className="col-xl-6">
                        <div className="chart-note-wrap">
                          <div className="chart-note mr-0 d-block">
                            <span className="dot dot--blue"></span>
                            <span>products</span>
                          </div>
                          <div className="chart-note mr-0 d-block">
                            <span className="dot dot--red"></span>
                            <span>services</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="percent-chart">
                          <canvas id="percent-chart"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Informe;
