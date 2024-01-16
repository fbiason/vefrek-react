import React from "react";
import { Link } from "react-router-dom";
import "./cardnegocio.css";

const CardNegocio = (props) => {
  return (
    <div>
      <div className="container-card">
        <div className="card">
          <figure>
            <img src={props.imgUrl} alt="Diseño Gráfico" />
          </figure>
          <div className="contenido-card">
            <h5>{props.subcategory}</h5>
            <h2>{props.name}</h2>
            <p>{`📍 Dirección: ${props.location}`}</p>
            <p>{`📞 Teléfono: ${props.phone}`}</p>
            <Link to={`/${props.vefrek_website}`}> Más Info </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNegocio;
