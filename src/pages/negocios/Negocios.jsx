import React, { useState, useEffect, useContext } from "react";
import "./negocios.css";
import { findCompanys } from "../../utils/apiDb/apiDbAcions";
import CardNegocio2 from "../../components/CardNegocio2";
import { swalPopUp } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";

const Negocios = () => {
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState([]);
  const { showSpinner } = useContext(SpinnerContext);
  const images = [];

  const cardStyle = {
    width: "30%",
    padding: "1rem",
  };

  const categories = [
    "Todos",
    "Agencias",
    "Rent a Car",
    "Gomerias",
    "Mecánicos",
    "Repuestos",
    "Lubricentros",
    "Aseguradoras",
    "Est. de Servicios",
    "Estética Automotor",
  ];

  const dbQuerys = [
    { Todos: { $exists: true } },
    { Agencias: "Agencia" },
    { "Rent a Car": "Rent a Car" },
    { Gomerias: "Gomería" },
    { Mecánicos: "Taller mecánico" },
    { Repuestos: "Repuestos" },
    { Lubricentros: "Lubricentro" },
    { Aseguradoras: "Aseguradora" },
    { "Est. de Servicios": "Estación de Servicio" },
    { "Estética Automotor": "Estética del automotor" },
  ];

  useEffect(() => {
    const setCompanys = async (subcategory) => {
      const queryToAppy = dbQuerys.find(
        (query) => Object.keys(query)[0] === subcategory
      );
      const subcategoryParse = Object.values(queryToAppy)[0];
      const queryJSON = JSON.stringify({ subcategory: subcategoryParse });

      showSpinner(true);
      const response = await findCompanys(
        queryJSON,
        "subcategory name images location phone _id"
      );
      if (response.success && response.companysData) {
        const jsxArr = response.companysData.map((company) => (
          <div className="col-md-3" style={cardStyle} key={company._id}>
            <CardNegocio2
              subcategory={company.subcategory}
              name={company.name}
              imgUrl={company.images.images[0].url}
              logoUrl={company.images.logo.url}
              location={company.location}
              phone={company.phone}
              id={company._id}
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

    setCompanys("Todos");

    const filtersButtons = document.querySelectorAll(".filter-button");
    filtersButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setCompanys(button.innerHTML);
      });
    });
  }, []);

  const applyFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <section id="portfolio">
      <div data-aos="fade-up">
        <div className="section-title container">
          <h2>Encontra lo que tu vehículo necesita</h2>
          <p>Negocios recomendados</p>
        </div>

        <div className="container mx-auto">
          <div className="flex justify-center mb-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-button mr-2 filter-button-default ${
                  filter === category.toLowerCase()
                    ? "filter-button-active"
                    : ""
                }`}
                onClick={() => applyFilter(category.toLowerCase())}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`filter ${
                  filter === "all" ? "" : `filter-${filter}`
                } hover:opacity-80 transition duration-300 ease-in-out`}
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>

        <div
          className="row cards-row justify-content-center text-center mt-5"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {data}
        </div>
      </div>
    </section>
  );
};

export default Negocios;
