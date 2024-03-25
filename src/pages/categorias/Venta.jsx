import React, { useState, useEffect, useContext } from "react";
import CardNegocio from "../../components/CardNegocio";
import "./categorias.css";
import { findCompanys } from "../../utils/apiDb/apiDbAcions";
import { swalPopUp } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";

const Venta = () => {
  const { showSpinner } = useContext(SpinnerContext);
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(1);
  const [selectedProvince, setSelectedProvince] = useState("");

  const dbQuerys = {
    todo: ["Agencia", "Rent a Car"],
    agencias: ["Agencia"],
    rent: ["Rent a Car"],
  };

  const setCompanys = async (subcategorysArr) => {
    const matchJSON = JSON.stringify({ subcategory: { $in: subcategorysArr } });
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
      setData(jsxArr);
    } else if (response.success && !response.companysData) {
      setData(<p>No hay resultados</p>);
    } else {
      swalPopUp("Ops!", response.message, "error");
    }
    showSpinner(false);
  };

  useEffect(() => {
    setCompanys(dbQuerys.todo);
    // eslint-disable-next-line
  }, []);

  const handleSelectChange = (e) => {
    setCompanys(dbQuerys[e.target.value]);
  };

  const handleRangeChange = (e) => {
    setRangeValue(e.target.value);
  };

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
  };

  return (
    <div className="background categorias">
      <div className="container text-center text-lg-start p-4">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-xxl-12 p-5">
            <h1>Venta y alquiler de vehículos</h1>
          </div>
        </div>

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
          />
          <output id="rangevalue" className="p-3">
            {rangeValue}
          </output>
        </div>

        <div className="row filter-row-cat mt-3">
          <div>
            <select onChange={handleSelectChange} className="filtro-categorias">
              <option value="" disabled selected>
                Seleccionar Subcategoría
              </option>
              <option value="todo">Todo</option>
              <option value="agencias">Agencias</option>
              <option value="rent">Rent a Car</option>
            </select>
          </div>
        </div>

        <div className="row filter-row-cat mt-3">
          <div>
            <select
              onChange={handleSelectChange}
              value={selectedProvince}
              className="filtro-categorias"
            >
              <option value="" disabled>
                Seleccionar Provincia
              </option>
              <option value="todo">Todas las Provincias</option>
              <option value="Buenos Aires">Buenos Aires</option>
              <option value="CABA">CABA</option>
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

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-5">
          {data}
        </div>
      </div>
    </div>
  );
};

export default Venta;
