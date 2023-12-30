import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./cardnegocio.css";

const CardNegocio2 = (props) => {
  return (
    <Card className="categoria-card h-100 col-12 col-sm-7 position-relative">
      <Card.Header>
        <p className="card-header-text uppercase font-bold mb-0">
          {props.subcategory}
        </p>
        <h4 className="card-header-h4 text-xl mb-0">{props.name}</h4>
      </Card.Header>

      <Card.Img
        variant="top"
        src={props.imgUrl}
        alt="Relaxing app background"
        className="w-100"
      />

      <Card.Footer>
        <div className="d-flex align-items-center gap-2">
          <img
            alt="Breathing app icon logo-categoria"
            className="rounded-circle logo-categoria"
            src={props.logoUrl}
          />
          <div className="flex flex-col">
            <p className="text-categoria">{`📍 Dirección: ${props.location}`}</p>
            <p className="text-categoria">{`📞 Teléfono: ${props.phone}`}</p>
          </div>
        </div>
        <Link to={`/${props.name}`}>
          {" "}
          <Button variant="dark" className="rounded-pill btn-card">
            Más info
          </Button>{" "}
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default CardNegocio2;
