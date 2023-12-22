import React from "react";
import { CardNegocio } from "../../components/CardNegocio";
import "./categorias.css";

const Categorias = () => {
  return (
    <section className="background">
      <div classNamelass="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <div className="CardNegocio card">
            <CardNegocio
              imagen="images/portfolio/biasonautomotores.jpeg"
              telefono="2966449951"
              direccion="Rio Gallegos"
            ></CardNegocio>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categorias;
