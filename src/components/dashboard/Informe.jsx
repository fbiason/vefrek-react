import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Chart } from "chart.js/auto";
import "./informe.css";
import Map from "./Map";
import NavBarDash from "./NavBarDash";

const Informe = () => {
  const [activeNavItem, setActiveNavItem] = useState(2);

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  useEffect(() => {
    const line = document.getElementById("line");
    const lineConfig = new Chart(line, {
      type: "line",
      data: {
        labels: [
          "enero",
          "febrero",
          "marzo",
          "abril",
          "mayo",
          "junio",
          "julio",
          "agosto",
          "septiembre",
          "octubre",
          "noviembre",
          "diciembre",
        ],
        datasets: [
          {
            label: "Cantidad de visitas",
            data: [10, 15, 20, 10, 25, 5, 10, 30, 20, 10, 15, 5],
            fill: false,
            borderColor: "#14ba75",
            backgroundColor: "##14ba75",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, []);

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
    <main className="dashboardMain">
      <NavBarDash></NavBarDash>

      <div>
        <div className="contenido-info">
          <div className="container card-informe row">
            <div className="panel post col-md-3">
              <a href="javascript:void();">
                <span>8 </span>Guardados
              </a>
            </div>
            <div className="panel comment col-md-3">
              <a href="javascript:void();">
                <span>39 </span>Reseñas recibidas
              </a>
            </div>
            <div className="panel page col-md-3">
              <a href="javascript:void();">
                <span>5 </span>Comentarios recibidos
              </a>
            </div>
            <div className="panel user col-md-3">
              <a href="javascript:void();">
                <span>400 </span>Empresas cargadas
              </a>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="card custom-card">
                <h3 className="chart-lbl">Visitas</h3>
                <div className="line-chart-container">
                  <canvas className="line-chart" id="line"></canvas>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-6">
              <div className="card custom-card">
                <h3 className="chart-lbl">Localización</h3>
                <div className="card-body">
                  <div className="body-mapa">
                    <div className="mapadiv">
                      <Map></Map>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Informe;
