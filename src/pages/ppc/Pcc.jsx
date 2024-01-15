import React from "react";
import "./ppc.css";
import { Link } from "react-router-dom";

const Pcc = () => {
  return (
    <section id="ppc" className="ppc">
      <div className="container-fluid" data-aos="zoom-in">
        <div className="text-center">
          <h3>POTENCIA AÚN MÁS A TU EMPRESA</h3>
          <p>
            Te brindamos la posibilidad de difundir más a tu negocio e
            incrementar el alcance de los vehículos que publiques para la venta
          </p>
          <Link to="/publicacion">
            <div className="ppc-btn">
              PUBLICITÁ AHORA
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pcc;
