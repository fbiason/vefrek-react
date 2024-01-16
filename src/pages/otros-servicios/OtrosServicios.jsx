import React, { useState, useEffect, useContext } from "react";
import CardNegocio from "../../components/CardNegocio";
import "./otros-servicios.css";
import { findCompanys } from "../../utils/apiDb/apiDbAcions";
import { swalPopUp } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";

const OtrosServicios = () => {
  const { showSpinner } = useContext(SpinnerContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState([]);

  const downloadData = async (category, subcategory) => {
    const queryOBJ = { category: category };
    if (subcategory) queryOBJ.subcategory = subcategory;
    const queryJSON = JSON.stringify(queryOBJ);
    showSpinner(true);
    const response = await findCompanys(
      queryJSON,
      "subcategory name images location phone _id vefrek_website"
    );
    if (response.success && response.companysData) {
      const jsxArr = response.companysData.map((company) => (
        <div className="col-12 col-md-6 col-lg-4 cards-col" key={company._id}>
          <CardNegocio
            subcategory={company.subcategory}
            name={company.name}
            imgUrl={company.images.images[0].url}
            logoUrl={company.images.logo.url}
            location={company.location}
            phone={company.phone}
            id={company._id}
            vefrek_website={company.vefrek_website}
          />
        </div>
      ));
      setData(jsxArr);
    } else if (response.success && !response.companysData) {
      setData(<p>No hay resultados</p>);
      console.log(response.message);
    } else {
      swalPopUp("Ops!", response.message, "error");
    }
    showSpinner(false);
  };

  useEffect(() => {
    downloadData("Otros servicios");
    // eslint-disable-next-line
  }, []);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    downloadData("Otros servicios", e.target.value);
    if (selectedValue === "seleccionarSubcategoria") {
      setSelectedOption("");
    } else {
      setSelectedOption(selectedValue);
    }
  };

  return (
    <section className="background">
      <div className="container text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <h1>Otros Servicios</h1>
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
              <option value="Aseguradora">Aseguradoras</option>
              <option value="Estación de servicio">
                Estaciones de Servicios
              </option>
              <option value="Estética del automotor">
                Estetica del Automotor (Lavaderos, Polarizados)
              </option>
              <option value="Servicios de Emergencia">
                Servicios de emergencia (Grúas, Cerrajeros)
              </option>
            </select>
          </div>
        </div>

        <div className="container-card">{data}</div>
      </div>{" "}
    </section>
  );
};

export default OtrosServicios;
