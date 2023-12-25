import React, { useState } from "react";
import CardNegocio from "../../components/CardNegocio";
import "./venta.css";

const Venta = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "seleccionarSubcategoria") {
      setSelectedOption("");
    } else {
      setSelectedOption(selectedValue);
    }
  };

  return (
    <section className="background">
      <div className="row title-row">
        <h1>Venta y Alquiler de Vehículos</h1>
      </div>

      <div className="row filter-row mt-3">
        <div className="filtro">
          <select value={selectedOption} onChange={handleSelectChange}>
            <option value="" disabled hidden>
              {selectedOption === "" ? "Seleccionar Subcategoría" : ""}
            </option>
            <option value="agencias">Agencias</option>
            <option value="rentacar">Rent a Car</option>
          </select>
        </div>
      </div>

      <div className="row cards-row justify-content-center mt-5">
        <div className="d-flex flex-wrap justify-content-center">
          <div className="col-xs-12 col-sm-6 col-md-4 cards-col">
            <CardNegocio />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 cards-col">
            <CardNegocio />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 cards-col">
            <CardNegocio />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venta;
