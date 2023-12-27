import React, { useState } from "react";
import "./negocios.css";
import CardNegocio from "../../components/CardNegocio";

const Negocios = () => {
  const [filter, setFilter] = useState("all");
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
          className="row container mx-auto portfolio-container"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Negocio 1 */}
          <div className="col-md-3" style={cardStyle}>
            <CardNegocio></CardNegocio>
          </div>
          {/* Negocio 2 */}
          <div className="col-md-3" style={cardStyle}>
            <CardNegocio></CardNegocio>
          </div>
          {/* Negocio 3 */}
          <div className="col-md-3" style={cardStyle}>
            <CardNegocio></CardNegocio>
          </div>
          {/* Negocio 4 */}
          <div className="col-md-3" style={cardStyle}>
            <CardNegocio></CardNegocio>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Negocios;
