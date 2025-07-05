import React, { useState, useEffect, useContext, useRef } from "react";
import { findCompanys, findCompanys2 } from "../utils/apiDb/apiDbAcions";
import { swalPopUp } from "../utils/swal";
import { SpinnerContext } from "../context/spinnerContext";
import CardNegocio from "../components/CardNegocio";
import { calculateDistanceInKm } from "../utils/geo/calculateDistanceInKm";

const Negocios = ({ limitedTo300Km = false }) => {
    const [filter, setFilter] = useState("all");
    const [data, setData] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [map, setMap] = useState(null);
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
                (query) => Object.keys(query)[0].toLowerCase() === subcategory.toLowerCase()
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
                    <div className="negocio-card-col" key={company._id}>
                        <div onClick={() => handleSelectBusiness(company)} style={{ cursor: "pointer" }}>
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
                                <div className="card-portfolio" key={company._id}>
                                    <div onClick={() => handleSelectBusiness(company)} style={{ cursor: "pointer" }}>
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

        const filtersButtons = document.querySelectorAll(
            ".filter-btn-recomendados"
        );
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

    // Función para obtener la ubicación desde la dirección
    const getLocationFromAddress = async (address) => {
        try {
            const responseJSON = await fetch(
                `${process.env.REACT_APP_API_URL}api/getmap?address=${address}`,
                {
                    method: "GET",
                }
            );

            const responseOBJ = await responseJSON.json();
            if (responseOBJ.success) {
                return {
                    success: true,
                    url: responseOBJ.url
                };
            } else {
                return {
                    success: false,
                    message: "No se pudo obtener la ubicación"
                };
            }
        } catch (error) {
            console.error("Error al obtener el mapa:", error);
            return {
                success: false,
                message: "Error al conectar con el servicio de mapas"
            };
        }
    };

    // Función para mostrar el mapa cuando se selecciona un negocio
    const handleSelectBusiness = async (business) => {
        setSelectedBusiness(business);
        showSpinner(true);
        
        const mapResult = await getLocationFromAddress(business.location);
        
        if (mapResult.success) {
            setMap(
                <iframe
                    className="mapa-google"
                    title="map"
                    src={mapResult.url}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ width: "100%", height: "300px", borderRadius: "8px" }}
                />
            );
        } else {
            setMap(
                <div className="googleMapFrame flex" style={{ padding: "20px", background: "#eee", borderRadius: "8px", textAlign: "center" }}>
                    <p>No se pudo obtener la ubicación</p>
                    <p>Dirección: {business.location}</p>
                </div>
            );
        }
        
        showSpinner(false);
    };

    return (
      <div className="negocios-section">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <p>Encontra lo que tu vehículo necesita</p>
          </div>
          <div className="filter-options">
            <div className="filterTypeContRecomendados">
              <input
                type="checkbox"
                name="services"
                className="filterTypeInputRecomendados"
              />
              <p>Solo empresas con ofertas</p>
            </div>
            <div className="filterTypeContRecomendados">
              <input
                type="checkbox"
                name="services"
                className="filterTypeInputRecomendados"
              />
              <p>Servicios 24hs</p>
            </div>
          </div>

          <div className="row-recomendados">
            <div className="filter-recomendados">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn-recomendados ${
                    filter === category.toLowerCase()
                      ? "filter-btn-recomendados-active"
                      : ""
                  }`}
                  onClick={() => applyFilter(category.toLowerCase())}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="filter-img-negocios">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`filter ${
                    filter === "all" ? "" : `filter-${filter}`
                  }`}
                >
                  <img src={image} alt={`Im ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {selectedBusiness && (
            <div className="selected-business-map" style={{ marginBottom: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <h4>{selectedBusiness.name}</h4>
                <button 
                  onClick={() => setSelectedBusiness(null)} 
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#777" }}
                >
                  ✕
                </button>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <p><strong>Dirección:</strong> {selectedBusiness.location}</p>
                <p><strong>Teléfono:</strong> {selectedBusiness.phone}</p>
                <p><strong>Categoría:</strong> {selectedBusiness.subcategory}</p>
              </div>
              <div className="ubicacion-container" style={{ borderRadius: "8px", overflow: "hidden" }}>
                {map ? map : <p>Cargando mapa...</p>}
              </div>
            </div>
          )}

          <div className="row-cards" data-aos="fade-up" data-aos-delay="200">
            {data}
          </div>
        </div>
      </div>
    );
};

export default Negocios;
