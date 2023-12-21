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
              imagen="https://images.prismic.io/staticmania/56ae80e7-4d23-4bd9-a2f3-01bd6f923a8b_product-2.avif?auto=compress,format"
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
