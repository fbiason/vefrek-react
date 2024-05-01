import React, { useState, useEffect, useContext } from "react";
import CardNegocio from "../../components/CardNegocio";
import "./categorias.css";
import { findCompanys, findCompanys2 } from "../../utils/apiDb/apiDbAcions";
import { swalPopUp } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";
import { swalPopUpWithCallbacks } from "../../utils/swal";
import { calculateDistanceInKm } from "../../utils/geo/calculateDistanceInKm";

const Reparacion = () => {
    const { showSpinner } = useContext(SpinnerContext);
    const [data, setData] = useState([]);
    const [filterKmValue, setFilterKmValue] = useState(300);
    const [rangeValue, setRangeValue] = useState(300);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);
    const [actualPage, setActualPage] = useState(1);
    const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
    const companysForPage = 8;

    useEffect(() => {

        const setNegociosUpTo300Km = (opc) => {
            if (opc) {
                setCompanysUpTo300Km(selectedSubCategory, filterKmValue, selectedProvince, actualPage)
                localStorage.setItem("negociosUpTo300Km", true)
            } else {
                setCompanys(selectedSubCategory, selectedProvince, actualPage)
                localStorage.setItem("negociosUpTo300Km", false)
            }
        }

        const optionCompanysUpTo300Km = JSON.parse(localStorage.getItem("negociosUpTo300Km"));

        if (optionCompanysUpTo300Km === null) {
            swalPopUpWithCallbacks(
                "Quieres compartir tu ubicación?", 
                "Filtraremos los anuncios por cercanía", 
                "info", 
                () => setNegociosUpTo300Km(true), 
                () => setNegociosUpTo300Km(false), 
            )
        } else if (optionCompanysUpTo300Km === true) {
            setNegociosUpTo300Km(true);
        } else if (optionCompanysUpTo300Km === false) {
            setNegociosUpTo300Km(false);
        }
        
    }, [filterKmValue, selectedProvince, selectedSubCategory, actualPage])

    useEffect(() => {
        setActualPage(1);
    }, [filterKmValue, selectedProvince, selectedSubCategory])
    

    const dbQuerys = {
        todo: ["Gomería", "Taller mecánico", "Repuestos", "Lubricentro"],
        gomeria: ["Gomería"],
        taller: ["Taller mecánico"],
        repuestos: ["Repuestos"],
        lubricentro: ["Lubricentro"],
    };

    const setCompanysUpTo300Km = async (subcategorysArr, range = 300, selectedProvince, actualPage) => {
      
        const queryJSON = selectedProvince === "todo" ? JSON.stringify({ subcategory: { $in: subcategorysArr }}) : JSON.stringify({ subcategory: { $in: subcategorysArr }, state: selectedProvince});

        showSpinner(true);
        const response = await findCompanys2(queryJSON, "geo vefrek_website");
        if (response.success && response.companysData) {

            setTotalNumberOfPages(Math.ceil(response.companysData.length / companysForPage));
    
            const companysDataArr = response.companysData;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    const userGeolocation = {lat: latitude, lng: longitude};
                    const companysGeolocationArr = companysDataArr.map((company) => ({vefrek_website: company.vefrek_website, geo: {lat: company.geo.lat, lng: company.geo.lng}}));
                    const companysIn300KmArr = companysGeolocationArr.filter((company) => company.geo.lat && company.geo.lng && calculateDistanceInKm(userGeolocation.lat, userGeolocation.lng, company.geo.lat, company.geo.lng) <= range);
                    const companysIn300KmNamesArr = companysIn300KmArr.map((company) => company.vefrek_website);
                                        
                    const matchJSON = selectedProvince === "todo" ?
                    JSON.stringify({
                        subcategory: { $in: subcategorysArr },
                        vefrek_website: { $in: companysIn300KmNamesArr }
                    })
                    :
                    JSON.stringify({
                        state: selectedProvince,
                        subcategory: { $in: subcategorysArr },
                        vefrek_website: { $in: companysIn300KmNamesArr }
                    })                    
                    
                    const aggregateQueryJSON = JSON.stringify([
                        // { $sample: { size: 8 } },
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
                        setData(jsxArr.slice(actualPage - 1, actualPage - 1 + companysForPage));

                    } else if (response.success && !response.companysData) {
                        setData(<p>No se encontraron empresas a menos de 300Km de su ubicación</p>);
                    } else {
                        swalPopUp("Ops!", response.message, "error");
                    }
                    showSpinner(false);
                    
                })
            }
                
        } else if (response.success && !response.companysData) {
            setData(<p>No hay resultados</p>);
        } else {
            swalPopUp("Ops!", response.message, "error");
        }
        showSpinner(false);
    };
    
    const setCompanys = async (subcategorysArr, selectedProvince, actualPage) => {
      
        const matchJSON = selectedProvince === "todo" ? JSON.stringify({ subcategory: { $in: subcategorysArr } }) : JSON.stringify({ subcategory: { $in: subcategorysArr }, state: selectedProvince });

        showSpinner(true);

        const aggregateQueryJSON = JSON.stringify([
            // { $sample: { size: 8 } },
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
            setTotalNumberOfPages(Math.ceil(response.companysData.length / companysForPage));

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
            setData(jsxArr.slice(actualPage - 1, actualPage - 1 + companysForPage));

        } else if (response.success && !response.companysData) {
            setData(<p>No se encontraron empresas a menos de 300Km de su ubicación</p>);
        } else {
            swalPopUp("Ops!", response.message, "error");
        }
        showSpinner(false);

    };

    const handleSelectChangeSubCategory = (e) => {
        setSelectedSubCategory(dbQuerys[e.target.value]);
    };

    const handleRangeChange = (e) => {
        setRangeValue(e.target.value);
    };

    const handleChangeFilterKmValue = (e) => {
        setFilterKmValue(e.target.value);
    }

    const handleSelectChangeState = (e) => {
        setSelectedProvince(e.target.value);
    }

    const handleChangePage = (opc) => {
        if (opc) {
            if (actualPage + 1 <= totalNumberOfPages) {
                setActualPage(current => current + 1)
            }
        } else {
            if (actualPage - 1 > 0) {
                setActualPage(current => current - 1)
            }
        }
    }

    return (
        <div className="background categorias">
            <div className="container text-center text-lg-start p-4">
                <div className="row gx-lg-5 align-items-center mb-5">
                    <div className="col-xxl-12 p-5">
                        <h1>Reparación y Mantenimiento</h1>
                    </div>
                </div>

                {   
                    JSON.parse(localStorage.getItem("negociosUpTo300Km")) 
                    &&
                    <div className="row filter-row-km">
                        <label htmlFor="customRange1" className="form-label">
                            Km de distancia
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            id="customRange1"
                            min="1"
                            max="300"
                            step="1"
                            value={rangeValue}
                            onChange={handleRangeChange}
                            onMouseUp={handleChangeFilterKmValue}
                        />
                        <output id="rangevalue" className="p-3">
                            {rangeValue}
                        </output>
                    </div>
                }   
               
                <div className="row filter-row-cat mt-3">
                    <div>
                        <select onChange={handleSelectChangeSubCategory} className="filtro-categorias">
                            <option value="" disabled selected>
                                Seleccionar Subcategoría
                            </option>
                            <option value="todo">Todo</option>
                            <option value="gomeria">
                                Gomerías (arreglo y venta de cubiertas, alineación y balanceo)
                            </option>
                            <option value="taller">
                                Talleres Mecánicos (Mecánico, Chapistas, Electricistas)
                            </option>
                            <option value="repuestos">Repuestos (Autopartes)</option>
                            <option value="lubricentro">Lubricentros</option>
                        </select>
                    </div>
                </div>

                <div className="row filter-row-cat mt-3 filtro-provincias">
                    <div>
                        <select
                            onChange={handleSelectChangeState}
                            value={selectedProvince}
                            className="filtro-categorias"
                        >
                            <option value="" disabled>
                                Seleccionar Provincia
                            </option>
                            <option value="todo">Todas las Provincias</option>
                            <option value="Buenos Aires">Buenos Aires</option>
                            <option value="Ciudad Autónoma de Buenos Aires">CABA</option>
                            <option value="Catamarca">Catamarca</option>
                            <option value="Chaco">Chaco</option>
                            <option value="Chubut">Chubut</option>
                            <option value="Córdoba">Córdoba</option>
                            <option value="Corrientes">Corrientes</option>
                            <option value="Entre Ríos">Entre Ríos</option>
                            <option value="Formosa">Formosa</option>
                            <option value="Jujuy">Jujuy</option>
                            <option value="La Pampa">La Pampa</option>
                            <option value="La Rioja">La Rioja</option>
                            <option value="Mendoza">Mendoza</option>
                            <option value="Misiones">Misiones</option>
                            <option value="Neuquén">Neuquén</option>
                            <option value="Río Negro">Río Negro</option>
                            <option value="Salta">Salta</option>
                            <option value="San Juan">San Juan</option>
                            <option value="San Luis">San Luis</option>
                            <option value="Santa Cruz">Santa Cruz</option>
                            <option value="Santa Fe">Santa Fe</option>
                            <option value="Santiago del Estero">Santiago del Estero</option>
                            <option value="Tierra del Fuego">Tierra del Fuego</option>
                            <option value="Tucumán">Tucumán</option>
                        </select>
                    </div>
                </div>
            
                {
                    totalNumberOfPages ?
                    <div className="flex">
                        <button onClick={() => handleChangePage(false)} className="paginationButton">-</button>
                        <p>{actualPage} de {totalNumberOfPages}</p>
                        <button onClick={() => handleChangePage(true)} className="paginationButton">+</button>
                    </div>
                    :
                    <></>
                }

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-5 container-card container-cards-categorias">
                    {data}
                </div>

                {
                    totalNumberOfPages ?
                    <div className="flex">
                        <button onClick={() => handleChangePage(false)} className="paginationButton">-</button>
                        <p>{actualPage} de {totalNumberOfPages}</p>
                        <button onClick={() => handleChangePage(true)} className="paginationButton">+</button>
                    </div>
                    :
                    <></>
                }
            </div>
        </div>
    );
};

export default Reparacion;
