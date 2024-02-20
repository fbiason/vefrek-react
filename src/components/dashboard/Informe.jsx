import React, { useState, useEffect } from "react";
import { Chart } from "chart.js/auto";
import ApexCharts from "apexcharts";
import "./informe.css";
import Map from "./Map";
import NavBarDash from "./NavBarDash";
import { useNavigate } from "react-router-dom";

const Informe = () => {
  const [activeNavItem, setActiveNavItem] = useState(2);
  const navigate = useNavigate();

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  useEffect(() => {
    var options = {
      chart: {
        height: 280,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      series: [
        {
          name: "Series 1",
          data: [45, 52, 38, 45, 19, 23, 2],
        },
      ],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        categories: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
      },
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();
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
      <button
        className="btn btn-primary dashboardClose"
        onClick={() => {
          const previousSaved = localStorage.getItem("previousPathToDash");
          previousSaved
            ? navigate(localStorage.getItem("previousPathToDash"))
            : navigate("/");
        }}
      >
        Salir
      </button>

      <di className="background-item">
        <div className="contenido-info">
          <div className="container card-informe row">
            {/* Nueva fila y columnas */}
            <div className="col-md-6">
              <p>Seleccione su empresa:</p>
            </div>
            <div className="col-md-6">
              <select>
                <option value="todos">Todos</option>
                <option value="biason">Biason Automotores</option>
                <option value="ypf">YPF</option>
                <option value="biweb">BiWeb</option>
              </select>
            </div>
            {/* Fin de la nueva fila y columnas */}
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
                <div id="chart"></div>
              </div>
            </div>
          </div>

          {/* <div className="row mt-5">
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
        </div> */}
        </div>
      </di>
    </main>
  );
};

export default Informe;
