import React, { useState, useEffect, useContext } from "react";
import CardNegocio from "../../components/CardNegocio";
import "./categorias.css";
import { findCompanys } from "../../utils/apiDb/apiDbAcions";
import { swalPopUp } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";
import { generateRegEx } from "../../utils/utils";

const Venta = () => {
  const { showSpinner } = useContext(SpinnerContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(1);

  const downloadData = async (category, subcategory) => {};

  useEffect(() => {
    downloadData("Venta y alquiler de vehículos");
  }, []);

  useEffect(() => {
    const range = document.getElementById("customRange1");
    const output = document.getElementById("rangevalue");

    const handleRangeChange = () => {
      setRangeValue(range.value);
    };

    range.addEventListener("input", handleRangeChange);

    return () => {
      range.removeEventListener("input", handleRangeChange);
    };
  }, []);

  const handleSelectChange = (e) => {
    // Tu lógica de cambio de selección aquí
  };

  return (
    <div className="background categorias">
      <div className="container text-center text-lg-start p-4">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-xxl-12 p-5">
            <h1>Venta y alquiler de vehículos</h1>
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
            onChange={(e) => setRangeValue(e.target.value)}
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
              <option value="Agencia">Agencias</option>
              <option value="Rent a Car">Rent a Car</option>
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

export default Venta;
