import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./cardnegocio.css";

const CardNegocio2 = (props) => {
  return (
    <Card className="categoria-card h-100 col-12 col-sm-7 position-relative">
      <div className="card-overlay-red position-absolute top-0 start-0 w-100 h-25"></div>
      <div className="card-overlay-black position-absolute top-25 start-0 w-100 h-25"></div>

      <Card.Header className="bg-transparent text-white position-absolute top-0 start-0 w-100 z-index-2">
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

      <Card.Footer className="categoria-footer bg-blue-transparent text-white border-t-1 border-default-600 dark:border-default-100 position-absolute bottom-0 start-0 w-100 z-index-2 d-flex justify-content-between align-items-center">
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
        <Link to="/PaginaEmpresa">
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