import React, { useState, useEffect, useContext } from "react";
import { findCompanys, findCompanys2 } from "../utils/apiDb/apiDbAcions";
import { swalPopUp } from "../utils/swal";
import { SpinnerContext } from "../context/spinnerContext";
import CardNegocio from "../components/CardNegocio";
import { calculateDistanceInKm } from "../utils/geo/calculateDistanceInKm";

const Negocios = ({ limitedTo300Km = false }) => {
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState([]);
  const { showSpinner } = useContext(SpinnerContext);
  const images = [];

  const categories = [
    "Todos",
    "Agencias",
    "Rent a Car",
    "Gomerías",
    "Mecánicos",
    "Repuestos",
    "Lubricentros",
    "Aseguradoras",
    "Est. de Servicios",
    "Estética Automotor",
  ];

  useEffect(() => {
    const dbQuerys = [
      { Todos: { $exists: true } },
      { Agencias: "Agencia" },
      { "Rent a Car": "Rent a Car" },
      { Gomerías: "Gomería" },
      { Mecánicos: "Taller mecánico" },
      { Repuestos: "Repuestos" },
      { Lubricentros: "Lubricentro" },
      { Aseguradoras: "Aseguradora" },
      { "Est. de Servicios": "Estación de Servicio" },
      { "Estética Automotor": "Estética del automotor" },
    ];

    const setCompanys = async (subcategory) => {
      const queryToAppy = dbQuerys.find(
        (query) => Object.keys(query)[0] === subcategory
      );
      const subcategoryParse = Object.values(queryToAppy)[0];
      const matchJSON = JSON.stringify({ subcategory: subcategoryParse });

      const aggregateQueryJSON = JSON.stringify([
        { $sample: { size: 8 } },
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
          <div className="col-md-4 col-xl-3 card-portfolio" key={company._id}>
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
        setData(jsxArr);
      } else if (response.success && !response.companysData) {
        setData(<p>No hay resultados</p>);
      } else {
        swalPopUp("Ops!", response.message, "error");
      }
      showSpinner(false);
    };

    const setCompanysLimitedTo300Km = async (subcategory) => {
      //Carga de negocios de hasta 300Km de lejanía
      const queryToAppy = dbQuerys.find(
        (query) => Object.keys(query)[0] === subcategory
      );
      const subcategoryParse = Object.values(queryToAppy)[0];
      const queryJSON = JSON.stringify({ subcategory: subcategoryParse });

      showSpinner(true);
      const response = await findCompanys2(queryJSON, "geo vefrek_website");
      if (response.success && response.companysData) {
        const companysDataArr = response.companysData;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const userGeolocation = { lat: latitude, lng: longitude };
            const companysGeolocationArr = companysDataArr.map((company) => ({
              vefrek_website: company.vefrek_website,
              geo: { lat: company.geo.lat, lng: company.geo.lng },
            }));
            const companysIn300KmArr = companysGeolocationArr.filter(
              (company) =>
                company.geo.lat &&
                company.geo.lng &&
                calculateDistanceInKm(
                  userGeolocation.lat,
                  userGeolocation.lng,
                  company.geo.lat,
                  company.geo.lng
                ) <= 300
            );
            const companysIn300KmNamesArr = companysIn300KmArr.map(
              (company) => company.vefrek_website
            );

            const queryToAppy = dbQuerys.find(
              (query) => Object.keys(query)[0] === subcategory
            );
            const subcategoryParse = Object.values(queryToAppy)[0];
            const matchJSON = JSON.stringify({
              subcategory: subcategoryParse,
              vefrek_website: { $in: companysIn300KmNamesArr },
            });

            const aggregateQueryJSON = JSON.stringify([
              { $sample: { size: 8 } },
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
                <div
                  className="col-md-4 col-xl-3 card-portfolio"
                  key={company._id}
                >
                  <CardNegocio
                    subcategory={company.subcategory}
                    name={company.name}
                    imgUrl={
                      company.images.images[0]
                        ? company.images.images[0].url
                        : ""
                    }
                    location={company.location}
                    phone={company.phone}
                    id={company._id}
                    vefrek_website={company.vefrek_website}
                    favorites={company.favorites}
                  />
                </div>
              ));
              setData(jsxArr);
            } else if (response.success && !response.companysData) {
              setData(
                <p>
                  No se encontraron empresas a menos de 300Km de su ubicación
                </p>
              );
            } else {
              swalPopUp("Ops!", response.message, "error");
            }
            showSpinner(false);
          });
        }
      } else if (response.success && !response.companysData) {
        setData(<p>No hay resultados</p>);
      } else {
        swalPopUp("Ops!", response.message, "error");
      }
      showSpinner(false);
    };

    limitedTo300Km ? setCompanysLimitedTo300Km("Todos") : setCompanys("Todos");

    const filtersButtons = document.querySelectorAll(".filter-button");
    filtersButtons.forEach((button) => {
      button.addEventListener("click", () => {
        limitedTo300Km
          ? setCompanysLimitedTo300Km(button.innerHTML)
          : setCompanys(button.innerHTML);
      });
    });
    // eslint-disable-next-line
  }, []);

  const applyFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="container hero neg-reco" data-aos="fade-up">
      <div>
        <h5>Encontra lo que tu vehículo necesita</h5>

        <div className="filterTypeContHome flex">
          <input
            type="checkbox"
            name="distance"
            className="filterTypeInputHome"
          />
          <p className="p-2">Solo empresas con ofertas</p>
          <label className="filterTypeLabelHome"></label>
        </div>

        <h1>Negocios recomendados</h1>
      </div>

      <div className="row filter-row">
        <div className="col filter-hero justify-center mb-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-button mt-2 mr-2 filter-button-default ${
                filter === category.toLowerCase() ? "filter-button-active" : ""
              }`}
              onClick={() => applyFilter(category.toLowerCase())}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="row grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`filter ${
                filter === "all" ? "" : `filter-${filter}`
              } hover:opacity-80 transition duration-300 ease-in-out col-12 col-md-6 col-lg-3`}
            >
              <img
                src={image}
                alt={`Im ${index + 1}`}
                className="w-full h-full object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="row cards-row justify-content-center text-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {data}
      </div>
    </div>
  );
};

export default Negocios;
