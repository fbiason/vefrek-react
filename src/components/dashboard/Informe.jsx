import React, { useState, useEffect, useContext, useRef } from "react";
import ApexCharts from "apexcharts";
import NavBarDash from "./NavBarDash";
import { useNavigate } from "react-router-dom";
import { findCompanys } from "../../utils/apiDb/apiDbAcions";
import { UserContext } from "../../context/userContext";
import { swalPopUp } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
    faComment,
    faCommentAlt,
    faBuilding,
    faEyeDropper,
    faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../styles/dashboard/dashboard.css";

const Informe = () => {
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);
    const [selectOptions, setSelectOptions] = useState();
    const { showSpinner } = useContext(SpinnerContext);
    const [reportInfo, setReporInfo] = useState({
        myFavoritesCount: "",
        averageReviewsScore: 0,
        reviewsCount: 0,
        visitsCount: 0,
    });
    const companysDataArrRef = useRef([]);
    const companyNameSelected = useRef("Todas");

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

    const findFavoritesCount = async (companysDataArr) => {
        if (companyNameSelected.current !== "Todas") {
            const matchQueryJSON = JSON.stringify({ name: companyNameSelected.current });
            const aggregateQueryJSON = JSON.stringify([
                {
                    $project: {
                        favorites: 1,
                    },
                },
            ]);

            const response = await findCompanys(matchQueryJSON, aggregateQueryJSON);
            if (response.success && response.companysData) {
                return response.companysData[0].favorites ? response.companysData[0].favorites.length : 0;
            }
        } else {
            return companysDataArr.reduce((acc, company) => acc + (company.favorites ? company.favorites.length : 0), 0);
        }
    };

    const setInitialInfo = async (companysDataArr) => {
        //Setea datos iniciales de todas las empresas cargadas
        const reportInfoByCompanyArr = companysDataArr.map((company) => {
            return {
                companyName: company.name,
                averageReviewsScore:
                    company.reviews && company.reviews.length
                        ? company.reviews.reduce(
                            (acc, review) => acc + review.numberOfStars,
                            0
                        ) / company.reviews.length
                        : 0,
                reviewsCount:
                    company.reviews && company.reviews.length
                        ? company.reviews.length
                        : 0,
                visitsCount: company && company.visits ? company.visits.count : 0,
            };
        });

        const totalAverageReviewsScore =
            reportInfoByCompanyArr.reduce(
                (acc, company) => acc + company.averageReviewsScore,
                0
            ) / reportInfoByCompanyArr.length;
        const totalReviewsCount = reportInfoByCompanyArr.reduce(
            (acc, company) => acc + company.reviewsCount,
            0
        );
        const totalVisitsCount = reportInfoByCompanyArr.reduce(
            (acc, company) => acc + company.visitsCount,
            0
        );
        const myFavoritesCount = await findFavoritesCount(companysDataArr);

        setReporInfo({
            averageReviewsScore: totalAverageReviewsScore,
            reviewsCount: totalReviewsCount,
            visitsCount: totalVisitsCount,
            myFavoritesCount,
        });
    };

    const setCompanySelect = async () => {
        const mathQueryJSON = JSON.stringify({ registeremail: userData.email });
        const aggregateQueryJSON = JSON.stringify([
            { $project: { name: 1, reviews: 1, visits: 1, favorites: 1 } },
        ]);
        showSpinner(true);
        const responseOBJ = await findCompanys(mathQueryJSON, aggregateQueryJSON);
        showSpinner(false);

        if (responseOBJ.success && responseOBJ.companysData) {
            const companysDataArr = responseOBJ.companysData;

            companysDataArrRef.current = structuredClone(companysDataArr);
            setInitialInfo(companysDataArr);

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

    const setReport = async (companyName) => {
        companyNameSelected.current = companyName;

        if (companyName !== "Todas" && companyName) {
            const companySelected = companysDataArrRef.current.find(
                (company) => company.name === companyName
            );
            setInitialInfo([companySelected]);
        } else if (companyName === "Todas") {
            setInitialInfo(companysDataArrRef.current);
        }

        /*********************** Seteo de gráfico de visitas *********************/

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
            swalPopUp("Ops!", `Aún no tienes visitas`, "info");
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
                await setReport();
            })();
        }
        // eslint-disable-next-line
    }, [userData.email]);
        
    return (
      <main className="dashboardMain">
        <NavBarDash />
        <button
          className="dashboardCloseBtn"
          onClick={() => {
            const previousSaved = localStorage.getItem("previousPathToDash");
            previousSaved
              ? navigate(localStorage.getItem("previousPathToDash"))
              : navigate("/");
          }}
        >
          Salir
        </button>

        <div className="infoSection">
          <div>
            <div>
              <h1 className="tituloInforme">Informe</h1>
            </div>

            <div className="containerInforme cardInforme">
              {show && (
                <>
                  <div className="fullWidth">
                    <p className="informeText">Seleccione su empresa:</p>
                  </div>
                  <div className="fullWidth mt-3">
                    <select
                      className="customSelect"
                      onChange={(e) => setReport(e.target.value)}
                    >
                      {selectOptions}
                    </select>
                  </div>
                </>
              )}

              <div className="informeGrid mt-4">
                <div className="informeDatos">
                  <div className="iconoYNumeros">
                    <FontAwesomeIcon icon={faStar} className="icono" />
                    <h1>{reportInfo.myFavoritesCount}</h1>
                  </div>
                  <p className="descripcionInforme">Guardados</p>
                </div>

                <div className="informeDatos">
                  <div className="iconoYNumeros">
                    <FontAwesomeIcon icon={faComment} className="icono" />
                    <h1>
                      {reportInfo.averageReviewsScore || (
                        <span className="noValoraciones">Sin valoraciones</span>
                      )}
                    </h1>
                  </div>
                  <p className="descripcionInforme">Promedio de valoraciones</p>
                </div>

                <div className="informeDatos">
                  <div className="iconoYNumeros">
                    <FontAwesomeIcon icon={faCommentAlt} className="icono" />
                    <h1>
                      {reportInfo.reviewsCount || (
                        <span className="noValoraciones">Sin comentarios</span>
                      )}
                    </h1>
                  </div>
                  <p className="descripcionInforme">Comentarios recibidos</p>
                </div>

                <div className="informeDatos">
                  <div className="iconoYNumeros">
                    <FontAwesomeIcon icon={faEye} className="icono" />
                    <h1>{reportInfo.visitsCount}</h1>
                  </div>
                  <p className="descripcionInforme">Visitas</p>
                </div>
              </div>

              {show && (
                <div className="visitasContainer mt-5">
                  <div className="customCard">
                    <h3 className="chartLabel">Visitas mensuales</h3>
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
