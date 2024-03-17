import React, { useState, useEffect, useContext } from "react";
import ApexCharts from "apexcharts";
import "./informe.css";
import NavBarDash from "./NavBarDash";
import { useNavigate } from "react-router-dom";
import { findCompanys } from "../../utils/apiDb/apiDbAcions";
import { UserContext } from "../../context/userContext";
import { swalPopUp } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faCommentAlt,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Informe = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const [selectOptions, setSelectOptions] = useState();
  const { showSpinner } = useContext(SpinnerContext);

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
    const aggregateQueryJSON = JSON.stringify([{ $project: { name: 1 } }]);
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
      selectOptionsJSX.unshift(<option value="Todas">Todas</option>);
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
    ]);
    showSpinner(true);
    const responseOBJ = await findCompanys(mathQueryJSON, aggregateQueryJSON);
    showSpinner(false);
    const visitsMonthsArr = new Array(12);
    const thisYear = new Date().getFullYear();

    if (responseOBJ.success && responseOBJ.companysData) {
      const companysDataArr = responseOBJ.companysData;
      let visitsData;
      if (companyName && companyName !== "Todas") {
        //Se seleccionó alguna empresa en particular
        visitsData = companysDataArr.find(
          (company) => company.name === companyName
        ).visits;
      } else {
        //No se eligió ninguna empresa (Al cargar la página) o se eligió la opcion "Todas"
        const timestamps = [];
        companysDataArr.forEach((company) =>
          timestamps.push(...company.visits.timestamps)
        );
        visitsData = { timestamps };
      }
      if (visitsData && visitsData.timestamps.length) {
        for (let i = 0; i < 12; i++) {
          visitsMonthsArr[i] = visitsData.timestamps.filter(
            (timestamp) =>
              new Date(timestamp).getMonth() === i &&
              new Date(timestamp).getFullYear() === thisYear
          ).length;
        }
        options.series[0].data = visitsMonthsArr;
        const chartCont = document.querySelector("#chart");
        chartCont.innerHTML = "";
        const chart = new ApexCharts(chartCont, options);
        chart.render();
      } else {
        options.series[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const chartCont = document.querySelector("#chart");
        chartCont.innerHTML = "";
        const chart = new ApexCharts(chartCont, options);
        chart.render();
      }
      setShow(true);
    } else if (responseOBJ.success && !responseOBJ.companysData) {
      swalPopUp("Ops!", `No tienes empresas cargadas`, "info");
      console.log(responseOBJ.message);
      setShow(false);
    } else {
      swalPopUp("Ops!", responseOBJ.message, "error");
      setShow(false);
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

      <div className="info">
        <div className="contenido-info">
          <div>
            <h1 className="titulo-dash">Informe</h1>
          </div>
          <div className="container card-informe row">
            {show && (
              <>
                <div className="col-md-6">
                  <p>Seleccione su empresa:</p>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    onChange={(e) => setChart(e.target.value)}
                  >
                    {selectOptions}
                  </select>
                </div>
              </>
            )}

            <div className="row">
              <div className="col-xl-6 panel post col-md-12">
                <Link
                  href="/Informe"
                  className="text-decoration-none d-block position-relative"
                >
                  <span className="position-absolute top-0 start-0 translate-middle mt-3 ms-3">
                    <FontAwesomeIcon icon={faBookmark} size="2x" />
                  </span>
                  <span className="ms-5">8 </span>
                  <br />
                  Guardados
                </Link>
              </div>
              <div className="col-xl-6 panel comment col-md-12">
                <Link
                  href="/Informe"
                  className="text-decoration-none d-block position-relative"
                >
                  <span className="position-absolute top-0 start-0 translate-middle mt-3 ms-3">
                    <FontAwesomeIcon icon={faComment} size="2x" />
                  </span>
                  <span className="ms-5">39 </span>
                  <br />
                  Reseñas recibidas
                </Link>
              </div>
              <div className="col-xl-6 panel page col-md-12">
                <Link
                  href="/Informe"
                  className="text-decoration-none d-block position-relative"
                >
                  <span className="position-absolute top-0 start-0 translate-middle mt-3 ms-3">
                    <FontAwesomeIcon icon={faCommentAlt} size="2x" />
                  </span>
                  <span className="ms-5">5 </span>
                  <br />
                  Comentarios recibidos
                </Link>
              </div>
              <div className="col-xl-6 panel user col-md-12">
                <Link
                  href="/Informe"
                  className="text-decoration-none d-block position-relative"
                >
                  <span className="position-absolute top-0 start-0 translate-middle mt-3 ms-3">
                    <FontAwesomeIcon icon={faBuilding} size="2x" />
                  </span>
                  <span className="ms-5">400 </span>
                  <br />
                  Empresas cargadas
                </Link>
              </div>
            </div>

            {show && (
              <div className="col-md-6">
                <div className="card custom-card">
                  <h3 className="chart-lbl">Visitas</h3>
                  <div id="chart"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Informe;
