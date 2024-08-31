import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { swalPopUp } from "../utils/swal";
import { useNavigate } from "react-router-dom";

const Publicacion = () => {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    const toEmpresa = (e) => {
        e.preventDefault();
        if (userData.isLogged) {
            navigate("/CargaEmpresa");
        } else {
            swalPopUp("Ups!", "Tienes que loguearte para publicar", "info");
        }
    };

    return (
        <section className="publicacion background">
            <div className="container-publicacion" data-aos="fade-up">
                <div
                    className="publicacion-row"
                    data-aos="fade-up"
                    data-aos-delay="160"
                >
                    <div className="publicacion-content">
                        <img
                            src="/images/logos/logo-vefrek-white.png"
                            alt="Vefrek"
                            className="logo-publicacion"
                        />
                        <div className="publicacion-text">
                            <h3 className="container-publicacion">
                                ¿Sos propietario de una empresa en el rubro automotor? ¡Publicá
                                de forma GRATUITA tu negocio en nuestro sitio web!
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="publication-btn">
                    <div className="publication-link">
                        <Link to="/CargaEmpresa" onClick={toEmpresa}>
                            <div className="publication-icon-box">
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
