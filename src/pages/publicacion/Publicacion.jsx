import React from "react";
import { Link } from "react-router-dom";
import "./publicacion.css";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { swalPopUp } from "../../utils/swal";
import { useNavigate } from "react-router-dom";

const Publicacion = () => {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  const toEmpresa = (e) => {
    e.preventDefault();
    if (userData.isLogged) {
      navigate("/CargaEmpresa");
    } else {
      swalPopUp("Ups!", "Tienes que loguerte para puclicar", "info");
    }
  };

  return (
    <section
      id="hero-publicacion"
      className="hero-publicacion d-flex background"
    >
      <div className="container" data-aos="fade-up">
        <div
          className="row justify-content-center"
          data-aos="fade-up"
          data-aos-delay="160"
        >
          <div className="col-xl-6 col-sm-12 col-lg-8 text-center">
            <img
              src="/images/logos/logo-vefrek-white.png"
              alt="Vefrek"
              className="logo-publicacion"
            />
            <div className="mt-3">
              <h2>REALIZA UNA PUBLICACION</h2>
            </div>
          </div>
        </div>

        <div
          className="row gy-4 mt-4 justify-content-center"
          data-aos="zoom-in"
          data-aos-delay="250"
        >
          <div className="col-xl-4 col-md-4">
            <Link
              to="/CargaEmpresa"
              onClick={toEmpresa}
              className="text-decoration-none"
            >
              <div className="icon-box text-center">
                <i className="ri-building-line"></i>
                <h3>Publica tu empresa</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publicacion;
