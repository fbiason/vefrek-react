import React, { useState, useEffect, useContext } from "react";
import CardNegocio from "../../components/CardNegocio";
import "./categorias.css";
import { findCompanys } from "../../utils/apiDb/apiDbAcions";
import { swalPopUp } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";
import { generateRegEx } from "../../utils/utils";

const Reparacion = () => {
  const { showSpinner } = useContext(SpinnerContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(1);

  const downloadData = async (category, subcategory) => {
    // tu lógica de descarga de datos aquí
  };

  useEffect(() => {
    downloadData("Reparación y mantenimiento");
  }, []);

  const handleSelectChange = (e) => {
    // tu lógica de cambio de selección aquí
  };

  const handleRangeChange = (e) => {
    setRangeValue(e.target.value);
  };

  return (
    <div className="background categorias">
      <div className="container text-center text-lg-start p-4">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-xxl-12 p-5">
            <h1>Reparación y Mantenimiento</h1>
          </div>
        </div>

        <div className="row filter-row mt-3">
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

        <div className="row filter-row mt-3">
          <div className="col-md-6 col-lg-4 filtro">
            <select
              value={selectedOption}
              onChange={handleSelectChange}
              className="form-select"
            >
              <option value="" disabled hidden>
                {selectedOption === "" ? "Seleccionar Subcategoría" : ""}
              </option>
              <option value="Gomería">
                Gomerías (arreglo y venta de cubiertas, alineación y balanceo)
              </option>
              <option value="Taller mecánico">
                Talleres Mecánicos (Mecánico, Chapistas, Electricistas)
              </option>
              <option value="Repuestos">Repuestos (Autopartes)</option>
              <option value="Lubricentro">Lubricentros</option>
            </select>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-5 container-card">
          {data}
        </div>
      </div>
    </div>
  );
};

export default Reparacion;
