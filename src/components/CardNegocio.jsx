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
            <div className="row">
              <div>
                <Link className="col-6" to={`/${props.vefrek_website}`}>
                  {" "}
                  Más Info{" "}
                </Link>{" "}
              </div>
              <div className="col-6 favorito">
                <input type="checkbox" id="favorito-1" name="favorito" />
                <label htmlFor="favorito-1"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNegocio;
