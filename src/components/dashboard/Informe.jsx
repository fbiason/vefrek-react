import React, { useState, useEffect, useContext } from "react";
import ApexCharts from "apexcharts";
import "./informe.css";
import NavBarDash from "./NavBarDash";
import { useNavigate } from "react-router-dom";
import { findCompanys } from "../../utils/apiDb/apiDbAcions";
import { UserContext } from "../../context/userContext";
import { swalPopUp } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";

const Informe = () => {
  const [activeNavItem, setActiveNavItem] = useState(2);
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const [selectOptions, setSelectOptions] = useState();
  const { showSpinner } = useContext(SpinnerContext);

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  let options = {
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

  const setCompanySelect = async () => {
    const mathQueryJSON = JSON.stringify({ registeremail: userData.email });
    const aggregateQueryJSON = JSON.stringify([{ $project: { name: 1 } }]); //Selecciona solo el campo "visits"
    showSpinner(true);
    const responseOBJ = await findCompanys(mathQueryJSON, aggregateQueryJSON);
    showSpinner(false);

    if (responseOBJ.success && responseOBJ.companysData) {
      const companysDataArr = responseOBJ.companysData;
      const selectOptionsJSX = companysDataArr.map((company, index) => (
        <option value={company.name} key={index}>
          {company.name}
        </option>
      ));
      setSelectOptions(selectOptionsJSX);
    } else if (responseOBJ.success && !responseOBJ.companysData) {
      swalPopUp("Ops!", responseOBJ.message, "info");
    } else {
      swalPopUp("Ops!", responseOBJ.message, "error");
    }
  };

  const setChart = async (companyName) => {
    const mathQueryJSON = JSON.stringify({ registeremail: userData.email });
    const aggregateQueryJSON = JSON.stringify([
      { $project: { visits: 1, name: 1 } },
    ]); //Selecciona solo los campos "visits" y "name"
    showSpinner(true);
    const responseOBJ = await findCompanys(mathQueryJSON, aggregateQueryJSON);
    showSpinner(false);
    const visitsMonthsArr = new Array(12);
    const thisYear = new Date().getFullYear();

    if (responseOBJ.success && responseOBJ.companysData) {
      const companysDataArr = responseOBJ.companysData;
      const visitsData = companyName
        ? companysDataArr.find((company) => company.name === companyName).visits
        : companysDataArr[0].visits;
      for (let i = 0; i < 12; i++) {
        visitsMonthsArr[i] = visitsData.timestamps.filter(
          (timestamp) =>
            new Date(timestamp).getMonth() === i &&
            new Date(timestamp).getFullYear() === thisYear
        ).length; //Obtiene visitas por mes para el año actual
      }
      options.series[0].data = visitsMonthsArr;
      const chartCont = document.querySelector("#chart");
      chartCont.innerHTML = "";
      var chart = new ApexCharts(chartCont, options);
      chart.render();
    } else if (responseOBJ.success && !responseOBJ.companysData) {
      swalPopUp("Ops!", responseOBJ.message, "info");
    } else {
      swalPopUp("Ops!", responseOBJ.message, "error");
    }
  };

  useEffect(() => {
    if (userData.email) {
      (async () => {
        await setCompanySelect();
        await setChart();
      })();
    }
    // eslint-disable-next-line
  }, [userData.email]);

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

      <di className="content">
        <div className="contenido-info">
          <div className="container card-informe row">
            {/* Nueva fila y columnas */}
            <div className="col-md-6">
              <p>Seleccione su empresa:</p>
            </div>
            <div className="col-md-6">
              <select onChange={(e) => setChart(e.target.value)}>
                {selectOptions}
                {/* <option value="todos">Todos</option>
                                <option value="biason">Biason Automotores</option>
                                <option value="ypf">YPF</option>
                                <option value="biweb">BiWeb</option> */}
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
