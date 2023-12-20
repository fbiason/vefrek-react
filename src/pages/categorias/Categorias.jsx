import React from "react";
import "./categorias.css";

const Categorias = () => {
  const categorias = [
    "Clasificados",
    "Reparación y Mantenimiento",
    "Venta y Alquiler de vehículos",
    "Otros Servicios",
  ];

  const subcategorias = {
    "Reparación y Mantenimiento": [
      "Gomerías (arreglo y venta de cubiertas, alineación y balanceo)",
      "Talleres Mecánicos (Mecánico, Chapistas, Electricistas)",
      "Repuestos (Autopartes)",
      "Lubricentros",
    ],
    "Venta y Alquiler de vehículos": [
      "Agencia (Concesionaria oficiales y Agencias particulares)",
      "Rent a Car (Alquiler de autos)",
    ],
    "Otros Servicios": [
      "Aseguradoras",
      "Estaciones de Servicios",
      "Estetica del Automotor (Lavaderos, Polarizados)",
      "Servicios de emergencia (Grúas, Cerrajeros)",
    ],
  };

  const cards = [
    {
      image: "/images/portfolio/biasonautomotores.jpeg",
      title: "Card 1",
      telefono: "123-456-7890",
      direccion: "Rivadavia 1333",
    },
    {
      image: "/images/portfolio/biasonautomotores.jpeg",
      title: "Card 2",
      telefono: "987-654-3210",
      direccion: "Rivadavia 1333",
    },
  ];

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    React.useState(null);
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] =
    React.useState(null);

  return (
    <section className="background">
      <div className="categorias-container">
        <div className="categorias-section">
          <div className="dropdown-section">
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="categoriasDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {categoriaSeleccionada || "Seleccionar Categoría"}
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="categoriasDropdown"
              >
                {categorias.map((categoria, index) => (
                  <a
                    className="dropdown-item"
                    href="#"
                    key={index}
                    onClick={() => {
                      setCategoriaSeleccionada(categoria);
                      setSubcategoriaSeleccionada(null);
                    }}
                  >
                    {categoria}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="subcategorias-section">
          {categoriaSeleccionada && (
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="subcategoriasDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {subcategoriaSeleccionada || "Seleccionar Subcategoría"}
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="subcategoriasDropdown"
              >
                {subcategorias[categoriaSeleccionada].map(
                  (subcategoria, index) => (
                    <a
                      className="dropdown-item"
                      href="#"
                      key={index}
                      onClick={() => setSubcategoriaSeleccionada(subcategoria)}
                    >
                      {subcategoria}
                    </a>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        <div className="card-section">
          <div className="row">
            {cards.map((card, index) => (
              <div className="col-md-6" key={index}>
                <div className="card">
                  <img
                    src={card.image}
                    className="card-img-top"
                    alt={`Imagen ${index + 1}`}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text">Teléfono: {card.telefono}</p>
                    <p className="card-text">Dirección: {card.direccion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categorias;
